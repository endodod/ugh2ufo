// Multi-storyline chains (part 2): storylines crossed with forms and capabilities.
import type { CardDef, CardKind, Choice } from '../../types';
import { c, chk, ev, luck, o, step } from './util';

const s = (id: string, kind: CardKind, emoji: string, title: string, text: string, choices: Choice[]): CardDef =>
  ev(id, kind, emoji, title, text, choices, { chainOnly: true });

const spicemed: CardDef[] = [
  ev('spicemed_1', 'research', '🌶️', 'Pepper Medicine', 'Doctors report that the national hot sauce kills every germ it touches. It also kills some of the spoons.', [
    c('Prescribe the sauce', { stats: { pop: 3, joy: -2 }, flags: { ch_spicemed: 1, medicine: 1 }, chain: step('spicemed_2', 2) }),
    c('Breed a hotter pepper', { stats: { food: 3, weird: 3 }, flags: { ch_spicemed: 1, spice: 1 }, chain: step('spicemed_2', 2) }),
  ], { age: [3, 9], req: { flags: { spice: 1, medicine: 1 } }, weight: 2 }),
  s('spicemed_2', 'event', '🔥', 'The Sauce Ward', 'The hospital has a sauce ward. Patients sweat out every illness in under an hour. Some of them also sweat out their memories of childhood.', [
    c('Keep it voluntary', { stats: { pop: 2, joy: 2 }, flags: { medicine: 1, ch_spicemed: 1 }, chain: step('spicemed_3', 2) }),
    c('Make it mandatory', { stats: { pop: 4, joy: -5 }, flags: { spice: 1, ch_spicemed: 1 }, chain: step('spicemed_3', 2) }),
  ]),
  s('spicemed_3', 'rival', '🤒', 'Plague Next Door', 'A plague is sweeping {rival}. Their doctors ask, nervously, about the sauce.', [
    c('Send sauce and doctors', { stats: { food: -4 }, flags: { medicine: 1, ch_spicemed: 1 }, rival: { target: 'same', rel: 15 }, chain: step('spicemed_4', 3) }),
    c('Sell it at a steep price', { stats: { gold: 10 }, rival: { target: 'same', rel: -6 }, flags: { ch_spicemed: 1 }, chain: step('spicemed_4', 3) }),
  ]),
  s('spicemed_4', 'alien', '👅', 'Sensitive Visitors', 'Lab tests on an alien probe show their tissue reacts to our sauce like ours reacts to lava.', [
    c('Stockpile sauce for the invasion', { stats: { mil: 10, food: -5 }, flags: { spice: 1, genes: 1 }, threat: -4 }),
    c('Develop a mild version as a peace gift', { stats: { sci: 5 }, flags: { medicine: 1 }, alienRel: 8 }),
  ]),
];

const headsscholar: CardDef[] = [
  ev('headsscholar_1', 'research', '🗿', 'Reading the Heads', 'The scholars have noticed the stone heads have tiny writing inside their nostrils. Somebody has to read it.', [
    c('Send the bravest scholar', { stats: { sci: 5 }, flags: { ch_headsscholar: 1, scholars: 1 }, chain: step('headsscholar_2', 2) }),
    c('Build scaffolding on every head', { stats: { gold: -4, sci: 3 }, flags: { ch_headsscholar: 1, heads: 1 }, chain: step('headsscholar_2', 3) }),
  ], { age: [5, 11], req: { flags: { heads: 1, scholars: 1 } }, weight: 2 }),
  s('headsscholar_2', 'event', '👃', 'The Nostril Texts', 'The writing is a manual. Chapter one: "Congratulations on your new ancestor array." Chapter two is missing. It is in the other nostril.', [
    c('Read the other nostril', { stats: { sci: 6 }, flags: { heads: 1, ch_headsscholar: 1 }, chain: step('headsscholar_3a', 2) }),
    c('Write chapter two ourselves', { stats: { joy: 4, weird: 4 }, flags: { scholars: 1, ch_headsscholar: 1 }, chain: step('headsscholar_3b', 2) }),
  ]),
  s('headsscholar_3a', 'event', '📞', 'Customer Support', 'Chapter two lists a number. The heads, read aloud in order, are the number. A tone sounds across the island.', [
    c('Stay on the line', { stats: { weird: 6 }, flags: { alien_contact: 1, heads: 1 }, alienRel: 4 }),
    c('Hang up before anyone answers', { stats: { joy: 2 }, threat: -2 }),
  ]),
  s('headsscholar_3b', 'event', '✍️', 'Our Own Chapter Two', 'Our chapter two says the heads are "for decoration and morale". The heads appear to have heard. Several are frowning.', [
    c('Apologise to the heads', { stats: { faith: 5 }, flags: { heads: 1 }, chain: step('headsscholar_3a', 2) }),
    c('Publish it anyway', { stats: { sci: 4, joy: 3 }, flags: { scholars: 1 } }),
  ]),
];

