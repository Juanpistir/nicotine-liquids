import React from "react";
import { useState } from "react";
import Table from "./Table";

function Form() {
  const [nombreEsencia, setNombreEsencia] = useState("");

  const [pgValue, setPgValue] = useState(50);
  const [vgValue, setVgValue] = useState(50);
  const [pgNValue, setPgNValue] = useState(0);
  const [vgNValue, setVgNValue] = useState(100);
  const [fuerzaNicotina, setFuerzaNicotina] = useState(100);
  const [cantidad, setCantidad] = useState(30);
  const [fuerza, setFuerza] = useState(25);
  const [tiempo, setTiempo] = useState(3);

  const [error, setError] = useState(0);

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

  return (
    <div>
      <h2>Principal</h2>
      <div>
        <input
          placeholder="Nombre de la esencia"
          type="text"
          onChange={(e) => setNombreEsencia(e.target.value)}
          value={nombreEsencia}
        />
      </div>
      <label>Cantidad a realizar</label>
      <input
        name="cantidad"
        type="number"
        placeholder="ml"
        min="0"
        onChange={(e) => setCantidad(e.target.value)}
        value={cantidad}
      />
      <label>Nicotina deseada en la esencia</label>
      <input
        name="fuerza"
        type="number"
        placeholder="mg"
        min="0"
        onChange={(e) => setFuerza(e.target.value)}
        value={fuerza}
      />
      <div>
        <label>PG deseado</label>
        <div>
          <input
            name="ratioPG"
            type="number"
            placeholder="PG"
            onChange={handleRatioChange}
            value={pgValue}
          />
          <label>VG deseado</label>
          <input
            name="ratioVG"
            type="number"
            placeholder="VG"
            onChange={(e) =>
              handleRatioChange({
                target: { value: 100 - parseInt(e.target.value, 10) },
              })
            }
            value={vgValue}
          />
        </div>
        <div>{error}</div>
      </div>
      <hr></hr>
      <h2>Nicotina</h2>
      <label>Fuerza de la base de nicotina</label>
      <input
        name="fuerzan"
        type="number"
        placeholder="mg"
        min="0"
        onChange={(e) => setFuerzaNicotina(e.target.value)}
        value={fuerzaNicotina}
      />
      <label>Contenido PG de nicotina</label>
      <div>
        <input
          name="rationNicotinePG"
          type="number"
          placeholder="PG"
          onChange={(e) =>
            handleNicotineRatioChange({
              target: { value: parseInt(e.target.value, 10) },
            })
          }
          value={pgNValue}
        />
        <label>Contenido VG de nicotina</label>
        <input
          name="rationNicotineVG"
          type="number"
          placeholder="VG"
          onChange={(e) =>
            handleNicotineRatioChange({
              target: { value: 100 - parseInt(e.target.value, 10) },
            })
          }
          value={vgNValue}
        />
      </div>
      <div>{error}</div>
      <label>Tiempo sugerido de remojo</label>
      <input
        name="tiempo"
        type="number"
        placeholder="Días"
        onChange={(e) => setTiempo(e.target.value)}
        value={tiempo}
      />
      <hr></hr>
      <h2>Tabla</h2>
      <Table
        nombreEsencia={nombreEsencia}
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
