"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import imgUrl from "../../assets/images/user_dp.webp";

interface ProfilePicProps {
  imageUrl?: string | null;
}

export const ProfilePic = ({ imageUrl }: ProfilePicProps) => {
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(imgUrl);

  useEffect(() => {
    if (imageUrl) {
      setImgSrc(imageUrl);
      setImgError(false);
    } else {
      setImgSrc(imgUrl);
    }
  }, [imageUrl]);

  const handleError = () => {
    if (imgSrc !== imgUrl) {
      setImgError(true);
      setImgSrc(imgUrl);
    }
  };

  const isExternal =
    imageUrl &&
    (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"));

  return (
    <div className="rounded-full overflow-hidden inline-block h-8 w-8 border border-ox-header">
      {isExternal && !imgError ? (
        <Image
          alt="User Profile"
          src={imageUrl}
          className="w-full h-full object-cover"
          width={32}
          height={32}
          unoptimized
          onError={handleError}
        />
      ) : (
      <Image
        alt="User Profile"
          src={imgSrc}
        className="w-full h-full object-cover"
          width={32}
          height={32}
          onError={handleError}
        />
      )}
    </div>
  );
};
