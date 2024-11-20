"use server";

export default async function getCampgrounds() {
  const response = await fetch(
    "https://camp-ground-backend.vercel.app/api/v1/campgrounds",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["Campgrounds"] },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get campgrounds");
  }

  const data = await response.json();
  return data.data as CampgroundResponse[];
}
