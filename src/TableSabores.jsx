import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent";

function Table({
  nombreEsencia,
  cantidad,
  fuerza,
  fuerzaNicotina,
  pgValue,
  vgValue,
  pgNValue,
  vgNValue,
  descripcion,
}) {
  // Agrega un estado para almacenar los sabores

  const [sabores, setSabores] = useState([]);
  const [totalPG, setTotalPG] = useState(0);
  const [totalVG, setTotalVG] = useState(0);
  const [error, setError] = useState("");
  const [datosGuardados, setDatosGuardados] = useState([]);

  //Calculos
  const TotalNicotineJuice = (cantidad * fuerza) / fuerzaNicotina;
  const PorcentajeNic = (TotalNicotineJuice / cantidad) * 100;

  const PgNic = TotalNicotineJuice * pgNValue * 0.01 * 1.036;
  const VgNic = TotalNicotineJuice * vgNValue * 0.01 * 1.261;
  const NicGrams = PgNic + VgNic;

  const CantidadPg =
    cantidad * pgValue * 0.01 -
    TotalNicotineJuice * pgNValue * 0.01 -
    (totalPG * cantidad) / 100; //mlFlavorpg=(cantidad*porcentajeFlavor1pg)/100  "igual a gramos flavor1pg", input es igual el porcentaje Aqui podría poner (pgValue-PgNic-PgFlavor (una sumatoria de los porcentajes de los sabores pg))
  const CantidadVg =
    cantidad * vgValue * 0.01 -
    TotalNicotineJuice * vgNValue * 0.01 -
    (totalVG * cantidad) / 100; //Lo mismo que arriba pero puesto con sabores vg

  const GramsPg = CantidadPg * 1.036;
  const GramsVg = CantidadVg * 1.261;

  const PorcentajePg = (CantidadPg / cantidad) * 100;
  const PorcentajeVg = (CantidadVg / cantidad) * 100;

  const SumatoriaGrams = GramsPg + GramsVg + NicGrams;

  //Funciones

  useEffect(() => {
    calcularPorcentajeTotal();
    console.log(datosGuardados);
  }, [sabores, datosGuardados]);

  const puedeAgregarSabor = (nuevoSabor) => {
    const porcentajeActualPG =
      totalPG + (nuevoSabor.Base === "PG" && parseFloat(nuevoSabor.porcentaje));
    const porcentajeActualVG =
      totalVG + (nuevoSabor.Base === "VG" && parseFloat(nuevoSabor.porcentaje));

    return porcentajeActualPG <= pgValue && porcentajeActualVG <= vgValue;
  };

  const handleAñadirSabor = (nuevoSabor) => {
    if (puedeAgregarSabor(nuevoSabor)) {
      setSabores([...sabores, nuevoSabor]);
      onAñadirSabor({ ...nuevoSabor, totalPG, totalVG }); // Incluye totalPG y totalVG
    } else {
      setError("No puedes agregar más sabor debido al porcentaje disponible.");
    }
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

  //Funcion de guardado de tablas
  const guardarDatosTabla = () => {
    if (!nombreEsencia) {
      alert(
        "Por favor, ingresa un nombre de esencia antes de guardar los datos."
      );
      return; // Evita guardar los datos si no hay un nombre de esencia
    }

    const nuevoDato = {
      nombreEsencia, // Agrega el nombre de la esencia
      descripcion,
      nicotineJuice: {
        mL: TotalNicotineJuice.toFixed(2),
        Grams: NicGrams.toFixed(2),
        Porcentaje: PorcentajeNic.toFixed(1),
      },
      pgDilutant: {
        mL: CantidadPg.toFixed(2),
        Grams: GramsPg.toFixed(2),
        Porcentaje: PorcentajePg.toFixed(1),
      },
      vgDilutant: {
        mL: CantidadVg.toFixed(2),
        Grams: GramsVg.toFixed(2),
        Porcentaje: PorcentajeVg.toFixed(1),
      },
      sabores: sabores.map((sabor, index) => ({
        nombre: sabor.nombre,
        GramsVgSabores: ((sabor.porcentaje * cantidad * 1.16) / 100).toFixed(2),
        GramsPgSabores: ((sabor.porcentaje * cantidad) / 100).toFixed(2),
        Porcentaje: sabor.porcentaje,
        Base: sabor.Base
      })),
      total: {
        mL: cantidad,
        Grams: (
          SumatoriaGrams +
          (totalPG * cantidad) / 100 +
          (totalVG * cantidad * 1.16) / 100
        ).toFixed(1),
        Porcentaje: "100",
      },
    };

    const datosGuardadosPrevios =
      JSON.parse(localStorage.getItem("datosGuardados")) || [];

    // Agrega el nuevo dato a los datos guardados previos
    const nuevosDatosGuardados = [...datosGuardadosPrevios, nuevoDato];

    // Guarda los datos actualizados en el almacenamiento local
    localStorage.setItem(
      "datosGuardados",
      JSON.stringify(nuevosDatosGuardados)
    );
  };

  return (
    <>
      <h2>
        Esencia:{" "}
        <span style={{ fontStyle: "italic", fontSize: "40px" }}>
          {nombreEsencia}
        </span>
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
            <td>
              &nbsp;{(TotalNicotineJuice + CantidadVg + CantidadPg).toFixed(1)}
            </td>
            <td>&nbsp;{SumatoriaGrams.toFixed(1)}</td>
            <td>
              &nbsp;{(PorcentajeNic + PorcentajePg + PorcentajeVg).toFixed(1)}
            </td>
          </tr>

          {sabores.map((sabor, index) => {
            let GramsVgSabores = (sabor.porcentaje * cantidad * 1.16) / 100;
            let GramsPgSabores = (sabor.porcentaje * cantidad) / 100;

            return (
              <tr key={index}>
                <td>&nbsp;{sabor.nombre}</td>
                <td>&nbsp;{GramsPgSabores}</td>
                <td style={{ fontWeight: "bold" }}>
                  &nbsp;{sabor.Base === "PG" ? GramsPgSabores : GramsVgSabores}
                </td>
                <td>&nbsp;{sabor.porcentaje}</td>
                <td>
                  <button onClick={() => eliminarSabor(index)}>Eliminar</button>
                </td>
              </tr>
            );
          })}

          <tr>
            <td>&nbsp;Total</td>
            <td>&nbsp;{cantidad}</td>
            <td>
              &nbsp;
              {(
                SumatoriaGrams +
                (totalPG * cantidad) / 100 +
                (totalVG * cantidad * 1.16) / 100
              ).toFixed(1)}
            </td>
            <td>&nbsp;{100}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={guardarDatosTabla}>Guardar</button>

      <hr></hr>
      <h2>Sabores</h2>
      {error && <div>{error}</div>}
      <InputComponent onAñadirSabor={handleAñadirSabor} />
    </>
  );
}

export default Table;
