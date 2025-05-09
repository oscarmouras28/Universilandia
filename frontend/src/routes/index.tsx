import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ReviewPage from "../pages/ReviewPage";
import CareerDetailPage from "../pages/CareerDetailPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: (
      <PublicOnlyRoute>
        <LoginPage />,
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/reseña",
    element: (
      <ProtectedRoute>
        <ReviewPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/carrera/:id",
    element: (
      <ProtectedRoute>
        <CareerDetailPage />
      </ProtectedRoute>
    ),
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
