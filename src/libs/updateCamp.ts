"use server";

import { revalidateTag } from "next/cache";

export default async function updateCampground(
  data: CampgroundRequest,
  id: string,
  token: String
) {
  const response = await fetch(
    `https://camp-ground-backend.vercel.app/api/v1/campgrounds/${id}`,
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
    throw new Error("Failed to update campground");
  }

  revalidateTag("Campgrounds");

  return await response.json();
}
