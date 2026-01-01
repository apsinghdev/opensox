"use client";

import { useRouter } from "next/navigation";
import { SparklesIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "@/components/ui/custom-button";

export function PremiumUpgradePrompt() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-[#121214] border border-[#1a1a1d] rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-[#a472ea]/20 to-[#7150e7]/20 rounded-full">
            <LockClosedIcon className="size-10 text-[#a472ea]" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-ox-white mb-2">OX Newsletter</h1>

        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
          Stay ahead in the open source world. Get curated insights on jobs,
          funding news, trending projects, upcoming trends, and expert tips.
        </p>

        <PrimaryButton
          onClick={() => router.push("/pricing")}
          classname="w-full px-6"
        >
          <SparklesIcon className="size-4" />
          Unlock Premium
        </PrimaryButton>
      </div>
    </div>
  );
}
