"use client"

import React from "react";

type SidebarItemProps = {
  itemName: string;
  onclick?: () => void;
  icon?: React.ReactNode;
  collapsed?: boolean;
  badge?: React.ReactNode;
};

export default function SidebarItem({ itemName, onclick, icon, collapsed = false, badge }: SidebarItemProps) {
  return (
    <div
      className={`w-full h-[44px] flex items-center rounded-md cursor-pointer transition-colors px-2 ${
        collapsed ? "justify-center" : "gap-3 pl-3"
      } hover:bg-[#292929] group`}
      onClick={onclick}
    >
      {icon && (
        <span className="shrink-0 text-[#eaeaea] group-hover:text-white transition-colors">
          {icon}
        </span>
      )}
      {!collapsed && (
        <div className="flex items-center gap-1.5">
        <h1 className="text-xs font-medium text-[#c8c8c8] group-hover:text-white transition-colors">
          {itemName}
        </h1>
          {badge}
        </div>
      )}
    </div>
  );
}