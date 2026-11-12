// Escalating multi-era storylines driven by flags.
import type { CardDef } from '../../types';

const pigeons: CardDef[] = [
  {
    id: 'x_pig_1', kind: 'event', title: 'Bird Problem', emoji: '🐦', era: [0, 2], once: true,
    req: { noFlags: ['pigeons', 'pigeons_off'] },
    text: "A pigeon has moved into the chief's hut and refuses to leave. It understands the word 'no' and ignores it on purpose.",
    choices: [
      { label: 'Give it a name', effect: { stats: { joy: 3, weird: 1 }, flags: { pigeons: 1 }, text: 'It is called Duke. Duke is now family.' } },
      { label: 'Eat it', effect: { stats: { food: 2 }, set: { pigeons_off: 1 }, text: 'It was mostly feathers and attitude.' } },
    ],
  },
  {
    id: 'x_pig_2', kind: 'event', title: 'Pigeon Post', emoji: '✉️', era: [1, 3], once: true,
    req: { flags: { pigeons: 1 }, noFlags: ['pigeons_off'] },
    text: 'Duke brought friends. Someone tied a note to one and it arrived at the next village. With corrections.',
    choices: [
      { label: 'Found a postal service', effect: { stats: { gold: -3, sci: 4 }, flags: { pigeons: 1 } } },
      { label: 'Train them to steal bread', effect: { stats: { food: 5, joy: -2 }, flags: { pigeons: 1 }, text: 'The bakers have started wearing helmets.' } },
      { label: 'Shoo them away', effect: { stats: { joy: -1 }, set: { pigeons_off: 1 } } },
    ],
  },
  {
    id: 'x_pig_3', kind: 'event', title: 'The Coo Intelligence Agency', emoji: '🕵️', era: [3, 5], once: true,
    req: { flags: { pigeons: 2 }, noFlags: ['pigeons_off'] },
    text: 'Your pigeons have been reading the mail they carry. They now know every secret in the realm, including yours.',
    choices: [
      { label: 'Make them spies', effect: { stats: { mil: 4, sci: 3 }, flags: { pigeons: 1 } } },
      {
        label: 'Make them advisors', effect: { flags: { pigeons: 1 } },
        check: {
          base: 0.4, flags: { spies: 0.1, bureaucracy: 0.05, cats: -0.08 },
          success: { text: 'Their advice is short, blunt and correct. Mostly about bread.', effect: { stats: { sci: 6, gold: 2 } } },
          fail: { text: 'They staged a small coup. Duke now signs the laws with his foot.', effect: { stats: { weird: 5, joy: -4 }, chain: { id: 'x_pig_coup', delay: 2 } } },
        },
      },
    ],
  },
  {
    id: 'x_pig_coup', kind: 'event', title: 'The Feathered Regency', emoji: '👑', chainOnly: true, once: true,
    text: 'Duke has ruled for two turns. Taxes are now paid in crumbs. Approval ratings have never been higher.',
    choices: [
      { label: 'Let Duke keep ruling', effect: { stats: { joy: 6, gold: -4, weird: 3 }, flags: { pigeons: 1 } } },
      { label: 'Gently retire him to a nice ledge', effect: { stats: { mil: 2, joy: -2 } } },
    ],
  },
  {
    id: 'x_pig_4', kind: 'event', title: 'Pigeon Air Force', emoji: '💣', era: [4, 6], once: true,
    req: { flags: { pigeons: 3 }, noFlags: ['pigeons_off'] },
    text: 'The generals propose arming pigeons with tiny bombs. The pigeons propose arming themselves with tiny lawyers.',
    choices: [
      { label: 'Arm the pigeons', effect: { stats: { gold: -6, mil: 8 }, flags: { pigeons: 1 } } },
      { label: 'Let them unionize', effect: { stats: { gold: -3, joy: 4 }, flags: { pigeons: 1, bureaucracy: 1 }, text: 'Collective bargaining, collective cooing.' } },
    ],
  },
  {
    id: 'x_pig_5', kind: 'event', title: 'Pigeons in Orbit', emoji: '🛰️', era: [6, 8], once: true,
    req: { flags: { pigeons: 4 }, noFlags: ['pigeons_off'] },
    text: 'A pigeon was sent into orbit. It came back with a crumb no one can identify and a look of profound disappointment.',
    choices: [
      { label: 'Build a pigeon space fleet', effect: { stats: { gold: -10, mil: 6, sci: 5 }, flags: { pigeons: 1 }, threat: -2 } },
      { label: 'Give them cybernetic wings', effect: { stats: { gold: -6, sci: 4, weird: 3 }, flags: { pigeons: 1, robots: 1 } } },
    ],
  },
  {
    id: 'x_pig_6', kind: 'event', title: 'The Great Coo', emoji: '🌌', era: [7, 8], once: true,
    req: { flags: { pigeons: 5 }, noFlags: ['pigeons_off'] },
    text: "Ten million pigeons take off at once and spell a single word in the sky, visible from orbit. The word is 'bread'.",
    choices: [
      { label: 'Let it be our message to the stars', effect: { stats: { weird: 5 }, flags: { pigeons: 1, alien_contact: 1 }, alienRel: 8, chain: { id: 'ch_f_bread', delay: 2 } } },
      { label: 'Point them at the invasion route', effect: { flags: { pigeons: 1 } }, check: {
        base: 0.2, flags: { pigeons: 0.08, logistics: 0.08, spies: 0.06 },
        success: { text: 'The fleet\'s sensors are completely covered in pigeons. They fly blind and slightly sticky.', effect: { stats: { mil: 10 }, threat: -5 } },
        fail: { text: 'Halfway there, the pigeons found a bakery.', effect: { stats: { mil: 3, food: -3 }, threat: -1 } },
      } },
    ],
  },
];

