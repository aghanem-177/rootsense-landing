export interface BreakdownPart {
  id: string
  title: string
  subtitle: string
  description: string
  spec: string
  color: string
  // Label position as a percentage of the exploded image, from its top-left corner.
  labelPos: { x: number; y: number; anchor: 'left' | 'right' } | null
}

export interface Breakdown {
  assembled: { src: string; alt: string }
  exploded: { src: string; alt: string }
  parts: BreakdownPart[]
}

export const soloBreakdown: Breakdown = {
  assembled: { src: '/product-nobg.png', alt: 'Solo Sense, assembled' },
  exploded: { src: '/product-exploded-nobg.png', alt: 'Solo Sense with its parts separated' },
  parts: [
    {
      id: 'overview',
      title: 'Solo Sense',
      subtitle: 'Assembled',
      description:
        'A clay cone that waters by itself, two screens that show what the soil and the air are doing, and solar panels that keep it running. Push it into the soil beside the plant.',
      spec: 'Weight: ~380g | Length: ~30cm | Solar-powered | 2 screens',
      color: 'var(--green-mid)',
      labelPos: null,
    },
    {
      id: 'anemometer',
      title: 'Anemometer',
      subtitle: 'Wind Speed Monitoring',
      description:
        'The fan-blade anemometer at the top measures real-time wind speed, helping farmers understand evapotranspiration rates. Higher wind means faster soil drying — so you know when crops need extra attention.',
      spec: 'Range: 0–30 m/s | Accuracy: ±0.3 m/s | Instant updates',
      color: '#4A4A4A',
      labelPos: { x: 55, y: 4, anchor: 'right' },
    },
    {
      id: 'solar',
      title: 'Solar Panels',
      subtitle: 'Self-Sustaining Power',
      description:
        'Two high-efficiency monocrystalline solar panels continuously charge the internal battery. No wiring, no battery replacements — the stake powers itself indefinitely under normal daylight conditions.',
      spec: '2× monocrystalline cells | Output: 5V | Battery life: 12+ months',
      color: '#2A4A7A',
      labelPos: { x: 52, y: 15, anchor: 'right' },
    },
    {
      id: 'soil-screen',
      title: 'Soil Reading Screen',
      subtitle: 'Real-Time Soil Intelligence',
      description:
        'The circular LCD displays live soil diagnostics: pH level, salinity (EC), temperature, sunlight levels and Nitrate Availability. Farmers see exactly what their soil needs without any lab testing, technology or smartphone apps.',
      spec: 'pH: 0.1-13.9 | EC (Salinity): % | Nitrate (NPK + Mg): % | Temp: °C',
      color: 'var(--green-mid)',
      labelPos: { x: 40, y: 34, anchor: 'left' },
    },
    {
      id: 'wind-screen',
      title: 'Wind Speed Screen',
      subtitle: 'Environmental Monitoring Display',
      description:
        'The second LCD shows wind speed from the anemometer, battery charge level, and system status. Together with the soil screen, it gives a complete picture of both ground and air conditions.',
      spec: 'Wind speed: m/s | Charge: % | Battery status indicator',
      color: 'var(--green-bright)',
      labelPos: { x: 54, y: 33, anchor: 'right' },
    },
    {
      id: 'probe',
      title: 'Metal Rod Probe',
      subtitle: 'Deep Soil Sensing',
      description:
        'The stainless-steel probe rod extends deep into the soil to measure conditions at root level — not just the surface. It delivers accurate readings from where it matters most, ensuring irrigation decisions are based on real root-zone data.',
      spec: 'Material: Stainless steel | Depth: ~20cm | Corrosion-resistant',
      color: '#8A9298',
      labelPos: { x: 20, y: 55, anchor: 'right' },
    },
    {
      id: 'body',
      title: 'Beige Housing',
      subtitle: 'Rugged Protective Body',
      description:
        'The two-piece clamshell body houses all electronics, battery, and wiring. Made from UV-resistant polymer, it protects the internals from sun, rain, and dust while keeping the total weight manageable for field deployment.',
      spec: 'Material: UV-resistant polymer | IP67 rated | Tool-free assembly',
      color: '#B89A6A',
      labelPos: { x: 68, y: 47, anchor: 'right' },
    },
    {
      id: 'ceramic',
      title: 'Ceramic Cone',
      subtitle: 'Soil Water Tension Sensor & Valve',
      description:
        'The porous terracotta tip acts as both sensor and valve. Drier soil creates stronger suction, pulling water through the micropores. When soil is moist, suction weakens and flow stops automatically — pure physics, no electricity needed.',
      spec: 'Material: Fired terracotta clay | Pore size: 1–3 μm',
      color: 'var(--brown-mid)',
      labelPos: { x: 40, y: 68, anchor: 'left' },
    },
  ],
}

