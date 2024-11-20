import Image from "next/image";
import { ReactNode } from "react";

export default function Banner() {
  return (
    <div className="relative -z-50 block w-full h-screen">
      <Image
        src={"/images/nightSky.jpg"}
        alt={"nightSky"}
        fill={true}
        objectFit="cover"
        quality={100}
      />
      <div
        className="absolute w-full h-[200px] left-0 bottom-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(1, 22, 39, 0) 0%, #011627 76.64%, #011627 100%)",
        }}
      />
      {/* Render children on top of the banner */}
      <div className="absolute top-1/4 w-full flex flex-col items-center">
        <div className="text-[145px] leading-[160px]">🏕️</div>
        <h1 className="text-[100px] text-white font-bold leading-[120px] animate-pulse">
          CamP Ground
        </h1>
        <p className="text-[16px] text-white font-semibold animate-pulse">
          WE GOT CAMPS FOR THE CAMPSTER IN YOU
        </p>
      </div>
    </div>
  );
}
