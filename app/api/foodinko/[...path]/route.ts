import { NextRequest, NextResponse } from "next/server";
import { getServerSideConfig } from "@/app/config/server";

async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  console.log("[Foodinko Route] params ", params);

  if (req.method === "OPTIONS") {
    return NextResponse.json({ body: "OK" }, { status: 200 });
  }

  const controller = new AbortController();

  const serverConfig = getServerSideConfig();

  // let baseUrl = serverConfig.foodinkoUrl || "";
  let baseUrl = "http://3.26.233.124";

  // if (!baseUrl.startsWith("http")) {
  //   baseUrl = `https://${baseUrl}`;
  // }

  // if (baseUrl.endsWith("/")) {
  //   baseUrl = baseUrl.slice(0, -1);
  // }

  console.log("[Foodinko Route] Base Url: ", baseUrl);
  console.log("[Foodinko Route] params.path: ", params.path);
  console.log("[Foodinko Route] req.nextUrl.pathname: ", req.nextUrl.pathname);

  let path = `${req.nextUrl.pathname}`.replaceAll("/api/foodinko", "/api");

  console.log("[Foodinko Route] path: ", path);

  const timeoutId = setTimeout(
    () => {
      controller.abort();
    },
    10 * 60 * 1000,
  );

  const fetchUrl = `${baseUrl}${path}`;
  const fetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    method: req.method,
    body: req.body,
    // to fix #2485: https://stackoverflow.com/questions/55920957/cloudflare-worker-typeerror-one-time-use-body
    redirect: "manual",
    // @ts-ignore
    duplex: "half",
    signal: controller.signal,
  };

  console.log("[Foodinko Route] fetchUrl: ", fetchUrl);
  console.log("[Foodinko Route] fetchOptions: ", fetchOptions);

  try {
    const res = await fetch(fetchUrl, fetchOptions);
    // 자격 증명 묻는 메시지 표지하지 않기
    const newHeaders = new Headers(res.headers);
    newHeaders.delete("www-authenticate");
    // nginx 버퍼링을 비활성화
    newHeaders.set("X-Accel-Buffering", "no");

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders,
    });
  } catch (err) {
    console.log("[Foodinko Route] err: ", err);
    return NextResponse.json(err, {
      status: 500,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export const GET = handle;
export const POST = handle;

export const runtime = "edge";
export const preferredRegion = [
  "arn1",
  "bom1",
  "cdg1",
  "cle1",
  "cpt1",
  "dub1",
  "fra1",
  "gru1",
  "hnd1",
  "iad1",
  "icn1",
  "kix1",
  "lhr1",
  "pdx1",
  "sfo1",
  "sin1",
  "syd1",
];
