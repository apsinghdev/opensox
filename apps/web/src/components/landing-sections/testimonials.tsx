"use client";

import React from "react";

import Header from "../ui/header";
import TestimonialGrid from "../ui/testimonial-grid";
import { trpc } from "@/lib/trpc";

const Testimonials = () => {
  const { data } = trpc.testimonial.getAll.useQuery();

  const testimonials = (data ?? []).map(
    (t: {
      id: string;
      content: string;
      name: string;
      avatar: string;
      socialLink: string | null;
    }) => ({
      id: t.id,
      content: t.content,
      name: t.name,
      avatar: t.avatar,
      socialLink: t.socialLink,
    })
  );

  return (
    <div className="flex flex-col border-b border-border">
      <Header title="Testimonials" />
      <div className="h-[500px] lg:h-[750px] px-[30px] lg:px-[50px] relative">
        <div
          style={{
            height: "100%",
            backgroundImage:
              "repeating-linear-gradient(315deg, #252525 0, #252525 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
            backgroundAttachment: "fixed",
          }}
          className="w-[30px] lg:w-[50px] absolute left-0 top-0 border-r border-border"
        />
        <div
          style={{
            height: "100%",
            backgroundImage:
              "repeating-linear-gradient(315deg, #252525 0, #252525 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
            backgroundAttachment: "fixed",
          }}
          className="w-[30px] lg:w-[50px] absolute right-0 top-0 border-l border-border"
        />
        <TestimonialGrid
          testimonials={testimonials}
          speed="slow"
          className="h-full"
        />
      </div>
    </div>
  );
};

export default Testimonials;
