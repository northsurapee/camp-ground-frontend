"use client";

import React from "react";
import YourBookingCard from "../booking/YourBookingCard";
import { useSession } from "next-auth/react";

export default function MyBookingList({
  myBookings,
}: {
  myBookings: BookingResponse[];
}) {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col gap-3">
      {myBookings.map((booking) => (
        <YourBookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}
