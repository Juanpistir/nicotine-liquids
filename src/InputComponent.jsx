import React, { useState } from "react";
import "./styles.css";
import ModalMensaje from "./ModalMensaje";

function InputComponent({ onAñadirSabor }) {
  const [sabor, setSabor] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [Base, setBase] = useState("PG");
  const [mostrarCrearAromaModal, setMostrarCrearAromaModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");

  function generarIdUnico() {
    return new Date().getTime(); // Usamos la marca de tiempo actual como ID
  }

  const handleAñadirSabor = () => {
    if (sabor !== "" && porcentaje !== "") {
      const nuevoSabor = {
        id: generarIdUnico(),
        nombre: sabor,
        porcentaje: porcentaje,
        Base: Base,
      };

      onAñadirSabor(nuevoSabor);

      // Limpiar los campos después de añadir el sabor
      setSabor("");
      setPorcentaje("");
      setBase("PG");
      setMensajeModal("Aroma Agregado");
      setMostrarCrearAromaModal(true);
    }
  };

  return (
    <>
      <div className="mb-4 mx-2 grid grid-cols-1">
        <div className="mx-4">
          <h2 className="text-center text-4xl mb-2 font-bold text-blue-500  tracking-tight">
            Aromas
          </h2>
          <div className="flex justify-around flex-row">
            <input
              type="text"
              placeholder="Sabor"
              className="border border-blue-500 bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-600 w-1/2"
              value={sabor}
              onChange={(e) => setSabor(e.target.value)}
            />
            <input
              type="number"
              placeholder="%"
              className="border border-blue-500 bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring focus:border-blue-600 w-1/4 ml-2"
              value={porcentaje}
              onChange={(e) => setPorcentaje(e.target.value)}
            />
            <button
              onClick={handleAñadirSabor}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2 focus:outline-none focus:ring focus:ring-blue-300 ml-2"
            >
              Añadir
            </button>
            <ModalMensaje
              mensaje={mensajeModal}
              mostrar={mostrarCrearAromaModal}
              onClose={() => {
                setMostrarCrearAromaModal(false);
              }}
            />
          </div>
          <div className="mt-2">
            <label className="mr-2 text-white">
              <input
                type="radio"
                value="PG"
                checked={Base === "PG"}
                onChange={() => setBase("PG")}
              />
              <span className="ml-1">PG</span>
            </label>
            <label className="text-white">
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
      </div>
    </>
  );
}

export default InputComponent;
