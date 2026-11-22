import Image from "next/image";
import type { ReactNode } from "react";

export default function CheckoutPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center relative">
      <Image
        src="/assets/bgmain.svg"
        alt="background"
        fill
        className="object-cover max-md:object-top w-full h-full absolute -z-10 opacity-90"
        priority
      />
      <div className="z-10">{children}</div>
    </div>
  );
}