const tidenavy: CardDef[] = [
  ev('tidenavy_1', 'event', '🌊', 'The Navy Goes Under', 'The Tide-Folk have asked why the navy insists on staying on top of the water. "It is so much nicer below."', [
    c('Let the navy dive', { stats: { mil: 4, weird: 4 }, flags: { ch_tidenavy: 1, tide: 1 }, chain: step('tidenavy_2', 2) }),
    c('Train the Tide-Folk as marines', { stats: { mil: 6 }, flags: { ch_tidenavy: 1, navy: 1 }, chain: step('tidenavy_2', 2) }),
  ], { age: [6, 12], req: { flags: { tide: 2, navy: 1 } }, weight: 2 }),
  s('tidenavy_2', 'event', '🐙', 'The Kelp Admiralty', 'The navy\'s new headquarters is a kelp forest. Orders are given by bubble. Admirals say morale has never been wetter.', [
    c('Recruit octopuses', { stats: { mil: 6, sci: 3 }, flags: { navy: 1, ch_tidenavy: 1 }, chain: step('tidenavy_3', 2) }),
    c('Recruit whales', { stats: { mil: 8, food: -4 }, flags: { tide: 1, ch_tidenavy: 1 }, chain: step('tidenavy_3', 2) }),
  ]),
  s('tidenavy_3', 'rival', '🚢', 'Ships From Below', '{rival}\'s fleet has been tipped over gently by something under the waves. They are wet and furious and very confused.', [
    c('Deny everything', { stats: { joy: 4 }, rival: { target: 'same', rel: -6 }, flags: { ch_tidenavy: 1 }, chain: step('tidenavy_4', 3) }),
    c('Help them right their ships', { stats: { gold: -3 }, rival: { target: 'same', rel: 10 }, flags: { ch_tidenavy: 1 }, chain: step('tidenavy_4', 3) }),
  ]),
  s('tidenavy_4', 'alien', '🛸', 'They Cannot See Underwater', 'Spies report the alien sensors cannot see more than a metre into seawater. The Tide-Folk navy has been invisible to them all along.', [
    c('Move everything into the sea', { stats: { mil: 10, gold: -8 }, flags: { tide: 1, navy: 1 }, threat: -5 }),
    c('Keep it as a surprise', { flags: { navy: 1, spies: 1 }, threat: -3 }),
  ]),
];

