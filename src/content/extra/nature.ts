// Nature, climate, resources and environment.
import type { CardDef } from '../../types';

export const natureCards: CardDef[] = [
  {
    id: 'x_n_tsunami', kind: 'event', title: 'The Big Wave', emoji: '🌊', era: [0, 8],
    text: 'The sea pulled back a mile, then came back with friends.',
    choices: [
      { label: 'Run uphill', effect: { stats: { food: -4, pop: -1 } } },
      { label: 'Build a sea wall after', effect: { stats: { gold: -6, pop: -2, mil: 2 } } },
      { label: 'Surf it', check: {
        base: 0.2, flags: { land_coast: 0.2, land_island: 0.2, party: 0.05, medicine: 0.05 },
        success: { text: 'A legend is born. Surfing becomes the national sport.', effect: { stats: { joy: 8 }, flags: { party: 1 } } },
        fail: { text: 'A legend is not born.', effect: { stats: { pop: -3 } } },
      } },
    ],
  },
  {
    id: 'x_n_drought', kind: 'event', title: 'Drought', emoji: '🏜️', era: [0, 7],
    text: 'No rain for four months. The rain dancers have filed for overtime.',
    choices: [
      { label: 'Pay the rain dancers', effect: { stats: { gold: -4, faith: 2 } }, check: {
        base: 0.3, flags: { dance: 0.12, custom_dance: 0.2, cult: 0.05 },
        success: { text: 'It rains. The dancers are insufferable.', effect: { stats: { food: 4 } } },
        fail: { text: 'It does not rain. The dancers blame your rhythm.', effect: { stats: { food: -4 } } },
      } },
      { label: 'Ration water', effect: { stats: { food: -3, joy: -3 }, flags: { bureaucracy: 1 } } },
      { label: 'Dig deeper wells', effect: { stats: { gold: -3, food: -1, sci: 2 } } },
    ],
  },
  {
    id: 'x_n_winter', kind: 'event', title: 'The Century Winter', emoji: '❄️', era: [0, 6], once: true,
    text: 'Winter arrived early and announced it is staying for a while. The rivers froze so hard people are holding markets on them.',
    choices: [
      { label: 'Burn the furniture', effect: { stats: { gold: -3, pop: -1, joy: -2 } } },
      { label: 'Hold an ice festival', effect: { stats: { joy: 6, food: -5 }, flags: { party: 1 } } },
      { label: 'Huddle together for warmth', effect: { stats: { pop: 3, joy: 2, food: -3 }, text: 'Nine months later, a baby boom.' } },
    ],
  },
  {
    id: 'x_n_storm', kind: 'event', title: 'Fleet Lost to Storm', emoji: '⛈️', era: [2, 6],
    text: 'A storm hit the fleet. The admiral sends a message by bottle: "Mostly fine. Please send boats."',
    choices: [
      { label: 'Rebuild the fleet', effect: { stats: { gold: -7 } }, check: {
        base: 0.35, flags: { navy: 0.12, engineers: 0.08, land_coast: 0.1, land_island: 0.1 },
        success: { text: 'The new ships are better. They have storm handles now.', effect: { stats: { mil: 5 }, flags: { navy: 1 } } },
        fail: { text: 'The new fleet is smaller and leaks in new, exciting places.', effect: { stats: { mil: 1 } } },
      } },
      { label: 'Blame the sea god', effect: { stats: { faith: 3, mil: -4 } } },
      { label: 'Fine the admiral', effect: { stats: { gold: 2, mil: -3, joy: 2 } } },
    ],
  },
  {
    id: 'x_n_locusts', kind: 'event', title: 'Locusts', emoji: '🦗', era: [0, 6],
    text: 'A cloud of locusts arrived. It is eating the crops, the thatch, and one particularly slow scarecrow.',
    choices: [
      { label: 'Eat the locusts', effect: { stats: { food: 2, joy: -3 }, text: 'Crunchy. Protein-rich. Nobody is happy.' } },
      { label: 'Release the chickens', effect: { stats: { food: -3 }, chain: { id: 'ch_f_chickens', delay: 2 } } },
      { label: 'Pray', effect: { stats: { faith: 3, food: -6 } } },
    ],
  },
  {
    id: 'x_n_blight', kind: 'event', title: 'Crop Blight', emoji: '🥔', era: [2, 7],
    text: 'A fungus has turned the potato crop into grey mush. The potatoes look embarrassed.',
    choices: [
      { label: 'Import food', effect: { stats: { gold: -6, food: 4 } } },
      { label: 'Plant something else entirely', effect: { stats: { food: -3, sci: 3 } } },
      { label: 'Ask the mushroom network', req: { flags: { fungus: 2 } }, effect: { stats: { food: 4, weird: 2 }, flags: { fungus: 1 }, text: 'The blight was a cousin. It agrees to leave.' } },
    ],
  },
  {
    id: 'x_n_migration', kind: 'event', title: 'The Great Migration', emoji: '🦬', era: [0, 4],
    text: 'Ten thousand buffalo are crossing the land. They do not stop for anything, including the capital.',
    choices: [
      { label: 'Hunt the herd', effect: { stats: { food: 8, mil: -1 } } },
      { label: 'Let them pass', effect: { stats: { gold: -3, joy: 2 }, text: 'The capital is flatter now.' } },
      { label: 'Follow them', effect: { stats: { food: 4, pop: 2, sci: -2 } } },
    ],
  },
  {
    id: 'x_n_minedry', kind: 'event', title: 'The Mine Runs Dry', emoji: '⛏️', era: [2, 8],
    text: 'The great mine has run out of ore. The miners are still digging, out of habit.',
    choices: [
      { label: 'Dig a new mine', effect: { stats: { gold: -5, mil: 2 }, flags: { depleted: 1 } } },
      { label: 'Turn it into a tourist attraction', effect: { stats: { gold: 3, joy: 2 } } },
      { label: 'Keep digging, it is a feeling', effect: { stats: { weird: 2 }, flags: { hole: 1 } } },
    ],
  },
  {
    id: 'x_n_iron', kind: 'event', title: 'Iron in the Hills', emoji: '🪨', era: [1, 4], once: true,
    text: 'Prospectors found red rocks that turn into hard metal. The blacksmiths are visibly excited.',
    choices: [
      { label: 'Forge weapons', effect: { stats: { mil: 6, gold: -2 } } },
      { label: 'Forge plows', effect: { stats: { food: 6, gold: -2 } } },
      { label: 'Forge a really big bell', effect: { stats: { faith: 4, joy: 2 } } },
    ],
  },
  {
    id: 'x_n_coal', kind: 'event', title: 'Black Rocks That Burn', emoji: '🪨', era: [4, 6], once: true,
    text: 'A whole valley of coal. It burns hot, cheap and with an attitude.',
    choices: [
      { label: 'Burn it all', effect: { stats: { gold: 8, sci: 2, joy: -2 }, flags: { pollution: 1 } } },
      { label: 'Burn some of it', effect: { stats: { gold: 4 } } },
      { label: 'Leave it, the valley is pretty', effect: { stats: { joy: 3, faith: 1 } } },
    ],
  },
  {
    id: 'x_n_oil', kind: 'event', title: 'Black Gold', emoji: '🛢️', era: [5, 7], once: true,
    text: 'A farmer drilled for water and struck oil. He is very upset. His cows are now very shiny.',
    choices: [
      { label: 'Pump it', effect: { stats: { gold: 12, joy: -2 }, flags: { pollution: 1 } } },
      { label: 'Nationalize it', effect: { stats: { gold: 8 }, flags: { bureaucracy: 1, corruption: 1 } } },
      { label: 'Plug it and apologize to the cows', effect: { stats: { joy: 2, food: 2 } } },
    ],
  },
  {
    id: 'x_n_uranium', kind: 'event', title: 'Glowing Rocks', emoji: '☢️', era: [6, 8], once: true,
    text: 'Miners found rocks that glow in the dark. Several miners now also glow in the dark.',
    choices: [
      { label: 'Build reactors', effect: { stats: { gold: 6, sci: 6 } } },
      { label: 'Build warheads', effect: { stats: { mil: 10, joy: -4 }, threat: -1 } },
      { label: 'Make glow-in-the-dark souvenirs', effect: { stats: { gold: 4, weird: 3 }, flags: { genes: 1 } } },
    ],
  },
  {
    id: 'x_n_silk', kind: 'event', title: 'The Worm Secret', emoji: '🐛', era: [1, 5], once: true,
    text: 'Traders reveal that the finest cloth in the world is made by worms. The worms refuse to unionize.',
    choices: [
      { label: 'Smuggle worms home', check: {
        base: 0.45, flags: { spies: 0.12, custom_secret: 0.15, logistics: 0.05 },
        success: { text: 'Success. The nobility now dresses like expensive curtains.', effect: { stats: { gold: 7, joy: 3 } } },
        fail: { text: 'The smuggler is caught. He claims they are pets.', effect: { stats: { gold: 1, mil: -1 } } },
      } },
      { label: 'Buy silk honestly', effect: { stats: { gold: -4, joy: 5 } } },
    ],
  },
  {
    id: 'x_n_deforest', kind: 'event', title: 'Where Did the Forest Go', emoji: '🪵', era: [2, 6],
    text: 'Someone noticed the forest is gone. It was turned into ships, houses and a very large number of spoons.',
    choices: [
      { label: 'Plant new trees', effect: { stats: { gold: -4, joy: 3, food: 2 } } },
      { label: 'Import wood', effect: { stats: { gold: -5 } } },
      { label: 'Switch to stone everything', effect: { stats: { mil: 3, joy: -2 }, flags: { depleted: 1 } } },
    ],
  },
  {
    id: 'x_n_depleted', kind: 'event', title: 'Running Out of Everything', emoji: '📉', era: [4, 8], req: { flags: { depleted: 2 } },
    text: 'Surveyors report that we have used up the good iron, the good wood and most of the good clay. The bad clay is very proud of its promotion.',
    choices: [
      { label: 'Recycle', effect: { stats: { gold: -3, sci: 4 }, set: { depleted: 0 } } },
      { label: 'Take the neighbors\' resources', effect: { stats: { mil: -3, gold: 8, joy: -2 } } },
      { label: 'Mine the moon', req: { flags: { yeet: 3 } }, effect: { stats: { gold: 10, sci: 3 }, set: { depleted: 0 }, alienRel: -3 } },
    ],
  },
  {
    id: 'x_n_smog', kind: 'event', title: 'Smog Day', emoji: '🌫️', era: [5, 8], req: { flags: { pollution: 1 } },
    text: 'The smog is so thick that two citizens walked into each other and got married before they noticed.',
    choices: [
      { label: 'Ban coal on Sundays', effect: { stats: { gold: -3, joy: 3 } } },
      { label: 'Hand out masks', effect: { stats: { gold: -2, pop: 1 } } },
      { label: 'Embrace the mystery', effect: { stats: { weird: 3, pop: -2 }, flags: { pollution: 1 } } },
    ],
  },
  {
    id: 'x_n_threeeyes', kind: 'event', title: 'The Three-Eyed Fish', emoji: '🐟', era: [6, 8], req: { flags: { pollution: 2 } },
    text: 'Fishermen pulled up a fish with three eyes. It looked at them with each one separately.',
    choices: [
      { label: 'Clean up the river', effect: { stats: { gold: -8, joy: 4 }, set: { pollution: 0 } } },
      { label: 'Call it evolution', effect: { stats: { weird: 4, sci: 2 }, flags: { genes: 1, pollution: 1 } } },
      { label: 'Put it on the coat of arms', effect: { stats: { joy: 3, weird: 3 } } },
    ],
  },
  {
    id: 'x_n_climate', kind: 'event', title: 'Getting Warm in Here', emoji: '🌡️', era: [7, 8], req: { flags: { pollution: 2 } },
    text: 'Scientists warn the planet is overheating. The aliens, watching, have quietly lowered their estimate of how hard this will be.',
    choices: [
      { label: 'Go green', effect: { stats: { gold: -10, joy: 4, sci: 4 }, set: { pollution: 0 }, threat: -1 } },
      { label: 'Install a giant parasol in orbit', effect: { stats: { gold: -8, sci: 6, weird: 3 } } },
      { label: 'Ignore it', effect: { stats: { food: -5 }, threat: 3 } },
    ],
  },
  {
    id: 'x_n_volcano', kind: 'event', title: 'The Mountain Wakes', emoji: '🌋', era: [2, 8],
    text: 'The volcano erupted. The ash cloud spells nothing, despite what the priests say.',
    choices: [
      { label: 'Evacuate', effect: { stats: { gold: -3 } }, check: {
        base: 0.4, flags: { logistics: 0.12, land_volcano: 0.2, god_volcano: 0.1 },
        success: { text: 'Everyone leaves in an orderly line, carrying the good pots.', effect: { stats: { food: -1 } } },
        fail: { text: 'The evacuation route was the lava route.', effect: { stats: { food: -5, pop: -2 } } },
      } },
      { label: 'Harvest the fertile ash later', effect: { stats: { pop: -2, food: 6 } } },
      { label: 'Install a geothermal plant', req: { flags: { hole: 3 } }, effect: { stats: { gold: 8, sci: 3 } } },
    ],
  },
  {
    id: 'x_n_deposit', kind: 'event', title: 'A New Deposit', emoji: '💎', era: [0, 8],
    text: 'Someone kicked a rock and found something shiny under it. The kicker demands a statue.',
    choices: [
      { label: 'Mine it', effect: { stats: { gold: 7, pop: -1 } } },
      { label: 'Give the kicker a statue', effect: { stats: { gold: 4, joy: 3 } } },
    ],
  },
];
