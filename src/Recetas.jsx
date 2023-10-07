import React, { useEffect, useState } from "react";

function Recetas() {
  const [datosGuardados, setDatosGuardados] = useState([]);
  const [esenciaSeleccionada, setEsenciaSeleccionada] = useState(null);

  useEffect(() => {
    // Recupera los datos guardados del almacenamiento local al cargar la página
    const datosGuardadosLocalStorage = JSON.parse(localStorage.getItem("datosGuardados")) || [];
    if (datosGuardadosLocalStorage) {
      setDatosGuardados(datosGuardadosLocalStorage);
    }
  }, []);

  const eliminarDato = (index) => {
    const nuevosDatosGuardados = datosGuardados.filter((_, i) => i !== index);
    setDatosGuardados(nuevosDatosGuardados);

    // Actualiza el almacenamiento local con los nuevos datos
    localStorage.setItem("datosGuardados", JSON.stringify(nuevosDatosGuardados));
  };

  return (
    <div>
      <h2>Recetas Guardadas</h2>
      <ul>
        {datosGuardados.map((dato, index) => (
          <li key={index}>
            <div>
              <p
                // Agrega un evento onClick para seleccionar la esencia
                onClick={() => setEsenciaSeleccionada(dato)}
                style={{ cursor: "pointer" }}
              >
                Nombre de la esencia: {dato.nombreEsencia}
              </p>
              <button onClick={() => eliminarDato(index)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {esenciaSeleccionada && (
        <div>
          <h3>Datos de la Esencia Seleccionada: {esenciaSeleccionada.nombreEsencia}</h3>
          <table>
            <thead>
              <tr>
                <th>Ingrediente</th>
                <th>mL</th>
                <th>Grams</th>
                <th>%</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nicotine juice</td>
                <td>{esenciaSeleccionada.nicotineJuice.mL}</td>
                <td>{esenciaSeleccionada.nicotineJuice.Grams}</td>
                <td>{esenciaSeleccionada.nicotineJuice.Porcentaje}</td>
                <td></td>
              </tr>
              <tr>
                <td>pg dilutant</td>
                <td>{esenciaSeleccionada.pgDilutant.mL}</td>
                <td>{esenciaSeleccionada.pgDilutant.Grams}</td>
                <td>{esenciaSeleccionada.pgDilutant.Porcentaje}</td>
                <td></td>
              </tr>
              <tr>
                <td>vg dilutant</td>
                <td>{esenciaSeleccionada.vgDilutant.mL}</td>
                <td>{esenciaSeleccionada.vgDilutant.Grams}</td>
                <td>{esenciaSeleccionada.vgDilutant.Porcentaje}</td>
                <td></td>
              </tr>
              {esenciaSeleccionada.sabores.map((sabor, index) => (
                <tr key={index}>
                  <td>{sabor.nombre}</td>
                  <td>{sabor.GramsPgSabores}</td>
                  <td>{sabor.Base === "PG" ? sabor.GramsPgSabores : sabor.GramsVgSabores}</td>
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
      )}
    </div>
  );
}

export default Recetas;
