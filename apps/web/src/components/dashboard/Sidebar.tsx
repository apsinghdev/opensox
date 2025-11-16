"use client";

import React, { useState } from "react";
import Link from "next/link";
import SidebarItem from "../sidebar/SidebarItem";
import { useRouter } from "next/navigation";
import { IconWrapper } from "../ui/IconWrapper";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  HomeIcon,
  FolderIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
  StarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useShowSidebar } from "@/store/useShowSidebar";
import { signOut, useSession } from "next-auth/react";
import { ProfilePic } from "./ProfilePic";
import { useSubscription } from "@/hooks/useSubscription";
import { OpensoxProBadge } from "../sheet/OpensoxProBadge";
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const SIDEBAR_ROUTES = [
  {
    path: "/dashboard/home",
    label: "Home",
    icon: <HomeIcon className="size-5" />,
  },
  {
    path: "/dashboard/projects",
    label: "OSS Projects",
    icon: <FolderIcon className="size-5" />,
  },
  {
    path: "/dashboard/sheet",
    label: "OSS Sheet",
    icon: <DocumentTextIcon className="size-5" />,
  },
];

export default function Sidebar({ overlay = false }: { overlay?: boolean }) {
  const { setShowSidebar, isCollapsed, toggleCollapsed } = useShowSidebar();
  const router = useRouter();
  const { isPaidUser } = useSubscription();

  const reqFeatureHandler = () => {
    window.open("https://github.com/apsinghdev/opensox/issues", "_blank");
  };

  const proClickHandler = () => {
    if (isPaidUser) {
      router.push("/dashboard/pro/dashboard");
    } else {
      router.push("/pricing");
    }
  };
  const desktopWidth = isCollapsed ? 80 : 288;
  const mobileWidth = desktopWidth;

  return (
    <motion.div
      className={`h-screen flex flex-col bg-ox-sidebar border-r border-ox-header z-50 ${
        overlay ? "fixed left-0 top-0 bottom-0 xl:hidden" : ""
      }`}
      initial={overlay ? { x: -400, width: mobileWidth } : { width: desktopWidth }}
      animate={overlay ? { x: 0, width: mobileWidth } : { width: desktopWidth }}
      exit={overlay ? { x: -400, width: mobileWidth } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      style={{ width: overlay ? mobileWidth : desktopWidth }}
    >
      {/* Mobile header */}
      <div className="flex justify-between items-center h-16 px-4 border-b border-ox-header xl:hidden bg-ox-sideba">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl font-semibold text-ox-white hover:text-ox-purple transition-colors cursor-pointer"
          >
            Opensox AI
          </Link>
        </div>
        <IconWrapper onClick={() => setShowSidebar(false)}>
          <XMarkIcon className="size-5 text-ox-purple" />
        </IconWrapper>
      </div>

      {/* Desktop header with collapse */}
      <div className="hidden xl:flex items-center justify-between px-4 py-4 border-b border-ox-header bg-ox-sidebar">
        {!isCollapsed && (
          <Link
            href="/"
            className="text-[#eaeaea] font-semibold tracking-wide select-none text-xl hover:text-ox-purple transition-colors cursor-pointer"
          >
            Opensox AI
          </Link>
        )}
        <IconWrapper
          onClick={toggleCollapsed}
          className={isCollapsed ? "w-full flex justify-center" : ""}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="size-5 text-ox-purple" />
          ) : (
            <ChevronLeftIcon className="size-5 text-ox-purple" />
          )}
        </IconWrapper>
      </div>

      <div className="sidebar-body flex-grow flex-col overflow-y-auto px-3 py-4">
        {SIDEBAR_ROUTES.map((route) => {
          return (
            <Link href={route.path} key={route.path}>
              <SidebarItem
                itemName={route.label}
                icon={route.icon}
                collapsed={isCollapsed}
              />
            </Link>
          );
        })}
        <SidebarItem
          itemName="Request a feature"
          onclick={reqFeatureHandler}
          icon={<SparklesIcon className="size-5" />}
          collapsed={isCollapsed}
        />
        {!isCollapsed && !isPaidUser ? (
          <div
            className="w-full h-[44px] flex items-center rounded-md cursor-pointer transition-colors px-2 gap-3 pl-3 hover:bg-[#292929] group"
            onClick={proClickHandler}
          >
            <span className="shrink-0 text-[#eaeaea] group-hover:text-white transition-colors">
              <StarIcon className="size-5" />
            </span>
            <div className="flex items-center gap-1">
              <h1 className="text-xs font-medium text-[#c8c8c8] group-hover:text-white transition-colors">
                Opensox Pro
              </h1>
              <OpensoxProBadge className="px-1.5 py-0.5 scale-75" />
            </div>
          </div>
        ) : (
          <SidebarItem
            itemName="Opensox Pro"
            onclick={proClickHandler}
            icon={<StarIcon className="size-5" />}
          collapsed={isCollapsed}
        />
        )}
      </div>

      {/* Bottom profile */}
      <ProfileMenu isCollapsed={isCollapsed} />
    </motion.div>
  );
}

function ProfileMenu({ isCollapsed }: { isCollapsed: boolean }) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const fullName = session?.user?.name || "User";
  const firstName = fullName.split(" ")[0];
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || null;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (open && !target.closest(".profile-menu-container")) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="px-3 py-4 border-t border-ox-header bg-ox-sidebar relative profile-menu-container">
      <div
        className={`group flex items-center rounded-md bg-ox-profile-card border border-ox-header p-2 transition-all duration-300 ease-out cursor-pointer ${
          isCollapsed ? "justify-center" : "gap-3"
        }`}
        onClick={() => setOpen((s) => !s)}
      >
        <ProfilePic imageUrl={userImage} />
        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#eaeaea] font-semibold">
                {firstName}
              </span>
              <span className="text-[10px] text-zinc-400">{userEmail}</span>
            </div>
            <ChevronLeftIcon
              className={`size-4 text-zinc-400 transition-transform ${open ? "rotate-90" : "-rotate-90"}`}
            />
          </div>
        )}
      </div>
      {/* Profile Card Dropdown */}
      <AnimatePresence>
        {!isCollapsed && open && (
          <motion.div 
            key="profile-dropdown"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full left-3 right-3 mb-2 bg-ox-profile-card border border-ox-header rounded-lg shadow-xl overflow-hidden z-50"
          >
            {/* User Info Section */}
            <div className="p-3 border-b border-ox-header">
              <div className="flex items-center gap-3">
                <ProfilePic imageUrl={userImage} />
                <div className="flex flex-col">
                  <span className="text-sm text-white font-semibold">
                    {fullName}
                  </span>
                  <span className="text-xs text-zinc-400">{userEmail}</span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                onClick={() => {
                  router.push("/dashboard/account");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#eaeaea] hover:bg-ox-sidebar transition-colors"
              >
                <Cog6ToothIcon className="size-4" />
                <span>Account Settings</span>
              </button>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#eaeaea] hover:bg-ox-sidebar transition-colors"
              >
                <ArrowRightOnRectangleIcon className="size-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
