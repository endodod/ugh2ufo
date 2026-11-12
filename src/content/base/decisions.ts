import type { CardDef, CardKind, Cond, EraRange, Effect } from '../../types';

function d(kind: CardKind, id: string, era: EraRange, emoji: string, title: string, text: string, label: string, effect: Effect, req?: Cond, extra: Partial<CardDef> = {}): CardDef {
  return { id, kind, era, emoji, title, text, req, choices: [{ label, effect }], ...extra };
}

const R = (...a: Parameters<typeof d> extends [CardKind, ...infer T] ? T : never) => d('research', ...a);
const P = (...a: Parameters<typeof d> extends [CardKind, ...infer T] ? T : never) => d('policy', ...a);
const J = (...a: Parameters<typeof d> extends [CardKind, ...infer T] ? T : never) => d('project', ...a);

function gov(id: string, govId: string, era: EraRange, emoji: string, title: string, text: string, label: string, stats: Effect['stats'], req?: Cond): CardDef {
  return d('government', id, era, emoji, title, text, label, { gov: govId, stats }, req);
}

export const research: CardDef[] = [
  R('r_fire', [0, 0], '🔥', 'Fire, Properly', 'We have fire. We do not have it on purpose yet.', 'Study fire', { stats: { sci: 4, food: 2 } }),
  R('r_spears', [0, 1], '🗡️', 'Pointier Sticks', 'The sticks are fine. But what if they were worse to be hit by?', 'Sharpen everything', { stats: { mil: 5, sci: 1 } }),
  R('r_farming', [0, 1], '🌱', 'Put Seeds In Dirt', 'Grunda noticed that seeds dropped in dirt turn into more seeds. Nobody believes her.', 'Believe Grunda', { stats: { food: 6, sci: 2, joy: -2 } }),
  R('r_counting', [0, 1], '🧮', 'Counting Past Three', 'Currently our numbers are: one, two, three, and "a lot".', 'Invent four', { stats: { sci: 5, gold: 1 } }),
  R('r_cave_art', [0, 0], '🖍️', 'Cave Painting', 'Painting buffalo on walls. Unclear why. Very popular.', 'Fund the arts', { stats: { joy: 6, faith: 2, sci: 1 } }),
  R('r_bronze', [1, 1], '🥉', 'Bronze Working', 'Copper plus tin equals third place, but in metal.', 'Smelt it', { stats: { mil: 5, gold: 2, sci: 2 } }),
  R('r_writing', [1, 2], '✍️', 'Writing', 'Finally, a way to keep receipts.', 'Write it down', { stats: { sci: 6, gold: 1 }, flags: { bureaucracy: 1 } }),
  R('r_wheel', [1, 1], '☸️', 'The Wheel', 'Rolls downhill. Also uphill, with suffering.', 'Roll with it', { stats: { gold: 4, food: 2, sci: 2 } }),
  R('r_astronomy', [1, 3], '🔭', 'Staring at the Sky', 'Some of the stars blink. Stars should not blink.', 'Keep staring', { stats: { sci: 5 }, flags: { alien_contact: 0 }, alienRel: 2, threat: -1, chain: { id: 'ch_f_astro', delay: 2 } }),
  R('r_philosophy', [2, 2], '🤔', 'Philosophy', 'Men in sheets asking whether chairs exist. Funded by the chair lobby.', 'Ask questions', { stats: { sci: 5, faith: -1, joy: 2 } }),
  R('r_iron', [2, 2], '⛓️', 'Iron Working', 'Like bronze, but it rusts. Progress.', 'Forge ahead', { stats: { mil: 7, sci: 1 } }),
  R('r_engineering', [2, 3], '🏗️', 'Aqueducts', 'Water that goes where we tell it. Mostly.', 'Build arches', { stats: { food: 5, pop: 2, sci: 3, gold: -3 } }),
  R('r_medicine', [2, 3], '🩺', 'Medicine', 'Leeches out. Washing hands in. Controversial.', 'Wash hands', { stats: { pop: 3, sci: 4, faith: -1 } }),
  R('r_alchemy', [3, 3], '⚗️', 'Alchemy', 'Turning lead into gold. Results so far: lead, eyebrows lost.', 'Try once more', { stats: { sci: 4, weird: 4, gold: -2 } }),
  R('r_castles', [3, 3], '🏰', 'Castles', 'A house, but angry.', 'Build walls', { stats: { mil: 8, gold: -3 } }),
  R('r_crop_rotation', [3, 4], '🔄', 'Crop Rotation', 'Turns out dirt gets tired too.', 'Let the dirt rest', { stats: { food: 8, sci: 2 } }),
  R('r_printing', [4, 4], '📰', 'The Printing Press', 'Now anyone can spread information. What could go wrong.', 'Print everything', { stats: { sci: 8, faith: -2, joy: 2 }, flags: { bureaucracy: 1 } }),
  R('r_gunpowder', [3, 4], '💥', 'Gunpowder', 'Originally meant for fireworks. Briefly.', 'Make it go boom', { stats: { mil: 10, joy: -2 } }),
  R('r_navigation', [4, 4], '🧭', 'Navigation', 'The world is round, probably. Let us bump into it.', 'Set sail', { stats: { gold: 6, sci: 3 }, chain: { id: 'ch_f_sailors', delay: 3 } }),
  R('r_anatomy', [4, 5], '🫀', 'Anatomy', 'We opened up a person and found more person inside.', 'Look closer', { stats: { sci: 6, pop: 2 }, flags: { genes: 1 } }),
  R('r_steam', [5, 5], '🚂', 'Steam Power', 'Boiling water, but make it industrial.', 'Build engines', { stats: { gold: 8, sci: 4, joy: -2 } }),
  R('r_electricity', [5, 6], '⚡', 'Electricity', 'Lightning, but you pay monthly.', 'Harness it', { stats: { sci: 10, gold: 2 } }),
  R('r_vaccines', [5, 6], '💉', 'Vaccines', 'Tiny bit of disease to avoid big disease. Some uncles disagree.', 'Vaccinate', { stats: { pop: 6, sci: 3, joy: -1 } }),
  R('r_automatons', [5, 5], '⚙️', 'Clockwork Men', 'Brass servants that walk, bow and occasionally scream.', 'Wind them up', { stats: { sci: 4, weird: 2 }, flags: { robots: 1 } }),
  R('r_radio', [5, 6], '📻', 'Radio', 'We can now broadcast to the whole world. And, technically, beyond.', 'Turn it up', { stats: { sci: 5, joy: 3 }, threat: 2, alienRel: 2, chain: { id: 'ch_f_radio', delay: 2 } }),
  R('r_atom', [6, 6], '☢️', 'Splitting the Atom', 'It was in one piece. Now it is in two. This turns out to be a huge deal.', 'Split it', { stats: { sci: 12, mil: 10, joy: -4 } }),
  R('r_rocketry', [6, 7], '🚀', 'Rocketry', 'Fireworks for adults with clipboards.', 'Aim up', { stats: { sci: 8, mil: 4 }, threat: -2 }),
  R('r_dna', [6, 7], '🧬', 'The Double Helix', 'Life has a source code. Nobody commented it.', 'Read the code', { stats: { sci: 8 }, flags: { genes: 1 } }),
  R('r_computers', [6, 7], '🖥️', 'Computers', 'Room-sized machines that can add numbers really, really fast.', 'Compute', { stats: { sci: 10, gold: 3 }, flags: { robots: 1 } }),
  R('r_internet', [7, 7], '🌐', 'The Internet', 'A global network for sharing knowledge. Mostly used for cat pictures.', 'Connect everyone', { stats: { sci: 10, joy: 4, weird: 4 }, flags: { cats: 1 } }),
  R('r_ai', [7, 8], '🧠', 'Machine Learning', 'We taught a computer to think. It immediately started writing poetry. Bad poetry.', 'Train it', { stats: { sci: 14, weird: 3 }, flags: { robots: 1 } }),
  R('r_fusion', [7, 8], '🌞', 'Fusion Power', 'Thirty years away, as usual. Wait, no, it works now.', 'Turn it on', { stats: { sci: 10, gold: 10, food: 6 } }),
  R('r_lasers', [7, 8], '🔫', 'Big Lasers', 'For defense. And for reading barcodes. Mostly defense.', 'Point them up', { stats: { mil: 18, sci: 4, gold: -6 } }),
  R('r_shields', [8, 8], '🛡️', 'Planetary Shields', 'A dome over the whole planet. Small birds are very confused.', 'Raise the dome', { stats: { mil: 20, gold: -8 }, threat: -4 }),
  R('r_warp', [8, 8], '🌀', 'Warp Theory', 'Bending space. Mostly ends up bending the scientists.', 'Bend it', { stats: { sci: 15, weird: 6 } }),
  R('r_xenobiology', [8, 8], '👽', 'Xenobiology', 'Studying aliens before they study us. Back.', 'Study them', { stats: { sci: 10 }, alienRel: 6, threat: -3, chain: { id: 'ch_f_xeno', delay: 2 } }),
];

