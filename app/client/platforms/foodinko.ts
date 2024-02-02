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
import { getClientConfig } from "@/app/config/client";

import Locale from "../../locales";
import {
  EventStreamContentType,
  fetchEventSource,
} from "@fortaine/fetch-event-source";
import { prettyObject } from "@/app/utils/format";
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
    const clientConfig = getClientConfig();

    const baseUrl = clientConfig?.foodinkoUrl || "";
    const completePath = [baseUrl, path].join("/");

    console.log("[foodinko.ts] clientConfig: ", clientConfig);
    console.log("[foodinko.ts] baseUrl: ", baseUrl);
    console.log("[foodinko.ts] path: ", path);
    console.log("[foodinko.ts] completePath: ", completePath);

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

    console.log("[foodinko.ts] lastMessage: ", lastMessage);

    const requestPayload = {
      conversation_id: useUserStore.getState().conversationId,
      user_id: useUserStore.getState().userId,
      user_message: lastMessage[0].content,
    };

    console.log("[foodinko.ts] Request foodinko payload: ", requestPayload);

    let errored = false;
    const error = (e: any) => {
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

      console.log("[foodinko.ts] fetch start");
      console.log("[foodinko.ts] fetch start chatPath: ", chatPath);
      console.log("[foodinko.ts] fetch start chatPayload: ", chatPayload);

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

          // console.log("[foodinko.ts] responseText: ", responseText);
          // console.log("[foodinko.ts] remainText: ", remainText);

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
            console.log("[foodinko.ts] response: " + response);

            const reader = response?.body?.getReader();
            const decoder = new TextDecoder();
            let partialData = "";

            return reader?.read().then(function processText({
              done,
              value,
            }): Promise<any> {
              if (done) {
                console.log("[foodinko.ts] Stream complete");
                // options.onFinish(responseText + remainText);
                finished = true;
                return Promise.resolve();
              }

              partialData += decoder.decode(value, { stream: true });

              console.log("[foodinko.ts] partialData: ", partialData);

              try {
                let data = partialData;

                console.log("[foodinko.ts] data: ", data);

                const textArray = data.trim().split(" ");

                console.log("[foodinko.ts] textArray: ", textArray);
                console.log("[foodinko.ts] existingTexts: ", existingTexts);

                if (textArray.length > existingTexts.length) {
                  const deltaArray = textArray.slice(existingTexts.length);
                  existingTexts = textArray;
                  remainText += deltaArray.join("") + " ";

                  console.log("[foodinko.ts] deltaArray: ", deltaArray);
                  console.log("[foodinko.ts] existingTexts: ", existingTexts);
                  console.log("[foodinko.ts] remainText: ", remainText);
                }
              } catch (e) {
                errored = true;
                console.log(
                  "[foodinko.ts] Response Animation error: ",
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
            console.error("[foodinko.ts] Error:", e);
            error(e);
          });
      } else {
        const res = await fetch(chatPath, chatPayload);
        clearTimeout(requestTimeoutId);

        console.log("[foodinko.ts] Response-res: ", res);

        const resJson = await res.json();

        console.log("[foodinko.ts] Response-resJson: ", resJson);

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
