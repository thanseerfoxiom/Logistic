import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';
import Pagination from './Pagination';

export default function Table({ data, columns, pagination, setPagination }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
    pageCount: Math.ceil(data?.length / pagination.pageSize),
  });

  return (
    <>
      <div className="userDatatable mt-1 p-2 table-responsive">
        {/* 1) Set table-layout: fixed and width: 100% */}
        <table
          className="table table--default body-px-25"
          style={{
            tableLayout: 'fixed', // Ensures columns use the width you set
            width: '100%',
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // Use a 'size' property on the column, or default to auto
                  // console.log("header.column.columnDef.size",header.column.columnDef.size)
                  const columnSize = header.column.columnDef.size || 'auto';
                  // console.log(";;;;;;;;;;;;;",columnSize)
                  return (
                    <th
                      key={header.id}
                      style={{
                        // textAlign: 'center',
                        width: `${columnSize}px`, // Must set <th> width for fixed layout
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const columnSize = cell.column.columnDef.size || 'auto';
                    const isTruncated =
                      cell.column.columnDef.isTruncated || false;
                    const alignment = cell.column.columnDef.align || 'left';

                    let alignmentClass = 'text-left';
                    if (alignment === 'center') alignmentClass = 'text-center';
                    else if (alignment === 'right') alignmentClass = 'text-right';

                    return (
                      <td
                        key={cell.id}
                        className={`px-4 py-2 border border-gray-200 text-gray-700 text-sm ${
                          isTruncated ? 'truncate' : ''
                        } ${alignmentClass}`}
                        style={{
                          width: `${columnSize}px`,
                          whiteSpace: 'normal', // allows multi-line wrap
                          wordBreak: 'break-word', // or "break-all"
                          overflowWrap: 'anywhere',
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-3 text-center text-gray-500">
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination table={table} />
    </>
  );
}
