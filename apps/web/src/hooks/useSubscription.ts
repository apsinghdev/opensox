import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { trpc } from "@/lib/trpc";
import { useSubscriptionStore } from "@/store/useSubscriptionStore";

/**
 * Custom hook to fetch and manage user subscription status
 * This hook automatically fetches subscription status when user is logged in
 * and updates the global subscription store
 */
export function useSubscription() {
  const { data: session, status } = useSession();
  const {
    setSubscriptionStatus,
    setLoading,
    reset,
    isPaidUser,
    subscription,
    isLoading,
  } = useSubscriptionStore();

  const utils = trpc.useUtils();

  // Fetch subscription status using tRPC
  const {
    data,
    isLoading: isFetching,
    isError,
    isFetched,
    refetch,
  } = (trpc.user as any).subscriptionStatus.useQuery(undefined, {
    enabled: !!session?.user && status === "authenticated",
    refetchOnWindowFocus: true, // refetch when user returns to tab
    refetchOnMount: true,
    staleTime: 2 * 60 * 1000, // consider data fresh for 2 minutes (reduced from 5)
    gcTime: 10 * 60 * 1000, // keep in cache for 10 minutes
  });

  useEffect(() => {
    if (status === "loading" || isFetching) {
      setLoading(true);
      return;
    }

    if (status === "unauthenticated") {
      reset();
      setLoading(false);
      return;
    }

    if (isError) {
      setLoading(false);
      return;
    }

    if (data) {
      setSubscriptionStatus(data.isPaidUser, data.subscription);
      return;
    }

    if (isFetched) {
      setLoading(false);
    }
  }, [
    data,
    status,
    isFetching,
    isError,
    isFetched,
    setSubscriptionStatus,
    setLoading,
    reset,
  ]);

  // manual refetch function for immediate cache invalidation
  const refetchSubscription = async () => {
    await (utils.user as any).subscriptionStatus.invalidate();
    await refetch();
  };

  return {
    isPaidUser,
    subscription,
    isLoading,
    refetchSubscription, // expose manual refetch function
  };
}
