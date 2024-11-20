"use server";

import { revalidateTag } from "next/cache";

export default async function deleteCampground(id: string, token: String) {
  const response = await fetch(
    `https://camp-ground-backend.vercel.app/api/v1/campgrounds/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete campground");
  }

  revalidateTag("Campgrounds");

  return await response.json();
}
