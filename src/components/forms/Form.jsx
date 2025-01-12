import React, { useState, useEffect } from 'react';
import TableSabores from '../recipes/TableSabores';
import ModalMensaje from '../modals/ModalMensaje';

const Form = () => {
  const [formData, setFormData] = useState({
    nombreEsencia: '',
    descripcion: '',
    cantidad: 30,
    fuerza: 3,
    fuerzaNicotina: 100,
    pgValue: 50,
    vgValue: 50,
    pgNValue: 0,  
    vgNValue: 100, 
    tiempo: 14
  });

  const [aromas, setAromas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [error, setError] = useState('');

  const [calculatedData, setCalculatedData] = useState({
    nicotina: null,
    pg: null,
    vg: null,
    total: null,
    porcentajeRestante: 0
  });

  useEffect(() => {
    calcularComponentes();
  }, [formData, aromas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    switch (name) {
      case 'cantidad':
        newValue = Math.max(1, Math.min(1000, Number(value)));
        break;
      case 'fuerza':
        newValue = Math.max(0, Math.min(50, Number(value)));
        break;
      case 'fuerzaNicotina':
        newValue = Math.max(1, Math.min(250, Number(value)));
        break;
      case 'pgValue':
      case 'vgValue':
        newValue = Math.max(0, Math.min(100, Number(value)));
        const otherField = name === 'pgValue' ? 'vgValue' : 'pgValue';
        setFormData(prev => ({
          ...prev,
          [name]: newValue,
          [otherField]: 100 - newValue
        }));
        return;
      case 'pgNValue':
      case 'vgNValue':
        newValue = Math.max(0, Math.min(100, Number(value)));
        const otherNicField = name === 'pgNValue' ? 'vgNValue' : 'pgNValue';
        setFormData(prev => ({
          ...prev,
          [name]: newValue,
          [otherNicField]: 100 - newValue
        }));
        return;
      case 'tiempo':
        newValue = Math.max(1, Math.min(90, Number(value)));
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const calcularComponentes = () => {
    const {
      cantidad,
      fuerza,
      fuerzaNicotina,
      pgValue,
      vgValue,
      pgNValue,
      vgNValue
    } = formData;

    const nicotinaML = (cantidad * fuerza) / fuerzaNicotina;
    const PgNic = nicotinaML * pgNValue * 0.01 * 1.038;
    const VgNic = nicotinaML * vgNValue * 0.01 * 1.261;
    const NicGrams = PgNic + VgNic;
    const nicotinaPorcentaje = (nicotinaML / cantidad) * 100;

    const aromasTotalML = aromas.reduce((total, aroma) => total + ((aroma.porcentaje * cantidad) / 100), 0);
    const aromasTotalGramos = aromas.reduce((total, aroma) => {
      const gramosAroma = aroma.Base === "PG" 
        ? ((aroma.porcentaje * cantidad) / 100)
        : ((aroma.porcentaje * cantidad * 1.16) / 100);
      return total + gramosAroma;
    }, 0);
    const aromasTotalPorcentaje = aromas.reduce((total, aroma) => total + Number(aroma.porcentaje), 0);

    const pgAromasML = aromas
      .filter(aroma => aroma.Base === "PG")
      .reduce((total, aroma) => total + ((aroma.porcentaje * cantidad) / 100), 0);
    
    const vgAromasML = aromas
      .filter(aroma => aroma.Base === "VG")
      .reduce((total, aroma) => total + ((aroma.porcentaje * cantidad) / 100), 0);

    const CantidadPg = cantidad * pgValue * 0.01 - nicotinaML * pgNValue * 0.01 - pgAromasML;
    const CantidadVg = cantidad * vgValue * 0.01 - nicotinaML * vgNValue * 0.01 - vgAromasML;

    const GramsPg = CantidadPg * 1.038;
    const GramsVg = CantidadVg * 1.261;

    const PorcentajePg = (CantidadPg / cantidad) * 100;
    const PorcentajeVg = (CantidadVg / cantidad) * 100;

    const totalML = cantidad;
    const totalGramos = NicGrams + aromasTotalGramos + GramsPg + GramsVg;
    const porcentajeRestante = 100 - (PorcentajePg + PorcentajeVg + nicotinaPorcentaje);

    setCalculatedData({
      nicotina: {
        id: 'nicotine',
        nombre: 'Nicotina',
        mL: Number(nicotinaML.toFixed(2)),
        gramos: Number(NicGrams.toFixed(2)),
        porcentaje: Number(nicotinaPorcentaje.toFixed(1))
      },
      pg: {
        id: 'pg',
        nombre: 'PG',
        mL: Number(CantidadPg.toFixed(2)),
        gramos: Number(GramsPg.toFixed(2)),
        porcentaje: Number(PorcentajePg.toFixed(1))
      },
      vg: {
        id: 'vg',
        nombre: 'VG',
        mL: Number(CantidadVg.toFixed(2)),
        gramos: Number(GramsVg.toFixed(2)),
        porcentaje: Number(PorcentajeVg.toFixed(1))
      },
      total: {
        id: 'total',
        nombre: 'Total',
        mL: Number(totalML.toFixed(2)),
        gramos: Number(totalGramos.toFixed(2)),
        porcentaje: 100
      },
      porcentajeRestante
    });
  };

  const handleGuardarReceta = () => {
    if (!formData.nombreEsencia.trim()) {
      setModalMessage('Por favor, ingresa un nombre para la receta');
      setShowModal(true);
      return;
    }

    // Crear el array completo de datos de la tabla
    const datosTabla = [
      // Nicotina
      {
        id: 'nicotine',
        nombre: 'Nicotina',
        mL: calculatedData.nicotina.mL,
        gramos: calculatedData.nicotina.gramos,
        porcentaje: calculatedData.nicotina.porcentaje
      },
      // PG
      {
        id: 'pg',
        nombre: 'PG',
        mL: calculatedData.pg.mL,
        gramos: calculatedData.pg.gramos,
        porcentaje: calculatedData.pg.porcentaje
      },
      // VG
      {
        id: 'vg',
        nombre: 'VG',
        mL: calculatedData.vg.mL,
        gramos: calculatedData.vg.gramos,
        porcentaje: calculatedData.vg.porcentaje
      },
      // Aromas
      ...aromas.map(aroma => ({
        id: `aroma-${aroma.id}`,
        nombre: `${aroma.nombre} (${aroma.Base})`,
        mL: (formData.cantidad * aroma.porcentaje) / 100,
        gramos: aroma.Base === 'PG' 
          ? ((formData.cantidad * aroma.porcentaje) / 100)
          : ((formData.cantidad * aroma.porcentaje * 1.16) / 100),
        porcentaje: aroma.porcentaje
      })),
      // Total
      {
        id: 'total',
        nombre: 'Total',
        mL: calculatedData.total.mL,
        gramos: calculatedData.total.gramos,
        porcentaje: calculatedData.total.porcentaje
      }
    ];

    const receta = {
      id: Date.now(),
      ...formData,
      aromas: aromas.map(aroma => ({
        id: aroma.id,
        nombre: aroma.nombre,
        porcentaje: aroma.porcentaje,
        Base: aroma.Base
      })),
      datosTabla
    };

    const datosGuardados = JSON.parse(localStorage.getItem('datosGuardados')) || [];
    localStorage.setItem('datosGuardados', JSON.stringify([...datosGuardados, receta]));

    setModalMessage('¡Receta guardada correctamente!');
    setShowModal(true);

    // Resetear el formulario
    setFormData({
      nombreEsencia: '',
      descripcion: '',
      cantidad: 30,
      fuerza: 3,
      fuerzaNicotina: 100,
      pgValue: 50,
      vgValue: 50,
      pgNValue: 0,
      vgNValue: 100,
      tiempo: 14
    });
    setAromas([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-24"> {/* Añadido pt-24 */}
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Calculadora de Líquidos</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre de la Receta
                </label>
                <input
                  type="text"
                  name="nombreEsencia"
                  value={formData.nombreEsencia}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción (opcional)
                </label>
                <input
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cantidad (ml)
                </label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleInputChange}
                  min="1"
                  max="1000"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fuerza deseada (mg)
                </label>
                <input
                  type="number"
                  name="fuerza"
                  value={formData.fuerza}
                  onChange={handleInputChange}
                  min="0"
                  max="50"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fuerza de nicotina (mg)
                </label>
                <input
                  type="number"
                  name="fuerzaNicotina"
                  value={formData.fuerzaNicotina}
                  onChange={handleInputChange}
                  min="1"
                  max="250"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ratio PG/VG Base
                </label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <div>
                    <input
                      type="number"
                      name="pgValue"
                      value={formData.pgValue}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">PG%</span>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="vgValue"
                      value={formData.vgValue}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">VG%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ratio PG/VG Nicotina
                </label>
                <div className="grid grid-cols-2 gap-4 mt-1">
                  <div>
                    <input
                      type="number"
                      name="pgNValue"
                      value={formData.pgNValue}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">PG%</span>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="vgNValue"
                      value={formData.vgNValue}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">VG%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tiempo de reposo (días)
                </label>
                <input
                  type="number"
                  name="tiempo"
                  value={formData.tiempo}
                  onChange={handleInputChange}
                  min="1"
                  max="90"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* TableSabores */}
          <TableSabores
            aromas={aromas}
            setAromas={setAromas}
            error={error}
            setError={setError}
            calculatedData={calculatedData}
            onSave={handleGuardarReceta}
            cantidad={formData.cantidad}
            nombreEsencia={formData.nombreEsencia}
            fuerza={formData.fuerza}
            pgValue={formData.pgValue}
            vgValue={formData.vgValue}
            tiempo={formData.tiempo}
          />
        </div>

        <ModalMensaje
          mostrar={showModal}
          mensaje={modalMessage}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default Form;
