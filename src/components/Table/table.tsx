"use client";
import { useState } from "react";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  totalRows: number;
  rowsPerPage: number;
}

export default function Table<T>({
  data,
  columns,
  totalRows,
  rowsPerPage,
}: TableProps<T>) {
  const [actualPage, setActualPage] = useState(1);
  return (
    <div className="w-full bg-surface-container rounded-lg overflow-hidden">
      <div className="w-full bg-surface-container-lowest">
        <table className="w-full border-collapse">
          <thead className="bg-surface-container/50 rounded-lg">
            <tr className="uppercase tracking-wider text-xs text-slate-500">
              {columns.map((column) => (
                <th className="text-left p-4" key={String(column.key)}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              return (
                <tr key={index}>
                  {columns.map((col, index) => {
                    return (
                      <td
                        className="p-4 text-sm text-on-surface-container"
                        key={String(col.key)}
                      >
                        {col.render
                          ? col.render(row)
                          : (row as any)[String(col.key)]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-row items-center justify-between p-4">
          <p>{`Showing ${1 + (actualPage - 1) * rowsPerPage} to ${actualPage * rowsPerPage}`}</p>
        </div>
      </div>
    </div>
  );
}
