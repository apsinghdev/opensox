"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion, useInView } from "framer-motion";
import React, {
    forwardRef,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

import { cn } from "@/lib/utils";

type AccordionItemProps = {
    children: React.ReactNode;
    className?: string;
} & Accordion.AccordionItemProps;

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Item
            className={cn(
                "mt-px overflow-hidden focus-within:relative focus-within:z-10",
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </Accordion.Item>
    )
);
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = {
    children: React.ReactNode;
    className?: string;
};

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Header className="flex">
            <Accordion.Trigger
                className={cn(
                    "group flex flex-1 cursor-pointer items-center justify-between px-5 text-[15px] leading-none outline-none",
                    className
                )}
                {...props}
                ref={forwardedRef}
            >
                {children}
            </Accordion.Trigger>
        </Accordion.Header>
    )
);
AccordionTrigger.displayName = "AccordionTrigger";
type AccordionContentProps = {
    children: ReactNode;
    className?: string;
} & Accordion.AccordionContentProps;

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Content
            className={cn(
                "overflow-hidden text-[15px] font-medium data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down",
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            <div className="px-5 py-2">{children}</div>
        </Accordion.Content>
    )
);
AccordionContent.displayName = "AccordionContent";

export type FeaturesDataProps = {
    id: number;
    title: string;
    content: string;
    image?: string;
    video?: string;
    icon?: React.ReactNode;
};

export type FeaturesProps = {
    collapseDelay?: number;
    ltr?: boolean;
    linePosition?: "left" | "right" | "top" | "bottom";
    data: FeaturesDataProps[];
};

