import { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import NavLink from "./NavLink";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // o a donde tú quieras redirigir
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <header className="bg-[#EEE6E0] py-4 px-6 flex justify-between items-center">
      <a href="/" className="ml-10">
        <img src={Logo} alt="Logo Universilandia" className="w-28 h-20" />
      </a>
      <nav className="space-x-6 text-base">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/reseña">Reseñas de carreras</NavLink>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-[#E0E6EE] text-xl font-medium text-black px-4 py-2 rounded-2xl shadow"
          >
            Cerrar Sesión
          </button>
        ) : (
          <NavLink to="/login" variant="button">
            Inicia Sesión
          </NavLink>
        )}
      </nav>
    </header>
  );
}
