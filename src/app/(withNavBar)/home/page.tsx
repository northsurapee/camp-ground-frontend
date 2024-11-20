import Aurora from "@/components/layout/aurora";
import Banner from "@/components/layout/banner";
import React from "react";
import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundsList from "@/components/campground/CampgroundsList";

export default async function HomePage() {
  const campgrounds = await getCampgrounds();
  return (
    <div>
      <Banner />
      <Aurora>
        <CampgroundsList campgrounds={campgrounds} />
      </Aurora>
    </div>
  );
}
