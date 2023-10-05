import React from "react";
import { useState } from "react";
import Sabores from "./Sabores";

function Table({
  nombreEsencia,
  cantidad,
  fuerza,
  fuerzaNicotina,
  pgValue,
  vgValue,
  pgNValue,
  vgNValue,
}) {
  //Calculos
  const TotalNicotineJuice = (cantidad * fuerza) / fuerzaNicotina;
  const PorcentajeNic = (TotalNicotineJuice / cantidad) * 100;
  console.log(pgNValue, vgNValue);

  const PgNic = TotalNicotineJuice * pgNValue * 0.01 * 1.036;
  const VgNic = TotalNicotineJuice * vgNValue * 0.01 * 1.261;
  const NicGrams = PgNic + VgNic;

  const CantidadPg =
    cantidad * pgValue * 0.01 - TotalNicotineJuice * pgNValue * 0.01; //mlFlavorpg=(cantidad*porcentajeFlavor1pg)/100  "igual a gramos flavor1pg", input es igual el porcentaje Aqui podría poner (pgValue-PgNic-PgFlavor (una sumatoria de los porcentajes de los sabores pg))
  const CantidadVg =
    cantidad * vgValue * 0.01 - TotalNicotineJuice * vgNValue * 0.01; //Lo mismo que arriba pero puesto con sabores vg

  const GramsPg = CantidadPg * 1.036;
  const GramsVg = CantidadVg * 1.261;

  const PorcentajePg = (CantidadPg / cantidad) * 100;
  const PorcentajeVg = (CantidadVg / cantidad) * 100;

  const SumatoriaGrams = GramsPg + GramsVg + NicGrams;

  //Funciones

  // Agrega un estado para almacenar los sabores
  const [sabores, setSabores] = useState([]);

  // Función para manejar la adición de sabores
  const handleAñadirSabor = (nuevoSabor) => {
    setSabores([...sabores, nuevoSabor]);
  };
  return (
    <>
      <h2>
        Esencia: <span style={{fontStyle: "italic",
    fontSize: "40px",}}>{nombreEsencia}</span>
      </h2>
      <table>
        <tbody>
          <tr>
            <td>Ingrediente&nbsp;</td>
            <td>mL</td>
            <td>Grams</td>
            <td>&nbsp;%</td>
          </tr>
          <tr>
            <td>&nbsp;Nicotine juice</td>
            <td>&nbsp;{TotalNicotineJuice.toFixed(2)}</td>
            <td>&nbsp;{NicGrams.toFixed(2)}</td>
            <td>&nbsp;{PorcentajeNic.toFixed(1)}</td>
          </tr>
          <tr>
            <td>&nbsp;pg dilutant</td>
            <td>&nbsp;{CantidadPg.toFixed(2)}</td>
            <td>&nbsp;{GramsPg.toFixed(2)}</td>
            <td>&nbsp;{PorcentajePg.toFixed(1)}</td>
          </tr>
          <tr>
            <td>&nbsp;vg dilutant</td>
            <td>&nbsp;{CantidadVg.toFixed(2)}</td>
            <td>&nbsp;{GramsVg.toFixed(2)}</td>
            <td>&nbsp;{PorcentajeVg.toFixed(1)}</td>
          </tr>
          <tr>
            <td>&nbsp;total base</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>

          {sabores.map((sabor, index) => (
            <tr key={index}>
              <td>&nbsp;{sabor.nombre}</td>
              <td>&nbsp;{((sabor.porcentaje * cantidad) / 100).toFixed(2)}</td>
              <td style={{ fontWeight: "bold" }}>
                &nbsp;{((sabor.porcentaje * cantidad) / 100).toFixed(2)}
              </td>
              <td>&nbsp;{sabor.porcentaje}</td>
            </tr>
          ))}

          <tr>
            <td>&nbsp;Total</td>
            <td>&nbsp;{cantidad}</td>
            <td>&nbsp;{SumatoriaGrams.toFixed(1)}</td>
            <td>&nbsp;{100}</td>
          </tr>
        </tbody>
      </table>

      <hr></hr>
      <h2>Sabores</h2>
      <Sabores
        pgValue={pgValue}
        vgValue={vgValue}
        onAñadirSabor={handleAñadirSabor}
      />
    </>
  );
}

export default Table;
