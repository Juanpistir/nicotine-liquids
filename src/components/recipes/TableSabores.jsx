import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';

const TableSabores = ({
  aromas,
  setAromas,
  error,
  setError,
  calculatedData,
  onSave,
  cantidad,
  nombreEsencia,
  fuerza,
  pgValue,
  vgValue,
  tiempo
}) => {
  const [nuevoAroma, setNuevoAroma] = useState({
    nombre: '',
    porcentaje: '',
    Base: 'PG'
  });

  const columns = useMemo(
    () => [
      {
        header: 'Ingrediente',
        accessorKey: 'nombre',
        cell: info => info.getValue()
      },
      {
        header: 'mL',
        accessorKey: 'mL',
        cell: info => Number(info.getValue()).toFixed(2)
      },
      {
        header: 'Gramos',
        accessorKey: 'gramos',
        cell: info => Number(info.getValue()).toFixed(2)
      },
      {
        header: '%',
        accessorKey: 'porcentaje',
        cell: info => Number(info.getValue()).toFixed(1)
      },
      {
        header: 'Acciones',
        id: 'acciones',
        cell: info => {
          const row = info.row.original;
          if (row.id === 'nicotine' || row.id === 'pg' || row.id === 'vg' || row.id === 'total') {
            return null;
          }
          return (
            <button
              onClick={() => handleEliminarAroma(row.id)}
              className="text-red-600 hover:text-red-900"
            >
              Eliminar
            </button>
          );
        }
      }
    ],
    []
  );

  const data = useMemo(() => {
    if (!calculatedData || !calculatedData.nicotina) {
      return [];
    }

    const baseData = [
      {
        id: 'nicotine',
        nombre: calculatedData.nicotina.nombre,
        mL: calculatedData.nicotina.mL,
        gramos: calculatedData.nicotina.gramos,
        porcentaje: calculatedData.nicotina.porcentaje
      },
      {
        id: 'pg',
        nombre: calculatedData.pg.nombre,
        mL: calculatedData.pg.mL,
        gramos: calculatedData.pg.gramos,
        porcentaje: calculatedData.pg.porcentaje
      },
      {
        id: 'vg',
        nombre: calculatedData.vg.nombre,
        mL: calculatedData.vg.mL,
        gramos: calculatedData.vg.gramos,
        porcentaje: calculatedData.vg.porcentaje
      },
      ...aromas.map(aroma => ({
        id: aroma.id,
        nombre: `${aroma.nombre} (${aroma.Base})`,
        mL: (aroma.porcentaje * cantidad) / 100,
        gramos: aroma.Base === 'PG' 
          ? (aroma.porcentaje * cantidad) / 100
          : (aroma.porcentaje * cantidad * 1.16) / 100,
        porcentaje: aroma.porcentaje
      })),
      {
        id: 'total',
        nombre: calculatedData.total.nombre,
        mL: calculatedData.total.mL,
        gramos: calculatedData.total.gramos,
        porcentaje: calculatedData.total.porcentaje
      }
    ];
    return baseData;
  }, [aromas, calculatedData, cantidad]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const puedeAgregarAroma = (aroma) => {
    const totalPGActual = aromas
      .filter(a => a.Base === 'PG')
      .reduce((total, a) => total + Number(a.porcentaje), 0);
    
    const totalVGActual = aromas
      .filter(a => a.Base === 'VG')
      .reduce((total, a) => total + Number(a.porcentaje), 0);

    const nuevoPorcentaje = Number(aroma.porcentaje);
    
    if (aroma.Base === 'PG') {
      return totalPGActual + nuevoPorcentaje <= calculatedData.pg.porcentaje;
    } else {
      return totalVGActual + nuevoPorcentaje <= calculatedData.vg.porcentaje;
    }
  };

  const handleAgregarAroma = () => {
    if (!nuevoAroma.nombre || !nuevoAroma.porcentaje) {
      setError('Por favor, completa todos los campos del aroma');
      return;
    }

    const porcentajeNum = Number(nuevoAroma.porcentaje);
    if (porcentajeNum <= 0 || porcentajeNum > 20) {
      setError('El porcentaje debe estar entre 0 y 20%');
      return;
    }

    const nuevoAromaCompleto = {
      ...nuevoAroma,
      id: Date.now(),
      porcentaje: porcentajeNum
    };

    if (puedeAgregarAroma(nuevoAromaCompleto)) {
      setAromas([...aromas, nuevoAromaCompleto]);
      setNuevoAroma({
        nombre: '',
        porcentaje: '',
        Base: 'PG'
      });
      setError('');
    } else {
      setError(`No hay suficiente ${nuevoAromaCompleto.Base} disponible para agregar este aroma`);
    }
  };

  const handleEliminarAroma = (id) => {
    setAromas(aromas.filter(aroma => aroma.id !== id));
    setError('');
  };

  if (!calculatedData || !calculatedData.nicotina) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {nombreEsencia && (
        <div className="mb-6 bg-gray-50 rounded-lg p-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{nombreEsencia}</h2>
          <p className="text-gray-600">
            {cantidad}ml • {fuerza}mg • {pgValue}/{vgValue} • {tiempo} días de reposo
          </p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Agregar Aroma</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={nuevoAroma.nombre}
              onChange={(e) => setNuevoAroma({ ...nuevoAroma, nombre: e.target.value })}
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
              value={nuevoAroma.porcentaje}
              onChange={(e) => setNuevoAroma({ ...nuevoAroma, porcentaje: e.target.value })}
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
                  checked={nuevoAroma.Base === 'PG'}
                  onChange={(e) => setNuevoAroma({ ...nuevoAroma, Base: e.target.value })}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">PG</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="VG"
                  checked={nuevoAroma.Base === 'VG'}
                  onChange={(e) => setNuevoAroma({ ...nuevoAroma, Base: e.target.value })}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">VG</span>
              </label>
            </div>
          </div>
          <div>
            <button
              onClick={handleAgregarAroma}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Agregar Aroma
            </button>
          </div>
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Composición de la Receta</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className={row.original.id === 'total' ? 'bg-gray-50 font-bold' : ''}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="flex h-full">
              <div
                style={{ width: `${calculatedData.pg.porcentaje}%` }}
                className="bg-blue-500"
                title={`PG: ${calculatedData.pg.porcentaje}%`}
              />
              <div
                style={{ width: `${calculatedData.vg.porcentaje}%` }}
                className="bg-pink-500"
                title={`VG: ${calculatedData.vg.porcentaje}%`}
              />
              <div
                style={{ width: `${calculatedData.nicotina.porcentaje}%` }}
                className="bg-yellow-500"
                title={`Nicotina: ${calculatedData.nicotina.porcentaje}%`}
              />
              <div
                style={{ width: `${calculatedData.porcentajeRestante}%` }}
                className="bg-purple-500"
                title={`Aromas: ${calculatedData.porcentajeRestante}%`}
              />
            </div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-blue-500">PG: {calculatedData.pg.porcentaje}%</span>
            <span className="text-pink-500">VG: {calculatedData.vg.porcentaje}%</span>
            <span className="text-yellow-500">Nicotina: {calculatedData.nicotina.porcentaje}%</span>
            <span className="text-purple-500">Aromas: {calculatedData.porcentajeRestante}%</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onSave}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Guardar Receta
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableSabores;
