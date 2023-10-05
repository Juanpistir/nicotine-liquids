import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent";

function Sabores({ pgValue, vgValue }) {
  const [sabores, setSabores] = useState([]);
  const [totalPG, setTotalPG] = useState(0);
  const [totalVG, setTotalVG] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    calcularPorcentajeTotal();
  }, [sabores]);

  const añadirSabor = (nuevoSabor) => {
    if (puedeAgregarSabor(nuevoSabor)) {
      setSabores([...sabores, nuevoSabor]);
    } else {
      setError("No puedes agregar más sabor debido al porcentaje disponible.");
    }
  };

  const puedeAgregarSabor = (nuevoSabor) => {
    const porcentajeActualPG = totalPG + (nuevoSabor.Base === "PG" ? parseFloat(nuevoSabor.porcentaje) : 0);
    const porcentajeActualVG = totalVG + (nuevoSabor.Base === "VG" ? parseFloat(nuevoSabor.porcentaje) : 0);

    return porcentajeActualPG <= pgValue && porcentajeActualVG <= vgValue;
  };

  const eliminarSabor = (indexToRemove) => {
    const saborEliminado = sabores[indexToRemove];
    const nuevosSabores = sabores.filter((_, index) => index !== indexToRemove);
    setSabores(nuevosSabores);
    restarPorcentaje(saborEliminado);
  };

  const calcularPorcentajeTotal = () => {
    let nuevoTotalPG = 0;
    let nuevoTotalVG = 0;

    sabores.forEach((sabor) => {
      if (sabor.Base === "PG") {
        nuevoTotalPG += parseFloat(sabor.porcentaje);
      } else if (sabor.Base === "VG") {
        nuevoTotalVG += parseFloat(sabor.porcentaje);
      }
    });

    setTotalPG(nuevoTotalPG);
    setTotalVG(nuevoTotalVG);
  };

  const restarPorcentaje = (saborEliminado) => {
    if (saborEliminado.Base === "PG") {
      setTotalPG(totalPG - parseFloat(saborEliminado.porcentaje));
    } else if (saborEliminado.Base === "VG") {
      setTotalVG(totalVG - parseFloat(saborEliminado.porcentaje));
    }
  };

  return (
    <div>
      <h2>Agregar Sabor</h2>
      {error && <div>{error}</div>}
      <InputComponent onAñadirSabor={añadirSabor} />

      <h2>Lista de Sabores</h2>
      {sabores.map((sabor, index) => (
        <div key={index}>
          <span>{sabor.nombre}</span>
          <button onClick={() => eliminarSabor(index)}>Eliminar</button>
        </div>
      ))}

      <h2>Porcentaje Total</h2>
      <div>Total PG: {totalPG}%</div>
      <div>Total VG: {totalVG}%</div>
    </div>
  );
}

export default Sabores;
