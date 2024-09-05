import React from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import Pagination from './Pagination';

export default function Table({data,columns,pagination,setPagination}) {
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state:{pagination},
    onPaginationChange:setPagination,
    pageCount:Math.ceil(data.length/pagination.pageSize)
  });
  return (<>
    <div className="userDatatable mt-1 p-2 table-responsive">
    <table className="table table--default body-px-25">
                            
                              <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                  <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                      <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                      </th>
                                    ))}
                                  </tr>
                                ))}
                              </thead>
                              <tbody>
                                {table.getRowModel().rows.map(row => (
                                  <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                      <td key={cell.id} className='text-ellipsis'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                        </div>
                            <Pagination table={table}   />
                            </>
  )
}
