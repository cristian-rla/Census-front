"use client";
import { useEffect, useState } from "react";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  fetchData: (page: number) => T[];
  columns: Column<T>[];
  totalRows: number;
  rowsPerPage: number;
}

export default function Table<T>({
  columns,
  totalRows,
  rowsPerPage,
  fetchData,
}: TableProps<T>) {
  const [actualPage, setActualPage] = useState(1);
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    setData(fetchData(actualPage));
  }, [actualPage]);

  return (
    <div className="w-full bg-surface-container-lowest rounded-sm overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-surface-container-low rounded-lg">
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
                {columns.map((col, _) => {
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
      <div className="flex flex-row items-center justify-between p-4 bg-surface-container-low">
        <p className="text-xs font-semibold text-on-surface-container">{`Showing ${1 + (actualPage - 1) * rowsPerPage} to ${Math.min(actualPage * rowsPerPage, totalRows)} of ${totalRows}`}</p>
        <div className="text-on-surface-container">
          <button
            className="material-symbols-outlined"
            onClick={() => setActualPage(1)}
          >
            keyboard_double_arrow_left
          </button>
          <button
            className="material-symbols-outlined"
            onClick={() => {
              setActualPage((p) => Math.max(p - 1, 1));
            }}
          >
            chevron_left
          </button>
          <button
            className="material-symbols-outlined"
            onClick={() => {
              setActualPage((p) =>
                p * rowsPerPage + 1 <= totalRows ? p + 1 : p,
              );
            }}
          >
            chevron_right
          </button>
          <button
            className="material-symbols-outlined"
            onClick={() =>
              setActualPage(
                (p) =>
                  Math.floor(totalRows / rowsPerPage) +
                  (totalRows % rowsPerPage === 0 ? 0 : 1),
              )
            }
          >
            keyboard_double_arrow_right
          </button>
        </div>
      </div>
    </div>
  );
}
