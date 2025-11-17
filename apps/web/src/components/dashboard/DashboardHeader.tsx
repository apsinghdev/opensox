"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { IconWrapper } from "../ui/IconWrapper";
import { ProfilePic } from "./ProfilePic";
import { useFilterStore } from "@/store/useFilterStore";
import { useShowSidebar } from "@/store/useShowSidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const DashboardHeader = () => {
  const { setShowFilters } = useFilterStore();
  const { setShowSidebar } = useShowSidebar();
  const { data: session } = useSession();
  const startHandler = () => {
    setShowFilters(true);
  };
  const menuClickHander = () => {
    setShowSidebar(true);
  };

  return (
    <div className="flex h-[80%] md:h-full w-full justify-between px-2 md:px-6 border-b border-b-ox-gray">
      <div
        id="header-left-container"
        className="flex h-full w-[40%] justify-start space-x-3 items-center"
      >
        <IconWrapper className="block xl:hidden" onClick={menuClickHander}>
          <Bars3Icon className="size-4 text-ox-purple"></Bars3Icon>
        </IconWrapper>
        <Link href="/" className="text-lg md:text-2xl font-medium hover:text-ox-purple transition-colors">
          Opensox
        </Link>
      </div>
      <div
        id="header-right-container"
        className="flex h-full w-1/2 md:w-[40%] items-center justify-end space-x-2 lg:space-x-8"
      >
        <Button
          className="font-bold text-xs flex hover:bg-white-500 text-white bg-ox-purple cursor-pointer p-2 h-7 md:p-auto md:h-auto"
          onClick={startHandler}
        >
          Find projects
        </Button>
        <ProfilePic imageUrl={session?.user?.image || null} />
      </div>
    </div>
  );
};
