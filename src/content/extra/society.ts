// Society, religion, health and domestic politics.
import type { CardDef } from '../../types';

export const societyCards: CardDef[] = [
  {
    id: 'x_s_pandemic', kind: 'event', title: 'The Sniffles', emoji: '🤒', era: [1, 8],
    text: 'A new disease is sweeping the land. Symptoms: sneezing, fever and an urge to tell everyone about your symptoms.',
    choices: [
      { label: 'Quarantine the cities', effect: { stats: { gold: -5, joy: -4, pop: -1 } } },
      { label: 'Carry on as normal', effect: { stats: { pop: -4 }, flags: { plague: 1 } } },
      { label: 'Fund the doctors', effect: { stats: { gold: -4 } }, check: {
        base: 0.25, stats: { sci: 0.003 }, flags: { medicine: 0.15, scholars: 0.05, genes: 0.05 },
        success: { text: 'The doctors find a cure. It tastes awful, which is how you know.', effect: { stats: { sci: 5, pop: 1 } } },
        fail: { text: 'The doctors find a lot of interesting things, none of them a cure.', effect: { stats: { sci: 3, pop: -3 } } },
      } },
    ],
  },
  {
    id: 'x_s_secondwave', kind: 'event', title: 'Second Wave', emoji: '🦠', era: [2, 8], req: { flags: { plague: 1 } },
    text: 'The disease is back, and it has learned from last time.',
    choices: [
      { label: 'Wash hands, finally', effect: { stats: { gold: -3, pop: -1, sci: 3 }, set: { plague: 0 } } },
      { label: 'Burn the old bedding', effect: { stats: { gold: -2, pop: -2 }, set: { plague: 0 } } },
      { label: 'Blame the cats', effect: { stats: { pop: -4, joy: -2 }, flags: { plague: 1 }, text: 'The rats celebrate.' } },
    ],
  },
  {
    id: 'x_s_well', kind: 'event', title: 'Poisoned Well', emoji: '🪣', era: [0, 6],
    text: 'The town well tastes of copper and regret. Three goats are unwell.',
    choices: [
      { label: 'Dig a new well', effect: { stats: { gold: -3, food: -1 } } },
      { label: 'Find the poisoner', check: {
        base: 0.35, flags: { spies: 0.13, custom_records: 0.1, pigeons: 0.05 },
        success: { text: 'It was a spy from abroad. He confesses everything, including a love of baking.', effect: { stats: { mil: 3, sci: 2 } } },
        fail: { text: 'It was a dead badger. The badger is posthumously pardoned.', effect: { stats: { joy: 2, weird: 1 } } },
      } },
      { label: 'Drink beer instead', effect: { stats: { joy: 4, food: -3 }, flags: { party: 1 } } },
    ],
  },
  {
    id: 'x_s_hygiene', kind: 'event', title: 'The Bath Question', emoji: '🛁', era: [2, 5], once: true,
    text: 'A physician suggests bathing more than once a year. The court is scandalized.',
    choices: [
      { label: 'Build public baths', effect: { stats: { gold: -5, pop: 4, joy: 3 } } },
      { label: 'Perfume instead', effect: { stats: { gold: -2, joy: 1 }, flags: { plague: 1 } } },
    ],
  },
  {
    id: 'x_s_emigration', kind: 'event', title: 'Brain Drain', emoji: '🧳', era: [3, 8],
    text: 'Our brightest are leaving for lands with better weather and worse food.',
    choices: [
      { label: 'Pay them to stay', effect: { stats: { gold: -6, sci: 3 } } },
      { label: 'Let them go', effect: { stats: { pop: -3, sci: -3, joy: 2 }, chain: { id: 'ch_f_emigrants', delay: 3 } } },
      { label: 'Make the weather better', req: { flags: { yeet: 4 } }, effect: { stats: { gold: -4, weird: 4, joy: 4 }, text: 'Clouds are now thrown away.' } },
    ],
  },
  {
    id: 'x_s_babyboom', kind: 'event', title: 'Baby Boom', emoji: '👶', era: [0, 8],
    text: 'There are suddenly a lot of babies. Nobody is sure what happened, though the long winter is a suspect.',
    choices: [
      { label: 'Build schools', effect: { stats: { pop: 5, gold: -4 }, flags: { education: 1 } } },
      { label: 'Build more cradles and hope', effect: { stats: { pop: 6, food: -4 } } },
    ],
  },
  {
    id: 'x_s_school', kind: 'event', title: 'Compulsory Schooling', emoji: '📚', era: [4, 8], once: true,
    text: 'Every child must now learn to read. The children have formed a resistance movement.',
    choices: [
      { label: 'Enforce it', effect: { stats: { sci: 6, joy: -3, gold: -3 }, flags: { education: 1 } } },
      { label: 'Make school optional but delicious', effect: { stats: { sci: 3, food: -3, joy: 3 }, flags: { education: 1 } } },
    ],
  },
  {
    id: 'x_s_educated', kind: 'event', title: 'Too Educated', emoji: '🎓', era: [5, 8], req: { flags: { education: 2 } },
    text: 'The population is now so well educated that they keep asking awkward questions about the budget.',
    choices: [
      { label: 'Answer them honestly', effect: { stats: { joy: 4, gold: -4, sci: 4 }, set: { corruption: 0 } } },
      { label: 'Give them a research job instead', effect: { stats: { sci: 8, gold: -4 } } },
      { label: 'Distract them with sports', effect: { stats: { joy: 5, sci: -2 }, flags: { party: 1 } } },
    ],
  },
  {
    id: 'x_s_classes', kind: 'event', title: 'The Hat Laws', emoji: '🎩', era: [3, 6], once: true,
    text: 'The nobility propose that hat height be regulated by social class. The peasants propose something involving the nobles and the hats.',
    choices: [
      { label: 'Pass the hat laws', effect: { stats: { gold: 3, joy: -4 }, flags: { unrest: 1, bureaucracy: 1 } } },
      { label: 'Hats for everyone', effect: { stats: { gold: -4, joy: 5 } } },
    ],
  },
  {
    id: 'x_s_revolt', kind: 'event', title: 'Peasant Revolt', emoji: '🔱', era: [2, 7], req: { flags: { unrest: 2 } },
    text: 'The peasants have pitchforks, torches and, worryingly, a coherent list of demands.',
    choices: [
      { label: 'Meet the demands', effect: { stats: { gold: -6, joy: 6 }, set: { unrest: 0 } } },
      { label: 'Crush it', effect: { stats: { mil: -3, pop: -2 } }, check: {
        base: 0.3, stats: { mil: 0.004 }, flags: { propaganda: 0.1, spies: 0.08 }, gov: { empire: 0.1, democracy: -0.1 },
        success: { text: 'The revolt fizzles. The list of demands is filed under "later".', effect: { stats: { joy: -3 }, set: { unrest: 0 } } },
        fail: { text: 'The pitchforks win the first round.', effect: { stats: { joy: -5, pop: -1 }, flags: { unrest: 1 } } },
      } },
      { label: 'Join the peasants', effect: { stats: { joy: 8, gold: -4 }, set: { unrest: 0 }, gov: 'anarchy', text: '{leader} is now just a guy with a pitchfork. Morale is great.' } },
    ],
  },
  {
    id: 'x_s_grumbling', kind: 'event', title: 'General Grumbling', emoji: '😒', era: [1, 8], req: { maxStats: { joy: 40 } },
    text: 'Taverns are full of people complaining about {leader}. The complaints are getting specific.',
    choices: [
      { label: 'Lower taxes', effect: { stats: { gold: -5, joy: 5 } } },
      { label: 'Ban taverns', effect: { stats: { joy: -4 }, flags: { unrest: 1 } } },
      { label: 'Send spies to listen', effect: { stats: { gold: -2, mil: 1 }, flags: { unrest: 1 } } },
    ],
  },
  {
    id: 'x_s_prophet', kind: 'event', title: 'A Prophet Appears', emoji: '🧔', era: [1, 6],
    text: 'A man walked out of the desert claiming to speak for the gods. His first message: everyone should be nicer to him specifically.',
    choices: [
      { label: 'Follow him', effect: { stats: { faith: 6, joy: -1 }, flags: { cult: 1 } } },
      { label: 'Debate him publicly', check: {
        base: 0.3, stats: { sci: 0.005 }, flags: { scholars: 0.12, founder_poet: 0.15, founder_liar: 0.15, god_math: 0.1 },
        success: { text: 'He loses badly and becomes a successful potter.', effect: { stats: { sci: 3, joy: 3 } } },
        fail: { text: 'He wins. The debate becomes scripture.', effect: { stats: { faith: 5 }, flags: { heresy: 1 } } },
      } },
      { label: 'Give him a weekly column', effect: { stats: { faith: 3, gold: 2 } } },
    ],
  },
  {
    id: 'x_s_heresy', kind: 'event', title: 'Heresy', emoji: '📖', era: [2, 7],
    text: 'A sect claims the gods are actually one god wearing many hats. The hat-makers guild is suddenly very religious.',
    choices: [
      { label: 'Tolerate it', effect: { stats: { faith: -2, joy: 3, sci: 2 }, flags: { heresy: 1 } } },
      { label: 'Burn the hats', effect: { stats: { faith: 4, joy: -3 } } },
      { label: 'Make it official doctrine', effect: { stats: { faith: 3, weird: 2 }, flags: { heresy: 1, cult: 1 } } },
    ],
  },
  {
    id: 'x_s_religiouswar', kind: 'event', title: 'Holy War of the Spoons', emoji: '🥄', era: [3, 7], req: { flags: { heresy: 2 } },
    text: 'The faithful have split over whether soup should be stirred clockwise. Both sides have armies.',
    choices: [
      { label: 'Back the clockwise faction', effect: { stats: { mil: -3, faith: 5, pop: -2 }, set: { heresy: 0 } } },
      { label: 'Declare stirring a private matter', effect: { stats: { joy: 4, faith: -3 }, set: { heresy: 0 } } },
      { label: 'Ban soup', effect: { stats: { food: -5, joy: -4, weird: 3 }, set: { heresy: 0 }, text: 'Both sides unite against you. Peace, of a kind.' } },
    ],
  },
  {
    id: 'x_s_miracle', kind: 'event', title: 'A Miracle', emoji: '✨', era: [1, 7],
    text: "A statue in the temple began weeping. Engineers found a leaky pipe. The faithful found the engineers' report unconvincing.",
    choices: [
      { label: 'Proclaim the miracle', effect: { stats: { faith: 7, sci: -2 } } },
      { label: 'Fix the pipe', effect: { stats: { gold: -1, sci: 2, faith: -3 } } },
      { label: 'Sell the tears', effect: { stats: { gold: 6, faith: -1, weird: 2 } } },
    ],
  },
  {
    id: 'x_s_deathruler', kind: 'event', title: 'The Ruler Is Dead', emoji: '⚰️', era: [1, 8], once: true,
    text: '{leader} choked on a grape at a feast. The grape is under arrest. Who rules now?',
    choices: [
      { label: 'The eldest child', effect: { stats: { joy: -2, mil: 2 } } },
      { label: 'Whoever finds the crown first', effect: { stats: { joy: 4, weird: 3 }, flags: { unrest: 1 }, text: 'A cook wins. Food improves dramatically.' } },
      { label: 'Keep it secret and prop up the body', effect: { stats: { weird: 6, faith: 2 }, chain: { id: 'x_s_body', delay: 4 } } },
    ],
  },
  {
    id: 'x_s_body', kind: 'event', title: 'The Ruler Is Still Dead', emoji: '🪆', chainOnly: true, once: true,
    text: 'The propped-up ruler has been "receiving guests" for a year. Visitors remark on how restful the court has become.',
    choices: [
      { label: 'Announce the death', effect: { stats: { joy: -4, faith: 3 } } },
      { label: 'Announce a miraculous recovery', effect: { stats: { faith: 6, weird: 5 }, flags: { cult: 1 } } },
    ],
  },
  {
    id: 'x_s_succession', kind: 'event', title: 'Succession Crisis', emoji: '👑', era: [2, 6],
    text: 'Three cousins claim the throne. One has the army, one has the church and one has an incredibly loud voice.',
    choices: [
      { label: 'Back the army', effect: { stats: { mil: 4, faith: -3 }, flags: { unrest: 1 } } },
      { label: 'Back the church', effect: { stats: { faith: 5, mil: -3 } } },
      { label: 'Back the loud one', effect: { stats: { joy: 4, weird: 2 }, text: 'Royal decrees can now be heard from the border.' } },
    ],
  },
  {
    id: 'x_s_corruption', kind: 'event', title: 'Grease the Wheels', emoji: '🤑', era: [2, 8],
    text: 'An official offers to speed up the new road for a small personal fee. Very small. Practically a tip.',
    choices: [
      { label: 'Pay the fee', effect: { stats: { gold: -2, pop: 2 }, flags: { corruption: 1 } } },
      { label: 'Fire him', effect: { stats: { gold: -1 }, flags: { bureaucracy: 1 } } },
      { label: 'Promote him', effect: { stats: { gold: 4 }, flags: { corruption: 2 } } },
    ],
  },
  {
    id: 'x_s_scandal', kind: 'event', title: 'The Golden Toilet Scandal', emoji: '🚽', era: [3, 8], req: { flags: { corruption: 2 } },
    text: 'Investigators discovered that the Ministry of Thrift has been buying golden toilets. Forty of them. The ministry has one bathroom.',
    choices: [
      { label: 'Purge the ministry', effect: { stats: { joy: 5, gold: 4 }, set: { corruption: 0 }, flags: { unrest: 1 } } },
      { label: 'Melt down the toilets', effect: { stats: { gold: 8, joy: 2 }, set: { corruption: 1 } } },
      { label: 'Cover it up', effect: { stats: { joy: -5 }, flags: { corruption: 1, unrest: 1 } } },
    ],
  },
  {
    id: 'x_s_kleptocracy', kind: 'event', title: 'Everyone Is On the Take', emoji: '💼', era: [5, 8], req: { flags: { corruption: 4 } },
    text: 'Corruption is so widespread that bribes now come with receipts and a loyalty card.',
    choices: [
      { label: 'Make bribes a legal tax', effect: { stats: { gold: 10, joy: -4 }, set: { corruption: 0 }, gov: 'corporatocracy' } },
      { label: 'Hire an incorruptible auditor', effect: { stats: { gold: -5, sci: 2 }, set: { corruption: 1 }, flags: { bureaucracy: 1 } } },
      { label: 'Bribe the aliens too', effect: { stats: { gold: -10 }, alienRel: 6, threat: -2, chain: { id: 'ch_f_bribe', delay: 2 } } },
    ],
  },
  {
    id: 'x_s_ideology', kind: 'event', title: 'A New Ideology', emoji: '📕', era: [5, 8],
    text: 'A pamphlet arguing that everything should be done differently is selling better than bread.',
    choices: [
      { label: 'Adopt some of the ideas', effect: { stats: { joy: 5, gold: -3, sci: 2 } } },
      { label: 'Ban the pamphlet', effect: { stats: { joy: -3, mil: 1 }, flags: { unrest: 1 } } },
      { label: 'Write a better pamphlet', effect: { stats: { sci: 3, gold: -2 }, text: 'A pamphlet war begins. Trees everywhere are nervous.' } },
    ],
  },
  {
    id: 'x_s_palacespy', kind: 'event', title: 'A Spy in the Palace', emoji: '🕵️', era: [2, 8],
    text: 'Someone in the palace is leaking secrets. The leaks are accurate, detailed and annotated with complaints about the food.',
    choices: [
      { label: 'Feed everyone different lies', effect: { stats: { sci: 3, mil: 2 } } },
      { label: 'Improve the food', effect: { stats: { gold: -3, joy: 3 }, text: 'The leaks stop. The spy just wanted dessert.' } },
      { label: 'Arrest the cook', effect: { stats: { joy: -3 } } },
    ],
  },
  {
    id: 'x_s_cohesion', kind: 'event', title: 'National Identity', emoji: '🏳️', era: [3, 8], once: true,
    text: 'Scholars cannot agree what it means to be a citizen of {civ}. Current leading definition: "complains about the weather".',
    choices: [
      { label: 'Write a national epic', effect: { stats: { joy: 4, faith: 2, gold: -3 } } },
      { label: 'Invent a national dish', effect: { stats: { joy: 5, food: -2 } } },
      { label: 'Define it as weirdness', effect: { stats: { weird: 6, joy: 2 } } },
    ],
  },
];
