import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table';

const ResponsiveTable = ({ data, onDelete }) => {
  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    columnHelper.accessor('nombre', {
      header: 'Ingrediente',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('mL', {
      header: 'mL',
      cell: info => {
        const value = info.getValue();
        return typeof value === 'number' ? value.toFixed(2) : '-';
      }
    }),
    columnHelper.accessor('gramos', {
      header: 'Gramos',
      cell: info => {
        const value = info.getValue();
        return typeof value === 'number' ? value.toFixed(2) : '-';
      }
    }),
    columnHelper.accessor('porcentaje', {
      header: '%',
      cell: info => {
        const value = info.getValue();
        return typeof value === 'number' ? value.toFixed(1) : '-';
      }
    }),
    // Solo mostrar el botón de eliminar para elementos que sean aromas
    columnHelper.display({
      id: 'actions',
      cell: props => {
        // Verificar si es un aroma (no es nicotina, pg, vg o total)
        const isAroma = !['nicotine', 'pg', 'vg', 'total'].includes(props.row.original.id);
        return isAroma ? (
          <button
            onClick={() => onDelete?.(props.row.original.id)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            ✕
          </button>
        ) : null;
      }
    })
  ], [onDelete]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
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
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
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
  );
};

export default ResponsiveTable;
