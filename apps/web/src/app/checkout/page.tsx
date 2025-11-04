import CheckoutWrapper from "@/components/checkout/CheckoutWrapper";
import Image from "next/image";

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
        <CheckoutWrapper />
      </div>
    </div>
  );
}
