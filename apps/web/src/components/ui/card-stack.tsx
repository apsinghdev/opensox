"use client"
import type React from "react"

import { useEffect, useRef, useState } from "react"
import { easeOut, motion, useInView } from "framer-motion"
import { Activity, ChartNoAxesColumn, TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Target, TechTags } from "../icons/icons"

type Card = {
    id: number
    content: React.ReactNode

}

const SIMPLE_CARDS = [
    {
        id: 0,
        content: <div className="space-y-4 opacity-90 h-full">
            <div className="flex items-center gap-1 ">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.6849 4.42276L9.81592 1.33276C9.30492 1.06176 8.69492 1.06276 8.18492 1.33276L2.31492 4.42276C1.82092 4.68276 1.51392 5.19176 1.51392 5.74976C1.51392 6.30776 1.82092 6.81676 2.31492 7.07676L8.18392 10.1668C8.43892 10.3018 8.71992 10.3698 8.99992 10.3698C9.27992 10.3698 9.55992 10.3028 9.81492 10.1678L15.6849 7.07676C16.1789 6.81676 16.4859 6.30776 16.4859 5.74976C16.4859 5.19176 16.1789 4.68276 15.6849 4.42276Z" fill="#C5A2F4" />
                    <path d="M15.7359 8.25C15.3219 8.25 14.9859 8.586 14.9859 9L9.11592 12.091C9.04392 12.129 8.95792 12.129 8.88392 12.091L3.01392 9C3.01392 8.586 2.67792 8.25 2.26392 8.25C1.84992 8.25 1.51392 8.586 1.51392 9C1.51392 9.559 1.82092 10.067 2.31492 10.327L8.18392 13.417C8.43892 13.552 8.71992 13.62 8.99992 13.62C9.27992 13.62 9.55992 13.553 9.81492 13.418L15.6849 10.327C16.1789 10.067 16.4859 9.558 16.4859 9C16.4859 8.586 16.1499 8.25 15.7359 8.25Z" fill="#C5A2F4" />
                    <path d="M15.7359 11.5C15.3219 11.5 14.9859 11.836 14.9859 12.25L9.11592 15.341C9.04392 15.379 8.95792 15.379 8.88392 15.341L3.01392 12.25C3.01392 11.836 2.67792 11.5 2.26392 11.5C1.84992 11.5 1.51392 11.836 1.51392 12.25C1.51392 12.809 1.82092 13.317 2.31492 13.577L8.18392 16.667C8.43892 16.802 8.71992 16.87 8.99992 16.87C9.27992 16.87 9.55992 16.803 9.81492 16.668L15.6849 13.577C16.1789 13.317 16.4859 12.808 16.4859 12.25C16.4859 11.836 16.1499 11.5 15.7359 11.5Z" fill="#C5A2F4" />
                </svg>
                <div className="bg-gradient-to-r from-[#C5A2F4] via-[#fff] to-[#fff] bg-clip-text">
                    <p className='text-transparent font-semibold text-sm '>Filter By: TECH STACK</p>
                </div>
            </div>
            <TechTags />
        </div>
    },
    {
        id: 1,
        content: <div className="space-y-4">
            <div className="flex items-center gap-1 ">
                <Target />
                <div className="bg-gradient-to-r from-[#4684de] via-[#fff] to-[#fff] bg-clip-text">
                    <p className='text-transparent font-semibold text-sm '>Filter By: COMPETITION</p>
                </div>
            </div>

            <div className="flex items-center flex-wrap gap-2">
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg
                 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50
                 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0
                 bg-cardColor text-white hover:bg-cardColorForeground py-3
                  border-[#282828] border mx-0.5 h-[22px] gap-1.5 px-1.5 pr-2 text-xs
                 hover:text-brand"
                >
                    <TrendingUp className="text-red-600" />Very High
                </button>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg
                 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50
                 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0
                 bg-cardColor text-white hover:bg-cardColorForeground py-3
                  border-[#282828] border mx-0.5 h-[22px] gap-1.5 px-1.5 pr-2 text-xs
                 hover:text-brand"
                >
                    <TrendingUp className="text-green-600" /> Very Low
                </button>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg
                 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50
                 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0
                 bg-cardColor text-white hover:bg-cardColorForeground py-3
                  border-[#282828] border mx-0.5 h-[22px] gap-1.5 px-1.5 pr-2 text-xs
                 hover:text-brand"
                >
                    <ChartNoAxesColumn className="text-yellow-600" /> Moderate
                </button>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg
                 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50
                 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0
                 bg-cardColor text-white hover:bg-cardColorForeground py-3
                  border-[#282828] border mx-0.5 h-[22px] gap-1.5 px-1.5 pr-2 text-xs
                 hover:text-brand"
                >
                    <TrendingDown className="text-blue-600" /> Low
                </button>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg
                 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50
                 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0
                 bg-cardColor text-white hover:bg-cardColorForeground py-3
                  border-[#282828] border mx-0.5 h-[22px] gap-1.5 px-1.5 pr-2 text-xs
                 hover:text-brand"
                >
                    <TrendingUp className="text-orange-600" /> High
                </button>


            </div>
        </div>

    },
    {
        id: 2,
        content: <div className="space-y-4">
            <div className="flex items-center gap-1 ">
                <Activity className="text-green-600 size-4" />
                <div className="bg-gradient-to-r from-green-600 via-[#fff] to-[#fff] bg-clip-text">
                    <p className='text-transparent font-semibold text-sm '>Filter By: ACTIVITY</p>
                </div>
            </div>

            <div className="flex items-center flex-wrap gap-2">
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg
                 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50
                 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0
                 bg-cardColor text-white hover:bg-cardColorForeground py-3
                  border-[#282828] border mx-0.5 h-[22px] gap-1.5 px-1.5 pr-2 text-xs
                 hover:text-brand"
                >
                    <TrendingUp className="text-green-600" />Highest
                </button>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg
                 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50
                 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0
                 bg-cardColor text-white hover:bg-cardColorForeground py-3
                  border-[#282828] border mx-0.5 h-[22px] gap-1.5 px-1.5 pr-2 text-xs
                 hover:text-brand"
                >
                    <TrendingUp className="text-green-400" /> High
                </button>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg
                 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50
                 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0
                 bg-cardColor text-white hover:bg-cardColorForeground py-3
                  border-[#282828] border mx-0.5 h-[22px] gap-1.5 px-1.5 pr-2 text-xs
                 hover:text-brand"
                >
                    <ChartNoAxesColumn className="text-yellow-600" /> Moderate
                </button>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg
                 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50
                 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0
                 bg-cardColor text-white hover:bg-cardColorForeground py-3
                  border-[#282828] border mx-0.5 h-[22px] gap-1.5 px-1.5 pr-2 text-xs
                 hover:text-brand"
                >
                    <TrendingDown className="text-green-600" /> Low
                </button>
            </div>
        </div>
    },
]

export const CardStack = ({
    items = SIMPLE_CARDS,
    offset,
    scaleFactor,
    activeClass,
    inactiveClass,
}: {
    items?: Card[]
    offset?: number
    scaleFactor?: number
    activeClass?: string
    inactiveClass?: string
}) => {
    const CARD_OFFSET = offset || 10
    const SCALE_FACTOR = scaleFactor || 0.1
    const [cards, setCards] = useState<Card[]>(items)
    const stackRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(stackRef, { amount: 0.1 })
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const startAutoCycle = () => {
        if (intervalRef.current) return
        intervalRef.current = setInterval(() => {
            setCards((prevCards) => {
                const newArray = [...prevCards]
                const [firstCard] = newArray.splice(0, 1)
                newArray.push(firstCard)
                return newArray
            })
        }, 2500)
    }

    const stopAutoCycle = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = null
    }

    const handleCardClick = (clickedId: number) => {
        stopAutoCycle()
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)

        resumeTimeoutRef.current = setTimeout(() => {
            if (isInView) startAutoCycle()
        }, 2000)

        setCards((prevCards) => {
            const clickedCardIndex = prevCards.findIndex((card) => card.id === clickedId)
            const newArray = [...prevCards]
            const [clickedCard] = newArray.splice(clickedCardIndex, 1)
            newArray.push(clickedCard)
            return newArray
        })
    }

    useEffect(() => {
        if (!isInView) return
        startAutoCycle()

        return () => {
            stopAutoCycle()
            if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
        }
    }, [isInView])

    return (
        <div ref={stackRef} className="relative w-full max-w-md mx-auto h-[150px] ">
            {cards.map((card, index) => {
                const isActive = index === 0

                return (
                    <motion.div
                        key={card.id}
                        className={cn(
                            isActive &&
                            "w-full h-full bg-[#111111] border border-[#292929] rounded-[2.5rem] relative z-10 p-6 flex flex-col gap-1 cursor-pointer shadow-xl shadow-black/[0.1] text-white select-none [box-shadow:0_-20px_90px_-20px_#ffffff1f_inset] overflow-hidden",
                            isActive && activeClass,
                            !isActive &&
                            "w-full h-[100%] max-h-[110px] rounded-[2.5rem] absolute bg-[#111111] border border-[#292929] cursor-pointer p-6 flex flex-col gap-1 text-white [box-shadow:0_-30px_80px_-20px_#ffffff1f_inset]",
                            !isActive && inactiveClass
                        )}
                        style={{
                            transformOrigin: "top center",
                        }}
                        initial={{ x: 0, y: 0, scale: 1, opacity: 0, top: index * -CARD_OFFSET }}
                        animate={{
                            top: index * -CARD_OFFSET,
                            scale: isActive ? 1 : 1 - index * SCALE_FACTOR,
                            zIndex: cards.length - index,
                            left: isActive ? 0 : "50%",
                            x: isActive ? 0 : "-50%",
                            opacity: [0, 0, 1]
                        }}
                        transition={{
                            duration: 0.4,
                            ease: easeOut,
                        }}
                        onClick={() => handleCardClick(card.id)}
                    >
                        <div className="h-full overflow-hidden">
                            {card.content}
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

export default CardStack
