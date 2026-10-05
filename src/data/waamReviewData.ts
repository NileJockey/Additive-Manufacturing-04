export interface ProcessVariant {
  id: 'gmaw' | 'gtaw' | 'paw';
  code: string;
  name: string;
  subtypes: string;
  wireFeed: 'Coaxial' | 'Lateral (Off-axis)';
  depositionRateKgHr: string;
  typicalPowerKw: string;
  thermalEfficiencyPct: string;
  surfaceWavinessMm: string;
  energyDensity: string;
  arcStability: string;
  summary: string;
  bestSuitedFor: string[];
  limitations: string[];
  keyMechanism: string;
}

export interface WaamAlloy {
  id: string;
  family: 'Titanium' | 'Aluminum' | 'Stainless & Structural Steel' | 'Nickel Superalloys' | 'Copper & Refractory';
  designation: string;
  commonName: string;
  preferredProcess: string;
  shieldingGas: string;
  utsHorizontalMpa: number;
  utsVerticalMpa: number;
  yieldStrengthMpa: number;
  elongationPct: string;
  wroughtBaselineUtsMpa: number;
  anisotropyIndexPct: number;
  depositionRateRange: string;
  interpassTempMaxC: number;
  primaryChallenge: string;
  mitigationProtocol: string;
  microstructureNotes: string;
  industrialApplications: string[];
}

export interface IndustrialCaseStudy {
  id: string;
  sector: 'Aerospace & Defense' | 'Maritime & Offshore' | 'Energy & Nuclear' | 'Heavy Machinery & Civil';
  title: string;
  organization: string;
  alloyUsed: string;
  partMassKg: string;
  dimensionsMm: string;
  legacyMethod: string;
  legacyBtfRatio: string;
  waamBtfRatio: string;
  leadTimeReduction: string;
  costSavingPct: string;
  description: string;
  engineeringValidation: string;
  imageKey: 'propeller' | 'aerospace' | 'hero' | 'microstructure';
}

export interface BenchmarkingMethod {
  id: 'waam' | 'lpbf' | 'lded' | 'cnc';
  name: string;
  shortName: string;
  feedstockType: string;
  feedstockCostUsdKg: string;
  depositionRateKgHr: string;
  maxBuildEnvelope: string;
  surfaceRoughnessRaUm: string;
  dimensionalToleranceMm: string;
  buyToFlyRatio: string;
  capitalEquipmentCost: string;
  radarScores: {
    depositionSpeed: number; // 0-100
    buildEnvelope: number;
    feedstockEconomy: number;
    geometricResolution: number;
    surfaceFinish: number;
    materialUtilization: number;
  };
}

export interface LimitationFailureMode {
  id: string;
  category: 'Thermal & Mechanical' | 'Metallurgical' | 'Geometric & Surface' | 'Defectology';
  title: string;
  severity: 'High' | 'Moderate' | 'Critical';
  physicalMechanism: string;
  quantitativeManifestation: string;
  inProcessMitigation: string;
  postProcessRemedy: string;
  affectedAlloys: string[];
}

export interface RoadmapMilestone {
  horizon: string;
  trlRange: string;
  phaseTitle: string;
  keyEnablers: {
    title: string;
    domain: string;
    technicalDetail: string;
    industrialImpact: string;
  }[];
}

