"use server";

import getCampground from "./getCampground";

export default async function getMyBookings(token: string, userId: string) {
  const response = await fetch(
    "https://camp-ground-backend.vercel.app/api/v1/bookings",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["Bookings"] },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get bookings");
  }

  const bookings = await response.json();

  // Fetch campground details for each booking and set the campground data
  const updatedBookings = await Promise.all(
    bookings.data.map(async (booking: any) => {
      if (booking.user == userId) {
        const campground = await getCampground(booking.campground._id);
        booking.campground = campground.data; // Update the campground field
        return booking;
      }
    })
  );

  return updatedBookings as BookingResponse[];
}
