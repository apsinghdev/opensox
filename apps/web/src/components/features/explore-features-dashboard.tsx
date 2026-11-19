"use client";

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import PrimaryButton from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import ExploreFeaturesImagePreview from "./explore-features-image-preview";
import { FEATURE_ICON_MAP, FEATURES_DATA } from "./explore-features-data";

const AUTO_ADVANCE_MS = 5000;
const RESUME_AFTER_MS = 9000;

export default function ExploreFeaturesDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sidebarItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sidebarRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionVisibleRef = useRef(true);

  const activeFeature = FEATURES_DATA[activeIndex];
  const ActiveIcon = FEATURE_ICON_MAP[activeFeature.icon];

  const clearAutoInterval = useCallback(() => {
    if (autoIntervalRef.current) {
      clearInterval(autoIntervalRef.current);
      autoIntervalRef.current = null;
    }
  }, []);

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const goTo = useCallback((index: number) => {
    const wrapped =
      ((index % FEATURES_DATA.length) + FEATURES_DATA.length) %
      FEATURES_DATA.length;
    setActiveIndex(wrapped);
  }, []);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const startAutoAdvance = useCallback(() => {
    if (!isSectionVisibleRef.current) return;
    clearAutoInterval();
    autoIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES_DATA.length);
    }, AUTO_ADVANCE_MS);
  }, [clearAutoInterval]);

  const pauseAndScheduleResume = useCallback(() => {
    clearAutoInterval();
    clearResumeTimeout();
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoAdvance();
    }, RESUME_AFTER_MS);
  }, [clearAutoInterval, clearResumeTimeout, startAutoAdvance]);

  const handleManualSelect = useCallback(
    (index: number) => {
      goTo(index);
      pauseAndScheduleResume();
    },
    [goTo, pauseAndScheduleResume],
  );

  const handlePrev = useCallback(() => {
    goPrev();
    pauseAndScheduleResume();
  }, [goPrev, pauseAndScheduleResume]);

  const handleNext = useCallback(() => {
    goNext();
    pauseAndScheduleResume();
  }, [goNext, pauseAndScheduleResume]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearAutoInterval();
        clearResumeTimeout();
      } else if (isSectionVisibleRef.current) {
        startAutoAdvance();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearAutoInterval();
      clearResumeTimeout();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [startAutoAdvance, clearAutoInterval, clearResumeTimeout]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAutoAdvance();
        } else {
          clearAutoInterval();
          clearResumeTimeout();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [startAutoAdvance, clearAutoInterval, clearResumeTimeout]);

  const scrollSidebarToActive = useCallback((index: number) => {
    const activeEl = sidebarItemRefs.current[index];
    const sidebar = sidebarRef.current;
    if (!activeEl || !sidebar) return;

    const padding = 12;
    const sidebarRect = sidebar.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();

    if (itemRect.top < sidebarRect.top + padding) {
      sidebar.scrollBy({
        top: itemRect.top - sidebarRect.top - padding,
        behavior: "smooth",
      });
    } else if (itemRect.bottom > sidebarRect.bottom - padding) {
      sidebar.scrollBy({
        top: itemRect.bottom - sidebarRect.bottom + padding,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      scrollSidebarToActive(activeIndex);
    });
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, scrollSidebarToActive]);

  const handleInvestNow = useCallback(() => {
    if (pathname === "/pricing") {
      const element = document.getElementById("pro-price-card");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", "/pricing#pro-price-card");
        return;
      }
    }
    router.push("/pricing#pro-price-card");
  }, [pathname, router]);

  return (
    <div ref={sectionRef} className="h-full w-full py-6 lg:py-10">
      <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-surface-primary">
        <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="max-w-xl text-sm text-text-tertiary lg:text-base">
            Glimpse of what you get in Opensox Pro.
          </p>
          <PrimaryButton
            onClick={handleInvestNow}
            classname="shrink-0 self-start sm:self-center px-5 py-2.5 text-sm whitespace-nowrap"
          >
            <ArrowRightIcon className="size-4" />
            Invest Now
          </PrimaryButton>
        </div>

        <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(240px,320px)_1fr]">
          <aside className="flex min-h-0 flex-col border-b border-border lg:border-b-0 lg:border-r">
            <div className="shrink-0 border-b border-border px-4 py-3 lg:py-4">
              <div className="flex items-center gap-2">
                <SparklesIcon className="size-4 shrink-0 text-brand-purple" />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Explore Features
                  </p>
                  <p className="text-xs text-text-muted">Opensox Pro/Pro+</p>
                </div>
              </div>
            </div>

            <nav
              ref={sidebarRef}
              className="flex max-h-[240px] flex-col overflow-y-auto scroll-py-3 [scrollbar-color:theme(colors.brand.purple/30)_transparent] [scrollbar-width:thin] lg:max-h-none lg:flex-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-purple/30 [&::-webkit-scrollbar-track]:bg-transparent"
            >
              {FEATURES_DATA.map((feature, index) => {
                const Icon = FEATURE_ICON_MAP[feature.icon];
                const isActive = index === activeIndex;
                return (
                  <button
                    key={feature.id}
                    ref={(el) => {
                      sidebarItemRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => handleManualSelect(index)}
                    className="group relative flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left last:border-b-0"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-indicator"
                        className="pointer-events-none absolute inset-0 border-l-2 border-brand-purple bg-brand-purple/10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 shrink-0 transition-colors duration-300",
                        isActive ? "text-brand-purple" : "text-text-tertiary",
                      )}
                    >
                      <Icon className="size-4" />
                    </span>

                    <span
                      className={cn(
                        "relative z-10 min-w-0 flex-1 text-sm leading-snug transition-colors duration-300",
                        isActive
                          ? "font-semibold text-text-primary"
                          : "font-medium text-text-tertiary",
                      )}
                    >
                      {feature.title}
                    </span>

                    {!isActive && (
                      <span className="absolute inset-0 z-0 bg-transparent transition-colors duration-300 group-hover:bg-surface-hover" />
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="flex min-h-0 flex-1 flex-col p-5 lg:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`header-${activeIndex}`}
                  initial={{ opacity: 0.5, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="min-w-0 flex-1"
                >
                  <h3 className="text-xl font-semibold tracking-tight text-text-primary lg:text-2xl">
                    {activeFeature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-tertiary lg:text-base">
                    {activeFeature.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous feature"
                  className="flex size-9 items-center justify-center rounded-full border border-border text-text-tertiary transition-colors hover:border-brand-purple/50 hover:text-brand-purple"
                >
                  <ChevronLeftIcon className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next feature"
                  className="flex size-9 items-center justify-center rounded-full border border-border text-text-tertiary transition-colors hover:border-brand-purple/50 hover:text-brand-purple"
                >
                  <ChevronRightIcon className="size-4" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`preview-${activeIndex}`}
                initial={{ opacity: 0.5, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="min-h-0 flex-1"
              >
                <ExploreFeaturesImagePreview
                  imageSrc={activeFeature.image}
                  featureTitle={activeFeature.title}
                  FeatureIcon={ActiveIcon}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
