import { NextResponse } from "next/server";
import { getTweet } from "react-tweet/api";

import { loadTweetProxy } from "../tweet-proxy";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await loadTweetProxy(id, getTweet);
  return NextResponse.json(result.body, { status: result.status });
}
