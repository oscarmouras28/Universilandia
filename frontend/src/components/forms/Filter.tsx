import { ReactNode } from "react";

interface FilterProps {
  children: ReactNode;
}

export default function Filter({ children }: FilterProps) {
  return (
    <button className="bg-[#D9D9D9] px-6 py-2 rounded-full font-semibold shadow text-sm min-w-28">
      {children}
    </button>
  );
}
