"use client";


import Navbar from "../landing-sections/navbar";

export default function BlogHeader() {
  return (
    <header className="w-full border-b border-[#252525] bg-[#101010]">
      <div className="max-w-[2000px] mx-auto px-6 py-4 flex items-center justify-between">
       <Navbar/>
      </div>
    </header>
  );
}

