// One high-stakes gamble per era, with a safe alternative.
import type { CardDef } from '../../types';

export const gambleCards: CardDef[] = [
  {
    id: 'c_gm_cliff', kind: 'event', era: [0, 0], once: true, weight: 0.8, emoji: '🦣', title: 'The Mammoth Cliff',
    text: 'The whole herd is grazing near the cliff. If everyone runs at them at once, the tribe eats for a year. If not, the mammoths learn our names.',
    choices: [
      { label: 'Everyone charges', effect: { stats: { food: -3 } }, check: {
        base: 0.25, stats: { mil: 0.02 }, flags: { logistics: 0.1, yeet: 0.08, propaganda: 0.06 },
        success: { text: 'The herd goes over. The tribe eats for a year and paints it on every wall.', effect: { stats: { food: 25, joy: 6 } } },
        fail: { text: 'The mammoths drove us off the cliff instead. Gently, but still.', effect: { stats: { pop: -3, food: -4 } } },
      } },
      { label: 'Pick off a straggler', effect: { stats: { food: 4 } } },
    ],
  },
  {
    id: 'c_gm_ziggurat', kind: 'event', era: [1, 1], once: true, weight: 0.8, emoji: '🛕', title: 'A Ziggurat in One Season',
    text: '{leader} wants a ziggurat finished before the harvest festival. Everyone, including the children and the goats, must carry bricks.',
    choices: [
      { label: 'Everyone builds', effect: { stats: { food: -5, gold: -5 } }, check: {
        base: 0.25, stats: { pop: 0.008 }, flags: { engineers: 0.12, logistics: 0.08, custom_big: 0.15 },
        success: { text: 'Finished with a day to spare. The gods take notice. So do the neighbours.', effect: { stats: { faith: 15, gold: 10, joy: 6 } } },
        fail: { text: 'It is a pile. A very large, very expensive pile.', effect: { stats: { pop: -2, joy: -8 } } },
      } },
      { label: 'Build a modest shrine', effect: { stats: { gold: -2, faith: 3 } } },
    ],
  },
  {
    id: 'c_gm_elephants', kind: 'event', era: [2, 2], once: true, weight: 0.8, emoji: '🐘', title: 'Over the Mountains with Elephants',
    text: 'A general proposes crossing the mountains with war elephants to surprise the strongest neighbour. Nobody has asked the elephants.',
    choices: [
      { label: 'Cross the mountains', effect: { stats: { mil: -5, food: -4 } }, check: {
        base: 0.15, stats: { mil: 0.005 }, flags: { logistics: 0.12, medicine: 0.05, land_mountain: 0.1 }, allies: 0.05,
        success: { text: 'The elephants come down the far side to universal panic. The neighbour pays dearly.', effect: { stats: { gold: 15, mil: 8 }, rival: { target: 'strongest', mil: -15, rel: -20 } } },
        fail: { text: 'Halfway up, the elephants unionised and went home.', effect: { stats: { mil: -8, pop: -3 } } },
      } },
      { label: 'Take the long road', effect: { stats: { mil: 2 } } },
    ],
  },
  {
    id: 'c_gm_tournament', kind: 'event', era: [3, 3], once: true, weight: 0.8, emoji: '🏇', title: 'The Grand Tournament',
    text: 'A foreign prince offers a wager: our champion against his, the royal treasury against his.',
    choices: [
      { label: 'Stake the treasury', effect: { stats: { gold: -10 } }, check: {
        base: 0.3, stats: { mil: 0.004 }, flags: { cats: 0.06, medicine: 0.05, custom_compete: 0.15 },
        success: { text: 'Our champion wins with a move that is now illegal. The prince pays up, weeping.', effect: { stats: { gold: 30, joy: 8 } } },
        fail: { text: 'Our champion was unhorsed by his own horse.', effect: { stats: { joy: -6 } } },
      } },
      { label: 'Watch politely', effect: { stats: { joy: 2 } } },
    ],
  },
  {
    id: 'c_gm_spice_fleet', kind: 'event', era: [4, 4], once: true, weight: 0.8, emoji: '🧭', title: 'The Spice Fleet',
    text: 'Send every ship we own to the far side of the world for spices. If they return, we are rich. If not, we have no ships.',
    choices: [
      { label: 'Send the whole fleet', effect: { stats: { gold: -12 } }, check: {
        base: 0.15, flags: { navy: 0.12, logistics: 0.08, medicine: 0.06, founder_explorer: 0.1 },
        success: { text: 'The fleet returns low in the water. The nation smells of cinnamon for a decade.', effect: { stats: { gold: 35, food: 6 } } },
        fail: { text: 'One ship returns. It is carrying a parrot that only says "no".', effect: { stats: { mil: -6, pop: -2 } } },
      } },
      { label: 'Send one small boat', effect: { stats: { gold: 3 } } },
    ],
  },
  {
    id: 'c_gm_engine', kind: 'event', era: [5, 5], once: true, weight: 0.8, emoji: '⚙️', title: 'The Exhibition Engine',
    text: 'Our engineers have built an engine the size of a cathedral. They want to switch it on in front of the whole world.',
    choices: [
      { label: 'Unveil it to the world', effect: { stats: { gold: -10 } }, check: {
        base: 0.2, stats: { sci: 0.002 }, flags: { engineers: 0.12, scholars: 0.06 },
        success: { text: 'It roars, it works, it sells. Orders arrive from every continent.', effect: { stats: { gold: 15, sci: 12, joy: 5 } } },
        fail: { text: 'The engine went to the exhibition. Then through it.', effect: { stats: { joy: -8, pop: -2 } } },
      } },
      { label: 'Keep it in the shed', effect: { stats: { sci: 3 } } },
    ],
  },
  {
    id: 'c_gm_moonshot', kind: 'event', era: [6, 6], once: true, weight: 0.8, emoji: '🚀', title: 'Operation Moonshot',
    text: 'Put a person on the moon by the end of the decade, or die trying. The second option is not popular.',
    choices: [
      { label: 'Go all in', effect: { stats: { gold: -15 } }, check: {
        base: 0.15, stats: { sci: 0.002 }, flags: { engineers: 0.1, logistics: 0.06, yeet: 0.06 },
        success: { text: 'One small step. The whole world watches. So does something on the far side.', effect: { stats: { sci: 15, joy: 10 }, threat: -3 } },
        fail: { text: 'The rocket reached a height best described as "the roof".', effect: { stats: { joy: -10, gold: -5 } } },
      } },
      { label: 'Send a monkey first', effect: { stats: { gold: -3, sci: 3 }, chain: { id: 'ch_f_monkey', delay: 2 } } },
    ],
  },
  {
    id: 'c_gm_crash', kind: 'event', era: [7, 7], once: true, weight: 0.8, emoji: '📉', title: 'The Crash',
    text: 'The markets have collapsed. Everything is for sale at a tenth of its price. Everyone is too scared to buy.',
    choices: [
      { label: 'Buy everything at the bottom', effect: { stats: { gold: -15 } }, check: {
        base: 0.25, flags: { spies: 0.08, scholars: 0.06 }, gov: { corporatocracy: 0.15, technocracy: 0.1 },
        success: { text: 'The market recovers. We own most of it.', effect: { stats: { gold: 40 } } },
        fail: { text: 'It was not the bottom. There was a basement.', effect: { stats: { gold: -10 }, flags: { debt: 1 } } },
      } },
      { label: 'Bail out the banks', effect: { stats: { gold: -8, joy: 3 }, flags: { debt: 1 } } },
    ],
  },
  {
    id: 'c_gm_first_strike', kind: 'event', era: [8, 8], once: true, weight: 0.8, emoji: '💥', title: 'Strike First',
    text: 'The mothership is in range. The generals say we have one shot. The generals always say that, but this time it is true.',
    choices: [
      { label: 'Launch everything', effect: { stats: { mil: -15 } }, check: {
        base: 0.1, stats: { mil: 0.002 }, flags: { navy: 0.06, engineers: 0.06, spies: 0.06, logistics: 0.04 }, allies: 0.05,
        success: { text: 'Direct hit. The mothership is listing. Alien radio chatter is mostly swearing.', effect: { stats: { joy: 10 }, threat: -15 } },
        fail: { text: 'It bounced. The aliens are now, understandably, cross.', effect: { stats: { pop: -5, mil: -10 }, threat: 6 } },
      } },
      { label: 'Hold fire', effect: { stats: { joy: -2 } } },
    ],
  },
  {
    id: 'c_gm_peace_envoy', kind: 'alien', era: [8, 8], once: true, weight: 0.8, emoji: '💎', title: 'The Peace Gamble',
    text: 'One envoy, one shuttle and the crown jewels as a gift. If the aliens like it, they might call the whole thing off.',
    choices: [
      { label: 'Send the envoy with the jewels', effect: { stats: { gold: -15 } }, check: {
        base: 0.15, flags: { diplomats: 0.1, alien_contact: 0.05, mascot: 0.06, custom_polite: 0.1 },
        success: { text: 'The aliens love the jewels. They are reconsidering the entire invasion.', effect: { alienRel: 25, threat: -8 } },
        fail: { text: 'In their culture, jewels are an insult. A big one.', effect: { alienRel: -10, threat: 4 } },
      } },
      { label: 'Keep the jewels', effect: { stats: { gold: 2 } } },
    ],
  },
];
