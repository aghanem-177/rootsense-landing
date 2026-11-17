export type FamilyId = 'solo' | 'flow' | 'terra'
export type ThemeId = FamilyId | 'brand'

export interface Choice {
  id: string
  label: string
  swatch?: string
}

export interface ChoiceGroup {
  id: 'colour' | 'closing'
  legend: string
  choices: Choice[]
}

export interface Family {
  id: FamilyId
  name: string
  line: string
  forWho: string
}

export interface Product {
  slug: string
  name: string
  family: FamilyId
  price: number
  summary: string
  description: string
  forWho: string
  keyInfo: string[]
  inTheBox: string[]
  choiceGroups: ChoiceGroup[]
  images: Partial<Record<string, string>>
}

export type Selection = Partial<Record<ChoiceGroup['id'], string>>

const COLOUR: ChoiceGroup = {
  id: 'colour',
  legend: 'Colour',
  choices: [
    { id: 'onyx-black', label: 'Onyx Black', swatch: '#1C1C1C' },
    { id: 'camel-brown', label: 'Camel Brown', swatch: '#A8743F' },
  ],
}

// TODO(owner): confirm what this choice controls so a one-line explanation can be added under each option.
const CLOSING: ChoiceGroup = {
  id: 'closing',
  legend: 'Lock or button',
  choices: [
    { id: 'lock-and-key', label: 'Lock and key' },
    { id: 'press-down-button', label: 'Press-down button' },
  ],
}

export const families: Record<FamilyId, Family> = {
  solo: {
    id: 'solo',
    name: 'Solo',
    line: 'Makes sense on its own.',
    forWho: 'Pots, home gardens and single beds',
  },
  flow: {
    id: 'flow',
    name: 'Flow',
    line: 'Sense that moves water.',
    forWho: 'Greenhouse tunnels, drip lines and small farms',
  },
  terra: {
    id: 'terra',
    name: 'Terra',
    line: 'Sense by the feddan.',
    forWho: 'Commercial farms and agribusinesses',
  },
}

