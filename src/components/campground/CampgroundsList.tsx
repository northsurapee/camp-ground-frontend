"use client";

import React, { useState } from "react";
import CreateCampButton from "./CreateCampButton";
import BookCampCard from "./BookCampCard";
import { useSession } from "next-auth/react";

export default function CampgroundsList({
  campgrounds,
}: {
  campgrounds: CampgroundResponse[];
}) {
  const { data: session } = useSession();
  const role = session?.user?.role || "";
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // Function to filter campgrounds based on the search keyword
  const filteredCampgrounds = campgrounds.filter((campground) => {
    const { name, address, district, province } = campground;
    const searchLowerCase = searchKeyword.toLowerCase();

    return (
      name.toLowerCase().includes(searchLowerCase) ||
      address.toLowerCase().includes(searchLowerCase) ||
      district.toLowerCase().includes(searchLowerCase) ||
      province.toLowerCase().includes(searchLowerCase)
    );
  });

  return (
    <div className="mt-[50px] w-3/4">
      <div className="flex justify-start items-center gap-8 pb-2 border-b-[0.5px] border-[#00C9E0]">
        <h1 className="text-white text-[60px] font-bold">Book Camp</h1>
        <input
          title="searchBar"
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="flex-grow h-[53px] px-6 py-4 border-2 rounded-full border-[#00C9E0] bg-transparent text-white text-[16px] font-semibold"
          placeholder="Filter by name, address, district, or province"
        />
        {role === "admin" && <CreateCampButton />}
      </div>

      {/* Check if there are any filtered campgrounds */}
      <div className="pt-3 pb-10 flex flex-wrap gap-[16px]">
        {filteredCampgrounds.length > 0 ? (
          filteredCampgrounds.map((campground) => (
            <BookCampCard key={campground.id} campground={campground} role={role} />
          ))
        ) : (
          <p className="text-white text-lg">No campgrounds found.</p>
        )}
      </div>
    </div>
  );
}
