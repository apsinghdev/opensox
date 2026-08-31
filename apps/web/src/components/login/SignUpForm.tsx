"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Google, Github } from "../icons/icons";
import PrimaryButton from "../ui/custom-button";

interface SignUpFormProps {
  callbackUrl?: string;
  authError?: string | null;
  onOAuthSignIn: (provider: "google" | "github") => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  callbackUrl = "/dashboard/home",
  authError,
  onOAuthSignIn,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [loginHref, setLoginHref] = useState("/login");

  useEffect(() => {
    if (authError) {
      if (authError === "OAuthSignin" || authError === "OAuthCallback") {
        setErrors((prev) => ({
          ...prev,
          general:
            "OAuth authentication failed. Please verify GOOGLE_CLIENT_ID / GITHUB_CLIENT_ID are configured in environment variables.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: `Authentication error: ${authError}. Please try again.`,
        }));
      }
    }
  }, [authError]);

  useEffect(() => {
    if (callbackUrl && callbackUrl !== "/dashboard/home") {
      setLoginHref(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    } else {
      setLoginHref("/login");
    }
  }, [callbackUrl]);

  const validate = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoMessage(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate/attempt registration
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Backend registration endpoint with credentials is pending backend implementation
      setInfoMessage(
        "Direct registration with email/password is currently in preview. Please continue with Google or GitHub to create your account immediately."
      );
    } catch {
      setErrors({
        general: "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[380px] z-20 flex flex-col gap-4">
      {errors.general && (
        <div className="p-3 text-xs text-red-400 bg-red-950/40 border border-red-800/60 rounded-xl text-center">
          {errors.general}
        </div>
      )}

      {infoMessage && (
        <div className="p-3 text-xs text-brand-purple-light bg-brand-purple/10 border border-brand-purple/30 rounded-xl text-center">
          {infoMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
        {/* Name Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="signup-name"
            className="text-xs font-medium text-text-secondary"
          >
            Name
          </label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Enter your name"
            autoComplete="name"
            disabled={isLoading}
            className={`w-full px-3.5 py-2.5 rounded-xl text-sm text-text-primary bg-[#161616] border ${
              errors.name
                ? "border-red-500/80 focus:border-red-500"
                : "border-[#282828] focus:border-brand-purple"
            } outline-none placeholder:text-text-muted transition-colors disabled:opacity-50`}
          />
          {errors.name && (
            <span className="text-xs text-red-400 font-normal">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="signup-email"
            className="text-xs font-medium text-text-secondary"
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="Enter your email"
            autoComplete="email"
            disabled={isLoading}
            className={`w-full px-3.5 py-2.5 rounded-xl text-sm text-text-primary bg-[#161616] border ${
              errors.email
                ? "border-red-500/80 focus:border-red-500"
                : "border-[#282828] focus:border-brand-purple"
            } outline-none placeholder:text-text-muted transition-colors disabled:opacity-50`}
          />
          {errors.email && (
            <span className="text-xs text-red-400 font-normal">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="signup-password"
            className="text-xs font-medium text-text-secondary"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Create a password"
              autoComplete="new-password"
              disabled={isLoading}
              className={`w-full px-3.5 py-2.5 pr-10 rounded-xl text-sm text-text-primary bg-[#161616] border ${
                errors.password
                  ? "border-red-500/80 focus:border-red-500"
                  : "border-[#282828] focus:border-brand-purple"
              } outline-none placeholder:text-text-muted transition-colors disabled:opacity-50`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-400 font-normal">
              {errors.password}
            </span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="signup-confirm-password"
            className="text-xs font-medium text-text-secondary"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              placeholder="Confirm your password"
              autoComplete="new-password"
              disabled={isLoading}
              className={`w-full px-3.5 py-2.5 pr-10 rounded-xl text-sm text-text-primary bg-[#161616] border ${
                errors.confirmPassword
                  ? "border-red-500/80 focus:border-red-500"
                  : "border-[#282828] focus:border-brand-purple"
              } outline-none placeholder:text-text-muted transition-colors disabled:opacity-50`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors focus:outline-none"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-xs text-red-400 font-normal">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <PrimaryButton
          type="submit"
          disabled={isLoading}
          animate={false}
          classname="w-full mt-1.5 py-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </span>
          ) : (
            "Create account"
          )}
        </PrimaryButton>
      </form>

      {/* Divider */}
      <div className="relative flex py-1 items-center w-full">
        <div className="flex-grow border-t border-[#252525]"></div>
        <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-text-muted font-medium">
          OR
        </span>
        <div className="flex-grow border-t border-[#252525]"></div>
      </div>

      {/* OAuth Buttons */}
      <div className="flex flex-col gap-2.5 w-full relative z-20">
        <PrimaryButton
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onOAuthSignIn("google");
          }}
          classname="w-full cursor-pointer relative z-20"
        >
          <div className="w-5 h-5 flex items-center justify-center pointer-events-none">
            <Google />
          </div>
          <span className="pointer-events-none">Continue with Google</span>
        </PrimaryButton>

        <PrimaryButton
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onOAuthSignIn("github");
          }}
          classname="w-full cursor-pointer relative z-20"
        >
          <div className="w-5 h-5 flex items-center justify-center pointer-events-none">
            <Github />
          </div>
          <span className="pointer-events-none">Continue with GitHub</span>
        </PrimaryButton>
      </div>

      {/* Navigation to Login */}
      <div className="text-center text-xs text-text-secondary mt-2">
        <span>Already have an account?</span>{" "}
        <Link
          href={loginHref}
          suppressHydrationWarning
          className="text-brand-purple-light hover:underline font-semibold transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
