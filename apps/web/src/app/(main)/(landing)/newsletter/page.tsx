import type { Metadata } from "next";
import Footer from "@/components/landing-sections/footer";
import { JackedAJNewsletterSignup } from "@/components/newsletter/JackedAJNewsletterSignup";

export const metadata: Metadata = {
  title: "Newsletter — Opensox AI",
  description:
    "Sign up for the jackedAJ newsletter. Short, handwritten msgs on tech, content, health and money.",
};

export default function NewsletterPage() {
  return (
    <main className="min-h-screen w-full bg-surface-primary text-text-primary">
      <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-8">
          newsletter
        </h1>
        <div className="space-y-4 text-lg text-text-secondary mb-12">
          <p>are you done reading the same ai slop shit everywhere?</p>
          <p>
            in case you wanna read smth a carbon-based human writes, you can
            subscribe to this newsletter.
          </p>
          <p>
            if you find me spamming ur inbox, posting ai crap and asking you to
            pay for my ai-powered calculator, kick me.
          </p>
        </div>
        <JackedAJNewsletterSignup source="opensox" />
      </div>
      <Footer />
    </main>
  );
}
