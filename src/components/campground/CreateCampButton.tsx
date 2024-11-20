"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import createCampground from "@/libs/createCamp";
import { useSession } from "next-auth/react";

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
  name: "",
  address: "",
  district: "",
  province: "",
  postalcode: "",
  tel: "",
  picture: "",
};

export default function CreateCampButton() {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<CampgroundRequest>(emptyForm);

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
      setLoading(false);
      setError("Please fill out all fields.");
      return;
    }

    setError(null);
    console.log("Creating Camp with:", form);

    try {
      const response = await createCampground(form, token);
      console.log("Campground created successfully:", response);
      setForm(emptyForm);
      handleClose();
    } catch (error) {
      console.error("Failed to create campground:", error);
      setError("Failed to create campground. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <PrimaryButton onClick={handleOpen}>ADD CAMP</PrimaryButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-camp-title"
        aria-describedby="create-camp-description"
      >
        <Box sx={style}>
          <h2 className="text-left text-white text-[36px] font-semibold mb-4">
            Create Camp ✨
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
              <PrimaryButton type="submit">
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  "CREATE"
                )}
              </PrimaryButton>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
