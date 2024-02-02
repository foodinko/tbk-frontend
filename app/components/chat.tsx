import { useDebouncedCallback } from "use-debounce";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
} from "react";
import moment from "moment";

import SendWhiteIcon from "../icons/send-white.svg";
import BrainIcon from "../icons/brain.svg";
import RenameIcon from "../icons/rename.svg";
import ExportIcon from "../icons/share.svg";
import ReturnIcon from "../icons/return.svg";
import CopyIcon from "../icons/copy.svg";
import LoadingIcon from "../icons/three-dots.svg";
import PromptIcon from "../icons/prompt.svg";
import MaskIcon from "../icons/mask.svg";
import MaxIcon from "../icons/max.svg";
import MinIcon from "../icons/min.svg";
import ResetIcon from "../icons/reload.svg";
import BreakIcon from "../icons/break.svg";
// import getSubTitleForUserMessageCountIcon from "../icons/chat-getSubTitleForUserMessageCount.svg";
import DeleteIcon from "../icons/clear.svg";
import PinIcon from "../icons/pin.svg";
import EditIcon from "../icons/rename.svg";
import ConfirmIcon from "../icons/confirm.svg";
import CancelIcon from "../icons/cancel.svg";

import LightIcon from "../icons/light.svg";
import DarkIcon from "../icons/dark.svg";
import AutoIcon from "../icons/auto.svg";
import BottomIcon from "../icons/bottom.svg";
import StopIcon from "../icons/pause.svg";
import RobotIcon from "../icons/robot.svg";

import {
  ChatMessage,
  SubmitKey,
  useChatStore,
  createMessage,
  useAccessStore,
  Theme,
  useAppConfig,
  MAX_MESSAGE_COUNT,
  SESSION_LIMIT_MIN,
  DEFAULT_TOPIC,
  ModelType,
  useUserStore,
  BOT_HELLO,
  BOT_ASK_GENDER,
  BOT_ASK_NAME,
  BOT_WHAT_KIND_TBK,
  BOT_EMPTY_COUNT,
  BOT_WELCOME_BACK,
  BOT_WELCOME_LONG_TIME,
  UserInputCallbackStatus,
} from "../store";

import {
  copyToClipboard,
  selectOrCopy,
  autoGrowTextArea,
  useMobileScreen,
} from "../utils";

import dynamic from "next/dynamic";

import { ChatControllerPool } from "../client/controller";
import { Prompt, usePromptStore } from "../store/prompt";
import Locale from "../locales";

import { IconButton } from "./button";
import { ChatUser } from "./chat-user";
import { ChatGender } from "./chat-gender";
import styles from "./chat.module.scss";

import {
  List,
  ListItem,
  Modal,
  Selector,
  showConfirm,
  showPrompt,
  showToast,
} from "./ui-lib";
import { useNavigate } from "react-router-dom";
import {
  CHAT_PAGE_SIZE,
  LAST_INPUT_KEY,
  Path,
  REQUEST_TIMEOUT_MS,
  UNFINISHED_INPUT,
} from "../constant";
import { Avatar } from "./emoji";
import { ContextPrompts, MaskAvatar, MaskConfig } from "./mask";
import { useMaskStore } from "../store/mask";
import { ChatCommandPrefix, useChatCommand, useCommand } from "../command";
import { prettyObject } from "../utils/format";
import { ExportMessageModal } from "./exporter";
import { getClientConfig } from "../config/client";
import { useAllModels } from "../utils/hooks";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const Markdown = dynamic(async () => (await import("./markdown")).Markdown, {
  loading: () => <LoadingIcon />,
});

function useSubmitHandler() {
  const config = useAppConfig();
  const submitKey = config.submitKey;
  const isComposing = useRef(false);

  useEffect(() => {
    const onCompositionStart = () => {
      isComposing.current = true;
    };
    const onCompositionEnd = () => {
      isComposing.current = false;
    };

    window.addEventListener("compositionstart", onCompositionStart);
    window.addEventListener("compositionend", onCompositionEnd);

    return () => {
      window.removeEventListener("compositionstart", onCompositionStart);
      window.removeEventListener("compositionend", onCompositionEnd);
    };
  }, []);

  const shouldSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return false;
    if (e.key === "Enter" && (e.nativeEvent.isComposing || isComposing.current))
      return false;
    return (
      (config.submitKey === SubmitKey.AltEnter && e.altKey) ||
      (config.submitKey === SubmitKey.CtrlEnter && e.ctrlKey) ||
      (config.submitKey === SubmitKey.ShiftEnter && e.shiftKey) ||
      (config.submitKey === SubmitKey.MetaEnter && e.metaKey) ||
      (config.submitKey === SubmitKey.Enter &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.metaKey)
    );
  };

  return {
    submitKey,
    shouldSubmit,
  };
}

export type RenderPompt = Pick<Prompt, "title" | "content">;

