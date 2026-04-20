import React, { useState, useMemo } from "react";
import * as XLSX from "xlsx";

const employees = [];

export default function EmployeeTable() {
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [filterPosition, setFilterPosition] = useState("");

  const filtered = useMemo(() =>
    employees.filter(e => !filterPosition || e.position === filterPosition),
    [filterPosition]
  );

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    const val = sortDir === "asc" ? 1 : -1;
    return a[sortKey] > b[sortKey] ? val : -val;
  }), [filtered, sortKey, sortDir]);

  const avgSalaryByDept = useMemo(() => {
    const groups = {};
    filtered.forEach(e => {
      if (!groups[e.department]) groups[e.department] = [];
      groups[e.department].push(e.salary);
    });
    return Object.fromEntries(
      Object.entries(groups).map(([dept, salaries]) => [
        dept,
        (salaries.reduce((a, b) => a + b, 0) / salaries.length).toFixed(2),
      ])
    );
  }, [filtered]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const exportCSV = () => {
    const rows = sorted.map(e => Object.values(e).join(",")).join("\n");
    const blob = new Blob([Object.keys(sorted[0]).join(",") + "\n" + rows], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "employees.csv"; a.click();
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sorted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    XLSX.writeFile(wb, "employees.xlsx");
  };

  const positions = [...new Set(employees.map(e => e.position))];

  return (
    <div>
      <h2>Mitarbeiterübersicht</h2>
      <div>
        <label>Filter Position: </label>
        <select value={filterPosition} onChange={e => setFilterPosition(e.target.value)}>
          <option value="">Alle</option>
          {positions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <button onClick={exportCSV}>Export CSV</button>
        <button onClick={exportExcel}>Export Excel</button>
      </div>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            {["name","department","position","startDate","salary"].map(col => (
              <th key={col} onClick={() => handleSort(col)} style={{cursor:"pointer"}}>
                {col} {sortKey === col ? (sortDir === "asc" ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((e, i) => (
            <tr key={i}>
              <td>{e.name}</td>
              <td>{e.department}</td>
              <td>{e.position}</td>
              <td>{e.startDate}</td>
              <td>{e.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Durchschnittsgehalt pro Abteilung</h3>
      <ul>
        {Object.entries(avgSalaryByDept).map(([dept, avg]) => (
          <li key={dept}>{dept}: {avg} EUR</li>
        ))}
      </ul>
    </div>
  );
}
