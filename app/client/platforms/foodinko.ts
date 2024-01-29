import {
  ApiPath,
  FOODINKO_BASE_URL,
  DEFAULT_MODELS,
  FoodinkoPath,
  REQUEST_TIMEOUT_MS,
  ServiceProvider,
  FOODINKO_BASE_URL_DEV_LOCAL,
} from "@/app/constant";
import {
  useAccessStore,
  useAppConfig,
  useChatStore,
  useUserStore,
} from "@/app/store";

import { ChatOptions, getHeaders, LLMApi, LLMModel, LLMUsage } from "../api";
import Locale from "../../locales";
import {
  EventStreamContentType,
  fetchEventSource,
} from "@fortaine/fetch-event-source";
import { prettyObject } from "@/app/utils/format";
import { getClientConfig } from "@/app/config/client";
import { makeAzurePath } from "@/app/azure";

export interface FoodinkoListModelResponse {
  object: string;
  data: Array<{
    id: string;
    object: string;
    root: string;
  }>;
}

export class FoodinkoApi implements LLMApi {
  private disableListModels = true;

  path(path: string): string {
    // TODO: baseUrl 개발 환경 구분
    const baseUrl = FOODINKO_BASE_URL_DEV_LOCAL;

    const completePath = [baseUrl, path].join("/");

    console.log("[FoodinkoApi] complete path: ", completePath);

    return completePath;
  }

  extractMessage(res: any) {
    return res.choices?.at(0)?.message?.content ?? "";
  }

  async chat(options: ChatOptions) {
    // 가장 마지막 요소의 메시지 가져오기
    const lastMessage = options.messages.slice(-1);
    // {
    //   "id": "NvJnLNtdyz3pxn_4z203J",
    //   "date": "2024. 1. 16. 오후 3:54:07",
    //   "role": "user",
    //   "content": "hi!!"
    // }

    console.log("[FoodinkoApi] lastMessage: ", lastMessage);

    const requestPayload = {
      conversation_id: useUserStore.getState().conversationId,
      user_id: useUserStore.getState().userId,
      user_message: lastMessage[0].content,
    };

    console.log("[FoodinkoApi] Request foodinko payload: ", requestPayload);

    let errored = false;
    const error = (e) => {
      errored = true;
      options.onError?.(e);
    };

    const shouldStream = true; //!!options.config.stream;
    const controller = new AbortController();
    options.onController?.(controller);
    try {
      const chatPath = this.path(FoodinkoPath.ChatPath);
      const chatPayload = {
        method: "POST",
        body: JSON.stringify(requestPayload),
        signal: controller.signal,
        headers: getHeaders(),
      };

      // make a fetch request
      const requestTimeoutId = setTimeout(
        () => controller.abort(),
        REQUEST_TIMEOUT_MS,
      );

      console.log("[FoodinkoApi] fetch start");
      console.log("[FoodinkoApi] fetch start chatPath: ", chatPath);
      console.log("[FoodinkoApi] fetch start chatPayload: ", chatPayload);

      if (shouldStream) {
        let responseText = "";
        let remainText = "";
        let streamChatPath = chatPath.replace(
          "completions",
          "stream_completions",
        );
        let finished = false;

        let existingTexts: string[] = [];
        const finish = () => {
          finished = true;
          options.onFinish(existingTexts.join(" "));
        };

        // animate response to make it looks smooth
        function animateResponseText() {
          if (errored) {
            return;
          }

          if (finished || controller.signal.aborted) {
            responseText += remainText;
            finish();
            return;
          }

          console.log("[FoodinkoApi] responseText: ", responseText);
          console.log("[FoodinkoApi] remainText: ", remainText);

          if (remainText.length > 0) {
            const fetchCount = Math.max(1, Math.round(remainText.length / 60));
            const fetchText = remainText.slice(0, fetchCount);
            responseText += fetchText;
            remainText = remainText.slice(fetchCount);

            options.onUpdate?.(responseText, fetchText);
          }

          requestAnimationFrame(animateResponseText);
        }

        // start animaion
        animateResponseText();
        fetch(streamChatPath, chatPayload)
          .then((response) => {
            console.log("[FoodinkoApi] response: " + response);

            const reader = response?.body?.getReader();
            const decoder = new TextDecoder();
            let partialData = "";

            return reader?.read().then(function processText({
              done,
              value,
            }): Promise<any> {
              if (done) {
                console.log("[FoodinkoApi] Stream complete");
                // options.onFinish(responseText + remainText);
                finished = true;
                return Promise.resolve();
              }

              partialData += decoder.decode(value, { stream: true });

              console.log("[FoodinkoApi] partialData: ", partialData);

              try {
                let data = partialData;

                console.log("[FoodinkoApi] data: ", data);

                const textArray = data.trim().split(" ");

                console.log("[FoodinkoApi] textArray: ", textArray);
                console.log("[FoodinkoApi] existingTexts: ", existingTexts);

                if (textArray.length > existingTexts.length) {
                  const deltaArray = textArray.slice(existingTexts.length);
                  existingTexts = textArray;
                  remainText += deltaArray.join("") + " ";

                  console.log("[FoodinkoApi] deltaArray: ", deltaArray);
                  console.log("[FoodinkoApi] existingTexts: ", existingTexts);
                  console.log("[FoodinkoApi] remainText: ", remainText);
                }
              } catch (e) {
                errored = true;
                console.log(
                  "[FoodinkoApi] Response Animation error: ",
                  e,
                  partialData,
                );
                error(e);
              }

              return reader.read().then(processText);
            });
          })
          .catch((e) => {
            errored = true;
            console.error("[FoodinkoApi] Error:", e);
            error(e);
          });
      } else {
        const res = await fetch(chatPath, chatPayload);
        clearTimeout(requestTimeoutId);

        console.log("[FoodinkoApi] Response-res: ", res);

        const resJson = await res.json();

        console.log("[FoodinkoApi] Response-resJson: ", resJson);

        const message = this.extractMessage(resJson);

        options.onFinish(message);
      }
    } catch (e) {
      errored = true;
      console.log("[Request] failed to make a chat request", e);
      error(e);
    }
  }
  usage(): Promise<LLMUsage> {
    throw new Error("Method not implemented.");
  }
  async models(): Promise<LLMModel[]> {
    return [];
  }
}

function ensureProperEnding(str: string) {
  if (str.startsWith("[") && !str.endsWith("]")) {
    return str + "]";
  }
  return str;
}
