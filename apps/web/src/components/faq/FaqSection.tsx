import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "../ui/header";
import { faqs } from "./faqData";
import Image from "next/image";

export function FaqSection() {
  return (
    <div className="flex flex-col border-b border-[#252525]" id="faq">
      <Header title="Frequently Asked Questions" />
      <div className="w-full px-[30px] lg:px-[50px] py-8 lg:py-12 relative">
        <div
          style={{
            height: "100%",
            "--pattern-fg": "#252525",
            borderRight: "1px solid #252525",
            backgroundImage:
              "repeating-linear-gradient(315deg, #252525 0, #252525 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
            backgroundAttachment: "fixed",
          } as React.CSSProperties}
          className="w-[30px] lg:w-[50px] absolute left-0 top-0 z-30"
        />

        <div
          style={{
            height: "100%",
            "--pattern-fg": "#252525",
            borderLeft: "1px solid #252525",
            backgroundImage:
              "repeating-linear-gradient(315deg, #252525 0, #252525 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
            backgroundAttachment: "fixed",
          } as React.CSSProperties}
          className="w-[30px] lg:w-[50px] absolute right-0 top-0 z-30"
        />

        <div className="absolute w-full h-full top-0 left-0">
          <Image
            src="/assets/mask.svg"
            alt="background"
            fill
            className="object-cover w-full h-full opacity-40 [mask-image:radial-gradient(circle_at_center,transparent_0%,transparent_40%,black_60%,black_100%)]"
          />
          <div className="absolute h-full w-full bg-gradient-to-t from-[#101010]/75 via-transparent to-[#101010]/75 top-0 left-1/2 -translate-x-1/2"></div>
          <div className="absolute h-full w-full bg-gradient-to-r from-[#101010]/75 via-transparent to-[#101010]/75 top-0 left-1/2 -translate-x-1/2"></div>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <Accordion type="single" collapsible className="w-full space-y-4 px-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className=" rounded-2xl border border-[#202020] overflow-hidden relative z-10"
              >
                <svg width="894" height="126" viewBox="0 0 894 126" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 z-0 pointer-events-none opacity-30">
                  <g clip-path="url(#clip0_288_24)">
                    <g filter="url(#filter0_n_288_24)">
                      <g filter="url(#filter1_f_288_24)">
                        <ellipse cx="570.829" cy="-239.222" rx="814.829" ry="819.778" fill="#A556FB" />
                      </g>
                      <g filter="url(#filter2_f_288_24)">
                        <ellipse cx="571.517" cy="-239.221" rx="685.036" ry="689.298" fill="#4922E5" />
                      </g>
                      <g filter="url(#filter3_f_288_24)">
                        <ellipse cx="386" cy="-239" rx="585" ry="585.5" fill="#101010" />
                      </g>
                    </g>
                  </g>
                  <defs>
                    <filter id="filter0_n_288_24" x="-244" y="-1059" width="1629.66" height="1639.56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feTurbulence type="fractalNoise" baseFrequency="0.1428571492433548 0.1428571492433548" stitchTiles="stitch" numOctaves="3" result="noise" seed="3305" />
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                      <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                      </feComponentTransfer>
                      <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                      <feFlood flood-color="rgba(0, 0, 0, 0.12)" result="color1Flood" />
                      <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                      <feMerge result="effect1_noise_288_24">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                      </feMerge>
                    </filter>
                    <filter id="filter1_f_288_24" x="-324" y="-1139" width="1789.66" height="1799.56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_288_24" />
                    </filter>
                    <filter id="filter2_f_288_24" x="-273.518" y="-1088.52" width="1690.07" height="1698.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feGaussianBlur stdDeviation="80" result="effect1_foregroundBlur_288_24" />
                    </filter>
                    <filter id="filter3_f_288_24" x="-399" y="-1024.5" width="1570" height="1571" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_288_24" />
                    </filter>
                    <clipPath id="clip0_288_24">
                      <rect width="1512" height="864" fill="white" transform="translate(-337 -467)" />
                    </clipPath>
                  </defs>
                </svg>


                <AccordionTrigger className="px-6 py-4 text-left text-base lg:text-lg font-medium transition-colors z-30">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-[#ffffff] text-sm lg:text-base leading-relaxed z-50">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}