export function PromptHints(props: {
  prompts: RenderPompt[];
  onPromptSelect: (prompt: RenderPompt) => void;
}) {
  const noPrompts = props.prompts.length === 0;
  const [selectIndex, setSelectIndex] = useState(0);
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectIndex(0);
  }, [props.prompts.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (noPrompts || e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }
      // arrow up / down to select prompt
      const changeIndex = (delta: number) => {
        e.stopPropagation();
        e.preventDefault();
        const nextIndex = Math.max(
          0,
          Math.min(props.prompts.length - 1, selectIndex + delta),
        );
        setSelectIndex(nextIndex);
        selectedRef.current?.scrollIntoView({
          block: "center",
        });
      };

      if (e.key === "ArrowUp") {
        changeIndex(1);
      } else if (e.key === "ArrowDown") {
        changeIndex(-1);
      } else if (e.key === "Enter") {
        const selectedPrompt = props.prompts.at(selectIndex);
        if (selectedPrompt) {
          props.onPromptSelect(selectedPrompt);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.prompts.length, selectIndex]);

  if (noPrompts) return null;
  return (
    <div className={styles["prompt-hints"]}>
      {props.prompts.map((prompt, i) => (
        <div
          ref={i === selectIndex ? selectedRef : null}
          className={
            styles["prompt-hint"] +
            ` ${i === selectIndex ? styles["prompt-hint-selected"] : ""}`
          }
          key={prompt.title + i.toString()}
          onClick={() => props.onPromptSelect(prompt)}
          onMouseEnter={() => setSelectIndex(i)}
        >
          <div className={styles["hint-title"]}>{prompt.title}</div>
          <div className={styles["hint-content"]}>{prompt.content}</div>
        </div>
      ))}
    </div>
  );
}

function ClearContextDivider() {
  const chatStore = useChatStore();

  return (
    <div
      className={styles["clear-context"]}
      onClick={() =>
        chatStore.updateCurrentSession(
          (session) => (session.clearContextIndex = undefined),
        )
      }
    >
      <div className={styles["clear-context-tips"]}>{Locale.Context.Clear}</div>
      <div className={styles["clear-context-revert-btn"]}>
        {Locale.Context.Revert}
      </div>
    </div>
  );
}

function ChatAction(props: {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}) {
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState({
    full: 16,
    icon: 16,
  });

  function updateWidth() {
    if (!iconRef.current || !textRef.current) return;
    const getWidth = (dom: HTMLDivElement) => dom.getBoundingClientRect().width;
    const textWidth = getWidth(textRef.current);
    const iconWidth = getWidth(iconRef.current);
    setWidth({
      full: textWidth + iconWidth,
      icon: iconWidth,
    });
  }

  return (
    <div
      className={`${styles["chat-input-action"]} clickable`}
      onClick={() => {
        props.onClick();
        setTimeout(updateWidth, 1);
      }}
      onMouseEnter={updateWidth}
      onTouchStart={updateWidth}
      style={
        {
          "--icon-width": `${width.icon}px`,
          "--full-width": `${width.full}px`,
        } as React.CSSProperties
      }
    >
      <div ref={iconRef} className={styles["icon"]}>
        {props.icon}
      </div>
      <div className={styles["text"]} ref={textRef}>
        {props.text}
      </div>
    </div>
  );
}

function useScrollToBottom() {
  // for auto-scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  function scrollDomToBottom() {
    const dom = scrollRef.current;
    if (dom) {
      requestAnimationFrame(() => {
        setAutoScroll(true);
        dom.scrollTo(0, dom.scrollHeight);
      });
    }
  }

  // auto scroll
  useEffect(() => {
    if (autoScroll) {
      scrollDomToBottom();
    }
  });

  return {
    scrollRef,
    autoScroll,
    setAutoScroll,
    scrollDomToBottom,
  };
}

