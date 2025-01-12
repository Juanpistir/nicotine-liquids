import React, { useEffect, useState } from "react";
import ModalEliminar from "../modals/ModalEliminar";
import ResponsiveTable from '../ui/ResponsiveTable';

function Recetas() {
  const [datosGuardados, setDatosGuardados] = useState([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [idEliminar, setIdEliminar] = useState(null);

  useEffect(() => {
    cargarRecetas();
  }, []);

  const cargarRecetas = () => {
    const datosGuardadosLocalStorage = JSON.parse(localStorage.getItem("datosGuardados")) || [];
    setDatosGuardados(datosGuardadosLocalStorage);
  };

  const abrirModal = (id) => {
    setMostrarModal(true);
    setIdEliminar(id);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setIdEliminar(null);
  };

  const eliminarReceta = () => {
    const nuevosDatosGuardados = datosGuardados.filter((dato) => dato.id !== idEliminar);
    localStorage.setItem("datosGuardados", JSON.stringify(nuevosDatosGuardados));
    setDatosGuardados(nuevosDatosGuardados);
    setRecetaSeleccionada(null);
    cerrarModal();
  };

  const toggleRecetaSeleccionada = (receta) => {
    if (recetaSeleccionada && recetaSeleccionada.id === receta.id) {
      setRecetaSeleccionada(null);
    } else {
      setRecetaSeleccionada(receta);
    }
  };

  const getTableData = (receta) => {
    // Si tenemos los datos de la tabla guardados, usarlos directamente
    if (receta.datosTabla && Array.isArray(receta.datosTabla)) {
      return receta.datosTabla;
    }

    // Si no hay datos de tabla, retornar array vacío
    return [];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Mis Recetas
        </h2>

        {datosGuardados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No tienes recetas guardadas aún.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {datosGuardados.map((receta) => (
              <div
                key={receta.id}
                className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
              >
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {receta.nombreEsencia}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {receta.descripcion || "Sin descripción"}
                      </p>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700">Aromas:</h4>
                        <ul className="mt-1 space-y-1">
                          {receta.aromas && receta.aromas.map((aroma, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {aroma.nombre} ({aroma.porcentaje}%)
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <button
                      onClick={() => abrirModal(receta.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="px-4 py-4 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Cantidad</dt>
                      <dd className="mt-1 text-sm text-gray-900">{receta.cantidad} ml</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Fuerza</dt>
                      <dd className="mt-1 text-sm text-gray-900">{receta.fuerza} mg</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Ratio PG/VG</dt>
                      <dd className="mt-1 text-sm text-gray-900">{receta.pgValue}/{receta.vgValue}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Tiempo de reposo</dt>
                      <dd className="mt-1 text-sm text-gray-900">{receta.tiempo} días</dd>
                    </div>
                  </dl>
                </div>

                <div className="px-4 py-4 sm:px-6">
                  <button
                    onClick={() => toggleRecetaSeleccionada(receta)}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {recetaSeleccionada?.id === receta.id ? 'Ocultar detalles' : 'Ver detalles'}
                  </button>
                </div>

                {recetaSeleccionada?.id === receta.id && (
                  <div className="px-4 py-4 sm:px-6">
                    <ResponsiveTable data={getTableData(receta)} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalEliminar
        mostrar={mostrarModal}
        onClose={cerrarModal}
        onConfirm={eliminarReceta}
      />
    </div>
  );
}

export default Recetas;
