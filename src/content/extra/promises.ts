// Choices that come with a deadline. Pay up in time or face the consequences.
import type { CardDef } from '../../types';

export const promiseCards: CardDef[] = [
  {
    id: 'x_p_tribute', kind: 'rival', title: 'Protection Money', emoji: '🪙', era: [1, 6], req: { rival: true },
    text: '{rival} offers peace. Their ambassador keeps calling it "a gift", and stroking his sword while he says it.',
    choices: [
      {
        label: 'Promise tribute',
        effect: {
          rival: { target: 'same', rel: 10 },
          promise: {
            text: 'Pay the tribute', turns: 3, pay: { gold: 10 },
            kept: { rival: { target: 'same', rel: 10 } },
            broken: { stats: { joy: -3 }, rival: { target: 'same', rel: -40, war: true }, text: 'The ambassador is back, with an army this time.' },
          },
        },
      },
      { label: 'Tell him to go away', effect: { rival: { target: 'same', rel: -10 } } },
    ],
  },
  {
    id: 'x_p_loan', kind: 'event', title: 'Merchants With Smiles', emoji: '💼', era: [2, 7],
    text: 'A guild of merchants offers a loan. The contract is mostly small print, and the small print is mostly teeth.',
    choices: [
      {
        label: 'Sign it',
        effect: {
          stats: { gold: 12 },
          promise: {
            text: 'Repay the merchants', turns: 4, pay: { gold: 14 },
            kept: { stats: { joy: 1 } },
            broken: { stats: { gold: -6, joy: -4 }, flags: { debt: 1 }, text: 'The merchants seize some of your road, a bridge, and a goat.' },
          },
        },
      },
      { label: 'Read it first', effect: { stats: { sci: 1 } } },
    ],
  },
  {
    id: 'x_p_vow', kind: 'event', title: 'A Rash Vow', emoji: '🙏', era: [0, 5],
    text: 'During a bad storm, {leader} vowed to give the gods something nice if everyone lived. Everyone lived. The gods have noted it.',
    choices: [
      {
        label: 'Make it official',
        effect: {
          stats: { joy: 2 },
          promise: {
            text: 'Honour the vow', turns: 3, pay: { faith: 8 },
            kept: { stats: { joy: 3 } },
            broken: { stats: { faith: -4, joy: -3, pop: -2 }, text: 'Lightning strikes the temple. Only the temple, which is rude but precise.' },
          },
        },
      },
      { label: 'Deny everything', effect: { stats: { faith: -2 } } },
    ],
  },
  {
    id: 'x_p_festival', kind: 'event', title: 'Bread and Circuses', emoji: '🎪', era: [2, 9],
    text: 'The people want a festival. You said "sure" to make them leave. They wrote it down.',
    choices: [
      {
        label: 'Promise a festival',
        effect: {
          stats: { joy: 6 },
          promise: {
            text: 'Throw the festival', turns: 3, pay: { gold: 6, food: 6 },
            kept: { stats: { joy: 6, weird: 2 } },
            broken: { stats: { joy: -12 }, text: 'The people have cancelled you. A mob holds a very small parade in protest.' },
          },
        },
      },
      { label: 'No festival', effect: { stats: { joy: -2 } } },
    ],
  },
  {
    id: 'x_p_grant', kind: 'event', title: 'The Grant Application', emoji: '🧪', era: [4, 11],
    text: 'A scientist needs funding for a project she describes only as "probably fine". She promises results if you promise money.',
    choices: [
      {
        label: 'Fund her',
        effect: {
          promise: {
            text: 'Fund the experiment', turns: 3, pay: { gold: 8 },
            kept: { stats: { sci: 8 } },
            broken: { stats: { sci: -2, weird: 3 }, text: 'She does it anyway, with a spoon. Something hums in the cellar.' },
          },
        },
      },
      { label: 'Decline politely', effect: { stats: { sci: -1 } } },
    ],
  },
  {
    id: 'x_p_warchest', kind: 'rival', title: 'The Peace Bond', emoji: '📜', era: [6, 12], req: { rival: true },
    text: '{rival} will stand down if you post a bond. They will return it, they say, with the same face they use for everything.',
    choices: [
      {
        label: 'Post the bond',
        effect: {
          rival: { target: 'same', rel: 15 },
          promise: {
            text: 'Deliver the bond', turns: 2, pay: { gold: 12, mil: 2 },
            kept: { rival: { target: 'same', rel: 15, ally: true } },
            broken: { stats: { joy: -3 }, rival: { target: 'same', rel: -30, war: true } },
          },
        },
      },
      { label: 'Laugh at the idea', effect: { rival: { target: 'same', rel: -5 } } },
    ],
  },
];
