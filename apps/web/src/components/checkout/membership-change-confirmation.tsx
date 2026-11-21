"use client";

import React from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MembershipChangeConfirmation({
  message,
}: {
  message: string;
}) {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-8 lg:p-16">
      <div className="relative bg-transparent border-2 border-white/20 rounded-[2rem] p-8 lg:p-16 backdrop-blur-sm">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-green-400/30 bg-green-500/20 flex items-center justify-center">
            <Check className="w-10 h-10 lg:w-12 lg:h-12 text-green-400 stroke-[3]" />
          </div>
        </div>

        <div className="text-center space-y-6">
          <p className="text-lg lg:text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto">
            {message}
          </p>

          <div className="pt-4">
            <button
              onClick={() => router.push("/dashboard/account")}
              className="px-8 py-3 bg-brand-purple hover:bg-brand-purple-light text-text-primary font-semibold rounded-lg transition-colors duration-200"
            >
              Check Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
