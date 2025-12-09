import Navbar from "@/components/landing-sections/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
};

export default Layout;