export const PROCESS_VARIANTS: ProcessVariant[] = [
  {
    id: 'gmaw',
    code: 'GMAW / CMT',
    name: 'Gas Metal Arc Welding & Cold Metal Transfer',
    subtypes: 'Standard GMAW, Pulsed-GMAW, Fronius CMT (Cold Metal Transfer), CMT-PADV',
    wireFeed: 'Coaxial',
    depositionRateKgHr: '3.0 – 10.0 kg/h (Tandem up to 15.0 kg/h)',
    typicalPowerKw: '2.5 – 8.5 kW',
    thermalEfficiencyPct: '82 – 88%',
    surfaceWavinessMm: '± 0.50 – 1.80 mm',
    energyDensity: '10⁶ – 10⁷ W/m²',
    arcStability: 'High (Mechanically assisted droplet detachment in CMT)',
    summary:
      'The workhorse of industrial WAAM. Because the consumable wire acts directly as the electrode fed coaxially through the welding torch, toolpath generation is omnidirectional and seamlessly integrates with 6-axis articulated robots. Cold Metal Transfer (CMT) synchronizes high-frequency digital current control with mechanical wire retraction upon short-circuit detection, reducing thermal input by up to 35% and virtually eliminating spatter.',
    bestSuitedFor: [
      'Aluminum alloys (2xxx, 5xxx, 4xxx) using CMT-Pulse Advanced (AC polarity cleaning)',
      'Structural carbon steels, HSLA steels, and 300-series austenitic stainless steels',
      'Large-scale multi-meter topology-optimized trusses requiring omnidirectional toolpaths'
    ],
    limitations: [
      'Susceptible to arc wandering and cathode spot instability in reactive Titanium alloys',
      'Direct coupling between wire feed speed and arc current restricts independent heat-to-mass control'
    ],
    keyMechanism:
      'In CMT mode, when the molten wire tip contacts the melt pool, the digital controller drops current to near-zero and mechanically reverses the servo-motor wire drive at 70–130 Hz. Surface tension detaches a single droplet without electromagnetic pinch explosion.'
  },
  {
    id: 'gtaw',
    code: 'GTAW',
    name: 'Gas Tungsten Arc Welding',
    subtypes: 'Cold-Wire GTAW, Hot-Wire GTAW (HW-GTAW), Pulsed-GTAW',
    wireFeed: 'Lateral (Off-axis)',
    depositionRateKgHr: '1.0 – 3.5 kg/h (Hot-wire up to 5.0 kg/h)',
    typicalPowerKw: '3.0 – 10.0 kW',
    thermalEfficiencyPct: '60 – 75%',
    surfaceWavinessMm: '± 0.25 – 0.65 mm',
    energyDensity: '5 × 10⁶ – 2 × 10⁷ W/m²',
    arcStability: 'Ultra-High (Non-consumable W-2%ThO₂ or W-2%CeO₂ cathode)',
    summary:
      'Employs a non-consumable tungsten electrode to establish a calm, clean electric arc while filler wire is fed laterally into the leading edge of the melt pool. Because arc power and wire feed rate are completely decoupled, metallurgists can finely tune heat input per unit length independent of layer height. Hot-wire variants pre-heat the wire resistively (I²R) prior to pool entry.',
    bestSuitedFor: [
      'Aerospace Titanium alloys (Ti-6Al-4V, Ti-5Al-5Mo-5V-3Cr) where spatter-free purity is mandatory',
      'Nickel-based superalloys (Inconel 625, 718) sensitive to thermal gradient cracking',
      'High-integrity nuclear pressure boundaries requiring ultra-low porosity (< 0.05%)'
    ],
    limitations: [
      'Lateral wire feeding requires strict torch rotation synchronization along curved toolpaths',
      'Lower deposition rates and reduced thermal efficiency compared to coaxial GMAW'
    ],
    keyMechanism:
      'Decoupled energy-mass transfer allows independent modulation of arc current (controlling penetration depth and pool width) and wire feed velocity (controlling bead reinforcement height).'
  },
  {
    id: 'paw',
    code: 'PAW',
    name: 'Plasma Arc Welding',
    subtypes: 'Micro-PAW, Transferred Arc PAW, Pulsed-Plasma WAAM',
    wireFeed: 'Lateral (Off-axis)',
    depositionRateKgHr: '2.0 – 6.5 kg/h',
    typicalPowerKw: '4.0 – 15.0 kW',
    thermalEfficiencyPct: '55 – 70%',
    surfaceWavinessMm: '± 0.30 – 0.80 mm',
    energyDensity: '10⁷ – 10⁸ W/m²',
    arcStability: 'Exceptional (Collimated constricting copper nozzle prevents arc wander)',
    summary:
      'Forces the electric arc between a recessed tungsten cathode and the workpiece through a water-cooled constricting copper orifice nozzle. This collimates the plasma jet into a high-velocity, cylindrical energy column with Minimal divergence. The result is superior energy density, reduced heat-affected zone (HAZ) width, and lower sensitivity to stand-off distance variations.',
    bestSuitedFor: [
      'Thick-walled refractory metals (Tantalum, Molybdenum, Tungsten-rhenium)',
      'Large flight-critical Ti-6Al-4V airframe spars (e.g., Cranfield / Norsk Titanium RPD variants)',
      'Martensitic and precipitation-hardening stainless steels (17-4 PH, Maraging steel)'
    ],
    limitations: [
      'Complex bulky torch head restricts access in tight internal corners or steep overhangs',
      'Higher orifice nozzle wear, water-cooling complexity, and dual-gas supply requirements (orifice gas + shielding gas)'
    ],
    keyMechanism:
      'The constricting copper nozzle induces a thermal pinch and electromagnetic Lorentz pinch effect, increasing arc core temperatures to 18,000–24,000 K and creating a stiff, directional plasma beam.'
  }
];

