import { Clock, MapPin, DollarSign } from "lucide-react";
import { Program } from "@/data/oss-programs/types";

interface ProgramMetadataProps {
  program: Program;
}

export default function ProgramMetadata({ program }: ProgramMetadataProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-14">
      <div className="bg-[#252525] p-4 md:p-5 rounded-lg border border-[#333] hover:border-[#444] transition-colors">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs font-medium uppercase tracking-wide">Region</span>
        </div>
        <p className="text-white font-semibold text-sm md:text-base capitalize">
          {program.region}
        </p>
      </div>

      <div className="bg-[#252525] p-4 md:p-5 rounded-lg border border-[#333] hover:border-[#444] transition-colors">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs font-medium uppercase tracking-wide">Duration</span>
        </div>
        <p className="text-white font-semibold text-sm md:text-base">
          {program.duration || "Flexible"}
        </p>
      </div>

      <div className="bg-[#252525] p-4 md:p-5 rounded-lg border border-[#333] hover:border-[#444] transition-colors sm:col-span-2 md:col-span-1">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <DollarSign className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs font-medium uppercase tracking-wide">Stipend</span>
        </div>
        <p className="text-white font-semibold text-sm md:text-base">
          {program.isPaid ? "Paid" : "Unpaid"}
        </p>
      </div>
    </div>
  );
}
