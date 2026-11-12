// Extra research, policy and project cards across all eras.
import type { CardDef, CardKind, Cond, Effect, EraRange } from '../../types';

function d(kind: CardKind, id: string, era: EraRange, emoji: string, title: string, text: string, label: string, effect: Effect, req?: Cond): CardDef {
  return { id: `d_${id}`, kind, era, emoji, title, text, req, choices: [{ label, effect }] };
}
const R = (id: string, era: EraRange, emoji: string, title: string, text: string, label: string, effect: Effect, req?: Cond) => d('research', id, era, emoji, title, text, label, effect, req);
const P = (id: string, era: EraRange, emoji: string, title: string, text: string, label: string, effect: Effect, req?: Cond) => d('policy', id, era, emoji, title, text, label, effect, req);
const J = (id: string, era: EraRange, emoji: string, title: string, text: string, label: string, effect: Effect, req?: Cond) => d('project', id, era, emoji, title, text, label, effect, req);

export const decisionCards: CardDef[] = [
  // Stone
  R('r_knots', [0, 1], '🪢', 'Knot Records', 'Tying knots in string to remember things. Then forgetting what the knots were for.', 'Tie a knot', { stats: { sci: 3, gold: 1, joy: -1 } }),
  R('r_sling', [0, 1], '🪨', 'The Sling', 'A rock, but with ambitions.', 'Wind up', { stats: { mil: 4, sci: 1, food: 1 } }),
  R('r_smoke', [0, 1], '🐟', 'Smoked Fish', 'Fish, but preserved in a cloud of regret. Lasts all winter. Smells all year.', 'Light the smokehouse', { stats: { food: 5, sci: 1, joy: -1 } }),
  R('r_wolves', [0, 1], '🐺', 'Befriend the Wolves', 'Feed a wolf once and it follows you forever, a little less wolfy each generation.', 'Throw it a bone', { stats: { food: -2, mil: 3, joy: 3 } }),
  P('p_firekeeper', [0, 1], '🔥', 'Appoint a Fire Keeper', 'One person whose only job is to not let the fire go out. Very stressful. Very well paid, in sticks.', 'Appoint someone anxious', { stats: { faith: 2, joy: 3, gold: -1 } }),
  P('p_shiny', [0, 1], '💎', 'Shiny Rocks Are Money', 'From today, shiny rocks can be swapped for food. The dull rocks are furious.', 'Declare it', { stats: { gold: 4, joy: -1 } }),
  P('p_naming', [0, 1], '🗣️', 'Name Everything', 'Currently every animal is called "that". Hunting briefings are confusing.', 'Start with the big ones', { stats: { sci: 3, joy: 2, food: 1 } }),
  J('j_menhir', [0, 1], '🗿', 'Put a Big Rock Upright', 'Nobody knows why. Everyone agrees it must be done.', 'Heave', { stats: { faith: 4, joy: 2, food: -2 } }),
  J('j_drums', [0, 1], '🥁', 'Signal Drums', 'Messages can now cross the valley in minutes. Most of them say "what?".', 'Drum it', { stats: { mil: 2, joy: 2, sci: 1 } }),
  J('j_midden', [0, 1], '🗑️', 'The Great Midden', 'A rubbish heap of truly historic scale. Archaeologists will thank us. The neighbours will not.', 'Keep piling', { stats: { gold: 2, food: 2, joy: -1 } }),
  // Bronze
  R('r_beer', [1, 2], '🍺', 'Beer', 'Bread, but liquid and dangerous. The first civilisations were built to make more of it.', 'Ferment', { stats: { joy: 6, food: -2, sci: 1 } }),
  R('r_calendar', [1, 2], '📅', 'The Calendar', 'Now we know exactly when the harvest is due. And exactly how late it is.', 'Count days', { stats: { sci: 4, faith: 2, food: 1 } }),
  R('r_sundial', [1, 2], '🕛', 'The Sundial', 'Tells the time perfectly, except at night, in clouds, and indoors.', 'Plant a stick', { stats: { sci: 3, gold: 2 } }),
  R('r_glass', [1, 3], '🫙', 'Glass', 'Sand, but you can see through it. The desert people are smug.', 'Melt the beach', { stats: { sci: 3, gold: 3, joy: 1 } }),
  P('p_stone_law', [1, 2], '📜', 'Carve the Laws in Stone', 'Carved in stone so nobody can change them, which instantly becomes the main problem.', 'Carve carefully', { stats: { gold: 2, mil: 2, joy: -2 }, flags: { bureaucracy: 1 } }),
  P('p_goat_economy', [1, 2], '🐐', 'Goat Standard', 'All prices are now in goats. Change is given in smaller goats.', 'Peg it to goats', { stats: { gold: 3, food: 2, weird: 1 } }),
  J('j_ziggurat', [1, 2], '🛕', 'Ziggurat', 'A pyramid with stairs, for gods who do not like climbing.', 'Build upward', { stats: { faith: 6, gold: -4, joy: 1 } }),
  J('j_canal', [1, 3], '🛶', 'Dig a Canal', 'Moving the river to where the crops are, since the crops refuse to move.', 'Dig', { stats: { food: 6, pop: 1, gold: -3 } }),
  // Classical
  R('r_lever', [2, 3], '🔧', 'The Lever', 'Give us a place to stand and we will move the world. Please do not.', 'Pull', { stats: { sci: 5, gold: 1 } }),
  R('r_geometry', [2, 3], '📐', 'Geometry', 'Triangles, finally explained. Children cry about it for the next three thousand years.', 'Draw in the sand', { stats: { sci: 6, joy: -1 } }),
  R('r_theatre', [2, 3], '🎭', 'Tragedy and Comedy', 'Plays in which everyone dies, and plays in which everyone gets married. Sometimes both.', 'Raise the curtain', { stats: { joy: 5, sci: 2, faith: -1 } }),
  P('p_census', [2, 3], '📋', 'The First Census', 'Count everyone. Then count them again, because the first count was suspicious.', 'Start counting', { stats: { gold: 4, joy: -2 }, flags: { bureaucracy: 1 } }),
  P('p_games', [2, 3], '🏅', 'The Games', 'Running, jumping and throwing things, in the nude, for honour and an olive branch.', 'Light the torch', { stats: { joy: 6, mil: 2, gold: -3 } }),
  P('p_ostracism', [2, 3], '🏺', 'Ostracism', 'Once a year, everyone votes on the most annoying citizen, who must leave town. Turnout: 100%.', 'Hand out the shards', { stats: { joy: 4, pop: -1, mil: 1 } }),
  J('j_lighthouse', [2, 3], '🗼', 'A Very Big Lighthouse', 'Visible for miles. Visible, possibly, from much further than that.', 'Light it', { stats: { gold: 5, sci: 2, faith: -1 }, threat: 1 }),
  J('j_library', [2, 4], '📚', 'The Great Library', 'Every scroll in the world under one roof. A roof that is very, very flammable.', 'Collect scrolls', { stats: { sci: 7, gold: -4 } }),
  // Medieval
  R('r_clock', [3, 4], '🕰️', 'Mechanical Clock', 'A machine that tells you how late you are with a loud bell.', 'Wind it', { stats: { sci: 5, gold: 2, joy: -1 } }),
  R('r_spectacles', [3, 4], '👓', 'Spectacles', 'Old scholars can read again. They immediately find mistakes in everything.', 'Grind lenses', { stats: { sci: 4, joy: 2, pop: 1 } }),
  P('p_guilds', [3, 4], '🔨', 'Guilds', 'Every trade gets a guild, a hat and an extremely long initiation ceremony.', 'Charter them', { stats: { gold: 6, sci: -1 }, flags: { bureaucracy: 1 } }),
  P('p_jousting', [3, 4], '🐎', 'Jousting Season', 'Two men on horses run at each other with poles. The crowd loves it. The horses have questions.', 'Sound the trumpets', { stats: { mil: 4, joy: 4, pop: -1 } }),
  P('p_jester', [3, 4], '🃏', 'The Jester Veto', 'The court jester may now veto any law by making fun of it. Most laws do not survive.', 'Grant the veto', { stats: { joy: 5, weird: 2, gold: -2 } }),
  J('j_cathedral', [3, 4], '⛪', 'A 300-Year Cathedral', 'The architect promises it will be finished by his great-great-great-grandson.', 'Lay the first stone', { stats: { faith: 10, gold: -7, joy: 1 } }),
  J('j_moat', [3, 4], '🐊', 'A Moat With Something In It', 'A regular moat is just a wet ditch. A moat with something in it is a statement.', 'Fill it with something', { stats: { mil: 5, weird: 2, gold: -2 } }),
  // Renaissance
  R('r_microscope', [4, 5], '🔬', 'The Microscope', 'There are tiny things everywhere. On everything. In the soup. Especially in the soup.', 'Look closer', { stats: { sci: 7, joy: -2 } }),
  R('r_bookkeeping', [4, 5], '📒', 'Double-Entry Bookkeeping', 'Every coin is now written down twice. Somehow there are fewer coins.', 'Balance the books', { stats: { gold: 6, sci: 2, joy: -1 } }),
  R('r_perspective', [4, 4], '🖼️', 'Perspective', 'Paintings now have depth. Portraits look straight at you. It is unsettling at dinner.', 'Find the vanishing point', { stats: { joy: 3, sci: 3, weird: 1 } }),
  P('p_patronage', [4, 5], '🎨', 'Patronage', 'Rich families now pay geniuses to make things. The geniuses mostly make portraits of rich families.', 'Sponsor a genius', { stats: { joy: 4, sci: 3, gold: -4 } }),
  P('p_flags', [4, 5], '🚩', 'Plant a Flag Somewhere', 'Sail somewhere, put a flag in it, declare it yours. The people already there are unconvinced.', 'Plant the flag', { stats: { gold: 6, mil: 2 }, rival: { target: 'random', rel: -6 } }),
  J('j_opera', [4, 5], '🎼', 'Opera House', 'People sing at each other for four hours, in a language nobody speaks, and pay for the privilege.', 'Build it', { stats: { joy: 6, gold: -4, faith: 1 } }),
  J('j_globe', [4, 4], '🌐', 'A Very Large Globe', 'The biggest globe ever made. Our country is painted slightly bigger than it is.', 'Spin it', { stats: { sci: 4, joy: 2, gold: -2 } }),
  // Industrial
  R('r_telegraph', [5, 6], '📠', 'The Telegraph', 'Dots and dashes across the continent. Every message is short and slightly alarming.', 'Tap it out', { stats: { sci: 5, gold: 3 }, threat: 1 }),
  R('r_canning', [5, 6], '🥫', 'Canned Food', 'Food that lasts forever. Tin openers are invented forty years later.', 'Seal it up', { stats: { food: 8, sci: 2, gold: -2 } }),
  R('r_photography', [5, 6], '📷', 'Photography', 'Hold still for nine minutes. Do not smile. Smiling has not been invented for photos yet.', 'Say nothing', { stats: { sci: 3, joy: 3, weird: 1 } }),
  P('p_weekend', [5, 6], '📆', 'Invent the Weekend', 'Two whole days off. The factory owners call it the end of civilisation. Everyone else calls it Saturday.', 'Declare Saturday', { stats: { joy: 7, gold: -4 } }),
  P('p_moustaches', [5, 5], '🥸', 'Moustache Act', 'Every official must wear a moustache. Women and children are issued very small ones.', 'Twirl', { stats: { joy: 2, mil: 2, weird: 3 } }),
  J('j_railway', [5, 6], '🚂', 'Railway to Nowhere', 'A grand railway that ends in a field. The field is now very well connected.', 'Lay track', { stats: { gold: 4, sci: 2, joy: -1, food: 1 } }),
  J('j_zoo', [5, 6], '🦒', 'National Zoo', 'Animals from all over the world, behind bars, looking at us looking at them.', 'Open the gates', { stats: { joy: 5, sci: 2, food: -3 } }),
  // Atomic
  R('r_plastic', [6, 7], '🧴', 'Plastic', 'A material that lasts forever, used mostly for things you throw away immediately.', 'Mould it', { stats: { gold: 6, sci: 3, joy: 1 }, flags: { pollution: 1 } }),
  R('r_microwave', [6, 7], '♨️', 'The Microwave', 'Discovered when a radar engineer\'s sandwich got warm. He never said what was in it.', 'Press start', { stats: { food: 4, sci: 3, weird: 2 } }),
  R('r_lasers', [6, 7], '🔴', 'Lasers', 'A beam of light that can cut steel, read music, and make cats lose their minds.', 'Focus the beam', { stats: { sci: 6, mil: 4, gold: -3 } }),
  P('p_cover', [6, 6], '🧯', 'Duck and Cover', 'In case of attack, citizens are to hide under a desk. Desks have never been more popular.', 'Practise ducking', { stats: { mil: 4, joy: -3, pop: 2 } }),
  P('p_jazz', [6, 7], '🎷', 'Jazz Diplomacy', 'Send musicians to rival nations. Nobody can stay angry during a saxophone solo.', 'Book the tour', { stats: { joy: 4, gold: -2 }, rival: { target: 'hostile', rel: 12 }, chain: { id: 'ch_f_jazz', delay: 3 } }),
  J('j_dam', [6, 7], '🏞️', 'An Enormous Dam', 'Power for millions, water for farms, and a whole valley that is now a lake. The village is fine. The village is a diving spot now.', 'Pour the concrete', { stats: { food: 6, sci: 4, gold: -6, joy: -1 } }),
  J('j_dish', [6, 7], '📡', 'Big Listening Dish', 'A dish so big it can hear a whisper on the moon. It hears something. It is not a whisper.', 'Point it up', { stats: { sci: 6, gold: -5 }, alienRel: 3, threat: 1 }),
  // Information
  R('r_search', [7, 8], '🔎', 'The Search Engine', 'Every fact in the world, one box away. People mostly use it to settle arguments about actors.', 'Type something', { stats: { sci: 8, joy: -1 } }),
  R('r_memes', [7, 8], '🖼️', 'Memes', 'A picture of a frog with a caption has changed the course of three elections.', 'Share it', { stats: { joy: 7, weird: 4, sci: -2 } }),
  R('r_scissors', [7, 8], '✂️', 'Gene Scissors', 'Cut a gene, paste a gene. The undo button has not been invented yet.', 'Snip', { stats: { sci: 6, weird: 3, pop: 2 }, flags: { genes: 1 } }),
  P('p_privacy', [7, 8], '🍪', 'Privacy Settings', 'Every citizen now has 400 privacy settings. All of them default to "share everything with everyone".', 'Accept all', { stats: { gold: 8, joy: -4 } }),
  P('p_gig', [7, 8], '🛵', 'The Gig Economy', 'Nobody has a job. Everybody has six. The soldiers deliver noodles between battles.', 'Download the app', { stats: { gold: 9, joy: -4, mil: -2 } }),
  J('j_datacentre', [7, 8], '🗄️', 'Hyperscale Data Centre', 'A building the size of a town that does nothing but think and get hot.', 'Plug it in', { stats: { sci: 9, gold: -6 }, flags: { pollution: 1 } }),
  J('j_influence', [7, 8], '🤳', 'Ministry of Influence', 'The government now has a lifestyle channel. The finance minister\'s morning routine has twelve million views.', 'Hit record', { stats: { joy: 5, gold: 4, faith: -3 } }),
  // Space
  R('r_warp', [8, 8], '🌀', 'Warp Theory', 'Space can be folded, in theory. In practice, the test fold went somewhere else and has not come back.', 'Fold carefully', { stats: { sci: 12, gold: -6, weird: 3 } }),
  R('r_shields', [8, 8], '🛡️', 'Planetary Shield', 'A force field around the whole planet. It flickers when anyone uses a hairdryer.', 'Raise the shield', { stats: { mil: 12, gold: -10 }, threat: -3 }),
  R('r_translator', [7, 8], '🗨️', 'Universal Translator', 'It can translate anything. The first alien message it translates is a parking notice.', 'Turn it on', { stats: { sci: 6 }, flags: { alien_contact: 1 }, alienRel: 6 }),
  P('p_protocol', [8, 8], '🤝', 'First Contact Protocol', 'A 900-page guide on how to greet aliens. Page one: do not offer them a handshake until you have counted their hands.', 'Print copies', { stats: { sci: 3, joy: -2 }, alienRel: 8, flags: { bureaucracy: 1 }, chain: { id: 'ch_f_protocol', delay: 2 } }),
  P('p_draft_all', [8, 8], '🪖', 'Draft Everyone', 'Every citizen, including grandmothers, poets and the very confused, is now in the army.', 'Issue helmets', { stats: { mil: 15, joy: -10, pop: -2 } }),
  P('p_banner', [7, 8], '🎉', 'The Welcome Banner', 'A banner the size of a continent that says WELCOME in every known alphabet and one we made up.', 'Hang it', { stats: { joy: 3, mil: -3 }, alienRel: 7 }),
  J('j_elevator', [8, 8], '🛗', 'Space Elevator', 'A lift to orbit. The music is still terrible.', 'Press the top button', { stats: { sci: 8, gold: -8, mil: 4 } }),
  J('j_decoy', [8, 8], '🎭', 'Decoy Earth', 'A full-sized inflatable planet, parked one orbit over. It even has fake weather.', 'Inflate it', { stats: { weird: 10, gold: -12 }, threat: -5 }),
  J('j_bunker', [7, 8], '🕳️', 'The National Bunker', 'A bunker for everyone, stocked with tinned peaches and board games with pieces missing.', 'Dig in', { stats: { mil: 6, food: -6, pop: 3 }, threat: -1 }),
];