export const WAAM_ALLOYS: WaamAlloy[] = [
  {
    id: 'ti64',
    family: 'Titanium',
    designation: 'Ti-6Al-4V (Grade 5 / Grade 23 ELI)',
    commonName: 'Alpha-Beta Aerospace Titanium',
    preferredProcess: 'PAW / Cold-Wire GTAW',
    shieldingGas: '99.999% High-Purity Argon (Trailing + Local Chamber < 50 ppm O₂)',
    utsHorizontalMpa: 935,
    utsVerticalMpa: 885,
    yieldStrengthMpa: 825,
    elongationPct: '9.5% (H) / 14.2% (V)',
    wroughtBaselineUtsMpa: 950,
    anisotropyIndexPct: 5.6,
    depositionRateRange: '1.8 – 4.5 kg/h',
    interpassTempMaxC: 200,
    primaryChallenge:
      'Severe oxygen/nitrogen embrittlement above 300 °C and epitaxial growth of coarse centimeter-scale columnar prior-β grains along the steep vertical thermal gradient.',
    mitigationProtocol:
      'Local trailing laminar Argon shielding hoods or positive-pressure gloveboxes; high-load (50–75 kN) inter-pass mechanical cold rolling to induce recrystallization into fine equiaxed α+β grains.',
    microstructureNotes:
      'As-deposited state exhibits coarse columnar prior-β grains (width 0.5–3.0 mm, length spanning multiple layers) containing basketweave Widmanstätten α-lamellae and grain-boundary α film.',
    industrialApplications: [
      'Commercial airliner wing ribs, landing gear cruciform brackets, and pylon mounts',
      'Spacecraft propellant tank domes and thrust structure rings',
      'Subsea high-pressure riser flanges'
    ]
  },
  {
    id: 'al2319',
    family: 'Aluminum',
    designation: 'AA 2319 / AA 5356 / AA 4043',
    commonName: 'Aerospace Al-Cu & Marine Al-Mg Alloys',
    preferredProcess: 'CMT + Pulse Advanced (CMT-PADV)',
    shieldingGas: '100% Argon or 70% Ar / 30% He Mixture',
    utsHorizontalMpa: 295,
    utsVerticalMpa: 280,
    yieldStrengthMpa: 185,
    elongationPct: '11.0% (T6 Aged: 395 MPa UTS)',
    wroughtBaselineUtsMpa: 390,
    anisotropyIndexPct: 5.1,
    depositionRateRange: '2.0 – 4.8 kg/h',
    interpassTempMaxC: 120,
    primaryChallenge:
      'Hydrogen gas porosity due to a 20× drop in hydrogen solubility upon solidification (0.69 vs. 0.036 mL/100g), refractory Al₂O₃ surface oxide film (Tm = 2072 °C), and solidification cracking in 2xxx/7xxx series.',
    mitigationProtocol:
      'Alternating-current CMT (CMT-PADV) uses positive electrode cycles to cathodically strip oxide films and reduce heat input; laser-cleaned wire feedstock; post-build T6 solution + aging treatment or TiB₂ grain refiner inoculation.',
    microstructureNotes:
      'As-built AA 2319 displays dendritic α-Al matrix with coarse interdendritic θ-phase (Al₂Cu) eutectic networks along fusion boundaries; T6 heat treatment dissolves θ precipitates into homogeneous strengthening zones.',
    industrialApplications: [
      'Cryogenic launch vehicle propellant tanks and orthogrid stiffened barrels',
      'Lightweight automotive chassis nodes and EV battery enclosures',
      'High-speed aluminum catamaran hull structural knees (AA 5356 / 5087)'
    ]
  },
  {
    id: 'ss316l',
    family: 'Stainless & Structural Steel',
    designation: 'AISI 316L / ER70S-6 / 2209 Duplex',
    commonName: 'Austenitic, Low-Carbon Structural & Duplex Steels',
    preferredProcess: 'GMAW / Pulsed-GMAW / Tandem-GMAW',
    shieldingGas: '98% Ar + 2% CO₂ (316L) or 82% Ar + 18% CO₂ (ER70S-6)',
    utsHorizontalMpa: 565,
    utsVerticalMpa: 530,
    yieldStrengthMpa: 345,
    elongationPct: '38.0% – 44.0%',
    wroughtBaselineUtsMpa: 515,
    anisotropyIndexPct: 6.2,
    depositionRateRange: '3.5 – 9.5 kg/h',
    interpassTempMaxC: 180,
    primaryChallenge:
      'Excessive dwell times between passes at 600–850 °C can precipitate brittle intermetallic σ (sigma) and χ (chi) phases or chromium carbides (M₂₃C₆) at δ-ferrite/γ-austenite boundaries, degrading pitting corrosion resistance.',
    mitigationProtocol:
      'Active pyrometric inter-pass temperature control (< 150–180 °C); controlled heat input (0.4–0.8 kJ/mm) to maintain 4–10% skeletal δ-ferrite that prevents hot fissuring.',
    microstructureNotes:
      'Austenitic γ matrix with vermicular or lathy skeletal δ-ferrite distributed along sub-grain solidification cell boundaries. In ER70S-6, cyclical thermal reheating produces normalized fine polygonal ferrite-pearlite.',
    industrialApplications: [
      'Architectural pedestrian bridges (e.g., MX3D 12-meter Amsterdam canal bridge)',
      'Heavy crane hooks, excavator boom knuckles, and wind turbine tower nodes',
      'Nuclear reactor cooling pump impellers and chemical valve bodies'
    ]
  },
  {
    id: 'in718',
    family: 'Nickel Superalloys',
    designation: 'Inconel 718 / Inconel 625 / Waspaloy',
    commonName: 'Precipitation-Hardening Ni-Cr-Nb Superalloys',
    preferredProcess: 'Pulsed-PAW / CMT / Hot-Wire GTAW',
    shieldingGas: '99.995% Argon or Ar + 25% He + 0.05% H₂',
    utsHorizontalMpa: 1085,
    utsVerticalMpa: 1010,
    yieldStrengthMpa: 790,
    elongationPct: '16.5% – 21.0% (After HSA + Aging)',
    wroughtBaselineUtsMpa: 1275,
    anisotropyIndexPct: 6.9,
    depositionRateRange: '1.5 – 3.8 kg/h',
    interpassTempMaxC: 150,
    primaryChallenge:
      'Micro-segregation of Niobium (Nb) and Molybdenum (Mo) into interdendritic liquid during solidification forms brittle Laves phases ((Ni,Cr,Fe)₂(Nb,Mo,Ti)), depleting the matrix of strengthening γ″ (Ni₃Nb) precipitates and causing HAZ liquation cracking.',
    mitigationProtocol:
      'Low heat input pulsed arcs with high cooling rates; Hot Isostatic Pressing (HIP at 1160 °C / 100 MPa) followed by homogenization solution annealing (1080 °C) and double-step aging (720 °C + 620 °C).',
    microstructureNotes:
      'Columnar dendritic γ matrix with interdendritic Laves Eutectic islands and NbC carbides in as-built condition; high-temperature homogenization dissolves Laves phases to precipitate coherent disc-shaped γ″ (Ni₃Nb).',
    industrialApplications: [
      'Gas turbine engine casings, exhaust diffuser struts, and combustor flanges',
      'Subsea oil & gas blowout preventer (BOP) claddings and high-sour-service manifolds',
      'Rocket engine regeneratively cooled combustion chamber jackets'
    ]
  },
  {
    id: 'cu_nab',
    family: 'Copper & Refractory',
    designation: 'CuAl9Ni5Fe4Mn (NAB) / CuCrZr / Tungsten-Ta',
    commonName: 'Nickel-Aluminum Bronze & High-Conductivity / Refractory Alloys',
    preferredProcess: 'Pulsed-GMAW / PAW (Refractory)',
    shieldingGas: '100% Argon or Ar-He High-Enthalpy Mix',
    utsHorizontalMpa: 685,
    utsVerticalMpa: 660,
    yieldStrengthMpa: 310,
    elongationPct: '22.0% – 27.5%',
    wroughtBaselineUtsMpa: 650,
    anisotropyIndexPct: 3.6,
    depositionRateRange: '2.5 – 6.0 kg/h',
    interpassTempMaxC: 250,
    primaryChallenge:
      'Extremely high thermal diffusivity in copper alloys (α ≈ 110 mm²/s) rapidly conducts heat away from the melt pool, causing lack-of-sidewall-fusion on initial layers; refractory alloys suffer from ductile-to-brittle transition temperature (DBTT) cracking.',
    mitigationProtocol:
      'Substrate preheating (200–400 °C) paired with Helium-enriched shielding gas to boost arc enthalpy on start layers; bi-metallic gradient transition layers (e.g., Inconel 625 interlayer between Steel and Cu).',
    microstructureNotes:
      'WAAM Nickel-Aluminum Bronze exhibits a significantly finer α-phase + κ (kappa) intermetallic precipitate distribution than slow-cooled sand castings, yielding superior cavitation erosion and seawater corrosion resistance.',
    industrialApplications: [
      'Full-scale marine vessel propellers (e.g., Damen "WAAMpeller" certified by Bureau Veritas)',
      'Bimetallic copper-steel rocket thrust chambers and fusion tokamak divertor heat sinks',
      'Seawater desalination pump casings and naval sonar domes'
    ]
  }
];

