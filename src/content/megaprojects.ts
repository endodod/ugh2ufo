import type { CardDef, Effect, Stat } from '../types';
import { STAT_INFO } from '../data';
import { c, chk, fu } from './chains/util';

export interface Megaproject {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  age: [number, number];
  turns: number;
  cost: Partial<Record<Stat, number>>;
  done: Effect;
  finale: { label: string; value: number; waves: string[] };
}

export const MEGAPROJECTS: Megaproject[] = [
  {
    id: 'great_wall', name: 'Great Wall', emoji: '🧱', age: [1, 5], turns: 4, cost: { gold: 3, mil: 2 },
    desc: 'A wall along the whole border. Neighbours will take it personally.',
    done: { stats: { mil: 10, joy: 4 }, text: 'The wall is finished. It is long. Visitors say it is very long.' },
    finale: { label: 'Wall', value: 6, waves: ['landing'] },
  },
  {
    id: 'grand_library', name: 'Grand Library', emoji: '📚', age: [3, 8], turns: 4, cost: { gold: 2, sci: 3 },
    desc: 'Every book ever written, and several that were only thought about.',
    done: { stats: { sci: 15, joy: 3 }, text: 'The Library opens. Within a week someone has lost the catalogue.' },
    finale: { label: 'Library', value: 5, waves: ['orbit', 'aftermath'] },
  },
  {
    id: 'pyramid_snacks', name: 'Pyramid of Snacks', emoji: '🔺', age: [2, 7], turns: 5, cost: { food: 4, faith: 2 },
    desc: 'A monument to the sacred art of eating between meals.',
    done: { stats: { joy: 10, faith: 8 }, text: 'The Pyramid is complete. Pilgrims arrive hungry and leave happy.' },
    finale: { label: 'Pyramid', value: 5, waves: ['aftermath'] },
  },
  {
    id: 'clockwork_cathedral', name: 'Clockwork Cathedral', emoji: '⛪', age: [6, 10], turns: 5, cost: { gold: 3, faith: 3, sci: 2 },
    desc: 'Prayers are processed by gears. Response times have improved.',
    done: { stats: { faith: 12, sci: 8 }, text: 'The bells strike thirteen. The priests say that is correct.' },
    finale: { label: 'Cathedral', value: 6, waves: ['orbit', 'landing'] },
  },
  {
    id: 'orbital_mirror', name: 'Orbital Mirror', emoji: '🪞', age: [9, 13], turns: 5, cost: { gold: 4, sci: 4 },
    desc: 'A big mirror in space, for reasons the engineers explain at length.',
    done: { stats: { sci: 10 }, threat: -4, text: 'The Mirror is up. The aliens can now see themselves, and look away.' },
    finale: { label: 'Mirror', value: 8, waves: ['orbit'] },
  },
  {
    id: 'moon_cannon', name: 'Moon Cannon', emoji: '🌙', age: [11, 14], turns: 6, cost: { gold: 3, mil: 4, sci: 3 },
    desc: 'It points at the Moon. The Moon has not been told why.',
    done: { stats: { mil: 10 }, threat: -3, text: 'The Cannon is ready. The Moon looks nervous.' },
    finale: { label: 'Cannon', value: 10, waves: ['orbit', 'landing'] },
  },
];

export const megaById = (id: string) => MEGAPROJECTS.find((m) => m.id === id);

export const costText = (cost: Partial<Record<Stat, number>>) =>
  Object.entries(cost).map(([k, v]) => `${v} ${STAT_INFO[k as Stat].icon}`).join(' ');

const startCards: CardDef[] = MEGAPROJECTS.map((m) => ({
  id: `mega_${m.id}`, kind: 'project', age: m.age, emoji: m.emoji, title: `Build the ${m.name}`,
  text: `${m.desc} Costs ${costText(m.cost)} per turn for ${m.turns} turns. Miss a payment and work stops until you can afford it.`,
  choices: [c('Break ground', { mega: m.id })],
}));

const setback: Effect = { megaProgress: -1 };

export const megaSabotage = ['mega_a', 'mega_b', 'mega_c'];

const sabotageCards: CardDef[] = [
  fu('mega_a', 'rival', '🥷', 'Strangers in the Scaffolding', '{rival} has sent people to "visit" the site. They are carrying a lot of rope and no tourist maps.', [
    chk('Send the guards up', { stats: { gold: -2 } }, {
      base: 0.45, stats: { mil: 0.004 },
      success: { text: 'Caught mid-knot. They are escorted out, politely, then less politely.', effect: { stats: { joy: 3 }, rival: { rel: -3, target: 'same' } } },
      fail: { text: 'The scaffolding comes down with the guards on it.', effect: setback },
    }),
    c('Let it slide', { ...setback, text: 'Something collapses. It is blamed on weather.' }),
  ]),
  fu('mega_b', 'rival', '📐', 'Suspiciously Wrong Blueprints', 'A new set of plans arrives from {rival}, "to help". The arches on them do not meet.', [
    chk('Have the scholars check them', {}, {
      base: 0.4, stats: { sci: 0.006 },
      success: { text: 'The scholars spot it in minutes. They are insufferable about it for weeks.', effect: { stats: { sci: 3 } } },
      fail: { text: 'The arches were already built. Please do not stand under them.', effect: setback },
    }),
    c('Burn them unread', { stats: { joy: -1 }, rival: { rel: -3, target: 'same' }, text: 'Safe, but a diplomatic incident.' }),
  ]),
  fu('mega_c', 'rival', '🗣️', 'A Rumour About the Foundations', '{rival} is telling anyone who will listen that the site is built on something very unlucky. Workers are leaving.', [
    chk('Hold a loud, reassuring festival', { stats: { gold: -3 } }, {
      base: 0.45, stats: { faith: 0.004, joy: 0.003 },
      success: { text: 'Nobody is thinking about luck after the third barrel.', effect: { stats: { joy: 5 } } },
      fail: { text: 'The festival is cancelled because of an omen. Work stops for a week.', effect: setback },
    }),
    c('Pay the workers to stay', { stats: { gold: -5 }, text: 'Expensive. The rumour dies out.' }),
  ]),
];

export const megaCards: CardDef[] = [...startCards, ...sabotageCards];
