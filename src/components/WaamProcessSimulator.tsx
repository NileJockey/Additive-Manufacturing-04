import React, { useState, useMemo } from 'react';
import { Sliders, Activity, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';

interface PresetConfig {
  name: string;
  alloy: 'Ti-6Al-4V' | 'AA 2319 (Al-Cu)' | 'AISI 316L' | 'Inconel 718';
  process: 'CMT (GMAW)' | 'PAW' | 'GTAW';
  currentAmp: number;
  voltageV: number;
  travelSpeedMmSec: number;
  wireFeedMMin: number;
  wireDiameterMm: 1.2 | 1.6;
  partMassKg: number;
  legacyBtfRatio: number;
}

const PRESETS: PresetConfig[] = [
  {
    name: 'Aerospace Ti-6Al-4V Rib (PAW)',
    alloy: 'Ti-6Al-4V',
    process: 'PAW',
    currentAmp: 185,
    voltageV: 21.5,
    travelSpeedMmSec: 6.5,
    wireFeedMMin: 2.8,
    wireDiameterMm: 1.2,
    partMassKg: 22,
    legacyBtfRatio: 11.5
  },
  {
    name: 'Marine Aluminum Bulkhead (CMT)',
    alloy: 'AA 2319 (Al-Cu)',
    process: 'CMT (GMAW)',
    currentAmp: 140,
    voltageV: 15.2,
    travelSpeedMmSec: 10.0,
    wireFeedMMin: 6.2,
    wireDiameterMm: 1.2,
    partMassKg: 35,
    legacyBtfRatio: 8.0
  },
  {
    name: 'Heavy Structural 316L Node (GMAW)',
    alloy: 'AISI 316L',
    process: 'CMT (GMAW)',
    currentAmp: 230,
    voltageV: 24.0,
    travelSpeedMmSec: 8.5,
    wireFeedMMin: 7.5,
    wireDiameterMm: 1.2,
    partMassKg: 120,
    legacyBtfRatio: 4.5
  },
  {
    name: 'Turbine Inconel 718 Ring (GTAW)',
    alloy: 'Inconel 718',
    process: 'GTAW',
    currentAmp: 165,
    voltageV: 14.5,
    travelSpeedMmSec: 5.0,
    wireFeedMMin: 2.2,
    wireDiameterMm: 1.2,
    partMassKg: 45,
    legacyBtfRatio: 9.2
  }
];

const ALLOY_DENSITY_G_CM3: Record<PresetConfig['alloy'], number> = {
  'Ti-6Al-4V': 4.43,
  'AA 2319 (Al-Cu)': 2.84,
  'AISI 316L': 7.99,
  'Inconel 718': 8.19
};

const ALLOY_WIRE_COST_USD_KG: Record<PresetConfig['alloy'], number> = {
  'Ti-6Al-4V': 125,
  'AA 2319 (Al-Cu)': 38,
  'AISI 316L': 19,
  'Inconel 718': 110
};

const ALLOY_BILLET_COST_USD_KG: Record<PresetConfig['alloy'], number> = {
  'Ti-6Al-4V': 85,
  'AA 2319 (Al-Cu)': 22,
  'AISI 316L': 12,
  'Inconel 718': 78
};

const THERMAL_EFFICIENCY: Record<PresetConfig['process'], number> = {
  'CMT (GMAW)': 0.85,
  'PAW': 0.65,
  'GTAW': 0.68
};

export const WaamProcessSimulator: React.FC = () => {
  const [alloy, setAlloy] = useState<PresetConfig['alloy']>('Ti-6Al-4V');
  const [process, setProcess] = useState<PresetConfig['process']>('PAW');
  const [currentAmp, setCurrentAmp] = useState<number>(185);
  const [voltageV, setVoltageV] = useState<number>(21.5);
  const [travelSpeedMmSec, setTravelSpeedMmSec] = useState<number>(6.5);
  const [wireFeedMMin, setWireFeedMMin] = useState<number>(2.8);
  const [wireDiameterMm, setWireDiameterMm] = useState<1.2 | 1.6>(1.2);
  const [partMassKg, setPartMassKg] = useState<number>(22);
  const [legacyBtfRatio, setLegacyBtfRatio] = useState<number>(11.5);

  const applyPreset = (preset: PresetConfig) => {
    setAlloy(preset.alloy);
    setProcess(preset.process);
    setCurrentAmp(preset.currentAmp);
    setVoltageV(preset.voltageV);
    setTravelSpeedMmSec(preset.travelSpeedMmSec);
    setWireFeedMMin(preset.wireFeedMMin);
    setWireDiameterMm(preset.wireDiameterMm);
    setPartMassKg(preset.partMassKg);
    setLegacyBtfRatio(preset.legacyBtfRatio);
  };

  const metrics = useMemo(() => {
    const eta = THERMAL_EFFICIENCY[process];
    const arcPowerKw = (currentAmp * voltageV) / 1000;
    // Linear heat input (kJ/mm) = (eta * V * I) / (travelSpeed * 1000)
    const linearHeatInputKjMm = (eta * currentAmp * voltageV) / (travelSpeedMmSec * 1000);

    // Wire cross sectional area (mm^2)
    const wireAreaMm2 = Math.PI * Math.pow(wireDiameterMm / 2, 2);
    // Volumetric feed rate (mm^3 / s) = wireArea (mm^2) * (wireFeedMMin * 1000 / 60)
    const wireFeedMmSec = (wireFeedMMin * 1000) / 60;
    const volumePerSecMm3 = wireAreaMm2 * wireFeedMmSec;

    // Mass deposition rate (kg/h)
    const densityGCm3 = ALLOY_DENSITY_G_CM3[alloy]; // g/cm^3 == g / 1000 mm^3
    const massPerSecGrams = (volumePerSecMm3 / 1000) * densityGCm3;
    const depositionRateKgHr = (massPerSecGrams * 3600) / 1000;

    // Bead cross-sectional area (mm^2) = volumePerSecMm3 / travelSpeedMmSec
    const beadAreaMm2 = volumePerSecMm3 / travelSpeedMmSec;
    // Approximate parabolic bead geometry: Area ≈ (2/3) * W * H
    // Aspect ratio W/H depends on heat input (higher heat wets out wider)
    const wettingFactor = Math.min(Math.max(2.2 + linearHeatInputKjMm * 2.8, 2.4), 6.2);
    const beadHeightMm = Math.sqrt((1.5 * beadAreaMm2) / wettingFactor);
    const beadWidthMm = beadHeightMm * wettingFactor;

    // WAAM Buy-to-Fly ratio (typically 1.25 to 1.65 depending on bead waviness)
    const waamBtfRatio = Number((1.18 + beadHeightMm * 0.09).toFixed(2));
    const waamPreformMassKg = partMassKg * waamBtfRatio;
    const legacyBilletMassKg = partMassKg * legacyBtfRatio;
    const scrapSavedKg = Math.max(0, legacyBilletMassKg - waamPreformMassKg);

    const waamMaterialCost = waamPreformMassKg * ALLOY_WIRE_COST_USD_KG[alloy];
    const legacyMaterialCost = legacyBilletMassKg * ALLOY_BILLET_COST_USD_KG[alloy];
    const buildArcHours = waamPreformMassKg / Math.max(0.2, depositionRateKgHr);

    // Regime diagnostic
    let regimeState: 'NOMINAL' | 'ELEVATED HEAT' | 'LACK OF FUSION RISK' = 'NOMINAL';
    let regimeNote = 'Balanced energy-to-mass ratio; stable wetting angle and controlled HAZ.';
    if (linearHeatInputKjMm > 0.85) {
      regimeState = 'ELEVATED HEAT';
      regimeNote = 'High linear heat input (> 0.85 kJ/mm): Risk of coarse columnar β-grain growth, excessive pool slumping, or intermetallic precipitation.';
    } else if (linearHeatInputKjMm < 0.22) {
      regimeState = 'LACK OF FUSION RISK';
      regimeNote = 'Low linear heat input (< 0.22 kJ/mm): High wetting contact angle (> 90°); risk of inter-run lack-of-fusion voids.';
    }

    return {
      eta,
      arcPowerKw,
      linearHeatInputKjMm,
      depositionRateKgHr,
      beadWidthMm,
      beadHeightMm,
      waamBtfRatio,
      waamPreformMassKg,
      legacyBilletMassKg,
      scrapSavedKg,
      waamMaterialCost,
      legacyMaterialCost,
      buildArcHours,
      regimeState,
      regimeNote
    };
  }, [alloy, process, currentAmp, voltageV, travelSpeedMmSec, wireFeedMMin, wireDiameterMm, partMassKg, legacyBtfRatio]);

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      {/* Top Bar of Simulator */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-400 font-mono-tabular">
            <Sliders className="w-3.5 h-3.5" />
            <span>INTERACTIVE THERMO-MECHANICAL & DEPOSITION CALCULATOR</span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-white mt-0.5">
            First-Principles WAAM Process Window & Buy-to-Fly Economics Simulator
          </h3>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                alloy === preset.alloy && process === preset.process
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Split Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Parameter Column (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/60 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Feedstock Alloy System
              </label>
              <select
                value={alloy}
                onChange={(e) => setAlloy(e.target.value as PresetConfig['alloy'])}
                className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-sky-600"
              >
                <option value="Ti-6Al-4V">Ti-6Al-4V (ρ = 4.43 g/cm³)</option>
                <option value="AA 2319 (Al-Cu)">AA 2319 Al-Cu (ρ = 2.84 g/cm³)</option>
                <option value="AISI 316L">AISI 316L Steel (ρ = 7.99 g/cm³)</option>
                <option value="Inconel 718">Inconel 718 (ρ = 8.19 g/cm³)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Heat Source Variant (η)
              </label>
              <select
                value={process}
                onChange={(e) => setProcess(e.target.value as PresetConfig['process'])}
                className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-sky-600"
              >
                <option value="CMT (GMAW)">CMT / GMAW (η = 0.85)</option>
                <option value="PAW">Plasma Arc PAW (η = 0.65)</option>
                <option value="GTAW">Gas Tungsten GTAW (η = 0.68)</option>
              </select>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Arc Current (I)</span>
                <span className="font-mono-tabular font-semibold text-slate-900">{currentAmp} A</span>
              </div>
              <input
                type="range"
                min={80}
                max={350}
                step={5}
                value={currentAmp}
                onChange={(e) => setCurrentAmp(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Arc Voltage (U)</span>
                <span className="font-mono-tabular font-semibold text-slate-900">{voltageV.toFixed(1)} V</span>
              </div>
              <input
                type="range"
                min={11.0}
                max={30.0}
                step={0.5}
                value={voltageV}
                onChange={(e) => setVoltageV(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Torch Travel Velocity (v_t)</span>
                <span className="font-mono-tabular font-semibold text-slate-900">{travelSpeedMmSec.toFixed(1)} mm/s</span>
              </div>
              <input
                type="range"
                min={2.5}
                max={18.0}
                step={0.5}
                value={travelSpeedMmSec}
                onChange={(e) => setTravelSpeedMmSec(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Wire Feed Speed (WFS)</span>
                <span className="font-mono-tabular font-semibold text-slate-900">{wireFeedMMin.toFixed(1)} m/min</span>
              </div>
              <input
                type="range"
                min={1.0}
                max={12.0}
                step={0.2}
                value={wireFeedMMin}
                onChange={(e) => setWireFeedMMin(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Final Part Mass</span>
                  <span className="font-mono-tabular font-semibold text-slate-900">{partMassKg} kg</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={250}
                  step={5}
                  value={partMassKg}
                  onChange={(e) => setPartMassKg(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Legacy CNC BTF</span>
                  <span className="font-mono-tabular font-semibold text-slate-900">{legacyBtfRatio.toFixed(1)}:1</span>
                </div>
                <input
                  type="range"
                  min={2.5}
                  max={20.0}
                  step={0.5}
                  value={legacyBtfRatio}
                  onChange={(e) => setLegacyBtfRatio(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Telemetry Readout & Cross-Section Visualizer (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-6 bg-white">
          {/* Primary Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded">
              <div className="text-xs text-slate-500">Linear Heat Input (E)</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-semibold text-slate-900">
                  {metrics.linearHeatInputKjMm.toFixed(2)}
                </span>
                <span className="text-xs font-mono-tabular text-slate-500 ml-1.5">kJ/mm</span>
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono-tabular">
                P = {metrics.arcPowerKw.toFixed(1)} kW · η = {(metrics.eta * 100).toFixed(0)}%
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded">
              <div className="text-xs text-slate-500">Deposition Rate</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-semibold text-sky-700">
                  {metrics.depositionRateKgHr.toFixed(2)}
                </span>
                <span className="text-xs font-mono-tabular text-slate-500 ml-1.5">kg/h</span>
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono-tabular">
                Arc Time: {metrics.buildArcHours.toFixed(1)} hrs
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded">
              <div className="text-xs text-slate-500">Single Bead Geometry</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-semibold text-slate-900">
                  {metrics.beadWidthMm.toFixed(1)}×{metrics.beadHeightMm.toFixed(1)}
                </span>
                <span className="text-xs font-mono-tabular text-slate-500 ml-1">mm</span>
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono-tabular">
                W/H Ratio: {(metrics.beadWidthMm / metrics.beadHeightMm).toFixed(1)}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded">
              <div className="text-xs text-slate-500">WAAM Buy-to-Fly</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-semibold text-emerald-700">
                  {metrics.waamBtfRatio}:1
                </span>
                <span className="text-xs font-mono-tabular text-slate-500 ml-1.5">
                  vs {legacyBtfRatio}:1
                </span>
              </div>
              <div className="text-xs text-emerald-700 mt-1 font-mono-tabular">
                -{metrics.scrapSavedKg.toFixed(0)} kg Scrap Saved
              </div>
            </div>
          </div>

          {/* Visual Schematic of Bead Profile & Buy-to-Fly Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center border-t border-b border-slate-200 py-5">
            {/* Bead Cross-Section SVG */}
            <div className="flex flex-col items-center">
              <div className="text-xs font-semibold text-slate-700 mb-2 self-start">
                Simulated Multi-Layer Bead Cross-Section & CNC Allowance
              </div>
              <svg viewBox="0 0 260 130" className="w-full max-w-[260px] h-auto bg-slate-900 rounded border border-slate-800 p-2">
                {/* Baseplate */}
                <rect x="20" y="105" width="220" height="14" fill="#334155" />
                <text x="130" y="115" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
                  SUBSTRATE BASEPLATE
                </text>

                {/* Deposited Layers (3 stacked beads scaled dynamically) */}
                {[0, 1, 2].map((layerIdx) => {
                  const w = Math.min(160, Math.max(55, metrics.beadWidthMm * 11));
                  const h = Math.min(26, Math.max(12, metrics.beadHeightMm * 7));
                  const yBase = 105 - layerIdx * (h * 0.85);
                  const xLeft = 130 - w / 2;
                  const xRight = 130 + w / 2;
                  return (
                    <path
                      key={layerIdx}
                      d={`M ${xLeft} ${yBase} Q 130 ${yBase - h * 1.45} ${xRight} ${yBase} Z`}
                      fill={layerIdx === 2 ? '#0284C7' : '#0369A1'}
                      fillOpacity={0.75 + layerIdx * 0.1}
                      stroke="#38BDF8"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Dashed CNC Final Net Shape Boundary */}
                {(() => {
                  const w = Math.min(160, Math.max(55, metrics.beadWidthMm * 11)) - 18;
                  const totalH = Math.min(26, Math.max(12, metrics.beadHeightMm * 7)) * 2.55;
                  return (
                    <rect
                      x={130 - w / 2}
                      y={105 - totalH}
                      width={w}
                      height={totalH}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.2"
                      strokeDasharray="3,3"
                    />
                  );
                })()}
                <text x="232" y="20" textAnchor="end" fill="#F59E0B" fontSize="8" fontFamily="monospace">
                  --- CNC Net Wall
                </text>
              </svg>
            </div>

            {/* Raw Material & Cost Bar Comparison */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-700">
                Raw Feedstock Mass & Cost Comparison ({partMassKg} kg Net Part)
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono-tabular mb-1">
                  <span className="text-slate-600">Legacy CNC Billet ({legacyBtfRatio}:1)</span>
                  <span className="font-semibold text-slate-900">
                    {metrics.legacyBilletMassKg.toFixed(0)} kg · ${metrics.legacyMaterialCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded overflow-hidden">
                  <div className="h-full bg-slate-400" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono-tabular mb-1">
                  <span className="text-sky-700 font-semibold">WAAM Near-Net Wire ({metrics.waamBtfRatio}:1)</span>
                  <span className="font-semibold text-sky-700">
                    {metrics.waamPreformMassKg.toFixed(1)} kg · ${metrics.waamMaterialCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-sky-600 transition-all duration-150"
                    style={{
                      width: `${Math.min(100, Math.max(8, (metrics.waamPreformMassKg / metrics.legacyBilletMassKg) * 100))}%`
                    }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Net Feedstock Savings:{' '}
                <strong className="font-mono-tabular text-slate-900">
                  {((1 - metrics.waamPreformMassKg / metrics.legacyBilletMassKg) * 100).toFixed(1)}%
                </strong>{' '}
                mass reduction and{' '}
                <strong className="font-mono-tabular text-emerald-700">
                  ${Math.max(0, metrics.legacyMaterialCost - metrics.waamMaterialCost).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </strong>{' '}
                direct raw material savings per component.
              </p>
            </div>
          </div>

          {/* Metallurgical Regime Status Bar (Non-Hue-Only State Signaling) */}
          <div className="flex items-start gap-3 p-3.5 rounded bg-slate-50 border border-slate-200">
            {metrics.regimeState === 'NOMINAL' ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <div className="flex items-center gap-2 font-mono-tabular font-semibold">
                <span
                  className={
                    metrics.regimeState === 'NOMINAL' ? 'text-emerald-700' : 'text-amber-700'
                  }
                >
                  {metrics.regimeState === 'NOMINAL'
                    ? '● PROCESS WINDOW: NOMINAL CALIBRATION'
                    : `▲ PROCESS WINDOW: ${metrics.regimeState}`}
                </span>
              </div>
              <p className="text-slate-600 mt-0.5 leading-relaxed">{metrics.regimeNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
