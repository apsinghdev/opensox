"use client";

import React, { useState } from "react";
import Link from "next/link";
import SidebarItem from "../sidebar/SidebarItem";
import { usePathname } from "next/navigation";
import { IconWrapper } from "../ui/IconWrapper";
import {
  XMarkIcon,
  HomeIcon,
  FolderIcon,
  ArrowRightOnRectangleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  StarIcon,
  HeartIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon
} from "@heroicons/react/24/outline";
import { useShowSidebar } from "@/store/useShowSidebar";
import { signOut } from "next-auth/react";
import { Twitter } from "../icons/icons";
import { ProfilePic } from "./ProfilePic";
import { useFilterStore } from "@/store/useFilterStore";
import { useSubscription } from "@/hooks/useSubscription"; 

const SIDEBAR_ROUTES = [
  {
    path: "/dashboard/home",
    label: "Home",
    icon: <HomeIcon className="size-5" />,
  },
  {
    path: "/dashboard/projects",
    label: "Projects",
    icon: <FolderIcon className="size-5" />,
  },
    {
    path: "/newsletters",
    label: "Newsletters",
    icon: <EnvelopeOpenIcon className="size-5" />,
  },
];

const getSidebarLinkClassName = (currentPath: string, routePath: string) => {
  const isActive = currentPath === routePath;
  return `${isActive ? "text-ox-purple" : "text-ox-white"}`;
};

export default function Sidebar() {
  const { showSidebar, setShowSidebar, isCollapsed, toggleCollapsed } =
    useShowSidebar();
  const pathname = usePathname();
  const { setShowFilters } = useFilterStore();
  const { isPaidUser } = useSubscription();

  const reqFeatureHandler = () => {
    window.open("https://discord.gg/37ke8rYnRM", "_blank");
  };

  const premiumClickHandler = () => {
    window.location.href = "/pricing";
  };
  const shareProjectHandler = () => {
    const msg: string =
      "Check opensox.in\n\nIt helps you find the perfect open-source project to contribute within 10 minutes.\n\ncreated by @ajeetunc";
    const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(msg)}`;
    window.open(xUrl, "_blank");
  };

  const handleEmailClick = () => {
    const emailSubject = encodeURIComponent("[Inquiry about Opensox AI]");
    const emailBody = encodeURIComponent("Heyyo,\n\nwanna chat?");
    const mailtoLink = `mailto:hi@opensox.ai?subject=${emailSubject}&body=${emailBody}`;

    window.open(mailtoLink, "_blank");
  };

  const handleFindProjects = () => {
    setShowFilters(true);
  };

  return (
    <div
      className={`h-screen ${
        isCollapsed ? "w-20" : "w-72"
      } flex flex-col bg-[#0c0c0d] border-r border-[#1a1a1d] z-50 transition-all duration-300 ease-out ${
        showSidebar ? "fixed xl:relative left-0 top-0 bottom-0" : ""
      }`}
    >
      {/* Mobile header */}
      <div className="flex justify-between px-4 py-4 border-b border-ox-gray xl:hidden">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-ox-white">Opensox AI</h1>
        </div>
        <IconWrapper onClick={() => setShowSidebar(false)}>
          <XMarkIcon className="size-5 text-ox-purple" />
        </IconWrapper>
      </div>

      {/* Desktop header with collapse */}
      <div className="hidden xl:flex items-center justify-between px-4 py-4 border-b border-[#1a1a1d]">
        {!isCollapsed && (
          <span className="text-[#eaeaea] font-semibold tracking-wide select-none text-xl">
            Opensox AI
          </span>
        )}
        <IconWrapper
          onClick={toggleCollapsed}
          className={isCollapsed ? "w-full flex justify-center" : ""}
        >
          {isCollapsed ? (
            <ChevronDoubleRightIcon className="size-5 text-ox-purple" />
          ) : (
            <ChevronDoubleLeftIcon className="size-5 text-ox-purple" />
          )}
        </IconWrapper>
      </div>

      <div className="sidebar-body flex-grow flex-col overflow-y-auto px-3 py-4 space-y-1">
        {/* Find projects entry */}

        {SIDEBAR_ROUTES.map((route) => {
          if(route.path === "/newsletters" && !isPaidUser) return null;
          const activeClass = getSidebarLinkClassName(pathname, route.path);
          return (
            <Link href={route.path} className={activeClass} key={route.path}>
              <SidebarItem
                itemName={route.label}
                icon={route.icon}
                collapsed={isCollapsed}
              />
            </Link>
          );
        })}
        <SidebarItem
          itemName="Find projects"
          onclick={handleFindProjects}
          icon={<MagnifyingGlassIcon className="size-5" />}
          collapsed={isCollapsed}
        />
        <SidebarItem
          itemName="Request a feature"
          onclick={reqFeatureHandler}
          icon={<SparklesIcon className="size-5" />}
          collapsed={isCollapsed}
        />
        <SidebarItem
          itemName="Opensox premium"
          onclick={premiumClickHandler}
          icon={<StarIcon className="size-5" />}
          collapsed={isCollapsed}
        />
        <SidebarItem
          itemName="Share the love"
          onclick={shareProjectHandler}
          icon={<HeartIcon className="size-5" />}
          collapsed={isCollapsed}
        />
        <SidebarItem
          itemName="Contact"
          onclick={handleEmailClick}
          icon={<EnvelopeIcon className="size-5" />}
          collapsed={isCollapsed}
        />
        <SidebarItem
          itemName="Twitter"
          onclick={() => {
            window.open("https://x.com/ajeetunc", "_blank");
          }}
          icon={
            <span className="w-5 h-5 inline-flex items-center">
              <Twitter />
            </span>
          }
          collapsed={isCollapsed}
        />
      </div>

      {/* Bottom profile */}
      <ProfileMenu isCollapsed={isCollapsed} />
    </div>
  );
}

function ProfileMenu({ isCollapsed }: { isCollapsed: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="px-3 py-4 border-t border-[#1a1a1d]">
      <div
        className={`group flex items-center rounded-md bg-[#121214] border border-[#1a1a1d] p-2 transition-all duration-300 ease-out cursor-pointer ${
          isCollapsed ? "justify-center" : "gap-3"
        }`}
        onClick={() => setOpen((s) => !s)}
      >
        <ProfilePic />
        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[#eaeaea] font-semibold">
                Ajeet
              </span>
              <span className="text-[10px] text-zinc-400">hi@opensox.ai</span>
            </div>
            <ChevronDoubleLeftIcon
              className={`size-4 text-zinc-400 transition-transform ${open ? "rotate-90" : "-rotate-90"}`}
            />
          </div>
        )}
      </div>
      {/* Expandable menu */}
      {!isCollapsed && open && (
        <div className="mt-2 space-y-1">
          <SidebarItem
            itemName="Logout"
            onclick={() => signOut({ callbackUrl: "/" })}
            icon={<ArrowRightOnRectangleIcon className="size-5" />}
            collapsed={false}
          />
        </div>
      )}
    </div>
  );
}
