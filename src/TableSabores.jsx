import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import "./styles.css";

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

  //Variables para barra
  const porcentajeRestante =
    100 - (PorcentajePg + PorcentajeVg + PorcentajeNic);

  //Funciones

  useEffect(() => {
    calcularPorcentajeTotal();
  }, [sabores]);

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
      porcentajeRestante,
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
        Base: sabor.Base,
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
      <div className="overflow-x-auto">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <InputComponent onAñadirSabor={handleAñadirSabor} />
        <div className="text-3xl font-bold mt-4">
          <h2 className="text-lg font-bold mb-2 underline neon-text">Tabla</h2>
          <span className="bg-gradient-to-r text-transparent bg-clip-text from-red-500 via-yellow-500 to-green-500 mb-2">
            {nombreEsencia}
          </span>
        </div>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Ingrediente</th>
              <th className="py-2 px-4 bg-gray-200">mL</th>
              <th className="py-2 px-4 bg-gray-200">Grams</th>
              <th className="py-2 px-4 bg-gray-200">%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">Nicotine juice</td>
              <td className="py-2 px-4">{TotalNicotineJuice.toFixed(2)}</td>
              <td className="py-2 px-4">{NicGrams.toFixed(2)}</td>
              <td className="py-2 px-4">{PorcentajeNic.toFixed(1)}</td>
            </tr>
            <tr>
              <td className="py-2 px-4">pg dilutant</td>
              <td className="py-2 px-4">{CantidadPg.toFixed(2)}</td>
              <td className="py-2 px-4">{GramsPg.toFixed(2)}</td>
              <td className="py-2 px-4">{PorcentajePg.toFixed(1)}</td>
            </tr>
            <tr>
              <td className="py-2 px-4">vg dilutant</td>
              <td className="py-2 px-4">{CantidadVg.toFixed(2)}</td>
              <td className="py-2 px-4">{GramsVg.toFixed(2)}</td>
              <td className="py-2 px-4">{PorcentajeVg.toFixed(1)}</td>
            </tr>
            <tr>
              <td className="py-2 px-4">total base</td>
              <td className="py-2 px-4">
                {(TotalNicotineJuice + CantidadVg + CantidadPg).toFixed(1)}
              </td>
              <td className="py-2 px-4">{SumatoriaGrams.toFixed(1)}</td>
              <td className="py-2 px-4">
                {(PorcentajeNic + PorcentajePg + PorcentajeVg).toFixed(1)}
              </td>
            </tr>

            {sabores.map((sabor, index) => {
              let GramsVgSabores = (
                (sabor.porcentaje * cantidad * 1.16) /
                100
              ).toFixed(2);
              let GramsPgSabores = (
                (sabor.porcentaje * cantidad) /
                100
              ).toFixed(2);

              return (
                <tr key={index}>
                  <td className="py-2 px-4">
                    {sabor.nombre}{" "}
                    <button
                      onClick={() => eliminarSabor(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full focus:outline-none focus:ring focus:ring-red-300"
                    >
                      X
                    </button>
                  </td>
                  <td className="py-2 px-4">{GramsPgSabores}</td>
                  <td className="py-2 px-4 font-bold">
                    {sabor.Base === "PG" ? GramsPgSabores : GramsVgSabores}
                  </td>
                  <td className="py-2 px-4">{sabor.porcentaje}</td>
                  <td className="py-2 px-4"></td>
                </tr>
              );
            })}

            <tr>
              <td className="py-2 px-4">Total</td>
              <td className="py-2 px-4">{cantidad}</td>
              <td className="py-2 px-4">
                {(
                  SumatoriaGrams +
                  (totalPG * cantidad) / 100 +
                  (totalVG * cantidad * 1.16) / 100
                ).toFixed(1)}
              </td>
              <td className="py-2 px-4">100</td>
            </tr>
          </tbody>
        </table>

        {/* <div className="relative pt-1 mx-4"> */}
        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-emerald-200">
          <div
            style={{
              width: `${PorcentajePg}%`,
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
          >
            PG
          </div>
          <div
            style={{
              width: `${PorcentajeVg}%`,
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
          >
            VG
          </div>
          <div
            style={{
              width: `${PorcentajeNic}%`,
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
          >
            Nicotina
          </div>
          <div
            style={{
              width: `${porcentajeRestante}%`,
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-slate-500"
          >
            Sabores
          </div>
        </div>

        <button
          onClick={guardarDatosTabla}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
        >
          Guardar
        </button>
      </div>
    </>
  );
}

export default Table;
