export const OWNER = "FOODINKO";
export const REPO = "FOODINKO-REPO";
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
export const ISSUE_URL = `https://www.foodinko.com`;
export const UPDATE_URL = `https://www.foodinko.com`;
export const RELEASE_URL = `https://www.foodinko.com`;
export const FETCH_COMMIT_URL = `https://www.foodinko.com`;
export const FETCH_TAG_URL = `https://wwww.foodinko.com`;
export const RUNTIME_CONFIG_DOM = "danger-runtime-config";

export const DEFAULT_CORS_HOST = "https://bokki.foodinko.com";
export const DEFAULT_API_HOST = `${DEFAULT_CORS_HOST}/api/proxy`;
export const OPENAI_BASE_URL = "https://api.openai.com";

export const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/";

export const FOODINKO_BASE_URL = `${process.env.MMW_TTBOKI_BACKEND_HOST}`;
export const FOODINKO_BASE_URL_DEV = "http://3.26.233.124";
export const FOODINKO_BASE_URL_DEV_LOCAL = "http://localhost:8000";

export const FOODINKO_CORS_HOST = `${FOODINKO_BASE_URL_DEV_LOCAL}`;
export const FOODINKO_API_HOST = `${FOODINKO_CORS_HOST}/api/`;

export enum Path {
  Home = "/",
  Chat = "/chat",
  Settings = "/settings",
  NewChat = "/new-chat",
  Masks = "/masks",
  Auth = "/auth",
}

export enum ApiPath {
  Cors = "/api/cors",
  OpenAI = "/api/openai",
}

export enum SlotID {
  AppBody = "app-body",
  CustomModel = "custom-model",
}

export enum FileName {
  Masks = "masks.json",
  Prompts = "prompts.json",
}

export enum StoreKey {
  Chat = "chat-next-web-store",
  Access = "access-control",
  Config = "app-config",
  Mask = "mask-store",
  Prompt = "prompt-store",
  Update = "chat-update",
  Sync = "sync",
  User = "user-info",
}

export const DEFAULT_SIDEBAR_WIDTH = 300;
export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 230;
export const NARROW_SIDEBAR_WIDTH = 100;

export const ACCESS_CODE_PREFIX = "nk-";

export const LAST_INPUT_KEY = "last-input";
export const UNFINISHED_INPUT = (id: string) => "unfinished-input-" + id;

export const STORAGE_KEY = "chatgpt-next-web";

export const REQUEST_TIMEOUT_MS = 60000;

export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown";

export const TBK_STORE_LINK_TURNS_OVER_PROVIDE = "TBK_STORE_LINK_TURNS_OVER_PROVIDE"; // 링크를 제공한 기록
export const TBK_STORE_LINK_TURNS_OVER_CLICKED = "TBK_STORE_LINK_TURNS_OVER_CLICKED"; // 제공된 링크를 클릭한 기록
export const TBK_CHATBOT_LINK_SHARED_KAKAO = "TBK_CHATBOT_LINK_SHARED_KAKAO"; // 카카오톡 공유하기 클릭
export const TBK_CHATBOT_LINK_SHARED_INSTA = "TBK_CHATBOT_LINK_SHARED_INSTA"; // 인스타그램 공유하기 클릭
export const TBK_CHATBOT_LINK_SHARED_URL_COPY = "TBK_CHATBOT_LINK_SHARED_URL_COPY"; // URL 복사하기 클릭

export const TBK_RESTAURANT_LLM_CLICKED = "TBK_RESTAURANT_LLM_CLICKED"; // 음식점 클릭

export enum ServiceProvider {
  OpenAI = "OpenAI",
  Azure = "Azure",
  Google = "Google",
  Foodinko = "Foodinko",
}

export enum ModelProvider {
  GPT = "GPT",
  GeminiPro = "GeminiPro",
  FoodinkoTbk = "FoodinkoTbk",
}

export const OpenaiPath = {
  ChatPath: "v1/chat/completions",
  UsagePath: "dashboard/billing/usage",
  SubsPath: "dashboard/billing/subscription",
  ListModelPath: "v1/models",
};

export const Azure = {
  ExampleEndpoint: "https://{resource-url}/openai/deployments/{deploy-id}",
};

export const Google = {
  ExampleEndpoint: "https://generativelanguage.googleapis.com/",
  ChatPath: "v1beta/models/gemini-pro:generateContent",

  // /api/openai/v1/chat/completions
};

export const FoodinkoPath = {
  ChatPath: "api/chat/completions",
};

export const DEFAULT_INPUT_TEMPLATE = `{{input}}`; // input / time / model / lang
export const DEFAULT_SYSTEM_TEMPLATE = `
You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: {{cutoff}}
Current model: {{model}}
Current time: {{time}}
Latex inline: $x^2$ 
Latex block: $$e=mc^2$$
`;

//export const SUMMARIZE_MODEL = "gpt-3.5-turbo";
export const SUMMARIZE_MODEL = "foodinko-tbk";

export const KnowledgeCutOffDate: Record<string, string> = {
  default: "2021-09",
  "gpt-4-1106-preview": "2023-04",
  "gpt-4-vision-preview": "2023-04",
};

export const DEFAULT_MODELS = [
  {
    name: "gpt-4",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-4-0314",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-4-0613",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-4-32k",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-4-32k-0314",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-4-32k-0613",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-4-1106-preview",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-4-vision-preview",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-3.5-turbo",
    available: false,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-3.5-turbo-0301",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-3.5-turbo-0613",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-3.5-turbo-1106",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-3.5-turbo-16k",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gpt-3.5-turbo-16k-0613",
    available: true,
    provider: {
      id: "openai",
      providerName: "OpenAI",
      providerType: "openai",
    },
  },
  {
    name: "gemini-pro",
    available: true,
    provider: {
      id: "google",
      providerName: "Google",
      providerType: "google",
    },
  },
  {
    name: "foodinko-tbk",
    available: true,
    provider: {
      id: "tbk",
      providerName: "Foodinko",
      providerType: "foodinko",
    },
  },
] as const;

export const CHAT_PAGE_SIZE = 15;
export const MAX_RENDER_MSG_COUNT = 45;
