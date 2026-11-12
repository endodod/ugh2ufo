import type { Government, Stat } from './types';

export const ERAS = [
  { name: 'Stone Age', emoji: '🪨', year: '10,000 BC' },
  { name: 'Age of Farming', emoji: '🌾', year: '7,000 BC' },
  { name: 'Bronze Age', emoji: '🏺', year: '3,000 BC' },
  { name: 'Iron Age', emoji: '⚒️', year: '1,200 BC' },
  { name: 'Classical Era', emoji: '🏛️', year: '500 BC' },
  { name: 'Medieval Era', emoji: '🏰', year: '900 AD' },
  { name: 'Renaissance', emoji: '🎨', year: '1400 AD' },
  { name: 'Age of Exploration', emoji: '⛵', year: '1550 AD' },
  { name: 'Industrial Era', emoji: '🏭', year: '1820 AD' },
  { name: 'Atomic Era', emoji: '☢️', year: '1950 AD' },
  { name: 'Information Age', emoji: '💾', year: '2000 AD' },
  { name: 'Space Age', emoji: '🚀', year: '2150 AD' },
  { name: 'Interstellar Age', emoji: '🪐', year: '2400 AD' },
  { name: 'Post-Human Age', emoji: '🧠', year: '3100 AD' },
  { name: 'The Last Age (Probably)', emoji: '🌌', year: '4000 AD' },
];

export const TURNS_PER_ERA = 3;

const ERA_YEARS = [-10000, -7000, -3000, -1200, -500, 900, 1400, 1550, 1820, 1950, 2000, 2150, 2400, 3100, 4000, 4500];

export function yearOf(turn: number): number {
  const era = Math.min(Math.floor(turn / TURNS_PER_ERA), ERAS.length - 1);
  const t = (turn - era * TURNS_PER_ERA) / TURNS_PER_ERA;
  const y = ERA_YEARS[era] + (ERA_YEARS[era + 1] - ERA_YEARS[era]) * Math.min(t, 1);
  const step = era < 4 ? 50 : 1;
  return Math.round(y / step) * step;
}

export function formatYear(y: number): string {
  return y < 0 ? `${Math.abs(y).toLocaleString('en-US')} BC` : `${y} AD`;
}

export const STAT_INFO: Record<Stat, { name: string; icon: string }> = {
  pop: { name: 'Population', icon: '👥' },
  food: { name: 'Food', icon: '🌾' },
  gold: { name: 'Gold', icon: '💰' },
  mil: { name: 'Military', icon: '⚔️' },
  sci: { name: 'Science', icon: '🔬' },
  faith: { name: 'Faith', icon: '🙏' },
  joy: { name: 'Happiness', icon: '😀' },
  weird: { name: 'Weirdness', icon: '🌀' },
};

