
import { NextRequest, NextResponse } from "next/server";

async function handle(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {

  console.log("[tbk Route] path ", params.path);
  console.log("[tbk Route] params ", params);
  console.log("[tbk Route] url ", req.url);
  console.log("[tbk Route] nextUrl ", req.nextUrl);
  console.log("[tbk Route] nextUrl.pathname ", req.nextUrl.pathname); // '/api/tbk'
  console.log("[tbk Route] nextUrl.search ", req.nextUrl.search); // '?user_id=20'
  console.log("[tbk Route] nextUrl.searchParams ", req.nextUrl.searchParams); // URLSearchParams { 'user_id' => '20' }
  console.log("[tbk Route] nextUrl.searchParams.get user_id ", req.nextUrl.searchParams.get('user_id')); // '20'

  if (req.method === "OPTIONS") {
    return NextResponse.json({ body: "OK" }, { status: 200 });
  }

  // 200 성공 HTTP
  return NextResponse.json(
    {
      error: false,
      msg: `tbk-test/${params.path.join(', ')}/route.ts`,
    },
    {
      status: 200,
    },
  );
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
