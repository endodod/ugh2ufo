import type { CardDef } from '../../types';

export const comboCards: CardDef[] = [
  {
    id: 'o_x_frog_desert', kind: 'event', title: 'The Frog Is Thirsty', emoji: '🐸', era: [1, 5], once: true, weight: 3,
    req: { flags: { god_frog: 1, land_desert: 1 } },
    text: 'The sacred frog is drying out. The priests demand a holy pond. In the desert. Today.',
    choices: [
      { label: 'Build a giant aqueduct', effect: { stats: { gold: -7, sci: 5, faith: 5 } } },
      { label: 'Everyone donates a cup of water', effect: { stats: { food: -5, faith: 8, joy: -2 } } },
      { label: 'Tell the frog it is a desert frog now', outcomes: [
        { weight: 1, text: 'The frog accepted it. It is now crunchy and very proud.', effect: { stats: { weird: 6, faith: 3 } } },
        { weight: 1, text: 'The frog left for the coast. Half the clergy followed.', effect: { stats: { faith: -6, pop: -3 } } },
      ] },
    ],
  },
  {
    id: 'o_x_frog_swamp', kind: 'event', title: 'The Frog Has Found Its Kind', emoji: '🪷', era: [2, 7], once: true, weight: 3,
    req: { flags: { god_frog: 1, land_swamp: 1 } },
    text: 'The swamp is full of frogs. They all now sit facing the sacred frog. Every night, they croak in unison.',
    choices: [
      { label: 'Join the chorus', effect: { stats: { faith: 6, weird: 5 }, flags: { cult: 1 } } },
      { label: 'Train the frog army', effect: { stats: { mil: 9, weird: 3 } } },
    ],
  },
  {
    id: 'o_x_cat_goat', kind: 'event', title: 'The Cat Disapproves of the Goat', emoji: '😾', era: [1, 5], once: true, weight: 3,
    req: { flags: { god_cat: 1, founder_goat: 1 } },
    text: 'The holy cat has sat on the founding goat\'s statue and pushed its head off. Theologians are scrambling.',
    choices: [
      { label: 'The cat is right', effect: { stats: { faith: 4 }, flags: { cats: 1 } } },
      { label: 'The goat was first', effect: { stats: { joy: 3, weird: 3, mil: 2 } } },
    ],
  },
  {
    id: 'o_x_hats_polite', kind: 'event', title: 'Hat Tipping Crisis', emoji: '🎩', era: [2, 6], once: true, weight: 3,
    req: { flags: { custom_hats: 1, custom_polite: 1 } },
    text: 'Etiquette demands tipping your hat to everyone you pass. With hats now two metres tall, the streets are a slow-motion disaster.',
    choices: [
      { label: 'Install hat hinges', effect: { stats: { sci: 5, gold: -3, joy: 3 } } },
      { label: 'Ban tipping on main roads', effect: { stats: { gold: 4, joy: -4 } } },
    ],
  },
  {
    id: 'o_x_volcano_volcano', kind: 'event', title: 'Neighbourhood God', emoji: '🌋', era: [0, 4], once: true, weight: 3,
    req: { flags: { god_volcano: 1, land_volcano: 1 } },
    text: 'Living on your god is convenient for worship and bad for property values.',
    choices: [
      { label: 'Daily offerings at the crater', effect: { stats: { faith: 8, gold: -3 } } },
      { label: 'Install a complaints box at the summit', outcomes: [
        { weight: 2, text: 'The volcano has read your complaints. It is working on itself.', effect: { stats: { joy: 5, food: 4 } } },
        { weight: 1, text: 'The volcano did not like the complaints.', effect: { stats: { pop: -4, faith: 4 } } },
      ] },
    ],
  },
  {
    id: 'o_x_late_naps', kind: 'event', title: 'Nobody Has Seen Noon', emoji: '🥱', era: [2, 7], once: true, weight: 3,
    req: { flags: { custom_late: 1, custom_naps: 1 } },
    text: 'Everyone arrives late to the nap. Then naps late. Statistically, the nation is awake for 90 minutes a day.',
    choices: [
      { label: 'Embrace it', effect: { stats: { joy: 10, gold: -6 }, flags: { party: 1 } } },
      { label: 'Ration sleep', effect: { stats: { gold: 6, sci: 3, joy: -6 } } },
    ],
  },
  {
    id: 'o_x_lights_crater', kind: 'event', title: 'They Came Back for It', emoji: '🛸', era: [4, 8], once: true, weight: 3,
    req: { flags: { god_lights: 1, land_crater: 1 } },
    text: 'The blinking lights are hovering right over the crater. It turns out you have been living in their parking spot.',
    choices: [
      { label: 'Move over politely', effect: { alienRel: 12, flags: { alien_contact: 1 }, stats: { pop: -2 } } },
      { label: 'Charge them for parking', effect: { stats: { gold: 12 }, alienRel: -4, chain: { id: 'ch_f_parkingfee', delay: 2 } } },
    ],
  },
  {
    id: 'o_x_records_committee', kind: 'event', title: 'The Paper Singularity', emoji: '📎', era: [4, 8], once: true, weight: 3,
    req: { flags: { custom_records: 1, founder_committee: 1 } },
    text: 'The archives have become so dense they are developing their own gravity. Small clerks are orbiting the filing cabinets.',
    choices: [
      { label: 'File it under "progress"', effect: { flags: { bureaucracy: 2 }, stats: { joy: -4 } } },
      { label: 'Point the gravity at the fleet', effect: { stats: { sci: 6 }, flags: { bureaucracy: 1 }, threat: -4 } },
    ],
  },
  {
    id: 'o_x_dance_shout', kind: 'event', title: 'The Rave', emoji: '🔊', era: [3, 8], once: true, weight: 3,
    req: { flags: { custom_dance: 1, custom_shout: 1 } },
    text: 'A dispute between two very loud dancers has lasted nine days. Half the country has joined in. Nobody remembers what the dispute was.',
    choices: [
      { label: 'Declare a national festival', effect: { stats: { joy: 10, gold: -4 }, flags: { party: 2 } } },
      { label: 'Call in the fire brigade', effect: { stats: { joy: -6, mil: 3 } } },
    ],
  },
  {
    id: 'o_x_island_hoard', kind: 'event', title: 'The Island Is Mostly Pile', emoji: '🏝️', era: [3, 8], once: true, weight: 3,
    req: { flags: { land_island: 1, custom_hoard: 1 } },
    text: 'Nothing has left the island in centuries. Surveyors report the island is now 60% junk and growing in size.',
    choices: [
      { label: 'Build out into the sea', effect: { stats: { pop: 5, gold: 3, weird: 3 } } },
      { label: 'A great island clean-up', effect: { stats: { joy: 6, gold: -4, sci: 3 } } },
    ],
  },
  {
    id: 'o_x_dave_naps', kind: 'event', title: 'Dave Is Just Vibing', emoji: '🧔', era: [2, 7], once: true, weight: 3,
    req: { flags: { god_dave: 1, custom_naps: 1 } },
    text: 'Dave has been asleep for six years. The faithful are napping in solidarity. Theologians call this "the Long Snooze".',
    choices: [
      { label: 'Let Dave sleep', effect: { stats: { joy: 6, faith: 4, gold: -3 } } },
      { label: 'Wake Dave', outcomes: [
        { weight: 1, text: 'Dave woke up, made a sandwich, and went back to bed. A great sign.', effect: { stats: { faith: 6, joy: 3 } } },
        { weight: 1, text: 'Dave is grumpy. Crops fail out of sympathy.', effect: { stats: { food: -5, faith: 2 } } },
      ] },
    ],
  },
  {
    id: 'o_x_tundra_sun', kind: 'event', title: 'Where Is He', emoji: '🌘', era: [0, 5], once: true, weight: 3,
    req: { flags: { god_sun: 1, land_tundra: 1 } },
    text: 'It is polar winter. The Sun God has not been seen for three months. The faithful are writing him increasingly worried letters.',
    choices: [
      { label: 'Light a giant bonfire as a reminder', effect: { stats: { faith: 6, food: -3, joy: 3 } } },
      { label: 'Move the capital south', effect: { stats: { gold: -5, food: 4, pop: 3 } } },
    ],
  },
  {
    id: 'o_x_cave_sun', kind: 'event', title: 'A Long Way From God', emoji: '🔦', era: [0, 4], once: true, weight: 3,
    req: { flags: { god_sun: 1, land_cave: 1 } },
    text: 'The faithful worship a god they have never seen. A missionary just went up to check. He has been staring at it for an hour and cannot see anything anymore.',
    choices: [
      { label: 'Declare him a saint', effect: { stats: { faith: 7 } } },
      { label: 'Invent sunglasses', effect: { stats: { sci: 5, gold: 3 } } },
    ],
  },
  {
    id: 'o_x_names_twins', kind: 'event', title: 'Gorb and Gorb', emoji: '👯', era: [1, 6], once: true, weight: 3,
    req: { flags: { custom_names: 1, founder_twins: 1 } },
    text: 'The founding twins were both called Gorb. Nobody has ever known which one we are supposed to be angry at.',
    choices: [
      { label: 'Be angry at both', effect: { stats: { mil: 5, joy: -3 } } },
      { label: 'Forgive whichever Gorb', effect: { stats: { joy: 6, faith: 2 } } },
    ],
  },
  {
    id: 'o_x_back_moon', kind: 'event', title: 'It Howls at the Moon', emoji: '🌕', era: [3, 8], once: true, weight: 3,
    req: { flags: { land_back: 1, god_moon: 1 } },
    text: 'Every full moon the ground beneath you lifts its head and makes a long, deep sound. The cult is having the best time of its life.',
    choices: [
      { label: 'Howl along', effect: { stats: { faith: 6, weird: 5 }, flags: { cult: 2 } } },
      { label: 'Install very large earmuffs', effect: { stats: { gold: -4, sci: 4, joy: 3 } } },
    ],
  },
  {
    id: 'o_x_food_frog', kind: 'event', title: 'A Delicate Question', emoji: '🍴', era: [2, 7], once: true, weight: 3,
    req: { flags: { custom_food: 1, god_frog: 1 } },
    text: 'A chef has asked, quietly, what the frog would taste like. He has not been seen since. The question remains.',
    choices: [
      { label: 'Excommunicate the question', effect: { stats: { faith: 6, joy: -2 } } },
      { label: 'Try one leg (it will grow back)', outcomes: [
        { weight: 1, text: 'It grew back. It grew back bigger. The frog seems pleased.', effect: { stats: { food: 10, weird: 5 } } },
        { weight: 1, text: 'The frog ate the chef. Fair, honestly.', effect: { stats: { pop: -2, faith: 5 } } },
      ] },
    ],
  },
  {
    id: 'o_x_probe_lights', kind: 'event', title: 'Dad?', emoji: '🛸', era: [5, 8], once: true, weight: 3,
    req: { flags: { founder_probe: 1, god_lights: 1 } },
    text: 'The blinking sky lights and the founder\'s old metal body have started blinking in sync. Engineers suspect a family reunion.',
    choices: [
      { label: 'Let them talk', effect: { flags: { alien_contact: 2 }, alienRel: 8, stats: { weird: 4 } } },
      { label: 'Listen in', effect: { stats: { sci: 10 }, flags: { robots: 1 } } },
    ],
  },
  {
    id: 'o_x_cat_hats', kind: 'event', title: 'The Cat Wears the Hat', emoji: '🐈', era: [2, 7], once: true, weight: 3,
    req: { flags: { god_cat: 1, custom_hats: 1 } },
    text: 'The holy cat has sat in the royal hat and will not leave. By hat law, it now owns everything.',
    choices: [
      { label: 'All hail the hat cat', effect: { flags: { cats: 2 }, stats: { joy: 4, gold: -4 } } },
      { label: 'Commission a second royal hat', effect: { stats: { gold: -3, joy: 3 }, flags: { cats: 1 } } },
    ],
  },
  {
    id: 'o_x_child_spite', kind: 'event', title: 'Grounded', emoji: '🙅', era: [1, 6], once: true, weight: 3,
    req: { flags: { founder_child: 1, god_spite: 1 } },
    text: 'The god who hates you has declared the whole nation grounded. Your people, raised by a child, have never heard of grounding and are just going out anyway.',
    choices: [
      { label: 'Sneak out together', effect: { stats: { joy: 7, mil: 3 } } },
      { label: 'Do the chores, just in case', effect: { stats: { gold: 5, food: 3, joy: -3 } } },
    ],
  },
  {
    id: 'o_x_mountain_shout', kind: 'event', title: 'Avalanche Doctrine', emoji: '🏔️', era: [2, 7], once: true, weight: 3,
    req: { flags: { land_mountain: 1, custom_shout: 1 } },
    text: 'Every friendly greeting causes an avalanche. Generals have noticed this is also very useful.',
    choices: [
      { label: 'Shout at invaders from the peaks', effect: { stats: { mil: 9 } } },
      { label: 'Introduce indoor voices', effect: { stats: { pop: 3, joy: -4, sci: 2 } } },
    ],
  },
];
