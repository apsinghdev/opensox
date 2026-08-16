"use client";

import { TweetProps, useTweet } from "react-tweet";
import {
  isValidTweet,
  MagicTweet,
  TweetSkeleton,
} from "./Client-tweet";

export const ClientTweetCard = ({
  id,
  apiUrl,
  components,
  fetchOptions,
  ...props
}: TweetProps & { className?: string }) => {
  const { data, error, isLoading } = useTweet(
    id,
    apiUrl ?? (id ? `/api/tweet/${id}` : undefined),
    fetchOptions
  );

  if (isLoading) {
    return <TweetSkeleton {...props} />;
  }

  if (error || !data || !isValidTweet(data)) {
    return null;
  }

  return <MagicTweet tweet={data} components={components} {...props} />;
};
