import React, { useState } from "react";
import "./styles.css";


function InputComponent({ onAñadirSabor }) {
  const [sabor, setSabor] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [Base, setBase] = useState("PG");

  const handleAñadirSabor = () => {
    if (sabor !== "" && porcentaje !== "") {
      const nuevoSabor = {
        nombre: sabor,
        porcentaje: porcentaje,
        Base: Base,
      };

      onAñadirSabor(nuevoSabor);

      // Limpiar los campos después de añadir el sabor
      setSabor("");
      setPorcentaje("");
      setBase("PG");
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mt-4 mb-2 underline neon-text text-red-700">Sabores</h2>
      <input
        type="text"
        placeholder="Sabor"
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/2"
        value={sabor}
        onChange={(e) => setSabor(e.target.value)}
      />
      <input
        type="number"
        placeholder="%"
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/4 mt-2 ml-2"
        value={porcentaje}
        onChange={(e) => setPorcentaje(e.target.value)}
      />
      <button
        onClick={handleAñadirSabor}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2 focus:outline-none focus:ring focus:ring-blue-300 ml-2"
      >
        Añadir
      </button>
      <div className="mt-2">
        <label className="mr-2">
          <input
            type="radio"
            value="PG"
            checked={Base === "PG"}
            onChange={() => setBase("PG")}
          />
          <span className="ml-1">PG</span>
        </label>
        <label>
          <input
            type="radio"
            value="VG"
            checked={Base === "VG"}
            onChange={() => setBase("VG")}
          />
          <span className="ml-1">VG</span>
        </label>
      </div>
    </div>
  );
}

export default InputComponent;