const uploadbur: CardDef[] = [
  ev('uploadbur_1', 'event', '💾', 'The Afterlife Has Forms', 'Uploaded citizens need paperwork. What is their address? Do they pay rent? Can a file be a homeowner?', [
    c('Create the Ministry of Digital Persons', { stats: { gold: -4 }, flags: { ch_uploadbur: 1, bureaucracy: 1 }, chain: step('uploadbur_2', 2) }),
    c('Let them self-govern', { stats: { sci: 4, weird: 3 }, flags: { ch_uploadbur: 1, upload: 1 }, chain: step('uploadbur_2b', 2) }),
  ], { age: [9, 13], req: { flags: { upload: 2, bureaucracy: 1 } }, weight: 2 }),
  s('uploadbur_2', 'event', '🗃️', 'Queue Inside the Machine', 'The Ministry built a waiting room inside the servers. Uploaded citizens wait there forever, which they say is fine, but they would like magazines.', [
    c('Provide magazines', { stats: { joy: 4, gold: -3 }, flags: { ch_uploadbur: 1 }, chain: step('uploadbur_3', 2) }),
    c('Process them faster', { stats: { sci: 6 }, flags: { bureaucracy: 1, ch_uploadbur: 1 }, chain: step('uploadbur_3', 2) }),
  ]),
  s('uploadbur_2b', 'event', '🗳️', 'The Server Republic', 'The uploaded have founded a republic on the national servers. They vote every millisecond. Their president has already served nine thousand terms.', [
    c('Recognise the republic', { stats: { joy: 4 }, flags: { upload: 1, ch_uploadbur: 1 }, chain: step('uploadbur_3', 2) }),
    c('Annex it back', { stats: { mil: 4, joy: -4 }, flags: { bureaucracy: 1, ch_uploadbur: 1 }, chain: step('uploadbur_3', 2) }),
  ]),
  s('uploadbur_3', 'alien', '📨', 'Can the Fleet Be Uploaded?', 'The uploaded have written to the alien fleet. They ask whether the aliens would like to be digitised, "to save space".', [
    c('Endorse the offer', { flags: { upload: 1, alien_contact: 1 }, alienRel: 6, threat: -2 }),
    c('Attach a 40-page consent form', { flags: { bureaucracy: 2 }, threat: -3 }),
  ]),
];

const ghostspy: CardDef[] = [
  ev('ghostspy_1', 'rival', '👻', 'Ghost Agents', 'The spy service has noticed ghosts walk through walls. The ghosts have noticed the spy service pays.', [
    c('Hire ghost agents', { stats: { gold: -4 }, flags: { ch_ghostspy: 1, spies: 1 }, chain: step('ghostspy_2', 2) }),
    c('Train spies to be more ghostly', { stats: { weird: 4 }, flags: { ch_ghostspy: 1, ghost: 1 }, chain: step('ghostspy_2', 2) }),
  ], { age: [5, 11], req: { flags: { ghost: 2, spies: 1 }, rival: true }, weight: 2 }),
  s('ghostspy_2', 'rival', '🏚️', 'Haunting the Palace', 'Our ghost agents are inside {rival}\'s palace. Their reports are accurate but full of moaning, and they keep rearranging furniture for effect.', [
    c('Steal their war plans', { stats: { mil: 5 }, flags: { spies: 1, ch_ghostspy: 1 }, rival: { target: 'same', rel: -6 }, chain: step('ghostspy_3a', 2) }),
    c('Scare them into a treaty', { stats: { weird: 4 }, flags: { ghost: 1, ch_ghostspy: 1 }, rival: { target: 'same', rel: 4 }, chain: step('ghostspy_3b', 2) }),
  ]),
  s('ghostspy_3a', 'rival', '🕯️', 'They Hired an Exorcist', '{rival} has hired an exorcist. He is very good. Two of our agents have been sent somewhere they refuse to describe.', [
    c('Hire the exorcist away', { stats: { gold: -6 }, flags: { spies: 1, ch_ghostspy: 1 }, chain: step('ghostspy_4', 3) }),
    c('Haunt the exorcist', { stats: { weird: 5 }, flags: { ghost: 1, ch_ghostspy: 1 }, chain: step('ghostspy_4', 3) }),
  ]),
  s('ghostspy_3b', 'rival', '📜', 'The Haunted Treaty', '{rival} signed a treaty on the condition that the chandelier stops swinging. It has mostly stopped.', [
    c('Stop the chandelier', { rival: { target: 'same', rel: 10 }, flags: { ch_ghostspy: 1 }, chain: step('ghostspy_4', 3) }),
    c('Let it swing a little', { stats: { joy: 3 }, rival: { target: 'same', rel: 2 }, flags: { ghost: 1 } }),
  ]),
  s('ghostspy_4', 'alien', '🛸', 'Haunting the Flagship', 'The ghost agents say the alien flagship is very easy to walk into. It has no doors that ghosts respect.', [
    chk('Send them in', {}, {
      base: 0.4, flags: { ghost: 0.08, spies: 0.08 },
      success: { text: 'The crew of the flagship has not slept in a week. Their invasion schedule has slipped.', effect: { flags: { ghost: 1, spies: 1 }, threat: -6 } },
      fail: { text: 'The aliens find ghosts interesting. Our agents are now in jars, for study.', effect: { stats: { joy: -4 }, alienRel: 3, threat: 2 } },
    }),
    c('Keep them home for the landing', { stats: { mil: 6 }, flags: { ghost: 1 } }),
  ]),
];

