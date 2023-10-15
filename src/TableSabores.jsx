import React, { useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import "./styles.css";
import ModalMensaje from "./ModalMensaje";
import { Table as Tables, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function TableSabores({
  nombreEsencia,
  cantidad,
  fuerza,
  fuerzaNicotina,
  pgValue,
  vgValue,
  pgNValue,
  vgNValue,
  descripcion,
  tiempo,
}) {
  // Agrega un estado para almacenar los sabores

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");
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
      setError("");
    } else {
      setError("No puedes agregar más sabor debido al porcentaje disponible.");
    }
  };

  const eliminarSabor = (saborId) => {
    const saborEliminado = sabores.find((sabor) => sabor.id === saborId);

    if (saborEliminado) {
      const nuevosSabores = sabores.filter((sabor) => sabor.id !== saborId);
      setSabores(nuevosSabores);
      // Llama a la función para restar el porcentaje
      restarPorcentaje(saborEliminado);
    }
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

  function generarIdUnico() {
    return new Date().getTime(); // Usamos la marca de tiempo actual como ID
  }

  //Funcion de guardado de tablas
  const guardarDatosTabla = () => {
    if (!nombreEsencia) {
      alert(
        "Por favor, ingresa un nombre de esencia antes de guardar los datos."
      );
      return; // Evita guardar los datos si no hay un nombre de esencia
    }

    setMensajeModal("¡Esencia guardada!");
    setMostrarModal(true);

    const nuevoDato = {
      id: generarIdUnico(),
      nombreEsencia, // Agrega el nombre de la esencia
      descripcion,
      tiempo,
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
      sabores: sabores.map((sabor) => ({
        id: generarIdUnico(),
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
    <div className="p-4">
      {error && (
        <div className="my-4 text-3xl italic text-blue-500">{error}</div>
      )}
      <InputComponent onAñadirSabor={handleAñadirSabor} />
  
      <h2 className="text-center text-4xl mb-2 font-bold text-blue-500  tracking-tight">Tabla</h2>
  
      <h1 className="text-center text-4xl font-bold uppercase mb-2 text-white facon">
        {nombreEsencia}
      </h1>
  
      <Tables className="font-semibold border border-blue-500 w-full">
      <Thead>
        <Tr className="text-md font-semibold text-gray-900 bg-gray-100 uppercase border-b border-blue-500">
          <Th className="py-2 px-4 bg-blue-500 border border-white">
            Ingredientes
          </Th>
          <Th className="py-2 px-4 bg-blue-500 border border-white">mL</Th>
          <Th className="py-2 px-4 bg-blue-500 border border-white">Gramos</Th>
          <Th className="py-2 px-4 bg-blue-500 border border-white">%</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr className="text-center border-b border-blue-500">
          <Td className="py-2 px-4">Jugo de Nicotina</Td>
          <Td className="py-2 px-4">{TotalNicotineJuice.toFixed(2)}</Td>
          <Td className="py-2 px-4">{NicGrams.toFixed(2)}</Td>
          <Td className="py-2 px-4">{PorcentajeNic.toFixed(1)}</Td>
        </Tr>
        <Tr className="text-center border-b border-blue-500">
          <Td className="py-2 px-4">Diluyente PG</Td>
          <Td className="py-2 px-4">{CantidadPg.toFixed(2)}</Td>
          <Td className="py-2 px-4">{GramsPg.toFixed(2)}</Td>
          <Td className="py-2 px-4">{PorcentajePg.toFixed(1)}</Td>
        </Tr>
        <Tr className="text-center border-b border-blue-500">
          <Td className="py-2 px-4">Diluyente VG</Td>
          <Td className="py-2 px-4">{CantidadVg.toFixed(2)}</Td>
          <Td className="py-2 px-4">{GramsVg.toFixed(2)}</Td>
          <Td className="py-2 px-4">{PorcentajeVg.toFixed(1)}</Td>
        </Tr>
        <Tr className="text-center border-b border-blue-500">
          <Td className="py-2 px-4">Base Total</Td>
          <Td className="py-2 px-4">
            {(TotalNicotineJuice + CantidadVg + CantidadPg).toFixed(1)}
          </Td>
          <Td className="py-2 px-4">{SumatoriaGrams.toFixed(1)}</Td>
          <Td className="py-2 px-4">
            {(PorcentajeNic + PorcentajePg + PorcentajeVg).toFixed(1)}
          </Td>
        </Tr>

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
            <Tr
              key={sabor.id || `sabor-${index}`}
              className="text-center border-b border-blue-500"
            >
              <Td className="py-2 px-4 font-semibold">
                {sabor.nombre}
                <button
                  onClick={() => eliminarSabor(sabor.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full focus:outline-none focus:ring focus:ring-red-300 ml-2"
                >
                  X
                </button>
              </Td>
              <Td className="py-2 px-4">{GramsPgSabores}</Td>
              <Td className="py-2 px-4">
                {sabor.Base === "PG" ? GramsPgSabores : GramsVgSabores}
              </Td>
              <Td className="py-2 px-4">{sabor.porcentaje}</Td>
            </Tr>
          );
        })}

        <Tr className="text-center border-b border-blue-500">
          <Td className="py-2 px-4">Total</Td>
          <Td className="py-2 px-4">{cantidad}</Td>
          <Td className="py-2 px-4">
            {(
              SumatoriaGrams +
              (totalPG * cantidad) / 100 +
              (totalVG * cantidad * 1.16) / 100
            ).toFixed(1)}
          </Td>
          <Td className="py-2 px-4">100</Td>
        </Tr>
      </Tbody>
    </Tables>
  
      <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-emerald-200 ring-2 ring-slate-500">
        <div
          style={{
            width: `${PorcentajePg}%`,
          }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
        >
          PG
        </div>
        <div
          style={{
            width: `${PorcentajeVg}%`,
          }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
        >
          VG
        </div>
        <div
          style={{
            width: `${PorcentajeNic}%`,
          }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
        >
          Nicotina
        </div>
        <div
          style={{
            width: `${porcentajeRestante}%`,
          }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
        >
          Aromas
        </div>
      </div>
  
      <button
        onClick={guardarDatosTabla}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
      >
        Guardar
      </button>
  
      <ModalMensaje
        mensaje={mensajeModal}
        mostrar={mostrarModal}
        onClose={() => setMostrarModal(false)}
      />
    </div>
  );
}

export default TableSabores;
