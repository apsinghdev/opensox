'use client'
import Bento from '@/components/landing-sections/Bento'
import Brands from '@/components/landing-sections/Brands'
import CTA from '@/components/landing-sections/CTA'
import Footer from '@/components/landing-sections/footer'
import Hero from '@/components/landing-sections/Hero'
import HowItWorks from '@/components/landing-sections/how-it-works'
import Navbar from '@/components/landing-sections/navbar'
import Testimonials from '@/components/landing-sections/testimonials'
import Video from '@/components/landing-sections/video'
import React from 'react'
import { FaqSection } from '@/components/faq/FaqSection'


const Landing = () => {
    return (
        <main className='min-h-screen w-full bg-[#101010] text-white font-sans overflow-hidden relative'>
            <Navbar />
            <div className="min-h-screen w-full max-w-[2000px] mx-auto border-x border-[#252525] overflow-hidden">
                <Hero />
                <Bento />
                <Video />
                <HowItWorks />
                <FaqSection />
                <Brands />
                <Testimonials />
            </div>
            <div className="max-w-[2000px] w-full mx-auto">
                <CTA />
                <Footer />
            </div>
        </main >
    )
}

export default Landing


