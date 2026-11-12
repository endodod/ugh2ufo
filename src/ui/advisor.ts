import type { Stat } from '../types';
import { agesLeft, flag, forecast, formById, type GameState } from '../engine';
import { FLAG_INFO, GOVERNMENTS } from '../data';
import { bestPlan } from '../finale';

export interface Note {
  icon: string;
  text: string;
  tone: 'good' | 'bad' | 'info' | 'weird';
}

const ADVISORS = ['🧓 Old Thok', '🧑‍🌾 Farmer Pell', '👵 Grandmother Ixa', '🔨 The Smith', '🦉 The Court Owl', '🧙 A Man Who Knows Things', '🎨 A Painter With Opinions', '🧭 The Navigator', '🤓 The Advisor', '📜 The Chronicler', '📱 Your Notifications', '🤖 ADVISOR-9', '🛰️ The Station AI', '🧠 The Collective', '👽 A Suspiciously Tall Intern'];

export function advisorName(s: GameState) {
  return ADVISORS[Math.min(s.era, ADVISORS.length - 1)];
}

export const PAPERS = [
  'The Carved Rock',
  'The Furrow Weekly',
  'Clay Tablet Gazette',
  'The Iron Post',
  'The Daily Scroll',
  'The Town Crier',
  'The Broadsheet',
  "The Ship's Log",
  'The Daily Steam',
  'The Evening Atom',
  'Your Feed',
  'The Holo-Herald',
  'Interstellar Times',
  'The Shared Thought',
  'The Last Edition',
];

const EPITHET: Record<string, string> = {
  cats: 'Cat-Ridden',
  cult: 'Moon-Chanting',
  genes: 'Slightly Mutated',
  bureaucracy: 'Thrice-Stamped',
  robots: 'Clanking',
  alien_contact: 'Star-Calling',
  party: 'Permanently Hungover',
  pigeons: 'Pigeon-Haunted',
  gerald: 'Gerald-Fearing',
  dance: 'Ever-Dancing',
  grudge: 'Deeply Spiteful',
  hole: 'Deep-Dwelling',
  bees: 'Buzzing',
  heads: 'Stone-Headed',
  ducks: 'Duck-Governed',
  prophecy: 'Bean-Prophesied',
  yeet: 'Far-Throwing',
  fungus: 'Mushroomy',
  turk: 'Small-Man-Operated',
  spice: 'Extremely Spicy',
  mascot: 'Dog-Loving',
  corruption: 'Slightly Corrupt',
  debt: 'Indebted',
  pollution: 'Smoggy',
};

const STAT_EPITHET: Partial<Record<Stat, string>> = {
  mil: 'Warlike',
  sci: 'Nerdy',
  faith: 'Pious',
  gold: 'Wealthy',
  weird: 'Strange',
  joy: 'Cheerful',
};

export function epithet(s: GameState): string {
  const top = Object.entries(s.flags)
    .filter(([k, v]) => v >= 2 && EPITHET[k])
    .sort((a, b) => b[1] - a[1])[0];
  const gov = GOVERNMENTS[s.gov]?.name ?? 'Tribe';
  const form = formById(s.form);
  const noun = form ? form.noun : gov;
  if (top) return `a ${EPITHET[top[0]]} ${noun}`;
  const scale: Partial<Record<Stat, number>> = { mil: 1, sci: 0.8, faith: 1.2, gold: 1, weird: 1.3 };
  const best = (Object.keys(scale) as Stat[]).map((k) => [k, s.stats[k] * (scale[k] ?? 1)] as const).sort((a, b) => b[1] - a[1])[0];
  if (best && best[1] >= 12) return `a ${STAT_EPITHET[best[0]]} ${noun}`;
  if (s.stats.joy >= 70) return `a ${STAT_EPITHET.joy} ${noun}`;
  return `a Perfectly Ordinary ${noun}`;
}

export function councilReport(s: GameState): Note[] {
  const notes: Note[] = [];
  const f = forecast(s);
  const st = s.stats;
  if (st.food + f.food < 0) notes.push({ icon: '🍂', tone: 'bad', text: `Food runs out next turn (${f.food >= 0 ? '+' : ''}${f.food}/turn). People will starve.` });
  else if (f.food < 0) notes.push({ icon: '🌾', tone: 'bad', text: `Food is shrinking by ${-f.food} a turn. ${Math.floor(st.food / -f.food)} turns left.` });
  else if (st.food >= st.pop) notes.push({ icon: '👶', tone: 'good', text: `Granaries are full. Expect more babies.` });

  if (f.gold < 0) notes.push({ icon: '💸', tone: 'bad', text: `The army costs more than you earn (${f.gold} gold/turn).` });
  if (st.joy <= 15) notes.push({ icon: '🔥', tone: 'bad', text: `The people are furious (${st.joy}%). Pitchforks are being sharpened.` });
  else if (st.joy <= 30) notes.push({ icon: '😠', tone: 'bad', text: `Grumbling in the streets (${st.joy}%).` });
  else if (st.joy >= 80) notes.push({ icon: '🥳', tone: 'good', text: `Everyone is suspiciously happy (${st.joy}%).` });

  for (const r of s.rivals.filter((r) => r.alive)) {
    if (r.war) notes.push({ icon: '⚔️', tone: r.mil > st.mil ? 'bad' : 'info', text: `At war with ${r.name}. Their army ${r.mil} vs yours ${st.mil}.` });
    else if (!r.ally && r.rel <= -50) notes.push({ icon: '😤', tone: 'bad', text: `${r.name} is close to declaring war.` });
  }

  for (const [k, label] of [
    ['debt', 'Creditors are getting restless'],
    ['corruption', 'Money keeps disappearing'],
    ['unrest', 'Unrest is building'],
    ['plague', 'Coughing in the markets'],
    ['pollution', 'The air tastes of pennies'],
  ] as const)
    if (flag(s, k) >= 1) notes.push({ icon: FLAG_INFO[k]?.icon ?? '⚠️', tone: 'bad', text: `${label} (${FLAG_INFO[k]?.name ?? k} ${flag(s, k)}).` });

  const momentum = Object.entries(s.flags)
    .filter(([k, v]) => v >= 2 && FLAG_INFO[k] && EPITHET[k] && !['debt', 'corruption', 'pollution'].includes(k))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 1);
  for (const [k, v] of momentum) notes.push({ icon: FLAG_INFO[k].icon, tone: 'weird', text: `${FLAG_INFO[k].name} keeps growing (level ${v}). This could matter later.` });

  for (const r of s.rivals.filter((r) => r.alive && !r.war)) {
    if (r.ally) continue;
    if (r.rel >= 45) notes.push({ icon: '🛡️', tone: 'good', text: `${r.name} likes you enough for an alliance. Allies fight the aliens with you.` });
  }
  const left = agesLeft(s);
  if (s.era >= 5) {
    const best = bestPlan(s, 1);
    if (best) notes.push({ icon: '🛸', tone: best.c >= 0.5 ? 'good' : 'bad', text: `Fleet arrives in ${left} age${left === 1 ? '' : 's'}. Best plan for the landing today: "${best.r.name}" at ${Math.round(best.c * 100)}%.` });
  } else if (s.turn % 3 === 0) notes.push({ icon: '✨', tone: 'weird', text: `Something is coming. It will arrive in ${left} ages. Start preparing something, anything.` });

  if (!notes.length) notes.push({ icon: '☕', tone: 'info', text: 'Nothing is on fire. Enjoy it while it lasts.' });
  return notes.slice(0, 5);
}
