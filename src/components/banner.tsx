import Image from "next/image";

export default function Banner() {
  return (
    <div className={`relative -z-50 block w-full h-screen`}>
      <Image
        src={"/images/nightSky.jpg"}
        alt={"nightSky"}
        fill={true}
        objectFit="cover"
        quality={100}
      />
      <div
        className="absolute w-full h-[377px] left-0 bottom-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(1, 22, 39, 0) 0%, #011627 76.64%, #011627 100%)",
        }}
      />
    </div>
  );
}
