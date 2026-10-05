import React, { useState } from 'react';
import {
  PROCESS_VARIANTS,
  WAAM_ALLOYS,
  INDUSTRIAL_CASE_STUDIES,
  LIMITATION_FAILURE_MODES,
  FUTURE_ROADMAP,
  WaamAlloy
} from './data/waamReviewData';
import { WaamProcessSimulator } from './components/WaamProcessSimulator';
import { BenchmarkingRadar } from './components/BenchmarkingRadar';
import {
  Printer,
  Check,
  Copy,
  ArrowUpRight,
  ChevronRight,
  BookOpen,
  Layers,
  Cpu,
  ShieldAlert,
  Compass
} from 'lucide-react';

import heroImg from './assets/images/waam_hero_deposition_1791189196280.jpg';
import propellerImg from './assets/images/waam_marine_propeller_1791189208867.jpg';
import aerospaceImg from './assets/images/waam_aerospace_spar_1791189220078.jpg';
import microstructureImg from './assets/images/waam_microstructure_grain_1791189230657.jpg';

const IMAGE_MAP = {
  hero: heroImg,
  propeller: propellerImg,
  aerospace: aerospaceImg,
  microstructure: microstructureImg
};

interface ResilientImageProps {
  src: string;
  alt: string;
  caption: string;
  figNumber: string;
  aspectClass?: string;
}

const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  caption,
  figNumber,
  aspectClass = 'aspect-video'
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <figure className="group">
      <div
        className={`relative w-full ${aspectClass} bg-slate-900 border border-slate-200 rounded-lg overflow-hidden`}
      >
        {!imgError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.01]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
            <Layers className="w-8 h-8 text-sky-400 mb-2" />
            <span className="text-xs font-mono-tabular text-sky-400">{figNumber}</span>
            <p className="text-sm font-medium text-white mt-1 max-w-md">{alt}</p>
          </div>
        )}
      </div>
      <figcaption className="mt-2.5 flex items-baseline gap-2 text-xs text-slate-500">
        <span className="font-mono-tabular font-semibold text-slate-700 shrink-0">
          {figNumber}
        </span>
        <span>·</span>
        <span className="italic">{caption}</span>
      </figcaption>
    </figure>
  );
};

