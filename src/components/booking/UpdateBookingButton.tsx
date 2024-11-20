"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import updateBooking from "@/libs/updateBooking";
import { useSession } from "next-auth/react";
import CircleButton from "../buttons/CircleButton";
import { Pencil, Plus } from "lucide-react";
import DeleteButton from "../buttons/DangerButton";
import deleteBooking from "@/libs/deleteBooking";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#1E2F3C",
  border: "1px solid #1A2848",
  borderRadius: "40px",
  boxShadow: 24,
  p: 4,
};

export default function UpdateBookingButton({
  booking,
}: {
  booking: BookingResponse;
}) {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<BookingRequest>({
    bookingDate: new Date(booking.bookingDate).toISOString().split("T")[0],
    checkoutDate: new Date(booking.checkoutDate).toISOString().split("T")[0],
  });

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  const handleOpen = () => {
    setDeleteLoading(false);
    setLoading(false);
    setOpen(true);
  };
  const handleClose = () => {
    setDeleteLoading(false);
    setLoading(false);
    setOpen(false);
  };

  // Handle date input change to convert date to string format before saving
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Convert date to string format (yyyy-mm-dd)
    const dateString = new Date(value).toISOString().split("T")[0];
    setForm({ ...form, [name]: dateString });
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    const token = session?.user?.token;
    if (!token) return;

    try {
      const response = await deleteBooking(booking._id, token);
      console.log("Booking deleted successfully:", response);
      handleClose();
    } catch (error) {
      console.error("Failed to delete booking:", error);
      setError("Failed to delete booking. Please try again.");
      setDeleteLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    const token = session?.user?.token;
    if (!token) return;
    e.preventDefault();

    const { bookingDate, checkoutDate } = form;

    // Ensure both dates are provided
    if (!bookingDate || !checkoutDate) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    // Validate that bookingDate is today or in the future
    const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format
    if (bookingDate < today) {
      setError("Booking date must be today or a future date.");
      setLoading(false);
      return;
    }

    // Validate that bookingDate is before checkoutDate
    if (bookingDate >= checkoutDate) {
      setError(
        "Booking date must be before the checkout date and cannot be the same day."
      );
      setLoading(false);
      return;
    }

    // Validate that the booking period does not exceed 3 nights
    const startDate = new Date(bookingDate);
    const endDate = new Date(checkoutDate);
    const diffInDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    if (diffInDays > 3) {
      setError("You can only book for a maximum of 3 nights.");
      setLoading(false);
      return;
    }

    setError(null); // Clear any previous errors
    console.log("Updating Booking with:", form);

    try {
      const response = await updateBooking(form, booking._id, token);
      console.log("Booking updated successfully:", response);
      handleClose();
    } catch (error) {
      console.error("Failed to update booking:", error);
      setError("Failed to update booking. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <CircleButton size="medium" onClick={handleOpen}>
        <Pencil size={20} color="#ffffff" strokeWidth={2} />
      </CircleButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="update-booking-title"
        aria-describedby="update-booking-description"
      >
        <Box sx={style}>
          <h2 className="text-left text-white text-[36px] font-semibold mb-4">
            Update Booking ✨
          </h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="bookingDate"
                className="block text-sm font-medium text-white"
              >
                Booking Date
              </label>
              <input
                id="bookingDate"
                name="bookingDate"
                type="date"
                value={form.bookingDate}
                onChange={handleDateChange} // Use the date change handler
                className="mt-1 p-2 w-full border-2 rounded-xl border-[#00C9E0] bg-transparent text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="checkoutDate"
                className="block text-sm font-medium text-white"
              >
                Checkout Date
              </label>
              <input
                id="checkoutDate"
                name="checkoutDate"
                type="date"
                value={form.checkoutDate}
                onChange={handleDateChange} // Use the date change handler
                className="mt-1 p-2 w-full border-2 rounded-xl border-[#00C9E0] bg-transparent text-white"
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div className="flex justify-end mt-8 gap-5">
              <SecondaryButton onClick={handleClose}>CANCEL</SecondaryButton>
              <DeleteButton onClick={handleDelete}>
                {deleteLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  "DELETE"
                )}
              </DeleteButton>
              <PrimaryButton type="submit">
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  "UPDATE"
                )}
              </PrimaryButton>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
