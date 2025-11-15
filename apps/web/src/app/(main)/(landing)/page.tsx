'use client'
import React, { Suspense, lazy } from 'react'

import { Skeleton } from "@/components/ui/skeleton";

const Navbar = lazy(() => import('@/components/landing-sections/navbar'))
const Hero = lazy(() => import('@/components/landing-sections/Hero'))
const Bento = lazy(() => import('@/components/landing-sections/Bento'))
const Video = lazy(() => import('@/components/landing-sections/video'))
const HowItWorks = lazy(() => import('@/components/landing-sections/how-it-works'))
const Brands = lazy(() => import('@/components/landing-sections/Brands'))
const Testimonials = lazy(() => import('@/components/landing-sections/testimonials'))
const FaqSection = lazy(() => import('@/components/faq/FaqSection'))
const CTA = lazy(() => import('@/components/landing-sections/CTA'))
const Footer = lazy(() => import('@/components/landing-sections/footer'))


const Landing = () => {
    return (
        <main className='min-h-screen w-full bg-[#101010] text-white font-sans overflow-hidden relative'>
                <Suspense
                    fallback={
                         <div className="py-20 text-center text-lg text-neutral-400">
                            <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-72" />
                                <Skeleton className="h-4 w-64" />
                                <Skeleton className="h-4 w-56" />
                                </div>
                            </div>
                        }
                    >
                    <Navbar />
                </Suspense>
        <div className="min-h-screen w-full max-w-[2000px] mx-auto border-x border-[#252525] overflow-hidden">
                <Suspense
                      fallback={
                        <div className="py-20 text-center text-lg text-neutral-400">
                          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-56" />
                          </div>
                        </div>
                      }
                    >
                    <Hero />
                </Suspense>
                <Suspense
                      fallback={
                        <div className="py-20 text-center text-lg text-neutral-400">
                          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-56" />
                          </div>
                        </div>
                      }
                    >
                    <Bento />
                </Suspense>
                <Suspense
                      fallback={
                        <div className="py-20 text-center text-lg text-neutral-400">
                          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-56" />
                          </div>
                        </div>
                      }
                    >
                    <Video />
                </Suspense>
                <Suspense
                      fallback={
                        <div className="py-20 text-center text-lg text-neutral-400">
                          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-56" />
                          </div>
                        </div>
                      }
                    >
                    <HowItWorks />
                </Suspense>
                <Suspense
                      fallback={
                        <div className="py-20 text-center text-lg text-neutral-400">
                          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-56" />
                          </div>
                        </div>
                      }
                    >
                    <Brands />
                </Suspense>
                <Suspense
                      fallback={
                        <div className="py-20 text-center text-lg text-neutral-400">
                          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-56" />
                          </div>
                        </div>
                      }
                    >
                    <Testimonials />
                </Suspense>
                <Suspense
                      fallback={
                        <div className="py-20 text-center text-lg text-neutral-400">
                          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-56" />
                          </div>
                        </div>
                      }
                    >
                    <FaqSection />
                </Suspense>
            </div>
            <div className="max-w-[2000px] w-full mx-auto">
                <Suspense
                      fallback={
                        <div className="py-20 text-center text-lg text-neutral-400">
                          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-56" />
                          </div>
                        </div>
                      }
                    >
                    <CTA />
                </Suspense>
                <Suspense
                      fallback={
                        <div className="py-20 text-center text-lg text-neutral-400">
                          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-56" />
                          </div>
                        </div>
                      }
                    >
                    <Footer />
                </Suspense>
            </div>
        </main >
    )
}

export default Landing


