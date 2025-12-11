'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { FlickeringGrid } from './flickering-grid'
import { colors } from '@/lib/design-tokens'
import Link from 'next/link'
import { Home } from 'lucide-react'

const Header = ({ title, homeLink }: { title: string; homeLink?: string }) => {
    return (
        <div className="px-[30px] py-10 h-[160px] relative overflow-hidden border-b border-white/10 w-full">
            
            {homeLink && (
                <Link
                    href={homeLink}
                    aria-label="go to dashboard home"
                    className="absolute left-2 top-4 lg:left-8 lg:top-8 z-40 p-1.5 lg:p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full transition-all duration-200 group"
                >
                    <Home className="w-4 h-4 lg:w-5 lg:h-5 text-white/70 group-hover:text-white" />
                </Link>
            )}

            <motion.h4
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, ease: 'easeOut', type: 'spring', delay: 0.3 }}
                className="font-medium inset-0 flex items-center justify-center text-3xl lg:text-5xl tracking-tight absolute z-30 text-center"
            >
                {title}
            </motion.h4>

            <div
                style={{
                    background: 'radial-gradient(circle at center, #101010 30%, transparent 100%)',
                }}
                className="h-full w-full right-0 top-0 z-20 absolute"
            />

            <div className="absolute right-0 w-full h-full top-0 z-10 opacity-50">
                <FlickeringGrid
                    className="absolute -z-0 top-0 right-0"
                    squareSize={3}
                    gridGap={6}
                    color={colors.brand.purple.grid}
                    maxOpacity={1}
                    flickerChance={0.1}
                    height={200}
                    width={2000}
                />
            </div>
        </div>
    )
}

export default Header
