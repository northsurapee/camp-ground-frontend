"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function UserButton({
  isAdmin,
  children,
  onClick,
}: {
  isAdmin?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  // Set the initial width based on the children text before hover
  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [children]); // Re-run when children change

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-[50px] px-7 border-2 border-white rounded-[48px] font-ibm-plex-sans-thai-looped font-bold text-[14px] leading-[26px] tracking-[0.1em] text-white duration-200
        hover:bg-[#F36E4D] hover:border-[#F36E4D]
        active:opacity-50"
      style={{ minWidth: buttonWidth }} // Keep the same width based on initial measurement
    >
      <Link href="/api/auth/signout">
        {isHovered ? (
          "LOGOUT"
        ) : isAdmin ? (
          <>
            <span className="text-[#00C9E0]">ADMIN </span>
            {children}
          </>
        ) : (
          children
        )}
      </Link>
    </button>
  );
}
