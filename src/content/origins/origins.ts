import type { OriginDef } from '../../types';

const lands: OriginDef[] = [
  {
    id: 'land_coast', category: 'land', name: 'The Coast', emoji: '🌊',
    desc: 'Fish, salt, and a deep suspicion of the horizon.',
    effect: { stats: { food: 5, mil: -1 } }, perTurn: { food: 1 },
  },
  {
    id: 'land_mountain', category: 'land', name: 'The Mountains', emoji: '⛰️',
    desc: 'Easy to defend. Hard to farm. Everyone has excellent calves.',
    effect: { stats: { mil: 5, food: -3 } }, perTurn: { mil: 1, food: -1 },
  },
  {
    id: 'land_desert', category: 'land', name: 'The Desert', emoji: '🏜️',
    desc: 'Sand, sun, and sand. The sand gets everywhere. Philosophers thrive.',
    effect: { stats: { food: -4, gold: 3, faith: 3 } }, perTurn: { faith: 1 },
  },
  {
    id: 'land_jungle', category: 'land', name: 'The Jungle', emoji: '🌴',
    desc: 'Everything here is edible, poisonous, or both on alternate days.',
    effect: { stats: { food: 5, sci: 2, pop: -2 } }, perTurn: { food: 1, joy: -1 },
  },
  {
    id: 'land_tundra', category: 'land', name: 'The Tundra', emoji: '❄️',
    desc: 'Cold, flat and honest. Nothing rots, including grudges.',
    effect: { stats: { food: -3, mil: 3, faith: 2 } }, perTurn: { mil: 1 },
  },
  {
    id: 'land_swamp', category: 'land', name: 'The Swamp', emoji: '🪷',
    desc: 'Invaders get lost. So do residents. The gas makes everyone a prophet.',
    effect: { stats: { mil: 3, joy: -3, weird: 3 } }, perTurn: { weird: 1 },
  },
  {
    id: 'land_volcano', category: 'land', name: 'Volcano Slope', emoji: '🌋',
    desc: 'The soil is incredible. The neighbour is a mountain full of fire.',
    effect: { stats: { food: 6, faith: 2, pop: -1 } }, perTurn: { food: 1, joy: -1 },
  },
  {
    id: 'land_island', category: 'land', name: 'A Small Island', emoji: '🏝️',
    desc: 'Nobody visits. Nobody invades. Nobody brings snacks.',
    effect: { stats: { joy: 6, mil: -2, pop: -2 } }, perTurn: { joy: 1 },
  },
  {
    id: 'land_delta', category: 'land', name: 'River Delta', emoji: '🏞️',
    desc: 'The river floods every year, politely, and leaves excellent mud.',
    effect: { stats: { food: 6, pop: 3, mil: -2 } },
  },
  {
    id: 'land_crater', category: 'land', name: 'Inside a Giant Crater', emoji: '☄️',
    desc: 'Something hit here very hard, long ago. The rocks still hum.',
    effect: { stats: { sci: 3, weird: 3, food: -2 }, alienRel: 3 }, perTurn: { sci: 1 },
  },
  {
    id: 'land_back', category: 'land', name: 'On the Back of Something', emoji: '🐢',
    desc: 'The ground is warm and occasionally sighs. Best not to ask.',
    effect: { stats: { weird: 5, faith: 3, mil: -1 } }, perTurn: { weird: 1 },
  },
  {
    id: 'land_cave', category: 'land', name: 'The Deep Caves', emoji: '🕳️',
    desc: 'Safe, dark, and slightly damp. The sun is considered a rumour.',
    effect: { stats: { mil: 3, sci: 2, joy: -4 } }, perTurn: { sci: 1, joy: -1 },
  },
  {
    id: 'land_plain', category: 'land', name: 'An Extremely Flat Plain', emoji: '🟫',
    desc: 'You can see your enemies coming for nine days. Boredom is the main export.',
    effect: { stats: { food: 3, pop: 2, joy: -3 } }, perTurn: { food: 1 },
  },
  {
    id: 'land_crater', category: 'land', name: 'The Crater', emoji: '☄️',
    desc: 'Something big landed here once. The soil is rich, the view is bowl-shaped, and nobody asks about the glow.',
    effect: { stats: { food: 4, sci: 2, weird: 2 } }, perTurn: { sci: 1 }, unlock: 'total_victory',
  },
];