// Part names come from the owner's labelled internal-layout diagram, which is kept off the site.
export const flowPlusBreakdown: Breakdown = {
  assembled: { src: '/flow-sense-plus-onyx-black.webp', alt: 'Flow Sense +, assembled' },
  exploded: { src: '/flow-sense-plus-exploded.webp', alt: 'Flow Sense + with its parts separated' },
  parts: [
    {
      id: 'overview',
      title: 'Flow Sense +',
      subtitle: 'Assembled',
      description:
        'The controller, screen, battery and soil probe sit in one body. It reads the soil, shows the result on its screen and switches its valves over Bluetooth, with no cable to the water line.',
      spec: 'Wi-Fi + Bluetooth | 3.7 V, 3300 mAh battery | 12 V supply',
      color: '#17605B',
      labelPos: null,
    },
    {
      id: 'cover',
      title: 'Screen cover',
      subtitle: 'Top of the case',
      description: 'The raised top of the case that holds the screen. It fixes to the body with screws into brass inserts.',
      spec: 'Screws into the main case',
      color: '#3A3F44',
      labelPos: { x: 41, y: 13, anchor: 'left' },
    },
    {
      id: 'screen',
      title: 'Screen',
      subtitle: 'Live readings',
      description: "A colour screen that shows the soil readings and the unit's status, so you can check the ground without opening the app.",
      spec: 'ST7789 LCD | 172 × 320 pixels',
      color: '#1F5F8B',
      labelPos: { x: 46, y: 22, anchor: 'left' },
    },
    {
      id: 'buttons',
      title: 'Buttons',
      subtitle: 'Controls',
      description: 'Three buttons on the front, marked back, pause and forward, for using the unit without a phone.',
      spec: '3 push buttons',
      color: '#4A4F55',
      labelPos: { x: 50, y: 31, anchor: 'left' },
    },
    {
      id: 'controller',
      title: 'Controller',
      subtitle: 'The brain',
      description:
        'Reads the probe, compares each reading with the range for your crop and decides when to open the valves. Wi-Fi and Bluetooth are built in, which is how it reaches the app and its valves.',
      spec: 'ESP32 DevKit V1 (ESP-WROOM-32) | Wi-Fi + Bluetooth',
      color: '#0F5257',
      labelPos: { x: 51, y: 36, anchor: 'left' },
    },
    {
      id: 'boost',
      title: 'Boost converter',
      subtitle: 'Power',
      description: "Steps the battery's 3.7 V up to 12 V for the parts that need more power.",
      spec: 'Output: 12 V',
      color: '#2E7D3E',
      labelPos: { x: 63, y: 43, anchor: 'right' },
    },
    {
      id: 'rs485',
      title: 'RS485 converter',
      subtitle: 'Sensor link',
      description: 'Lets the controller read the soil probe over RS485, a sturdy wired link used for field sensors.',
      spec: 'HW-519R',
      color: '#2F5D9E',
      labelPos: { x: 40, y: 43, anchor: 'left' },
    },
    {
      id: 'battery',
      title: 'Battery',
      subtitle: 'Power store',
      description: 'A rechargeable battery that runs the unit, so it needs no mains power at the bed or tunnel.',
      spec: '3.7 V Li-ion | 3300 mAh',
      color: '#1D5FA8',
      labelPos: { x: 57, y: 64, anchor: 'right' },
    },
    {
      id: 'charger',
      title: 'Battery charger',
      subtitle: 'Charging',
      description: 'Charges the battery and shows whether it is charging or full.',
      spec: 'TP4056 | Charge status light',
      color: '#336699',
      labelPos: { x: 34, y: 69, anchor: 'left' },
    },
    {
      id: 'probe',
      title: 'Soil probe',
      subtitle: 'Root-zone sensing',
      description: 'Metal pins that go into the soil at root depth and take the readings the controller works from.',
      spec: 'Metal pins | Wired to the controller',
      color: '#5C6770',
      labelPos: { x: 39, y: 88, anchor: 'left' },
    },
    {
      id: 'case',
      title: 'Case',
      subtitle: 'Two-piece body',
      description: 'Two halves close around the boards, battery and wiring.',
      spec: 'Two halves + screen cover',
      color: '#2B2F33',
      labelPos: { x: 31, y: 57, anchor: 'left' },
    },
  ],
}