export const INDUSTRIAL_CASE_STUDIES: IndustrialCaseStudy[] = [
  {
    id: 'aerospace-ti-spar',
    sector: 'Aerospace & Defense',
    title: 'Ti-6Al-4V Airframe Wing Rib & Landing Gear Cruciform Bracket',
    organization: 'Cranfield WAAMMat / Airbus & BAE Systems Consortium',
    alloyUsed: 'Ti-6Al-4V (Grade 5)',
    partMassKg: '24.5 kg (Preform) → 18.2 kg (Final Machined)',
    dimensionsMm: '1,420 × 480 × 165 mm',
    legacyMethod: '5-Axis CNC Machining from Solid Wrought Titanium Billet (195 kg)',
    legacyBtfRatio: '10.7 : 1 (91% scrapped as titanium swarf)',
    waamBtfRatio: '1.35 : 1 (87% raw material mass reduction)',
    leadTimeReduction: '46 weeks (forging die queue) → 11 days',
    costSavingPct: '58% total landed part cost reduction',
    description:
      'Large structural titanium ribs and fuselage frames have historically suffered from extreme Buy-to-Fly (BTF) ratios between 8:1 and 20:1 when hogged out of thick plate, or year-long lead times for closed-die forgings. Using Plasma Arc WAAM with a local laminar Argon trailing shield and inter-pass cold rolling, engineers deposited a near-net-shape preform requiring only 1.8 mm of finish CNC machining on mating surfaces.',
    engineeringValidation:
      'Full-scale structural fatigue testing verified isotropic ultimate tensile strength of 965 MPa and high-cycle fatigue endurance exceeding MMPDS-14 wrought Ti-6Al-4V plate specifications after inter-pass cold rolling at 65 kN.',
    imageKey: 'aerospace'
  },
  {
    id: 'marine-waampeller',
    sector: 'Maritime & Offshore',
    title: 'Certified Nickel-Aluminum Bronze Ship Propeller ("WAAMpeller")',
    organization: 'RAMLAB (Port of Rotterdam), Damen Shipyards, Promarin & Bureau Veritas',
    alloyUsed: 'CuAl9Ni5Fe4Mn (Nickel-Aluminum Bronze)',
    partMassKg: '400 kg (As-Printed) → 180 kg (CNC Finish Polished)',
    dimensionsMm: '1,350 mm Diameter (298 Consecutive Layers)',
    legacyMethod: 'Sand Casting with Manual Pattern Making & Heavy Grinding',
    legacyBtfRatio: '2.8 : 1 (Including risers, runners, and casting gates)',
    waamBtfRatio: '1.65 : 1 (Hollow blade geometry capability)',
    leadTimeReduction: '16 weeks → 2.5 weeks on-demand port synthesis',
    costSavingPct: '42% inventory & downtime reduction',
    description:
      'The world’s first class-certified maritime propeller manufactured via 6-axis robotic GMAW-CMT. Consisting of 298 layers of Nickel-Aluminum Bronze wire deposited over 80 arc hours, the component eliminated wooden casting patterns and sand molds. Subsequent generations introduced hollow internal blade cavities—impossible to cast—reducing rotational inertia by 35%.',
    engineeringValidation:
      'Subjected to rigorous bollard pull trials, crash-stop maneuvers, and ultrasonic phased-array NDT on a Damen Stan Tug 1606. Exceeded Bureau Veritas鑄 (cast) NAB yield strength by 24% due to rapid solidification grain refinement.',
    imageKey: 'propeller'
  },
  {
    id: 'civil-mx3d-bridge',
    sector: 'Heavy Machinery & Civil',
    title: 'Topology-Optimized 12-Meter Structural Stainless Steel Canal Bridge',
    organization: 'MX3D, Imperial College London, Arup & Alan Turing Institute',
    alloyUsed: 'AISI 308LSi / 316L Austenitic Stainless Steel',
    partMassKg: '4,500 kg (4.5 Metric Tons of Wire Deposited)',
    dimensionsMm: '12,000 × 2,100 × 1,400 mm',
    legacyMethod: 'Rolled I-Beam Fabrication & Manual Multi-Pass Structural Welding',
    legacyBtfRatio: '1.9 : 1 (Plate offcuts and gusset waste)',
    waamBtfRatio: '1.04 : 1 (As-built unmachined structural surface)',
    leadTimeReduction: '6 months fabrication → 6-axis automated continuous cell',
    costSavingPct: '34% structural mass optimization via generative trusses',
    description:
      'Spanning the Oudezijds Achterburgwal canal in Amsterdam, this 4.5-ton pedestrian bridge demonstrated freeform multi-axis GMAW at civil engineering scale. Four industrial robots deposited 1,100 km of stainless steel wire without support structures. Integrated fiber-optic strain, displacement, and vibration sensors stream live telemetry to a cloud Digital Twin.',
    engineeringValidation:
      'Destructive stub-column buckling tests, 20-ton full-span load testing at Imperial College London, and probabilistic finite element modeling confirmed compliance with Eurocode 3 (EN 1993) structural safety factors.',
    imageKey: 'hero'
  },
  {
    id: 'energy-bi-metallic',
    sector: 'Energy & Nuclear',
    title: 'Functionally Graded Inconel-to-Steel High-Pressure Reactor Nozzle',
    organization: 'Framatome / Oak Ridge National Laboratory (MDF) & TWI',
    alloyUsed: 'Low-Alloy Steel (SA-508) → Inconel 625 / 309L Cladding',
    partMassKg: '820 kg (Multi-Material Vessel Nozzle)',
    dimensionsMm: '950 mm OD × 140 mm Wall Thickness',
    legacyMethod: 'Heavy Open-Die Forging + Dissimilar Metal Strip Cladding',
    legacyBtfRatio: '5.4 : 1',
    waamBtfRatio: '1.28 : 1',
    leadTimeReduction: '72 weeks (nuclear forging bottleneck) → 5 weeks',
    costSavingPct: '49% reduction in expensive Nickel superalloy usage',
    description:
      'Twin-wire WAAM enables continuous compositional grading from high-strength ferritic pressure vessel steel (SA-508) on the structural exterior to corrosion-resistant Inconel 625 on the wet nuclear coolant interior. By varying the ratio of two independent wire feeders layer-by-layer, sharp metallurgical interfaces prone to thermal expansion delamination are eliminated.',
    engineeringValidation:
      'Qualified under ASME Boiler and Pressure Vessel Code (BPVC) Section III Case N-883 framework; zero lack-of-fusion defects detected under 100% volumetric radiographic and ultrasonic inspection.',
    imageKey: 'microstructure'
  }
];

