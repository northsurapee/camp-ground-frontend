import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import UserButton from "../buttons/UserButton";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Sidebar from "./Sidebar";
import getMyBookings from "@/libs/getMyBookings";

export default async function NavigationBar() {
  const session = await getServerSession(authOptions);
  const myBookings = session
    ? await getMyBookings(session.user.token, session.user._id)
    : [];
  myBookings.reverse();

  return (
    <div className="h-[120px] fixed top-0 left-0 right-0 z-30 px-16 bg-transparent flex justify-between items-center">
      <div className="flex gap-8 justify-center items-center">
        {session?.user?.role === "admin" && (
          <>
            <Link
              href="/home"
              className="text-white text-[14px] font-semibold tracking-[0.1em] hover:opacity-80 active:opacity-50"
            >
              Home
            </Link>
            <Link
              href="/booking"
              className="text-white text-[14px] font-semibold tracking-[0.1em] hover:opacity-80 active:opacity-50"
            >
              Booking
            </Link>
          </>
        )}
      </div>
      <div className="flex gap-4 justify-center items-center">
        {session ? (
          <>
            <UserButton isAdmin={session.user?.role == "admin"}>
              {session.user?.name || "User"}
            </UserButton>
            <Sidebar myBookings={myBookings} />
          </>
        ) : (
          <Link href="/login">
            <PrimaryButton>Login</PrimaryButton>
          </Link>
        )}
      </div>
    </div>
  );
}
