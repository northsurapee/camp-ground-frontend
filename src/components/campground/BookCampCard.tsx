import React from "react";
import Image from "next/image";
import { MapPin, Pencil, Phone, Plus } from "lucide-react";
import CircleButton from "../buttons/CircleButton";
import UpdateCampButton from "./UpdateCampButton";
import CreateBookingButton from "../booking/CreateBookingButton";

export default function BookCampCard({
  campground,
  role,
}: {
  campground: CampgroundResponse;
  role: string;
}) {
  return (
    <div className="h-[500px] w-[345px]">
      <div className="h-[370px] relative">
        {role === "admin" && (
          <div className="absolute top-3 right-3 z-40">
            <UpdateCampButton campground={campground} />
          </div>
        )}
        <Image
          src={campground.picture}
          alt={"camp"}
          fill={true}
          objectFit="cover"
          quality={100}
          className="rounded-t-[30px] z-0"
        />
      </div>
      <div className="h-[130px] rounded-b-[30px] bg-[#1E2F3C] bg-opacity-30 border border-[#1A2848] p-5 flex justify-between items-center">
        <div>
          <h2 className="text-white text-[26px] font-bold pb-1">
            {campground.name}
          </h2>
          <div className="flex justify-start items-center gap-3">
            <MapPin size={14} color="#ffffff" fill="#F36E4D" strokeWidth={1} />
            <p className="text-white text-[14px]">
              {campground.address}, {campground.district}, {campground.province}
            </p>
          </div>
          <div className="flex justify-start items-center gap-3">
            <Phone size={14} color="#ffffff" fill="#ffffff" strokeWidth={1} />
            <p className="text-white text-[14px]">{campground.tel}</p>
          </div>
        </div>
        {role && <CreateBookingButton campId={campground._id} />}
      </div>
    </div>
  );
}
