import { Navigate } from "react-router-dom";

export default function PublicOnlyRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" replace /> : children;
}
