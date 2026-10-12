// Everything the site says about the bar lives here.
// Rows tagged `sample` are placeholders until the bar sends its real tap list.

export const VENUE = {
  name: 'Tønne',
  fullName: 'Tønne Bar',
  street: '1-3 St Martins',
  square: "St Martin's Square",
  city: 'Leicester',
  postcode: 'LE1 5DG',
  phone: '07942 142633',
  phoneHref: 'tel:+447942142633',
  directions:
    'https://www.google.com/maps/search/?api=1&query=T%C3%B8nne+Bar+Leicester&query_place_id=ChIJDbg2yXlhd0gRnK2FnpYd4oM',
  opened: 2019,
  formerly: 'Vintners',
  rating: 4.7,
  reviewCount: 181,
  facebook: 'https://www.facebook.com/tonnebar/',
  instagram: 'https://www.instagram.com/tonnebar/',
  instagramHandle: '@tonnebar',
} as const;

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

/** Opening and closing in minutes after midnight of the day the session starts.
 *  A close past 24:00 runs into the next morning (26:00 = 2am). */
export const HOURS: { day: DayKey; label: string; open: number; close: number }[] = [
  { day: 'mon', label: 'Monday', open: 16 * 60, close: 26 * 60 },
  { day: 'tue', label: 'Tuesday', open: 16 * 60, close: 26 * 60 },
  { day: 'wed', label: 'Wednesday', open: 16 * 60, close: 26 * 60 },
  { day: 'thu', label: 'Thursday', open: 16 * 60, close: 26 * 60 },
  { day: 'fri', label: 'Friday', open: 16 * 60, close: 27 * 60 },
  { day: 'sat', label: 'Saturday', open: 12 * 60, close: 27 * 60 },
  { day: 'sun', label: 'Sunday', open: 14 * 60, close: 26 * 60 },
];

export type Style = 'belgian-cherry' | 'fruit-lager' | 'sour' | 'pale' | 'ipa' | 'stout' | 'lager';

export const STYLE_COLOURS: Record<Style, { beer: string; head: string }> = {
  'belgian-cherry': { beer: '#8f1726', head: '#f1d9cf' },
  'fruit-lager': { beer: '#f1b65e', head: '#fbf3e3' },
  sour: { beer: '#e2636a', head: '#fbe3df' },
  pale: { beer: '#efc25c', head: '#fbf4e2' },
  ipa: { beer: '#e39a37', head: '#fbf1dc' },
  stout: { beer: '#22140d', head: '#d9b98e' },
  lager: { beer: '#f4d470', head: '#fdf8ea' },
};

export type Tap = {
  id: string;
  name: string;
  note: string;
  style: Style;
  sample?: boolean;
};

export const TAPS: Tap[] = [
  { id: 'delirium-red', name: 'Delirium Red', note: 'Belgian · cherry', style: 'belgian-cherry' },
  { id: 'jubel', name: 'Jubel', note: 'Lager cut with fruit', style: 'fruit-lager' },
  { id: 'sample-sour', name: 'Sour', note: 'Sample', style: 'sour', sample: true },
  { id: 'sample-pale', name: 'Pale', note: 'Sample', style: 'pale', sample: true },
  { id: 'sample-ipa', name: 'IPA', note: 'Sample', style: 'ipa', sample: true },
  { id: 'sample-stout', name: 'Stout', note: 'Sample', style: 'stout', sample: true },
  { id: 'sample-lager', name: 'Lager', note: 'Sample', style: 'lager', sample: true },
];

export const REVIEWS = [
  { text: 'Best bar in town, love the delirium red and jubel (on tap!!)', source: 'Google review' },
  { text: 'the top 10 selection was a great way to sample all the drinks', source: 'Google review' },
  { text: "We only found it through the Leicester Comedy Festival and we'll be back", source: 'Google review' },
] as const;

export type Show = { date: string; day: number; title: string; act?: string; price: string };

/** Leicester Comedy Festival 2026 at Tønne. `day` is the February date, for grouping. */
export const SHOWS: Show[] = [
  { date: 'Sun 8 Feb', day: 8, act: 'Jonny Pelham', title: 'New Jokes (WIP)', price: '£8' },
  { date: 'Thu 12 Feb', day: 12, act: 'Amy Webber', title: 'Wannabe', price: '£8' },
  { date: 'Thu 12 & Fri 13 Feb', day: 12, title: 'Opinion War with Rob Manuel', price: '£10' },
  { date: 'Fri 13 Feb', day: 13, act: 'Stuart McPherson', title: 'Crisps and a Lie Down', price: '£12' },
  { date: 'Sun 15 Feb', day: 15, act: 'Rosalie Minnitt', title: 'Clementine 2.0 (WIP)', price: '£8' },
  { date: 'Fri 20 Feb', day: 20, act: 'Mikey Bligh-Smith', title: 'Full Frontal Mikey Mode', price: '£7' },
  { date: 'Sat 21 Feb', day: 21, act: 'Kate Hammer', title: 'Government Approved Comedian', price: '£6' },
  { date: 'Sat 21 Feb', day: 21, act: 'Jacob Nussey', title: 'Primed', price: '£8' },
  { date: 'Sat 21 Feb', day: 21, act: 'Sara Barron', title: 'Work In Progress', price: '£8' },
  { date: 'Sat 21 Feb', day: 21, act: 'Lou Taylor', title: 'Work in Progress', price: '£8' },
  { date: 'Sat 21 Feb', day: 21, act: 'Rob Copland', title: 'Work In Progress', price: '£8' },
];

export const PHOTOS = {
  night: {
    base: 'tonne-bar-at-jight',
    ext: 'jpg',
    w: 526,
    h: 526,
    alt: "Tønne's black shopfront at night, the sign lit and the windows glowing, tables out on the paving.",
  },
  frontage: {
    base: 'Tone-2022-1',
    ext: 'jpg',
    w: 600,
    h: 800,
    alt: 'The red Tønne frontage in 2022, picnic benches lined up outside on the wet brick paving of the square.',
  },
  outfront: {
    base: 'tonne-oct-2020',
    ext: 'jpg',
    w: 526,
    h: 526,
    alt: 'Someone mid-jump with an umbrella outside Tønne in October 2020, behind barriers lettered TØNNE.',
  },
  building: {
    base: 'image-59',
    ext: 'jpg',
    w: 415,
    h: 278,
    alt: 'Black and white photo of the Tønne building: the shopfront, its arched side window and the floor above.',
  },
} as const;

export type PhotoKey = keyof typeof PHOTOS;