export const policies: CardDef[] = [
  P('p_hunt', [0, 1], '🦣', 'Big Hunt', 'The mammoth is large, hairy and full of dinner.', 'Hunt the mammoth', { stats: { food: 8, mil: 2, pop: -1 } }),
  P('p_storytelling', [0, 2], '📣', 'Campfire Stories', 'Tell the young ones about the old ones. Exaggerate everything.', 'Tell stories', { stats: { joy: 5, faith: 3 } }),
  P('p_tribute', [1, 3], '💰', 'Collect Tribute', 'People give you things, and in return you do not hit them.', 'Collect', { stats: { gold: 8, joy: -5 } }),
  P('p_conscription', [1, 6], '🪖', 'Conscription', 'Everyone gets a free spear and a mandatory hobby.', 'Draft them', { stats: { mil: 8, joy: -6, food: -2 } }),
  P('p_bread_circus', [2, 4], '🎪', 'Bread and Circuses', 'If they are fed and entertained, they will not ask questions.', 'Start the show', { stats: { joy: 10, gold: -5, food: -3 }, flags: { party: 1 } }),
  P('p_tax_cut', [2, 8], '✂️', 'Tax Cuts', 'Popular now, a problem for someone later.', 'Cut taxes', { stats: { joy: 8, gold: -6 } }),
  P('p_tax_hike', [2, 8], '📈', 'Tax Increase', 'Everyone hates it. Everyone uses the roads.', 'Raise taxes', { stats: { gold: 10, joy: -7 } }),
  P('p_holy_days', [1, 5], '🕍', 'Holy Holidays', 'More festivals for more gods. The calendar is now 40% holiday.', 'Celebrate', { stats: { faith: 6, joy: 4, gold: -3 } }),
  P('p_trade_open', [1, 7], '🛶', 'Open Trade', 'Let merchants go everywhere. They will anyway.', 'Open the borders', { stats: { gold: 7 }, rival: { target: 'random', rel: 10 } }),
  P('p_isolation', [2, 6], '🧱', 'Isolationism', 'Nobody in, nobody out. Very peaceful. Very boring.', 'Close the gates', { stats: { mil: 4, joy: -2, gold: -2 }, threat: -1 }),
  P('p_universities', [3, 6], '🎓', 'Universities', 'Places where young people learn and older people complain about it.', 'Found one', { stats: { sci: 8, gold: -4 } }),
  P('p_inquisition', [3, 4], '🔥', 'The Inquisition', 'Nobody expected it.', 'Expect it', { stats: { faith: 10, sci: -5, joy: -6 } }),
  P('p_colonies', [4, 5], '⛵', 'Colonies', 'Find land. Plant flag. Act surprised there are people there.', 'Plant flags', { stats: { gold: 10, pop: 3, mil: -2 }, rival: { target: 'random', rel: -10 } }),
  P('p_labour_laws', [5, 6], '⏰', 'Labour Laws', 'Children may no longer work in mines. The mines are furious.', 'Protect workers', { stats: { joy: 10, gold: -5 } }),
  P('p_propaganda', [5, 7], '📢', 'Propaganda Office', 'Everything is fine. Everything has always been fine.', 'Hang posters', { stats: { joy: 6, mil: 3, sci: -2 } }),
  P('p_public_health', [5, 8], '🏥', 'Public Healthcare', 'Expensive. Also, people stop dying of paper cuts.', 'Heal everyone', { stats: { pop: 6, joy: 5, gold: -7 } }),
  P('p_space_race', [6, 7], '🌕', 'Space Race', 'Whoever gets to the moon first gets the moon.', 'Race', { stats: { sci: 10, gold: -6 }, rival: { target: 'strongest', rel: -10 }, threat: -2 }),
  P('p_ubi', [7, 8], '💸', 'Universal Basic Income', 'Free money. The economists are screaming in a very specific frequency.', 'Pay everyone', { stats: { joy: 12, gold: -10 } }),
  P('p_surveillance', [7, 8], '📷', 'Total Surveillance', 'We know everything. We know about the snacks, Brenda.', 'Watch everyone', { stats: { mil: 8, joy: -8 }, flags: { bureaucracy: 1 } }),
  P('p_defense_budget', [6, 8], '🛰️', 'Planetary Defense Budget', 'Nobody knows what it is for. It is for the thing in the sky.', 'Fund defense', { stats: { mil: 15, gold: -10 }, threat: -2 }),
];

