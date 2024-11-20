"use server";

import { revalidateTag } from "next/cache";

export default async function createCampground(
  data: CampgroundRequest,
  token: String
) {
  const response = await fetch(
    "https://camp-ground-backend.vercel.app/api/v1/campgrounds",
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
    throw new Error("Failed to create campground");
  }

  revalidateTag("Campgrounds");

  return await response.json();
}
