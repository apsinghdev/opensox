import React, { Suspense } from "react";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

const CheckoutConfirmation = React.lazy(() => import("@/components/checkout/checkout-confirmation"));

export default function Checkout() {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center relative">
      <Image
        src="/assets/bgmain.svg"
        alt="background"
        fill
        className="object-cover max-md:object-top w-full h-full absolute -z-10 opacity-90"
        priority
      />
      <div className=" z-10">
        <Suspense
              fallback={
                <div className="py-20 text-center text-lg text-neutral-400">
                  <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-72" />
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-4 w-56" />
                  </div>
                </div>
              }
            >
          <CheckoutConfirmation></CheckoutConfirmation>
        </Suspense>
      </div>
    </div>
  );
}
