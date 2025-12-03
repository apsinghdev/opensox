"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { AnimatePresence } from "framer-motion";
import FiltersContainer from "@/components/ui/FiltersContainer";
import { useFilterStore } from "@/store/useFilterStore";
import { useShowSidebar } from "@/store/useShowSidebar";
import { IconWrapper } from "@/components/ui/IconWrapper";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showFilters } = useFilterStore();
  const { showSidebar, setShowSidebar } = useShowSidebar();
  return (
    <div className="flex w-full h-screen bg-dash-base overflow-hidden">
      {showFilters && <FiltersContainer />}
      <aside className="hidden xl:block h-full">
        <Sidebar />
      </aside>
      <AnimatePresence>
        {showSidebar && (
          <div className="xl:hidden h-full">
            <Sidebar overlay />
          </div>
        )}
      </AnimatePresence>
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 xl:hidden"
        >
          <div className="flex-1 flex flex-col h-full bg-ox-content">
            <div className="xl:hidden flex items-center h-16 px-4 border-b border-ox-header bg-ox-content">
              <IconWrapper>
                <Bars3Icon className="size-5 text-ox-purple" />
              </IconWrapper>
              <Link
                href="/"
                className="ml-4 text-lg font-semibold text-ox-white hover:text-ox-purple transition-colors"
              >
                Opensox
              </Link>
            </div>
            <main className="flex-1 h-full overflow-auto bg-ox-content">
              {children}
            </main>
          </div>
        </div>
      )}
      {!showSidebar && (
        <div className="flex-1 flex flex-col h-full bg-ox-content">
          <div className="xl:hidden flex items-center h-16 px-4 border-b border-ox-header bg-ox-content">
            <IconWrapper onClick={() => setShowSidebar(true)}>
              <Bars3Icon className="size-5 text-ox-purple" />
            </IconWrapper>
            <Link
              href="/"
              className="ml-4 text-lg font-semibold text-ox-white hover:text-ox-purple transition-colors"
            >
              Opensox
            </Link>
          </div>
          <main className="flex-1 h-full overflow-auto bg-ox-content">
            {children}
          </main>
        </div>
      )}
    </div>
  );
}
