import React from "react";
import Image from "next/image";
import { Calendar, MapPin, Pencil, Phone, Plus } from "lucide-react";
import CircleButton from "../buttons/CircleButton";
import { formatDate, timeAgo } from "@/libs/utils";
import UpdateBookingButton from "./UpdateBookingButton";

export default function ManageBookingCard({
  booking,
}: {
  booking: BookingResponse;
}) {
  return (
    <div className="h-[225px] w-full flex rounded-[30px] bg-[#1E2F3C] bg-opacity-20 border border-[#1A2848]">
      <div className="w-[300px] relative">
        <Image
          src={booking.campground.picture}
          alt={"camp"}
          fill={true}
          objectFit="cover"
          quality={100}
          className="rounded-[30px]"
        />
      </div>
      <div className="p-5 w-full flex justify-between">
        <div>
          <h2 className="text-white text-[20px] font-bold">
            ID: {booking._id}
          </h2>
          <p className="text-white text-[12px] border-b border-[#1A2848] pb-3 mb-3">
            User ID: {booking.user}
          </p>

          <h2 className="text-white text-[20px] font-bold">
            {booking.campground.name}
          </h2>
          <div className="flex justify-start items-center gap-1">
            <MapPin size={12} color="#ffffff" fill="#F36E4D" strokeWidth={1} />
            <p className="text-white text-[12px]">
              {booking.campground.address}, {booking.campground.district},{" "}
              {booking.campground.province}
            </p>
          </div>
          <div className="flex justify-start items-center gap-1">
            <Phone size={12} color="#ffffff" fill="#ffffff" strokeWidth={1} />
            <p className="text-white text-[12px]">{booking.campground.tel}</p>
          </div>
          <div className="flex w-min justify-start items-center gap-3 px-3 py-2 rounded-xl bg-[#4D6163] mt-2">
            <Calendar size={16} color="#ffffff" strokeWidth={2} />
            <p className="text-white font-semibold text-[14px] tracking-[0.1em] whitespace-nowrap">
              {formatDate(booking.bookingDate)} -{" "}
              {formatDate(booking.checkoutDate)}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <UpdateBookingButton booking={booking} />
          <p className="text-[12px] text-[#9AA2A3]">
            {timeAgo(booking.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
