"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import updateCampground from "@/libs/updateCamp";
import { useSession } from "next-auth/react";
import CircleButton from "../buttons/CircleButton";
import { Pencil } from "lucide-react";
import DeleteButton from "../buttons/DangerButton";
import deleteCamp from "@/libs/deleteCamp";

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

export default function UpdateCampButton({
  campground,
}: {
  campground: CampgroundResponse;
}) {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<CampgroundRequest>({
    name: campground.name,
    address: campground.address,
    district: campground.district,
    province: campground.province,
    postalcode: campground.postalcode,
    tel: campground.tel,
    picture: campground.picture,
  });

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false);

  const handleOpen = () => {
    setLoading(false);
    setDeleteLoading(false);
    setOpen(true);
  };
  const handleClose = () => {
    setLoading(false);
    setDeleteLoading(false);
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    const token = session?.user?.token;
    if (!token) return;

    try {
      const response = await deleteCamp(campground._id, token);
      console.log("Campground deleted successfully:", response);
      handleClose();
    } catch (error) {
      console.error("Failed to delete campground:", error);
      setError("Failed to delete campground. Please try again.");
      setDeleteLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    const token = session?.user?.token;
    if (!token) return;
    e.preventDefault();

    const { name, address, district, province, postalcode, tel, picture } =
      form;

    if (
      !name ||
      !address ||
      !district ||
      !province ||
      !postalcode ||
      !tel ||
      !picture
    ) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    setError(null);
    console.log("Creating Camp with:", form);

    try {
      const response = await updateCampground(form, campground._id, token);
      console.log("Campground update successfully:", response);
      handleClose();
    } catch (error) {
      console.error("Failed to update campground:", error);
      setError("Failed to update campground. Please try again.");
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
        aria-labelledby="update-camp-title"
        aria-describedby="update-camp-description"
      >
        <Box sx={style}>
          <h2 className="text-left text-white text-[36px] font-semibold mb-4">
            Update Camp ✨
          </h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex gap-8">
              <div className="flex-grow">
                {["name", "address", "district", "province"].map(
                  (field, idx) => (
                    <div key={idx} className="mb-4">
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium text-white capitalize"
                      >
                        {field === "picture" ? "Picture URL" : field}
                      </label>
                      <input
                        id={field}
                        name={field}
                        type="text"
                        placeholder={`Enter ${
                          field === "picture" ? "Picture URL" : field
                        }`}
                        value={form[field as keyof typeof form]}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border-2 rounded-xl border-[#00C9E0] bg-transparent text-white"
                        required
                      />
                    </div>
                  )
                )}
              </div>
              <div className="flex-grow">
                {["postalcode", "tel", "picture"].map((field, idx) => (
                  <div key={idx} className="mb-4">
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-white capitalize"
                    >
                      {field === "picture" ? "Picture URL" : field}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type="text"
                      placeholder={`Enter ${
                        field === "picture" ? "Picture URL" : field
                      }`}
                      value={form[field as keyof typeof form]}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border-2 rounded-xl border-[#00C9E0] bg-transparent text-white"
                      required
                    />
                  </div>
                ))}
              </div>
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
