import { trimTopic } from "../utils";

import Locale, { getLang } from "../locales";
import { showToast } from "../components/ui-lib";
import { ModelConfig, ModelType, useAppConfig } from "./config";
import { createEmptyMask, Mask } from "./mask";
import {
  DEFAULT_INPUT_TEMPLATE,
  DEFAULT_SYSTEM_TEMPLATE,
  KnowledgeCutOffDate,
  ModelProvider,
  StoreKey,
  SUMMARIZE_MODEL,
} from "../constant";
import { ClientApi, ROLES, MessageRole , RequestMessage } from "../client/api";
import { ChatControllerPool } from "../client/controller";
import { prettyObject } from "../utils/format";
import { estimateTokenLength } from "../utils/token";
import { nanoid } from "nanoid";
import { createPersistStore } from "../utils/store";
import { stringify } from "querystring";
import { useUserStore } from "./user";

export type ChatMessage = RequestMessage & {
  id: string;
  role: string;
  content: string;
  date: string;
  model?: ModelType;
  streaming?: boolean;
  isError?: boolean;
  conversationId: number;
};

export function createMessage(override: Partial<ChatMessage>): ChatMessage {
  return {
    id: nanoid(),
    role: ROLES[0],
    content: "",
    date: new Date().toLocaleString(),
    conversationId: 0,
    ...override,
  };
}

export interface ChatStat {
  tokenCount: number;
  wordCount: number;
  charCount: number;
}

export interface ChatSession {
  id: string;
  topic: string;

  memoryPrompt: string;
  messages: ChatMessage[];
  stat: ChatStat;
  lastUpdate: number;
  lastSummarizeIndex: number;
  clearContextIndex?: number;

  mask: Mask;
}

export const MAX_MESSAGE_COUNT: number = 10;
export const SESSION_LIMIT_MIN: number = 30;

export const DEFAULT_TOPIC = Locale.Store.DefaultTopic;

export const BOT_HELLO: ChatMessage = createMessage({
  role: "assistant",
  content: Locale.Store.BotHello,
});

export const BOT_ASK_GENDER: ChatMessage = createMessage({
  role: "assistant",
  content: Locale.Store.BotAskGender,
});

export const BOT_ASK_NAME: ChatMessage = createMessage({
  role: "assistant",
  content: Locale.Store.BotAskName,
});

export const BOT_WHAT_KIND_TBK: (userName: string) => ChatMessage = (userName: string) => {
  return createMessage({
    role: "assistant",
    content: Locale.Store.BotWhatKindTbk(userName),
  });
};

export const BOT_EMPTY_COUNT: (userName: string) => ChatMessage = (userName: string) => {
  return createMessage({
    role: "assistant",
    content: Locale.Store.BotEmptyCount(userName),
  });
};

export const BOT_WELCOME_BACK: (userName: string) => ChatMessage = (userName: string) => {
  return createMessage({
    role: "assistant",
    content: Locale.Store.BotWelcomeBack(userName),
  });
};

export const BOT_WELCOME_LONG_TIME: (userName: string) => ChatMessage = (userName: string) => {
  return createMessage({
    role: "assistant",
    content: Locale.Store.BotWelcomeLongTime(userName),
  });
};

export enum SendMessageCallbackStatus {
  None = "None",
  Error = "Error",
  Progress = "Progress",
  Update = "Update",
  Finish = "Finish",
}

export type SendMessageCallback = (
  error: Error | null,
  status: SendMessageCallbackStatus,
) => void;

function createEmptySession(): ChatSession {
  return {
    id: nanoid(),
    topic: DEFAULT_TOPIC,
    memoryPrompt: "",
    messages: [],
    stat: {
      tokenCount: 0,
      wordCount: 0,
      charCount: 0,
    },
    lastUpdate: Date.now(),
    lastSummarizeIndex: 0,

    mask: createEmptyMask(),
  };
}

