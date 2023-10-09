import React, { useEffect, useState } from "react";

function Recetas() {
  const [datosGuardados, setDatosGuardados] = useState([]);
  const [esenciaSeleccionada, setEsenciaSeleccionada] = useState(null);

  useEffect(() => {
    // Recupera los datos guardados del almacenamiento local al cargar la página
    const datosGuardadosLocalStorage =
      JSON.parse(localStorage.getItem("datosGuardados")) || [];
    if (datosGuardadosLocalStorage) {
      setDatosGuardados(datosGuardadosLocalStorage);
    }
  }, []);

  const eliminarDato = (index) => {
    const nuevosDatosGuardados = datosGuardados.filter((_, i) => i !== index);
    setDatosGuardados(nuevosDatosGuardados);

    // Actualiza el almacenamiento local con los nuevos datos
    localStorage.setItem(
      "datosGuardados",
      JSON.stringify(nuevosDatosGuardados)
    );
  };

  const toggleEsenciaSeleccionada = (dato) => {
    if (esenciaSeleccionada && esenciaSeleccionada.nombreEsencia === dato.nombreEsencia) {
      // Si ya está seleccionada, ocúltala
      setEsenciaSeleccionada(null);
    } else {
      // De lo contrario, muestra los datos de la esencia seleccionada
      setEsenciaSeleccionada(dato);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold p-4">
        Tus recetas guardadas:
      </h1>
      <ul>
        {datosGuardados.map((dato, index) => (
          <li key={index} className="mb-4">
            <div className="flex items-center">
              <p
                onClick={() => toggleEsenciaSeleccionada(dato)}
                style={{ cursor: "pointer" }}
                className="text-2xl text-black hover:text-blue-900 font-bold"
              >
                {dato.nombreEsencia}
              </p>
              <button
                onClick={() => {eliminarDato(index); toggleEsenciaSeleccionada(dato)}}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full focus:outline-none focus:ring focus:ring-red-300 ml-2"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {esenciaSeleccionada && (
        <div>
          <div className="flex flex-col justify-between mx-auto px-4">
            <h3 className="text-center text-4xl font-bold text-outline uppercase mb-2 facon">
              {esenciaSeleccionada.nombreEsencia}
            </h3>
            <table className="font-bold text-center">
              <thead>
                <tr className="text-md font-semibold text-gray-900 bg-gray-100 uppercase border border-gray-600">
                  <th className="py-2 px-4 bg-gray-200">Ingredientes</th>
                  <th className="py-2 px-4 bg-gray-200">mL</th>
                  <th className="py-2 px-4 bg-gray-200">Gramos</th>
                  <th className="py-2 px-4 bg-gray-200">%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jugo de Nicotina</td>
                  <td>{esenciaSeleccionada.nicotineJuice.mL}</td>
                  <td>{esenciaSeleccionada.nicotineJuice.Grams}</td>
                  <td>{esenciaSeleccionada.nicotineJuice.Porcentaje}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Diluyente PG</td>
                  <td>{esenciaSeleccionada.pgDilutant.mL}</td>
                  <td>{esenciaSeleccionada.pgDilutant.Grams}</td>
                  <td>{esenciaSeleccionada.pgDilutant.Porcentaje}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Diluyente VG</td>
                  <td>{esenciaSeleccionada.vgDilutant.mL}</td>
                  <td>{esenciaSeleccionada.vgDilutant.Grams}</td>
                  <td>{esenciaSeleccionada.vgDilutant.Porcentaje}</td>
                  <td></td>
                </tr>
                {esenciaSeleccionada.sabores.map((sabor, index) => (
                  <tr key={index}>
                    <td className="text-slate-200">{sabor.nombre}</td>
                    <td>{sabor.GramsPgSabores}</td>
                    <td>
                      {sabor.Base === "PG"
                        ? sabor.GramsPgSabores
                        : sabor.GramsVgSabores}
                    </td>
                    <td>{sabor.Porcentaje}</td>
                    <td></td>
                  </tr>
                ))}
                <tr>
                  <td>Total</td>
                  <td>{esenciaSeleccionada.total.mL}</td>
                  <td>{esenciaSeleccionada.total.Grams}</td>
                  <td>{esenciaSeleccionada.total.Porcentaje}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="relative pt-1 mx-4">
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-emerald-200 mx-4 ring-2 ring-slate-700">
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
    </div>
  );
}
export default Recetas;
