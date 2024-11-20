"use server";

import { revalidateTag } from "next/cache";

export default async function createBooking(
  data: BookingRequest,
  campId: string,
  token: String
) {
  const response = await fetch(
    `https://camp-ground-backend.vercel.app/api/v1/campgrounds/${campId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  revalidateTag("Bookings");

  return await response.json();
}
