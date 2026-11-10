import { Suspense } from "react";
import type { Metadata } from "next";
import ReviewSignInPage from "@/components/login/ReviewSignInPage";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewLoginPage() {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center relative bg-surface-primary">
      <div className="z-10">
        <Suspense fallback={<div>Loading...</div>}>
          <ReviewSignInPage />
        </Suspense>
      </div>
    </div>
  );
}
