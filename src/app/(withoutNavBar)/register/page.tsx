"use client";

import Aurora from "@/components/layout/aurora";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Link from "next/link";
import React, { useState } from "react";
import userRegister from "@/libs/userRegister";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (!name || !email || !tel || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    setError(null);

    try {
      const response = await userRegister({ name, email, tel, password });
      router.push("/login");
    } catch (err) {
      setError(err as string); // Handle error message
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
            Register ✨
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border-2 rounded-xl border-[#00C9E0] bg-transparent text-white"
              required
            />
          </div>

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
              htmlFor="tel"
              className="block text-sm font-medium text-white"
            >
              Tel
            </label>
            <input
              id="tel"
              type="tel"
              placeholder="Enter your phone number"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
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

          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full border-2 rounded-xl border-[#00C9E0] bg-transparent text-white"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="flex justify-between items-center mt-8">
            <div className="flex flex-wrap text-[14px] gap-1">
              <p className="text-white">Already have an account?</p>
              <Link href="/login" className="text-[#00C9E0] underline">
                Login here
              </Link>
            </div>
            <PrimaryButton type="submit">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                "REGISTER"
              )}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </Aurora>
  );
}
