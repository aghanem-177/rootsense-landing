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
      title: 'Wind gauge',
      subtitle: 'Wind speed',
      description:
        'The small fan at the top measures wind speed. Wind dries soil faster, so a windy reading tells you the plants may need water sooner.',
      spec: 'Range: 0–30 m/s | Accuracy: ±0.3 m/s | Instant updates',
      color: '#4A4A4A',
      labelPos: { x: 55, y: 4, anchor: 'right' },
    },
    {
      id: 'solar',
      title: 'Solar panels',
      subtitle: 'Power',
      description:
        'Two monocrystalline solar panels charge the battery during the day, so there is no wiring to run and no battery to swap.',
      spec: '2× monocrystalline cells | Output: 5V | Battery life: 12+ months',
      color: '#2A4A7A',
      labelPos: { x: 52, y: 15, anchor: 'right' },
    },
    {
      id: 'soil-screen',
      title: 'Soil screen',
      subtitle: 'Soil readings',
      description:
        'The round screen shows pH, salinity, temperature, sunlight and nitrate levels. You can read the soil on the spot, without a lab test or an app.',
      spec: 'pH: 0.1-13.9 | EC (Salinity): % | Nitrate (NPK + Mg): % | Temp: °C',
      color: 'var(--green-mid)',
      labelPos: { x: 40, y: 34, anchor: 'left' },
    },
    {
      id: 'wind-screen',
      title: 'Air screen',
      subtitle: 'Air readings',
      description:
        'The second screen shows the wind speed, the battery level and whether everything is working.',
      spec: 'Wind speed: m/s | Charge: % | Battery status indicator',
      color: '#2E7D3E',
      labelPos: { x: 54, y: 33, anchor: 'right' },
    },
    {
      id: 'probe',
      title: 'Probe rod',
      subtitle: 'Root-zone sensing',
      description:
        'The stainless-steel rod reaches about 20 cm into the soil, so the readings come from the roots rather than the surface.',
      spec: 'Material: Stainless steel | Depth: ~20cm | Corrosion-resistant',
      color: '#5C6770',
      labelPos: { x: 20, y: 55, anchor: 'right' },
    },
    {
      id: 'body',
      title: 'Housing',
      subtitle: 'The case',
      description:
        'The two-piece case holds the electronics, battery and wiring. It is made from UV-resistant plastic to stand up to sun, rain and dust.',
      spec: 'Material: UV-resistant polymer | IP67 rated | Tool-free assembly',
      color: '#7A6440',
      labelPos: { x: 68, y: 47, anchor: 'right' },
    },
    {
      id: 'ceramic',
      title: 'Clay cone',
      subtitle: 'Watering',
      description:
        'The porous clay tip lets water out into the soil. Dry soil pulls water through it, and as the soil gets wetter the pull weakens and the flow slows, with no power needed.',
      spec: 'Material: Fired terracotta clay | Pore size: 1–3 μm',
      color: 'var(--brown-mid)',
      labelPos: { x: 40, y: 68, anchor: 'left' },
    },
  ],
}

// Part names come from the owner's labelled internal-layout diagram, which is kept off the site.
export const flowPlusBreakdown: Breakdown = {
  assembled: { src: '/products/flow-sense-plus-onyx-black.webp', alt: 'Flow Sense +, assembled' },
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