const catmecheng: CardDef[] = [
  ev('catmecheng_1', 'project', '🐆', 'Maintenance Day', 'The brass cat-knights need servicing. The engineers would like to service them. The cats would like the engineers to leave.', [
    c('Service them by force', { stats: { gold: -4, mil: 4 }, flags: { ch_catmecheng: 1, engineers: 1 }, chain: step('catmecheng_2', 2) }),
    c('Wait until they fall asleep', { stats: { joy: 3 }, flags: { ch_catmecheng: 1, catmech: 1 }, chain: step('catmecheng_2', 3) }),
  ], { age: [6, 12], req: { flags: { catmech: 2, engineers: 1 } }, weight: 2 }),
  s('catmecheng_2', 'event', '⚙️', 'Upgrades', 'The engineers can add one upgrade per cat-knight before they wake up. They can only agree on two options.', [
    c('Jet boosters', { stats: { mil: 8, gold: -6 }, flags: { catmech: 1, ch_catmecheng: 1 }, chain: step('catmecheng_3', 2) }),
    c('A heated seat', { stats: { joy: 6 }, flags: { cats: 1, ch_catmecheng: 1 }, chain: step('catmecheng_3', 2) }),
  ]),
  s('catmecheng_3', 'event', '😾', 'The Cats Woke Up', 'The cat-knights woke up and examined the upgrades. Their verdict will be delivered when they feel like it.', [
    luck('Wait for the verdict', [
      o(2, 'They approve. They purr so loudly the barracks shake.', { stats: { mil: 8 }, flags: { catmech: 1, cats: 1 }, chain: step('catmecheng_4', 3) }),
      o(1, 'They disapprove, and push the head engineer off a table.', { stats: { joy: 3, sci: -3 }, flags: { cats: 1 }, chain: step('catmecheng_4', 3) }),
    ]),
  ]),
  s('catmecheng_4', 'alien', '🛸', 'Laser Pointers in Orbit', 'Alien scouts have started testing targeting lasers on our coast. Every cat-knight in the country has noticed the little red dot.', [
    c('Let them chase it', { stats: { mil: 10, joy: 4 }, flags: { catmech: 1, cats: 1 }, threat: -4, text: 'The dot leads back to a scout ship. The scout ship is now in pieces.' }),
    c('Hold them back for the real thing', { stats: { mil: 6 }, flags: { engineers: 1 } }),
  ]),
];

