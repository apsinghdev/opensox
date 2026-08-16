"use client";
import React, { useMemo } from "react";
import Navbar from "@/components/landing-sections/navbar";
import Footer from "@/components/landing-sections/footer";
import { Twitter, Linkedin, Instagram, Youtube, Home } from "lucide-react";
import Link from "next/link";

import { trpc } from "@/lib/trpc";
import { imageTestimonials } from "@/data/testimonials";
import { Skeleton } from "@/components/ui/skeleton";
import { getSocialHandle } from "@/lib/social-handle";

type TestimonialBase = {
  id: string;
  type: "text" | "image";
};

type TextTestimonial = TestimonialBase & {
  type: "text";
  content: string;
  user: {
    name: string;
    username?: string; // e.g. @username
    avatar: string;
    socialLink?: string;
  };
};

type ImageTestimonial = TestimonialBase & {
  type: "image";
  imageUrl: string;
  alt: string;
};

type Testimonial = TextTestimonial | ImageTestimonial;

// Helper function to get social icon based on URL
const getSocialIcon = (url: string) => {
  try {
    const hostname = new URL(url).hostname;
    if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      return <Twitter className="h-4 w-4" />;
    }
    if (hostname.includes("linkedin.com")) {
      return <Linkedin className="h-4 w-4" />;
    }
    if (hostname.includes("instagram.com")) {
      return <Instagram className="h-4 w-4" />;
    }
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      return <Youtube className="h-4 w-4" />;
    }
    return null;
  } catch {
    return null;
  }
};

const TestimonialCard = ({ item }: { item: Testimonial }) => {
  if (item.type === "image") {
    return (
      <div className="mb-4 break-inside-avoid rounded-xl border border bg-neutral-900/50 overflow-hidden hover:border-neutral-700 transition-colors p-2">
        <div className="relative w-full">
          <img
            src={item.imageUrl}
            alt={item.alt}
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  const socialIcon = item.user.socialLink
    ? getSocialIcon(item.user.socialLink)
    : null;

  return (
    <div className="mb-4 break-inside-avoid rounded-xl border border bg-neutral-900/50 p-6 hover:border-neutral-700 transition-colors flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
          <img
            src={item.user.avatar}
            alt={item.user.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-sm font-medium text-white">
            {item.user.name}
          </span>
          {item.user.username && (
            <span className="text-xs text-neutral-400">
              {item.user.username}
            </span>
          )}
        </div>
        {socialIcon && item.user.socialLink && (
          <a
            href={item.user.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="Social profile"
          >
            {socialIcon}
          </a>
        )}
      </div>
      <p className="text-neutral-300 text-sm leading-relaxed">{item.content}</p>
    </div>
  );
};

const TestimonialsPage = () => {
  const { data: textTestimonialsData, isLoading } =
    trpc.testimonial.getAll.useQuery();

  const textTestimonials = useMemo(() => {
    return (textTestimonialsData || []).map(
      (t: {
        id: string;
        content: string;
        name: string;
        avatar: string;
        socialLink?: string;
      }) => ({
        id: t.id,
        type: "text" as const,
        content: t.content,
        user: {
          name: t.name,
          username: getSocialHandle(t.socialLink) ?? undefined,
          avatar: t.avatar,
          socialLink: t.socialLink,
        },
      })
    );
  }, [textTestimonialsData]);

  const imageTestimonialsData: ImageTestimonial[] = imageTestimonials;

  const allTestimonials = useMemo(() => {
    return [...textTestimonials, ...imageTestimonialsData];
  }, [textTestimonials, imageTestimonialsData]);

  const leftColumnTestimonials = useMemo(() => {
    return allTestimonials.filter((_, idx) => idx % 2 === 0);
  }, [allTestimonials]);

  const rightColumnTestimonials = useMemo(() => {
    return allTestimonials.filter((_, idx) => idx % 2 === 1);
  }, [allTestimonials]);

  return (
    <main className="min-h-screen w-full bg-surface-primary text-white font-sans overflow-hidden relative">
      <Navbar />

      <div className="min-h-screen w-full max-w-[2000px] mx-auto border-x border-border overflow-hidden pt-24 pb-20 px-4 md:px-6 lg:px-10">
        <div className="mb-8 max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-tertiary hover:text-brand-purple transition-colors group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-text-primary">
            Loved by <span className="text-brand-purple">our Investors</span>
          </h1>
          <p className="text-base md:text-lg text-text-tertiary max-w-2xl mx-auto">
            See what the people who believed in Opensox AI said about it.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto max-w-7xl">
            {/* Text testimonials column skeleton */}
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-neutral-900/50 p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col gap-2 flex-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
            {/* Image testimonials column skeleton */}
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div
                  key={`img-${i}`}
                  className="rounded-xl border border-border bg-neutral-900/50 overflow-hidden"
                >
                  <Skeleton className="w-full h-64" />
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && allTestimonials.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto max-w-7xl">
            <div className="space-y-4">
              {leftColumnTestimonials.map((testimonial: Testimonial) => (
                <TestimonialCard key={testimonial.id} item={testimonial} />
              ))}
            </div>

            <div className="space-y-4">
              {rightColumnTestimonials.map((testimonial: Testimonial) => (
                <TestimonialCard key={testimonial.id} item={testimonial} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && allTestimonials.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <p className="text-neutral-400 text-lg">
              No testimonials yet. Be the first to share your experience!
            </p>
          </div>
        )}
      </div>

      <div className="max-w-[2000px] w-full mx-auto">
        <Footer />
      </div>
    </main>
  );
};

export default TestimonialsPage;
