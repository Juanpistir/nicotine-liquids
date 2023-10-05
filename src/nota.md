import React, { useState } from 'react';

function Sabores({ pgValue, vgValue, toggleContenido }) {
  const [sabores, setSabores] = useState([]);
  const [contador, setContador] = useState(1);

  // Calcular el porcentaje máximo permitido para los sabores
  const porcentajeMaximoPG = () => {
    return sabores.reduce((total, sabor) => {
      if (sabor.tipo === 'PG') {
        return total + parseFloat(sabor.porcentaje);
      }
      return total;
    }, 0);
  };

  const porcentajeMaximoVG = () => {
    return sabores.reduce((total, sabor) => {
      if (sabor.tipo === 'VG') {
        return total + parseFloat(sabor.porcentaje);
      }
      return total;
    }, 0);
  };

  const calcularLimiteMaximo = (sabor) => {
    const maxPG = pgValue - porcentajeMaximoPG();
    const maxVG = vgValue - porcentajeMaximoVG();
    return sabor.tipo === 'PG' ? maxPG : maxVG;
  };

  const agregarSabor = () => {
    const porcentajeDisponiblePG = pgValue - porcentajeMaximoPG();
    const porcentajeDisponibleVG = vgValue - porcentajeMaximoVG();
    toggleContenido();

    if (porcentajeDisponiblePG > 0 && porcentajeDisponibleVG > 0) {
      setSabores([...sabores, { sabor: '', porcentaje: 0, tipo: '' }]);
      setContador(contador + 1);
    } else {
      alert("No puedes agregar más PG o VG de lo que está permitido según la relación PG/VG.");
    }
  };

  const actualizarSabor = (index, nuevoSabor) => {
    const nuevosSabores = [...sabores];
    nuevosSabores[index].sabor = nuevoSabor;
    setSabores(nuevosSabores);
  };

  const actualizarPorcentaje = (index, nuevoPorcentaje) => {
    const nuevosSabores = [...sabores];
    nuevosSabores[index].porcentaje = nuevoPorcentaje;
    setSabores(nuevosSabores);
  };

  const actualizarTipo = (index, nuevoTipo) => {
    const nuevosSabores = [...sabores];
    nuevosSabores[index].tipo = nuevoTipo;
    setSabores(nuevosSabores);
  };

  return (
    <div>
      <button onClick={agregarSabor}>Añadir Sabor</button>
      {sabores.map((sabor, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Sabor #${index + 1}`}
            value={sabor.sabor}
            onChange={(e) => actualizarSabor(index, e.target.value)}
          />
          <input
            type="number"
            max={calcularLimiteMaximo(sabor)}
            value={sabor.porcentaje}
            onChange={(e) => actualizarPorcentaje(index, e.target.value)}
            onBlur={(e) => {
              const newValue = parseFloat(e.target.value);
              const maxAllowed = calcularLimiteMaximo(sabor);

              if (newValue > maxAllowed) {
                e.target.value = maxAllowed.toString();
                actualizarPorcentaje(index, maxAllowed.toString());
              }
            }}
          />
          <div>
            <label>
              <input
                type="radio"
                name={`tipo${index}`}
                value="PG"
                checked={sabor.tipo === 'PG'}
                onChange={() => actualizarTipo(index, 'PG')}
              />
              PG
            </label>
            <label>
              <input
                type="radio"
                name={`tipo${index}`}
                value="VG"
                checked={sabor.tipo === 'VG'}
                onChange={() => actualizarTipo(index, 'VG')}
              />
              VG
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sabores;
