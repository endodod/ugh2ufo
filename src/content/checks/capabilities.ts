// Decision cards that build up capability flags (see CAPABILITIES.md).
import type { CardDef, CardKind, EraRange, Effect } from '../../types';

function cap(kind: CardKind, id: string, era: EraRange, emoji: string, title: string, text: string, label: string, effect: Effect): CardDef {
  return { id, kind, era, emoji, title, text, weight: 0.7, choices: [{ label, effect }] };
}

export const capabilityCards: CardDef[] = [
  cap('policy', 'c_spy_1', [0, 2], '👂', 'Listening at Tents', 'Pay children to listen at other tribes\' tents. They are paid in berries and are excellent at it.', 'Hire the children', { stats: { food: -2, gold: -1 }, flags: { spies: 1 } }),
  cap('project', 'c_spy_2', [3, 5], '✉️', 'The Black Chamber', 'A secret room where letters are opened, read, resealed and occasionally improved.', 'Open the chamber', { stats: { gold: -5, sci: 2 }, flags: { spies: 1 } }),
  cap('research', 'c_spy_3', [6, 8], '📡', 'Signals Intelligence', 'Listen to everything, everywhere. Mostly it is people ordering food.', 'Listen in', { stats: { gold: -6, sci: 4 }, flags: { spies: 1 } }),

  cap('research', 'c_navy_1', [0, 2], '🪵', 'Hollow Logs', 'A log, but you sit inside it. The elders call it a fad.', 'Hollow them out', { stats: { sci: 2, food: 1 }, flags: { navy: 1 } }),
  cap('project', 'c_navy_2', [2, 4], '⛵', 'The Royal Shipyard', 'A shipyard with a very long slipway and a very short supply of patience.', 'Lay the keels', { stats: { gold: -6, mil: 3 }, flags: { navy: 1 } }),
  cap('project', 'c_navy_3', [5, 7], '🚢', 'Ironclads', 'Ships made of iron. Everyone agrees they should sink. They refuse.', 'Rivet them', { stats: { gold: -8, mil: 5 }, flags: { navy: 1 } }),
  cap('policy', 'c_navy_4', [7, 8], '🛳️', 'The Space Navy', 'The admirals refused to rename it. The starships now have anchors, for tradition.', 'Keep the anchors', { stats: { gold: -8, mil: 6 }, flags: { navy: 1 } }),

  cap('research', 'c_eng_1', [0, 2], '🪨', 'The Lever', 'Give us a long enough stick and a place to stand, and we will move the chief.', 'Find a long stick', { stats: { sci: 3 }, flags: { engineers: 1 } }),
  cap('policy', 'c_eng_2', [3, 5], '📐', 'Guild of Engineers', 'They wear little hats and argue about load-bearing walls until the walls give up.', 'Charter the guild', { stats: { gold: -4, sci: 2 }, flags: { engineers: 1 } }),
  cap('project', 'c_eng_3', [5, 7], '🏫', 'The Polytechnic', 'A school where students learn to build bridges, then are made to stand under them.', 'Open the doors', { stats: { gold: -6, sci: 4 }, flags: { engineers: 1, education: 1 } }),

  cap('policy', 'c_sch_1', [0, 2], '👵', 'The Elders Remember', 'Appoint someone to remember things. She charges by the thing.', 'Appoint a rememberer', { stats: { food: -2, sci: 2 }, flags: { scholars: 1 } }),
  cap('project', 'c_sch_2', [2, 4], '🏛️', 'The Academy', 'A garden where men walk in circles and think. The circles are getting deeper.', 'Plant the garden', { stats: { gold: -5, sci: 4 }, flags: { scholars: 1 } }),
  cap('project', 'c_sch_3', [4, 6], '🧐', 'The Royal Society', 'Gentlemen meet weekly to read papers to each other and set things on fire.', 'Grant the charter', { stats: { gold: -5, sci: 5 }, flags: { scholars: 1 } }),
  cap('research', 'c_sch_4', [7, 8], '🗃️', 'Open Archives', 'Every document, free to everyone. Nobody reads them, but they could.', 'Unlock the archives', { stats: { gold: -4, sci: 6 }, flags: { scholars: 1 } }),

  cap('policy', 'c_dip_1', [0, 2], '🪨', 'Gift Rocks', 'Give the neighbours a nice rock. They give one back. Diplomacy has begun.', 'Pick a nice rock', { stats: { gold: -2 }, flags: { diplomats: 1 }, rival: { target: 'random', rel: 5 } }),
  cap('policy', 'c_dip_2', [3, 5], '🏰', 'Permanent Embassies', 'Instead of sending an envoy every time, just leave one there. Feed him occasionally.', 'Open embassies', { stats: { gold: -5 }, flags: { diplomats: 1 }, rival: { target: 'friendliest', rel: 8 } }),
  cap('research', 'c_dip_3', [6, 8], '🤝', 'Summit Culture', 'Leaders now meet constantly to agree to meet again. It works, somehow.', 'Book the venue', { stats: { gold: -4, joy: 2 }, flags: { diplomats: 1 } }),

  cap('research', 'c_med_1', [0, 2], '🌿', 'Herb Lore', 'This leaf helps. This one kills. Write that down. Nobody can write yet.', 'Taste carefully', { stats: { pop: 1, sci: 1 }, flags: { medicine: 1 } }),
  cap('project', 'c_med_2', [3, 5], '🏥', 'The First Hospital', 'A building full of beds and people who know which leaf is which.', 'Build it', { stats: { gold: -6, pop: 2 }, flags: { medicine: 1 } }),
  cap('research', 'c_med_3', [5, 7], '🔬', 'Germ Theory', 'Tiny invisible animals are making everyone sick. The priests are offended on behalf of the curses.', 'Look closer', { stats: { sci: 4, pop: 2, faith: -1 }, flags: { medicine: 1 } }),
  cap('policy', 'c_med_4', [7, 8], '🩺', 'Universal Healthcare', 'Everyone gets a doctor. The doctors get a very long queue.', 'Cover everyone', { stats: { gold: -8, joy: 4, pop: 3 }, flags: { medicine: 1 } }),

  cap('research', 'c_log_1', [0, 2], '🧺', 'The Basket', 'Carry more than two things at once. The military implications are enormous.', 'Weave it', { stats: { food: 2 }, flags: { logistics: 1 } }),
  cap('project', 'c_log_2', [2, 4], '🛣️', 'Road Network', 'Straight roads in every direction. The armies love them. So do the bandits.', 'Pave them', { stats: { gold: -6, pop: 2 }, flags: { logistics: 1 } }),
  cap('policy', 'c_log_3', [5, 7], '🚂', 'Railway Timetables', 'Trains now leave at exactly the stated time. Passengers are traumatized.', 'Set the clocks', { stats: { gold: -4, sci: 2 }, flags: { logistics: 1, bureaucracy: 1 } }),
  cap('project', 'c_log_4', [7, 8], '🛸', 'Drone Delivery', 'Small flying machines bring you anything in ten minutes. The pigeons see this as a challenge.', 'Launch the drones', { stats: { gold: -6, joy: 2 }, flags: { logistics: 1 } }),

  cap('policy', 'c_pro_1', [0, 2], '📣', 'The Town Crier', 'One man, very loud, paid to agree with you in public.', 'Hire the loud man', { stats: { gold: -2, joy: 2 }, flags: { propaganda: 1 } }),
  cap('project', 'c_pro_2', [3, 5], '🖼️', 'Heroic Murals', 'Paintings of {leader} wrestling a lion. There was no lion. There was barely a wrestle.', 'Commission them', { stats: { gold: -4, faith: 2, joy: 2 }, flags: { propaganda: 1 } }),
  cap('policy', 'c_pro_3', [5, 7], '📰', 'Ministry of Information', 'A ministry that decides what information is. Mostly good news, in large type.', 'Open the ministry', { stats: { gold: -4, joy: -1 }, flags: { propaganda: 1, bureaucracy: 1 } }),
  cap('research', 'c_pro_4', [7, 8], '📱', 'Algorithmic Persuasion', 'A machine that knows exactly which video will make you agree with it.', 'Tune the feed', { stats: { sci: 3, joy: 2, weird: 2 }, flags: { propaganda: 1 } }),
];
