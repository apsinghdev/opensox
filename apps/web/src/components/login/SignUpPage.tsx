"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Overlay from "../ui/overlay";
import { useAnalytics } from "@/hooks/useAnalytics";
import { sanitizeCallbackUrl } from "@/lib/analytics";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/home";
  const { trackSignInStarted } = useAnalytics();

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

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      const sanitizedCallback = sanitizeCallbackUrl(safeCallbackUrl);
      trackSignInStarted(provider, sanitizedCallback);
      sessionStorage.setItem("posthog_sign_in_initiated", "true");
      sessionStorage.setItem("posthog_sign_in_provider", provider);
    } catch (e) {
      console.warn("Analytics tracking warning:", e);
    }

    await signIn(provider, { callbackUrl: safeCallbackUrl });
  };

  const authError = searchParams.get("error");

  return (
    <div className="flex flex-col items-center gap-6 font-sans w-full max-w-[480px] relative overflow-hidden py-12 px-6 sm:px-10">
      <Overlay />
      <Image
        src="/assets/mask.svg"
        alt="background"
        fill
        className="object-cover w-full h-full opacity-60 scale-150 pointer-events-none"
      />

      {/* Header / Branding */}
      <div className="flex items-center justify-center flex-col text-[#f5f5f5] gap-3 z-20 text-center">
        <div className="w-14 h-14 aspect-square overflow-hidden relative">
          <Image
            src="/assets/logo_var2.svg"
            alt="OpenSox logo"
            fill
            className="object-cover rounded-2xl w-full h-full"
            priority
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="tracking-tighter font-semibold text-2xl leading-tight text-text-primary">
            Create your OpenSox AI account
          </h1>
          <p className="text-sm text-text-secondary font-normal">
            Get started with OpenSox
          </p>
        </div>
      </div>

      {/* Signup Form */}
      <SignUpForm
        callbackUrl={safeCallbackUrl}
        authError={authError}
        onOAuthSignIn={handleOAuthSignIn}
      />
    </div>
  );
};

export default SignUpPage;
