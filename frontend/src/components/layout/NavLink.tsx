// src/components/common/NavLink.tsx
import { ReactNode } from "react";
import { NavLink as RRNavLink } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: ReactNode;
  variant?: "default" | "button";
  onClick?: () => void;
}

export default function NavLink({
  to,
  children,
  variant = "default",
  onClick,
}: NavLinkProps) {
  const base =
    variant === "button"
      ? "bg-[#E0E6EE] text-xl font-medium text-black px-4 py-2 rounded-2xl shadow"
      : "text-xl font-semibold hover:text-blue-600";

  return (
    <RRNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${base} ${
          isActive && variant !== "button" ? "underline underline-offset-4" : ""
        }`
      }
      end={to === "/"} // exacto solo en "/"
    >
      {children}
    </RRNavLink>
  );
}