export default function Features({
    collapseDelay = 5000,
    ltr = false,
    linePosition = "left",
    data = [],
}: FeaturesProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const carouselRef = useRef<HTMLUListElement>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, {
        amount: 0.1,
    });

    useEffect(() => {
        if (isInView && currentIndex === -1 && data.length > 0) {
            setCurrentIndex(0);
        }
    }, [isInView, currentIndex, data.length]);

    const scrollToIndex = (index: number) => {
        if (carouselRef.current) {
            const card = carouselRef.current.querySelectorAll(".card")[index];
            if (card) {
                const cardRect = card.getBoundingClientRect();
                const carouselRect = carouselRef.current.getBoundingClientRect();
                const offset =
                    cardRect.left -
                    carouselRect.left -
                    (carouselRect.width - cardRect.width) / 2;

                carouselRef.current.scrollTo({
                    left: carouselRef.current.scrollLeft + offset,
                    behavior: "smooth",
                });
            }
        }
    };

    useEffect(() => {
        if (!isInView || data.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                (prevIndex + 1) % data.length
            );
        }, collapseDelay);

        return () => clearInterval(timer);
    }, [collapseDelay, currentIndex, data.length, isInView]);

    useEffect(() => {
        if (!isInView || currentIndex < 0 || data.length === 0) return;
        const handleAutoScroll = () => {
            const nextIndex =
                (currentIndex + 1) % data.length;
            scrollToIndex(nextIndex);
        };

        const autoScrollTimer = setInterval(handleAutoScroll, collapseDelay);

        return () => clearInterval(autoScrollTimer);
    }, [collapseDelay, currentIndex, data.length, isInView]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            const handleScroll = () => {
                const scrollLeft = carousel.scrollLeft;
                const cardWidth = carousel.querySelector(".card")?.clientWidth || 0;
                const newIndex = Math.min(
                    Math.floor(scrollLeft / cardWidth),
                    data.length - 1
                );
                setCurrentIndex(newIndex);
            };

            carousel.addEventListener("scroll", handleScroll);
            return () => carousel.removeEventListener("scroll", handleScroll);
        }
    }, [data.length]);

    return (
        <section ref={ref} id="features">
            <div className="">
                <div className="w-full lg:max-w-[1220px] mx-auto border-r border-[#252525]">
                    <div className="mx-auto h-full grid lg:grid-cols-2 items-center">
                        <div
                            className={` hidden lg:flex order-1 lg:order-[0] ${ltr ? "lg:order-2 lg:justify-end" : "justify-start"
                                }`}
                        >
                            <Accordion.Root
                                className=""
                                type="single"
                                defaultValue={`item-${currentIndex}`}
                                value={`item-${currentIndex}`}
                                onValueChange={(value) =>
                                    setCurrentIndex(Number(value.split("-")[1]))
                                }
                            >
                                {data.map((item, index) => (
                                    <AccordionItem
                                        key={item.id}
                                        className="relative border-b border-x last:border-y-0 border-[#252525] p-10"
                                        value={`item-${index}`}
                                    >
                                        {linePosition === "left" || linePosition === "right" ? (
                                            <div
                                                className={`absolute bottom-0 top-0 h-full w-0.5 overflow-hidden rounded-lg bg-purple-950/50  ${linePosition === "right"
                                                    ? "left-auto right-0"
                                                    : "left-0 right-auto"
                                                    }`}
                                            >
                                                <div
                                                    className={`absolute left-0 top-0 w-full ${currentIndex === index ? "h-full" : "h-0"
                                                        } origin-top transition-all ease-linear bg-purple-400`}
                                                    style={{
                                                        transitionDuration:
                                                            currentIndex === index
                                                                ? `${collapseDelay}ms`
                                                                : "0s",
                                                    }}
                                                ></div>
                                            </div>
                                        ) : null}

                                        {linePosition === "top" || linePosition === "bottom" ? (
                                            <div
                                                className={`absolute left-0 right-0 w-full h-0.5 overflow-hidden rounded-lg bg-purple-500/50 dark:bg-neutral-300/30 ${linePosition === "bottom" ? "bottom-0" : "top-0"
                                                    }`}
                                            >
                                                <div
                                                    className={`absolute left-0 ${linePosition === "bottom" ? "bottom-0" : "top-0"
                                                        } h-full ${currentIndex === index ? "w-full" : "w-0"
                                                        } origin-left bg-primary transition-all ease-linear dark:bg-white`}
                                                    style={{
                                                        transitionDuration:
                                                            currentIndex === index
                                                                ? `${collapseDelay}ms`
                                                                : "0s",
                                                    }}
                                                ></div>
                                            </div>
                                        ) : null}

                                        <div className="flex items-center relative">
                                            {/* <div className="item-box w-12 h-12 bg-primary/10 rounded-full sm:mx-6 mx-2 shrink-0 flex items-center justify-center">
                                                {item.icon}
                                            </div> */}

                                            <div>
                                                <AccordionTrigger className="text-xl font-medium pb-1 pl-0 tracking-tight ">
                                                    {item.title}
                                                </AccordionTrigger>

                                                <AccordionTrigger className="justify-start text-left leading-4 text-base font-light pl-0 tracking-tight text-[#d1d1d1]">
                                                    {item.content}
                                                </AccordionTrigger>
                                            </div>
                                        </div>
                                    </AccordionItem>
                                ))}
                            </Accordion.Root>
                        </div>
                        <div
                            className={`lg:h-[485px] md:h-[320px] h-[260px] lg:min-h-[200px] w-auto flex items-center justify-center ${ltr && "lg:order-1 lg:col-start-2 border"
                                }`}
                        >
                            {data[currentIndex]?.image ? (
                                <motion.img
                                    key={currentIndex}
                                    src={data[currentIndex].image}
                                    alt="feature"
                                    className="aspect-auto h-full w-full object-cover  p-0 shadow-lg"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                />
                            ) : data[currentIndex]?.video ? (
                                <video
                                    preload="auto"
                                    src={data[currentIndex].video}
                                    className="aspect-auto h-full w-full rounded-lg object-cover shadow-lg"
                                    autoPlay
                                    loop
                                    muted
                                />
                            ) : (
                                <div className="aspect-auto h-full w-full rounded-xl border border-neutral-300/50 bg-gray-200 p-1"></div>
                            )}
                        </div>

                        <ul
                            ref={carouselRef}
                            className=" flex h-full snap-x flex-nowrap overflow-x-auto py-10 [-ms-overflow-style:none] [-webkit-mask-image:linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden snap-mandatory"
                            style={{
                                padding: "50px calc(50%)",
                            }}
                        >
                            {data.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="card relative mr-8 grid h-full max-w-60 shrink-0 gap-1 items-start justify-center py-4 last:mr-0"
                                    onClick={() => setCurrentIndex(index)}
                                    style={{
                                        scrollSnapAlign: "center",
                                    }}
                                >
                                    <div className="absolute bottom-0 left-0 right-auto top-0 h-0.5 w-full overflow-hidden rounded-lg  bg-purple-950/50">
                                        <div
                                            className={`absolute left-0 top-0 h-full ${currentIndex === index ? "w-full" : "w-0"
                                                } origin-top bg-primary transition-all ease-linear bg-purple-400`}
                                            style={{
                                                transitionDuration:
                                                    currentIndex === index ? `${collapseDelay}ms` : "0s",
                                            }}
                                        ></div>
                                    </div>
                                    <h2 className="text-xl font-bold text-center">{item.title}</h2>
                                    <p className="mx-0 max-w-sm text-balance text-sm text-center text-[#d1d1d1]">
                                        {item.content}
                                    </p>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