export const BENCHMARKING_METHODS: BenchmarkingMethod[] = [
  {
    id: 'waam',
    name: 'Wire Arc Additive Manufacturing (WAAM)',
    shortName: 'WAAM (DED-Arc)',
    feedstockType: 'Spool Welding Wire (0.8 – 1.6 mm Ø)',
    feedstockCostUsdKg: '$15 – $140 / kg (100% dense wire)',
    depositionRateKgHr: '1.5 – 10.0 kg/h (Tandem: 15 kg/h)',
    maxBuildEnvelope: '2,000 × 3,000 × 6,000+ mm (Gantry / Robot Track)',
    surfaceRoughnessRaUm: '150 – 500 μm Ra (1–2 mm waviness)',
    dimensionalToleranceMm: '± 0.50 – 2.00 mm (Requires finish CNC)',
    buyToFlyRatio: '1.2 : 1 to 1.8 : 1',
    capitalEquipmentCost: '$180k – $550k (Robot + Power Source + Positioner)',
    radarScores: {
      depositionSpeed: 95,
      buildEnvelope: 98,
      feedstockEconomy: 92,
      geometricResolution: 38,
      surfaceFinish: 32,
      materialUtilization: 86
    }
  },
  {
    id: 'lpbf',
    name: 'Laser Powder Bed Fusion (L-PBF / SLM)',
    shortName: 'L-PBF (Powder Bed)',
    feedstockType: 'Gas-Atomized Spherical Powder (15 – 45 μm)',
    feedstockCostUsdKg: '$95 – $450 / kg (High atomization & safety cost)',
    depositionRateKgHr: '0.05 – 0.35 kg/h (Multi-laser: 0.8 kg/h)',
    maxBuildEnvelope: '400 × 400 × 400 mm (Up to 800 mm specialized)',
    surfaceRoughnessRaUm: '6 – 18 μm Ra',
    dimensionalToleranceMm: '± 0.05 – 0.15 mm',
    buyToFlyRatio: '1.1 : 1 to 1.4 : 1 (Plus powder sieving loss)',
    capitalEquipmentCost: '$650k – $2.2M+',
    radarScores: {
      depositionSpeed: 18,
      buildEnvelope: 25,
      feedstockEconomy: 35,
      geometricResolution: 98,
      surfaceFinish: 92,
      materialUtilization: 88
    }
  },
  {
    id: 'lded',
    name: 'Laser Directed Energy Deposition (L-DED)',
    shortName: 'L-DED (Powder / Wire)',
    feedstockType: 'Blown Metal Powder (45 – 150 μm) or Fine Wire',
    feedstockCostUsdKg: '$65 – $310 / kg (70–85% powder capture efficiency)',
    depositionRateKgHr: '0.5 – 2.5 kg/h',
    maxBuildEnvelope: '1,000 × 1,500 × 1,000 mm',
    surfaceRoughnessRaUm: '25 – 90 μm Ra',
    dimensionalToleranceMm: '± 0.15 – 0.45 mm',
    buyToFlyRatio: '1.3 : 1 to 1.9 : 1',
    capitalEquipmentCost: '$480k – $1.4M',
    radarScores: {
      depositionSpeed: 55,
      buildEnvelope: 65,
      feedstockEconomy: 50,
      geometricResolution: 68,
      surfaceFinish: 64,
      materialUtilization: 72
    }
  },
  {
    id: 'cnc',
    name: 'Subtractive 5-Axis CNC Machining from Billet',
    shortName: '5-Axis CNC (Billet)',
    feedstockType: 'Wrought Plate, Forged Bar, or Rolled Billet',
    feedstockCostUsdKg: '$12 – $110 / kg (High scrap penalty on Ti/Ni)',
    depositionRateKgHr: 'Material Removal: 5 – 40 kg/h',
    maxBuildEnvelope: '1,500 × 2,500 × 1,200 mm',
    surfaceRoughnessRaUm: '0.4 – 3.2 μm Ra',
    dimensionalToleranceMm: '± 0.005 – 0.025 mm',
    buyToFlyRatio: '6.0 : 1 to 20.0 : 1 (80–95% wasted as chips)',
    capitalEquipmentCost: '$350k – $1.5M',
    radarScores: {
      depositionSpeed: 75,
      buildEnvelope: 78,
      feedstockEconomy: 85,
      geometricResolution: 90,
      surfaceFinish: 99,
      materialUtilization: 14
    }
  }
];

