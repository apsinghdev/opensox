import { Info, User, Calendar, Rocket, FileText } from "lucide-react";

interface ProgramSectionProps {
  id: string;
  title: string;
  contentHtml: string;
}

const getSectionIcon = (sectionId: string) => {
  const icons: Record<string, React.ReactNode> = {
    what: <Info className="w-4 h-4" />,
    "is-it-for-you": <User className="w-4 h-4" />,
    when: <Calendar className="w-4 h-4" />,
    "how-to-prepare": <Rocket className="w-4 h-4" />,
    "application-process": <FileText className="w-4 h-4" />,
  };
  return icons[sectionId] || <Info className="w-4 h-4" />;
};

export default function ProgramSection({
  id,
  title,
  contentHtml,
}: ProgramSectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-4 text-white flex items-center gap-2.5 tracking-tight">
        <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-md bg-[#9455f4]/15 text-[#9455f4] flex-shrink-0">
          {getSectionIcon(id)}
        </span>
        <span className="break-words">{title}</span>
      </h2>
      <div
        className={`program-content prose prose-invert max-w-none overflow-x-auto
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
          prose-h3:text-base prose-h3:md:text-lg prose-h3:mt-8 prose-h3:mb-3
          prose-h4:text-sm prose-h4:md:text-base prose-h4:mt-6 prose-h4:mb-2
          prose-p:text-gray-300 prose-p:leading-[1.75] prose-p:text-sm prose-p:md:text-[15px] prose-p:mb-4 prose-p:font-normal
          prose-li:text-gray-300 prose-li:leading-[1.7] prose-li:text-sm prose-li:md:text-[15px] prose-li:font-normal
          prose-ul:my-4 prose-ul:space-y-0
          prose-ol:my-4 prose-ol:space-y-0
          prose-a:text-[#9455f4] prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-colors prose-a:break-all
          prose-strong:text-white prose-strong:font-semibold
          prose-code:text-[#dcb8ff] prose-code:bg-[#252525] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:md:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-[''] prose-code:break-all
          prose-pre:bg-[#252525] prose-pre:border prose-pre:border-[#333] prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:my-5
          prose-blockquote:border-l-4 prose-blockquote:border-[#9455f4] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400 prose-blockquote:my-5
          ${id === "application-process" ? "application-timeline" : ""}
          ${id === "how-to-prepare" ? "preparation-checklist" : ""}
          ${id === "is-it-for-you" ? "eligibility-section" : ""}
          ${id === "what" ? "what-section" : ""}`}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </section>
  );
}
