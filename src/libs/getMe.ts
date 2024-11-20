"use server";

export default async function getMe(token: string) {
  const response = await fetch(
    "https://camp-ground-backend.vercel.app/api/v1/auth/me",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get me");
  }

  return await response.json();
}