const beliefs: OriginDef[] = [
  {
    id: 'god_sun', category: 'belief', name: 'The Sun God', emoji: '☀️',
    desc: 'Big, bright, reliable. Slightly judgemental around noon.',
    effect: { stats: { faith: 4, joy: 2 } }, perTurn: { faith: 1 },
  },
  {
    id: 'god_moon', category: 'belief', name: 'The Moon', emoji: '🌕',
    desc: 'It watches. It waxes. Robed people hum at it.',
    effect: { stats: { faith: 3, weird: 2, sci: -1 }, flags: { cult: 1 } },
  },
  {
    id: 'god_ancestors', category: 'belief', name: 'Ancestor Spirits', emoji: '👻',
    desc: 'Grandma is dead but still has opinions about your marriage.',
    effect: { stats: { faith: 4, mil: 1 } }, perTurn: { faith: 1, joy: -1 },
  },
  {
    id: 'god_tiny', category: 'belief', name: '400 Tiny Gods', emoji: '🥄',
    desc: 'A god for every spoon, door and sock. Housework is a liturgy.',
    effect: { stats: { faith: 5, gold: -2, weird: 2 } }, perTurn: { faith: 1 },
  },
  {
    id: 'god_frog', category: 'belief', name: 'One Very Large Frog', emoji: '🐸',
    desc: 'It sits in the sacred pond. It is large. It is getting larger.',
    effect: { stats: { faith: 3, weird: 3 } }, perTurn: { weird: 1 },
  },
  {
    id: 'god_volcano', category: 'belief', name: 'The Volcano', emoji: '🔥',
    desc: 'Angry, hot, and extremely specific about offerings.',
    effect: { stats: { faith: 5, pop: -2, mil: 2 } }, perTurn: { faith: 1 },
  },
  {
    id: 'god_lights', category: 'belief', name: 'The Blinking Sky Lights', emoji: '✨',
    desc: 'Some stars move and blink in patterns. You have decided this is fine.',
    effect: { stats: { faith: 2, weird: 3 }, alienRel: 5, threat: 1 },
  },
  {
    id: 'god_cat', category: 'belief', name: 'The Cat', emoji: '🐈',
    desc: 'The cat did not ask to be worshipped. The cat accepts it as overdue.',
    effect: { stats: { faith: 2, joy: 2, food: -2 }, flags: { cats: 1 } },
  },
  {
    id: 'god_vibes', category: 'belief', name: 'No Gods, Just Vibes', emoji: '✌️',
    desc: 'The universe is a mood. The mood is mostly fine.',
    effect: { stats: { joy: 6, sci: 2 } }, perTurn: { joy: 1, faith: -1 },
  },
  {
    id: 'god_dave', category: 'belief', name: 'Dave', emoji: '🧔',
    desc: 'A god who is clearly just a guy named Dave. He lives in the big hut. He seems nice.',
    effect: { stats: { faith: 3, food: -1, joy: 3 } },
  },
  {
    id: 'god_tax', category: 'belief', name: 'The Auditor Above', emoji: '🧾',
    desc: 'A deity who keeps receipts. Sin is a rounding error, and it will be found.',
    effect: { stats: { faith: 2, gold: 3, joy: -3 }, flags: { bureaucracy: 1 } },
  },
  {
    id: 'god_math', category: 'belief', name: 'Holy Numbers', emoji: '🔢',
    desc: 'Seven is sacred. Thirteen is cursed. Pi is a mystery best not finished.',
    effect: { stats: { sci: 4, faith: 2, joy: -2 } }, perTurn: { sci: 1 },
  },
  {
    id: 'god_spite', category: 'belief', name: 'A God Who Hates Us', emoji: '😤',
    desc: 'He exists, he is real, and he finds you specifically annoying.',
    effect: { stats: { mil: 4, joy: -4, faith: 4 } }, perTurn: { mil: 1 },
  },
];