export default function App() {
  const [selectedProcessId, setSelectedProcessId] = useState<'gmaw' | 'gtaw' | 'paw'>('gmaw');
  const [selectedAlloyFamily, setSelectedAlloyFamily] = useState<string>('All');
  const [activeAlloy, setActiveAlloy] = useState<WaamAlloy>(WAAM_ALLOYS[0]);
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedLimitationCategory, setSelectedLimitationCategory] = useState<string>('All');
  const [copiedCitation, setCopiedCitation] = useState(false);

  const selectedProcess = PROCESS_VARIANTS.find((p) => p.id === selectedProcessId)!;

  const filteredAlloys =
    selectedAlloyFamily === 'All'
      ? WAAM_ALLOYS
      : WAAM_ALLOYS.filter((a) => a.family === selectedAlloyFamily);

  const filteredCaseStudies =
    selectedSector === 'All'
      ? INDUSTRIAL_CASE_STUDIES
      : INDUSTRIAL_CASE_STUDIES.filter((c) => c.sector === selectedSector);

  const filteredLimitations =
    selectedLimitationCategory === 'All'
      ? LIMITATION_FAILURE_MODES
      : LIMITATION_FAILURE_MODES.filter((l) => l.category === selectedLimitationCategory);

  const handleCopyBibtex = () => {
    const citation = `@article{waam_monograph_2026,
  title={Wire Arc Additive Manufacturing (WAAM / DED-Arc): Process Physics, Metallurgical Compatibility, Limitations, and Industrial Integration},
  journal={Advanced Manufacturing & Materials Engineering Review},
  volume={18},
  pages={104--142},
  year={2026},
  note={ISO/ASTM 52900 & AWS D20.1 Aligned Technical Dossier}
}`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* 1. Strict 3-Zone Top Navigation Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-3.5 no-print">
        <div className="max-w-[1380px] mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-lg font-semibold tracking-tight text-slate-900 font-serif-display whitespace-nowrap"
          >
            WAAM Technical Monograph
          </a>

          {/* Zone 2: 5 single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#process-physics"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Process Physics
            </a>
            <a
              href="#allowed-materials"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Materials
            </a>
            <a
              href="#applications"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Applications
            </a>
            <a
              href="#strengths-limitations"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Strengths & Limits
            </a>
            <a
              href="#future-outlook"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Future Outlook
            </a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyBibtex}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
            >
              {copiedCitation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>BibTeX Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Cite Review</span>
                </>
              )}
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="top" className="flex-1 max-w-[1380px] w-full mx-auto px-6 py-10 space-y-20">
        {/* HERO SECTION & EXECUTIVE ABSTRACT */}
        <section className="space-y-8">
          <div className="border-b border-slate-200 pb-6">
            {/* Unboxed Metadata with Typographic Separators (Zero-Pill Rule) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono-tabular mb-3">
              <span>DED-ARC STATE-OF-THE-ART REVIEW</span>
              <span aria-hidden="true">·</span>
              <span>ISO/ASTM 52900 CLASSIFICATION</span>
              <span aria-hidden="true">·</span>
              <span>AWS D20.1 & ASME BPVC QUALIFICATION</span>
              <span aria-hidden="true">·</span>
              <span>PUBLISHED OCTOBER 2026</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-[1.15] max-w-4xl"
              style={{ textWrap: 'balance' }}
            >
              Wire Arc Additive Manufacturing (WAAM): Process Physics, Metallurgical Compatibility, and Industrial Integration
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              A comprehensive technical synthesis of electric-arc Directed Energy Deposition—examining heat-source variants, compatible structural alloys, multi-sector industrial deployments, thermo-mechanical limitations, and the roadmap toward autonomous factory integration.
            </p>
          </div>

          {/* Hero Grid: 7 Cols Narrative + Key Quantitative Pillars / 5 Cols Hero Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="prose prose-slate max-w-[72ch] text-[15.5px] leading-[1.75] text-slate-700 space-y-4">
                <p className="first-letter:text-5xl first-letter:font-serif-display first-letter:font-semibold first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:text-slate-900">
                  Wire Arc Additive Manufacturing (WAAM)—formally standardized under{' '}
                  <strong className="text-slate-900 font-semibold">ISO/ASTM 52900</strong> as{' '}
                  <em>Directed Energy Deposition–Arc (DED-Arc)</em>—is an advanced metal additive manufacturing process that combines an electric welding arc as a focused thermal energy source with commercial metallic wire as the consumable feedstock. Guided by multi-axis articulated industrial robots or large-envelope CNC gantries, WAAM builds near-net-shape structural metal components layer by layer via controlled weld bead deposition.
                </p>
                <p>
                  Unlike Laser Powder Bed Fusion (L-PBF), which is constrained to sub-meter build chambers and low deposition rates (<span className="font-mono-tabular">0.05–0.35 kg/h</span>) using costly gas-atomized powders, WAAM targets medium-to-ultra-large structural components (<span className="font-mono-tabular">10 kg</span> to <span className="font-mono-tabular">&gt; 10,000 kg</span>). By achieving deposition rates between{' '}
                  <span className="font-mono-tabular font-semibold text-slate-900">1.5 and 15.0 kg/h</span>{' '}
                  and reducing aerospace Buy-to-Fly (BTF) ratios from{' '}
                  <span className="font-mono-tabular font-semibold text-slate-900">12:1 down to 1.3:1</span>, WAAM has emerged as a transformative replacement for large open-die forgings, sand castings, and high-scrap subtractive billet hog-outs.
                </p>
              </div>

              {/* Quantitative Benchmark Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-4 bg-white border border-slate-200 rounded-lg">
                  <div className="text-xs text-slate-500">Deposition Throughput</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-mono-tabular font-semibold text-slate-900">
                      1.5–15.0
                    </span>
                    <span className="text-xs font-mono-tabular text-slate-500 ml-1.5">kg/h</span>
                  </div>
                  <div className="text-xs text-emerald-700 font-mono-tabular mt-1">
                    10–40× faster than L-PBF
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-lg">
                  <div className="text-xs text-slate-500">Buy-to-Fly Reduction</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-mono-tabular font-semibold text-sky-700">
                      1.2–1.6
                    </span>
                    <span className="text-xs font-mono-tabular text-slate-500 ml-1.5">: 1 ratio</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono-tabular mt-1">
                    vs. 8:1–20:1 CNC billet
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-lg">
                  <div className="text-xs text-slate-500">Feedstock Efficiency</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-mono-tabular font-semibold text-slate-900">
                      98.5
                    </span>
                    <span className="text-xs font-mono-tabular text-slate-500 ml-1.5">%</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono-tabular mt-1">
                    100% wire mass capture
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-lg">
                  <div className="text-xs text-slate-500">As-Built Waviness</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-mono-tabular font-semibold text-amber-700">
                      ±0.5–1.8
                    </span>
                    <span className="text-xs font-mono-tabular text-slate-500 ml-1.5">mm</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono-tabular mt-1">
                    Requires finish CNC pass
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ResilientImage
                src={IMAGE_MAP.hero}
                alt="Multi-axis robotic arm performing Wire Arc Additive Manufacturing on a titanium structural bulkhead"
                figNumber="Fig. 1.1"
                caption="6-axis robotic DED-Arc cell depositing Ti-6Al-4V structural stiffeners with local trailing Argon shielding."
              />
            </div>
          </div>
        </section>

        {/* SECTION 01: PROCESS PHYSICS, TAXONOMY & SYSTEM ARCHITECTURE */}
        <section id="process-physics" className="scroll-mt-20 space-y-10 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
                CHAPTER 01 · THERMO-PHYSICAL FUNDAMENTALS
              </div>
              <h2
                className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1"
                style={{ textWrap: 'balance' }}
              >
                01. Process Taxonomy, Arc Physics & Hardware Architecture
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Select a heat-source modality below to inspect energy coupling, wire feeding geometry, and metallurgical suitability.
            </p>
          </div>

          {/* Asymmetric Editorial + Marginalia Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4 text-[15.5px] leading-[1.75] text-slate-700 max-w-[72ch]">
              <p>
                Every WAAM installation comprises four tightly synchronized subsystems: (1) a digital welding power source capable of high-frequency waveform modulation, (2) a precision wire-feeding mechanism, (3) a kinematic motion manipulator (typically a 6-axis anthropomorphic robot coupled with a 2-axis tilt-turn positioner or a heavy 5-axis CNC gantry), and (4) an inert gas shielding envelope.
              </p>
              <p>
                During deposition, the heat input per unit length of weld bead (<span className="font-mono-tabular">E</span>, expressed in <span className="font-mono-tabular">kJ/mm</span>) governs the melt pool volume, wetting contact angle, cooling rate (<span className="font-mono-tabular">ΔT / Δt</span>), and the depth of remelting into the previously solidified layer:
              </p>
              <div className="p-4 bg-white border border-slate-200 rounded-lg font-mono-tabular text-xs sm:text-sm text-slate-900 flex flex-wrap items-center justify-between gap-4">
                <span>
                  E = (η · U · I) / (v_t · 1000) &nbsp; [kJ/mm]
                </span>
                <span className="text-xs text-slate-500">
                  where η = thermal efficiency, U = arc voltage (V), I = current (A), v_t = travel speed (mm/s)
                </span>
              </div>
              <p>
                In coaxial processes such as Gas Metal Arc Welding (GMAW), wire feed speed (<span className="font-mono-tabular">v_w</span>) and welding current (<span className="font-mono-tabular">I</span>) are intrinsically coupled because the wire itself forms the consumable anode/cathode. Conversely, in Gas Tungsten Arc Welding (GTAW) and Plasma Arc Welding (PAW), the arc is sustained by a non-consumable tungsten electrode while the filler wire is introduced laterally into the melt pool, decoupling thermal energy input from mass deposition rate.
              </p>
            </div>

            {/* Right Margin Technical Note */}
            <aside className="lg:col-span-4 p-5 bg-white border border-slate-200 rounded-lg space-y-3">
              <div className="text-xs font-mono-tabular font-semibold text-slate-900 border-b border-slate-200 pb-2">
                TECHNICAL MARGIN NOTE · DROPLET TRANSFER MODES
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conventional globular and free-flight spray transfer modes introduce excessive thermal energy into thin-walled additive builds, causing molten pool slumping.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900">Cold Metal Transfer (CMT)</strong> resolves this by detecting the exact millisecond the wire tip short-circuits into the liquid pool, cutting arc current to near zero, and physically retracting the wire via a high-speed AC servo motor at <span className="font-mono-tabular">70–130 Hz</span>. Surface tension pinches the droplet off cleanly with zero spatter and up to 35% lower heat input.
              </p>
            </aside>
          </div>

          {/* Interactive Process Variant Inspector */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-semibold text-slate-700">
                WAAM Heat-Source Modality Comparison
              </div>
              <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
                {PROCESS_VARIANTS.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedProcessId(variant.id)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedProcessId === variant.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {variant.code} — {variant.name.split('&')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
                    {selectedProcess.subtypes}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mt-1">
                    {selectedProcess.name} ({selectedProcess.code})
                  </h3>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedProcess.summary}
                </p>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                  <div className="text-xs font-mono-tabular font-semibold text-slate-800">
                    PHYSICAL DROPLET & ARC MECHANISM
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedProcess.keyMechanism}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-800 mb-2">
                      Primary Metallurgical & Geometric Suitability
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedProcess.bestSuitedFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-amber-800 mb-2">
                      Operational Constraints
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedProcess.limitations.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Telemetry Spec Card for Selected Process */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between space-y-4">
                <div className="text-xs font-mono-tabular font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  CALIBRATED OPERATING ENVELOPE ({selectedProcess.code})
                </div>

                <dl className="divide-y divide-slate-200 text-xs">
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">Wire Feed Configuration</dt>
                    <dd className="font-mono-tabular font-semibold text-slate-900 text-right">
                      {selectedProcess.wireFeed}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">Mass Deposition Rate</dt>
                    <dd className="font-mono-tabular font-semibold text-sky-700 text-right">
                      {selectedProcess.depositionRateKgHr}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">Thermal Transfer Efficiency (η)</dt>
                    <dd className="font-mono-tabular font-semibold text-slate-900 text-right">
                      {selectedProcess.thermalEfficiencyPct}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">Typical Arc Power</dt>
                    <dd className="font-mono-tabular text-slate-900 text-right">
                      {selectedProcess.typicalPowerKw}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">Arc Energy Density</dt>
                    <dd className="font-mono-tabular text-slate-900 text-right">
                      {selectedProcess.energyDensity}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">As-Built Wall Waviness</dt>
                    <dd className="font-mono-tabular text-slate-900 text-right">
                      {selectedProcess.surfaceWavinessMm}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-slate-500">Cathode / Arc Stability</dt>
                    <dd className="font-mono-tabular text-slate-900 text-right">
                      {selectedProcess.arcStability}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Interactive First-Principles WAAM Process Simulator */}
          <WaamProcessSimulator />
        </section>

        {/* SECTION 02: ALLOWED MATERIALS & METALLURGICAL COMPATIBILITY MATRIX */}
        <section id="allowed-materials" className="scroll-mt-20 space-y-10 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
                CHAPTER 02 · METALLURGICAL COMPATIBILITY & MECHANICAL PROPERTIES
              </div>
              <h2
                className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1"
                style={{ textWrap: 'balance' }}
              >
                02. Allowed Materials, Shielding Regimes & Phase Metallurgy
              </h2>
            </div>

            {/* Interactive Family Filter */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
              {[
                'All',
                'Titanium',
                'Aluminum',
                'Stainless & Structural Steel',
                'Nickel Superalloys',
                'Copper & Refractory'
              ].map((fam) => (
                <button
                  key={fam}
                  onClick={() => {
                    setSelectedAlloyFamily(fam);
                    const firstMatch =
                      fam === 'All'
                        ? WAAM_ALLOYS[0]
                        : WAAM_ALLOYS.find((a) => a.family === fam) || WAAM_ALLOYS[0];
                    setActiveAlloy(firstMatch);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedAlloyFamily === fam
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {fam === 'Stainless & Structural Steel' ? 'Steels' : fam}
                </button>
              ))}
            </div>
          </div>

          <div className="prose prose-slate max-w-[75ch] text-[15.5px] leading-[1.75] text-slate-700">
            <p>
              As a fundamental rule of metallurgy, <strong className="text-slate-900 font-semibold">any metallic alloy that is fusion-weldable and can be drawn into spooled ductile wire (0.8–1.6 mm diameter) is compatible with WAAM</strong>. However, because the component undergoes repetitive thermal cycling—where each deposited bead partially remelts the underlying layer and subjects several underlying millimeters to solid-state Heat-Affected Zone (HAZ) annealing—the resulting microstructure differs markedly from conventional castings or wrought forgings. Below is the empirical properties matrix across the five primary industrial alloy classes.
            </p>
          </div>

          {/* Interactive Table + Detailed Metallurgical Dossier Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Table (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  Click any alloy row to inspect its phase metallurgy & shielding protocol
                </span>
                <span className="text-xs font-mono-tabular text-slate-500">
                  H = Horizontal · V = Vertical (Build Z)
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-mono-tabular text-slate-500 bg-slate-50/50">
                      <th className="py-3 pl-5 pr-3 font-semibold">ALLOY DESIGNATION</th>
                      <th className="py-3 px-3 font-semibold">PREFERRED PROCESS</th>
                      <th className="py-3 px-3 font-semibold text-right">UTS (H / V)</th>
                      <th className="py-3 px-3 font-semibold text-right">WROUGHT</th>
                      <th className="py-3 pl-3 pr-5 font-semibold text-right">ELONGATION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {filteredAlloys.map((alloy) => {
                      const isSelected = activeAlloy.id === alloy.id;
                      return (
                        <tr
                          key={alloy.id}
                          onClick={() => setActiveAlloy(alloy)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-sky-50/80 text-slate-900'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <td className="py-3.5 pl-5 pr-3">
                            <div className="font-semibold text-slate-900">{alloy.designation}</div>
                            <div className="text-slate-500 text-[11px]">{alloy.family}</div>
                          </td>
                          <td className="py-3.5 px-3 font-mono-tabular text-slate-700">
                            {alloy.preferredProcess}
                          </td>
                          <td className="py-3.5 px-3 font-mono-tabular text-right font-semibold text-slate-900">
                            {alloy.utsHorizontalMpa} / {alloy.utsVerticalMpa}{' '}
                            <span className="text-slate-400 font-normal">MPa</span>
                          </td>
                          <td className="py-3.5 px-3 font-mono-tabular text-right text-slate-600">
                            {alloy.wroughtBaselineUtsMpa} MPa
                          </td>
                          <td className="py-3.5 pl-3 pr-5 font-mono-tabular text-right text-emerald-700 font-semibold">
                            {alloy.elongationPct}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Alloy Dossier Panel (5 cols) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 space-y-5">
              <div className="border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-sky-700">
                  <span>{activeAlloy.family.toUpperCase()}</span>
                  <span>·</span>
                  <span>ANISOTROPY Δ: {activeAlloy.anisotropyIndexPct}%</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mt-1">
                  {activeAlloy.designation}
                </h3>
                <p className="text-xs text-slate-500">{activeAlloy.commonName}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500">Shielding Atmosphere</div>
                  <div className="font-mono-tabular font-semibold text-slate-900 mt-1">
                    {activeAlloy.shieldingGas}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-slate-500">Max Inter-Pass Temp</div>
                  <div className="font-mono-tabular font-semibold text-slate-900 mt-1">
                    ≤ {activeAlloy.interpassTempMaxC} °C ({activeAlloy.depositionRateRange})
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-semibold text-slate-900">
                    Solidification Microstructure & Phase Evolution
                  </h4>
                  <p className="text-slate-600 leading-relaxed mt-1">
                    {activeAlloy.microstructureNotes}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-800">
                    Primary Metallurgical Defect Sensitivity
                  </h4>
                  <p className="text-slate-600 leading-relaxed mt-1">
                    {activeAlloy.primaryChallenge}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-emerald-800">
                    In-Situ & Post-Build Mitigation Protocol
                  </h4>
                  <p className="text-slate-600 leading-relaxed mt-1">
                    {activeAlloy.mitigationProtocol}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-1.5">
                    Qualified Industrial Applications
                  </h4>
                  <ul className="space-y-1 text-slate-600">
                    {activeAlloy.industrialApplications.map((app, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sky-600 font-bold">·</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: INDUSTRIAL APPLICATIONS & SECTOR CASE STUDIES */}
        <section id="applications" className="scroll-mt-20 space-y-10 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
                CHAPTER 03 · INDUSTRIAL DEPLOYMENTS & EMPIRICAL CASE STUDIES
              </div>
              <h2
                className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1"
                style={{ textWrap: 'balance' }}
              >
                03. Certified Applications Across Aerospace, Maritime, Energy & Civil Sectors
              </h2>
            </div>

            {/* Sector Filter */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
              {[
                'All',
                'Aerospace & Defense',
                'Maritime & Offshore',
                'Energy & Nuclear',
                'Heavy Machinery & Civil'
              ].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSector(sec)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedSector === sec
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCaseStudies.map((study, index) => (
              <article
                key={study.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 space-y-5">
                  <ResilientImage
                    src={IMAGE_MAP[study.imageKey]}
                    alt={study.title}
                    figNumber={`Case 3.${index + 1}`}
                    caption={`${study.organization} — ${study.alloyUsed} (${study.dimensionsMm})`}
                    aspectClass="aspect-[16/10]"
                  />

                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-slate-500">
                      <span className="text-sky-700 font-semibold">{study.sector}</span>
                      <span>·</span>
                      <span>{study.alloyUsed}</span>
                      <span>·</span>
                      <span>{study.partMassKg}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 mt-1.5">
                      {study.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{study.organization}</p>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {study.description}
                  </p>

                  {/* Claim-to-Proof Adjacency Metrics */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <div className="text-[11px] text-slate-500">Buy-to-Fly Shift</div>
                      <div className="text-xs font-mono-tabular font-semibold text-emerald-700 mt-1">
                        {study.waamBtfRatio.split(' ')[0]}
                      </div>
                      <div className="text-[11px] font-mono-tabular text-slate-400">
                        from {study.legacyBtfRatio.split(' ')[0]}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <div className="text-[11px] text-slate-500">Lead-Time Compression</div>
                      <div className="text-xs font-mono-tabular font-semibold text-slate-900 mt-1">
                        {study.leadTimeReduction}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <div className="text-[11px] text-slate-500">Economic Impact</div>
                      <div className="text-xs font-mono-tabular font-semibold text-sky-700 mt-1">
                        {study.costSavingPct}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
                  <strong className="text-slate-900 font-semibold">
                    Qualification & NDT Evidence:{' '}
                  </strong>
                  {study.engineeringValidation}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 04: POINTS OF STRENGTH, DRAWBACKS & LIMITATIONS */}
        <section id="strengths-limitations" className="scroll-mt-20 space-y-12 pt-8 border-t border-slate-200">
          <div>
            <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
              CHAPTER 04 · CRITICAL EVALUATION: STRENGTHS VS. LIMITATIONS
            </div>
            <h2
              className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1"
              style={{ textWrap: 'balance' }}
            >
              04. Points of Strength, Process Drawbacks & Failure-Mode Mitigation
            </h2>
          </div>

          {/* Part A: 5 Core Points of Strength */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">
              4.1 Core Points of Strength & Strategic Advantages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-slate-200 rounded-lg space-y-2.5">
                <div className="text-xs font-mono-tabular text-emerald-700 font-semibold">
                  01 · VOLUMETRIC THROUGHPUT & SCALE
                </div>
                <h4 className="text-base font-semibold text-slate-900">
                  Unconstrained Multi-Meter Build Envelopes
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unlike powder-bed systems restricted by sealed inert build boxes (<span className="font-mono-tabular">400³ mm</span>), WAAM workspace is bounded only by the reach of the robotic manipulator or linear gantry rail—routinely fabricating monolithic parts from <span className="font-mono-tabular">1 m</span> to <span className="font-mono-tabular">&gt; 10 m</span> at <span className="font-mono-tabular">3–15 kg/h</span>.
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-lg space-y-2.5">
                <div className="text-xs font-mono-tabular text-emerald-700 font-semibold">
                  02 · FEEDSTOCK ECONOMICS & SAFETY
                </div>
                <h4 className="text-base font-semibold text-slate-900">
                  Low-Cost Wire & Zero Powder Hazard
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Standard welding wire costs <span className="font-mono-tabular">3× to 8×</span> less per kilogram than gas-atomized spherical L-PBF powder (e.g., Ti-6Al-4V wire at <span className="font-mono-tabular">$120/kg</span> vs. powder at <span className="font-mono-tabular">$380/kg</span>), exhibits nearly <span className="font-mono-tabular">100%</span> material capture efficiency, and eliminates explosive dust/respiratory hazards.
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-lg space-y-2.5">
                <div className="text-xs font-mono-tabular text-emerald-700 font-semibold">
                  03 · CAPITAL EFFICIENCY & REPAIRABILITY
                </div>
                <h4 className="text-base font-semibold text-slate-900">
                  Modular Off-the-Shelf Hardware & Cladding
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  WAAM cells integrate proven industrial 6-axis robots and welding power sources at a fraction of electron-beam or multi-laser system CAPEX. Furthermore, WAAM can deposit localized structural features or remanufacture worn turbine blades and forging dies directly onto existing substrates.
                </p>
              </div>
            </div>
          </div>

          {/* Part B: Interactive Multi-Axis Benchmarking Radar */}
          <BenchmarkingRadar />

          {/* Part C: Drawbacks, Metallurgical Limitations & Remedies */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  4.2 Drawbacks, Physical Limitations & Engineering Remedies
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed failure-mode analysis of why WAAM cannot be treated as a "plug-and-play" net-shape process without thermo-mechanical governance.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
                {[
                  'All',
                  'Thermal & Mechanical',
                  'Metallurgical',
                  'Geometric & Surface',
                  'Defectology'
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedLimitationCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      selectedLimitationCategory === cat
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Limitations List (8 cols) */}
              <div className="lg:col-span-8 space-y-5">
                {filteredLimitations.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 bg-white border border-slate-200 rounded-lg space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono-tabular text-slate-500">
                          <span className="font-semibold text-slate-800">{item.category}</span>
                          <span>·</span>
                          <span
                            className={
                              item.severity === 'Critical'
                                ? 'text-rose-700 font-semibold'
                                : 'text-amber-700 font-semibold'
                            }
                          >
                            {item.severity === 'Critical'
                              ? '✖ SEVERITY: CRITICAL'
                              : '▲ SEVERITY: HIGH / MODERATE'}
                          </span>
                        </div>
                        <h4 className="text-base font-semibold text-slate-900 mt-1">
                          {item.title}
                        </h4>
                      </div>
                      <div className="text-xs font-mono-tabular text-slate-500">
                        Affected: {item.affectedAlloys.join(', ')}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <div className="font-semibold text-slate-900">
                          Underlying Thermo-Physical Mechanism
                        </div>
                        <p className="text-slate-600 leading-relaxed">{item.physicalMechanism}</p>
                        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded font-mono-tabular text-[11px] text-slate-700">
                          <strong>Empirical Magnitude:</strong> {item.quantitativeManifestation}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="font-semibold text-sky-800">
                            In-Situ Process Mitigation
                          </div>
                          <p className="text-slate-600 leading-relaxed mt-0.5">
                            {item.inProcessMitigation}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-100">
                          <div className="font-semibold text-emerald-800">
                            Post-Build Mechanical / Thermal Remedy
                          </div>
                          <p className="text-slate-600 leading-relaxed mt-0.5">
                            {item.postProcessRemedy}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Microstructure Visual & Columnar-to-Equiaxed Explanation (4 cols) */}
              <aside className="lg:col-span-4 space-y-5 bg-white border border-slate-200 rounded-lg p-5">
                <ResilientImage
                  src={IMAGE_MAP.microstructure}
                  alt="Optical metallography cross-section comparing coarse columnar beta grains with refined equiaxed microstructure"
                  figNumber="Fig. 4.1"
                  caption="Epitaxial columnar β-grain growth across fusion boundaries vs. equiaxed α+β grain refinement achieved via inter-pass cold rolling."
                  aspectClass="aspect-[4/3]"
                />
                <div className="space-y-2 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                  <div className="font-mono-tabular font-semibold text-slate-900">
                    METALLURGICAL REMEDY SPOTLIGHT · INTER-PASS COLD ROLLING
                  </div>
                  <p>
                    By trailing a hydraulically loaded roller (<span className="font-mono-tabular">50–75 kN</span>) behind the welding torch after each deposited layer, plastic compressive strain is introduced into the solidified bead.
                  </p>
                  <p>
                    When the subsequent arc pass reheats the plastically deformed zone through the alloy’s recrystallization temperature, new strain-free equiaxed grains nucleate homogeneously—simultaneously eliminating columnar anisotropy and reversing longitudinal tensile residual stresses into compressive stresses.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* SECTION 05: FUTURE OUTLOOK FOR INDUSTRIAL MANUFACTURING INTEGRATION */}
        <section id="future-outlook" className="scroll-mt-20 space-y-10 pt-8 border-t border-slate-200">
          <div>
            <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
              CHAPTER 05 · INDUSTRY 4.0 INTEGRATION & QUALIFICATION HORIZON
            </div>
            <h2
              className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1"
              style={{ textWrap: 'balance' }}
            >
              05. Future Outlook for Industrial Manufacturing Integration (2025–2032+)
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Transitioning WAAM from specialized research cells into autonomous, serial factory production requires converging three engineering pillars: closed-loop multi-sensor control, hybrid additive-subtractive machinery, and digital-twin qualification standards.
            </p>
          </div>

          {/* 3-Horizon Roadmap Timeline */}
          <div className="space-y-8">
            {FUTURE_ROADMAP.map((phase, pIdx) => (
              <div
                key={phase.horizon}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono-tabular text-sky-400">
                      {phase.horizon} · {phase.trlRange}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-0.5">
                      {phase.phaseTitle}
                    </h3>
                  </div>
                  <span className="text-xs font-mono-tabular text-slate-400">
                    INTEGRATION STAGE 0{pIdx + 1}
                  </span>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                  {phase.keyEnablers.map((enabler, eIdx) => (
                    <div
                      key={enabler.title}
                      className={`${eIdx > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''} space-y-2.5 flex flex-col justify-between`}
                    >
                      <div className="space-y-2">
                        <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
                          {enabler.domain.toUpperCase()}
                        </div>
                        <h4 className="text-base font-semibold text-slate-900">
                          {enabler.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {enabler.technicalDetail}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 mt-3">
                        <strong className="text-slate-900 font-semibold">Factory Impact: </strong>
                        {enabler.industrialImpact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Standards & Certification Matrix */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <div className="text-xs font-mono-tabular text-slate-500">
                REGULATORY & INDUSTRIAL QUALIFICATION STANDARDS
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mt-0.5">
                Active Industrial Standards Governing WAAM / DED-Arc Integration
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                <div className="font-mono-tabular font-semibold text-slate-900">
                  ISO/ASTM 52900 & 52927
                </div>
                <div className="text-slate-500">Terminology & Qualification Principles</div>
                <p className="text-slate-600 leading-relaxed pt-1">
                  Establishes formal DED-Arc taxonomy, feedstock wire traceability, and machine qualification protocols across international supply chains.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                <div className="font-mono-tabular font-semibold text-slate-900">
                  AWS D20.1 / D20.1M
                </div>
                <div className="text-slate-500">American Welding Society AM Standard</div>
                <p className="text-slate-600 leading-relaxed pt-1">
                  Defines Procedure Qualification Records (AM-PQR), pre-production test builds, witness coupon orientation, and radiographic acceptance criteria for structural components.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                <div className="font-mono-tabular font-semibold text-slate-900">
                  SAE AMS7004 & AMS7005
                </div>
                <div className="text-slate-500">Aerospace Plasma & Wire DED Specs</div>
                <p className="text-slate-600 leading-relaxed pt-1">
                  Governs aerospace Ti-6Al-4V wire composition, interstitial oxygen/nitrogen ceilings (<span className="font-mono-tabular">&lt; 1800 ppm O₂</span>), and mandatory post-build HIP + anneal cycles.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-1.5">
                <div className="font-mono-tabular font-semibold text-slate-900">
                  DNV-ST-B203 & BV NR659
                </div>
                <div className="text-slate-500">Maritime & Offshore Class Rules</div>
                <p className="text-slate-600 leading-relaxed pt-1">
                  Det Norske Veritas and Bureau Veritas qualification frameworks for WAAM ship propellers, rudder stocks, and subsea pressure manifolds.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-8 mt-16 no-print">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-serif-display font-semibold text-slate-900">
              WAAM Technical Monograph & Engineering Review
            </span>{' '}
            · Standardized Reference for Directed Energy Deposition–Arc (ISO/ASTM 52900).
          </div>
          <div className="flex items-center gap-4">
            <a href="#top" className="hover:text-slate-900 transition-colors">
              Back to Top ↑
            </a>
            <span>·</span>
            <button
              onClick={() => window.print()}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Export PDF / Print
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
