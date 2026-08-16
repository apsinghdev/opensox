import { NextResponse } from "next/server";
import { getTweet } from "react-tweet/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const tweet = await getTweet(id);
    return NextResponse.json(
      { data: tweet ?? null },
      { status: tweet ? 200 : 404 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "failed to load tweet";
    return NextResponse.json({ data: null, error: message }, { status: 400 });
  }
}
