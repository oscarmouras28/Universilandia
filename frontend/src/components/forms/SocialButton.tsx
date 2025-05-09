import { ReactNode } from "react";

interface SocialButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export default function SocialButton({
  icon,
  label,
  onClick,
}: SocialButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 border border-black rounded-full px-6 py-3 w-full"
    >
      <span className="w-6 h-6">{icon}</span>
      <span className="text-lg font-semibold">{label}</span>
    </button>
  );
}
