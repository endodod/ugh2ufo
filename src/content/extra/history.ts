// Parody history events, one or more per era.
import type { CardDef } from '../../types';

export const historyCards: CardDef[] = [
  {
    id: 'x_h_fire', kind: 'history', title: 'Fire, Discovered', emoji: '🔥', era: [0, 0], once: true,
    text: 'Grug rubbed two sticks together for six hours out of boredom. Now there is fire, and Grug has no eyebrows.',
    choices: [
      { label: 'Cook everything', effect: { stats: { food: 5, pop: 2 } } },
      { label: 'Worship it', effect: { stats: { faith: 5, weird: 1 } } },
      { label: "Put it out, it's rude", effect: { stats: { joy: -3, mil: 1 }, text: 'Grug sulks. Grug will try again.' } },
    ],
  },
  {
    id: 'x_h_wheel', kind: 'history', title: 'The Wheel', emoji: '🛞', era: [0, 1], once: true,
    text: 'Someone invented the wheel. A committee of elders recommends making it square, for stability.',
    choices: [
      { label: 'Round it is', effect: { stats: { sci: 4, gold: 2 } } },
      { label: 'Square, per committee', effect: { stats: { joy: -3, weird: 2 }, flags: { bureaucracy: 1 }, text: 'Carts now go thunk-thunk-thunk. Progress.' } },
    ],
  },
  {
    id: 'x_h_cave', kind: 'history', title: 'Cave Paintings', emoji: '🖌️', era: [0, 1], once: true,
    text: 'Artists painted the cave walls with hunting scenes. Critics say the mammoths are derivative.',
    choices: [
      { label: 'Fund the arts', effect: { stats: { joy: 5, food: -2 } } },
      { label: 'Paint instructions instead', effect: { stats: { sci: 4 }, text: 'Step 1: spear. Step 2: run.' } },
    ],
  },
  {
    id: 'x_h_farming', kind: 'history', title: 'Agriculture', emoji: '🌾', era: [0, 1], once: true,
    text: 'A woman noticed that seeds grow into plants. The hunters are furious they did not notice first.',
    choices: [
      { label: 'Settle down and farm', effect: { stats: { food: 8, pop: 3, joy: -2 } } },
      { label: 'Stay nomadic, it is a lifestyle', effect: { stats: { mil: 3, joy: 2 } } },
    ],
  },
  {
    id: 'x_h_beer', kind: 'history', title: 'Grain, Forgotten', emoji: '🍺', era: [0, 1], once: true,
    text: "Grain left in the rain fermented. Civilization's priorities have suddenly clarified.",
    choices: [
      { label: 'Brew more', effect: { stats: { joy: 6, food: -3 }, flags: { party: 1 } } },
      { label: 'Pour it out', effect: { stats: { faith: 3, joy: -4 } } },
    ],
  },
  {
    id: 'x_h_pyramid', kind: 'history', title: 'The Pointy Tomb', emoji: '🔺', era: [1, 2], once: true,
    text: '{leader} wants a tomb shaped like a triangle, visible from space. Nobody knows what space is yet.',
    choices: [
      { label: 'Build it', effect: { stats: { gold: -8 } }, check: {
        base: 0.35, stats: { sci: 0.01 }, flags: { engineers: 0.12, logistics: 0.08, custom_big: 0.2, heads: 0.08 },
        success: { text: 'It is enormous and pointy. Something up there takes a photo.', effect: { stats: { faith: 7, weird: 2 }, alienRel: 3 } },
        fail: { text: 'It came out slightly lopsided. Tourists call it "the Leaning One".', effect: { stats: { faith: 3, joy: -2, weird: 3 } } },
      } },
      { label: 'Build a flat one', effect: { stats: { gold: -2, faith: 2, joy: -2 } } },
    ],
  },
  {
    id: 'x_h_writing', kind: 'history', title: 'Writing', emoji: '✍️', era: [1, 1], once: true,
    text: 'Scribes have invented writing. The first recorded document is a complaint about copper quality.',
    choices: [
      { label: 'Train more scribes', effect: { stats: { sci: 5, gold: -2 }, flags: { bureaucracy: 1 } } },
      { label: 'Writing is for nerds', effect: { stats: { mil: 3, sci: -1 } } },
    ],
  },
  {
    id: 'x_h_laws', kind: 'history', title: 'The Law Stone', emoji: '🪧', era: [1, 2], once: true,
    text: "{leader} carved 282 laws onto a stone pillar. Law 283 just says 'and don't be weird'.",
    choices: [
      { label: 'Enforce all 283', effect: { stats: { mil: 2, joy: -3, weird: -3 }, flags: { bureaucracy: 1 } } },
      { label: 'Enforce only the fun ones', effect: { stats: { joy: 4, weird: 2 } } },
    ],
  },
  {
    id: 'x_h_seapeople', kind: 'history', title: 'The Boat People', emoji: '🚣', era: [1, 2], once: true,
    text: "Mysterious raiders are wrecking trade routes. Nobody knows who they are. They mostly just yell 'boat'.",
    choices: [
      { label: 'Hire them', effect: { stats: { mil: 5, gold: -4 } } },
      { label: 'Move inland', effect: { stats: { food: -3, joy: -2, pop: 2 } } },
      {
        label: 'Yell boat back',
        check: {
          base: 0.35, flags: { custom_shout: 0.3, navy: 0.1, grudge: 0.06 },
          success: { text: 'They are confused and leave.', effect: { stats: { joy: 4 } } },
          fail: { text: 'They consider it a challenge.', effect: { stats: { mil: -3, gold: -3 } } },
        },
      },
    ],
  },
  {
    id: 'x_h_horse', kind: 'history', title: 'A Wooden Horse', emoji: '🐴', era: [1, 2], once: true,
    text: "A giant wooden horse was left outside the gates with a card reading 'Definitely Not Soldiers'.",
    choices: [
      {
        label: 'Bring it in',
        check: {
          base: 0.4, flags: { spies: 0.15, founder_goat: 0.1, custom_secret: 0.1 },
          success: { text: 'It is just a lovely horse. The soldiers are in the second horse, which was never delivered.', effect: { stats: { joy: 6, weird: 2 } } },
          fail: { text: 'Soldiers. Absolutely soldiers.', effect: { stats: { mil: -5, pop: -2 } } },
        },
      },
      { label: 'Burn it', effect: { stats: { mil: 2, joy: -2 } } },
      { label: 'Send back a wooden cow', effect: { stats: { mil: 3, weird: 2 }, text: 'An arms race in hollow livestock begins.', chain: { id: 'ch_f_woodencow', delay: 2 } } },
    ],
  },
  {
    id: 'x_h_games', kind: 'history', title: 'The First Games', emoji: '🏅', era: [2, 2], once: true,
    text: 'Athletes compete naked for olive wreaths. Ticket sales are unexpectedly high.',
    choices: [
      { label: 'Hold the games', effect: { stats: { joy: 8, gold: -3 }, flags: { party: 1 } } },
      { label: 'Mandate pants', effect: { stats: { faith: 3, joy: -3 } } },
    ],
  },
  {
    id: 'x_h_library', kind: 'history', title: 'The Great Library', emoji: '🏛️', era: [2, 3], once: true,
    text: 'Your library holds every scroll in existence. The fire marshal has concerns about all the candles.',
    choices: [
      { label: 'Install a sand bucket', effect: { stats: { gold: -2, sci: 6 } } },
      {
        label: 'Ignore the marshal',
        outcomes: [
          { weight: 1, text: 'Nothing happens. The marshal is annoyed.', effect: { stats: { sci: 8 } } },
          { weight: 1, text: 'It burns. Only the tax records survive. They always survive.', effect: { stats: { sci: -5, joy: -4 }, flags: { bureaucracy: 1 } } },
        ],
      },
    ],
  },
  {
    id: 'x_h_socrates', kind: 'history', title: 'The Annoying Philosopher', emoji: '🧔', era: [2, 2], once: true,
    text: 'A barefoot man in the market keeps asking people questions until they cry.',
    choices: [
      { label: 'Make him drink hemlock', effect: { stats: { joy: 2, sci: -2, faith: 2 } } },
      { label: 'Give him a school', effect: { stats: { sci: 6, joy: -3 }, text: 'Now there are forty of them.' } },
    ],
  },
  {
    id: 'x_h_roads', kind: 'history', title: 'All Roads', emoji: '🛣️', era: [2, 3], once: true,
    text: 'Engineers built roads that lead to the capital. Unfortunately they also lead out of it.',
    choices: [
      { label: 'Pave everything', effect: { stats: { gold: -4, mil: 3, pop: 3 } } },
      { label: 'One-way roads only', effect: { stats: { pop: 2, weird: 2 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_h_eureka', kind: 'history', title: 'Eureka', emoji: '🛁', era: [2, 2], once: true,
    text: 'A scientist ran naked through the streets after a bath epiphany. The epiphany was about displacement. The streets were about decency.',
    choices: [
      { label: 'Fund his research', effect: { stats: { sci: 6, gold: -3 } } },
      { label: 'Fund more baths', effect: { stats: { joy: 5, food: -2 } } },
    ],
  },
  {
    id: 'x_h_ides', kind: 'history', title: 'A Senate Meeting', emoji: '🗡️', era: [2, 3], once: true,
    text: "The senators invite {leader} to a meeting in mid-March. The agenda just says 'stabbing, various'.",
    choices: [
      {
        label: 'Attend',
        check: {
          base: 0.4, flags: { spies: 0.15, custom_late: 0.3, propaganda: 0.06 }, gov: { empire: -0.1, republic: 0.1 },
          success: { text: 'It was a cutlery seminar. Very informative.', effect: { stats: { gold: 3, joy: 2 } } },
          fail: { text: 'It was not a cutlery seminar. A new leader is found by lunch.', effect: { stats: { joy: -5, mil: 3 } } },
        },
      },
      { label: 'Cancel March', effect: { stats: { joy: -2 }, flags: { bureaucracy: 1 }, text: 'The calendar now has eleven months. Nobody minds.' } },
    ],
  },
  {
    id: 'x_h_plague', kind: 'history', title: 'The Plague', emoji: '🐀', era: [3, 3], once: true,
    text: 'Rats are spreading a terrible disease. Doctors recommend beaked masks, which do nothing but look incredible.',
    choices: [
      { label: 'Buy beaked masks', effect: { stats: { gold: -4, joy: 3 } }, check: {
        base: 0.2, stats: { sci: 0.006 }, flags: { medicine: 0.15, cats: 0.08, custom_food: 0.08 },
        success: { text: 'The masks are stuffed with the right herbs by pure accident. The plague moves on.', effect: { stats: { pop: -1 } } },
        fail: { text: 'The masks look incredible. That is all they do.', effect: { stats: { pop: -4 }, flags: { plague: 1 } } },
      } },
      { label: 'Get cats', effect: { stats: { pop: -1 }, flags: { cats: 1 }, text: 'The cats accept the job and none of the gratitude.' } },
      { label: 'Pray', effect: { stats: { faith: 5, pop: -4 } } },
    ],
  },
  {
    id: 'x_h_crusade', kind: 'history', title: 'The Holy Errand', emoji: '🛡️', era: [3, 3], once: true,
    text: 'Knights want to march three thousand miles to reclaim a relic that may be a regular cup.',
    choices: [
      {
        label: 'March',
        effect: { stats: { mil: -3 } },
        check: {
          base: 0.3, stats: { faith: 0.005 }, flags: { logistics: 0.15, medicine: 0.06, cult: 0.05 },
          success: { text: 'They return with the cup, three spices and a new word for "sorry".', effect: { stats: { faith: 6, gold: 5 } } },
          fail: { text: 'They return with a different cup. Nobody can tell.', effect: { stats: { faith: 4, mil: -1, weird: 2 } } },
        },
      },
      { label: 'Write a letter instead', effect: { stats: { faith: 2 }, flags: { bureaucracy: 1 }, chain: { id: 'ch_f_crusadeletter', delay: 3 } } },
    ],
  },
  {
    id: 'x_h_charter', kind: 'history', title: 'The Big Charter', emoji: '📃', era: [3, 4], once: true,
    text: 'The barons demand that {leader} sign a document limiting royal power. The pen is suspiciously heavy.',
    choices: [
      { label: 'Sign it', effect: { stats: { joy: 6, gold: -3 } } },
      { label: 'Sign it in disappearing ink', effect: { stats: { mil: 2, joy: -2, weird: 3 } } },
    ],
  },
  {
    id: 'x_h_castles', kind: 'history', title: 'Castle Boom', emoji: '🏰', era: [3, 3], once: true,
    text: 'Every lord wants a castle. The masons guild has never been richer or smugger.',
    choices: [
      { label: 'Build castles', effect: { stats: { mil: 6, gold: -5 } } },
      { label: 'Build bouncy castles', effect: { stats: { joy: 8, mil: -2 }, flags: { party: 1 } } },
    ],
  },
  {
    id: 'x_h_longboats', kind: 'history', title: 'Longboat Tourists', emoji: '🛶', era: [3, 3], once: true,
    text: "Bearded visitors arrive by longboat, ask for 'everything', and leave no reviews.",
    choices: [
      { label: 'Hire them as bouncers', effect: { stats: { mil: 4, gold: -3 } } },
      {
        label: 'Challenge them to a drinking contest',
        outcomes: [
          { weight: 1, text: 'We win. They leave in shame and settle somewhere colder.', effect: { stats: { joy: 6 } } },
          { weight: 2, text: 'We lose. They take the monastery. And the drinks.', effect: { stats: { gold: -5, faith: -3 } } },
        ],
      },
    ],
  },
  {
    id: 'x_h_snails', kind: 'history', title: 'Marginalia', emoji: '🐌', era: [3, 3], once: true,
    text: 'Monks copying holy texts have filled the margins with knights fighting snails. They refuse to explain.',
    choices: [
      { label: 'Investigate the snails', effect: { stats: { sci: 3, weird: 3 } } },
      { label: 'Canonize the snail', effect: { stats: { faith: 5, weird: 3 } } },
    ],
  },
  {
    id: 'x_h_press', kind: 'history', title: 'The Printing Press', emoji: '🖨️', era: [4, 4], once: true,
    text: "Movable type lets anyone print anything. The first run is ten thousand pamphlets about {leader}'s haircut.",
    choices: [
      { label: 'Free press', effect: { stats: { sci: 6, joy: 2, faith: -2 } } },
      { label: 'Licensed printing only', effect: { stats: { gold: 4, joy: -3 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_h_tulips', kind: 'history', title: 'Tulip Mania', emoji: '🌷', era: [4, 4], once: true,
    text: 'A single tulip bulb now costs more than a house. Someone traded a house for one and then ate it.',
    choices: [
      {
        label: 'Invest the treasury',
        outcomes: [
          { weight: 1, text: 'Sold at the peak. {leader} is hailed as a genius of flowers.', effect: { stats: { gold: 15 } } },
          { weight: 2, text: 'The market wilts. The treasury is now a very pretty garden.', effect: { stats: { gold: -10, joy: 3 } } },
        ],
      },
      { label: 'Plant them for fun', effect: { stats: { joy: 5, gold: -2 } } },
    ],
  },
  {
    id: 'x_h_newworld', kind: 'history', title: 'Wrong Continent', emoji: '🧭', era: [4, 4], once: true,
    text: 'Your explorer sailed west looking for spices and found an entirely different continent. He insists it is still the spice place.',
    choices: [
      { label: 'Fund more voyages', effect: { stats: { gold: -5 } }, check: {
        base: 0.3, flags: { navy: 0.12, logistics: 0.08, founder_explorer: 0.2, land_coast: 0.1 },
        success: { text: 'The ships come back full of potatoes and settlers who refuse to stop talking about it.', effect: { stats: { food: 7, pop: 4, gold: 3 } } },
        fail: { text: 'The fleet discovered the same continent again, from the other side.', effect: { stats: { food: 2, joy: -2 } } },
      } },
      { label: 'Correct his map', effect: { stats: { sci: 5, joy: -1 } } },
    ],
  },
  {
    id: 'x_h_helio', kind: 'history', title: 'The Sun Is in the Middle', emoji: '☀️', era: [4, 4], once: true,
    text: 'An astronomer claims the earth goes around the sun. The sun has not commented.',
    choices: [
      { label: 'Agree with him', effect: { stats: { sci: 6, faith: -4 } } },
      { label: 'House arrest', effect: { stats: { faith: 4, sci: -3 }, text: 'He keeps muttering about it anyway.' } },
    ],
  },
  {
    id: 'x_h_ceiling', kind: 'history', title: 'The Ceiling Job', emoji: '🎨', era: [4, 4], once: true,
    text: 'An artist spent four years painting a ceiling. Everyone has neck pain, but agrees it was worth it.',
    choices: [
      { label: 'Pay him', effect: { stats: { gold: -5, joy: 5, faith: 3 } } },
      { label: 'Ask him to do the floor next', effect: { stats: { joy: 3, weird: 2 } } },
    ],
  },
  {
    id: 'x_h_theses', kind: 'history', title: 'Ninety-Five Complaints', emoji: '🚪', era: [4, 4], once: true,
    text: "A monk nailed ninety-five complaints to a church door. The door's owner wants to know who pays for the holes.",
    choices: [
      { label: 'Reform the church', effect: { stats: { faith: -2, sci: 4, joy: 3 } } },
      { label: 'Fine him for the door', effect: { stats: { gold: 3, faith: 3 } } },
    ],
  },
  {
    id: 'x_h_warship', kind: 'history', title: 'The Top-Heavy Warship', emoji: '⚓', era: [4, 5], once: true,
    text: 'Your mightiest warship sank thirteen hundred meters into its maiden voyage, mostly from embarrassment.',
    choices: [
      { label: 'Raise it as a museum', effect: { stats: { joy: 4, gold: -3, sci: 2 } } },
      { label: 'Build two more exactly the same', effect: { stats: { mil: 6, gold: -8, weird: 2 } } },
    ],
  },
  {
    id: 'x_h_steam', kind: 'history', title: 'The Steam Engine', emoji: '🚂', era: [5, 5], once: true,
    text: 'A kettle has been scaled up to the size of a barn. It pulls things. It also screams.',
    choices: [
      { label: 'Industrialize', effect: { stats: { gold: 8, sci: 3, joy: -4 } } },
      { label: 'Make it a fairground ride', effect: { stats: { joy: 6 }, flags: { party: 1 } } },
    ],
  },
  {
    id: 'x_h_looms', kind: 'history', title: 'Loom Smashers', emoji: '🔨', era: [5, 5], once: true,
    text: 'Weavers are smashing the new mechanical looms. The looms have not fought back. Yet.',
    choices: [
      { label: 'Side with the weavers', effect: { stats: { joy: 5, gold: -4 } } },
      { label: 'Side with the looms', effect: { stats: { gold: 6, joy: -3 }, flags: { robots: 1 } } },
    ],
  },
  {
    id: 'x_h_worldfair', kind: 'history', title: "World's Fair", emoji: '🎡', era: [5, 6], once: true,
    text: 'Every nation brings its newest marvel. Yours is still in crates, and one crate is ticking.',
    choices: [
      { label: 'Build an iron tower', effect: { stats: { gold: -6, joy: 6 }, alienRel: 2 } },
      {
        label: 'Open the ticking crate',
        outcomes: [
          { weight: 1, text: 'It is a clock that tells you how you feel. It wins gold.', effect: { stats: { sci: 6, joy: 4 } } },
          { weight: 1, text: 'It is a very small, very angry engine. It wins the crowd, and a pavilion.', effect: { stats: { mil: 4, weird: 3, gold: -3 } } },
        ],
      },
    ],
  },
  {
    id: 'x_h_rail', kind: 'history', title: 'Railway Mania', emoji: '🛤️', era: [5, 5], once: true,
    text: 'Railways in every direction. One line goes in a perfect circle and is very popular with investors.',
    choices: [
      { label: 'Lay real track', effect: { stats: { gold: -6, pop: 4, food: 4 } } },
      { label: 'Sell shares in the circle line', effect: { stats: { gold: 8, joy: -2, weird: 3 } } },
    ],
  },
  {
    id: 'x_h_telegraph', kind: 'history', title: 'The Telegraph', emoji: '📠', era: [5, 5], once: true,
    text: "Messages now travel at the speed of electricity. The first one sent reads 'IS THIS WORKING STOP'.",
    choices: [
      { label: 'Wire the nation', effect: { stats: { sci: 6, gold: -4 } } },
      { label: 'Wire only the ministries', effect: { stats: { gold: 2 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_h_goldrush', kind: 'history', title: 'Gold Rush', emoji: '⛏️', era: [5, 5], once: true,
    text: 'Someone found gold in a river. Half the population moved to the river. The river is crowded and upset.',
    choices: [
      { label: 'Join the rush', effect: { stats: { gold: 10, food: -4, pop: -2 } } },
      { label: 'Sell shovels', effect: { stats: { gold: 7 } } },
    ],
  },
  {
    id: 'x_h_atom', kind: 'history', title: 'Splitting the Atom', emoji: '⚛️', era: [6, 6], once: true,
    text: 'Scientists split the atom. They are now trying to put it back together. It will not go.',
    choices: [
      { label: 'Build power plants', effect: { stats: { gold: 8, sci: 5 } } },
      { label: 'Build bombs', effect: { stats: { mil: 12, joy: -4 }, threat: -1, alienRel: -3 } },
    ],
  },
  {
    id: 'x_h_coldwar', kind: 'history', title: 'The Cold Standoff', emoji: '🧊', era: [6, 6], once: true,
    text: 'A great standoff in which nobody fires and everybody builds. The bunker industry has never been better.',
    choices: [
      { label: 'Build more bombs', effect: { stats: { mil: 10, joy: -5 } } },
      { label: 'Build more bunkers', effect: { stats: { mil: 4, gold: -4 }, flags: { hole: 1 } } },
      { label: 'Build more jazz', effect: { stats: { joy: 7, gold: -2 }, flags: { party: 1 } } },
    ],
  },
  {
    id: 'x_h_moon', kind: 'history', title: 'Moon Landing', emoji: '🌕', era: [6, 7], once: true,
    text: 'Your astronauts landed on the moon. The footage is so good that half the nation insists it was faked in a studio.',
    choices: [
      { label: 'Plant the flag', effect: { stats: { sci: 6, joy: 8, gold: -8 }, threat: 2, alienRel: -2, text: 'Somebody on the far side of the moon takes note.', chain: { id: 'ch_f_flag', delay: 3 } } },
      { label: 'Leave a polite note', effect: { stats: { sci: 4, gold: -8 }, alienRel: 5, chain: { id: 'ch_f_note', delay: 3 } } },
    ],
  },
  {
    id: 'x_h_tv', kind: 'history', title: 'Television', emoji: '📺', era: [6, 6], once: true,
    text: 'A box that shows moving pictures. Families gather around it in total silence. Dinner conversation is extinct.',
    choices: [
      { label: 'A set in every home', effect: { stats: { joy: 8, sci: -3 } } },
      { label: 'Educational channels only', effect: { stats: { sci: 5, joy: -2 } } },
    ],
  },
  {
    id: 'x_h_hips', kind: 'history', title: 'The Hips', emoji: '🎸', era: [6, 6], once: true,
    text: 'A young man moved his hips on television. The elderly are fainting in shifts.',
    choices: [
      { label: 'Let him move', effect: { stats: { joy: 8, faith: -3 }, flags: { party: 1 } } },
      { label: 'Film him from the waist up', effect: { stats: { faith: 3, joy: -2 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_h_spacedog', kind: 'history', title: 'Space Dog', emoji: '🐶', era: [6, 6], once: true,
    text: 'You sent a dog into orbit. It barked at the moon the whole way up. Something barked back.',
    choices: [
      { label: 'Send more animals', effect: { stats: { sci: 5, weird: 3 }, alienRel: 2, chain: { id: 'ch_f_zoo', delay: 2 } } },
      { label: 'Send a cat', req: { flags: { cats: 1 } }, effect: { stats: { sci: 3, weird: 3 }, flags: { cats: 1 }, text: 'The cat returns unimpressed. It has seen orbit and finds it overrated.', chain: { id: 'ch_f_spacecat', delay: 2 } } },
      { label: 'Never speak of it', effect: { stats: { mil: 2 }, threat: 1 } },
    ],
  },
  {
    id: 'x_h_y2k', kind: 'history', title: 'The Millennium Bug', emoji: '🐛', era: [7, 7], once: true,
    text: 'Experts warn every computer will think it is year 1900 at midnight. Some citizens are hoping for it.',
    choices: [
      { label: 'Patch everything', effect: { stats: { gold: -6, sci: 4 } } },
      {
        label: 'Do nothing and party',
        outcomes: [
          { weight: 3, text: 'Midnight passes. One microwave in a village now speaks Latin.', effect: { stats: { joy: 6, weird: 2 }, flags: { party: 1 } } },
          { weight: 1, text: 'The banks reset to 1900. Everyone is owed a horse.', effect: { stats: { gold: -8, weird: 5 } } },
        ],
      },
    ],
  },
  {
    id: 'x_h_internet', kind: 'history', title: 'The Internet', emoji: '🌐', era: [7, 7], once: true,
    text: 'A network linking every computer was switched on. Within an hour, ninety percent of the traffic was animal pictures.',
    choices: [
      { label: 'Connect everyone', effect: { stats: { sci: 8, joy: 5, gold: -5 } } },
      { label: 'Internet for officials only', effect: { stats: { sci: 4, joy: -3 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_h_dotcom', kind: 'history', title: 'The Vowel Bubble', emoji: '🫧', era: [7, 7], once: true,
    text: 'Companies are now valued by how many vowels they have removed from their names. Strtp stocks soar.',
    choices: [
      {
        label: 'Invest heavily',
        outcomes: [
          { weight: 1, text: 'Cashed out in time. You own a yacht named Ycht.', effect: { stats: { gold: 14 } } },
          { weight: 2, text: 'The bubble pops. The vowels return, but the money does not.', effect: { stats: { gold: -9, joy: -3 } } },
        ],
      },
      { label: 'Stay boring', effect: { stats: { gold: 3 } } },
    ],
  },
  {
    id: 'x_h_social', kind: 'history', title: 'Social Media', emoji: '📱', era: [7, 7], once: true,
    text: 'Every citizen can now broadcast every opinion instantly to everyone. It was a mistake, but a profitable one.',
    choices: [
      { label: 'Embrace it', effect: { stats: { gold: 8, joy: -4, weird: 3 } } },
      { label: 'Regulate it', effect: { stats: { gold: -3, joy: 2 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_h_coin', kind: 'history', title: 'Rock Coin', emoji: '🪙', era: [7, 8], once: true,
    text: 'An anonymous founder launched a currency backed by nothing. It is worth billions and zero at the same time.',
    choices: [
      {
        label: 'Make it legal tender',
        outcomes: [
          { weight: 1, text: 'It moons. The treasury is briefly the richest thing in the galaxy.', effect: { stats: { gold: 18, weird: 3 } } },
          { weight: 1, text: 'The founder turns out to be a goat. The goat has sold everything.', effect: { stats: { gold: -10, joy: -4, weird: 5 } } },
        ],
      },
      { label: 'Ban it', effect: { stats: { joy: -2 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_h_slab', kind: 'history', title: 'The Glass Slab', emoji: '📲', era: [7, 7], once: true,
    text: 'A glass slab that does everything. Pedestrians now walk into fountains at record rates.',
    choices: [
      { label: 'Slabs for everyone', effect: { stats: { sci: 6, joy: 4, pop: -1 } } },
      { label: 'Slab-free Sundays', effect: { stats: { faith: 3, joy: 2 } } },
    ],
  },
  {
    id: 'x_h_influencer', kind: 'history', title: 'The Snack Reviewers', emoji: '🤳', era: [7, 8], once: true,
    text: 'Teenagers who review snacks online have become the most powerful political force in history.',
    choices: [
      { label: 'Give them ministries', effect: { stats: { joy: 6, sci: -4 }, flags: { party: 1 } } },
      { label: 'Send them a free sample', effect: { stats: { gold: -2, joy: 3 } } },
    ],
  },
  {
    id: 'x_h_oracle', kind: 'history', title: 'The Confident Machine', emoji: '💬', era: [7, 8], once: true,
    text: 'A machine now answers any question instantly and confidently. Accuracy is a premium feature.',
    choices: [
      { label: 'Trust it with everything', effect: { stats: { sci: 5, weird: 3 }, flags: { robots: 1 } } },
      { label: 'Double-check everything', effect: { stats: { sci: 3 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_h_mars', kind: 'history', title: 'Mars Colony', emoji: '🔴', era: [8, 8], once: true,
    text: 'The first Mars colony is founded. Within a week it declares independence and a dress code.',
    choices: [
      { label: 'Let them be', effect: { stats: { sci: 5, pop: -3, joy: 3 } } },
      { label: 'Send a stern letter', effect: { stats: { mil: 3 }, flags: { bureaucracy: 1 }, chain: { id: 'ch_f_mars', delay: 2 } } },
    ],
  },
  {
    id: 'x_h_rockets', kind: 'history', title: 'Billionaire Rockets', emoji: '🚀', era: [7, 8], once: true,
    text: 'Three billionaires are racing to space in rockets of increasingly suggestive shapes.',
    choices: [
      { label: 'Tax them', effect: { stats: { gold: 12, joy: 4 } } },
      { label: 'Let them race', effect: { stats: { sci: 6, weird: 3 }, threat: 1, chain: { id: 'ch_f_billionaires', delay: 2 } } },
    ],
  },
];