const customs: OriginDef[] = [
  {
    id: 'custom_hats', category: 'custom', name: 'Obsessed With Hats', emoji: '🎩',
    desc: 'The hat is the person. Someone without a hat is legally furniture.',
    effect: { stats: { joy: 4, gold: -2 } }, perTurn: { joy: 1 },
  },
  {
    id: 'custom_late', category: 'custom', name: 'Always Late', emoji: '⏰',
    desc: 'Everyone arrives eventually. It is a culture of eventually.',
    effect: { stats: { joy: 5, mil: -2 } }, perTurn: { joy: 1, gold: -1 },
  },
  {
    id: 'custom_records', category: 'custom', name: 'Compulsive Record-Keepers', emoji: '📎',
    desc: 'Every sneeze is logged in triplicate. The triplicate is also logged.',
    effect: { stats: { sci: 2, joy: -2 }, flags: { bureaucracy: 1 } }, perTurn: { sci: 1 },
  },
  {
    id: 'custom_dance', category: 'custom', name: 'Dance-Off Justice', emoji: '💃',
    desc: 'Disputes are settled by dance-off. Lawyers are fit and terrifying.',
    effect: { stats: { joy: 4, mil: -1 }, flags: { party: 1 } },
  },
  {
    id: 'custom_hoard', category: 'custom', name: 'Never Throw Anything Away', emoji: '📦',
    desc: 'That broken pot might be useful. So might the other 4,000.',
    effect: { stats: { gold: 3, joy: -1 } }, perTurn: { gold: 1 },
  },
  {
    id: 'custom_polite', category: 'custom', name: 'Extremely Polite', emoji: '🙇',
    desc: 'Sorry. So sorry. Doorways take nine minutes. Wars are rare and apologetic.',
    effect: { stats: { joy: 3, mil: -3 }, alienRel: 4 },
  },
  {
    id: 'custom_food', category: 'custom', name: 'They Eat Weird Stuff', emoji: '🦗',
    desc: 'Bugs, bark, rocks with a nice crunch. Famine is a matter of opinion.',
    effect: { stats: { food: 5, weird: 2, joy: -1 } }, perTurn: { food: 1 },
  },
  {
    id: 'custom_shout', category: 'custom', name: 'Everyone Shouts', emoji: '📣',
    desc: 'Not angry. Just enthusiastic. Very, very enthusiastic.',
    effect: { stats: { mil: 3, joy: 2, sci: -1 } },
  },
  {
    id: 'custom_naps', category: 'custom', name: 'Sacred Naptime', emoji: '😴',
    desc: 'From noon to three, nobody does anything. Invaders have learned to wait.',
    effect: { stats: { joy: 5, gold: -2 } }, perTurn: { joy: 1, mil: -1 },
  },
  {
    id: 'custom_names', category: 'custom', name: 'Everyone Is Named Gorb', emoji: '🪪',
    desc: 'All citizens share one name. Census results: Gorb. Population: yes.',
    effect: { stats: { joy: 2, weird: 3, sci: -1 } },
  },
  {
    id: 'custom_compete', category: 'custom', name: 'Everything Is a Competition', emoji: '🏆',
    desc: 'Competitive breathing. Competitive funerals. Somebody always wins dinner.',
    effect: { stats: { mil: 2, sci: 2, joy: -2 } }, perTurn: { sci: 1 },
  },
  {
    id: 'custom_secret', category: 'custom', name: 'Everything Is a Secret', emoji: '🤫',
    desc: 'Nobody says where they live, what they eat, or who is king. Not even the king.',
    effect: { stats: { mil: 3, joy: -2, sci: 1 } },
  },
  {
    id: 'custom_big', category: 'custom', name: 'Build Everything Too Big', emoji: '🗿',
    desc: 'Chairs for giants. Doors for giants. No giants have ever been seen.',
    effect: { stats: { faith: 2, joy: 2, gold: -3 } }, perTurn: { faith: 1, gold: -1 },
  },
  {
    id: 'custom_nap', category: 'custom', name: 'The Mandatory Nap', emoji: '😴',
    desc: 'Every afternoon, by law, everyone lies down. Wars are hard to start from a horizontal position.',
    effect: { stats: { joy: 4, mil: -2 } }, perTurn: { joy: 1 }, unlock: 'pacifist',
  },
];