export const products: Product[] = [
  {
    slug: 'solo-sense',
    name: 'Solo Sense',
    family: 'solo',
    price: 850,
    summary: 'A clay cone that waters by itself, with two screens that show what the soil and the air are doing.',
    description:
      'Push Solo Sense into the soil beside a plant. Its clay cone lets water through as the soil dries and slows it as the soil gets wet, with no moving parts. Two solar-powered screens show the soil and air readings, and the manual tells you what each reading means.',
    forWho: 'Home growers with pots, beds and small gardens who want to see what the soil needs without a phone or an app.',
    keyInfo: [
      'Clay cone waters by itself, with no power needed',
      'Soil screen: pH, salinity, temperature, sunlight and nitrates',
      'Air screen: wind speed and battery charge',
      'Solar panels charge the battery',
      'Needs no phone, internet or mains power',
      'Manual in Arabic and English',
      'About 30 cm long and 380 g',
    ],
    inTheBox: ['Solo Sense unit', 'Solo Sense manual', 'Plant handbook'],
    choiceGroups: [COLOUR],
    // Onyx Black is a digital recolour of the Camel Brown photo; swap in a real photo when one exists.
    images: { 'camel-brown': '/product-nobg.png', 'onyx-black': '/product-onyx-black.png' },
  },
  {
    slug: 'flow-sense',
    name: 'Flow Sense',
    family: 'flow',
    price: 2950,
    summary: 'Reads the soil and opens its cabled valve when the roots need water.',
    description:
      'Flow Sense checks the soil at root depth and compares each reading with the range that suits your crop. When the soil is too dry it opens the valve, which is connected by cable, and closes it once the soil is moist. Control stays on the unit, so watering carries on if your phone is off. It works with the RootSense app.',
    forWho: 'Growers with greenhouse tunnels, drip lines, nurseries or small plots who want watering to follow the soil, not the clock.',
    keyInfo: [
      'Opens and closes its valve from the soil readings',
      'Valve connected by cable',
      'Keeps watering if the phone or connection drops',
      'Works with the RootSense app',
      'Rechargeable battery',
    ],
    inTheBox: ['Flow Sense unit', 'Valves', 'Flow Sense manual', 'Plant handbook'],
    choiceGroups: [COLOUR, CLOSING],
    images: { 'camel-brown': '/flow-sense-camel-brown.webp' },
  },
  {
    slug: 'flow-sense-plus',
    name: 'Flow Sense +',
    family: 'flow',
    price: 3950,
    summary: 'Everything Flow Sense does, with a wireless valve link and room for more servos.',
    description:
      'Flow Sense + works like Flow Sense, but it links to its valves over Bluetooth, so there is no cable to run between the unit and the water line. It can also handle more servos than Flow Sense. Control stays on the unit, and it works with the RootSense app.',
    forWho: 'Growers whose water line is awkward to reach by cable, or who need one unit to work more servos.',
    keyInfo: [
      'Links to its valves over Bluetooth, with no cable',
      'Handles more servos than Flow Sense',
      'Opens and closes valves from the soil readings',
      'Keeps watering if the phone or connection drops',
      'Works with the RootSense app',
      'Colour screen and three front buttons',
      'Rechargeable 3300 mAh battery',
    ],
    inTheBox: ['Flow Sense + unit', 'Valves', 'Flow Sense + manual', 'Plant handbook'],
    choiceGroups: [COLOUR, CLOSING],
    images: { 'onyx-black': '/flow-sense-plus-onyx-black.webp' },
  },
  {
    slug: 'terra-sense',
    name: 'Terra Sense',
    family: 'terra',
    price: 12500,
    summary: 'A hub and field receptors that bring soil-led watering to a whole farm.',
    description:
      'Terra Sense is built for commercial farms. Solar-powered field receptors sit in each irrigation zone and read moisture and temperature at root depth. They report by radio to a hub, which adds pH, salinity, air and light readings and switches the valves and pump starters your farm already has. You keep your drip or pivot system and gain control zone by zone.',
    forWho: 'Commercial farms and agribusinesses that want zone-by-zone control of the irrigation they already run.',
    keyInfo: [
      'Field receptors read moisture and temperature at root depth',
      'Hub adds pH, salinity, air and light readings',
      'Switches your existing valves and pump starters',
      'Works with drip and pivot systems',
      'Add receptors to cover more ground',
      'Installation and a follow-up visit included',
    ],
    inTheBox: ['Terra Sense hub', 'Field receptors', 'Terra Sense manual', 'Plant handbook'],
    choiceGroups: [],
    images: { default: '/terra-sense.png' },
  },
]

export const formatPrice = (price: number) => `EGP ${price.toLocaleString('en-US')}`

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

export const productsInFamily = (family: FamilyId) => products.filter((p) => p.family === family)

export const lowestPrice = (family: FamilyId) => Math.min(...productsInFamily(family).map((p) => p.price))

export function missingChoices(product: Product, selection: Selection) {
  return product.choiceGroups.filter(
    (group) => !group.choices.some((choice) => choice.id === selection[group.id]),
  )
}

export function choiceLabel(product: Product, groupId: ChoiceGroup['id'], choiceId: string | undefined) {
  const group = product.choiceGroups.find((g) => g.id === groupId)
  return group?.choices.find((c) => c.id === choiceId)?.label
}

export function readSelection(product: Product, params: URLSearchParams): Selection {
  const selection: Selection = {}
  for (const group of product.choiceGroups) {
    const value = params.get(group.id)
    if (value) selection[group.id] = value
  }
  return selection
}

export function waitlistUrl(product: Product, selection: Selection) {
  const params = new URLSearchParams({ model: product.slug })
  for (const group of product.choiceGroups) {
    const value = selection[group.id]
    if (value) params.set(group.id, value)
  }
  return `/waitlist?${params.toString()}`
}
