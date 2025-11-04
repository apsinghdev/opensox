"use client";

import Link from "next/link";
import SidebarItem from "../sidebar/SidebarItem";
import { usePathname } from "next/navigation";
import { IconWrapper } from "../ui/IconWrapper";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useShowSidebar } from "@/store/useShowSidebar";
import { signOut } from "next-auth/react";

const SIDEBAR_ROUTES = [
  { 
    path: "/dashboard/home", 
    label: "Home", 
  },
  { 
    path: "/dashboard/projects", 
    label: "Projects", 
  },
  { 
    path: "/dashboard/newsletters", 
    label: "Newsletter", 
  },
];

const getSidebarLinkClassName = (currentPath: string, routePath: string) => {
  const isActive = currentPath.startsWith(routePath);
  return `${isActive ? "text-ox-purple" : "text-ox-white"}`;
};

export default function Sidebar() {
  const { showSidebar, setShowSidebar } = useShowSidebar();
  const pathname = usePathname();

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

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div
      className={`h-full w-[60%] lg:w-[50%] xl:w-auto flex flex-col rounded-r-lg bg-ox-black-1 border border-l-0 border-ox-gray z-50 ${showSidebar ? "fixed left-0 top-0 bottom-0" : ""}`}
    >
      <div className="sidebar-header flex justify-between px-2 py-3 border-b border-ox-gray block xl:hidden">
        <div className="flex items-center space-x-3">
          <h1 className="text-md font-semibold text-ox-white">Opensox</h1>
        </div>
        <div className="flex items-center justify-end space-x-3">
          <IconWrapper onClick={() => setShowSidebar(false)}>
            <XMarkIcon className="size-4 text-ox-purple"></XMarkIcon>
          </IconWrapper>
        </div>
      </div>

      <div className="sidebar-body flex-grow flex-col overflow-y-auto px-2 py-4">
        {SIDEBAR_ROUTES.map((route) => {
          return (
            <Link
              href={route.path}
              className={getSidebarLinkClassName(pathname, route.path)}
              key={route.path}
            >
              <SidebarItem itemName={route.label}></SidebarItem>
            </Link>
          );
        })}
        <SidebarItem
          itemName="Request a feature"
          onclick={reqFeatureHandler}
        ></SidebarItem>
        <SidebarItem
          itemName="Opensox premium"
          onclick={premiumClickHandler}
        ></SidebarItem>
        <SidebarItem
          itemName="Share the love"
          onclick={shareProjectHandler}
        ></SidebarItem>
        <SidebarItem
          itemName="Contact"
          onclick={handleEmailClick}
        ></SidebarItem>
        <SidebarItem itemName="Logout" onclick={handleLogout}></SidebarItem>
        <SidebarItem
          itemName="Twitter"
          onclick={() => {
            window.open("https://x.com/ajeetunc", "_blank");
          }}
        ></SidebarItem>
      </div>
    </div>
  );
}
