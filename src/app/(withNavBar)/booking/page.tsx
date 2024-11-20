import Aurora from "@/components/layout/aurora";
import React from "react";
import getBookings from "@/libs/getBookings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ManageBookingList from "@/components/booking/ManageBookingList";
import { redirect } from "next/navigation";

export default async function BookingPage() {
  const session = await getServerSession(authOptions);
  if (!session || session?.user.role != "admin") {
    redirect("/home");
  }
  const bookingList = await getBookings(session.user.token);
  bookingList.reverse();
  return (
    <div>
      <Aurora>
        <ManageBookingList bookingList={bookingList} />
      </Aurora>
    </div>
  );
}