const loopproph: CardDef[] = [
  ev('loopproph_1', 'event', '🔁', 'The Prophecy Is a Memory', 'The time-loop scholars have realised the old prophecy is not a prophecy. It is a set of notes, left by us, next time.', [
    c('Read the notes carefully', { stats: { sci: 5 }, flags: { ch_loopproph: 1, loop: 1 }, chain: step('loopproph_2', 2) }),
    c('Keep treating it as holy', { stats: { faith: 6 }, flags: { ch_loopproph: 1, prophecy: 1 }, chain: step('loopproph_2', 2) }),
  ], { age: [5, 12], req: { flags: { loop: 1, prophecy: 1 } }, weight: 2 }),
  s('loopproph_2', 'event', '📝', 'Notes to Self', 'The notes are in {leader}\'s handwriting. Most say "do not". A few say "definitely do". One just says "beans, but more".', [
    c('Follow "definitely do"', { stats: { gold: 5, sci: 3 }, flags: { loop: 1, ch_loopproph: 1 }, chain: step('loopproph_3', 2) }),
    c('Plant more beans', { stats: { food: 8 }, flags: { prophecy: 1, ch_loopproph: 1 }, chain: step('loopproph_3', 2) }),
  ]),
  s('loopproph_3', 'event', '✒️', 'Write the Next Notes', 'Scholars say we must write the notes for the next loop now, before we forget, which we will.', [
    c('Write "the aliens hate beans"', { flags: { prophecy: 1, loop: 1, ch_loopproph: 1 }, threat: -3, chain: step('loopproph_4', 3) }),
    c('Write "be nice to the aliens"', { flags: { loop: 1, ch_loopproph: 1 }, alienRel: 6, chain: step('loopproph_4', 3) }),
    c('Write nothing and see what happens', { stats: { weird: 6 }, set: { ch_loopproph_off: 1 } }),
  ]),
  s('loopproph_4', 'alien', '🫘', 'The Notes Were Right', 'An alien scout tasted a bean today. The reaction was exactly as described in the notes. We are, it seems, our own best prophet.', [
    c('Plant beans everywhere', { stats: { food: 10 }, flags: { prophecy: 1, cult: 1 }, threat: -4 }),
    c('Send the next loop a thank-you note', { stats: { joy: 5 }, flags: { loop: 1 } }),
  ]),
];

const incdip: CardDef[] = [
  ev('incdip_1', 'rival', '💼', 'Acquisition Talks', 'Now that the nation is a company, the diplomats have started treating {rival} as a potential acquisition.', [
    c('Make an offer', { stats: { gold: -6 }, flags: { ch_incdip: 1, inc: 1 }, rival: { target: 'same', rel: -4 }, chain: step('incdip_2', 2) }),
    c('Propose a friendly partnership', { flags: { ch_incdip: 1, diplomats: 1 }, rival: { target: 'same', rel: 8 }, chain: step('incdip_2b', 2) }),
  ], { age: [8, 13], req: { flags: { inc: 2, diplomats: 1 }, rival: true }, weight: 2 }),
  s('incdip_2', 'rival', '📈', 'Hostile Bid', '{rival}\'s board, which is also their royal family, has rejected our bid. They have adopted a poison pill. It is an actual pill.', [
    c('Raise the bid', { stats: { gold: -10 }, flags: { inc: 1, ch_incdip: 1 }, rival: { target: 'same', rel: -6 }, chain: step('incdip_3', 2) }),
    c('Withdraw politely', { stats: { gold: 4 }, rival: { target: 'same', rel: 4 } }),
  ]),
  s('incdip_2b', 'rival', '🤝', 'Joint Venture', 'The joint venture with {rival} is profitable. Their staff and ours share a cafeteria. There have only been two wars over the microwave.', [
    c('Sign a trade pact', { stats: { gold: 5 }, flags: { ch_incdip: 1 }, rival: { target: 'same', rel: 6, trade: true }, chain: step('incdip_3', 3) }),
    c('Buy a second microwave', { stats: { gold: -2, joy: 4 }, flags: { diplomats: 1, ch_incdip: 1 }, rival: { target: 'same', rel: 8 }, chain: step('incdip_3', 3) }),
  ]),
  s('incdip_3', 'alien', '🛸', 'Acquire the Fleet', 'The board proposes a bold strategy: make the alien fleet an offer they cannot refuse, on paper.', [
    c('Make the offer', { stats: { gold: -12 }, flags: { inc: 1, diplomats: 1 }, alienRel: 6, threat: -4, text: 'The fleet\'s accountants are interested. That is new.' }),
    c('Offer them shares instead', { stats: { gold: 6 }, flags: { inc: 1 }, alienRel: 4, threat: -2 }),
  ]),
];

