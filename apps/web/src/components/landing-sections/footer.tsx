"use client";
import React from "react";
import { Twitter, Email, Discord, Youtube, Github } from "../icons/icons";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const handleEmailClick = () => {
    const emailSubject = encodeURIComponent("[Inquiry about Opensox AI]");
    const emailBody = encodeURIComponent("Heyyo,\n\nwanna chat?");
    const mailtoLink = `mailto:hi@opensox.ai?subject=${emailSubject}&body=${emailBody}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <div
      id="Contact"
      className="border-x lg:border-x-2 border-t lg:border-t-2 border-[#252525] mt-2 mx-auto w-[98%] px-4 lg:px-10 pt-8 lg:pt-16 pb-4 lg:pb-8"
    >
      {/* Bottom Section */}
      <div className="pt-8 border-t border-[#252525] space-y-8">
        {/* Top Row - Profile Picture and Navigation */}
        <div className="relative flex items-start justify-between gap-6 lg:gap-0">
          {/* Profile Picture - Left */}
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-white text-4xl lg:text-5xl font-medium tracking-tight">
                Opensox AI
              </h4>
              <p className="text-[#b1b1b1] text-base lg:text-lg tracking-tight mt-1">
                Search. Find. Contribute. Win
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/ajeetunc.webp"
                alt="ajeetunc"
                width={32}
                height={32}
                className="rounded-full object-cover object-[center_20%] aspect-square w-8 h-8"
              />
              <span className="text-[#b1b1b1] text-xs font-mono">
                Cooked by ajeetunc
              </span>
            </div>
          </div>

          {/* Grid Layout - Right */}
          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            {/* Sitemap Column */}
            <div>
              <h3 className="text-white text-sm lg:text-base font-medium mb-2">
                Platform
              </h3>
              <div className="flex flex-col gap-2">
                {/* <Link
                  href="/dashboard/home"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs"
                >
                  Features
                </Link> */}
                <Link
                  href="/pricing"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs"
                >
                  Pricing
                </Link>
                <Link
                  href="/blogs"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs"
                >
                  Blogs
                </Link>
                {/* <Link
                  href="#"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs"
                >
                  FAQ
                </Link> */}
              </div>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-white text-sm lg:text-base font-medium mb-2">
                Legal
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/contact"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs"
                >
                  Contact
                </Link>
                <Link
                  href="/legal/privacy"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/legal/terms"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs"
                >
                  Terms and Conditions
                </Link>
                <Link
                  href="/legal/cancellation-and-refund"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs"
                >
                  Cancellation and Refunds
                </Link>
                <Link
                  href="/legal/shipping-and-exchange"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs"
                >
                  Shipping and Exchange
                </Link>
              </div>
            </div>

            {/* Socials Column */}
            <div>
              <h3 className="text-white text-sm lg:text-base font-medium mb-2">
                Socials
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="https://x.com/opensoxai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs flex items-center gap-1.5"
                >
                  <span className="w-3.5">
                    <Twitter />
                  </span>
                  Twitter
                </Link>
                <Link
                  href="https://github.com/apsinghdev/opensox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs flex items-center gap-1.5"
                >
                  <span className="w-3.5">
                    <Github />
                  </span>
                  GitHub
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UC7QV7uSxlbha-bNPaev5MeQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs flex items-center gap-1.5"
                >
                  <span className="w-3.5">
                    <Youtube />
                  </span>
                  YouTube
                </Link>
                <Link
                  href="https://discord.gg/zbHzgMNBrm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs flex items-center gap-1.5"
                >
                  <span className="w-3.5">
                    <Discord />
                  </span>
                  Discord
                </Link>
                <button
                  onClick={handleEmailClick}
                  className="text-[#b1b1b1] hover:text-white transition-colors text-xs flex items-center gap-1.5 text-left"
                >
                  <span className="w-3.5">
                    <Email />
                  </span>
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Copyright */}
        <div className="text-center">
          <p className="font-mono text-xs lg:text-sm text-[#b1b1b1]">
            © {new Date().getFullYear()} Opensox AI. All rights reserved.
          </p>
          <p className="font-mono text-xs lg:text-xs italic text-[#b1b1b1] mt-2">
            Building 21st century open-source infrastructure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