export const FLAG_INFO: Record<string, { name: string; icon: string }> = {
  cats: { name: 'Cat Affairs', icon: '🐈' },
  cult: { name: 'The Cult', icon: '🕯️' },
  genes: { name: 'Gene Tinkering', icon: '🧬' },
  bureaucracy: { name: 'Paperwork', icon: '📎' },
  robots: { name: 'Robotics', icon: '🤖' },
  alien_contact: { name: 'Calling the Stars', icon: '📡' },
  party: { name: 'Eternal Party', icon: '🎉' },
  pigeons: { name: 'Pigeon Affairs', icon: '🐦' },
  gerald: { name: 'Gerald', icon: '🪨' },
  dance: { name: 'The Dancing', icon: '🕺' },
  grudge: { name: 'The Grudge', icon: '😤' },
  hole: { name: 'The Hole', icon: '🕳️' },
  bees: { name: 'Bee Relations', icon: '🐝' },
  heads: { name: 'Stone Heads', icon: '🗿' },
  ducks: { name: 'Duck Rights', icon: '🦆' },
  prophecy: { name: 'The Prophecy', icon: '📜' },
  yeet: { name: 'Throwing Things', icon: '🏹' },
  fungus: { name: 'The Fungus', icon: '🍄' },
  turk: { name: 'Men Inside Machines', icon: '♟️' },
  spice: { name: 'Spice Wars', icon: '🌶️' },
  mascot: { name: 'The Good Dog', icon: '🐕' },
  debt: { name: 'Debt', icon: '💸' },
  inflation: { name: 'Inflation', icon: '📈' },
  corruption: { name: 'Corruption', icon: '🤑' },
  unrest: { name: 'Unrest', icon: '😠' },
  plague: { name: 'Plague', icon: '🦠' },
  heresy: { name: 'Heresy', icon: '🔥' },
  pollution: { name: 'Pollution', icon: '🏭' },
  depleted: { name: 'Depleted Resources', icon: '⛏️' },
  education: { name: 'Education', icon: '🎓' },
  frog_size: { name: 'Size of the Frog', icon: '🐸' },
  ch_purrbot: { name: 'Cat-Driven Machines', icon: '🤖' },
  ch_choir: { name: 'The Orbital Choir', icon: '🎼' },
  ch_beegene: { name: 'Edited Bees', icon: '🐝' },
  ch_duckpaper: { name: 'Duck Clerks', icon: '🦆' },
  ch_dancegrudge: { name: 'The Grudge Dance-Off', icon: '🕺' },
  ch_pigeonspy: { name: 'Feathered Agents', icon: '🐦' },
  ch_yeetnavy: { name: 'Ballistic Navy', icon: '⚓' },
  ch_holeeng: { name: 'Engineering the Hole', icon: '📐' },
  ch_fungscholar: { name: 'Professor Mould', icon: '🍄' },
  ch_mascotdip: { name: 'The Summit Dog', icon: '🐕' },
  ch_genemed: { name: 'The Cure for Ordinary', icon: '💉' },
  ch_propcult: { name: 'Holy Slogans', icon: '📣' },
  ch_geraldturk: { name: "Gerald's Chess Match", icon: '♟️' },
  ch_spicemed: { name: 'Pepper Medicine', icon: '🌶️' },
  ch_headsscholar: { name: 'The Nostril Texts', icon: '🗿' },
  ch_tidenavy: { name: 'The Kelp Admiralty', icon: '🌊' },
  ch_uploadbur: { name: 'Afterlife Paperwork', icon: '💾' },
  ch_ghostspy: { name: 'Ghost Agents', icon: '👻' },
  ch_catmecheng: { name: 'Cat-Knight Maintenance', icon: '🐆' },
  ch_loopproph: { name: 'Notes to Self', icon: '🔁' },
  ch_incdip: { name: 'Acquisition Talks', icon: '💼' },
  ch_driftpig: { name: 'Airspace Dispute', icon: '🎈' },
  ch_weemed: { name: 'Tiny Doctors', icon: '🔬' },
  ch_bellyfrog: { name: 'The Temple in the Frog', icon: '🐸' },
  ch_logparty: { name: 'Party Logistics', icon: '🎪' },
  ch_davebots: { name: 'Dave.exe', icon: '🖥️' },
  ch_politespies: { name: 'Apologetic Spies', icon: '🙇' },
  ch_hatsprop: { name: 'Slogan Hats', icon: '🎩' },
  ch_catsgenes: { name: 'The Cat Genome', icon: '🧬' },
  ch_partyrobots: { name: 'Robot DJs', icon: '🎧' },
  ch_cultgenes: { name: 'Holy Clones', icon: '🕯️' },
  ch_burrobots: { name: 'The Filing Machine', icon: '🗂️' },
  ch_volcanospice: { name: 'Lava Peppers', icon: '🌋' },
  ch_lunareng: { name: 'Moving Day', icon: '🌕' },
  ch_craterbur: { name: 'The Broadcast Licence', icon: '📡' },
  spies: { name: 'Spy Network', icon: '🕵️' },
  navy: { name: 'Navy', icon: '⚓' },
  engineers: { name: 'Engineers', icon: '📐' },
  scholars: { name: 'Scholars', icon: '📚' },
  diplomats: { name: 'Diplomatic Corps', icon: '🎩' },
  medicine: { name: 'Medicine', icon: '💊' },
  logistics: { name: 'Logistics', icon: '🐫' },
  propaganda: { name: 'Propaganda', icon: '📣' },
  tide: { name: 'Tide-Folk Path', icon: '🌊' },
  turtle: { name: 'Turtle Path', icon: '🐢' },
  spore: { name: 'Spore Path', icon: '🍄' },
  upload: { name: 'Upload Path', icon: '💾' },
  lunar: { name: 'Moon Exodus', icon: '🌕' },
  ghost: { name: 'Ghost Path', icon: '👻' },
  tower: { name: 'Building Path', icon: '🏢' },
  catmech: { name: 'Cat-Knight Path', icon: '🐆' },
  dream: { name: 'Dream Path', icon: '💤' },
  loop: { name: 'Time Loop', icon: '🔁' },
  mural: { name: 'Mural Path', icon: '🖼️' },
  drift: { name: 'Sky-Drift Path', icon: '🎈' },
  inc: { name: 'Incorporation', icon: '💼' },
  wee: { name: 'Shrinking Path', icon: '🔬' },
  belly: { name: 'Swallowed Path', icon: '🐸' },
};

