"use server";

export default async function getCampgrounds(campId: string) {
  const response = await fetch(
    `https://camp-ground-backend.vercel.app/api/v1/campgrounds/${campId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["Campgrounds"] },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get campground");
  }

  return await response.json();
}
