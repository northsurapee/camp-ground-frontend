"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import createBooking from "@/libs/createBooking";
import { useSession } from "next-auth/react";
import CircleButton from "../buttons/CircleButton";
import { Plus } from "lucide-react";

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

const emptyForm = {
  bookingDate: "",
  checkoutDate: "",
};

export default function CreateBookingButton({ campId }: { campId: string }) {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<BookingRequest>(emptyForm);

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleOpen = () => {
    setLoading(false);
    setOpen(true);
  };
  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle date input change to convert date to string format before saving
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Convert date to string format (yyyy-mm-dd)
    const dateString = new Date(value).toISOString().split("T")[0];
    setForm({ ...form, [name]: dateString });
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
      setLoading(false);
      setError(
        "Booking date must be before the checkout date and cannot be the same day."
      );
      return;
    }

    // Validate that the booking period does not exceed 3 nights
    const startDate = new Date(bookingDate);
    const endDate = new Date(checkoutDate);
    const diffInDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    if (diffInDays > 3) {
      setLoading(false);
      setError("You can only book for a maximum of 3 nights.");
      return;
    }

    setError(null); // Clear any previous errors
    console.log("Creating Booking with:", form);

    try {
      const response = await createBooking(form, campId, token);
      console.log("Booking created successfully:", response);
      setForm(emptyForm);
      handleClose();
    } catch (error) {
      console.error("Failed to create booking:", error);
      setError("Failed to create booking. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <CircleButton size="big" onClick={handleOpen}>
        <Plus size={30} color="#ffffff" strokeWidth={2} />
      </CircleButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-booking-title"
        aria-describedby="create-booking-description"
      >
        <Box sx={style}>
          <h2 className="text-left text-white text-[36px] font-semibold mb-4">
            Book a Camp ✨
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
              <PrimaryButton type="submit">
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  "BOOK"
                )}
              </PrimaryButton>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
