export default function DeleteButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick ? onClick : undefined}
      className="px-8 h-[50px] bg-[#F36E4D] rounded-[48px] font-bold text-[14px] tracking-[0.1em] uppercase text-white duration-200 
            hover:opacity-80
            active:opacity-50"
    >
      {children}
    </button>
  );
}