export const GOVERNMENTS: Record<string, Government> = {
  tribe: { id: 'tribe', name: 'Tribe', emoji: '🔥', desc: 'Everyone sits around the fire and argues.', perTurn: { joy: 1 } },
  chiefdom: { id: 'chiefdom', name: 'Chiefdom', emoji: '🪶', desc: 'One guy with the biggest hat decides.', perTurn: { mil: 1 } },
  theocracy: { id: 'theocracy', name: 'Theocracy', emoji: '⛪', desc: 'The gods are in charge. Their spokesmen especially.', perTurn: { faith: 3, sci: -1 } },
  monarchy: { id: 'monarchy', name: 'Monarchy', emoji: '👑', desc: 'Rule by whoever was born first in the right bed.', perTurn: { gold: 2, joy: -1 } },
  republic: { id: 'republic', name: 'Republic', emoji: '🏛️', desc: 'Senators, togas and the occasional stabbing.', perTurn: { gold: 1, sci: 1 } },
  democracy: { id: 'democracy', name: 'Democracy', emoji: '🗳️', desc: 'Everyone votes. Nobody reads.', perTurn: { joy: 2, sci: 1, mil: -1 } },
  empire: { id: 'empire', name: 'Empire', emoji: '🦅', desc: 'Like a kingdom, but with more maps.', perTurn: { mil: 3, joy: -2 } },
  communism: { id: 'communism', name: 'Communism', emoji: '⚒️', desc: 'Everything belongs to everyone, especially the tractors.', perTurn: { food: 2, mil: 1, gold: -2 } },
  corporatocracy: { id: 'corporatocracy', name: 'Corporatocracy', emoji: '💼', desc: 'The nation is now a subscription service.', perTurn: { gold: 4, joy: -2 } },
  technocracy: { id: 'technocracy', name: 'Technocracy', emoji: '🧪', desc: 'Ruled by people who say "well, actually".', perTurn: { sci: 3, faith: -1 } },
  cat_monarchy: { id: 'cat_monarchy', name: 'Cat Monarchy', emoji: '😼', desc: 'The throne is warm. The ruler is asleep on it.', perTurn: { weird: 2, joy: 2, gold: -1 } },
  hive_mind: { id: 'hive_mind', name: 'Hive Mind', emoji: '🐝', desc: 'We are all very happy about this decision.', perTurn: { sci: 2, mil: 2, joy: -1, weird: 1 } },
  ai_overlord: { id: 'ai_overlord', name: 'AI Overlord', emoji: '🖥️', desc: 'It is optimizing you. Please hold still.', perTurn: { sci: 3, gold: 2, joy: -2, weird: 1 } },
  anarchy: { id: 'anarchy', name: 'Anarchy', emoji: '🏴', desc: 'No rules. Mostly fine, surprisingly.', perTurn: { joy: 2, gold: -2, weird: 1 } },
  bureaucracy_state: { id: 'bureaucracy_state', name: 'Bureaucratic State', emoji: '🗂️', desc: 'Your government now exists to process itself.', perTurn: { gold: 1, joy: -1 } },
  cult_state: { id: 'cult_state', name: 'Holy Cult-State', emoji: '🔮', desc: 'The robes are mandatory. The chanting is encouraged.', perTurn: { faith: 4, weird: 1, sci: -1 } },
};

const PREFIX = ['Grand', 'Holy', 'United', 'Free', 'Glorious', 'Sleepy', 'Mildly Annoyed', 'Eternal', 'Damp', 'Most Serene'];
const SYL = ['ur', 'mba', 'gol', 'zek', 'tha', 'por', 'lun', 'vee', 'kra', 'bo', 'snif', 'wog', 'ell', 'ix', 'dor', 'amu', 'fen', 'qua'];
const KIND = ['Tribes', 'Kingdom', 'Republic', 'Horde', 'Collective', 'Duchy', 'Federation', 'Confederacy'];
const RIVAL_EMOJI = ['🐗', '🦉', '🐸', '🦂', '🐻', '🦩', '🐌', '🦑', '🐐', '🦔'];
const LEADER_TITLES = ['Ugg the Pretty Okay', 'Grunda Big-Arms', 'Old Man Thok', 'Little Rok', 'Mmm the Quiet'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomPeopleName(): string {
  const n = pick(SYL) + pick(SYL) + (Math.random() < 0.5 ? pick(SYL) : '');
  return n[0].toUpperCase() + n.slice(1);
}

export function randomRivalName(): string {
  const people = randomPeopleName();
  return Math.random() < 0.5 ? `${pick(PREFIX)} ${pick(KIND)} of ${people}` : `The ${people}ians`;
}

export function randomRivalEmoji(used: string[]): string {
  const free = RIVAL_EMOJI.filter((e) => !used.includes(e));
  return pick(free.length ? free : RIVAL_EMOJI);
}

export function randomLeader(): string {
  return pick(LEADER_TITLES);
}

export { pick };
