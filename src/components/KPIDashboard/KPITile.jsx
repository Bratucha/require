import React from 'react';

const TrendArrow = ({ current, target }) => {
  if (current === target) return <span className="trend-neutral">→</span>;
  return current > target
    ? <span className="trend-up">↑</span>
    : <span className="trend-down">↓</span>;
};

const KPITile = ({ kpi, index, onDragStart, onDragOver, onDrop }) => {
  const deviation = Math.abs((kpi.current - kpi.target) / kpi.target) * 100;
  const isAlert = deviation > 10;

  return (
    <div
      className={`kpi-tile${isAlert ? ' kpi-tile--alert' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
    >
      <div className="kpi-tile__header">
        <span className="kpi-tile__label">{kpi.label}</span>
        <TrendArrow current={kpi.current} target={kpi.target} />
      </div>
      <div className="kpi-tile__value">{kpi.current}{kpi.unit && ` ${kpi.unit}`}</div>
      <div className="kpi-tile__target">Ziel: {kpi.target}{kpi.unit && ` ${kpi.unit}`}</div>
      {isAlert && (
        <div className="kpi-tile__alert">Abweichung: {deviation.toFixed(1)}%</div>
      )}
    </div>
  );
};

export default KPITile;