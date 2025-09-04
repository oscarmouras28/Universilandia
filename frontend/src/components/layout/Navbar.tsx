import { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import NavLink from "./NavLink";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <header className="bg-[#EEE6E0] py-4 px-6 flex justify-between items-center relative">
      <Link to="/" className="flex-shrink-0">
        <img src={Logo} alt="Logo Universilandia" className="w-28 h-20" />
      </Link>

      {/* Hamburguesa para móvil */}
      <button
        className="lg:hidden text-3xl"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {openMenu ? <HiX /> : <HiMenu />}
      </button>

      {/* Links Desktop */}
      <nav
        className={`transition-all duration-300 ${
          openMenu ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-[#EEE6E0] flex flex-col items-center py-4 gap-4 lg:gap-6 lg:flex-row lg:static lg:w-auto lg:flex lg:items-center`}
      >
        <NavLink to="/" onClick={() => setOpenMenu(false)}>
          Inicio
        </NavLink>
        <NavLink to="/nosotros" onClick={() => setOpenMenu(false)}>
          Nosotros
        </NavLink>
        <NavLink to="/comunidad" onClick={() => setOpenMenu(false)}>
          Comunidad
        </NavLink>
        <NavLink to="/contacto" onClick={() => setOpenMenu(false)}>
          Contacto
        </NavLink>
        <NavLink to="/reseña" onClick={() => setOpenMenu(false)}>
          Reseñas de carreras
        </NavLink>
        <NavLink to="/blog" onClick={() => setOpenMenu(false)}>
          Blog
        </NavLink>

        {isAuthenticated ? (
          <button
            onClick={() => {
              handleLogout();
              setOpenMenu(false);
            }}
            className="bg-[#E0E6EE] text-xl font-medium text-black px-4 py-2 rounded-2xl shadow"
          >
            Cerrar Sesión
          </button>
        ) : (
          <NavLink
            to="/login"
            variant="button"
            onClick={() => setOpenMenu(false)}
          >
            Inicia Sesión
          </NavLink>
        )}
      </nav>
    </header>
  );
}
