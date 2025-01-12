import React, { useState } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../assets/close.svg";
import logo from "../../assets/logo5.png";
import menuIcon from "../../assets/menu.svg";
import { useAuth } from '@/hooks/useAuth';

const navLinks = [
  {
    id: "",
    title: "Calculadora",
  },
  {
    id: "recetas",
    title: "Mis Recetas",
  },
  {
    id: "contacto",
    title: "Contáctame",
  },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const closeMenu = () => {
    setToggle(false);
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 hidden sm:inline">{user.email}</span>
          <button
            onClick={() => signOut()}
            className="font-heading font-medium text-[16px] text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            Cerrar Sesión
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="font-heading font-medium text-[16px] text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          className="font-heading font-medium text-[16px] text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Registrarse
        </Link>
      </div>
    );
  };

  return (
    <nav className="w-full flex py-4 justify-between items-center bg-white shadow-md fixed top-0 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <img src={logo} alt="logo" className="w-[150px] h-auto" />

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center justify-end flex-1 gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`font-heading font-medium cursor-pointer text-[16px] hover:text-blue-600 transition-colors duration-200
                  ${active === nav.title ? "text-blue-600" : "text-gray-700"}`}
                onClick={() => setActive(nav.title)}
              >
                <Link to={nav.id ? `/${nav.id}` : ""}>{nav.title}</Link>
              </li>
            ))}
          </ul>
          {renderAuthButtons()}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex items-center">
          <img
            src={toggle ? closeIcon : menuIcon}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={toggleMenu}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-xl shadow-lg`}
          >
            <div className="flex flex-col items-start gap-4">
              <ul className="flex flex-col gap-4 mb-4 w-full">
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`font-heading font-medium cursor-pointer text-[16px] hover:text-blue-600 transition-colors duration-200 w-full
                      ${active === nav.title ? "text-blue-600" : "text-gray-700"}`}
                    onClick={() => {
                      setActive(nav.title);
                      closeMenu();
                    }}
                  >
                    <Link to={nav.id ? `/${nav.id}` : ""}>{nav.title}</Link>
                  </li>
                ))}
              </ul>
              {user ? (
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-sm text-gray-700">{user.email}</span>
                  <button
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}
                    className="font-heading font-medium text-[16px] text-red-600 hover:text-red-800 transition-colors duration-200 text-left"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 w-full">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="font-heading font-medium text-[16px] text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="font-heading font-medium text-[16px] text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