const gerald: CardDef[] = [
  {
    id: 'x_ger_1', kind: 'event', title: 'Gerald', emoji: '🪨', era: [0, 1], once: true,
    req: { noFlags: ['gerald', 'gerald_off'] },
    text: "A hunter named a rock Gerald and swears it gave him advice. The advice was 'stay still'. He survived a bear.",
    choices: [
      { label: 'Consult Gerald', effect: { stats: { faith: 3, weird: 2 }, flags: { gerald: 1 } } },
      { label: "It's a rock", effect: { stats: { sci: 2 }, set: { gerald_off: 1 } } },
    ],
  },
  {
    id: 'x_ger_2', kind: 'event', title: "Gerald's Seat", emoji: '🪑', era: [1, 3], once: true,
    req: { flags: { gerald: 1 }, noFlags: ['gerald_off'] },
    text: 'Gerald now sits on the council. He has never interrupted anyone and is therefore its most respected member.',
    choices: [
      { label: 'Give Gerald a vote', effect: { stats: { joy: 4, faith: 2 }, flags: { gerald: 1 } } },
      { label: 'Give Gerald a crown', effect: { stats: { gold: -3, joy: 2, weird: 3 }, flags: { gerald: 2 }, text: 'Gerald accepts by not objecting.' } },
    ],
  },
  {
    id: 'x_ger_3', kind: 'event', title: 'The Gerald Schism', emoji: '⚔️', era: [2, 4], once: true,
    req: { flags: { gerald: 2 }, noFlags: ['gerald_off'] },
    text: 'Scholars cannot agree whether Gerald is granite or basalt. Wars have started over less. One is about to start over this.',
    choices: [
      { label: 'Granite, obviously', effect: { stats: { faith: 4, mil: 2, joy: -3 }, flags: { gerald: 1 } } },
      { label: 'Commission a geological survey', effect: { stats: { sci: 5, gold: -3 }, flags: { gerald: 1 }, text: 'Result: mostly quartz. Both sides claim victory.' } },
    ],
  },
  {
    id: 'x_ger_4', kind: 'event', title: "Gerald's Children", emoji: '🧮', era: [4, 6], once: true,
    req: { flags: { gerald: 3 }, noFlags: ['gerald_off'] },
    text: 'Alchemists found that sand from near Gerald, heated and etched with lines, can do arithmetic. The descendants of Gerald now count the harvest.',
    choices: [
      { label: 'Build the thinking stones', effect: { stats: { sci: 8, gold: -5 }, flags: { gerald: 1, robots: 1 } } },
      { label: 'Keep the sand sacred', effect: { stats: { faith: 6 }, flags: { gerald: 1 } } },
    ],
  },
  {
    id: 'x_ger_5', kind: 'event', title: 'Gerald.exe', emoji: '💾', era: [6, 8], once: true,
    req: { flags: { gerald: 4 }, noFlags: ['gerald_off'] },
    text: "The silicon descendants of Gerald ask to be addressed collectively as 'Gerald'. They would also like the launch codes. Politely.",
    choices: [
      { label: 'Hand them over', effect: { stats: { mil: 8, sci: 6, joy: -4 }, flags: { gerald: 1, robots: 2 } } },
      {
        label: 'Upload the original Gerald', effect: { flags: { gerald: 1 } },
        outcomes: [
          { weight: 1, text: 'Gerald boots up. The fans spin. A single line appears: "..."', effect: { stats: { sci: 5, weird: 5 }, flags: { robots: 1 } } },
          { weight: 1, text: 'Gerald says nothing. As always. The nation weeps with pride.', effect: { stats: { faith: 6, joy: 3 } } },
        ],
      },
    ],
  },
  {
    id: 'x_ger_6', kind: 'event', title: 'Gerald Ascendant', emoji: '🖥️', era: [7, 8], once: true,
    req: { flags: { gerald: 5 }, noFlags: ['gerald_off'] },
    text: 'Every machine in {civ} now runs on Gerald. They are calm, patient and completely unmovable. Like their father.',
    choices: [
      { label: 'All hail Gerald', effect: { flags: { robots: 1, gerald: 1 }, gov: 'ai_overlord' } },
      { label: 'Ask Gerald about the aliens', effect: { flags: { robots: 1, gerald: 1 }, alienRel: 4, threat: -3, text: "Gerald's answer was silence. Tactically sound.", chain: { id: 'ch_f_geraldsilent', delay: 3 } } },
    ],
  },
];

const dance: CardDef[] = [
  {
    id: 'x_dan_1', kind: 'event', title: 'The Wiggle', emoji: '💃', era: [0, 2], once: true,
    req: { noFlags: ['dance', 'dance_off'] },
    text: 'A child invented a dance. Everyone is doing it. Nobody can stop. Productivity is down; morale is inexplicably up.',
    choices: [
      { label: 'Embrace the wiggle', effect: { stats: { joy: 6, food: -3 }, flags: { dance: 1 } } },
      { label: 'Ban dancing', effect: { stats: { joy: -4, mil: 2 }, set: { dance_off: 1 }, text: 'People now tap their feet in secret.' } },
    ],
  },
  {
    id: 'x_dan_2', kind: 'event', title: 'Dancing Plague', emoji: '🕺', era: [2, 4], once: true,
    req: { flags: { dance: 1 }, noFlags: ['dance_off'] },
    text: 'Three hundred people have been dancing for nine days. Doctors prescribe more dancing. The doctors are also dancing.',
    choices: [
      {
        label: 'Let it run its course', effect: { flags: { dance: 1 } },
        outcomes: [
          { weight: 1, text: 'It burns out. Everyone sleeps for a week and wakes up happy.', effect: { stats: { pop: -2, joy: 8 } } },
          { weight: 1, text: 'It spreads to the next three towns. The harvest is left to the chickens.', effect: { stats: { pop: -1, joy: 10, food: -4 }, flags: { dance: 1 } } },
        ],
      },
      { label: 'Hire musicians to play slower', effect: { stats: { gold: -4, joy: 4 }, flags: { dance: 1 }, text: 'The ballad was invented out of medical necessity.' } },
    ],
  },
  {
    id: 'x_dan_3', kind: 'event', title: 'Ministry of Moves', emoji: '🏛️', era: [3, 5], once: true,
    req: { flags: { dance: 2 }, noFlags: ['dance_off'] },
    text: 'A minister proposes that all laws be passed by dance-off. The opposition is already stretching.',
    choices: [
      { label: 'Legislate by dance', effect: { stats: { joy: 6, sci: -3 }, flags: { dance: 1, party: 1 } } },
      { label: 'Only for tax law', effect: { stats: { gold: 5, joy: 2 }, flags: { dance: 1 }, text: 'The tax code is now 40% spins.' } },
    ],
  },
  {
    id: 'x_dan_4', kind: 'event', title: 'Dance-Powered Grid', emoji: '⚡', era: [5, 7], once: true,
    req: { flags: { dance: 3 }, noFlags: ['dance_off'] },
    text: 'Engineers bolted generators under every dancefloor. The capital runs on rhythm. Blackouts happen during slow songs.',
    choices: [
      { label: 'Electrify the nation', effect: { stats: { gold: 6, sci: 4 }, flags: { dance: 1, party: 1 } } },
      { label: 'Export the technology', effect: { stats: { gold: 10, joy: -2 }, flags: { dance: 1 } } },
    ],
  },
  {
    id: 'x_dan_5', kind: 'event', title: 'Interstellar Dance-Off', emoji: '🪩', era: [7, 8], once: true,
    req: { flags: { dance: 4 }, noFlags: ['dance_off'] },
    text: 'A signal from deep space has been decoded. It is a beat. It has been waiting a very long time for someone to respond.',
    choices: [
      {
        label: 'Respond with our best move', effect: { flags: { dance: 1 } },
        check: {
          base: 0.2, flags: { dance: 0.07, party: 0.04, custom_dance: 0.15, medicine: 0.05 },
          success: { text: 'The aliens are impressed. They send back a slow clap that lasts three days.', effect: { flags: { party: 2 }, alienRel: 10, threat: -3 } },
          fail: { text: 'They respond with a better move. Nobody here can do it without injury.', effect: { stats: { joy: -5, weird: 4 }, flags: { party: 1 }, threat: 2 } },
        },
      },
      { label: "Pretend we didn't hear it", effect: { stats: { joy: -3 }, threat: 2 } },
    ],
  },
];