export const LIMITATION_FAILURE_MODES: LimitationFailureMode[] = [
  {
    id: 'residual-stress',
    category: 'Thermal & Mechanical',
    title: 'Residual Stress Accumulation & Substrate Warpage',
    severity: 'Critical',
    physicalMechanism:
      'Localized arc heating (T > 2000 °C) followed by rapid conductive cooling into the cooler underlying baseplate induces severe non-uniform thermal expansion and plastic compression. Upon cooling, longitudinal tensile residual stresses approach the alloy’s yield strength (σ_res ≈ 0.7–0.95 σ_y), causing substrate bowing, baseplate bolt shearing, or delamination at the toe.',
    quantitativeManifestation:
      'Longitudinal tensile stresses of 550–780 MPa in Ti-6Al-4V and Inconel 718; angular distortion of 1.5°–4.2° on unrestrained 15 mm thick substrates.',
    inProcessMitigation:
      'Symmetrical alternating double-sided deposition (building balanced ribs on both sides of a central web plate); back-to-back out-of-phase torch pathing; inter-pass high-pressure mechanical rolling (45–75 kN) which converts tensile residual stress into beneficial compressive stress (-250 MPa).',
    postProcessRemedy:
      'Stress-relief annealing prior to unbolting from the build fixture (e.g., 600–720 °C for 2 hours in vacuum/Argon for Ti-6Al-4V) before wire-EDM substrate removal.',
    affectedAlloys: ['Ti-6Al-4V', 'Inconel 718', 'Maraging Steels', 'High-Strength Steels']
  },
  {
    id: 'anisotropy-columnar',
    category: 'Metallurgical',
    title: 'Epitaxial Columnar Grain Growth & Mechanical Anisotropy',
    severity: 'High',
    physicalMechanism:
      'During layer-by-layer deposition, the steep vertical temperature gradient (G ≈ 10⁴–10⁵ K/m) and comparatively low solidification velocity (R) produce a high G/R ratio that suppresses constitutional supercooling ahead of the solid-liquid interface. Consequently, grains nucleate epitaxially off partially remelted grains in the previous layer, growing continuously across dozens of layers along the ⟨001⟩ crystallographic direction.',
    quantitativeManifestation:
      'Coarse columnar prior-β grains in Ti-6Al-4V spanning 5–25 mm vertically vs. 1–2 mm horizontally; 6–14% lower yield/UTS in the build (Z) direction and directional ductility scatter.',
    inProcessMitigation:
      'Inter-pass cold rolling or ultrasonic impact peening (UIP) introduces high dislocation density (> 10¹⁴ m⁻²); when the subsequent weld pass heats the deformed zone above the β-transus (995 °C), stored strain energy drives static recrystallization into fine isotropic equiaxed grains (< 120 μm). Alternatively, inoculating wire with TiB₂ or La₂O₃ nanoparticles promotes heterogeneous nucleation.',
    postProcessRemedy:
      'Hot Isostatic Pressing (HIP) + sub-transus or super-transus solution treatment and aging cycles.',
    affectedAlloys: ['Ti-6Al-4V', 'Inconel 625 / 718', 'Austenitic 316L', 'Nickel-Aluminum Bronze']
  },
  {
    id: 'stair-stepping-waviness',
    category: 'Geometric & Surface',
    title: 'Surface Waviness, Stair-Stepping & Near-Net Resolution Limits',
    severity: 'Moderate',
    physicalMechanism:
      'Because WAAM melts 0.8–1.6 mm diameter wire in a molten pool governed by surface tension (Marangoni convection) and gravity, minimum single-bead wall widths range from 3.5 to 12 mm with layer heights of 1.0 to 3.5 mm. Curved meniscus solidification at layer edges creates periodic surface waviness ("stair-stepping").',
    quantitativeManifestation:
      'Effective Surface Waviness (SW) of 0.5–2.2 mm; Machining allowance (machining stock offset) of 1.5–3.0 mm per side required for mating bores and fatigue-critical surfaces.',
    inProcessMitigation:
      'Adaptive closed-loop laser line profilometry scanning each deposited layer to adjust wire feed speed and travel speed in real time; CMT pulsed current modulation to flatten wetting angles at wall starts/stops.',
    postProcessRemedy:
      'Integrated hybrid CNC milling cells (alternating N additive layers with 5-axis peripheral end-milling) or post-build robotic abrasive grinding and finish machining.',
    affectedAlloys: ['All WAAM Alloys']
  },
  {
    id: 'porosity-cracking',
    category: 'Defectology',
    title: 'Gas Porosity, Lack-of-Fusion & Intergranular Solidification Cracking',
    severity: 'Critical',
    physicalMechanism:
      '1) Hydrogen porosity in Aluminum due to moisture/hydrocarbons on wire surfaces and an abrupt 20-fold drop in H₂ solubility across the liquidus-solidus transition. 2) Lack-of-fusion voids at multi-bead stepover valleys when wetting angles exceed 90°. 3) Hot tearing / liquation cracking in wide-freezing-range alloys (Al 2xxx/7xxx, Inconel 718) when thermal contraction pulls apart thin liquid films (Laves or eutectic phases) along grain boundaries.',
    quantitativeManifestation:
      'Spherical hydrogen pores (20–250 μm Ø) reducing high-cycle fatigue life by up to 60%; intergranular micro-fissures spanning 100–800 μm in HAZ.',
    inProcessMitigation:
      'CMT-PADV AC polarity wave shaping for Al alloys; tangent overlapping bead stepover models (d_step ≈ 0.66–0.738 × w_bead); active pyrometric dwell-time enforcement.',
    postProcessRemedy:
      'Hot Isostatic Pressing (HIP at 100–150 MPa) heals internal non-surface-connected pores and micro-shrinkage voids to achieve > 99.98% theoretical density.',
    affectedAlloys: ['AA 2319 / 5xxx / 7xxx', 'Inconel 718', 'High-Carbon Tool Steels']
  }
];