const driftpig: CardDef[] = [
  ev('driftpig_1', 'event', '🎈', 'Airspace Dispute', 'The floating villages and the pigeons both claim the sky. The pigeons were here first. The villages are larger.', [
    c('Side with the pigeons', { stats: { joy: 3 }, flags: { ch_driftpig: 1, pigeons: 1 }, chain: step('driftpig_2', 2) }),
    c('Side with the villages', { stats: { gold: 3 }, flags: { ch_driftpig: 1, drift: 1 }, chain: step('driftpig_2', 2) }),
  ], { age: [4, 11], req: { flags: { drift: 1, pigeons: 1 } }, weight: 2 }),
  s('driftpig_2', 'event', '🐦', 'Sky Traffic', 'Air traffic is chaos. A pigeon collided with a village. The village is fine. The pigeon is now mayor of the village.', [
    c('Recognise the pigeon mayor', { stats: { weird: 5 }, flags: { pigeons: 1, ch_driftpig: 1 }, chain: step('driftpig_3', 2) }),
    c('Build sky lanes', { stats: { gold: -4, sci: 4 }, flags: { drift: 1, logistics: 1, ch_driftpig: 1 }, chain: step('driftpig_2r', 2) }),
  ]),
  s('driftpig_2r', 'rival', '💩', 'Complaints From Below', '{rival} complains that our floating villages and pigeons drop things on them. They have sent a list. It is mostly droppings, some of it is furniture.', [
    c('Apologise and pay for umbrellas', { stats: { gold: -4 }, flags: { ch_driftpig: 1 }, rival: { target: 'same', rel: 8 }, chain: step('driftpig_3', 2) }),
    c('Drop leaflets explaining it was art', { stats: { joy: 3 }, flags: { drift: 1, propaganda: 1, ch_driftpig: 1 }, rival: { target: 'same', rel: -6 }, chain: step('driftpig_3', 2) }),
  ]),
  s('driftpig_3', 'alien', '☁️', 'The Sky Is Full', 'The alien scouts report our upper atmosphere is "too crowded to land in". Pigeons and villages have filled every cloud.', [
    c('Fill it more', { stats: { mil: 8, food: -4 }, flags: { drift: 1, pigeons: 1 }, threat: -5 }),
    c('Open a single landing lane, with a toll', { stats: { gold: 10 }, alienRel: 4 }),
  ]),
];

const weemed: CardDef[] = [
  ev('weemed_1', 'research', '🔬', 'Tiny Doctors', 'Shrunken doctors have offered to go inside patients and fix things by hand. The patients have questions. The doctors have tiny answers.', [
    c('Approve the procedure', { stats: { pop: 3, weird: 4 }, flags: { ch_weemed: 1, medicine: 1 }, chain: step('weemed_2', 2) }),
    c('Shrink more doctors', { stats: { sci: 5 }, flags: { ch_weemed: 1, wee: 1 }, chain: step('weemed_2', 2) }),
  ], { age: [7, 12], req: { flags: { wee: 1, medicine: 1 } }, weight: 2 }),
  s('weemed_2', 'event', '🫀', 'A Doctor Got Lost', 'One of the tiny doctors is lost inside a patient. He sends daily postcards describing the scenery. The patient is very self-conscious.', [
    chk('Send a rescue team', { stats: { gold: -3 } }, {
      base: 0.5, flags: { medicine: 0.08, logistics: 0.06, wee: 0.06 },
      success: { text: 'Found near the left kidney, sunbathing. He has written a guidebook.', effect: { stats: { sci: 8 }, flags: { medicine: 1, ch_weemed: 1 }, chain: step('weemed_3', 2) } },
      fail: { text: 'The rescue team is also lost. The postcards now come in pairs.', effect: { stats: { weird: 5 }, flags: { wee: 1, ch_weemed: 1 }, chain: step('weemed_2b', 2) } },
    }),
    c('Let him find his own way out', { stats: { joy: -2 }, flags: { ch_weemed: 1 }, chain: step('weemed_3', 3) }),
  ]),
  s('weemed_2b', 'event', '🗺️', 'Postcards in Pairs', 'The lost doctors have founded a small town inside the patient. The patient now pays local taxes to himself and feels much better.', [
    c('Grant the town a charter', { stats: { weird: 5, gold: 2 }, flags: { wee: 1, ch_weemed: 1 }, chain: step('weemed_3', 2) }),
    c('Evacuate with a very strong cough syrup', { stats: { pop: 1 }, flags: { medicine: 1, ch_weemed: 1 }, chain: step('weemed_3', 2) }),
  ]),
  s('weemed_3', 'alien', '🦠', 'Inside the Invaders', 'The tiny doctors point out that aliens also have insides. They volunteer to go and look around.', [
    c('Send them into a captured scout', { stats: { sci: 10 }, flags: { wee: 1, medicine: 1 }, threat: -4 }),
    c('Have them fix the scout instead', { stats: { faith: 3 }, flags: { medicine: 1 }, alienRel: 8 }),
  ]),
];

