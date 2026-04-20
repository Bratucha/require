import React, { useState, useEffect, useCallback } from 'react';
import KPITile from './KPITile';
import './KPIDashboard.css';

const DEFAULT_KPIS = [
  { id: 'revenue',      label: 'Umsatz',               current: 84000, target: 90000, unit: 'EUR' },
  { id: 'tickets',      label: 'Offene Tickets',        current: 23,    target: 20,    unit: ''    },
  { id: 'satisfaction', label: 'Kundenzufriedenheit',   current: 4.1,   target: 4.5,   unit: '/5'  },
  { id: 'delivery',     label: 'Lieferzeit',            current: 3.8,   target: 3.5,   unit: 'Tage'},
];

const REFRESH_MS = 5 * 60 * 1000;

const KPIDashboard = ({ fetchKPIs }) => {
  const [kpis, setKpis] = useState(DEFAULT_KPIS);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [dragIndex, setDragIndex] = useState(null);

  const refresh = useCallback(async () => {
    if (fetchKPIs) {
      const data = await fetchKPIs();
      setKpis(data);
    }
    setLastUpdated(new Date());
  }, [fetchKPIs]);

  useEffect(() => {
    const id = setInterval(refresh, REFRESH_MS);
    return () => clearInterval(id);
  }, [refresh]);

  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) return;
    const next = [...kpis];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(dropIndex, 0, moved);
    setKpis(next);
    setDragIndex(null);
  };

  return (
    <div className="kpi-dashboard">
      <div className="kpi-dashboard__header">
        <h1>KPI Dashboard</h1>
        <span className="kpi-dashboard__updated">
          Zuletzt aktualisiert: {lastUpdated.toLocaleTimeString('de-DE')}
        </span>
      </div>
      <div className="kpi-dashboard__grid">
        {kpis.map((kpi, index) => (
          <KPITile
            key={kpi.id}
            kpi={kpi}
            index={index}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default KPIDashboard;