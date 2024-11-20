"use server";

import { revalidateTag } from "next/cache";

export default async function deleteBooking(id: string, token: String) {
  const response = await fetch(
    `https://camp-ground-backend.vercel.app/api/v1/bookings/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete booking");
  }

  revalidateTag("Bookings");

  return await response.json();
}