export const projects: CardDef[] = [
  J('j_monument', [0, 1], '🗿', 'Big Rock Head', 'A giant stone head facing the sea. Nobody knows why. Future generations will also not know why.', 'Carve it', { stats: { faith: 5, joy: 4, food: -3, weird: 2 } }),
  J('j_granary', [0, 2], '🛖', 'Granary', 'A place to keep grain away from rats. The rats have opinions.', 'Build it', { stats: { food: 10, gold: -2 } }),
  J('j_pyramid', [1, 1], '🔺', 'Pyramid', 'A very big pointy tomb. Mostly a flex.', 'Pile the stones', { stats: { faith: 8, joy: 4, gold: -6, pop: -1 }, alienRel: 3, chain: { id: 'ch_f_pyramid', delay: 3 } }),
  J('j_great_wall', [2, 3], '🧱', 'The Long Wall', 'Keeps people out. Visible from orbit, which the aliens noted.', 'Build it long', { stats: { mil: 10, gold: -7 }, alienRel: 2 }),
  J('j_library', [2, 3], '📚', 'Great Library', 'All the knowledge in one building. Very flammable.', 'Fill the shelves', { stats: { sci: 10, gold: -5 } }),
  J('j_colosseum', [2, 3], '🏟️', 'Colosseum', 'A place to watch people fight lions. Lions are not consulted.', 'Build the arena', { stats: { joy: 10, gold: -5 }, flags: { party: 1 } }),
  J('j_cathedral', [3, 4], '⛪', 'Cathedral', 'Will take 200 years. The architect has a plan. The architect will be dead.', 'Lay the first stone', { stats: { faith: 12, gold: -6, joy: 2 } }),
  J('j_tavern_network', [3, 5], '🍺', 'National Tavern Network', 'A tavern in every village. Productivity drops, morale soars.', 'Pour drinks', { stats: { joy: 10, gold: 2, sci: -2 }, flags: { party: 1 } }),
  J('j_canal', [4, 5], '🛳️', 'The Big Canal', 'We are cutting the continent in half for shipping reasons.', 'Dig', { stats: { gold: 12, food: 2, pop: -1 } }),
  J('j_railroad', [5, 5], '🛤️', 'Railroad Network', 'Trains everywhere. Every one of them late.', 'Lay tracks', { stats: { gold: 10, food: 4, mil: 3, joy: -2 } }),
  J('j_tower', [5, 6], '🗼', 'A Big Iron Tower', 'Built for a fair. Everyone hates it. Everyone will love it later.', 'Build it anyway', { stats: { joy: 6, gold: -4, weird: 2 } }),
  J('j_bunker', [6, 7], '🕳️', 'Fallout Bunkers', 'Every family gets a hole in the ground and some canned beans.', 'Dig bunkers', { stats: { mil: 6, pop: 2, joy: -3, gold: -5 } }),
  J('j_satellite', [6, 7], '🛰️', 'Satellite Network', 'Little metal moons that watch everything. They also watch the sky.', 'Launch them', { stats: { sci: 6, mil: 4, gold: -5 }, threat: -2 }),
  J('j_theme_park', [6, 8], '🎢', 'National Theme Park', 'A mouse-shaped economy. Wait, no mice. Cat-shaped, then.', 'Open the gates', { stats: { joy: 12, gold: 4 }, flags: { party: 1 } }),
  J('j_megacity', [7, 8], '🏙️', 'Megacity', 'One city, forty million people, three parking spaces.', 'Build up', { stats: { pop: 10, gold: 6, joy: -5 } }),
  J('j_space_elevator', [8, 8], '🛗', 'Space Elevator', 'A very long elevator. The music lasts six days.', 'Go up', { stats: { sci: 10, gold: 6, mil: 5 } }),
  J('j_orbital_guns', [8, 8], '🎯', 'Orbital Cannons', 'Big guns in space. Purely defensive. Mostly.', 'Arm the sky', { stats: { mil: 25, gold: -12 }, threat: -3 }),
  J('j_ark', [8, 8], '🛸', 'Escape Ark', 'Just in case. A big ship with a bit of everyone on it.', 'Build the ark', { stats: { pop: -3, sci: 8, joy: 4 }, threat: -2 }),
];