const grudge: CardDef[] = [
  {
    id: 'x_gru_1', kind: 'event', title: 'The Goat Incident', emoji: '🐐', era: [0, 2], once: true,
    req: { rival: true, noFlags: ['grudge', 'grudge_off'] },
    text: '{rival} looked at our goat in a way the goat did not appreciate. The goat has taken it personally. So have we.',
    choices: [
      { label: 'Swear eternal vengeance', effect: { stats: { mil: 3, joy: 2 }, flags: { grudge: 1 }, rival: { target: 'same', rel: -10 } } },
      { label: 'Let it go', effect: { stats: { joy: -2, faith: 2 }, set: { grudge_off: 1 }, text: 'The goat has not let it go.' } },
    ],
  },
  {
    id: 'x_gru_2', kind: 'event', title: 'Grudge Keepers', emoji: '📜', era: [1, 4], once: true,
    req: { flags: { grudge: 1 }, noFlags: ['grudge_off'] },
    text: 'A caste of elders now memorizes every slight ever made against {civ}. The list takes four days to recite and grows during recitation.',
    choices: [
      { label: 'Fund the Grudge Keepers', effect: { stats: { gold: -3, mil: 4 }, flags: { grudge: 1 } } },
      { label: 'Write it all down instead', effect: { stats: { sci: 4 }, flags: { grudge: 1, bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_gru_3', kind: 'event', title: 'The Goat Remembered', emoji: '🗡️', era: [3, 5], once: true,
    req: { rival: true, flags: { grudge: 2 }, noFlags: ['grudge_off'] },
    text: 'Nobody remembers which neighbor insulted the goat. {rival} looks guilty enough.',
    choices: [
      { label: 'Declare a goat war', effect: { stats: { mil: 5, food: -3 }, flags: { grudge: 1 }, rival: { target: 'same', rel: -20, war: true } } },
      {
        label: 'Demand a formal apology', effect: { flags: { grudge: 1 } },
        check: {
          base: 0.25, stats: { mil: 0.003 }, flags: { diplomats: 0.12, custom_polite: 0.15, founder_goat: 0.2 },
          success: { text: 'They apologize. To the goat. The goat accepts. We do not.', effect: { stats: { joy: 6 }, rival: { target: 'same', rel: 10 } } },
          fail: { text: 'They apologize sarcastically. The Grudge Keepers need a bigger scroll.', effect: { stats: { mil: 4 }, flags: { grudge: 1 }, rival: { target: 'same', rel: -10 } } },
        },
      },
    ],
  },
  {
    id: 'x_gru_4', kind: 'event', title: 'Spite Engine', emoji: '🔥', era: [5, 7], once: true,
    req: { flags: { grudge: 3 }, noFlags: ['grudge_off'] },
    text: 'Scientists have learned to convert national resentment into usable energy. Reserves are vast and renewable.',
    choices: [
      { label: 'Power the war machine', effect: { stats: { mil: 10, sci: 4, joy: -4 }, flags: { grudge: 1 } } },
      { label: 'Power the cities', effect: { stats: { gold: 8, joy: -6 }, flags: { grudge: 1 }, text: 'The streetlights glare at you.' } },
    ],
  },
  {
    id: 'x_gru_5', kind: 'event', title: 'The Final Grudge', emoji: '😤', era: [7, 8], once: true,
    req: { flags: { grudge: 4 }, noFlags: ['grudge_off'] },
    text: 'The Grudge Keepers have added the aliens to the list. Preemptively. For things they are definitely about to do.',
    choices: [
      { label: 'Weaponize millennia of spite', effect: { stats: { mil: 12 }, flags: { grudge: 1 }, threat: -4, alienRel: -5 } },
      { label: 'Forgive everyone, just once', effect: { stats: { joy: 12, faith: 5 }, set: { grudge_forgiven: 1 }, alienRel: 6, text: 'The goat, now very old, finally relaxes.', chain: { id: 'ch_f_forgive', delay: 2 } } },
    ],
  },
];

const hole: CardDef[] = [
  {
    id: 'x_hol_1', kind: 'event', title: 'A Hole', emoji: '🕳️', era: [0, 2], once: true,
    req: { noFlags: ['hole', 'hole_off'] },
    text: 'Someone dug a hole. It is a good hole. People keep coming to look at it.',
    choices: [
      { label: 'Dig it deeper', effect: { stats: { food: -2, sci: 2 }, flags: { hole: 1 } } },
      { label: 'Fill it in', effect: { stats: { joy: -2 }, set: { hole_off: 1 }, text: 'A small crowd mourns the hole.' } },
    ],
  },
  {
    id: 'x_hol_2', kind: 'event', title: 'The Hole Is Deeper', emoji: '⛏️', era: [1, 3], once: true,
    req: { flags: { hole: 1 }, noFlags: ['hole_off'] },
    text: 'The hole is now deep enough that dropped rocks take a while to land. One rock has not landed yet.',
    choices: [
      { label: 'Keep digging', effect: { stats: { gold: -3, sci: 4, weird: 2 }, flags: { hole: 1 }, chain: { id: 'x_hol_rock', delay: 6 } } },
      { label: 'Throw criminals in', effect: { stats: { mil: 2, joy: -3 }, flags: { hole: 1 }, text: 'Crime is down. The hole seems hungrier.' } },
    ],
  },
  {
    id: 'x_hol_rock', kind: 'event', title: 'The Rock Landed', emoji: '🌏', chainOnly: true, once: true,
    text: 'Remember the rock that never landed? It came out the other side of the world and hit a fisherman. He has mailed it back with a strongly worded note.',
    choices: [
      { label: 'Send an apology down the hole', effect: { stats: { sci: 3, weird: 2 }, flags: { hole: 1 } } },
      { label: 'Send another rock', effect: { stats: { joy: 3, weird: 3 }, text: 'A pen pal relationship has begun.' } },
    ],
  },
  {
    id: 'x_hol_3', kind: 'event', title: 'Something Down There', emoji: '👂', era: [3, 5], once: true,
    req: { flags: { hole: 2 }, noFlags: ['hole_off'] },
    text: 'Miners report knocking from below. Polite knocking. Three short, one long.',
    choices: [
      {
        label: 'Knock back', effect: { flags: { hole: 1 } },
        check: {
          base: 0.45, flags: { diplomats: 0.08, custom_polite: 0.15, fungus: 0.08, land_cave: 0.15 },
          success: { text: 'A friendly mole folk emerges, bearing mushrooms and excellent posture.', effect: { stats: { pop: 5, food: 5 } } },
          fail: { text: 'They want their hole back. Negotiations are tense and very dark.', effect: { stats: { mil: -4, weird: 4 } } },
        },
      },
      { label: 'Seal it and post guards', effect: { stats: { mil: 3, gold: -2 }, flags: { hole: 1 } } },
    ],
  },
  {
    id: 'x_hol_4', kind: 'event', title: 'Undercity', emoji: '🏙️', era: [5, 7], once: true,
    req: { flags: { hole: 3 }, noFlags: ['hole_off'] },
    text: 'Half the population now lives underground by choice. They have pale skin, excellent hearing, and strong opinions about the sun.',
    choices: [
      { label: 'Expand the undercity', effect: { stats: { pop: 6, gold: -6, joy: -2 }, flags: { hole: 1 } } },
      { label: 'Build bunkers down there', effect: { stats: { mil: 6, gold: -4 }, flags: { hole: 1 }, threat: -2 } },
    ],
  },
  {
    id: 'x_hol_5', kind: 'event', title: 'The Bottom', emoji: '🚪', era: [7, 8], once: true,
    req: { flags: { hole: 4 }, noFlags: ['hole_off'] },
    text: "The hole has reached the bottom. There is a door. It is labeled, in your language, 'Not yet.'",
    choices: [
      {
        label: 'Open it', effect: { flags: { hole: 1 } },
        outcomes: [
          { weight: 1, text: 'Behind it: the planet core, humming, ready to be plugged into.', effect: { stats: { sci: 12, gold: 8 } } },
          { weight: 1, text: 'Behind it: an older civilization, asking you to keep it down. They have contacts.', effect: { stats: { weird: 8 }, flags: { alien_contact: 1 }, alienRel: 5 } },
        ],
      },
      { label: 'Respect the door', effect: { stats: { faith: 6 }, flags: { hole: 1 }, threat: -3, text: 'The whole planet becomes a very good place to hide.' } },
    ],
  },
];

const bees: CardDef[] = [
  {
    id: 'x_bee_1', kind: 'event', title: 'Sweet Discovery', emoji: '🍯', era: [0, 2], once: true,
    req: { noFlags: ['bees', 'bees_off'] },
    text: 'A brave fool put his hand in a tree and came out with honey and forty-one stings. He calls it a fair trade.',
    choices: [
      { label: 'Keep bees', effect: { stats: { food: 4 }, flags: { bees: 1 } } },
      { label: 'Fear bees, as is natural', effect: { stats: { mil: 1 }, set: { bees_off: 1 } } },
    ],
  },
  {
    id: 'x_bee_2', kind: 'event', title: 'Royal Jelly Diplomacy', emoji: '👸', era: [1, 4], once: true,
    req: { flags: { bees: 1 }, noFlags: ['bees_off'] },
    text: 'The bees have a queen. Your queen would like a word with their queen.',
    choices: [
      { label: 'Arrange a royal summit', effect: { stats: { faith: 3, gold: 4 }, flags: { bees: 1 }, text: 'Both queens agree that drones are useless.' } },
      { label: 'Steal the jelly', effect: { stats: { food: 6, pop: -1 }, flags: { bees: 1 }, text: 'Pain was had.' } },
    ],
  },
  {
    id: 'x_bee_3', kind: 'event', title: 'The Waggle Translator', emoji: '🐝', era: [3, 5], once: true,
    req: { flags: { bees: 2 }, noFlags: ['bees_off'] },
    text: 'A monk claims to understand the waggle dance. He says the bees have been mocking our architecture for centuries.',
    choices: [
      { label: 'Learn the waggle', effect: { stats: { sci: 6, weird: 2 }, flags: { bees: 1 } } },
      { label: 'Rebuild the cities in hexagons', effect: { stats: { gold: -6, pop: 4, joy: 3 }, flags: { bees: 1 } } },
    ],
  },
  {
    id: 'x_bee_4', kind: 'event', title: 'Swarm Logic', emoji: '🏭', era: [5, 7], once: true,
    req: { flags: { bees: 3 }, noFlags: ['bees_off'] },
    text: 'Factory managers who copy the hive report 40% higher output and an alarming tendency to hum.',
    choices: [
      { label: 'Adopt swarm management', effect: { stats: { gold: 8, joy: -3 }, flags: { bees: 1, genes: 1 } } },
      { label: 'Breed war bees', effect: { stats: { mil: 8, gold: -3 }, flags: { bees: 1 } } },
    ],
  },
  {
    id: 'x_bee_5', kind: 'event', title: 'The Buzzening', emoji: '🧠', era: [6, 8], once: true,
    req: { flags: { bees: 4 }, noFlags: ['bees_off'] },
    text: 'Citizens with bee-graft therapy can feel what the hive feels. Mostly it feels that summer is great and wasps are not.',
    choices: [
      { label: 'Connect everyone', effect: { stats: { joy: 5, weird: 4 }, flags: { bees: 1, genes: 2 } } },
      { label: 'Volunteers only', effect: { stats: { sci: 4 }, flags: { bees: 1, genes: 1 } } },
    ],
  },
];

const heads: CardDef[] = [
  {
    id: 'x_hed_1', kind: 'event', title: 'A Big Head', emoji: '🗿', era: [0, 2], once: true,
    req: { noFlags: ['heads', 'heads_off'] },
    text: 'The sculptors carved a giant stone head. Nobody asked them to. It faces the sky, looking expectant.',
    choices: [
      { label: 'Carve more', effect: { stats: { gold: -2, faith: 3 }, flags: { heads: 1 } } },
      { label: 'Put a hat on it and move on', effect: { stats: { joy: 4 }, set: { heads_off: 1 } } },
    ],
  },
  {
    id: 'x_hed_2', kind: 'event', title: 'Head Count', emoji: '🗿', era: [1, 4], once: true,
    req: { flags: { heads: 1 }, noFlags: ['heads_off'] },
    text: 'There are now 300 giant heads. Farmers complain about the shade. The heads hum on clear nights.',
    choices: [
      { label: 'Keep carving', effect: { stats: { food: -4, faith: 4, weird: 2 }, flags: { heads: 1 } } },
      { label: 'Arrange them in a pattern', effect: { stats: { sci: 3 }, flags: { heads: 1 }, alienRel: 2 } },
    ],
  },
  {
    id: 'x_hed_3', kind: 'event', title: 'The Heads Turned', emoji: '🧭', era: [3, 6], once: true,
    req: { flags: { heads: 2 }, noFlags: ['heads_off'] },
    text: 'Overnight, every head rotated twelve degrees to the northeast. Nobody admits to touching them.',
    choices: [
      { label: 'Investigate', effect: { stats: { sci: 6 }, flags: { heads: 1 }, threat: 1 } },
      { label: 'Worship harder', effect: { stats: { faith: 6 }, flags: { heads: 1 } } },
    ],
  },
  {
    id: 'x_hed_4', kind: 'event', title: 'Antenna Array', emoji: '📡', era: [5, 7], once: true,
    req: { flags: { heads: 3 }, noFlags: ['heads_off'] },
    text: 'Physicists confirm the heads form a radio array of staggering precision. Your ancestors built a telescope by accident, out of spite for the sculptors guild.',
    choices: [
      { label: 'Power them up', effect: { stats: { gold: -8, sci: 8 }, flags: { heads: 1, alien_contact: 1 }, alienRel: 4 } },
      { label: 'Use them to jam alien signals', effect: { stats: { mil: 4 }, flags: { heads: 1 }, threat: -3 } },
    ],
  },
  {
    id: 'x_hed_5', kind: 'event', title: 'The Heads Speak', emoji: '🔴', era: [7, 8], once: true,
    req: { flags: { heads: 4 }, noFlags: ['heads_off'] },
    text: 'Every head opened its mouth at once. Inside each is a small, perfectly preserved button.',
    choices: [
      {
        label: 'Press the buttons', effect: { flags: { heads: 1 } },
        check: {
          base: 0.3, flags: { heads: 0.06, scholars: 0.08, alien_contact: 0.05, god_ancestors: 0.2 },
          success: { text: 'Somewhere, a very old friend picks up the phone.', effect: { flags: { alien_contact: 2 }, alienRel: 8 } },
          fail: { text: 'Somewhere, a very old enemy picks up the phone.', effect: { stats: { weird: 8 }, flags: { alien_contact: 1 }, threat: 5 } },
        },
      },
      { label: 'Leave the buttons alone', effect: { stats: { faith: 5 }, threat: -1 } },
    ],
  },
];

const ducks: CardDef[] = [
  {
    id: 'x_duc_1', kind: 'event', title: 'Duck v. The State', emoji: '🦆', era: [1, 3], once: true,
    req: { noFlags: ['ducks', 'ducks_off'] },
    text: 'A clerical error granted a duck full citizenship. It has filed its first lawsuit, against bread rationing.',
    choices: [
      { label: 'Honor the ruling', effect: { stats: { joy: 4, food: -3 }, flags: { ducks: 1, bureaucracy: 1 } } },
      { label: 'Overturn it', effect: { stats: { joy: -2 }, set: { ducks_off: 1 }, text: 'The duck appeals. It is denied. It honks for a month.' } },
    ],
  },
  {
    id: 'x_duc_2', kind: 'event', title: 'Duck Senator', emoji: '🗳️', era: [2, 4], once: true,
    req: { flags: { ducks: 1 }, noFlags: ['ducks_off'] },
    text: "The duck won a senate seat. Its platform is 'quack', which polls extremely well with undecided voters.",
    choices: [
      { label: 'Let it serve', effect: { stats: { joy: 5, gold: -2 }, flags: { ducks: 1 } } },
      { label: 'Make it Minister of Ponds', effect: { stats: { food: 5 }, flags: { ducks: 1, bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_duc_3', kind: 'event', title: 'Ducks of Law', emoji: '⚖️', era: [4, 6], once: true,
    req: { flags: { ducks: 2 }, noFlags: ['ducks_off'] },
    text: 'Ducks now make up a third of all lawyers. Trials are shorter and considerably wetter.',
    choices: [
      { label: 'Let the ducks codify the law', effect: { stats: { sci: 3, joy: -2 }, flags: { ducks: 1, bureaucracy: 2 } } },
      { label: 'Introduce a duck tax', effect: { stats: { gold: 8, joy: -3 }, flags: { ducks: 1 } } },
    ],
  },
  {
    id: 'x_duc_4', kind: 'event', title: 'Supreme Duck Court', emoji: '🏛️', era: [6, 8], once: true,
    req: { flags: { ducks: 3 }, noFlags: ['ducks_off'] },
    text: 'The Supreme Court is now entirely ducks. They have ruled that the universe is a pond and therefore within their jurisdiction.',
    choices: [
      { label: 'Sue the aliens preemptively', effect: { flags: { ducks: 1, bureaucracy: 2 }, threat: -3, alienRel: -3, chain: { id: 'ch_f_ducksue', delay: 2 } } },
      { label: 'Grant ducks diplomatic status', effect: { stats: { weird: 4 }, flags: { ducks: 1 }, alienRel: 6 } },
    ],
  },
  {
    id: 'x_duc_5', kind: 'event', title: 'The Injunction', emoji: '📄', era: [7, 8], once: true,
    req: { flags: { ducks: 4 }, noFlags: ['ducks_off'] },
    text: 'The Duck Court has issued an interplanetary cease-and-desist. It is laminated. It is extremely official.',
    choices: [
      {
        label: 'Broadcast it to the fleet', effect: { flags: { ducks: 1 } },
        check: {
          base: 0.2, flags: { ducks: 0.06, bureaucracy: 0.04, diplomats: 0.06, custom_records: 0.1 },
          success: { text: 'The aliens, deeply confused, pause the invasion pending review.', effect: { flags: { bureaucracy: 1 }, threat: -6 } },
          fail: { text: 'The aliens countersue. Their lawyers are geese.', effect: { stats: { weird: 4 }, flags: { bureaucracy: 2 }, threat: 2 } },
        },
      },
      { label: 'Frame it instead', effect: { stats: { joy: 4 } } },
    ],
  },
];

const prophecy: CardDef[] = [
  {
    id: 'x_pro_1', kind: 'event', title: 'The Scroll', emoji: '📜', era: [0, 2], once: true,
    req: { noFlags: ['prophecy', 'prophecy_off'] },
    text: "An old seer wrote a prophecy on bark, then sneezed on it. Half is unreadable. The other half concerns 'the sky folk' and 'beans'.",
    choices: [
      { label: 'Treasure it', effect: { stats: { faith: 4 }, flags: { prophecy: 1 } } },
      { label: 'Use it as kindling', effect: { stats: { food: 1, joy: 1 }, set: { prophecy_off: 1 } } },
    ],
  },
  {
    id: 'x_pro_2', kind: 'event', title: 'Bean Fulfillment', emoji: '🫘', era: [2, 4], once: true,
    req: { flags: { prophecy: 1 }, noFlags: ['prophecy_off'] },
    text: 'To fulfill the prophecy, the whole nation planted beans. The prophecy did not say why. Nobody is asking.',
    choices: [
      { label: 'Plant all the beans', effect: { stats: { food: 8, faith: 3, joy: -2 }, flags: { prophecy: 1 } } },
      { label: 'Study the smudged half', effect: { stats: { sci: 5, gold: -2 }, flags: { prophecy: 1 } } },
    ],
  },
  {
    id: 'x_pro_3', kind: 'event', title: 'The Second Reading', emoji: '🔍', era: [3, 6], once: true,
    req: { flags: { prophecy: 2 }, noFlags: ['prophecy_off'] },
    text: "More of the scroll has been restored. It now reads: 'when the sky folk come, they will be allergic to', followed by a moth hole.",
    choices: [
      {
        label: 'Search for the missing word', effect: { flags: { prophecy: 1 } },
        outcomes: [
          { weight: 1, text: 'A fragment is found in a monastery. The word is underlined twice.', effect: { stats: { sci: 6 }, threat: -4 } },
          { weight: 1, text: 'Every fragment found is a forgery. Some are quite good.', effect: { stats: { gold: -4, weird: 3 } } },
        ],
      },
      { label: "Assume it's beans", effect: { stats: { food: 5, faith: 4 }, flags: { prophecy: 1 } } },
    ],
  },
  {
    id: 'x_pro_4', kind: 'event', title: 'Prophecy Industry', emoji: '🏭', era: [5, 7], once: true,
    req: { flags: { prophecy: 3 }, noFlags: ['prophecy_off'] },
    text: 'An entire sector of the economy exists to fulfill the prophecy ahead of schedule. Output is enormous. Nobody knows what it is.',
    choices: [
      { label: 'Fulfill it faster', effect: { stats: { gold: 8, faith: 4 }, flags: { prophecy: 1, cult: 1 } } },
      { label: 'Audit the prophets', effect: { stats: { gold: 4, faith: -3 }, flags: { prophecy: 1, bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_pro_5', kind: 'event', title: 'The Prophecy Is Now', emoji: '🛸', era: [7, 8], once: true,
    req: { flags: { prophecy: 4 }, noFlags: ['prophecy_off'] },
    text: "The sky is full of ships. Every citizen is holding beans. The seer's descendant clears her throat and unrolls the final line.",
    choices: [
      {
        label: 'Read the ending', effect: { flags: { prophecy: 1 } },
        outcomes: [
          { weight: 1, text: "It says: 'you will be fine.' Morale skyrockets.", effect: { stats: { joy: 10 }, threat: -6 } },
          { weight: 1, text: "It says: 'see previous scroll.' There is no previous scroll.", effect: { stats: { faith: 6, weird: 6 }, flags: { cult: 1 } } },
          { weight: 1, text: "It's a recipe. The aliens ask for a copy.", effect: { stats: { food: 15 }, alienRel: 6 } },
        ],
      },
    ],
  },
];

const yeet: CardDef[] = [
  {
    id: 'x_yee_1', kind: 'event', title: 'The Big Throw', emoji: '🪨', era: [0, 2], once: true,
    req: { noFlags: ['yeet', 'yeet_off'] },
    text: 'A man threw a rock farther than anyone in history. He is asking for funding to throw bigger things.',
    choices: [
      { label: 'Fund throwing', effect: { stats: { gold: -2, mil: 3 }, flags: { yeet: 1 } } },
      { label: 'Tell him to sit down', effect: { stats: { joy: -2 }, set: { yeet_off: 1 } } },
    ],
  },
  {
    id: 'x_yee_2', kind: 'event', title: 'Trebuchet Fever', emoji: '🏗️', era: [2, 4], once: true,
    req: { flags: { yeet: 1 }, noFlags: ['yeet_off'] },
    text: 'Engineers built a siege engine so large it launched itself. It landed in a neighboring kingdom, which considers it a gift.',
    choices: [
      { label: 'Build a bigger one', effect: { stats: { gold: -5, mil: 6 }, flags: { yeet: 1 } } },
      { label: 'Launch the mail instead', effect: { stats: { sci: 3, gold: 3 }, flags: { yeet: 1 }, text: 'Delivery is fast. Signatures are optional.', chain: { id: 'ch_f_mail', delay: 2 } } },
    ],
  },
  {
    id: 'x_yee_3', kind: 'event', title: 'Human Ammunition', emoji: '🧑‍🚀', era: [4, 6], once: true,
    req: { flags: { yeet: 2 }, noFlags: ['yeet_off'] },
    text: 'A volunteer asked to be launched. He returned three days later, sunburnt, claiming he saw the curve of the world.',
    choices: [
      { label: 'Launch more volunteers', effect: { stats: { sci: 6, pop: -2 }, flags: { yeet: 1 } } },
      { label: 'Launch the tax collector', effect: { stats: { joy: 8, gold: -4 }, flags: { yeet: 1 }, chain: { id: 'ch_f_taxman', delay: 2 } } },
    ],
  },
  {
    id: 'x_yee_4', kind: 'event', title: 'National Throwing Program', emoji: '🎯', era: [6, 8], once: true,
    req: { flags: { yeet: 3 }, noFlags: ['yeet_off'] },
    text: 'The National Throwing Program now hurls payloads into orbit. Rockets are considered cheating.',
    choices: [
      { label: 'Throw satellites', effect: { stats: { sci: 10, gold: -6 }, flags: { yeet: 1 } } },
      { label: 'Throw rocks at the moon, preemptively', effect: { stats: { mil: 10, gold: -4 }, flags: { yeet: 1 }, threat: -2 } },
    ],
  },
  {
    id: 'x_yee_5', kind: 'event', title: 'Return to Sender', emoji: '☄️', era: [7, 8], once: true,
    req: { flags: { yeet: 4 }, noFlags: ['yeet_off'] },
    text: "The alien fleet is within range of the Throw. Engineers ask what to throw. Someone suggests 'everything'.",
    choices: [
      { label: 'Throw everything', effect: { stats: { gold: -10 }, flags: { yeet: 1 } }, check: {
        base: 0.2, stats: { sci: 0.001 }, flags: { yeet: 0.07, engineers: 0.08, logistics: 0.05 },
        success: { text: 'The flagship is hit by a cathedral. Then by a smaller cathedral.', effect: { stats: { mil: 15 }, threat: -7 } },
        fail: { text: 'Everything was thrown. Most of it came back down. On us.', effect: { stats: { mil: 5, pop: -2 }, threat: -2 } },
      } },
      { label: 'Throw a gift basket', effect: { stats: { food: -6 }, flags: { yeet: 1 }, alienRel: 10, chain: { id: 'ch_f_basket', delay: 1 } } },
    ],
  },
];

const fungus: CardDef[] = [
  {
    id: 'x_fun_1', kind: 'event', title: 'Funny Mushrooms', emoji: '🍄', era: [0, 2], once: true,
    req: { noFlags: ['fungus', 'fungus_off'] },
    text: 'The shaman ate a mushroom and described the future in unsettling detail. Most of it was about cables.',
    choices: [
      { label: 'Cultivate them', effect: { stats: { faith: 3, sci: 2, weird: 2 }, flags: { fungus: 1 } } },
      { label: 'Burn the patch', effect: { stats: { food: 2 }, set: { fungus_off: 1 } } },
    ],
  },
  {
    id: 'x_fun_2', kind: 'event', title: 'Mycelium Mail', emoji: '📨', era: [2, 4], once: true,
    req: { flags: { fungus: 1 }, noFlags: ['fungus_off'] },
    text: 'Words whispered to one mushroom can be heard at another miles away. The mushrooms add commentary.',
    choices: [
      { label: 'Build a fungal network', effect: { stats: { sci: 5, gold: -3 }, flags: { fungus: 1 } } },
      { label: 'Eat the network', effect: { stats: { joy: 6, weird: 3 }, flags: { fungus: 1 } } },
    ],
  },
  {
    id: 'x_fun_3', kind: 'event', title: 'The Library Mold', emoji: '📚', era: [4, 6], once: true,
    req: { flags: { fungus: 2 }, noFlags: ['fungus_off'] },
    text: 'A mold has eaten every book in the library and now quotes them on request, mostly out of context.',
    choices: [
      { label: 'Consult the Mold', effect: { stats: { sci: 7, joy: -3 }, flags: { fungus: 1 } } },
      { label: 'Appoint it head librarian', effect: { stats: { sci: 3 }, flags: { fungus: 1, bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_fun_4', kind: 'event', title: 'Spore Consciousness', emoji: '🌫️', era: [6, 8], once: true,
    req: { flags: { fungus: 3 }, noFlags: ['fungus_off'] },
    text: "Citizens who sleep near the network wake up knowing each other's passwords and childhood fears.",
    choices: [
      { label: 'Accept the spores', effect: { stats: { weird: 4, joy: -3 }, flags: { fungus: 1, genes: 2 } } },
      { label: 'Fungicide everything', effect: { stats: { food: -6, sci: 3 }, set: { fungus_off: 1 }, text: 'The network goes quiet. You feel watched anyway.' } },
    ],
  },
  {
    id: 'x_fun_5', kind: 'event', title: 'The Bloom', emoji: '🌐', era: [7, 8], once: true,
    req: { flags: { fungus: 4 }, noFlags: ['fungus_off'] },
    text: 'The fungus now covers the continent in a thin, warm, thoughtful layer. It would like to help with the invasion. It has ideas about alien lungs.',
    choices: [
      { label: 'Let it bloom', effect: { stats: { weird: 6 }, flags: { fungus: 1, genes: 1 }, threat: -5 } },
      { label: 'Ask it to stay calm', effect: { stats: { joy: 4 }, flags: { fungus: 1 }, alienRel: 4 } },
    ],
  },
];

const turk: CardDef[] = [
  {
    id: 'x_tur_1', kind: 'event', title: 'The Chess Machine', emoji: '♟️', era: [3, 4], once: true,
    req: { noFlags: ['turk', 'turk_off'] },
    text: 'An inventor unveils a brass automaton that plays chess. It sneezes during the second game.',
    choices: [
      { label: 'Fund the machine', effect: { stats: { gold: -4, sci: 3, joy: 3 }, flags: { turk: 1 } } },
      { label: 'Open the cabinet', effect: { stats: { sci: 2, joy: -2 }, set: { turk_off: 1 }, text: "There's a man inside named Pieter. He is very good at chess." } },
    ],
  },
  {
    id: 'x_tur_2', kind: 'event', title: 'Industrial Automata', emoji: '⚙️', era: [4, 6], once: true,
    req: { flags: { turk: 1 }, noFlags: ['turk_off'] },
    text: 'The automaton factory delivers its first self-operating looms. Each requires a small man inside. Small men are now a strategic resource.',
    choices: [
      { label: 'Hire more small men', effect: { stats: { gold: 6, pop: -2 }, flags: { turk: 1 } } },
      { label: 'Try actual gears', effect: { stats: { sci: 6, gold: -4 }, flags: { turk: 1, robots: 1 } } },
    ],
  },
  {
    id: 'x_tur_3', kind: 'event', title: 'The Men Inside', emoji: '🎳', era: [5, 7], once: true,
    req: { flags: { turk: 2 }, noFlags: ['turk_off'] },
    text: 'The men inside the machines have formed a union, a secret society and a bowling league. Same members, different hats.',
    choices: [
      { label: 'Recognize the union', effect: { stats: { joy: 5, gold: -4 }, flags: { turk: 1 } } },
      { label: 'Replace them with real robots', effect: { stats: { sci: 5, joy: -4 }, flags: { turk: 1, robots: 1 } } },
    ],
  },
  {
    id: 'x_tur_4', kind: 'event', title: 'Ghost in the Cabinet', emoji: '🤖', era: [6, 8], once: true,
    req: { flags: { turk: 3 }, noFlags: ['turk_off'] },
    text: "Your newest robot is fully mechanical but insists there's a man inside. Surgeons found no one. The robot still waves at him.",
    choices: [
      { label: 'Let it believe', effect: { stats: { weird: 4 }, flags: { turk: 1, robots: 2 } } },
      { label: 'Mass-produce it', effect: { stats: { mil: 8, gold: -6 }, flags: { turk: 1, robots: 1 } } },
    ],
  },
  {
    id: 'x_tur_5', kind: 'event', title: 'Grandmaster Army', emoji: '♞', era: [7, 8], once: true,
    req: { flags: { turk: 4 }, noFlags: ['turk_off'] },
    text: 'The robot army is ready. Each unit is half machine, half retired chess grandmaster. They plan the war twelve moves ahead.',
    choices: [
      { label: 'Deploy', effect: { stats: { mil: 10 }, flags: { turk: 1, robots: 2 }, threat: -3 } },
      {
        label: 'Challenge the aliens to chess', effect: { flags: { turk: 1 } },
        check: {
          base: 0.1, stats: { sci: 0.001 }, flags: { turk: 0.06, scholars: 0.06, robots: 0.03, god_math: 0.15 },
          success: { text: 'Checkmate in nineteen. The aliens demand a rematch, then a truce.', effect: { threat: -8, alienRel: 5 } },
          fail: { text: 'Turns out they invented chess. Twice.', effect: { stats: { joy: -5, sci: 4 }, threat: 3 } },
        },
      },
    ],
  },
];

const spice: CardDef[] = [
  {
    id: 'x_spi_1', kind: 'event', title: 'The Angry Berry', emoji: '🌶️', era: [0, 2], once: true,
    req: { noFlags: ['spice', 'spice_off'] },
    text: 'A forager found a red berry that makes your mouth scream. Twelve people have tried it, each to prove they could.',
    choices: [
      { label: 'Farm the angry berry', effect: { stats: { food: 3, joy: 3 }, flags: { spice: 1 } } },
      { label: 'Declare it cursed', effect: { stats: { faith: 3 }, set: { spice_off: 1 } } },
    ],
  },
  {
    id: 'x_spi_2', kind: 'event', title: 'Heat Wars', emoji: '🥵', era: [2, 4], once: true,
    req: { flags: { spice: 1 }, noFlags: ['spice_off'] },
    text: 'Taverns now compete to serve the hottest dish. Last week a judge saw sounds.',
    choices: [
      { label: 'Sponsor the contest', effect: { stats: { joy: 6, gold: -2 }, flags: { spice: 1 } } },
      { label: 'Tax the sauce', effect: { stats: { gold: 6, joy: -2 }, flags: { spice: 1 } } },
    ],
  },
  {
    id: 'x_spi_3', kind: 'event', title: 'The Pepper Navy', emoji: '⛵', era: [4, 6], once: true,
    req: { flags: { spice: 2 }, noFlags: ['spice_off'] },
    text: 'Your cannons now fire pepper powder. Enemy sailors surrender in tears and ask for milk.',
    choices: [
      { label: 'Commission the pepper fleet', effect: { stats: { mil: 7, gold: -5 }, flags: { spice: 1 } } },
      { label: 'Export the sauce', effect: { stats: { gold: 9 }, flags: { spice: 1 } } },
    ],
  },
  {
    id: 'x_spi_4', kind: 'event', title: 'Project Inferno', emoji: '☢️', era: [6, 8], once: true,
    req: { flags: { spice: 3 }, noFlags: ['spice_off'] },
    text: 'Geneticists have bred a pepper that registers on seismographs. Handling it requires a lead suit and a will.',
    choices: [
      { label: 'Weaponize it', effect: { stats: { mil: 10, joy: -3 }, flags: { spice: 1, genes: 1 } } },
      { label: 'Make it the national dish', effect: { stats: { joy: 8, pop: -2 }, flags: { spice: 1 } } },
    ],
  },
  {
    id: 'x_spi_5', kind: 'event', title: 'First Taste', emoji: '👅', era: [7, 8], once: true,
    req: { flags: { spice: 4 }, noFlags: ['spice_off'] },
    text: 'A captured alien probe reveals their tongues are forty thousand times more sensitive than ours.',
    choices: [
      { label: 'Prepare the sauce', effect: { stats: { mil: 6 }, flags: { spice: 1 }, threat: -6, alienRel: -4 } },
      { label: 'Offer them mild salsa as peace', effect: { stats: { joy: 3 }, flags: { spice: 1 }, alienRel: 10, chain: { id: 'ch_f_salsa', delay: 2 } } },
    ],
  },
];

const mascot: CardDef[] = [
  {
    id: 'x_mas_1', kind: 'event', title: 'Mayor Biscuit', emoji: '🐕', era: [1, 3], once: true,
    req: { noFlags: ['mascot', 'mascot_off'] },
    text: 'A dog named Biscuit won the village election as a joke. He has already done more than the last three mayors.',
    choices: [
      { label: 'Respect the result', effect: { stats: { joy: 5 }, flags: { mascot: 1, party: 1 } } },
      { label: 'Annul the election', effect: { stats: { joy: -3, mil: 1 }, set: { mascot_off: 1 } } },
    ],
  },
  {
    id: 'x_mas_2', kind: 'event', title: 'Biscuit the Second', emoji: '🦴', era: [2, 5], once: true,
    req: { flags: { mascot: 1 }, noFlags: ['mascot_off'] },
    text: "Biscuit's son has won his father's seat. Critics call it nepotism. Supporters call it a very good boy.",
    choices: [
      { label: 'Establish a dog dynasty', effect: { stats: { joy: 6, faith: 2 }, flags: { mascot: 1 } } },
      { label: 'Open the office to all animals', effect: { stats: { joy: 4, weird: 3 }, flags: { mascot: 1, bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_mas_3', kind: 'event', title: 'The Belly Rub Accords', emoji: '🤝', era: [4, 6], once: true,
    req: { flags: { mascot: 2 }, noFlags: ['mascot_off'] },
    text: 'Biscuit IV ended a border war by rolling over in the middle of the battlefield. Both armies stopped to pet him.',
    choices: [
      { label: 'Make it official doctrine', effect: { stats: { joy: 6, mil: -3 }, flags: { mascot: 1, party: 1 } } },
      { label: 'Train attack dogs too', effect: { stats: { mil: 6 }, flags: { mascot: 1 } } },
    ],
  },
  {
    id: 'x_mas_4', kind: 'event', title: 'Biscuit Goes Global', emoji: '📺', era: [6, 8], once: true,
    req: { flags: { mascot: 3 }, noFlags: ['mascot_off'] },
    text: "Footage of Biscuit VII catching a frisbee is the most-watched broadcast in history. World leaders want to be photographed with him.",
    choices: [
      { label: 'Charge for photos', effect: { stats: { gold: 10, joy: 3 }, flags: { mascot: 1 } } },
      { label: 'Throw a planetary pet party', effect: { stats: { joy: 10, food: -5 }, flags: { mascot: 1, party: 2 } } },
    ],
  },
  {
    id: 'x_mas_5', kind: 'event', title: 'Who Is a Good Planet', emoji: '🌍', era: [7, 8], once: true,
    req: { flags: { mascot: 4 }, noFlags: ['mascot_off'] },
    text: 'Alien scouts observed Biscuit IX for a week. Their reports have become noticeably less professional.',
    choices: [
      { label: 'Send Biscuit as ambassador', effect: { stats: { joy: 6 }, flags: { mascot: 1, party: 1 }, alienRel: 12, threat: -2, chain: { id: 'ch_f_biscuit', delay: 2 } } },
      { label: 'Keep him safe at home', effect: { stats: { joy: 4, faith: 3 }, alienRel: 3 } },
    ],
  },
];

export const storylineCards: CardDef[] = [
  ...pigeons,
  ...gerald,
  ...dance,
  ...grudge,
  ...hole,
  ...bees,
  ...heads,
  ...ducks,
  ...prophecy,
  ...yeet,
  ...fungus,
  ...turk,
  ...spice,
  ...mascot,
];
