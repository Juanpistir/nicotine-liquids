import React, { useState } from "react";
import { Link } from "react-router-dom";
import closeIcon from "./assets/close.svg";
import logo from "./assets/logo5.png";
import menuIcon from "./assets/menu.svg";

const navLinks = [
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
    title: "Contáctame",
  },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const closeMenu = () => {
    setToggle(false);
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="logo" style={{ width: "200px", height: "auto" }} />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal mx-2 cursor-pointer text-[16px] ${
              active === nav.id ? "text-blue-300" : "text-blue-500"
            }`}
          >
            <Link
              to={`/${nav.id}`}
              className={active === nav.id ? "text-blue-300" : "text-blue-500"}
              onClick={() => setActive(nav.id)}
            >
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? closeIcon : menuIcon}
          alt="menu"
          className="w-8 h-8 object-contain cursor-pointer bg-blue-300"
          onClick={toggleMenu}
        />

        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 gradient-background absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.id ? "text-blue-300" : "text-blue-500"
                }`}
                onClick={() => {
                  setActive(nav.id);
                  closeMenu();
                }}
              >
                <Link
                  to={`/${nav.id}`}
                  className={active === nav.id ? "text-blue-300" : "text-blue-500"}
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
