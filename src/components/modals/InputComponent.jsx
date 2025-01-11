import React, { useState } from 'react';
import ModalMensaje from './ModalMensaje';

const InputComponent = ({ onAñadirSabor }) => {
  const [sabor, setSabor] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [Base, setBase] = useState('PG');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');

  const handleAñadirSabor = () => {
    if (!sabor || !porcentaje) {
      setMensajeModal('Por favor, completa todos los campos');
      setMostrarModal(true);
      return;
    }

    const porcentajeNum = Number(porcentaje);
    if (porcentajeNum <= 0 || porcentajeNum > 20) {
      setMensajeModal('El porcentaje debe estar entre 0 y 20%');
      setMostrarModal(true);
      return;
    }

    const nuevoSabor = {
      id: Date.now(),
      nombre: sabor,
      porcentaje: porcentajeNum,
      Base
    };

    onAñadirSabor(nuevoSabor);
    
    // Limpiar los campos
    setSabor('');
    setPorcentaje('');
    setBase('PG');
    
    setMensajeModal('Aroma agregado correctamente');
    setMostrarModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agregar Aroma</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            value={sabor}
            onChange={(e) => setSabor(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Nombre del aroma"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Porcentaje
          </label>
          <input
            type="number"
            value={porcentaje}
            onChange={(e) => setPorcentaje(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="%"
            min="0"
            max="20"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Base
          </label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="PG"
                checked={Base === 'PG'}
                onChange={(e) => setBase(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">PG</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="VG"
                checked={Base === 'VG'}
                onChange={(e) => setBase(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">VG</span>
            </label>
          </div>
        </div>
        <div>
          <button
            onClick={handleAñadirSabor}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Agregar Aroma
          </button>
        </div>
      </div>

      <ModalMensaje
        mensaje={mensajeModal}
        mostrar={mostrarModal}
        onClose={() => setMostrarModal(false)}
      />
    </div>
  );
};

export default InputComponent;