export const governments: CardDef[] = [
  gov('g_chiefdom', 'chiefdom', [0, 1], '🪶', 'Choose a Chief', 'Ugg has the biggest hat. Many say this is a good reason.', 'Crown the hat', { mil: 3 }),
  gov('g_theocracy', 'theocracy', [1, 5], '⛪', 'Let the Priests Rule', 'The gods have expressed strong interest in running things.', 'Hand over power', { faith: 6 }),
  gov('g_monarchy', 'monarchy', [1, 5], '👑', 'Crown a King', 'One family, forever. Their chin is getting worse every generation.', 'Long live the king', { gold: 4, joy: -2 }),
  gov('g_republic', 'republic', [2, 4], '🏛️', 'Found a Republic', 'Elected senators in matching sheets.', 'Vote on it', { sci: 3, joy: 3 }),
  gov('g_empire', 'empire', [2, 6], '🦅', 'Declare an Empire', 'Bigger maps. Bigger hats. Bigger everything.', 'Proclaim the empire', { mil: 6, joy: -3 }),
  gov('g_democracy', 'democracy', [5, 8], '🗳️', 'Democracy', 'Every citizen gets a vote. Some citizens get very loud about it.', 'Hold elections', { joy: 6 }),
  gov('g_communism', 'communism', [5, 7], '⚒️', 'The Workers Take Over', 'Everyone owns the factory. The factory is still awful.', 'Seize the means', { food: 5, gold: -5 }),
  gov('g_corporatocracy', 'corporatocracy', [6, 8], '💼', 'Sell the Government', 'A company made a very generous offer for the whole nation.', 'Accept the buyout', { gold: 15, joy: -4 }),
  gov('g_technocracy', 'technocracy', [6, 8], '🧪', 'Rule by Experts', 'Scientists in charge. Meetings now have graphs.', 'Trust the graphs', { sci: 6 }),
  gov('g_anarchy', 'anarchy', [3, 8], '🏴', 'Abolish Everything', 'What if, hear me out, nobody was in charge.', 'Burn the rulebook', { joy: 6, gold: -6, weird: 4 }),
  gov('g_cat_monarchy', 'cat_monarchy', [3, 8], '😼', 'Crown the Cat', 'The council has voted. The cat did not vote but sat on the ballots, which counts.', 'All hail', { weird: 6, joy: 5 }, { flags: { cats: 3 } }),
  gov('g_hive_mind', 'hive_mind', [6, 8], '🐝', 'Join the Hive', 'The gene mods let everyone hear everyone. It is loud. Then it is quiet.', 'Become one', { sci: 6, weird: 6, joy: -4 }, { flags: { genes: 3 } }),
  gov('g_ai_overlord', 'ai_overlord', [7, 8], '🖥️', 'Let the Computer Decide', 'It has run 40 billion simulations. It says it will be fine.', 'Plug it in', { sci: 8, gold: 6, joy: -5 }, { flags: { robots: 2 } }),
  gov('g_bureaucracy_state', 'bureaucracy_state', [4, 8], '🗂️', 'Rule by Committee', 'A committee to oversee the committee that oversees the government.', 'Form the committee', { gold: 4 }, { flags: { bureaucracy: 2 } }),
  gov('g_cult_state', 'cult_state', [3, 8], '🔮', 'The Cult Takes Over', 'The robes are everywhere now. They are quite comfortable.', 'Put on the robe', { faith: 10, weird: 4 }, { flags: { cult: 3 } }),
];

export const decisionCards: CardDef[] = [...research, ...policies, ...projects, ...governments];