const bellyfrog: CardDef[] = [
  ev('bellyfrog_1', 'event', '🐸', 'Life in the Frog', 'Inside the sacred frog, the priests have built a temple. The frog seems fine with it. Occasionally it hiccups.', [
    c('Expand the temple', { stats: { faith: 6, gold: -3 }, flags: { ch_bellyfrog: 1, belly: 1 }, chain: step('bellyfrog_2', 2) }),
    c('Install hiccup alarms', { stats: { sci: 4 }, flags: { ch_bellyfrog: 1, cult: 1 }, chain: step('bellyfrog_2', 2) }),
  ], { age: [4, 12], req: { flags: { belly: 1, god_frog: 1 } }, weight: 3 }),
  s('bellyfrog_2', 'event', '🫧', 'The Great Hiccup', 'The frog hiccuped. Half the temple is now outside the frog. The priests outside want back in. The priests inside are smug.', [
    c('Let everyone back in', { stats: { faith: 5, joy: 3 }, flags: { belly: 1, ch_bellyfrog: 1 }, chain: step('bellyfrog_3', 2) }),
    c('Two churches, then', { stats: { faith: 6 }, flags: { heresy: 1, cult: 1, ch_bellyfrog: 1 }, chain: step('bellyfrog_2b', 2) }),
  ]),
  s('bellyfrog_2b', 'event', '⛪', 'The Outer Church', 'The priests outside the frog have founded the Church of the Outside. Their main doctrine is that the frog is a building. The frog disagrees, quietly.', [
    c('Let them preach', { stats: { faith: 4, sci: 2 }, flags: { ch_bellyfrog: 1 }, chain: step('bellyfrog_3', 2) }),
    c('Have the frog swallow them back', { stats: { faith: 6, joy: -2 }, flags: { belly: 1, ch_bellyfrog: 1 }, chain: step('bellyfrog_3', 2) }),
  ]),
  s('bellyfrog_3', 'alien', '🛸', 'The Frog Sees the Fleet', 'The frog has opened one eye and is looking at the alien fleet. Everyone inside feels it, like a lift starting to move.', [
    c('Let the frog decide', { stats: { faith: 8 }, flags: { belly: 1, cult: 1 }, threat: -5 }),
    c('Ask the frog to swallow the scouts', { stats: { mil: 6 }, flags: { belly: 1 }, alienRel: -5, threat: -3 }),
  ]),
];

export const chainCards2: CardDef[] = [
  ...spicemed, ...headsscholar, ...tidenavy, ...uploadbur, ...ghostspy, ...catmecheng,
  ...loopproph, ...incdip, ...driftpig, ...weemed, ...bellyfrog,
];