function _Chat() {
  type RenderMessage = ChatMessage & { preview?: boolean };

  const chatStore = useChatStore();
  const session = chatStore.currentSession();
  const config = useAppConfig();
  const fontSize = config.fontSize;

  const [showExport, setShowExport] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStartConversation, setIsLoadingStartConversation] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isEnabledKeyboard, setIsEnabledKeyboard] = useState(false);
  const [isShowChatGender, setIsShowChatGender] = useState(false);
  const [isShowChatUser, setIsShowChatUser] = useState(false);
  const { submitKey, shouldSubmit } = useSubmitHandler();
  const { scrollRef, setAutoScroll, scrollDomToBottom } = useScrollToBottom();
  const [hitBottom, setHitBottom] = useState(true);
  const isMobileScreen = useMobileScreen();
  const navigate = useNavigate();
  const [userInputStatus, setUserInputStatus] = useState<UserInputCallbackStatus>(UserInputCallbackStatus.None);

  // prompt hints
  const promptStore = usePromptStore();
  const [promptHints, setPromptHints] = useState<RenderPompt[]>([]);
  const onSearch = useDebouncedCallback(
    (text: string) => {
      const matchedPrompts = promptStore.search(text);
      setPromptHints(matchedPrompts);
    },
    100,
    { leading: true, trailing: true },
  );

  // auto grow input
  const [inputRows, setInputRows] = useState(2);
  const measure = useDebouncedCallback(
    () => {
      const rows = inputRef.current ? autoGrowTextArea(inputRef.current) : 1;
      const inputRows = Math.min(
        20,
        Math.max(2 + Number(!isMobileScreen), rows),
      );
      setInputRows(inputRows);
    },
    100,
    {
      leading: true,
      trailing: true,
    },
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(measure, [userInput]);

  // chat commands shortcuts
  const chatCommands = useChatCommand({
    new: () => chatStore.newSession(),
    newm: () => navigate(Path.NewChat),
    prev: () => chatStore.nextSession(-1),
    next: () => chatStore.nextSession(1),
    clear: () =>
      chatStore.updateCurrentSession(
        (session) => (session.clearContextIndex = session.messages.length),
      ),
    del: () => chatStore.deleteSession(chatStore.currentSessionIndex),
  });

  // only search prompts when user input is short
  const SEARCH_TEXT_LIMIT = 30;
  const onInput = (text: string) => {
    setUserInput(text);
    const n = text.trim().length;

    // clear search results
    if (n === 0) {
      setPromptHints([]);
    } else if (text.startsWith(ChatCommandPrefix)) {
      setPromptHints(chatCommands.search(text));
    } else if (!config.disablePromptHint && n < SEARCH_TEXT_LIMIT) {
      // check if need to trigger auto completion
      if (text.startsWith("/")) {
        let searchText = text.slice(1);
        onSearch(searchText);
      }
    }
  };

  const doSubmit = (userInput: string) => {
    if (userInput.trim() === "") return;
    
    // TODO: isLoading 버그 
    // setIsLoading(true);
    enableKeyboard(false);

    // chatStore.onUserInput(userInput).then(() => { setIsLoading(false); enableKeyboard(true); }); 
    // });
    
    // 포커스 제거하여 키보드 커서 없애기
    (document.activeElement as HTMLElement).blur();

    setUserInputStatus(UserInputCallbackStatus.None);

    chatStore.onUserInput(userInput, (error, status) => {
      setUserInputStatus(status);
      if (error) {
        console.log("[chat.tsx] doSubmit error: ", error);
        // setIsLoading(false);
        enableKeyboard(true);
      } else {
        console.log("[chat.tsx] doSubmit status: ", status);
        if (status === UserInputCallbackStatus.Finish) {
          // setIsLoading(false);
          enableKeyboard(true);
        }
      }
    });
    
    localStorage.setItem(LAST_INPUT_KEY, userInput);
    setUserInput("");
    setPromptHints([]);
    if (!isMobileScreen) inputRef.current?.focus();
    setAutoScroll(true);
  };

  const onPromptSelect = (prompt: RenderPompt) => {
    setTimeout(() => {
      setPromptHints([]);

      const matchedChatCommand = chatCommands.match(prompt.content);
      if (matchedChatCommand.matched) {
        // if user is selecting a chat command, just trigger it
        matchedChatCommand.invoke();
        setUserInput("");
      } else {
        // or fill the prompt
        setUserInput(prompt.content);
      }
      inputRef.current?.focus();
    }, 30);
  };

  // stop response
  const onUserStop = (messageId: string) => {
    ChatControllerPool.stop(session.id, messageId);
  };

  const handleCheckSession = () => {
    if (useUserStore.getState().hasCookieValue()) {
      console.log("[chat.tsx] cookieValue is not empty");
      // for TEST
      // 디버그 모드 체크
      if (clientConfig?.debugMode) {
        // handleResetUser();
        // handleClearSessions();
      }

      handleDeleteMessageBotWelcomeBack();
      handleDeleteMessageBotLongTime();

      if (isUnder20Turn() && isLastMessageToday()) {
        // 20턴 이하, 당일
        console.log("[chat.tsx] isUnder20Turn() && isLastMessageToday()");
        sendMessageWelcomeBack(getUserName());
        visibleKeyboard(true);
        enableKeyboard(true);
      } else if (isUnder20Turn() && !isLastMessageToday()) {
        // 20턴 이하, 다음날
        console.log("[chat.tsx] isUnder20Turn() && !isLastMessageToday()");
        // TODO: '오늘' 컴포넌트 출력
        sendMessageWelcomeLongTime(getUserName());
        visibleKeyboard(true);
        enableKeyboard(true);
      } else if (isOver20Turn()) {
        // 20턴 넘어갔다면
        console.log("[chat.tsx] isOver20Turn()");
        // TODO: '오늘' 컴포넌트 출력
        sendMessageWelcomeLongTime(getUserName());
        handleStartConversation();
        visibleKeyboard(true);
        enableKeyboard(true);
      } else if (isZeroCount()) {
        handleResetUser();
        handleClearSessions();

        sendMessageWelcomeLongTime(getUserName());
        handleStartConversation();
        visibleKeyboard(true);
        enableKeyboard(true);
      }
      
      setTimeout(() => {
        scrollToBottom();
        setAutoScroll(true);
      }, 500);
    } else {
      // 쿠키 정보 없음
      console.log("[chat.tsx] cookieValue is empty");
      visibleKeyboard(false);
      enableKeyboard(false);
      handleClearSessions();
      handleSendMessageHello();
      sendMessageAskGender();
      visibleChatGender(true);
    }
  };

  const handleCheckTurn = () => {
    console.log(
      "[chat.tsx] handleCheckTurn session.messages.length: ",
      session.messages.length,
    );
    console.log(
      "[chat.tsx] handleCheckTurn getUserMessageCount: ",
      getUserMessageCount(),
    );

    if (isOver20Turn() && useUserStore.getState().isConversationStateInProgress() ) {
      console.log("[chat.tsx] isOver20Turn");
      enableKeyboard(false);
      sendMessageEmptyCount(getUserName());
      sendMessageSmartStoreLink();
      handleSmartStoreLinkProvided();
      sendMessageSeeYouAgain();
      handleFinishConversation();
    }
  };

  const handleResetUser = () => {
    console.log("[chat.tsx] handleResetUser");
    useUserStore.getState().resetUser();
  };

  const handleDeleteMessage = (message: string) => {
    console.log("[chat.tsx] handleDeleteMessage message: ", message);

    const filteredMessages = session.messages.filter(
      (m) => m.content === message,
    );

    filteredMessages.forEach((m) => {
      console.log("[chat.tsx] handleDeleteMessage m: ", m);
      deleteMessage(m.id);
    });
  };

  const handleDeleteMessageBotWelcomeBack = () => {
    console.log("[chat.tsx] handleDeleteMessageBotWelcomeBack");
    const msg = Locale.Store.BotWelcomeBack(getUserName());
    handleDeleteMessage(msg);
  };

  const handleDeleteMessageBotLongTime = () => {
    console.log("[chat.tsx] handleDeleteMessageBotLongTime");
    const msg = Locale.Store.BotWelcomeLongTime(getUserName());
    handleDeleteMessage(msg);
  };

  const handleClearSessions = () => {
    console.log("[chat.tsx] handleClearSessions");
    chatStore.clearSessions();
  };

  const handleSendMessageHello = () => {
    sendMessageHello();
  };

  const handleRegisterUser = () => {
    if (useUserStore.getState().hasCookieValue()) {
      console.log("[chat.tsx] registerUser is not empty cookie");
    } else {
      console.log("[chat.tsx] registerUser is empty cookie");

      setIsLoadingStartConversation(true);
      visibleKeyboard(true);

      const userName = getUserName();
      const gender = useUserStore.getState().gender;

      useUserStore
        .getState()
        .registerUser(userName, gender, (error, userId, cookieValue) => {
          if (error) {
            console.log("[chat.tsx] registerUser error: ", error);
            setIsLoadingStartConversation(false);
            enableKeyboard(false);
          } else {
            console.log(
              "[chat.tsx] registerUser success userId: ",
              userId + " cookieValue: " + cookieValue,
            );
            handleStartConversation();
          }
        });
    }
  };

  const handleStartConversation = () => {
    console.log("[chat.tsx] startConversation-1");
    if (useUserStore.getState().hasCookieValue()) {
      console.log("[chat.tsx] startConversation-2");

      useUserStore
        .getState()
        .startConversation((error, conversationId, greeting, startTime) => {
          if (error) {
            console.log("[chat.tsx] startConversation error: ", error);
            setIsLoadingStartConversation(false);
            enableKeyboard(false);
          } else {
            console.log(
              "[chat.tsx] startConversation success conversationId: ",
              conversationId +
                " greeting: " +
                greeting +
                " startTime: " +
                startTime,
            );
            
            setIsLoadingStartConversation(false);
            visibleKeyboard(true);
            enableKeyboard(true);

            useUserStore.getState().setConversationStateInProgress();
          }
        });
    }
  };

  const handleSmartStoreLinkProvided = () => {
    console.log("[chat.tsx] handleSmartStoreLinkProvided");
    // TODO: 링크 제공 기록 API 호출
    // useUserStore.getState().recordSmartStoreLink();
  };

  const handleLinkClicked = () => {
    console.log("[chat.tsx] handleLinkClicked");
    // TODO: 클릭 이벤트 API 호출
    // TODO: 콜백 함수에서 handleStartConversation() 호출
    if (!useUserStore.getState().isConversationStateInProgress()) { 
      handleStartConversation();
      sendMessageWelcomeBack(getUserName());
      enableKeyboard(true);
    }
  };

  const handleFinishConversation = () => {
    useUserStore.getState().setConversationStateFinished();
    // TODO: 대화 종료 API 호출
  };

  const handleButtonClickGender = (gender: string) => {
    useUserStore.getState().setGender(gender);
    console.log("[chat.tsx] handleButtonClickGender gender: ", gender);
    console.log(
      "[chat.tsx] handleButtonClickGender useUserStore.getState().gender: ",
      useUserStore.getState().gender,
    );
    visibleChatGender(false);
    sendMessageSelectGender(gender);
    sendMessageAskName();
    visibleChatUser(true);
  };

  const handleButtonClickUserName = (userName: string) => {
    useUserStore.getState().setUserName(userName);
    console.log("[chat.tsx] handleButtonClickUserName userName: ", userName);
    console.log(
      "[chat.tsx] handleButtonClickUserName getUserName(): ",
      getUserName(),
    );
    visibleChatUser(false);
    sendMessageSelectUserName(userName);
    sendMessageWhatKindTbk(userName);
    handleRegisterUser();
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    url: string,
  ) => {
    console.log("[chat.tsx] handleLinkClick url: ", url);

    event.preventDefault();
    const win = window.open(url, "_blank");
    win?.focus();

    // TODO: 링크 종류 구분
    // 1. 20턴 이후 프론트에서 제공하는 스마트 스토어 링크
    // 2. LLM에서 제공하는 스마트 스토어 링크
    // 3. LLM에서 제공하는 추천 가게 링크
    handleLinkClicked();
  };

  const getPlaceholder = () => {
    return isEnabledKeyboard
      ? Locale.Chat.InputEnabled
      : Locale.Chat.InputDisabled;
  };

  const getUserName = () => {
    return useUserStore.getState().userName;
  };

  const getUserMessageCount = () => {
    // console.log("[chat.tsx] getUserMessageCount session.messages: ", session.messages);
    const userMessageCount = session.messages.filter(
      (m) =>
        m.role === "user" &&
        m.conversationId === useUserStore.getState().conversationId,
    ).length;
    return userMessageCount;
  };

  const isUnder20Turn = () => {
    const userMessageCount = getUserMessageCount();
    const isUnder20Turn = userMessageCount < MAX_MESSAGE_COUNT;

    console.log(
      "[chat.tsx] isUnder20Turn userMessageCount: ",
      userMessageCount,
    );
    console.log("[chat.tsx] isUnder20Turn isUnder20Turn: ", isUnder20Turn);

    return isUnder20Turn;
  };

  const isOver20Turn = () => {
    const userMessageCount = getUserMessageCount();
    const isOver20Turn = userMessageCount >= MAX_MESSAGE_COUNT;

    console.log("[chat.tsx] isOver20Turn userMessageCount: ", userMessageCount);
    console.log("[chat.tsx] isOver20Turn isOver20Turn: ", isOver20Turn);

    return isOver20Turn;
  };

  // 카운트가 제로 이하라면
  const isZeroCount = () => {
    const userMessageCount = getUserMessageCount();
    const isZeroCount = userMessageCount <= 0;

    console.log("[chat.tsx] isZeroCount userMessageCount: ", userMessageCount);
    console.log("[chat.tsx] isZeroCount isZeroCount: ", isZeroCount);

    return isZeroCount;
  };

  const getLastMessage = () => {
    const lastMessage = session.messages.slice(-1)[0];
    return lastMessage;
  };

  const parseDate = (str: string) => {
    // Example input: "2024. 1. 28. 오후 1:40:50"
    let [year, month, day, partOfDay, time] = str.split(/[\s.]+/);
    let [hours, minutes, seconds] = time.split(":");

    // Convert hours in 12-hour format to 24-hour format
    if (partOfDay === "오후" && hours !== "12") {
      hours = (parseInt(hours, 10) + 12).toString();
    } else if (partOfDay === "오전" && hours === "12") {
      hours = "00";
    }

    const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0",
    )}T${hours.padStart(2, "0")}:${minutes}:${seconds}`;
    return new Date(isoDate);
  };

  const isToday = (datetimeStr: string) => {
    const parsedDate = parseDate(datetimeStr);
    const isoDate = parsedDate.toISOString();
    const datetime = moment(isoDate);
    const now = moment().startOf("day");
    const isSame = datetime.isSame(now, "d");
    console.log("[chat.tsx] isToday datetimeStr: ", datetimeStr);
    console.log("[chat.tsx] isToday datetime: ", datetime);
    console.log("[chat.tsx] isToday now: ", now);
    console.log("[chat.tsx] isToday isSame: ", isSame);
    return isSame;
  };

  const isWithin30Minutes = (datetimeStr: string) => {
    const parsedDate = parseDate(datetimeStr);
    const isoDate = parsedDate.toISOString();
    const datetime = moment(isoDate);
    const now = moment();
    return now.diff(datetime, "minutes") < SESSION_LIMIT_MIN;
  };

  const isSameDate = (prevDate: string, nextDate: string) => {
    const prev = new Date(prevDate);
    const next = new Date(nextDate);

    console.log(`isSameDate prev: ${prev}, next: ${next}`);

    return;
    prev.getFullYear() === next.getFullYear() &&
      prev.getMonth() === next.getMonth() &&
      prev.getDate() === next.getDate();
  };

  const isLastMessageToday = () => {
    const lastMessage = getLastMessage();
    return isToday(lastMessage.date.toLocaleString());
  };

  const getSubTitleForUserMessageCountCustom = () => {
    const userMessageCount = getUserMessageCount();
    const remainCount = MAX_MESSAGE_COUNT - userMessageCount;
    const subTitle = Locale.Chat.SubTitle(remainCount);
    return subTitle;
  };

  const sendUserMessage = (content: string) => {
    // context.push(message);
    chatStore.onSendUserMessage(content);
    console.log(
      "[chat.tsx] sendUserMessage session.messages.length: " +
        session.messages.length,
    );
  };

  const sendChatbotMessage = (content: string) => {
    // context.push(message);
    chatStore.onSendChatbotMessage(content);
    console.log(
      "[chat.tsx] sendChatbotMessage session.messages.length: " +
        session.messages.length,
    );
  };

  const sendMessageHello = () => {
    const content = Locale.Store.BotHello;

    console.log("[chat.tsx] sendMessageHello: ", content);

    sendChatbotMessage(content);
  };

  const sendMessageAskGender = () => {
    const content = Locale.Store.BotAskGender;

    console.log("[chat.tsx] sendMessageAskGender: ", content);

    sendChatbotMessage(content);
  };

  const sendMessageSelectGender = (gender: string) => {
    const content = gender;

    console.log("[chat.tsx] sendMessageSelectGender: ", content);

    sendUserMessage(content);
  };

  const sendMessageAskName = () => {
    const content = Locale.Store.BotAskName;

    console.log("[chat.tsx] sendMessageAskName: ", content);

    sendChatbotMessage(content);
  };

  const sendMessageSelectUserName = (userName: string) => {
    const content = userName;

    console.log("[chat.tsx] sendMessageSelectUserName: ", content);

    sendUserMessage(content);
  };

  const sendMessageWhatKindTbk = (userName: string) => {
    const content = Locale.Store.BotWhatKindTbk(userName);

    console.log("[chat.tsx] sendMessageWhatKindTbk: ", content);

    sendChatbotMessage(content);
  };

  const sendMessageEmptyCount = (userName: string) => {
    const content = Locale.Store.BotEmptyCount(userName);

    console.log("[chat.tsx] sendMessageEmptyCount: ", content);

    sendChatbotMessage(content);
  };

  const sendMessageSmartStoreLink = () => {
    const content = Locale.Store.BotSmartStoreLink;

    console.log("[chat.tsx] sendMessageSmartStoreLink: ", content);

    sendChatbotMessage(content);
  };

  const sendMessageSeeYouAgain = () => {
    const content = Locale.Store.BotSeeYouAgain;

    console.log("[chat.tsx] sendMessageSeeYouAgain: ", content);

    sendChatbotMessage(content);
  };

  const sendMessageWelcomeBack = (userName: string) => {
    const content = Locale.Store.BotWelcomeBack(userName);

    console.log("[chat.tsx] sendMessageWelcomeBack: ", content);

    sendChatbotMessage(content);
  };

  const sendMessageWelcomeLongTime = (userName: string) => {
    const content = Locale.Store.BotWelcomeLongTime(userName);

    console.log("[chat.tsx] sendMessageWelcomeLongTime: ", content);

    sendChatbotMessage(content);
  };

  const visibleKeyboard = (isVisible: boolean) => {
    setIsShowKeyboard(isVisible);
  };

  const enableKeyboard = (isEnabled: boolean) => {
    setIsEnabledKeyboard(isEnabled);
  };

  const visibleChatUser = (isVisible: boolean) => {
    setIsShowChatUser(isVisible);
  };

  const visibleChatGender = (isVisible: boolean) => {
    setIsShowChatGender(isVisible);
  };

  useEffect(() => {
    chatStore.updateCurrentSession((session) => {
      const stopTiming = Date.now() - REQUEST_TIMEOUT_MS;
      session.messages.forEach((m) => {
        // check if should stop all stale messages
        if (m.isError || new Date(m.date).getTime() < stopTiming) {
          if (m.streaming) {
            m.streaming = false;
          }

          if (m.content.length === 0) {
            m.isError = true;
            m.content = prettyObject({
              error: true,
              message: "empty response",
            });
          }
        }
      });

      // auto sync mask config from global config
      if (session.mask.syncGlobalConfig) {
        console.log("[Mask] syncing from global, name = ", session.mask.name);
        session.mask.modelConfig = { ...config.modelConfig };
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check if should send message
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // if ArrowUp and no userInput, fill with last input
    if (
      e.key === "ArrowUp" &&
      userInput.length <= 0 &&
      !(e.metaKey || e.altKey || e.ctrlKey)
    ) {
      setUserInput(localStorage.getItem(LAST_INPUT_KEY) ?? "");
      e.preventDefault();
      return;
    }
    if (shouldSubmit(e) && promptHints.length === 0) {
      doSubmit(userInput);
      e.preventDefault();
    }
  };
  const onRightClick = (e: any, message: ChatMessage) => {
    // copy to clipboard
    if (selectOrCopy(e.currentTarget, message.content)) {
      if (userInput.length === 0) {
        setUserInput(message.content);
      }

      e.preventDefault();
    }
  };

  const deleteMessage = (msgId?: string) => {
    chatStore.updateCurrentSession(
      (session) =>
        (session.messages = session.messages.filter((m) => m.id !== msgId)),
    );
  };

  const onDelete = (msgId: string) => {
    deleteMessage(msgId);
  };

  const onResend = (message: ChatMessage) => {
    // when it is resending a message
    // 1. for a user's message, find the next bot response
    // 2. for a bot's message, find the last user's input
    // 3. delete original user input and bot's message
    // 4. resend the user's input

    const resendingIndex = session.messages.findIndex(
      (m) => m.id === message.id,
    );

    if (resendingIndex < 0 || resendingIndex >= session.messages.length) {
      console.error("[Chat] failed to find resending message", message);
      return;
    }

    let userMessage: ChatMessage | undefined;
    let botMessage: ChatMessage | undefined;

    if (message.role === "assistant") {
      // if it is resending a bot's message, find the user input for it
      botMessage = message;
      for (let i = resendingIndex; i >= 0; i -= 1) {
        if (session.messages[i].role === "user") {
          userMessage = session.messages[i];
          break;
        }
      }
    } else if (message.role === "user") {
      // if it is resending a user's input, find the bot's response
      userMessage = message;
      for (let i = resendingIndex; i < session.messages.length; i += 1) {
        if (session.messages[i].role === "assistant") {
          botMessage = session.messages[i];
          break;
        }
      }
    }

    if (userMessage === undefined) {
      console.error("[Chat] failed to resend", message);
      return;
    }

    // delete the original messages
    deleteMessage(userMessage.id);
    deleteMessage(botMessage?.id);

    // resend the message
    setIsLoading(true);
    chatStore.onUserInput(userMessage.content).then(() => setIsLoading(false));
    inputRef.current?.focus();
  };

  const onPinMessage = (message: ChatMessage) => {
    chatStore.updateCurrentSession((session) =>
      session.mask.context.push(message),
    );

    showToast(Locale.Chat.Actions.PinToastContent, {
      text: Locale.Chat.Actions.PinToastAction,
      onClick: () => {
        setShowPromptModal(true);
      },
    });
  };

  const context: RenderMessage[] = useMemo(() => {
    return session.mask.hideContext ? [] : session.mask.context.slice();
  }, [session.mask.context, session.mask.hideContext]);
  const accessStore = useAccessStore();

  useEffect(() => {
    handleCheckSession();
  }, []);

  useEffect(() => {
    handleCheckTurn();
  }, [session.messages.length]);

  // preview messages
  const renderMessages = useMemo(() => {
    return context.concat(session.messages as RenderMessage[]).concat(
      isLoading
        ? [
            {
              ...createMessage({
                role: "assistant",
                content: "……",
              }),
              preview: true,
            },
          ]
        : [],
    );
    // 사용자 입력 메시지 채팅 바디에서 미리보기
    // .concat(
    //   userInput.length > 0 && config.sendPreviewBubble
    //     ? [
    //         {
    //           ...createMessage({
    //             role: "user",
    //             content: userInput,
    //           }),
    //           preview: true,
    //         },
    //       ]
    //     : [],
    // );
  }, [
    config.sendPreviewBubble,
    context,
    isLoading,
    session.messages,
    userInput,
  ]);

  const [msgRenderIndex, _setMsgRenderIndex] = useState(
    Math.max(0, renderMessages.length - CHAT_PAGE_SIZE),
  );
  function setMsgRenderIndex(newIndex: number) {
    newIndex = Math.min(renderMessages.length - CHAT_PAGE_SIZE, newIndex);
    newIndex = Math.max(0, newIndex);
    _setMsgRenderIndex(newIndex);
  }

  const messages = useMemo(() => {
    const endRenderIndex = Math.min(
      msgRenderIndex + 3 * CHAT_PAGE_SIZE,
      renderMessages.length,
    );
    return renderMessages.slice(msgRenderIndex, endRenderIndex);
  }, [msgRenderIndex, renderMessages]);

  const onChatBodyScroll = (e: HTMLElement) => {
    const bottomHeight = e.scrollTop + e.clientHeight;
    const edgeThreshold = e.clientHeight;

    const isTouchTopEdge = e.scrollTop <= edgeThreshold;
    const isTouchBottomEdge = bottomHeight >= e.scrollHeight - edgeThreshold;
    const isHitBottom =
      bottomHeight >= e.scrollHeight - (isMobileScreen ? 4 : 10);

    const prevPageMsgIndex = msgRenderIndex - CHAT_PAGE_SIZE;
    const nextPageMsgIndex = msgRenderIndex + CHAT_PAGE_SIZE;

    if (isTouchTopEdge && !isTouchBottomEdge) {
      setMsgRenderIndex(prevPageMsgIndex);
    } else if (isTouchBottomEdge) {
      setMsgRenderIndex(nextPageMsgIndex);
    }

    setHitBottom(isHitBottom);
    setAutoScroll(isHitBottom);
  };

  function scrollToBottom() {
    setMsgRenderIndex(renderMessages.length - CHAT_PAGE_SIZE);
    scrollDomToBottom();
  }

  // clear context index = context length + index in messages
  const clearContextIndex =
    (session.clearContextIndex ?? -1) >= 0
      ? session.clearContextIndex! + context.length - msgRenderIndex
      : -1;

  const [showPromptModal, setShowPromptModal] = useState(false);

  const clientConfig = useMemo(() => getClientConfig(), []);

  const autoFocus = !isMobileScreen; // wont auto focus on mobile screen
  const showMaxIcon = !isMobileScreen && !clientConfig?.isApp;

  useCommand({
    fill: setUserInput,
    submit: (text) => {
      doSubmit(text);
    },
    code: (text) => {
      if (accessStore.disableFastLink) return;
      console.log("[Command] got code from url: ", text);
      showConfirm(Locale.URLCommand.Code + `code = ${text}`).then((res) => {
        if (res) {
          accessStore.update((access) => (access.accessCode = text));
        }
      });
    },
  });

  // edit / insert message modal
  const [isEditingMessage, setIsEditingMessage] = useState(false);

  // remember unfinished input
  useEffect(() => {
    // try to load from local storage
    const key = UNFINISHED_INPUT(session.id);
    const mayBeUnfinishedInput = localStorage.getItem(key);
    if (mayBeUnfinishedInput && userInput.length === 0) {
      setUserInput(mayBeUnfinishedInput);
      localStorage.removeItem(key);
    }

    const dom = inputRef.current;
    return () => {
      localStorage.setItem(key, dom?.value ?? "");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.chat} key={session.id}>
      <div className="window-header" data-tauri-drag-region>
        {isMobileScreen && (
          <div className="window-actions">
            <div className={"window-action-button"}>
              {/* <IconButton
                icon={<ReturnIcon />}
                bordered
                title={Locale.Chat.Actions.ChatList}
                onClick={() => navigate(Path.Home)}
              /> */}
            </div>
          </div>
        )}

        <div className={`window-header-title ${styles["chat-body-title"]}`}>
          <div
            className={`window-header-main-title ${styles["chat-body-main-title"]}`}
            onClickCapture={() => setIsEditingMessage(true)}
          >
            {/* {!session.topic ? DEFAULT_TOPIC : session.topic} */}
            {DEFAULT_TOPIC}
          </div>
          <div className="window-header-sub-title">
            {getSubTitleForUserMessageCountCustom()}
          </div>
        </div>
        <div className="window-actions">
          {/* {!isMobileScreen && (
            <div className="window-action-button">
              <IconButton
                icon={<RenameIcon />}
                bordered
                onClick={() => setIsEditingMessage(true)}
              />
            </div>
          )} */}
          {/* <div className="window-action-button">
            <IconButton
              icon={<ExportIcon />}
              bordered
              // title={Locale.Chat.Actions.Export}
              onClick={() => {
                // setShowExport(true);
              }}
            />
          </div> */}
          {/* {showMaxIcon && (
            <div className="window-action-button">
              <IconButton
                icon={config.tightBorder ? <MinIcon /> : <MaxIcon />}
                bordered
                onClick={() => {
                  config.update(
                    (config) => (config.tightBorder = !config.tightBorder),
                  );
                }}
              />
            </div>
          )} */}
        </div>
      </div>

      {/* chat body */}
      <div
        className={styles["chat-body"]}
        ref={scrollRef}
        onScroll={(e) => onChatBodyScroll(e.currentTarget)}
        onMouseDown={() => inputRef.current?.blur()}
        onTouchStart={() => {
          inputRef.current?.blur();
          setAutoScroll(false);
        }}
      >
        {messages.map((message, i) => {
          const isUser =
            message.role === "user" || message.role === "user-settings";
          const isContext = i < context.length;
          const showActions =
            i > 0 &&
            !(message.preview || message.content.length === 0) &&
            !isContext;
          const showTyping = message.preview || message.streaming;

          const shouldShowClearContextDivider = i === clearContextIndex - 1;

          return (
            <Fragment key={message.id}>
              <div
                className={
                  isUser ? styles["chat-message-user"] : styles["chat-message"]
                }
              >
                <div className={styles["chat-message-container"]}>
                  <div className={styles["chat-message-header"]}>
                    {/* 아바타(캐릭터) 아이콘 */}
                    <div className={styles["chat-message-avatar"]}>
                      <> {/* 말풍선 유저 아이콘 */} </>
                      {isUser ? (
                        <></> /*<Avatar avatar={config.avatar} />*/
                      ) : (
                        <>
                          {/* 말풍선 챗봇 아이콘 */}
                          {["system"].includes(message.role) ? (
                            <Avatar avatar="2699-fe0f" />
                          ) : (
                            <MaskAvatar
                              avatar={session.mask.avatar}
                              model={
                                message.model || session.mask.modelConfig.model
                              }
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* 입력중... 텍스트 */}
                  {/* {showTyping && (
                    <div className={styles["chat-message-status"]}>
                      {Locale.Chat.Typing}
                    </div>
                  )} */}

                  {/* 메시지 말풍선 */}
                  <div className={styles["chat-message-item"]}>
                    <Markdown
                      content={message.content ? message.content : "보키는 생각할 시간이 필요해요!"}
                      loading={
                        (message.preview || message.streaming) &&
                        message.content.length === 0 &&
                        !isUser && userInputStatus === UserInputCallbackStatus.Progress
                      }
                      onContextMenu={(e) => onRightClick(e, message)}
                      onDoubleClickCapture={() => {
                        if (!isMobileScreen) return;
                        setUserInput(message.content);
                      }}
                      onLinkClick={handleLinkClick}
                      fontSize={fontSize}
                      parentRef={scrollRef}
                      defaultShow={i >= messages.length - 6}
                      isUserText={isUser}
                    />
                  </div>

                  {/* 메시지 말풍선 아래 날짜 */}
                  <div className={styles["chat-message-action-date"]}>
                    {message.date.toLocaleString()}
                  </div>
                </div>
              </div>
              {shouldShowClearContextDivider && <ClearContextDivider />}
            </Fragment>
          );
        })}

        {isShowChatUser && (
          <ChatUser onButtonClick={handleButtonClickUserName} />
        )}
        {isShowChatGender && (
          <ChatGender onButtonClick={handleButtonClickGender} />
        )}
      </div>

      {/* 입력창 */}
      { isLoadingStartConversation ? (
        <Skeleton
        className={styles["chat-input"]}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          backgroundColor: "#F2F2F2",
        }}
      />
      ) : 
      isShowKeyboard && (
      <div className={styles["chat-input-panel"]}>
        <div className={styles["chat-input-panel-inner"]}>
          <textarea
            ref={inputRef}
            className={`${styles["chat-input"]} ${
              !isEnabledKeyboard ? styles["disabled-input"] : ""
            }`}
            placeholder={getPlaceholder()}
            onInput={(e) => onInput(e.currentTarget.value)}
            value={userInput}
            onKeyDown={onInputKeyDown}
            onFocus={scrollToBottom}
            onClick={scrollToBottom}
            rows={inputRows}
            autoFocus={autoFocus}
            style={{
              fontSize: config.fontSize,
            }}
          />
          <IconButton
            icon={<SendWhiteIcon />}
            // text={Locale.Chat.Send}
            text=""
            className={`${styles["chat-input-send"]} ${
              !isEnabledKeyboard ? styles["disabled-input"] : ""
            }`}
            type={null}
            onClick={() => doSubmit(userInput)}
          />
        </div>

        <div className={styles["label-chatgpt"]}>
          <p className={styles["chatgpt"]}>
            보키는 인공지능 기반 챗봇으로 부정확한 정보를 표시할 수 있습니다.
          </p>
        </div>
      </div>
      )
      }
        
      {/* )} */}
      {/* TODO: go */}
      {/* 우상단 버튼 이벤트 */}
      {/* {showExport && (
        <ExportMessageModal onClose={() => setShowExport(false)} />
      )} */}
    </div>
  );
}

export function Chat() {
  const chatStore = useChatStore();
  const sessionIndex = chatStore.currentSessionIndex;
  return <_Chat key={sessionIndex}></_Chat>;
}
