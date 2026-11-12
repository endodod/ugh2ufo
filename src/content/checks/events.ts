// Events where an earlier capability investment decides the odds of the risky option.
import type { CardDef } from '../../types';

export const capabilityEvents: CardDef[] = [
  {
    id: 'c_ev_pirate_king', kind: 'event', era: [2, 6], emoji: '🏴‍☠️', title: 'The Pirate King',
    text: 'A self-crowned Pirate King is blockading the harbour. His crown is a bucket. His fleet is real.',
    choices: [
      { label: 'Pay the tribute', effect: { stats: { gold: -8 } } },
      { label: 'Break the blockade', effect: { stats: { mil: -2 } }, check: {
        base: 0.2, stats: { mil: 0.004 }, flags: { navy: 0.15, spice: 0.06, land_coast: 0.1, land_island: 0.1 },
        success: { text: 'The blockade breaks. The Pirate King is demoted to Pirate Deckhand.', effect: { stats: { gold: 8, mil: 3 }, flags: { navy: 1 } } },
        fail: { text: 'Our ships came back with fewer ships than they left with.', effect: { stats: { mil: -4, gold: -4 } } },
      } },
      { label: 'Wait him out', effect: { stats: { food: -4, joy: -2 }, text: 'After a month he gets bored and blockades someone else.' } },
    ],
  },
  {
    id: 'c_ev_bad_water', kind: 'event', era: [3, 7], emoji: '🚰', title: 'Bad Water Season',
    text: 'The river smells like a decision someone made upstream. People are getting sick.',
    choices: [
      { label: 'Build proper sewers', effect: { stats: { gold: -8 } }, check: {
        base: 0.3, stats: { sci: 0.002 }, flags: { engineers: 0.12, medicine: 0.1, hole: 0.05 },
        success: { text: 'The sewers work. The city smells of almost nothing. Citizens are suspicious but healthy.', effect: { stats: { pop: 3, joy: 3 } } },
        fail: { text: 'The sewers were connected to the wells. Someone has been fired, into the sewer.', effect: { stats: { pop: -3 }, flags: { plague: 1 } } },
      } },
      { label: 'Boil everything', effect: { stats: { food: -3, pop: -1 } } },
      { label: 'Blame bad air', effect: { stats: { pop: -3, faith: 2 } } },
    ],
  },
  {
    id: 'c_ev_snowed_in', kind: 'event', era: [2, 6], emoji: '🏔️', title: 'The Army Is Snowed In',
    text: 'The army is trapped in a mountain pass by snow, pride and a single broken cart.',
    choices: [
      { label: 'Send a relief column', effect: { stats: { food: -4 } }, check: {
        base: 0.3, flags: { logistics: 0.15, engineers: 0.05, land_mountain: 0.1, land_tundra: 0.1 },
        success: { text: 'The relief column arrives with soup, blankets and a spare wheel. Morale soars.', effect: { stats: { mil: 4 } } },
        fail: { text: 'The relief column is now also snowed in. They are sharing the cart.', effect: { stats: { mil: -6, pop: -2 } } },
      } },
      { label: 'Tell them to walk home', effect: { stats: { mil: -3, joy: -2 } } },
    ],
  },
  {
    id: 'c_ev_great_fire', kind: 'event', era: [2, 7], emoji: '🔥', title: 'The Great Fire',
    text: 'A bakery caught fire. Then the street. Then the street\'s opinion of the bakery.',
    choices: [
      { label: 'Blow up a firebreak', check: {
        base: 0.3, flags: { engineers: 0.12, yeet: 0.05, logistics: 0.06 },
        success: { text: 'One controlled bang and the fire runs out of city. Engineers are carried on shoulders.', effect: { stats: { gold: -2, sci: 2 } } },
        fail: { text: 'The firebreak was blown in the wrong place. The fire thanks us for the kindling.', effect: { stats: { gold: -10, pop: -3 } } },
      } },
      { label: 'Form a bucket chain', effect: { stats: { gold: -6, pop: -1 } } },
      { label: 'Rebuild everything in stone', effect: { stats: { gold: -9, mil: 2, joy: -2 } } },
    ],
  },
  {
    id: 'c_ev_yellow_flag', kind: 'event', era: [3, 7], emoji: '🚩', title: 'The Yellow Flag',
    text: 'A ship arrives flying the plague flag. The crew is waving. Some of them are waving very slowly.',
    choices: [
      { label: 'Let them dock and treat them', check: {
        base: 0.25, flags: { medicine: 0.15, custom_food: 0.08 },
        success: { text: 'Every sailor recovers. They stay, open a bakery and pay taxes.', effect: { stats: { pop: 3, gold: 4 } } },
        fail: { text: 'The bakery opens anyway. Nobody eats there twice.', effect: { stats: { pop: -4 }, flags: { plague: 1 } } },
      } },
      { label: 'Turn them away', effect: { stats: { joy: -2, faith: 1 } } },
    ],
  },
  {
    id: 'c_ev_visiting_genius', kind: 'event', era: [3, 7], emoji: '🧑‍🏫', title: 'The Visiting Genius',
    text: 'A genius from abroad asks for asylum. She claims to have three world-changing ideas and one grudge.',
    choices: [
      { label: 'Give her a lab', effect: { stats: { gold: -4 } }, check: {
        base: 0.3, stats: { sci: 0.002 }, flags: { scholars: 0.12, engineers: 0.05, custom_hoard: 0.08 },
        success: { text: 'Two of the ideas work. The third is about the grudge, and it also works.', effect: { stats: { sci: 9 } } },
        fail: { text: 'She spent the grant on a telescope pointed at her old neighbour\'s bath.', effect: { stats: { sci: 2, weird: 2 } } },
      } },
      { label: 'Send her back for a reward', effect: { stats: { gold: 6 }, rival: { target: 'random', rel: 8 } } },
    ],
  },
  {
    id: 'c_ev_cipher', kind: 'event', era: [5, 8], emoji: '🔐', title: 'An Intercepted Cipher',
    text: 'Our listeners caught a coded message between two foreign capitals. It is long, urgent and has a lot of sevens in it.',
    choices: [
      { label: 'Crack it', check: {
        base: 0.2, stats: { sci: 0.001 }, flags: { spies: 0.1, scholars: 0.1, god_math: 0.15 },
        success: { text: 'It is an attack plan. Against us. With a date. The date was rescheduled.', effect: { stats: { sci: 4, mil: 4 }, rival: { target: 'random', mil: -5 } } },
        fail: { text: 'After weeks of work, it decodes to a soup recipe. A good one, at least.', effect: { stats: { food: 2 } } },
      } },
      { label: 'Leak it to the press', effect: { stats: { joy: 3 }, rival: { target: 'random', rel: -10 } } },
    ],
  },
  {
    id: 'c_ev_dock_strike', kind: 'event', era: [5, 8], emoji: '📦', title: 'Dockers\' Strike',
    text: 'The docks are shut. Ships are queuing out to sea. A banana shortage is now official.',
    choices: [
      { label: 'Negotiate', check: {
        base: 0.35, flags: { diplomats: 0.1, propaganda: 0.06, custom_polite: 0.15 },
        success: { text: 'A deal is struck: more pay, fewer bananas thrown at management.', effect: { stats: { gold: 3, joy: 3 } } },
        fail: { text: 'Talks collapse over the shape of the table. Then the table.', effect: { stats: { gold: -4 }, flags: { unrest: 1 } } },
      } },
      { label: 'Give in to everything', effect: { stats: { gold: -6, joy: 4 } } },
    ],
  },
  {
    id: 'c_ev_counterfeit', kind: 'event', era: [3, 8], emoji: '🪙', title: 'Counterfeit Coins',
    text: 'Fake coins are everywhere. They are lighter, shinier and have {leader}\'s nose slightly wrong.',
    choices: [
      { label: 'Hunt the forgers', check: {
        base: 0.25, flags: { spies: 0.13, bureaucracy: 0.04, custom_records: 0.1 },
        success: { text: 'The forgers are caught and hired by the mint. Their noses are much better.', effect: { stats: { gold: 6 } } },
        fail: { text: 'The forgers vanished, taking the good coins and leaving the bad ones.', effect: { stats: { gold: -5 }, flags: { inflation: 1 } } },
      } },
      { label: 'Recall every coin', effect: { stats: { gold: -4 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'c_ev_rumour', kind: 'event', era: [5, 8], emoji: '🗯️', title: 'A Rumour About {leader}',
    text: 'Everyone is saying {leader} is secretly three children in a long coat. The coat is real, at least.',
    choices: [
      { label: 'Launch a counter-campaign', effect: { stats: { gold: -3 } }, check: {
        base: 0.3, flags: { propaganda: 0.13, scholars: 0.04, mascot: 0.06 },
        success: { text: 'The counter-campaign works. Now everyone believes it is four children.', effect: { stats: { joy: 6 } } },
        fail: { text: 'The campaign photo shows {leader} in a long coat. Disaster.', effect: { stats: { joy: -6 }, flags: { unrest: 1 } } },
      } },
      { label: 'Ignore it', effect: { stats: { joy: -3 } } },
    ],
  },
  {
    id: 'c_ev_space_flu', kind: 'event', era: [6, 8], emoji: '🦠', title: 'The Space Flu',
    text: 'Something came down on a meteorite and it is very contagious. Symptoms: sneezing glitter.',
    choices: [
      { label: 'Race for a vaccine', effect: { stats: { gold: -5 } }, check: {
        base: 0.2, stats: { sci: 0.001 }, flags: { medicine: 0.12, genes: 0.05, logistics: 0.05 },
        success: { text: 'A vaccine in record time. The glitter remains, but it is optional now.', effect: { stats: { pop: 3, sci: 5 } } },
        fail: { text: 'The vaccine works, eventually. The glitter has gotten into everything.', effect: { stats: { pop: -5, weird: 3 } } },
      } },
      { label: 'Lock everything down', effect: { stats: { pop: -2, joy: -5, gold: -3 } } },
    ],
  },
  {
    id: 'c_ev_alien_envoy', kind: 'alien', era: [6, 8], emoji: '👽', title: 'A Small Envoy',
    text: 'A single alien envoy has landed and requested a formal meeting. It is about knee height and very serious.',
    choices: [
      { label: 'Hold a full state reception', effect: { stats: { gold: -5 } }, check: {
        base: 0.25, flags: { diplomats: 0.12, custom_polite: 0.15, alien_contact: 0.05 },
        success: { text: 'The envoy is charmed. It files a very positive report about our chairs.', effect: { alienRel: 10, threat: -3 } },
        fail: { text: 'We seated the envoy next to the kitchen door. It has been noted.', effect: { alienRel: -5 } },
      } },
      { label: 'Detain it for questioning', effect: { stats: { sci: 4 }, alienRel: -8, threat: -1, chain: { id: 'ch_f_envoy', delay: 1 } } },
      { label: 'Give it a snack and send it home', effect: { stats: { food: -2 }, alienRel: 3, chain: { id: 'ch_f_snack', delay: 2 } } },
    ],
  },
  {
    id: 'c_ev_drill', kind: 'event', era: [7, 8], emoji: '🚨', title: 'Invasion Drill',
    text: 'A national drill to practise hiding from the aliens. The sirens are loud. The instructions are long.',
    choices: [
      { label: 'Run it properly', check: {
        base: 0.25, flags: { logistics: 0.1, propaganda: 0.08, bureaucracy: 0.03, hole: 0.05 },
        success: { text: 'Everyone is in a bunker in nine minutes. The aliens, watching, take notes.', effect: { stats: { joy: 2 }, threat: -3 } },
        fail: { text: 'Half the nation evacuated to the wrong hemisphere.', effect: { stats: { joy: -5, gold: -3 } } },
      } },
      { label: 'Skip it this year', effect: { stats: { joy: 2 } } },
    ],
  },
];
