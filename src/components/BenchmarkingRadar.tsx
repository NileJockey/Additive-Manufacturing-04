import React, { useState } from 'react';
import { BENCHMARKING_METHODS, BenchmarkingMethod } from '../data/waamReviewData';

const AXES: { key: keyof BenchmarkingMethod['radarScores']; label: string }[] = [
  { key: 'depositionSpeed', label: 'DEPOSITION SPEED' },
  { key: 'buildEnvelope', label: 'BUILD ENVELOPE' },
  { key: 'feedstockEconomy', label: 'FEEDSTOCK ECONOMY' },
  { key: 'materialUtilization', label: 'MATERIAL EFFICIENCY' },
  { key: 'surfaceFinish', label: 'SURFACE FINISH (Ra)' },
  { key: 'geometricResolution', label: 'FEATURE RESOLUTION' }
];

export const BenchmarkingRadar: React.FC = () => {
  const [compareId, setCompareId] = useState<'lpbf' | 'lded' | 'cnc'>('lpbf');

  const waamMethod = BENCHMARKING_METHODS.find((m) => m.id === 'waam')!;
  const compareMethod = BENCHMARKING_METHODS.find((m) => m.id === compareId)!;

  const center = 150;
  const maxRadius = 96;

  const computePolygonPoints = (scores: BenchmarkingMethod['radarScores']) => {
    return AXES.map((axis, idx) => {
      const angle = (Math.PI * 2 * idx) / AXES.length - Math.PI / 2;
      const value = scores[axis.key] / 100;
      const r = value * maxRadius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500 font-mono-tabular">
            MULTI-AXIS CAPABILITY & ECONOMIC BENCHMARKING
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mt-0.5">
            WAAM (DED-Arc) vs. Alternative Metal Manufacturing Modalities
          </h3>
        </div>

        {/* Interactive Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {(['lpbf', 'lded', 'cnc'] as const).map((id) => {
            const m = BENCHMARKING_METHODS.find((item) => item.id === id)!;
            return (
              <button
                key={id}
                onClick={() => setCompareId(id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  compareId === id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                vs. {m.shortName}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* Left Radar SVG (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <svg viewBox="0 0 300 300" className="w-full max-w-[310px] h-auto">
            {/* Concentric Hexagonal Grid Rings */}
            {[0.25, 0.5, 0.75, 1.0].map((level) => {
              const pts = AXES.map((_, idx) => {
                const angle = (Math.PI * 2 * idx) / AXES.length - Math.PI / 2;
                const r = level * maxRadius;
                return `${(center + r * Math.cos(angle)).toFixed(1)},${(center + r * Math.sin(angle)).toFixed(1)}`;
              }).join(' ');
              return (
                <polygon
                  key={level}
                  points={pts}
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1"
                  strokeDasharray={level < 1 ? '2,2' : undefined}
                />
              );
            })}

            {/* Radial Axes & Labels */}
            {AXES.map((axis, idx) => {
              const angle = (Math.PI * 2 * idx) / AXES.length - Math.PI / 2;
              const xEnd = center + maxRadius * Math.cos(angle);
              const yEnd = center + maxRadius * Math.sin(angle);
              const labelR = maxRadius + 24;
              const xLabel = center + labelR * Math.cos(angle);
              const yLabel = center + labelR * Math.sin(angle);

              return (
                <g key={axis.key}>
                  <line
                    x1={center}
                    y1={center}
                    x2={xEnd}
                    y2={yEnd}
                    stroke="#CBD5E1"
                    strokeWidth="1"
                  />
                  <text
                    x={xLabel}
                    y={yLabel}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#334155"
                    fontSize="8.5"
                    fontFamily="var(--font-mono)"
                    fontWeight="600"
                  >
                    {axis.label}
                  </text>
                </g>
              );
            })}

            {/* Comparison Method Polygon (Amber Dashed) */}
            <polygon
              points={computePolygonPoints(compareMethod.radarScores)}
              fill="rgba(217, 119, 6, 0.14)"
              stroke="#D97706"
              strokeWidth="2"
              strokeDasharray="4,3"
            />

            {/* WAAM Polygon (Cyan Solid) */}
            <polygon
              points={computePolygonPoints(waamMethod.radarScores)}
              fill="rgba(2, 132, 199, 0.22)"
              stroke="#0284C7"
              strokeWidth="2.2"
            />
          </svg>

          {/* Legend */}
          <div className="flex items-center gap-6 text-xs font-mono-tabular mt-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 inline-block bg-sky-600/30 border-2 border-sky-600" />
              <span className="font-semibold text-slate-900">WAAM (DED-Arc)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 inline-block bg-amber-600/20 border-2 border-dashed border-amber-600" />
              <span className="font-semibold text-slate-700">{compareMethod.shortName}</span>
            </div>
          </div>
        </div>

        {/* Right Quantitative Comparison Table (7 cols) */}
        <div className="lg:col-span-7 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-mono-tabular text-slate-500">
                <th className="py-2.5 pr-4 font-semibold">PARAMETER</th>
                <th className="py-2.5 px-4 font-semibold text-sky-800 bg-sky-50/50">
                  WAAM (DED-Arc)
                </th>
                <th className="py-2.5 pl-4 font-semibold text-amber-800">
                  {compareMethod.shortName}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              <tr>
                <td className="py-3 pr-4 font-medium text-slate-700">Feedstock Form</td>
                <td className="py-3 px-4 font-mono-tabular text-slate-900 bg-sky-50/30">
                  {waamMethod.feedstockType}
                </td>
                <td className="py-3 pl-4 font-mono-tabular text-slate-700">
                  {compareMethod.feedstockType}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-slate-700">Feedstock Cost ($/kg)</td>
                <td className="py-3 px-4 font-mono-tabular font-semibold text-emerald-700 bg-sky-50/30">
                  {waamMethod.feedstockCostUsdKg}
                </td>
                <td className="py-3 pl-4 font-mono-tabular text-slate-700">
                  {compareMethod.feedstockCostUsdKg}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-slate-700">Deposition / Removal Rate</td>
                <td className="py-3 px-4 font-mono-tabular font-semibold text-sky-800 bg-sky-50/30">
                  {waamMethod.depositionRateKgHr}
                </td>
                <td className="py-3 pl-4 font-mono-tabular text-slate-700">
                  {compareMethod.depositionRateKgHr}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-slate-700">Max Build Envelope</td>
                <td className="py-3 px-4 font-mono-tabular text-slate-900 bg-sky-50/30">
                  {waamMethod.maxBuildEnvelope}
                </td>
                <td className="py-3 pl-4 font-mono-tabular text-slate-700">
                  {compareMethod.maxBuildEnvelope}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-slate-700">As-Built Surface Roughness</td>
                <td className="py-3 px-4 font-mono-tabular text-slate-900 bg-sky-50/30">
                  {waamMethod.surfaceRoughnessRaUm}
                </td>
                <td className="py-3 pl-4 font-mono-tabular text-slate-700">
                  {compareMethod.surfaceRoughnessRaUm}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-slate-700">Dimensional Tolerance</td>
                <td className="py-3 px-4 font-mono-tabular text-slate-900 bg-sky-50/30">
                  {waamMethod.dimensionalToleranceMm}
                </td>
                <td className="py-3 pl-4 font-mono-tabular text-slate-700">
                  {compareMethod.dimensionalToleranceMm}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-slate-700">Typical Buy-to-Fly Ratio</td>
                <td className="py-3 px-4 font-mono-tabular font-semibold text-emerald-700 bg-sky-50/30">
                  {waamMethod.buyToFlyRatio}
                </td>
                <td className="py-3 pl-4 font-mono-tabular text-slate-700">
                  {compareMethod.buyToFlyRatio}
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-slate-700">System Capital Cost (CAPEX)</td>
                <td className="py-3 px-4 font-mono-tabular text-slate-900 bg-sky-50/30">
                  {waamMethod.capitalEquipmentCost}
                </td>
                <td className="py-3 pl-4 font-mono-tabular text-slate-700">
                  {compareMethod.capitalEquipmentCost}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
