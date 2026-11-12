import type { GameState } from './engine';

const KEY = 'ugh-to-ufo-profile';
const MAX_RUNS = 50;

export interface RunRecord {
  date: string;
  seed: string;
  civ: string;
  win: boolean;
  title: string;
  route: string;
  era: number;
  form: string | null;
  origins: string[];
}

export interface Profile {
  achievements: Record<string, string>;
  runs: RunRecord[];
  endings: string[];
  storylines: string[];
}

export interface Achievement {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  test: (s: GameState) => boolean;
}

const f = (s: GameState, k: string) => s.flags[k] ?? 0;
const won = (s: GameState, route: string) => !!s.ending?.win && s.ending.route.split(',').includes(route);
const title = (t: string) => (s: GameState) => s.ending?.title === t;

// storyline flag -> stage that counts as "peaked"
export const STORYLINES: Record<string, { name: string; max: number }> = {
  pigeons: { name: 'Pigeons', max: 6 },
  gerald: { name: 'Gerald', max: 6 },
  dance: { name: 'Dance', max: 5 },
  hole: { name: 'The Hole', max: 6 },
  bees: { name: 'Bees', max: 5 },
  ducks: { name: 'Ducks', max: 5 },
  yeet: { name: 'Yeet', max: 5 },
  mascot: { name: 'The Dog', max: 5 },
  spice: { name: 'Spice', max: 5 },
};

export const ENDING_TITLES = ['Nobody Left', 'Total Defeat', 'Defeat, Narrowly', 'Victory, Mostly', 'Total Victory'];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'nobody_left', emoji: '🪦', name: 'Nobody Left', desc: 'Go extinct. Impressively early.', test: title('Nobody Left') },
  { id: 'total_defeat', emoji: '💥', name: 'Total Defeat', desc: 'Lose all three waves.', test: title('Total Defeat') },
  { id: 'narrow_defeat', emoji: '🩹', name: 'Gift Shop Planet', desc: 'Lose, but narrowly.', test: title('Defeat, Narrowly') },
  { id: 'mostly_victory', emoji: '🥈', name: 'Mostly Fine', desc: 'Win two waves out of three.', test: title('Victory, Mostly') },
  { id: 'total_victory', emoji: '🏆', name: 'Not One Got Through', desc: 'Win every wave.', test: title('Total Victory') },
  { id: 'cats_win', emoji: '🐱', name: 'Cat Person', desc: 'Win a wave by cat.', test: (s) => won(s, 'cats') },
  { id: 'gerald_win', emoji: '🪨', name: 'Rock Solid', desc: 'Win a wave with Gerald.', test: (s) => won(s, 'gerald') },
  { id: 'gerald_exe', emoji: '🖥️', name: 'Gerald.exe', desc: 'Reach Gerald.exe or let an AI run things.', test: (s) => f(s, 'gerald') >= 6 || s.gov === 'ai_overlord' },
  { id: 'tide_folk', emoji: '🌊', name: 'Gone Swimming', desc: 'Become the Tide-Folk.', test: (s) => s.form === 'tide' },
  { id: 'pigeon_force', emoji: '🐦', name: 'Orbital Pigeons', desc: 'Finish the pigeon storyline.', test: (s) => f(s, 'pigeons') >= 6 },
  { id: 'last_dance', emoji: '💃', name: 'Last Dance', desc: 'Finish the dance storyline.', test: (s) => f(s, 'dance') >= 5 },
  { id: 'bottom_door', emoji: '🕳️', name: 'The Door at the Bottom', desc: 'Finish the hole storyline.', test: (s) => f(s, 'hole') >= 6 },
  { id: 'duck_court', emoji: '🦆', name: 'Duck Court', desc: 'Finish the duck storyline.', test: (s) => f(s, 'ducks') >= 5 },
  { id: 'good_boy', emoji: '🐕', name: 'Good Boy', desc: 'Finish the dog storyline.', test: (s) => f(s, 'mascot') >= 5 },
  { id: 'trebuchet_era', emoji: '🚀', name: 'Throw Everything', desc: 'Finish the yeet storyline.', test: (s) => f(s, 'yeet') >= 5 },
  { id: 'pacifist', emoji: '🕊️', name: 'Never Struck First', desc: 'Reach the Space Age without declaring war.', test: (s) => s.era >= 11 && !f(s, 'declared_war') },
  { id: 'tribe_space', emoji: '🔥', name: 'Tribe in Space', desc: 'Reach the Space Age as a Tribe.', test: (s) => s.era >= 11 && s.gov === 'tribe' },
  { id: 'triple_allies', emoji: '🤝', name: 'Popular, Somehow', desc: 'Ally with all three neighbours at once.', test: (s) => f(s, 'triple_allies') > 0 },
  { id: 'wonders', emoji: '🏛️', name: 'Ancient Builders, Modern Invoices', desc: 'Build 2 wonders in a single run.', test: (s) => s.wonders.length >= 2 },
  { id: 'daily_win', emoji: '📅', name: 'Daily Bread', desc: 'Win a daily seed.', test: (s) => s.seed.startsWith('DAILY-') && !!s.ending?.win },
  { id: 'catalogue', emoji: '📚', name: 'Completionist-ish', desc: 'Peak three storylines in a single run.', test: (s) => Object.entries(STORYLINES).filter(([k, v]) => f(s, k) >= v.max).length >= 3 },
];

export const achievementById = (id: string) => ACHIEVEMENTS.find((a) => a.id === id);

export function loadProfile(): Profile {
  const p: Profile = { achievements: {}, runs: [], endings: [], storylines: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) Object.assign(p, JSON.parse(raw));
  } catch {
    /* storage unavailable */
  }
  return p;
}

function saveProfile(p: Profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable */
  }
}

export const unlockedIds = () => Object.keys(loadProfile().achievements);

// Call when a run reaches the ending. Returns achievements unlocked by this run.
export function recordRun(s: GameState): Achievement[] {
  if (!s.ending || s.recorded) return [];
  s.recorded = true;
  const p = loadProfile();
  const now = new Date().toISOString();
  p.runs.unshift({ date: now, seed: s.seed, civ: s.civ, win: s.ending.win, title: s.ending.title, route: s.ending.route, era: s.era, form: s.form, origins: [...s.origins] });
  p.runs.length = Math.min(p.runs.length, MAX_RUNS);
  if (!p.endings.includes(s.ending.title)) p.endings.push(s.ending.title);
  for (const [k, v] of Object.entries(STORYLINES)) if ((s.flags[k] ?? 0) >= v.max && !p.storylines.includes(k)) p.storylines.push(k);
  const fresh = ACHIEVEMENTS.filter((a) => !p.achievements[a.id] && a.test(s));
  for (const a of fresh) p.achievements[a.id] = now;
  saveProfile(p);
  return fresh;
}
