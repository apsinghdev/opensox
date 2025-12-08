import { Sparkles, Upload, Zap } from "lucide-react";
import Features from "../ui/features";
import Header from "../ui/header";

const data = [
  {
    id: 1,
    title: "1. Set Your Filters",
    content:
      "Choose the languages, stack, activity level, and other preferences that matter to you.",
    image: "/assets/filter.webp",
    icon: <Upload className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Search Instantly",
    content:
      "Hit search and explore thousands of open-source repositories matched to your criteria.",
    image: "/assets/search.webp",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Discover & Contribute",
    content:
      "Find the perfect project for your stack, start exploring the code, and make meaningful contributions.",
    image: "/assets/contribute.webp",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
];

export default function HowItWorks() {
  return (
    <div id="workflow" className="border-b border-[#252525]">
      <Header title="How it Works" />
      <div className="w-full relative px-[30px] lg:px-[50px]">
        <div
          style={
            {
              height: "100%",
              "--pattern-fg": "#252525",
              borderRight: "1px solid #252525",
              backgroundImage:
                "repeating-linear-gradient(315deg, #252525 0, #252525 1px, transparent 0, transparent 50%)",
              backgroundSize: "10px 10px",
              backgroundAttachment: "fixed",
            } as React.CSSProperties
          }
          className="w-[30px] lg:w-[50px] absolute left-0 top-0"
        />
        <div
          style={
            {
              height: "100%",
              "--pattern-fg": "#252525",
              borderLeft: "1px solid #252525",
              backgroundImage:
                "repeating-linear-gradient(315deg, #252525 0, #252525 1px, transparent 0, transparent 50%)",
              backgroundSize: "10px 10px",
              backgroundAttachment: "fixed",
            } as React.CSSProperties
          }
          className="w-[30px] lg:w-[50px] absolute right-0 top-0 "
        />
        <Features data={data} />
      </div>
    </div>
  );
}
