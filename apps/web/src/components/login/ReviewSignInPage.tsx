"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import PrimaryButton from "../ui/custom-button";
import Overlay from "../ui/overlay";
import { Input } from "../ui/input";

const DEFAULT_CALLBACK_URL = "/pricing#pro-price-card";

const getSafeCallbackUrl = (url: string): string => {
  if (!url || url.trim() === "") {
    return DEFAULT_CALLBACK_URL;
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

  return DEFAULT_CALLBACK_URL;
};

const ReviewSignInPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_CALLBACK_URL;
  const safeCallbackUrl = getSafeCallbackUrl(callbackUrl);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setError("");
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: safeCallbackUrl,
        redirect: false,
      });

      if (!result?.ok) {
        setError("Invalid email or password");
        return;
      }

      window.location.href = safeCallbackUrl;
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-semibold flex flex-col items-center gap-6 font-sans w-[550px] relative overflow-hidden py-20 px-10">
      <Overlay />
      <Image
        src="/assets/mask.svg"
        alt=""
        fill
        className="object-cover w-full h-full opacity-60 scale-150"
      />
      <div className="flex items-center justify-center flex-col text-text-primary gap-4 z-20">
        <div className="w-16 aspect-square overflow-hidden relative">
          <Image
            src="/assets/logo_var2.svg"
            alt="Opensox AI"
            fill
            className="object-cover rounded-2xl w-full h-full"
          />
        </div>
        <p className="tracking-tighter font-semibold text-2xl leading-tight">
          Welcome to Opensox AI
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="z-20 flex w-full max-w-[380px] flex-col items-center gap-4"
      >
        <label className="sr-only" htmlFor="review-email">
          Email
        </label>
        <Input
          id="review-email"
          type="email"
          name="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="h-12 w-full rounded-[16px] border-border bg-surface-elevated px-4 text-text-primary placeholder:text-text-muted"
        />
        <label className="sr-only" htmlFor="review-password">
          Password
        </label>
        <Input
          id="review-password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="h-12 w-full rounded-[16px] border-border bg-surface-elevated px-4 text-text-primary placeholder:text-text-muted"
        />
        {error ? (
          <p className="text-sm text-error-text" role="alert">
            {error}
          </p>
        ) : null}
        <PrimaryButton
          classname={`w-full ${isSubmitting ? "pointer-events-none opacity-70" : ""}`}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default ReviewSignInPage;
