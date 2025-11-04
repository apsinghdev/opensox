import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "../ui/header";
import { faqs } from "./faqData";

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
          className="w-[30px] lg:w-[50px] absolute left-0 top-0"
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
          className="w-[30px] lg:w-[50px] absolute right-0 top-0"
        />

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                value={`item-${index}`} 
                key={index}
                className="border border-[#252525] rounded-lg bg-[#151515]/20 backdrop-blur-xl overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-base lg:text-lg font-medium hover:bg-[#252525]/30 transition-colors [&[data-state=open]]:bg-[#252525]/50">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-[#d1d1d1] text-sm lg:text-base leading-relaxed">
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