function getSummarizeModel(currentModel: string) {
  // if it is using gpt-* models, force to use 3.5 to summarize
  return currentModel.startsWith("gpt") ? SUMMARIZE_MODEL : currentModel;
}

function countMessages(msgs: ChatMessage[]) {
  return msgs.reduce((pre, cur) => pre + estimateTokenLength(cur.content), 0);
}

function fillTemplateWith(input: string, modelConfig: ModelConfig) {
  let cutoff =
    KnowledgeCutOffDate[modelConfig.model] ?? KnowledgeCutOffDate.default;

  const vars = {
    cutoff,
    model: modelConfig.model,
    time: new Date().toLocaleString(),
    lang: getLang(),
    input: input,
  };

  let output = modelConfig.template ?? DEFAULT_INPUT_TEMPLATE;

  // must contains {{input}}
  const inputVar = "{{input}}";
  if (!output.includes(inputVar)) {
    output += "\n" + inputVar;
  }

  Object.entries(vars).forEach(([name, value]) => {
    output = output.replaceAll(`{{${name}}}`, value);
  });

  return output;
}

const DEFAULT_CHAT_STATE = {
  sessions: [createEmptySession()],
  currentSessionIndex: 0,
};

export const useChatStore = createPersistStore(
  DEFAULT_CHAT_STATE,
  (set, _get) => {
    function get() {
      return {
        ..._get(),
        ...methods,
      };
    }

    const methods = {
      clearSessions() {
        set(() => ({
          sessions: [createEmptySession()],
          currentSessionIndex: 0,
        }));
      },

      selectSession(index: number) {
        set({
          currentSessionIndex: index,
        });
      },

      moveSession(from: number, to: number) {
        set((state) => {
          const { sessions, currentSessionIndex: oldIndex } = state;

          // move the session
          const newSessions = [...sessions];
          const session = newSessions[from];
          newSessions.splice(from, 1);
          newSessions.splice(to, 0, session);

          // modify current session id
          let newIndex = oldIndex === from ? to : oldIndex;
          if (oldIndex > from && oldIndex <= to) {
            newIndex -= 1;
          } else if (oldIndex < from && oldIndex >= to) {
            newIndex += 1;
          }

          return {
            currentSessionIndex: newIndex,
            sessions: newSessions,
          };
        });
      },

      newSession(mask?: Mask) {
        const session = createEmptySession();

        if (mask) {
          const config = useAppConfig.getState();
          const globalModelConfig = config.modelConfig;

          session.mask = {
            ...mask,
            modelConfig: {
              ...globalModelConfig,
              ...mask.modelConfig,
            },
          };
          session.topic = mask.name;
        }

        set((state) => ({
          currentSessionIndex: 0,
          sessions: [session].concat(state.sessions),
        }));
      },

      nextSession(delta: number) {
        const n = get().sessions.length;
        const limit = (x: number) => (x + n) % n;
        const i = get().currentSessionIndex;
        get().selectSession(limit(i + delta));
      },

      deleteSession(index: number) {
        const deletingLastSession = get().sessions.length === 1;
        const deletedSession = get().sessions.at(index);

        if (!deletedSession) return;

        const sessions = get().sessions.slice();
        sessions.splice(index, 1);

        const currentIndex = get().currentSessionIndex;
        let nextIndex = Math.min(
          currentIndex - Number(index < currentIndex),
          sessions.length - 1,
        );

        if (deletingLastSession) {
          nextIndex = 0;
          sessions.push(createEmptySession());
        }

        // for undo delete action
        const restoreState = {
          currentSessionIndex: get().currentSessionIndex,
          sessions: get().sessions.slice(),
        };

        set(() => ({
          currentSessionIndex: nextIndex,
          sessions,
        }));

        showToast(
          Locale.Home.DeleteToast,
          {
            text: Locale.Home.Revert,
            onClick() {
              set(() => restoreState);
            },
          },
          5000,
        );
      },

      currentSession() {
        let index = get().currentSessionIndex;
        const sessions = get().sessions;

        if (index < 0 || index >= sessions.length) {
          index = Math.min(sessions.length - 1, Math.max(0, index));
          set(() => ({ currentSessionIndex: index }));
        }

        const session = sessions[index];

        return session;
      },

      onNewMessage(message: ChatMessage) {
        get().updateCurrentSession((session) => {
          session.messages = session.messages.concat();
          session.lastUpdate = Date.now();
        });
        get().updateStat(message);
        // get().summarizeSession();
      },

      async onUserInput(content: string, callback?: SendMessageCallback) {
        
        callback && callback(null, SendMessageCallbackStatus.Progress);

        const session = get().currentSession();
        const modelConfig = session.mask.modelConfig;

        // console.log("[chat.ts] session: " + stringify(session));
        console.log("[chat.ts] model config: " + stringify(modelConfig));


        const userContent = fillTemplateWith(content, modelConfig);
        console.log("[chat.ts] after template: ", userContent);

        const userMessage: ChatMessage = createMessage({
          role: "user",
          content: userContent,
          conversationId: useUserStore.getState().conversationId,
        });

        const botMessage: ChatMessage = createMessage({
          role: "assistant",
          streaming: true,
          model: modelConfig.model,
          conversationId: useUserStore.getState().conversationId,
        });

        console.log("[chat.ts] onUserInput() userMessage: ", userMessage);
        console.log("[chat.ts] onUserInput() botMessage: ", botMessage);

        // get recent messages
        const recentMessages = get().getMessagesWithMemory();
        const sendMessages = recentMessages.concat(userMessage);
        const messageIndex = get().currentSession().messages.length + 1;

        // save user's and bot's message
        get().updateCurrentSession((session) => {
          const savedUserMessage = {
            ...userMessage,
            content,
          };
          session.messages = session.messages.concat([
            savedUserMessage,
            botMessage,
          ]);
        });

        console.log(
          "[chat.ts] onUserInput() modelConfig.model: ",
          modelConfig.model,
        );

        var api: ClientApi;
        if (modelConfig.model === "foodinko-tbk") {
          console.log(
            "[chat.ts] onUserInput() foodinko-tbk modelConfig.model: ",
            modelConfig.model,
          );
          api = new ClientApi(ModelProvider.FoodinkoTbk);
        } else if (modelConfig.model === "gemini-pro") {
          console.log(
            "[chat.ts] onUserInput() gemini-pro modelConfig.model: ",
            modelConfig.model,
          );
          api = new ClientApi(ModelProvider.GeminiPro);
        } else {
          console.log(
            "[chat.ts] onUserInput() gpt modelConfig.model: ",
            modelConfig.model,
          );
          api = new ClientApi(ModelProvider.GPT);
        }

        // make request
        api.llm.chat({
          messages: sendMessages,
          config: { ...modelConfig, stream: true },
          onUpdate(message) {
            botMessage.streaming = true;
            if (message) {
              botMessage.content = message;
            }
            get().updateCurrentSession((session) => {
              session.messages = session.messages.concat();
            });

            callback && callback(null, SendMessageCallbackStatus.Update);
          },
          onFinish(message) {
            botMessage.streaming = false;
            if (message) {
              botMessage.content = message;
              get().onNewMessage(botMessage);
            }
            ChatControllerPool.remove(session.id, botMessage.id);

            callback && callback(null, SendMessageCallbackStatus.Finish);
          },
          onError(error) {
            const isAborted = error.message.includes("aborted");

            // botMessage.content +=
            //   "\n\n" +
            //   prettyObject({
            //     error: true,
            //     message: error.message,
            //   });
            // TODO: 메시지 변경 필요
            botMessage.content = "보키가 답변을 생성하지 못했어요.";

            botMessage.streaming = false;
            userMessage.isError = !isAborted;
            botMessage.isError = !isAborted;

            get().updateCurrentSession((session) => {
              session.messages = session.messages.concat();
            });
            
            ChatControllerPool.remove(
              session.id,
              botMessage.id ?? messageIndex,
            );

            console.error("[chat.ts] failed ", error);

            callback && callback(error, SendMessageCallbackStatus.Error);
          },
          onController(controller) {
            // collect controller for stop/retry
            ChatControllerPool.addController(
              session.id,
              botMessage.id ?? messageIndex,
              controller,
            );
          },
        });
      },

      onSendUserMessage(content: string, callback?: SendMessageCallback) {
        callback && callback(null, SendMessageCallbackStatus.Progress);

        const session = get().currentSession();
        const modelConfig = session.mask.modelConfig;
        const userContent = fillTemplateWith(content, modelConfig);

        console.log("[onSendUserMessage] userContent: ", userContent);

        const userMessage: ChatMessage = createMessage({
          role: "user-settings",
          content: userContent,
        });
        
        get().updateCurrentSession((session) => {
          session.messages = session.messages.concat([userMessage]);
          setTimeout(() => {
            callback && callback(null, SendMessageCallbackStatus.Finish);
          }, 500);
        });
      },

      onSendChatbotMessage(content: string, callback?: SendMessageCallback) {
        const session = get().currentSession();
        const modelConfig = session.mask.modelConfig;
        const userContent = fillTemplateWith(content, modelConfig);

        console.log("[onSendChatbotMessage] userContent: ", userContent);

        const botMessage: ChatMessage = createMessage({
          role: "assistant",
          content: userContent,
        });

        get().updateCurrentSession((session) => {
          session.messages = session.messages.concat([botMessage]);
          setTimeout(() => {
            callback && callback(null, SendMessageCallbackStatus.Finish);
          }, 500);
        });
      },

      getMemoryPrompt() {
        const session = get().currentSession();

        return {
          role: "system",
          content:
            session.memoryPrompt.length > 0
              ? Locale.Store.Prompt.History(session.memoryPrompt)
              : "",
          date: "",
        } as ChatMessage;
      },

      getMessagesWithMemory() {
        const session = get().currentSession();
        const modelConfig = session.mask.modelConfig;
        const clearContextIndex = session.clearContextIndex ?? 0;
        const messages = session.messages.slice();
        const totalMessageCount = session.messages.length;

        // in-context prompts
        const contextPrompts = session.mask.context.slice();

        // system prompts, to get close to OpenAI Web ChatGPT
        const shouldInjectSystemPrompts =
          modelConfig.enableInjectSystemPrompts &&
          session.mask.modelConfig.model.startsWith("gpt-");

        var systemPrompts: ChatMessage[] = [];
        systemPrompts = shouldInjectSystemPrompts
          ? [
              createMessage({
                role: "system",
                content: fillTemplateWith("", {
                  ...modelConfig,
                  template: DEFAULT_SYSTEM_TEMPLATE,
                }),
              }),
            ]
          : [];
        if (shouldInjectSystemPrompts) {
          console.log(
            "[Global System Prompt] ",
            systemPrompts.at(0)?.content ?? "empty",
          );
        }

        // long term memory
        const shouldSendLongTermMemory =
          modelConfig.sendMemory &&
          session.memoryPrompt &&
          session.memoryPrompt.length > 0 &&
          session.lastSummarizeIndex > clearContextIndex;
        const longTermMemoryPrompts = shouldSendLongTermMemory
          ? [get().getMemoryPrompt()]
          : [];
        const longTermMemoryStartIndex = session.lastSummarizeIndex;

        // short term memory
        const shortTermMemoryStartIndex = Math.max(
          0,
          totalMessageCount - modelConfig.historyMessageCount,
        );

        // lets concat send messages, including 4 parts:
        // 0. system prompt: to get close to OpenAI Web ChatGPT
        // 1. long term memory: summarized memory messages
        // 2. pre-defined in-context prompts
        // 3. short term memory: latest n messages
        // 4. newest input message
        const memoryStartIndex = shouldSendLongTermMemory
          ? Math.min(longTermMemoryStartIndex, shortTermMemoryStartIndex)
          : shortTermMemoryStartIndex;
        // and if user has cleared history messages, we should exclude the memory too.
        const contextStartIndex = Math.max(clearContextIndex, memoryStartIndex);
        const maxTokenThreshold = modelConfig.max_tokens;

        // get recent messages as much as possible
        const reversedRecentMessages = [];
        for (
          let i = totalMessageCount - 1, tokenCount = 0;
          i >= contextStartIndex && tokenCount < maxTokenThreshold;
          i -= 1
        ) {
          const msg = messages[i];
          if (!msg || msg.isError) continue;
          tokenCount += estimateTokenLength(msg.content);
          reversedRecentMessages.push(msg);
        }

        // concat all messages
        const recentMessages = [
          ...systemPrompts,
          ...longTermMemoryPrompts,
          ...contextPrompts,
          ...reversedRecentMessages.reverse(),
        ];

        return recentMessages;
      },

      updateMessage(
        sessionIndex: number,
        messageIndex: number,
        updater: (message?: ChatMessage) => void,
      ) {
        const sessions = get().sessions;
        const session = sessions.at(sessionIndex);
        const messages = session?.messages;
        updater(messages?.at(messageIndex));
        set(() => ({ sessions }));
      },

      resetSession() {
        get().updateCurrentSession((session) => {
          session.messages = [];
          session.memoryPrompt = "";
        });
      },

      updateStat(message: ChatMessage) {
        get().updateCurrentSession((session) => {
          session.stat.charCount += message.content.length;
          // TODO: should update chat count and word count
        });
      },

      updateCurrentSession(updater: (session: ChatSession) => void) {
        const sessions = get().sessions;
        const index = get().currentSessionIndex;
        updater(sessions[index]);
        set(() => ({ sessions }));
      },

      clearAllData() {
        localStorage.clear();
        location.reload();
      },
    };

    return methods;
  },
  {
    name: StoreKey.Chat,
    version: 3.1,
    migrate(persistedState, version) {
      const state = persistedState as any;
      const newState = JSON.parse(
        JSON.stringify(state),
      ) as typeof DEFAULT_CHAT_STATE;

      if (version < 2) {
        newState.sessions = [];

        const oldSessions = state.sessions;
        for (const oldSession of oldSessions) {
          const newSession = createEmptySession();
          newSession.topic = oldSession.topic;
          newSession.messages = [...oldSession.messages];
          newSession.mask.modelConfig.sendMemory = true;
          newSession.mask.modelConfig.historyMessageCount = 4;
          newSession.mask.modelConfig.compressMessageLengthThreshold = 1000;
          newState.sessions.push(newSession);
        }
      }

      if (version < 3) {
        // migrate id to nanoid
        newState.sessions.forEach((s) => {
          s.id = nanoid();
          s.messages.forEach((m) => (m.id = nanoid()));
        });
      }

      // Enable `enableInjectSystemPrompts` attribute for old sessions.
      // Resolve issue of old sessions not automatically enabling.
      if (version < 3.1) {
        newState.sessions.forEach((s) => {
          if (
            // Exclude those already set by user
            !s.mask.modelConfig.hasOwnProperty("enableInjectSystemPrompts")
          ) {
            // Because users may have changed this configuration,
            // the user's current configuration is used instead of the default
            const config = useAppConfig.getState();
            s.mask.modelConfig.enableInjectSystemPrompts =
              config.modelConfig.enableInjectSystemPrompts;
          }
        });
      }

      return newState as any;
    },
  },
);
