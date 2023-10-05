import React, { useState } from "react";

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
    <div>
      <input
        type="text"
        placeholder="Sabor"
        value={sabor}
        onChange={(e) => setSabor(e.target.value)}
      />
      <input
        type="number"
        placeholder="%"
        value={porcentaje}
        onChange={(e) => setPorcentaje(e.target.value)}
      />
      <div>
        <label>
          <input
            type="radio"
            value="PG"
            checked={Base === "PG"}
            onChange={() => setBase("PG")}
          />
          PG
        </label>
        <label>
          <input
            type="radio"
            value="VG"
            checked={Base === "VG"}
            onChange={() => setBase("VG")}
          />
          VG
        </label>
      </div>
      <button onClick={handleAñadirSabor}>Añadir</button>
    </div>
  );
}

export default InputComponent;
