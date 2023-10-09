import React from "react";
import { useState } from "react";
import TableSabores from "./TableSabores";
import "./styles.css";

function Form() {
  const [nombreEsencia, setNombreEsencia] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [pgValue, setPgValue] = useState(50);
  const [vgValue, setVgValue] = useState(50);
  const [pgNValue, setPgNValue] = useState(0);
  const [vgNValue, setVgNValue] = useState(100);
  const [fuerzaNicotina, setFuerzaNicotina] = useState(100);
  const [cantidad, setCantidad] = useState(30);
  const [fuerza, setFuerza] = useState(25);
  const [tiempo, setTiempo] = useState(3);

  const [error, setError] = useState("");

  const handleRatioChange = (e) => {
    const newValue = parseInt(e.target.value, 10);

    // Validación del valor mínimo y máximo
    if (newValue >= 0 && newValue <= 100) {
      setError("");
      setPgValue(newValue);
      setVgValue(100 - newValue); // Calcula VG como complemento de PG
    } else {
      setError("El valor debe estar entre 0 y 100.");
    }
  };

  const handleNicotineRatioChange = (e) => {
    const newValue = parseInt(e.target.value, 10);

    // Validación del valor mínimo y máximo
    if (newValue >= 0 && newValue <= 100) {
      setError("");
      setPgNValue(newValue);
      setVgNValue(100 - newValue); // Calcula VG como complemento de PG
    } else {
      setError("El valor debe estar entre 0 y 100.");
    }
  };

  //<div className="flex flex-nowrap">
  //<div className="flex-auto">

  return (
    <div className="mb-4 mx-2 grid grid-cols-1  md:grid-cols-2 gap-6">
      <div className="mx-auto">
        <h2 className="text-4xl my-2 font-bold neon-text text-slate-700 text-center">
          Principal
        </h2>
        <label className="block">Nombre</label>
        <div className="mb-2">
          <input
            placeholder="Nombre de la esencia"
            type="text"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-pink-600 w-full"
            onChange={(e) => setNombreEsencia(e.target.value)}
            value={nombreEsencia}
          />
        </div>
        <label className="block">Descripción</label>
        <div className="mb-2">
          <textarea
            name="descripcion"
            id="1"
            cols="30"
            rows="10"
            placeholder="Descripción de la receta, detalles importantes para su realización"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-pink-600 w-full h-20"
            onChange={(e) => setDescripcion(e.target.value)}
            value={descripcion}
          ></textarea>
        </div>
        <label className="block">Cantidad a realizar</label>
        <div className="mb-2 flex items-center">
          <input
            name="cantidad"
            type="number"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-pink-600 w-full"
            placeholder="ml"
            min="0"
            onChange={(e) => setCantidad(e.target.value)}
            value={cantidad}
          />
          <span className="bg-gray-200 text-gray-600 p-2 ml-2">mL</span>
        </div>
        <label className="block">Nicotina deseada en la esencia</label>
        <div className="mb-2 flex items-center">
          <input
            name="fuerza"
            type="number"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-pink-600 w-full"
            placeholder="mg"
            min="0"
            onChange={(e) => setFuerza(e.target.value)}
            value={fuerza}
          />
          <span className="bg-gray-200 text-gray-600 p-2 ml-2">Mg</span>
        </div>
        <div>
          <label className="block">Ratio PG/VG deseado</label>
          <div className="mb-2 flex items-center">
            <input
              name="ratioPG"
              type="number"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-pink-600 w-1/2"
              placeholder="PG"
              onChange={handleRatioChange}
              value={pgValue}
            />
            <input
              name="ratioVG"
              type="number"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-pink-600 w-1/2 ml-1"
              placeholder="VG"
              onChange={(e) =>
                handleRatioChange({
                  target: { value: 100 - parseInt(e.target.value, 10) },
                })
              }
              value={vgValue}
            />
            <span className="bg-gray-200 text-gray-600 p-2 ml-2">%</span>
          </div>
          <div>{error}</div>
        </div>
        <h2 className="text-4xl my-4 font-bold neon-text text-slate-700 text-center">
          Nicotina
        </h2>
        <label className="block">Fuerza de la base de nicotina</label>
        <div className="mb-2 flex items-center">
          <input
            name="fuerzan"
            type="number"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-pink-600 w-full"
            placeholder="mg"
            min="0"
            onChange={(e) => setFuerzaNicotina(e.target.value)}
            value={fuerzaNicotina}
          />
          <span className="bg-gray-200 text-gray-600 p-2 ml-2">Mg</span>
        </div>
        <label className="block">Ratio PG/VG de nicotina</label>
        <div className="mb-2 flex items-center">
          <input
            name="rationNicotinePG"
            type="number"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-pink-600 w-1/2"
            placeholder="PG"
            onChange={(e) =>
              handleNicotineRatioChange({
                target: { value: parseInt(e.target.value, 10) },
              })
            }
            value={pgNValue}
          />
          <input
            name="rationNicotineVG"
            type="number"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-pink-600 w-1/2 ml-1"
            placeholder="VG"
            onChange={(e) =>
              handleNicotineRatioChange({
                target: { value: 100 - parseInt(e.target.value, 10) },
              })
            }
            value={vgNValue}
          />
          <span className="bg-gray-200 text-gray-600 p-2 ml-2">%</span>
        </div>

        <label className="block">Tiempo sugerido de remojo</label>
        <div className="mb-2 flex items-center">
          <input
            name="tiempo"
            type="number"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-pink-600 w-full"
            placeholder="Días"
            onChange={(e) => setTiempo(e.target.value)}
            value={tiempo}
          />
          <span className="bg-gray-200 text-gray-600 p-2 ml-2">Días</span>
        </div>
      </div>
      <TableSabores
        nombreEsencia={nombreEsencia}
        descripcion={descripcion}
        cantidad={cantidad}
        fuerza={fuerza}
        fuerzaNicotina={fuerzaNicotina}
        pgValue={pgValue}
        vgValue={vgValue}
        pgNValue={pgNValue}
        vgNValue={vgNValue}
      />
    </div>
  );
}

export default Form;
