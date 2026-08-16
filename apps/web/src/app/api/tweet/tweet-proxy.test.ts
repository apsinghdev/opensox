import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import {
  TWEET_CLIENT_ERRORS,
  TWEET_FETCH_TIMEOUT_MS,
  isValidTweetId,
  loadTweetProxy,
  type GetTweetFn,
} from "./tweet-proxy.ts";

const originalConsoleError = console.error;

before(() => {
  console.error = () => {};
});

after(() => {
  console.error = originalConsoleError;
});

function providerError(status: number, message: string): Error & { status: number } {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  return error;
}

test("rejects invalid tweet ids with 400", async () => {
  const ids = ["", "abc", "../1", "1e19", "12345678901234567890"];
  for (const id of ids) {
    assert.equal(isValidTweetId(id), false);
    const result = await loadTweetProxy(id, async () => {
      throw new Error("getTweet should not run for invalid ids");
    });
    assert.equal(result.status, 400);
    assert.equal(result.body.error, TWEET_CLIENT_ERRORS.invalidId);
    assert.equal(result.body.data, null);
  }
});

test("returns 404 when the provider has no tweet", async () => {
  const missing = await loadTweetProxy("1234567890", async () => null);
  assert.equal(missing.status, 404);
  assert.equal(missing.body.error, TWEET_CLIENT_ERRORS.notFound);
  assert.equal(missing.body.data, null);

  const thrown = await loadTweetProxy("1234567890", async () => {
    throw providerError(404, "not found internally");
  });
  assert.equal(thrown.status, 404);
  assert.equal(thrown.body.error, TWEET_CLIENT_ERRORS.notFound);
  assert.equal(JSON.stringify(thrown.body).includes("internally"), false);
});

test("classifies 429 and 5xx as provider failures", async () => {
  for (const status of [429, 500, 502, 503]) {
    const result = await loadTweetProxy("1234567890", async () => {
      throw providerError(status, `leaky ${status} detail`);
    });
    assert.equal(result.status, 502);
    assert.equal(result.body.error, TWEET_CLIENT_ERRORS.provider);
    assert.equal(result.body.data, null);
    assert.equal(
      JSON.stringify(result.body).includes("leaky"),
      false,
      "must not expose provider error.message"
    );
  }
});

test("classifies timeouts as 504", async () => {
  const timeout = new Error("The operation was aborted due to timeout");
  timeout.name = "TimeoutError";

  const result = await loadTweetProxy("1234567890", async () => {
    throw timeout;
  });
  assert.equal(result.status, 504);
  assert.equal(result.body.error, TWEET_CLIENT_ERRORS.timeout);
  assert.equal(result.body.data, null);
});

test("classifies abort errors as 504", async () => {
  const aborted = new Error("This operation was aborted");
  aborted.name = "AbortError";

  const result = await loadTweetProxy("1234567890", async () => {
    throw aborted;
  });
  assert.equal(result.status, 504);
  assert.equal(result.body.error, TWEET_CLIENT_ERRORS.timeout);
});

test("passes a bounded abort signal to getTweet", async () => {
  const controlledSignal = new AbortController().signal;
  let timeoutMs: number | undefined;
  const originalTimeout = AbortSignal.timeout;

  AbortSignal.timeout = ((ms: number) => {
    timeoutMs = ms;
    return controlledSignal;
  }) as typeof AbortSignal.timeout;

  try {
    let fetchOptions: RequestInit | undefined;
    const getTweet: GetTweetFn = async (_id, options) => {
      fetchOptions = options;
      return { id: "1234567890" };
    };

    const result = await loadTweetProxy("1234567890", getTweet);
    assert.equal(result.status, 200);
    assert.equal(timeoutMs, TWEET_FETCH_TIMEOUT_MS);
    assert.equal(fetchOptions?.signal, controlledSignal);
  } finally {
    AbortSignal.timeout = originalTimeout;
  }
});
