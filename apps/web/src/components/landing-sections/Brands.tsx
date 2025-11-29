"use client";

import React from "react";
import Header from "../ui/header";
import { trpc } from "@/lib/trpc";

const Brands = () => {
  const { data: queryData, isLoading: queryLoading } =
    trpc.query.count.useQuery();

  const { data: userData, isLoading: userLoading } = trpc.user.count.useQuery();

  const formatNumber = (num: number | string) => {
    const number = typeof num === "string" ? parseInt(num) : num;
    return `${number.toLocaleString()}+`;
  };

  const queryCount = queryData?.total_queries
    ? formatNumber(queryData.total_queries)
    : "0+";

  const userCount = userData?.total_users
    ? formatNumber(userData.total_users)
    : "0+";

  return (
    <div id="Stats" className="flex flex-col">
      <Header title="Statistics" />
      <div className="border-b border flex items-center w-full">
        <div className="relative [box-shadow:0_0_100px_-10px_#14111C_inset] flex items-center justify-center bg-surface-primary w-full border-r border flex-col p-10 md:text-5xl">
          {queryLoading ? (
            <span className="md:text-8xl md:text-[80px] text-2xl sm:text-5xl text-[clamp(1.5rem,10vw,6rem)] font-mono tracking-tighter font-medium text-purple-400 animate-pulse">
              Loading...
            </span>
          ) : (
            <span
              className="md:text-8xl md:text-[80px] text-2xl sm:text-5xl relative pointer-events-none text-center bg-gradient-to-b from-brand-purple to-[#341e7b] to-80% bg-clip-text text-transparent text-[clamp(1.5rem,10vw,6rem)] overflow-hidden font-mono tracking-tighter font-medium"
              style={{
                textShadow: "0 0 40px rgba(145, 89, 226, 0.5)",
              }}
            >
              {queryCount}
            </span>
          )}
          <span
            style={{ "--text": "Opensox" } as any}
            className=" relative pointer-events-none text-center before:bg-gradient-to-b before:from-brand-purple before:to-[#321D76] before:to-80% before:bg-clip-text before:text-transparent before:content-['Queries'] after:absolute after:inset-0 after:bg-purple-600 after:bg-clip-text after:text-transparent after:mix-blend-lighten after:content-['Queries'] after:[text-shadow:0_1px_0_black] overflow-hidden font-mono tracking-tighter font-medium text-3xl md:text-5xl"
          ></span>
        </div>
        <div className="relative flex [box-shadow:0_0_0px_-10px_#14111C_inset] items-center justify-center bg-surface-primary w-full border flex-col p-10 md:text-5xl">
          {userLoading ? (
            <span className="md:text-8xl md:text-[80px] text-2xl sm:text-5xl text-[clamp(1.5rem,10vw,6rem)] font-mono tracking-tighter font-medium text-purple-400 animate-pulse">
              Loading...
            </span>
          ) : (
            <span
              className="md:text-8xl md:text-[80px] text-2xl sm:text-5xl relative pointer-events-none text-center bg-gradient-to-b from-brand-purple to-[#341e7b] to-80% bg-clip-text text-transparent text-[clamp(1.5rem,10vw,6rem)] overflow-hidden font-mono tracking-tighter font-medium"
              style={{
                textShadow: "0 0 40px rgba(145, 89, 226, 0.5)",
              }}
            >
              {userCount}
            </span>
          )}
          <span
            style={{ "--text": "Opensox" } as any}
            className=" relative pointer-events-none text-center before:bg-gradient-to-b before:from-brand-purple before:to-[#321D76] before:to-80% before:bg-clip-text before:text-transparent before:content-['Users'] after:absolute after:inset-0 after:bg-purple-600 after:bg-clip-text after:text-transparent after:mix-blend-lighten after:content-['Users'] after:[text-shadow:0_1px_0_black] overflow-hidden font-mono tracking-tighter font-medium text-3xl md:text-5xl"
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Brands;
