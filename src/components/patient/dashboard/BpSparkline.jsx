import React from 'react';

function BpSparkline({ values = [122, 124, 121, 125, 123, 126, 124] }) {
  if (!values.length) return null;

  const width = 220;
  const height = 56;
  const paddingX = 4;
  const paddingY = 6;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values.map((value, index) => {
    const x = paddingX + (index / Math.max(values.length - 1, 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((value - min) / range) * (height - paddingY * 2);
    return [x, y];
  });

  const pathD = points
    .map(([x, y], index) => (index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(' ');

  const areaD = [
    `M ${points[0][0]} ${height - paddingY}`,
    ...points.map(([x, y]) => `L ${x} ${y}`),
    `L ${points[points.length - 1][0]} ${height - paddingY}`,
    'Z'
  ].join(' ');

  return (
    <svg
      className="bp-sparkline"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Blood pressure trend, recent readings"
    >
      <defs>
        <linearGradient id="bpLineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="bpAreaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.24)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
        </linearGradient>
      </defs>

      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="10"
        ry="10"
        fill="url(#bpAreaGradient)"
        opacity="0.12"
      />

      <path d={areaD} fill="url(#bpAreaGradient)" />
      <path
        d={pathD}
        fill="none"
        stroke="url(#bpLineGradient)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {points.map(([x, y], index) => (
        <circle
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          cx={x}
          cy={y}
          r={index === points.length - 1 ? 3.4 : 2.2}
          fill="#ffffff"
          stroke={index === points.length - 1 ? '#2563eb' : '#93c5fd'}
          strokeWidth="1.6"
        />
      ))}
    </svg>
  );
}

export default BpSparkline;

