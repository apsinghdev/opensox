"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  );

  // Recreate client when session changes to ensure we get the latest token
  const trpcClient = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const trpcUrl = baseUrl.endsWith("/trpc") ? baseUrl : `${baseUrl}/trpc`;

    return trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: trpcUrl,
          async headers() {
            const token = (session as Session)?.accessToken;
            if (token) {
              return {
                authorization: `Bearer ${token}`,
              };
            }
            return {};
          },
        }),
      ],
    });
  }, [session]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
