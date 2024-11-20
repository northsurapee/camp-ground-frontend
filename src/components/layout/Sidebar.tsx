"use client";

import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { ShoppingCart, X } from "lucide-react";
import YourBookingCard from "../booking/YourBookingCard";
import Aurora from "./aurora";
import MyBookingList from "./bookingList";

export default function Sidebar({
  myBookings,
}: {
  myBookings: BookingResponse[];
}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Aurora>
      <div className="w-[600px] h-full p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-[40px] text-white font-bold pb-5">
            Your Booking ✨
          </h2>
          <button type="button" title="close" onClick={toggleDrawer(false)}>
            <X size={28} color="#ffffff" strokeWidth={1} />
          </button>
        </div>
        <MyBookingList myBookings={myBookings} />
      </div>
    </Aurora>
  );

  return (
    <div>
      <button
        type="button"
        title="cartButton"
        className="duration-200 p-3 hover:opacity-80 hover:rounded-full hover:bg-cyan-600 hover:bg-opacity-50 active:opacity-50"
        onClick={toggleDrawer(true)}
      >
        <ShoppingCart size={36} color="#ffffff" strokeWidth={1.2} />
      </button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
