"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import PrimaryButton from "../ui/custom-button";
import { Google, Github } from "../icons/icons";
import Image from "next/image";
import Overlay from "../ui/overlay";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/home";

  const getSafeCallbackUrl = (url: string): string => {
    if (!url || url.trim() === "") {
      return "/dashboard/home";
    }

    if (url.startsWith("/") && !url.startsWith("//")) {
      return url;
    }

    try {
      const parsedUrl = new URL(url, window.location.origin);
      if (parsedUrl.origin === window.location.origin) {
        return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
      }
    } catch {}

    return "/dashboard/home";
  };

  const safeCallbackUrl = getSafeCallbackUrl(callbackUrl);

  return (
    <div className="font-semibold flex flex-col items-center gap-6 font-sans w-[550px] relative overflow-hidden py-20 px-10">
      <Overlay />
      <Image
        src="/assets/mask.svg"
        alt="background"
        fill
        className="object-cover w-full h-full opacity-60 scale-150"
      />
      <div className="flex items-center justify-center flex-col text-[#f5f5f5] gap-4 z-20">
        <div className="w-16 aspect-square overflow-hidden relative">
          <Image
            src="/assets/logo_var2.svg"
            alt="background"
            fill
            className="object-cover rounded-2xl w-full h-full"
          />
        </div>
        <p className="tracking-tighter font-semibold text-2xl leading-tight">
          Welcome to Opensox AI
        </p>
      </div>
      <PrimaryButton
        onClick={() => signIn("google", { callbackUrl: safeCallbackUrl })}
        classname="w-full max-w-[380px] z-20 "
      >
        <div className="w-6">
          <Google />
        </div>
        Continue with Google
      </PrimaryButton>
      <PrimaryButton
        onClick={() => signIn("github", { callbackUrl: safeCallbackUrl })}
        classname="w-full max-w-[380px] z-20 "
      >
        <div className="w-6">
          <Github />
        </div>
        Continue with GitHub
      </PrimaryButton>
    </div>
  );
};

export default SignInPage;
