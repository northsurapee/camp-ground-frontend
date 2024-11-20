"use client";

import React, { useState } from "react";
import ManageBookingCard from "./ManageBookingCard";
import { formatDate } from "@/libs/utils";

export default function ManageBookingList({
  bookingList,
}: {
  bookingList: BookingResponse[];
}) {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // Function to filter bookings based on the search keyword
  const filteredBookings = bookingList.filter((booking) => {
    const searchLowerCase = searchKeyword.toLowerCase();
    const formattedBookingDate = formatDate(booking.bookingDate);
    const formattedCheckoutDate = formatDate(booking.checkoutDate);

    return (
      booking._id.toLowerCase().includes(searchLowerCase) ||
      booking.user.toLowerCase().includes(searchLowerCase) ||
      formattedBookingDate.toLowerCase().includes(searchLowerCase) ||
      formattedCheckoutDate.toLowerCase().includes(searchLowerCase) ||
      booking.campground.name.toLowerCase().includes(searchLowerCase) ||
      booking.campground.address.toLowerCase().includes(searchLowerCase) ||
      booking.campground.district.toLowerCase().includes(searchLowerCase) ||
      booking.campground.province.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <div className="mt-[150px] w-3/4">
      <div className="flex justify-start items-center gap-8 pb-2 border-b-[0.5px] border-[#00C9E0]">
        <h1 className="text-white text-[60px] font-bold">Manage Booking</h1>
        <input
          title="searchBar"
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="flex-grow h-[53px] px-6 py-4 border-2 rounded-full border-[#00C9E0] bg-transparent text-white text-[16px] font-semibold"
          placeholder="Search by booking ID, user, booking date, checkout date, or campground details"
        />
      </div>
      <div className="pt-3 pb-10 flex flex-wrap gap-[16px]">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <ManageBookingCard key={booking._id} booking={booking} />
          ))
        ) : (
          <p className="text-white text-lg">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
