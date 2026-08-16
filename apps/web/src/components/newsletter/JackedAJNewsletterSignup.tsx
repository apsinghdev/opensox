"use client";

import { useState, type FormEvent } from "react";

import { CONFIG } from "@/utils/config";

type JackedAJNewsletterSignupProps = {
  source: string;
};

export function JackedAJNewsletterSignup({
  source,
}: JackedAJNewsletterSignupProps) {
  const [status, setStatus] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(
      new FormData(event.currentTarget).get("email") || ""
    ).trim();
    if (!email) {
      setStatus("enter your email.");
      return;
    }

    setStatus("sending…");

    try {
      const res = await fetch(`${CONFIG.BASE_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) {
        setStatus("something went wrong. try again.");
        return;
      }

      const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (data && data.ok === true) {
        setSent(true);
        return;
      }

      setStatus("something went wrong. try again.");
    } catch {
      setStatus("something went wrong. try again.");
    }
  }

  return (
    <section className="text-center" aria-labelledby="jal-newsletter-heading">
      <h2
        id="jal-newsletter-heading"
        className="text-lg font-bold text-text-primary mb-2"
      >
        sign up for the jackedAJ newsletter.
      </h2>
      <p className="text-text-secondary text-[1.08rem] leading-relaxed mb-3.5">
        i promise i won&apos;t spam you or send AI slop. only short, handwritten
        msgs on tech, content, health and money, occasionally.
      </p>
      {sent ? (
        <p role="status" className="text-text-secondary">
          check your email to confirm. after you click the link you&apos;re in.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-1.5 items-center justify-center"
        >
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="your email"
            aria-label="your email"
            className="w-[13.5rem] px-2 py-1 text-sm font-semibold text-text-primary bg-surface-primary border border-brand-purple outline-none placeholder:font-normal placeholder:text-text-tertiary autofill:shadow-[inset_0_0_0_1000px_theme(colors.surface.primary)]"
          />
          <button
            type="submit"
            className="text-sm whitespace-nowrap px-2.5 py-1 bg-text-primary text-surface-primary cursor-pointer hover:opacity-90"
          >
            shutup & take my email!
          </button>
          <p
            className="basis-full min-h-[1.5em] m-0 text-sm text-text-tertiary"
            role="status"
          >
            {status}
          </p>
        </form>
      )}
    </section>
  );
}
