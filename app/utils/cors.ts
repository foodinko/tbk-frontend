import { getClientConfig } from "../config/client";
import {
  ApiPath,
  FOODINKO_CORS_HOST,
  // DEFAULT_CORS_HOST
} from "../constant";

export function corsPath(path: string) {
  //const baseUrl = getClientConfig()?.isApp ? `${DEFAULT_CORS_HOST}` : "";
  const baseUrl = `${FOODINKO_CORS_HOST}`;

  if (!path.startsWith("/")) {
    path = "/" + path;
  }

  if (!path.endsWith("/")) {
    path += "/";
  }

  return `${baseUrl}${path}`;
}

export function corsFetch(
  url: string,
  options: RequestInit & {
    proxyUrl?: string;
  },
) {

  console.log("[cors.ts] corsFetch url: ", url);
  console.log("[cors.ts] corsFetch options: ", options);

  let baseUrl = "http://3.26.233.124";
  let path = `${url}`.replaceAll("/api/foodinko", "/api");
  url = `${baseUrl}${path}`;

  console.log("[cors.ts] corsFetch url: ", url);

  // if (!url.startsWith("http")) {
  //   throw Error("[cors.ts Fetch] url must starts with http/https");
  // }

  let proxyUrl = options.proxyUrl ?? corsPath(ApiPath.Cors);
  if (!proxyUrl.endsWith("/")) {
    proxyUrl += "/";
  }

  console.log("[cors.ts] corsFetch proxyUrl: ", proxyUrl);

  url = url.replace("://", "/");

  console.log("[cors.ts] corsFetch url: ", url);

  const corsOptions = {
    ...options,
    method: "POST",
    headers: options.method
      ? {
          ...options.headers,
          method: options.method,
        }
      : options.headers,
  };

  console.log("[cors.ts] corsFetch corsOptions: ", corsOptions);

  const corsUrl = proxyUrl + url;

  console.log("[cors.ts] target = ", corsUrl);

  return fetch(corsUrl, corsOptions);
}
