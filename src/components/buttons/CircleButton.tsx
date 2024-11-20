export default function CircleButton({
  size,
  children,
  onClick,
}: {
  size: String;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (size === "medium") {
    return (
      <button
        onClick={onClick ? onClick : undefined}
        className={`flex justify-center items-center h-[40px] w-[40px] bg-[#00C9E0] shadow-[5px_15px_40px_rgba(0,201,224,0.2)] rounded-full font-bold text-[14px] tracking-[0.1em] uppercase text-white duration-200 
              hover:opacity-80
              active:opacity-50`}
      >
        {children}
      </button>
    );
  } else if (size === "big") {
    return (
      <button
        onClick={onClick ? onClick : undefined}
        className={`flex justify-center items-center h-[50px] w-[50px] bg-[#00C9E0] shadow-[5px_15px_40px_rgba(0,201,224,0.2)] rounded-full font-bold text-[14px] tracking-[0.1em] uppercase text-white duration-200 
              hover:opacity-80
              active:opacity-50`}
      >
        {children}
      </button>
    );
  }
}
