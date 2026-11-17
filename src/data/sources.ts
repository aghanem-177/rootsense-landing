export interface Source {
  publisher: string
  title: string
  year: number
  url: string
}

export interface Figure {
  value: string
  label: string
  source: Source
}

// Each figure was checked against the linked page on 17 November 2026.
export const pressureFigures: Figure[] = [
  {
    value: '≈500 m³',
    label:
      'of water per person per year in Egypt, down from 2,000 m³ in 1962. The international water-poverty line is 1,000 m³.',
    source: {
      publisher: "Ahram Online, reporting Egypt's Minister of Water Resources and Irrigation",
      title: "Egypt's per capita water share drops to 500 cubic metres amid widening supply-demand gap",
      year: 2026,
      url: 'https://english.ahram.org.eg/News/565510.aspx',
    },
  },
  {
    value: '83%',
    label: 'of people in the Middle East and North Africa live with extremely high water stress.',
    source: {
      publisher: 'World Resources Institute',
      title: '25 Countries, Housing One-Quarter of the Population, Face Extremely High Water Stress',
      year: 2023,
      url: 'https://www.wri.org/insights/highest-water-stressed-countries',
    },
  },
  {
    value: '1.38 bn ha',
    label: "of the world's land is affected by salt — 10.7% of all land area.",
    source: {
      publisher: 'Food and Agriculture Organization of the United Nations (FAO)',
      title: 'FAO launches first major global assessment of salt-affected soils in 50 years',
      year: 2024,
      url: 'https://www.fao.org/newsroom/detail/fao-launches-first-major-global-assessment-of-salt-affected-soils-in-50-years/en',
    },
  },
]

export const researchFigure: Figure = {
  value: '15–51%',
  label:
    'less irrigation water when drip watering was switched by soil-moisture sensors instead of a fixed timer, in a tomato field trial on sandy soil in Florida.',
  source: {
    publisher: 'Zotarelli et al., Agricultural Water Management 96(1), pp. 23–34',
    title:
      'Tomato yield, biomass accumulation, root distribution and irrigation water use efficiency on a sandy soil, as affected by nitrogen rate and irrigation scheduling',
    year: 2009,
    url: 'https://ideas.repec.org/a/eee/agiwat/v96y2009i1p23-34.html',
  },
}

export const sdgSource: Source = {
  publisher: 'United Nations',
  title: 'Transforming our World: the 2030 Agenda for Sustainable Development',
  year: 2015,
  url: 'https://sdgs.un.org/goals',
}
