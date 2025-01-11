import React, { useState } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../assets/close.svg";
import logo from "../../assets/logo5.png";
import menuIcon from "../../assets/menu.svg";

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

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const closeMenu = () => {
    setToggle(false);
  };

  return (
    <nav className="w-full flex py-4 justify-between items-center bg-white shadow-md fixed top-0 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <img src={logo} alt="logo" className="w-[150px] h-auto" />

        <ul className="list-none sm:flex hidden justify-end items-center flex-1 gap-8">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`font-medium cursor-pointer text-[16px] hover:text-blue-600 transition-colors duration-200
                ${active === nav.title ? "text-blue-600" : "text-gray-700"}`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={`/${nav.id}`}>{nav.title}</Link>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? closeIcon : menuIcon}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={toggleMenu}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl shadow-lg sidebar`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[16px] mb-4 hover:text-blue-600 transition-colors duration-200
                    ${active === nav.title ? "text-blue-600" : "text-gray-700"}`}
                  onClick={() => {
                    setActive(nav.title);
                    closeMenu();
                  }}
                >
                  <Link to={`/${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
