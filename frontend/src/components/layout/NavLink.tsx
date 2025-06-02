import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

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
}: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const variants = {
    default: `text-base font-semibold text-xl hover:text-blue-600 ${isActive ? "underline underline-offset-4" : ""}`,
    button:
      "bg-[#E0E6EE] text-xl font-medium text-black px-4 py-2 rounded-2xl shadow",
  };

  return (
    <Link to={to} className={`${variants[variant]}`}>
      {children}
    </Link>
  );
}
