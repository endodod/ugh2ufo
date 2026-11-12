// Rival confrontations where allies, military and earlier preparation set the odds.
import type { CardDef } from '../../types';

export const confrontationCards: CardDef[] = [
  {
    id: 'c_rv_siege', kind: 'rival', era: [2, 7], req: { rival: true }, emoji: '🏰', title: 'Siege!',
    text: '{rival} has surrounded the capital. They have catapults, patience and a very good lunch.',
    choices: [
      { label: 'Sally out and break the siege', effect: { stats: { mil: -3 } }, check: {
        base: 0.15, stats: { mil: 0.004 }, flags: { logistics: 0.08, cats: 0.05, yeet: 0.05 }, allies: 0.12,
        success: { text: 'Our allies hit them from behind while we hit them from the front. Their lunch is ours.', effect: { stats: { joy: 6, food: 4 }, rival: { target: 'same', mil: -10, rel: -10 } } },
        fail: { text: 'The sally was spotted. The catapults were not just for show.', effect: { stats: { pop: -4, mil: -4, gold: -5 } } },
      } },
      { label: 'Sit behind the walls', effect: { stats: { food: -6, joy: -3 }, rival: { target: 'same', mil: -2 }, text: 'After two months, they get bored and go home. So does our food.' } },
      { label: 'Buy them off', effect: { stats: { gold: -10 }, rival: { target: 'same', rel: 10 } } },
    ],
  },
  {
    id: 'c_rv_ultimatum', kind: 'rival', era: [3, 8], req: { rival: true }, emoji: '📜', title: 'The Ultimatum',
    text: '{rival} demands a province, a princess and the good recipe for pickles. They have given us a week.',
    choices: [
      { label: 'Refuse everything', effect: { rival: { target: 'same', rel: -15 } }, check: {
        base: 0.2, stats: { mil: 0.003 }, flags: { propaganda: 0.06, grudge: 0.06 }, allies: 0.12,
        success: { text: 'They look at our army, then at our allies, and decide pickles are overrated.', effect: { stats: { joy: 5 }, rival: { target: 'same', mil: -2 } } },
        fail: { text: 'They meant it. War is declared, mostly over the pickles.', effect: { stats: { mil: -3 }, rival: { target: 'same', war: true } } },
      } },
      { label: 'Stall them with paperwork', effect: { stats: { gold: -2 }, flags: { bureaucracy: 1 }, rival: { target: 'same', rel: -5 }, text: 'The ultimatum is still being processed.' } },
      { label: 'Hand over the pickle recipe', effect: { stats: { food: -2, joy: -4 }, rival: { target: 'same', rel: 15 }, chain: { id: 'ch_f_pickles', delay: 2 } } },
    ],
  },
  {
    id: 'c_rv_sea_battle', kind: 'rival', era: [3, 7], req: { rival: true }, emoji: '⚓', title: 'Battle at Sea',
    text: 'The fleet of {rival} has been spotted. Ours has been spotted too, mostly by gulls.',
    choices: [
      { label: 'Engage', effect: { stats: { mil: -3 } }, check: {
        base: 0.15, stats: { mil: 0.003 }, flags: { navy: 0.13, spice: 0.05, land_coast: 0.08 }, allies: 0.05,
        success: { text: 'A famous victory. Their flagship surrenders and is renamed after a gull.', effect: { stats: { gold: 8 }, flags: { navy: 1 }, rival: { target: 'same', mil: -8, rel: -10 } } },
        fail: { text: 'Our fleet is now a reef. A very popular reef, with fish.', effect: { stats: { mil: -5, gold: -4 } } },
      } },
      { label: 'Stay in harbour', effect: { stats: { joy: -3 }, rival: { target: 'same', rel: -5 } } },
    ],
  },
  {
    id: 'c_rv_coalition', kind: 'rival', era: [4, 8], req: { rival: true }, emoji: '🤜', title: 'The Coalition',
    text: 'Several nations have formed a coalition. Its official goal is "dealing with {civ}". It has a logo.',
    choices: [
      { label: 'Break it apart with diplomacy', check: {
        base: 0.15, flags: { diplomats: 0.1, spies: 0.1, propaganda: 0.05 }, allies: 0.08,
        success: { text: 'A few dinners, a few whispers, and the coalition splits over the logo.', effect: { stats: { gold: 3 }, rival: { target: 'hostile', rel: 15 } } },
        fail: { text: 'Our envoy was seen whispering. The coalition now has a second logo.', effect: { rival: { target: 'hostile', rel: -15, war: true } } },
      } },
      { label: 'Arm to the teeth', effect: { stats: { mil: 8, gold: -8, joy: -3 } } },
      { label: 'Apologise for everything', effect: { stats: { gold: -6, joy: -3 }, rival: { target: 'hostile', rel: 15 } } },
    ],
  },
  {
    id: 'c_rv_assassin', kind: 'rival', era: [3, 8], req: { rival: true }, emoji: '🗡️', title: 'An Assassin from {rival}',
    text: 'Word is that {rival} has sent an assassin. He is a master of disguise. Every waiter looks suspicious.',
    choices: [
      { label: 'Set a trap for him', check: {
        base: 0.3, flags: { spies: 0.13, cats: 0.05, custom_secret: 0.1 },
        success: { text: 'He is caught disguised as a potted plant. He confesses and waters himself.', effect: { stats: { mil: 2, joy: 3 }, rival: { target: 'same', rel: -10 } } },
        fail: { text: '{leader} survives. The hat does not. Nor does the trust in waiters.', effect: { stats: { joy: -8 }, rival: { target: 'same', rel: -15 } } },
      } },
      { label: 'Double the guards', effect: { stats: { gold: -4, mil: 1 } } },
      { label: 'Hide in the cellar for a month', effect: { stats: { joy: -4, weird: 3 } } },
    ],
  },
  {
    id: 'c_rv_hostage', kind: 'rival', era: [2, 8], req: { rival: true }, emoji: '⛓️', title: 'Envoy Detained',
    text: '{rival} has detained our envoy for "looking suspicious near a cake".',
    choices: [
      { label: 'Send a rescue team', check: {
        base: 0.2, stats: { mil: 0.002 }, flags: { spies: 0.1, logistics: 0.08 },
        success: { text: 'The envoy is home by dawn, still holding the cake.', effect: { stats: { joy: 5 }, rival: { target: 'same', rel: -10 } } },
        fail: { text: 'The rescue team is now also detained. Near the same cake.', effect: { stats: { pop: -1, joy: -4 }, rival: { target: 'same', rel: -15 } } },
      } },
      { label: 'Pay the ransom', effect: { stats: { gold: -6 } } },
      { label: 'Ask nicely', effect: { stats: { joy: -2 }, rival: { target: 'same', rel: 5 }, text: 'They release him after a month. He has gained weight.', chain: { id: 'ch_f_nicely', delay: 2 } } },
    ],
  },
  {
    id: 'c_rv_arms_dealer', kind: 'event', era: [5, 8], emoji: '📦', title: 'An Arms Dealer at the Gate',
    text: 'A man called Dmitri is selling crates of weapons at half price. He insists they are "basically new".',
    choices: [
      { label: 'Buy the crates', effect: { stats: { gold: -8 } }, check: {
        base: 0.35, flags: { spies: 0.08, engineers: 0.08, scholars: 0.04 },
        success: { text: 'They are basically new. Our army is delighted.', effect: { stats: { mil: 10 } } },
        fail: { text: 'The crates contain smaller crates. Those contain a note from Dmitri.', effect: { stats: { mil: 1, joy: -2 } } },
      } },
      { label: 'Arrest Dmitri', effect: { stats: { mil: 2, gold: 2 } } },
      { label: 'Send him to the neighbours', effect: { rival: { target: 'random', mil: 4, rel: 5 } } },
    ],
  },
];
