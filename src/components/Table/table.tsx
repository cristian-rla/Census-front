interface TableProps {
  data: any[];
  columns: { key: string; label: string }[];
}

export default function Table({ data, columns }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          return (
            <tr key={index}>
              {columns.map((value, index) => {
                return <td key={value.key}>{row[value.key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
