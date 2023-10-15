import React, { useEffect, useState } from "react";
import ModalEliminar from "./ModalEliminar";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function Recetas() {
  const [datosGuardados, setDatosGuardados] = useState([]);
  const [esenciaSeleccionada, setEsenciaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  
  const [idEliminar, setIdEliminar] = useState(null);

  useEffect(() => {
    // Recupera los datos guardados del almacenamiento local al cargar la página
    const datosGuardadosLocalStorage =
      JSON.parse(localStorage.getItem("datosGuardados")) || [];
    if (datosGuardadosLocalStorage) {
      setDatosGuardados(datosGuardadosLocalStorage);
    }
  }, []);

  const abrirModal = (id) => {
    setMostrarModal(true);
    setIdEliminar(id)
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const eliminarDato = () => {
    setMostrarModal(false);
    const nuevosDatosGuardados = datosGuardados.filter(
      (dato) => dato.id !== idEliminar
    );
    setDatosGuardados(nuevosDatosGuardados);
    setEsenciaSeleccionada(null); // Establece la esencia seleccionada como null
    localStorage.setItem(
      "datosGuardados",
      JSON.stringify(nuevosDatosGuardados)
    );
  };

  const toggleEsenciaSeleccionada = (dato) => {
    if (esenciaSeleccionada && esenciaSeleccionada.id === dato.id) {
      setEsenciaSeleccionada(null); // Si la misma esencia se hace clic dos veces, ocúltala.
    } else {
      setEsenciaSeleccionada(dato);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold p-4 text-blue-500">
        Tus recetas guardadas:
      </h1>
      <ul>
        {datosGuardados.map((dato, index) => (
          <li
            key={dato.id || `dato-${index}`}
            className="m-6 bg-black p-4 rounded-lg text-blue-500"
          >
            <div className="flex items-center">
              <p
                onClick={() => toggleEsenciaSeleccionada(dato)}
                style={{ cursor: "pointer" }}
                className="text-2xl hover:text-blue-900 font-bold cursor-pointer text-blue-500"
              >
                {dato.nombreEsencia}
              </p>
              <button
                onClick={() => {
                  abrirModal(dato.id || `dato-${index}`);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full focus:outline-none focus:ring focus:ring-red-300 ml-2"
              >
                Eliminar
              </button>
              <ModalEliminar
                isOpen={mostrarModal}
                onClose={cerrarModal}
                eliminarTarea={eliminarDato}
              />
            </div>
            <p className="text-xl italic text-slate-600">{dato.descripcion}</p>
            <p className="text-xl italic text-slate-600">
              Tiempo sugerido de remojo:{" "}
              <span className="text-xl text-blue-500">{dato.tiempo}</span> días
            </p>
          </li>
        ))}
      </ul>

      {esenciaSeleccionada && (
        <div className="bg-black p-4 rounded-lg m-6 mx-auto">
          <h3 className="text-center text-4xl font-bold uppercase mb-2 facon text-white">
            {esenciaSeleccionada.nombreEsencia}
          </h3>

          <Table className="font-semibold border border-blue-500 mx-auto text-white">
            <Thead>
              <Tr className="text-md font-semibold text-gray-900 bg-gray-100 uppercase border-b border-blue-500">
                <Th className="py-2 px-4 bg-blue-500 border border-white">
                  Ingredientes
                </Th>

                <Th className="py-2 px-4 bg-blue-500 border border-white">
                  mL
                </Th>

                <Th className="py-2 px-4 bg-blue-500 border border-white">
                  Gramos
                </Th>

                <Th className="py-2 px-4 bg-blue-500 border border-white">%</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr className="text-center border-b border-blue-500">
                <Td className="py-2 px-4">Jugo de Nicotina</Td>

                <Td className="py-2 px-4">
                  {esenciaSeleccionada.nicotineJuice.mL}
                </Td>

                <Td className="py-2 px-4">
                  {esenciaSeleccionada.nicotineJuice.Grams}
                </Td>

                <Td className="py-2 px-4">
                  {esenciaSeleccionada.nicotineJuice.Porcentaje}
                </Td>
              </Tr>
              <Tr className="text-center border-b border-blue-500">
                <Td className="py-2 px-4">Diluyente PG</Td>

                <Td className="py-2 px-4">
                  {esenciaSeleccionada.pgDilutant.mL}
                </Td>

                <Td className="py-2 px-4">
                  {esenciaSeleccionada.pgDilutant.Grams}
                </Td>

                <Td className="py-2 px-4">
                  {esenciaSeleccionada.pgDilutant.Porcentaje}
                </Td>
              </Tr>
              <Tr className="text-center border-b border-blue-500">
                <Td className="py-2 px-4">Diluyente VG</Td>

                <Td className="py-2 px-4">
                  {esenciaSeleccionada.vgDilutant.mL}
                </Td>

                <Td className="py-2 px-4">
                  {esenciaSeleccionada.vgDilutant.Grams}
                </Td>

                <Td className="py-2 px-4">
                  {esenciaSeleccionada.vgDilutant.Porcentaje}
                </Td>
              </Tr>
              {esenciaSeleccionada.sabores.map((sabor, index) => (
                <Tr
                  key={sabor.id || `sabor-${index}`}
                  className="text-center border-b border-blue-500"
                >
                  <Td>{sabor.nombre}</Td>

                  <Td>{sabor.GramsPgSabores}</Td>

                  <Td>
                    {sabor.Base === "PG"
                      ? sabor.GramsPgSabores
                      : sabor.GramsVgSabores}
                  </Td>
                  <Td>{sabor.Porcentaje}</Td>
                </Tr>
              ))}
              <Tr className="text-center border-b border-blue-500">
                <Td>Total</Td>

                <Td>{esenciaSeleccionada.total.mL}</Td>

                <Td>{esenciaSeleccionada.total.Grams}</Td>

                <Td>{esenciaSeleccionada.total.Porcentaje}</Td>
              </Tr>
            </Tbody>
          </Table>

          <div className="relative pt-1 mx-auto">
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-emerald-200 ring-2 ring-slate-700">
              <div
                style={{
                  width: `${esenciaSeleccionada.pgDilutant.Porcentaje}%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-blue-500"
              >
                PG
              </div>
              <div
                style={{
                  width: `${esenciaSeleccionada.vgDilutant.Porcentaje}%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
              >
                VG
              </div>
              <div
                style={{
                  width: `${esenciaSeleccionada.nicotineJuice.Porcentaje}%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
              >
                Nicotina
              </div>
              <div
                style={{
                  width: `${esenciaSeleccionada.porcentajeRestante}%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
              >
                Aromas
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Recetas;
