import React, { useEffect, useState } from "react";
import ModalEliminar from "./ModalEliminar";

function Recetas() {
  const [datosGuardados, setDatosGuardados] = useState([]);
  const [esenciaSeleccionada, setEsenciaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    // Recupera los datos guardados del almacenamiento local al cargar la página
    const datosGuardadosLocalStorage =
      JSON.parse(localStorage.getItem("datosGuardados")) || [];
    if (datosGuardadosLocalStorage) {
      setDatosGuardados(datosGuardadosLocalStorage);
    }
  }, []);

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const eliminarDato = (id) => {
    setMostrarModal(false);
    const nuevosDatosGuardados = datosGuardados.filter(
      (dato) => dato.id !== id
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
                  abrirModal();
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full focus:outline-none focus:ring focus:ring-red-300 ml-2"
              >
                Eliminar
              </button>
              <ModalEliminar
                isOpen={mostrarModal}
                onClose={cerrarModal}
                eliminarTarea={() => {
                  eliminarDato(dato.id || `dato-${index}`);
                  toggleEsenciaSeleccionada(dato);
                }}
              />
            </div>
            <p className="text-xl italic text-slate-600">{dato.descripcion}</p>
            <p className="text-xl italic text-slate-600">Tiempo sugerido de remojo: <span className="text-xl text-blue-500">{dato.tiempo}</span> días</p>
          </li>
        ))}
      </ul>

      {esenciaSeleccionada && (
        <div className="bg-black p-4 rounded-lg m-6 mx-auto">
          <h3 className="text-center text-4xl font-bold uppercase mb-2 facon text-white">
            {esenciaSeleccionada.nombreEsencia}
          </h3>

          <table className="font-semibold border border-blue-500 mx-auto">
            <thead>
              <tr className="text-md font-semibold text-gray-900 bg-gray-100 uppercase border-b border-blue-500">
                <th className="py-2 px-4 bg-blue-500 border border-white text-white">
                  Ingredientes
                </th>{" "}
                {/* Establece el color del texto en blanco */}
                <th className="py-2 px-4 bg-blue-500 border border-white text-white">
                  mL
                </th>{" "}
                {/* Establece el color del texto en blanco */}
                <th className="py-2 px-4 bg-blue-500 border border-white text-white">
                  Gramos
                </th>{" "}
                {/* Establece el color del texto en blanco */}
                <th className="py-2 px-4 bg-blue-500 border border-white text-white">
                  %
                </th>{" "}
                {/* Establece el color del texto en blanco */}
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border-b border-blue-500">
                <td className="py-2 px-4 text-white">Jugo de Nicotina</td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="py-2 px-4 text-white">
                  {esenciaSeleccionada.nicotineJuice.mL}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="py-2 px-4 text-white">
                  {esenciaSeleccionada.nicotineJuice.Grams}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="py-2 px-4 text-white">
                  {esenciaSeleccionada.nicotineJuice.Porcentaje}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
              </tr>
              <tr className="text-center border-b border-blue-500">
                <td className="py-2 px-4 text-white">Diluyente PG</td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="py-2 px-4 text-white">
                  {esenciaSeleccionada.pgDilutant.mL}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="py-2 px-4 text-white">
                  {esenciaSeleccionada.pgDilutant.Grams}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="py-2 px-4 text-white">
                  {esenciaSeleccionada.pgDilutant.Porcentaje}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
              </tr>
              <tr className="text-center border-b border-blue-500">
                <td className="py-2 px-4 text-white">Diluyente VG</td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="py-2 px-4 text-white">
                  {esenciaSeleccionada.vgDilutant.mL}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="py-2 px-4 text-white">
                  {esenciaSeleccionada.vgDilutant.Grams}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="py-2 px-4 text-white">
                  {esenciaSeleccionada.vgDilutant.Porcentaje}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
              </tr>
              {esenciaSeleccionada.sabores.map((sabor, index) => (
                <tr
                  key={sabor.id || `sabor-${index}`}
                  className="text-center border-b border-blue-500"
                >
                  <td className="text-white">{sabor.nombre}</td>{" "}
                  {/* Establece el color del texto en blanco */}
                  <td className="text-white">{sabor.GramsPgSabores}</td>{" "}
                  {/* Establece el color del texto en blanco */}
                  <td className="text-white">
                    {sabor.Base === "PG"
                      ? sabor.GramsPgSabores
                      : sabor.GramsVgSabores}
                  </td>
                  <td className="text-white">{sabor.Porcentaje}</td>{" "}
                  {/* Establece el color del texto en blanco */}
                </tr>
              ))}
              <tr className="text-center border-b border-blue-500">
                <td className="text-white">Total</td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="text-white">
                  {esenciaSeleccionada.total.mL}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="text-white">
                  {esenciaSeleccionada.total.Grams}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
                <td className="text-white">
                  {esenciaSeleccionada.total.Porcentaje}
                </td>{" "}
                {/* Establece el color del texto en blanco */}
              </tr>
            </tbody>
          </table>

          <div className="relative pt-1 mx-auto">
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-emerald-200 ring-2 ring-slate-700">
              <div
                style={{
                  width: `${esenciaSeleccionada.pgDilutant.Porcentaje}%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
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
