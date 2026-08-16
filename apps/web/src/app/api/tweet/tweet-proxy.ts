export const TWEET_FETCH_TIMEOUT_MS = 8_000;

export const TWEET_CLIENT_ERRORS = {
  invalidId: "invalid tweet id",
  notFound: "tweet not found",
  timeout: "tweet request timed out",
  provider: "tweet provider unavailable",
} as const;

export type TweetProxyResult = {
  status: number;
  body: { data: unknown; error?: string };
};

export type GetTweetFn = (
  id: string,
  fetchOptions?: RequestInit
) => Promise<unknown>;

export function isValidTweetId(id: string): boolean {
  return /^\d{1,19}$/.test(id);
}

function isTimeoutError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return error.name === "AbortError" || error.name === "TimeoutError";
}

function getErrorStatus(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null || !("status" in error)) {
    return undefined;
  }
  const status = (error as { status: unknown }).status;
  return typeof status === "number" ? status : undefined;
}

export function classifyTweetFetchFailure(error: unknown): {
  status: number;
  clientMessage: string;
} {
  if (isTimeoutError(error)) {
    return { status: 504, clientMessage: TWEET_CLIENT_ERRORS.timeout };
  }

  const status = getErrorStatus(error);
  if (status === 404) {
    return { status: 404, clientMessage: TWEET_CLIENT_ERRORS.notFound };
  }

  // 429, 5xx, and other provider failures
  return { status: 502, clientMessage: TWEET_CLIENT_ERRORS.provider };
}

export async function loadTweetProxy(
  id: string,
  getTweet: GetTweetFn
): Promise<TweetProxyResult> {
  if (!isValidTweetId(id)) {
    return {
      status: 400,
      body: { data: null, error: TWEET_CLIENT_ERRORS.invalidId },
    };
  }

  try {
    const tweet = await getTweet(id, {
      signal: AbortSignal.timeout(TWEET_FETCH_TIMEOUT_MS),
    });

    if (!tweet) {
      return {
        status: 404,
        body: { data: null, error: TWEET_CLIENT_ERRORS.notFound },
      };
    }

    return { status: 200, body: { data: tweet } };
  } catch (error) {
    const classified = classifyTweetFetchFailure(error);
    console.error("tweet proxy failed", {
      id,
      status: classified.status,
      name: error instanceof Error ? error.name : "unknown",
      message: error instanceof Error ? error.message : String(error),
    });
    return {
      status: classified.status,
      body: { data: null, error: classified.clientMessage },
    };
  }
}
