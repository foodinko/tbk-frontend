import { 
  StoreKey,
  USER_COOKIE_VALUE_KEY,
} from "../constant";
import { getHeaders } from "../client/api";
import { createPersistStore } from "../utils/store";
import { ensure } from "../utils/clone";

//-- Begin 백엔드 constants.py에 정의된 내용과 동기화 필요 --

// 챗봇 제공 링크(스마트스토어 또는 가게)
export const TBK_SOTRE_LINK_LLM_PROVIDE = "TBK_SOTRE_LINK_LLM_PROVIDE";
export const TBK_SOTRE_LINK_LLM_CLICKED = "TBK_SOTRE_LINK_LLM_CLICKED";
export const TBK_SOTRE_LINK_LLM_COPIED = "TBK_SOTRE_LINK_LLM_COPIED";

export const TBK_TBK_RESTAURANT_LLM_PROVIDE = "TBK_TBK_RESTAURANT_LLM_PROVIDE";
export const TBK_TBK_RESTAURANT_LLM_CLICKED = "TBK_TBK_RESTAURANT_LLM_CLICKED";
export const TBK_TBK_RESTAURANT_LLM_COPIED = "TBK_TBK_RESTAURANT_LLM_COPIED";

// 프론트엔드 제공 스마트 스토어 링크(대화 20턴 이후)
export const TBK_STORE_LINK_TURNS_OVER_PROVIDE =
  "TBK_STORE_LINK_TURNS_OVER_PROVIDE";
export const TBK_STORE_LINK_TURNS_OVER_CLICKED =
  "TBK_STORE_LINK_TURNS_OVER_CLICKED";
export const TBK_STORE_LINK_TURNS_OVER_COPIED =
  "TBK_STORE_LINK_TURNS_OVER_COPIED";

// 사용자가 챗봇 링크를 복사함
export const TBK_CHATBOT_LINK_COPIED = "TBK_CHATBOT_LINK_COPIED";

//-- End 백엔드 constants.py에 정의된 내용과 동기화 필요 --

const CONVERSATION_STATE_NOT_STARTED = "NOT_STARTED";
const CONVERSATION_STATE_IN_PROGRESS = "IN_PROGRESS";
const CONVERSATION_STATE_FINISHED = "FINISHED";

const FETCH_STATE_NOT_STARTED = 0;
const FETCH_STATE_FETCHING = 1;
const FETCH_STATE_DONE = 2;

let fetchState = FETCH_STATE_NOT_STARTED;

const DEFAULT_USER_STATE = {
  userName: "",
  gender: "",

  userId: 0,
  cookieValue: "",

  conversationId: 0,
  greeting: "",
  startTime: "",

  linkLlmState: "", // 챗봇 링크 상태
  linkTurnsOverState: "", // 20턴 이후 스마트스토어 링크 상태

  conversationState: "",
};

export type RegisterUserCallback = (
  error: Error | null,
  userId?: number,
  cookieValue?: string,
) => void;

export type FetchUserCallback = (
  error: Error | null,
) => void;

export type StartConversationCallback = (
  error: Error | null,
  conversationId?: number,
  greeting?: string,
  startTime?: string,
) => void;

