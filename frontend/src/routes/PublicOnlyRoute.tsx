// PublicOnlyRoute.tsx
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PublicOnlyRoute({ children }: Props) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
