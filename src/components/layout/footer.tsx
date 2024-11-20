import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="pb-24 flex flex-col gap-6 justify-center items-center">
      <div className="text-[100px] leading-[100px]">🏕️</div>
      <div className="flex gap-3 text-[20px] text-white">
        <p>
          <span className="font-bold">northsurapee.</span> จุฬาลงกรณ์มหาวิทยาลัย
          | Open Source on
        </p>
        <Image
          src={"/icons/github.svg"}
          alt={"github"}
          height={24}
          width={24}
        />
      </div>
      <p className="text-[16px] text-[#F8FAFC] text-opacity-[0.6]">
        Copyright © Camp Ground 2024. All right reserved
      </p>
    </div>
  );
}