const founders: OriginDef[] = [
  {
    id: 'founder_explorer', category: 'founder', name: 'A Lost Explorer', emoji: '🧭',
    desc: 'He was heading somewhere much better. He stopped to ask for directions. There was nobody to ask.',
    effect: { stats: { sci: 3, food: -2 } },
  },
  {
    id: 'founder_twins', category: 'founder', name: 'Twins Who Hated Each Other', emoji: '👯',
    desc: 'They founded the city together, mostly to stop the other from founding it.',
    effect: { stats: { mil: 4, joy: -3 } }, perTurn: { mil: 1 },
  },
  {
    id: 'founder_goat', category: 'founder', name: 'A Goat', emoji: '🐐',
    desc: 'The goat walked here, sat down, and refused to move. Civilisation followed.',
    effect: { stats: { weird: 4, food: 2, faith: 1 } },
  },
  {
    id: 'founder_exile', category: 'founder', name: 'Kicked Out of a Better Tribe', emoji: '🥾',
    desc: 'Our founder was expelled for "reasons". We are the reasons now.',
    effect: { stats: { mil: 3, joy: 2 }, rival: { target: 'random', rel: -15 } },
  },
  {
    id: 'founder_accident', category: 'founder', name: 'Founded by Accident', emoji: '🤷',
    desc: 'A group stopped for a quick rest. That was eleven generations ago.',
    effect: { stats: { pop: 3, joy: 2, sci: -1 } },
  },
  {
    id: 'founder_poet', category: 'founder', name: 'A Poet King', emoji: '📜',
    desc: 'The laws rhyme. The tax code is a sonnet. The army is mostly adjectives.',
    effect: { stats: { joy: 3, faith: 2, mil: -2 } }, perTurn: { joy: 1 },
  },
  {
    id: 'founder_child', category: 'founder', name: 'A Child Left in Charge', emoji: '👶',
    desc: 'The adults went to get more firewood and never came back. Bedtime was abolished on day one.',
    effect: { stats: { joy: 6, sci: -2, gold: -1 } },
  },
  {
    id: 'founder_liar', category: 'founder', name: 'A Very Convincing Liar', emoji: '🎭',
    desc: 'He said the land was promised to him by a talking eagle. Nobody checked.',
    effect: { stats: { gold: 4, faith: 3, joy: -1 } },
  },
  {
    id: 'founder_chef', category: 'founder', name: 'A Chef', emoji: '🍲',
    desc: 'The founding pot of soup has never been allowed to stop simmering.',
    effect: { stats: { food: 5, joy: 2, mil: -1 } },
  },
  {
    id: 'founder_wizard', category: 'founder', name: 'A Guy Who Said He Was a Wizard', emoji: '🧙',
    desc: 'He had a hat, a stick and incredible confidence. Two out of three still work.',
    effect: { stats: { weird: 4, sci: 2, faith: -1 } },
  },
  {
    id: 'founder_committee', category: 'founder', name: 'A Committee', emoji: '🪑',
    desc: 'Founded after a 40-day meeting. The minutes are the holiest text.',
    effect: { stats: { sci: 2, joy: -2 }, flags: { bureaucracy: 1 } },
  },
  {
    id: 'founder_probe', category: 'founder', name: 'A Metal Man From the Sky', emoji: '🤖',
    desc: 'He fell from the stars, beeped wisely, and taught agriculture with a laser.',
    effect: { stats: { sci: 4, weird: 2 }, flags: { robots: 1 }, threat: 2 },
  },
  {
    id: 'founder_nobody', category: 'founder', name: 'Nobody Remembers', emoji: '❓',
    desc: 'There was a founder. Everyone agrees on that. Everything else is disputed.',
    effect: { stats: { weird: 3, faith: 2, gold: 2 } },
  },
  {
    id: 'founder_cat', category: 'founder', name: 'A Very Confident Cat', emoji: '🐈',
    desc: 'She did not found anything. She sat in a spot, and the city grew around it out of respect.',
    effect: { stats: { joy: 3, faith: 2, food: -1 } }, unlock: 'cats_win',
  },
];

export const origins: OriginDef[] = [...lands, ...beliefs, ...customs, ...founders];
