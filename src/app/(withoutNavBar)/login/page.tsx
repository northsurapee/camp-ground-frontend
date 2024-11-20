"use client";

import Aurora from "@/components/layout/aurora";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out both fields.");
      setLoading(false);
      return;
    }

    setError(null); // Reset error on submit

    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirect
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        console.log("Login successful");
        router.push("/home"); // Navigate to /home on success
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Aurora>
      <div className="h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1E2F3C] bg-opacity-30 border border-[#1A2848] p-8 rounded-[40px] shadow-lg w-[420px]"
        >
          <h2 className="text-left text-white text-[36px] font-semibold mb-4">
            Login ✨
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border-2 rounded-xl border-[#00C9E0] bg-transparent text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border-2 rounded-xl border-[#00C9E0] bg-transparent text-white"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="flex justify-between items-center mt-8">
            <div className="flex text-[14px] gap-1">
              <p className="text-white">Don’t have an account?</p>
              <Link href="/register" className="text-[#00C9E0] underline">
                Register here
              </Link>
            </div>
            <PrimaryButton type="submit">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                "LOGIN"
              )}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </Aurora>
  );
}
