import { Suspense } from "react";
import SignUpPage from "@/components/login/SignUpPage";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center relative bg-surface-primary p-4">
      <div className="z-10 w-full flex justify-center">
        <Suspense fallback={<div className="text-text-secondary text-sm">Loading...</div>}>
          <SignUpPage />
        </Suspense>
      </div>
    </div>
  );
}