export const useUserStore = createPersistStore(
  // 초기값
  DEFAULT_USER_STATE,

  (set, get) => ({

    resetUser: () => {
      set({ ...DEFAULT_USER_STATE });
    },

    setUserName: (userName: string) => {
      set({ userName });
    },

    setGender: (gender: string) => {
      set({ gender });
    },

    setUserId: (userId: number) => {
      set({ userId });
    },

    setCookieValue: (cookieValue: string) => {
      set({ cookieValue });
    },

    hasCookieValue() {
      return ensure(get(), ["cookieValue"]);
    },

    setConversationId: (conversationId: number) => {
      set({ conversationId });
    },

    setLinkLlmState: (linkLlmState: string) => {
      set({ linkLlmState });
    },

    setLinkTurnsOverState: (linkTurnsOverState: string) => {
      set({ linkTurnsOverState });
    },

    setConversationStateNotStarted: () => {
      set({ conversationState: CONVERSATION_STATE_NOT_STARTED });
    },

    setConversationStateInProgress: () => {
      set({ conversationState: CONVERSATION_STATE_IN_PROGRESS });
    },

    setConversationStateFinished: () => {
      set({ conversationState: CONVERSATION_STATE_FINISHED });
    },

    isConversationStateNotStarted() {
      return get().conversationState === CONVERSATION_STATE_NOT_STARTED;
    },

    isConversationStateInProgress() {
      return get().conversationState === CONVERSATION_STATE_IN_PROGRESS;
    },

    isConversationStateFinished() {
      return get().conversationState === CONVERSATION_STATE_FINISHED;
    },

    async registerUser(
      name: string,
      gender: string,
      callback: RegisterUserCallback,
    ) {
      if (fetchState !== FETCH_STATE_NOT_STARTED) return;
      fetchState = FETCH_STATE_FETCHING;

      const controller = new AbortController();
      const path = "/api/foodinko/user/register_user";
      const params = {
        name: name,
        gender: gender,
      };
      const payload = {
        method: "POST",
        body: JSON.stringify(params),
        signal: controller.signal,
        headers: getHeaders(),
      };

      console.log("[user.ts] registerUser path: ", path)
      console.log("[user.ts] registerUser payload: ", payload)

      fetch(path, payload)
        .then((res: Response) => {
          if (res.ok) {
            console.log("[user.ts] registerUser res: Response ", res);
            return res.json();
          } else {
            throw new Error(res.statusText);
          }
        })
        .then((res: any) => {
          console.log("[user.ts] registerUser res: any ", res);

          fetchState = FETCH_STATE_NOT_STARTED;

          const { user_id, cookie_value } = res;

          set({
            userId: user_id,
            cookieValue: cookie_value,
            userName: name,
            gender: gender,
          });

          callback(null, user_id, cookie_value);
        })
        .catch((err) => {
          console.log("[user.ts] registerUser err: ", err);
          fetchState = FETCH_STATE_NOT_STARTED;
          // this.resetUser();
          callback(err);
        })
        .finally(() => {
          fetchState = FETCH_STATE_NOT_STARTED;
        });
    },

    async fetchUserInfo(cookieValue: string, callback: FetchUserCallback) {
      if (fetchState > FETCH_STATE_NOT_STARTED) return;
      fetchState = FETCH_STATE_FETCHING;

      console.log("[user.ts] fetchUserInfo start");

      const path =
        "/api/foodinko/user/authenticate_user" +
        (cookieValue ? `/${cookieValue}` : "");

      fetch(path, {
        method: "get",
        body: null,
        headers: {
          ...getHeaders(),
        },
      })
        .then((res: Response) => {
          if (res.ok) {
            console.log("[user.ts] fetchUserInfo res: Response ", res);
            return res.json();
          } else {
            throw new Error(res.statusText);
          }
        })
        .then((res: any) => {
          console.log("[user.ts] fetchUserInfo res: any ", res);

          fetchState = FETCH_STATE_NOT_STARTED;

          const { gender, name, user_id } = res;

          set({ gender: gender, userName: name, userId: user_id });
          callback(null);

          console.log(
            "[user.ts] fetchUserInfo gender: " +
              get().gender +
              ", userName: " +
              get().userName +
              ", userId: " +
              get().userId,
          );
        })
        .catch((err) => {
          console.log("[user.ts] fetchUserInfo err: ", err);

          fetchState = FETCH_STATE_NOT_STARTED;

          callback(err);
          
          // FYI: 사용자 정보 조회 중 새로고침으로 중단되면 catch에 걸리고, 사용자 정보가 초기화됨
          // this.resetUser();
        })
        .finally(() => {
          fetchState = FETCH_STATE_NOT_STARTED;
        });
    },

    async startConversation(callback: StartConversationCallback) {
      if (fetchState > FETCH_STATE_NOT_STARTED) return;
      fetchState = FETCH_STATE_FETCHING;

      console.log("[user.ts] startConversation start");

      const controller = new AbortController();
      const path = "/api/foodinko/chat/start_conversation";
      const params = {
        user_id: get().userId,
      };
      const payload = {
        method: "POST",
        body: JSON.stringify(params),
        signal: controller.signal,
        headers: getHeaders(),
      };

      fetch(path, payload)
        .then((res: Response) => {
          if (res.ok) {
            console.log("[user.ts] startConversation res: Response ", res);
            return res.json();
          } else {
            throw new Error(res.statusText);
          }
        })
        .then((res: any) => {
          console.log("[user.ts] startConversation res: any ", res);

          fetchState = FETCH_STATE_NOT_STARTED;

          const { conversation_id, greeting, start_time } = res;

          set({
            conversationId: conversation_id,
            greeting: greeting,
            startTime: start_time,
          });

          callback(null, conversation_id, greeting, start_time);
        })
        .catch((err) => {
          console.log("[user.ts] startConversation err: ", err);

          fetchState = FETCH_STATE_NOT_STARTED;

          callback(err);
        })
        .finally(() => {
          fetchState = FETCH_STATE_NOT_STARTED;
        });
    },
  }),

  // persist
  {
    name: StoreKey.User,
    version: 2, // 업데이트 버전 번호
    migrate(persistedState, version) {
      console.log("[user.ts] migrate", persistedState, version);
      const state = persistedState as any;
      const newState = JSON.parse(
        JSON.stringify(state),
      ) as typeof DEFAULT_USER_STATE;

      if ( version <= 1) {

        return { ...DEFAULT_USER_STATE };
      }

      return newState as any;

      // switch (version) {
      //   case 0:
      //     return { ...DEFAULT_USER_STATE };

      //     // case 1:
      //       // 버전 1에서 2로 마이그레이션
      //       // DEFAULT_USER_STATE에 새 필드가 있거나 변환이 필요한 경우
      //       // const updatedVersion = {
      //         // ...persistedState,
      //         // 필요에 따라 새 필드를 추가하거나 기존 필드를 업데이트합니다.
      //         // Example: newField: 'defaultValue',
      //       // };
      //       // return updatedVersion;          
          
      //   default:
      //     return persistedState;
      // }
      // return persistedState as any;
    },
  },
);
