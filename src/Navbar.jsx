import React, { useState } from "react";
import { Link } from "react-router-dom";
import close from "./assets/close.svg"; // Ubicación específica de close.svg
import logo from "./assets/logo3.jpg"; // Ubicación específica de logo.svg
import menu from "./assets/menu.svg";

export const navLinks = [
  {
    id: "",
    title: "Calculadora",
  },
  {
    id: "recetasguardadas",
    title: "Mis Recetas",
  },
  {
    id: "acerca-mi",
    title: "Acerca de mí",
  },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <nav className="w-full flex py-6 justify-between items-center navbar">
        <img src={logo} alt="logo" style={{ width: "200px", height: "auto" }} />

        {/* Desktop Navigation */}
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.id ? "text-white" : "text-dimWhite"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            >
              <Link
                to={`/${nav.id}`}
                className={`${
                  active === nav.id ? "text-white" : "text-dimWhite"
                }`}
                onClick={() => setActive(nav.id)}
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          {/* Sidebar */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => {
                    setActive(nav.id);
                    setToggle(false); // Cierra el menú desplegable en dispositivos móviles
                  }}
                >
                  <Link
                    to={`/${nav.id}`}
                    className={`${
                      active === nav.id ? "text-white" : "text-dimWhite"
                    }`}
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
