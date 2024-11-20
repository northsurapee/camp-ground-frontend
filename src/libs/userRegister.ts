"use server";

export default async function userRegister(
  data: RegisterRequest
) {
  const response = await fetch(
    "https://camp-ground-backend.vercel.app/api/v1/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return await response.json();
}
