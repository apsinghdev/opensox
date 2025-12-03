import { Suspense } from "react";
import SignInPage from "@/components/login/SignInPage";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center relative bg-surface-primary">
      <div className=" z-10">
        <Suspense fallback={<div>Loading...</div>}>
          <SignInPage></SignInPage>
        </Suspense>
      </div>
    </div>
  );
}
