export default function PrimaryButton({
  type,
  children,
  onClick,
}: {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick ? onClick : undefined}
      className="px-8 h-[50px] bg-[#00C9E0] shadow-[5px_15px_40px_rgba(0,201,224,0.2)] rounded-[48px] font-bold text-[14px] tracking-[0.1em] uppercase text-white duration-200 
          hover:opacity-80
          active:opacity-50"
    >
      {children}
    </button>
  );
}
