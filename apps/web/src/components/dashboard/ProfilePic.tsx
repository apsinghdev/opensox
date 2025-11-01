"use client";

import Image from "next/image";
import imgUrl from "../../assets/images/user_dp.png";
import { useSession } from "next-auth/react";
export const ProfilePic = () => {
    const { data: session } = useSession();
  return (
    <div className="rounded-full overflow-hidden inline-block h-8 w-8 border">
      <Image
        alt="User Profile"
        src={session?.user?.image||imgUrl}
        className="w-full h-full object-cover"
        width={10}
        height={10}
      ></Image>
    </div>
  );
};
