"use server";

import { revalidateTag } from "next/cache";

export default async function updateBooking(
  data: BookingRequest,
  id: string,
  token: String
) {
  const response = await fetch(
    `https://camp-ground-backend.vercel.app/api/v1/bookings/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update booking");
  }

  revalidateTag("Bookings");

  return await response.json();
}