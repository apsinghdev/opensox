'use client'
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { Analog, Cap, Lucid, Mail0, Nimbus, SupMemory } from "../icons/icons"

export default function OrbitComponent() {
    const orbitRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(orbitRef, { amount: 0.1 })

    return (
        <div className={`relative w-[420px] aspect-square mx-auto ${isInView ? "" : "orbit-paused"}`} ref={orbitRef}>
            {/* Orbit rings */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
                className="absolute inset-0 rounded-full border bg-neutral-900/5 backdrop-blur-xl border-white/5 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] "></motion.div>
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                className="absolute inset-[45px] rounded-full border border-white/5  backdrop-blur-xl [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"></motion.div>
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute inset-[90px] rounded-full border border-white/5  backdrop-blur-xl [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] "></motion.div>
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-[90px] rounded-full  text-white font-bold text-lg -z-0 flex items-center justify-center">
                <p className="text-3xl tracking-tighter">Opensox AI</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                className="absolute inset-0 animate-spin-slow">
                {/* Outer orbit items - counter-rotate to stay upright */}

                <div className="absolute rounded-xl w-10 h-10 -top-4 left-1/2 p-1 animate-spin-slow-reverse bg-white flex items-center justify-center">
                    <Cap />
                </div>

                <div className="absolute bg-[#101010] p-1 rounded-xl w-10 h-10 right-[20px] bottom-[60px]  animate-spin-slow-reverse">
                    <Nimbus />
                </div>


                <div className="absolute rounded-xl w-10 h-10 left-0 bottom-[100px] animate-spin-slow-reverse bg-white flex items-center justify-center">
                    <Analog />
                </div>
            </motion.div>

            {/* Middle orbit - counter-clockwise */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute inset-0 animate-spin-slow-reverse ">
                {/* Second orbit items - counter-rotate to stay upright */}
                <div className="absolute  rounded-xl bg-[#101010] w-10 h-10 top-[100px] left-[50px]  animate-spin-slow flex items-center justify-center">
                    <Mail0 />
                </div>
                <div className="absolute p-1.5 rounded-xl bg-white w-10 h-10 bottom-[100px] right-[50px]  animate-spin-slow flex items-center justify-center">
                    <Lucid />
                </div>


            </motion.div>

            {/* Inner orbit - clockwise */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.05 }}
                className="absolute inset-0 animate-spin-slow">
                {/* Inner orbit items - counter-rotate to stay upright */}
                <div className="absolute bg-white rounded-xl w-10 h-10 top-[120px] right-[90px] animate-spin-slow-reverse ">
                    <Image
                        src="/assets/icons/cal.svg"
                        alt='cal'
                        width={100}
                        height={100}
                        className=""
                    />
                </div>

                <div className="absolute p-2 flex items-center justify-center bg-[#101010] rounded-xl w-10 h-10 bottom-[120px] left-[90px] animate-spin-slow-reverse ">
                   <SupMemory/>
                </div>
            </motion.div>


        </div>
    )
}