export const FUTURE_ROADMAP: RoadmapMilestone[] = [
  {
    horizon: 'Phase I · Near-Term (2025 – 2027)',
    trlRange: 'TRL 7 – 9 · Factory Floor Standardization',
    phaseTitle: 'Closed-Loop Multi-Sensor Control & Hybrid Additive-Subtractive Cells',
    keyEnablers: [
      {
        title: 'Multi-Spectral In-Situ Melt Pool Telemetry',
        domain: 'Process Control',
        technicalDetail:
          'Coaxial two-color pyrometers, NIR/CMOS melt-pool cameras (operating through narrowband Notch filters blocking arc glare), and structured-light 3D laser profilometers feed real-time geometry into MIMO PID/MPC controllers that dynamically modulate wire feed speed and travel velocity within 15 ms.',
        industrialImpact:
          'Eliminates geometric drift over 500+ layer builds and prevents catastrophic nozzle collisions or bead slumping at overhang corners.'
      },
      {
        title: 'Turnkey Hybrid Additive-Subtractive Machine Centers',
        domain: 'Hardware Architecture',
        technicalDetail:
          'Integration of CMT/PAW deposition heads directly into heavy 5-axis CNC gantry mills via automatic tool changers (ATC), paired with dry cryogenic CO₂ cooling so milling cutters can machine internal cavities without contaminating subsequent weld layers with cutting oil.',
        industrialImpact:
          'Enables finished internal cooling channels and H7 bore tolerances in a single clamping setup, reducing floor-to-floor cycle time by 45%.'
      },
      {
        title: 'Automated Non-Destructive Testing (In-Situ NDT)',
        domain: 'Quality Assurance',
        technicalDetail:
          'Robotic Laser Ultrasonics (LUS) and Eddy Current arrays inspect solidified layers at elevated temperatures (300 °C) immediately behind the welding torch, flagging pores ≥ 150 μm for automated remelting repair before the next layer is deposited.',
        industrialImpact:
          'Shifts qualification from expensive post-mortem X-ray CT to "qualify-as-you-build" digital birth certificates.'
      }
    ]
  },
  {
    horizon: 'Phase II · Mid-Term (2027 – 2030)',
    trlRange: 'TRL 5 – 7 · Multi-Robot Swarm & Metallurgical Design',
    phaseTitle: 'Cooperative Multi-Robot Swarms & Functionally Graded Materials (FGM)',
    keyEnablers: [
      {
        title: 'Synchronized Multi-Robot Cooperative Deposition',
        domain: 'Kinematics & Scale',
        technicalDetail:
          '3 to 6 articulated robots mounted on linear rails simultaneously deposit onto a shared 2-axis heavy positioner (up to 25-ton payload), using real-time thermal field balancing algorithms to neutralize asymmetrical residual stress vectors.',
        industrialImpact:
          'Scales net deposition throughput to 25–45 kg/h for 10-meter ship hull sections, hydro-turbine runners, and nuclear containment rings.'
      },
      {
        title: 'Twin-Wire Functionally Graded Alloying (In-Situ Alloying)',
        domain: 'Metallurgy',
        technicalDetail:
          'Dual and triple independent wire feeders blend elemental or dissimilar alloy wires (e.g., Ti + Al + V elemental wires, or 316L Stainless to Inconel 625 to CuCrZr) directly inside the plasma melt pool, guided by CALPHAD phase-diagram pathing to avoid brittle intermetallic zones.',
        industrialImpact:
          'Allows a single monolithic component to exhibit high-temperature oxidation resistance on one face, structural toughness in the core, and high thermal conductivity at cooling fins.'
      },
      {
        title: 'Physics-Informed Digital Twins (ICME)',
        domain: 'Computational Slicing',
        technicalDetail:
          'GPU-accelerated thermo-mechanical Finite Element models predict part distortion prior to printing and automatically pre-deform ("inverse-compensate") the CAD slicing toolpath so the part springs into exact nominal geometry upon cooling.',
        industrialImpact:
          'Cuts trial-and-error first-article prototyping iterations from 5 builds down to 1.'
      }
    ]
  },
  {
    horizon: 'Phase III · Long-Term (2030+)',
    trlRange: 'TRL 4 – 6 · Autonomous Distributed Supply Chains',
    phaseTitle: 'Point-of-Need Maritime/Defense Synthesis & Zero-Scrap Circularity',
    keyEnablers: [
      {
        title: 'Containerized Expeditionary & Offshore Repair Cells',
        domain: 'Supply Chain',
        technicalDetail:
          'ISO-containerized WAAM + 5-axis milling units equipped with active inertial motion compensation for operation aboard naval support vessels and offshore wind maintenance platforms.',
        industrialImpact:
          'Replaces global physical spare-parts warehousing with encrypted digital inventory transmitted via satellite for on-demand synthesis.'
      },
      {
        title: 'Universal Certification via Standardized Digital Passports',
        domain: 'Standards & Regulatory',
        technicalDetail:
          'Full harmonization across AWS D20.1, ISO/ASTM 52900, ASME BPVC, and FAA/EASA Part 21 frameworks allowing voxel-by-voxel thermal history logs to substitute destructive witness coupons.',
        industrialImpact:
          'Unlocks serial batch certification for primary flight-critical and nuclear Class 1 components across decentralized contract manufacturers.'
      }
    ]
  }
];
