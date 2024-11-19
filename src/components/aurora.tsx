import Image from "next/image";

export default function Aurora() {
  return (
    <div className="relative -z-50 block h-[1400px] w-full">
      <Image
        src={"/images/aurora.svg"}
        alt={"aurora"}
        fill={true}
        objectFit="cover"
        quality={100}
      />

      {/* Top Gradient Transition - Only show on large screens */}
      <div
        className="absolute w-full h-0 min-[2500px]:h-[200px] left-0 top-0"
        style={{
          background:
            "linear-gradient(180deg, #011627 0%, rgba(1, 22, 39, 0) 100%)",
        }}
      />

      {/* Bottom Gradient Transition - Only show on large screens */}
      <div
        className="absolute w-full h-0 min-[2500px]:h-[200px] left-0 bottom-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(1, 22, 39, 0) 0%, #011627 76.64%, #011627 100%)",
        }}
      />
    </div>
  );
}
