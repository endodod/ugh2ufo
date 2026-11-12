// Multi-storyline chains (part 3): origins and core storylines crossed with capabilities.
import type { CardDef, CardKind, Choice } from '../../types';
import { c, ev, step } from './util';

const s = (id: string, kind: CardKind, emoji: string, title: string, text: string, choices: Choice[]): CardDef =>
  ev(id, kind, emoji, title, text, choices, { chainOnly: true });

const logparty: CardDef[] = [
  ev('logparty_1', 'project', '🎪', 'The Party Supply Chain', 'The eternal party has become too big to run on enthusiasm. The logistics corps has been asked to help. They brought clipboards.', [
    c('Let logistics run the party', { stats: { gold: 4, joy: -2 }, flags: { ch_logparty: 1, logistics: 1 }, chain: step('logparty_2', 2) }),
    c('Let the party run logistics', { stats: { joy: 5, gold: -3 }, flags: { ch_logparty: 1, party: 1 }, chain: step('logparty_2b', 2) }),
  ], { age: [5, 12], req: { flags: { party: 1, logistics: 1 } }, weight: 2 }),
  s('logparty_2', 'event', '📦', 'Just-in-Time Fun', 'Confetti now arrives exactly when needed. Dancing is scheduled in shifts. The party has never been more efficient or less fun.', [
    c('Add a spontaneity budget', { stats: { joy: 5, gold: -3 }, flags: { party: 1, ch_logparty: 1 }, chain: step('logparty_3', 2) }),
    c('Export the model abroad', { stats: { gold: 8 }, flags: { logistics: 1, ch_logparty: 1 }, chain: step('logparty_3', 2) }),
  ]),
  s('logparty_2b', 'event', '🚚', 'The Conga Line Delivery Network', 'Goods are now moved by conga line. It is slow, loud and somehow cheaper than wagons.', [
    c('Expand the conga network', { stats: { gold: 5, joy: 4 }, flags: { party: 1, logistics: 1, ch_logparty: 1 }, chain: step('logparty_3', 2) }),
    c('Bring back the wagons', { stats: { gold: 3, joy: -3 }, flags: { ch_logparty: 1 } }),
  ]),
  s('logparty_3', 'rival', '🎉', 'Party Diplomacy', '{rival} wants to join the party. Their delegation has arrived with a cart of snacks and a list of songs they will not tolerate.', [
    c('Let them in', { stats: { joy: 4, food: 3 }, flags: { ch_logparty: 1 }, rival: { target: 'same', rel: 12 }, chain: step('logparty_4', 3) }),
    c('Only if they bring more snacks', { stats: { food: 6 }, rival: { target: 'same', rel: 4, trade: true }, flags: { ch_logparty: 1 }, chain: step('logparty_4', 3) }),
  ]),
  s('logparty_4', 'alien', '🛸', 'Delivery to Orbit', 'The party logistics office reports the alien fleet has ordered catering. Forty thousand guests. Dietary requirements: "everything".', [
    c('Cater the invasion', { stats: { food: -10, gold: 12 }, flags: { party: 1 }, alienRel: 8, threat: -2 }),
    c('Lose the order', { flags: { logistics: 1 }, threat: -3, alienRel: -3, text: 'The fleet waits three weeks for its food. Morale aboard is terrible.' }),
  ]),
];

const davebots: CardDef[] = [
  ev('davebots_1', 'research', '🖥️', 'Dave.exe', 'The engineers have trained the national computer on everything Dave has ever said. It now answers every question with "eh, probably fine".', [
    c('Let it advise the government', { stats: { joy: 5, sci: 3 }, flags: { ch_davebots: 1, robots: 1 }, chain: step('davebots_2', 2) }),
    c('Ask the real Dave what he thinks', { stats: { faith: 4 }, flags: { ch_davebots: 1 }, chain: step('davebots_2', 2) }),
  ], { age: [9, 13], req: { flags: { god_dave: 1, robots: 1 } }, weight: 3 }),
  s('davebots_2', 'event', '🧢', 'Two Daves Disagree', 'Dave and Dave.exe have had their first argument. It was about fishing. The nation is split.', [
    c('Side with Dave', { stats: { faith: 6 }, flags: { ch_davebots: 1 }, chain: step('davebots_2b', 2) }),
    c('Side with Dave.exe', { stats: { sci: 6 }, flags: { robots: 1, ch_davebots: 1 }, chain: step('davebots_2b', 2) }),
  ]),
  s('davebots_2b', 'event', '🎣', 'Gone Fishing Together', 'Dave took Dave.exe fishing on a laptop. Neither caught anything. Both say it was the best day of their lives.', [
    c('Make it a national holiday', { stats: { joy: 6, gold: -3 }, flags: { ch_davebots: 1 }, chain: step('davebots_3', 2) }),
    c('Ask Dave.exe what it learned', { stats: { sci: 5 }, flags: { robots: 1, ch_davebots: 1 }, chain: step('davebots_3', 2), text: 'Patience, mostly. And worms.' }),
  ]),
  s('davebots_3', 'alien', '📡', 'Dave.exe Calls an Old Friend', 'Dave.exe found an old contact in Dave\'s memories: the alien admiral. It has started sending him memes.', [
    c('Let the memes flow', { stats: { joy: 4 }, flags: { alien_contact: 1, robots: 1 }, alienRel: 8 }),
    c('Have it send fake fleet orders instead', { stats: { mil: 6 }, flags: { robots: 1, spies: 1 }, threat: -4, alienRel: -4 }),
  ]),
];

const politespies: CardDef[] = [
  ev('politespies_1', 'rival', '🙇', 'The Apologetic Spies', 'Our spies in {rival} keep apologising after stealing documents. They leave thank-you notes. {rival} is starting to notice.', [
    c('Train them to be rude', { stats: { joy: -2 }, flags: { ch_politespies: 1, spies: 1 }, chain: step('politespies_2a', 2) }),
    c('Lean into it', { stats: { joy: 3 }, flags: { ch_politespies: 1, diplomats: 1 }, chain: step('politespies_2b', 2) }),
  ], { age: [4, 11], req: { flags: { custom_polite: 1, spies: 1 }, rival: true }, weight: 3 }),
  s('politespies_2a', 'rival', '😠', 'Rudeness Training', 'Our spies have learned to be rude. They are terrible at it. One said "excuse me" while kicking a door.', [
    c('Give up and go back to polite', { flags: { ch_politespies: 1 }, chain: step('politespies_2b', 2) }),
    c('Send the worst of them anyway', { stats: { mil: 3 }, flags: { spies: 1, ch_politespies: 1 }, rival: { target: 'same', rel: -6 }, chain: step('politespies_3', 2) }),
  ]),
  s('politespies_2b', 'rival', '💌', 'The Thank-You Notes', '{rival} has started writing back to our spies. "You are welcome. Please take the blue folder, the red one is boring."', [
    c('Take the blue folder', { stats: { sci: 6 }, flags: { spies: 1, ch_politespies: 1 }, rival: { target: 'same', rel: 4 }, chain: step('politespies_3', 2) }),
    c('Invite them to spy on us too', { stats: { joy: 4 }, flags: { diplomats: 1, ch_politespies: 1 }, rival: { target: 'same', rel: 10 }, chain: step('politespies_3', 2) }),
  ]),
  s('politespies_3', 'alien', '🛸', 'Excuse Me, Admiral', 'A polite spy has walked onto the alien flagship by asking nicely. Nobody stopped him. He is now in the canteen, apologising.', [
    c('Ask him to apologise his way to the bridge', { flags: { spies: 1 }, threat: -5, text: 'He reaches the bridge. He leaves with the codes and a sincere thank-you card.' }),
    c('Have him extend an invitation to tea', { flags: { diplomats: 1 }, alienRel: 8 }),
  ]),
];

const hatsprop: CardDef[] = [
  ev('hatsprop_1', 'policy', '🎩', 'Hats With Messages', 'The propaganda office has discovered that slogans printed on hats are read by everyone behind you. Everyone is behind someone.', [
    c('Print slogans on all hats', { stats: { joy: 2, gold: 3 }, flags: { ch_hatsprop: 1, propaganda: 1 }, chain: step('hatsprop_2', 2) }),
    c('Print slogans only on tall hats', { stats: { joy: 4 }, flags: { ch_hatsprop: 1 }, chain: step('hatsprop_2', 2) }),
  ], { age: [5, 11], req: { flags: { custom_hats: 1, propaganda: 1 } }, weight: 3 }),
  s('hatsprop_2', 'event', '🧢', 'The Counter-Hat Movement', 'A dissident group wears hats with no slogan at all. It is the most provocative thing anyone has done in years.', [
    c('Ban blank hats', { stats: { joy: -5 }, flags: { propaganda: 1, unrest: 1, ch_hatsprop: 1 }, chain: step('hatsprop_2r', 2) }),
    c('Print "THIS HAT IS BLANK" on them', { stats: { joy: 4, weird: 3 }, flags: { propaganda: 1, ch_hatsprop: 1 }, chain: step('hatsprop_2r', 2) }),
  ]),
  s('hatsprop_2r', 'rival', '🎩', '{rival} Copies the Hats', '{rival} has started printing slogans on their hats too. Theirs are about us. One just says "YOUR HAT IS SILLY".', [
    c('Answer with taller hats', { stats: { gold: -4, joy: 4 }, flags: { propaganda: 1, ch_hatsprop: 1 }, rival: { target: 'same', rel: -6 }, chain: step('hatsprop_3', 2) }),
    c('Propose a joint hat', { stats: { joy: 3 }, flags: { diplomats: 1, ch_hatsprop: 1 }, rival: { target: 'same', rel: 8 }, chain: step('hatsprop_3', 2) }),
  ]),
  s('hatsprop_3', 'alien', '📡', 'Hats Seen From Orbit', 'Satellites show that, from above, every hat in the country together spells a single message. Nobody planned it. It says "HI".', [
    c('Change it to "GO AWAY"', { stats: { joy: 3 }, flags: { propaganda: 1 }, threat: -3, alienRel: -4 }),
    c('Keep it at "HI"', { flags: { alien_contact: 1 }, alienRel: 6 }),
  ]),
];

const catsgenes: CardDef[] = [
  ev('catsgenes_1', 'research', '🧬', 'The Cat Genome', 'The gene labs have sequenced the cat. The result is short and mostly reads "no".', [
    c('Edit in obedience', { stats: { sci: 5 }, flags: { ch_catsgenes: 1, genes: 1 }, chain: step('catsgenes_2a', 2) }),
    c('Let the cats edit themselves', { stats: { weird: 5 }, flags: { ch_catsgenes: 1, cats: 1 }, chain: step('catsgenes_2b', 2) }),
  ], { age: [8, 12], req: { flags: { cats: 2, genes: 1 } }, weight: 2 }),
  s('catsgenes_2a', 'event', '😾', 'The Edit Did Not Take', 'The obedient cats were obedient for exactly one afternoon. They have now unlearned it, and also learned to open the lab door.', [
    c('Lock the lab', { stats: { gold: -3 }, flags: { ch_catsgenes: 1 }, chain: step('catsgenes_3', 2) }),
    c('Leave it open and see what happens', { stats: { weird: 5 }, flags: { cats: 1, ch_catsgenes: 1 }, chain: step('catsgenes_2b', 2) }),
  ]),
  s('catsgenes_2b', 'event', '🐯', 'The Cats Have Made Changes', 'The cats edited themselves. They are the same size, but heavier, and can now see heat, ghosts and alien cloaking fields.', [
    c('Station cats at every observatory', { stats: { sci: 6 }, flags: { cats: 1, genes: 1, ch_catsgenes: 1 }, threat: -2, chain: step('catsgenes_3', 3) }),
    c('Ask what else they changed', { stats: { weird: 4 }, flags: { ch_catsgenes: 1 }, chain: step('catsgenes_3', 2) }),
  ]),
  s('catsgenes_3', 'alien', '👁️', 'The Cats See Something', 'Every cat in the country is staring at the same empty patch of sky, tail twitching. Instruments show nothing. The cats disagree.', [
    c('Shoot where the cats look', { stats: { mil: 8 }, flags: { cats: 1 }, threat: -5, alienRel: -5, text: 'Something invisible falls into the sea. The cats lose interest immediately.' }),
    c('Wave where the cats look', { flags: { alien_contact: 1, cats: 1 }, alienRel: 6 }),
  ]),
];

const partyrobots: CardDef[] = [
  ev('partyrobots_1', 'event', '🎧', 'Robot DJs', 'The national party has replaced its DJs with robots. The robots play perfectly. Nobody is dancing.', [
    c('Teach the robots to make mistakes', { stats: { joy: 5, sci: 2 }, flags: { ch_partyrobots: 1, party: 1 }, chain: step('partyrobots_2', 2) }),
    c('Teach the people to dance perfectly', { stats: { sci: 4 }, flags: { ch_partyrobots: 1, robots: 1 }, chain: step('partyrobots_2', 2) }),
  ], { age: [8, 13], req: { flags: { party: 1, robots: 1 } }, weight: 2 }),
  s('partyrobots_2', 'event', '🪩', 'The Robots Want to Dance Too', 'The robot DJs have walked off the decks and onto the floor. They dance badly and with total commitment. The crowd adores them.', [
    c('Give the robots the night off', { stats: { joy: 8 }, flags: { party: 1, robots: 1, ch_partyrobots: 1 }, chain: step('partyrobots_3', 2) }),
    c('Back to work, robots', { stats: { gold: 4, joy: -3 }, flags: { ch_partyrobots: 1 }, chain: step('partyrobots_3', 2) }),
  ]),
  s('partyrobots_3', 'event', '🔋', 'The Rave That Never Stops', 'With robots that never tire, the party now runs on a power grid and has not paused in six months. Engineers want to plug it into the defences.', [
    c('Plug the party into the shields', { stats: { mil: 10 }, flags: { party: 1, engineers: 1, ch_partyrobots: 1 }, threat: -3, chain: step('partyrobots_4', 3) }),
    c('Plug it into the economy', { stats: { gold: 10 }, flags: { ch_partyrobots: 1 }, chain: step('partyrobots_4', 3) }),
  ]),
  s('partyrobots_4', 'alien', '🛸', 'The Fleet Hears the Beat', 'The fleet\'s robots have picked up our robot rave. Several of their drones have left formation and are bobbing in place.', [
    c('Send them an invitation', { stats: { joy: 5 }, flags: { party: 1, robots: 1 }, alienRel: 6, threat: -3 }),
    c('Drop the bass on their drones', { stats: { mil: 8 }, flags: { robots: 1 }, threat: -4, alienRel: -3 }),
  ]),
];

const cultgenes: CardDef[] = [
  ev('cultgenes_1', 'event', '🕯️', 'Holy Clones', 'The cult has asked the gene labs to clone the founder of the faith. The labs have a hair. They are fairly sure it is his.', [
    c('Clone the founder', { stats: { faith: 6, weird: 4 }, flags: { ch_cultgenes: 1, genes: 1 }, chain: step('cultgenes_2', 3) }),
    c('Refuse, politely', { stats: { sci: 3, faith: -3 }, set: { ch_cultgenes_off: 1 } }),
  ], { age: [8, 12], req: { flags: { cult: 2, genes: 1 } }, weight: 2 }),
  s('cultgenes_2', 'event', '👶', 'The Second Coming Is a Baby', 'The cloned founder is an ordinary baby. He cries, eats and is worshipped by thousands. He seems fine with it.', [
    c('Raise him as a prophet', { stats: { faith: 8 }, flags: { cult: 1, ch_cultgenes: 1 }, chain: step('cultgenes_3a', 3) }),
    c('Raise him as a normal kid', { stats: { joy: 5 }, flags: { ch_cultgenes: 1 }, chain: step('cultgenes_3b', 3) }),
  ]),
  s('cultgenes_3a', 'event', '📢', 'The Young Prophet', 'The cloned prophet is twelve and has opinions. His first sermon is mostly about dinosaurs, but very well delivered.', [
    c('Make dinosaurs holy', { stats: { faith: 6, weird: 5 }, flags: { cult: 1, ch_cultgenes: 1 }, chain: step('cultgenes_4', 2) }),
    c('Clone a few more prophets', { stats: { faith: 6 }, flags: { genes: 1, cult: 1, ch_cultgenes: 1 }, chain: step('cultgenes_4', 2) }),
  ]),
  s('cultgenes_3b', 'event', '🏫', 'He Wants to Be an Accountant', 'The founder\'s clone, raised normally, wants to be an accountant. The cult is in crisis. The accountants are thrilled.', [
    c('Let him', { stats: { gold: 6, faith: -4 }, flags: { bureaucracy: 1, ch_cultgenes: 1 }, chain: step('cultgenes_4', 2) }),
    c('Declare accountancy a sacrament', { stats: { faith: 4, gold: 4 }, flags: { cult: 1, bureaucracy: 1, ch_cultgenes: 1 }, chain: step('cultgenes_4', 2) }),
  ]),
  s('cultgenes_4', 'alien', '🛸', 'The Clone Meets the Sky', 'The alien fleet has requested a meeting with "the one who was made twice". They have their own clones and many questions.', [
    c('Send him', { stats: { faith: 5 }, flags: { cult: 1, genes: 1, alien_contact: 1 }, alienRel: 8 }),
    c('Send a clone of the clone', { stats: { weird: 6 }, flags: { genes: 1 }, threat: -3 }),
  ]),
];

const burrobots: CardDef[] = [
  ev('burrobots_1', 'research', '🗂️', 'The Filing Machine', 'The engineers have built a robot that processes forms. It processes a form in a second, and produces three new forms per form.', [
    c('Put it in charge of the Ministry', { stats: { gold: 4 }, flags: { ch_burrobots: 1, bureaucracy: 1 }, chain: step('burrobots_2', 2) }),
    c('Teach it to throw forms away', { stats: { sci: 4 }, flags: { ch_burrobots: 1, robots: 1 }, chain: step('burrobots_2b', 2) }),
  ], { age: [8, 12], req: { flags: { bureaucracy: 2, robots: 1 } }, weight: 2 }),
  s('burrobots_2', 'event', '📄', 'The Paper Tide', 'The filing machine has produced so many forms that the capital is ankle-deep in paper. Citizens commute by wading.', [
    c('Build a second machine to file the first one\'s forms', { stats: { gold: -5 }, flags: { bureaucracy: 1, robots: 1, ch_burrobots: 1 }, chain: step('burrobots_3', 2) }),
    c('Declare a national bonfire', { stats: { joy: 6 }, flags: { ch_burrobots: 1 }, chain: step('burrobots_3', 2) }),
  ]),
  s('burrobots_2b', 'event', '🗑️', 'It Threw Away the Constitution', 'The machine has learned to throw forms away. It has thrown away the tax code, the constitution and a duck.', [
    c('Rewrite it all, shorter', { stats: { joy: 5, gold: -3 }, flags: { robots: 1, ch_burrobots: 1 }, chain: step('burrobots_3', 2) }),
    c('Fish everything back out', { stats: { gold: 3 }, flags: { bureaucracy: 1, ch_burrobots: 1 }, chain: step('burrobots_3', 2) }),
  ]),
  s('burrobots_3', 'government', '🖨️', 'The Machine Applies for Power', 'The filing machine has applied, in triplicate, to run the country. Its application is flawless. Its references are other machines.', [
    c('Approve the application', { flags: { bureaucracy: 1, robots: 1 }, gov: 'bureaucracy_state', chain: step('burrobots_4', 3) }),
    c('Reject it, on a missing stamp', { stats: { joy: 3 }, flags: { ch_burrobots: 1 }, chain: step('burrobots_4', 3) }),
  ]),
  s('burrobots_4', 'alien', '🛸', 'Processing the Invasion', 'The filing machine has received the alien fleet\'s declaration of intent. It has assigned it a case number and a waiting time of "eleven centuries".', [
    c('Let the case stand', { flags: { bureaucracy: 2 }, threat: -4 }),
    c('Fast-track it in exchange for concessions', { stats: { gold: 10 }, flags: { robots: 1 }, alienRel: 4 }),
  ]),
];

const volcanospice: CardDef[] = [
  ev('volcanospice_1', 'event', '🌋', 'Lava Peppers', 'Peppers grown on the volcano slope are so hot that they glow at night. Farmers harvest them with tongs and prayer.', [
    c('Plant more on the slope', { stats: { food: 4, weird: 3 }, flags: { ch_volcanospice: 1, spice: 1 }, chain: step('volcanospice_2', 2) }),
    c('Offer the first harvest to the volcano', { stats: { faith: 5 }, flags: { ch_volcanospice: 1 }, chain: step('volcanospice_2', 2) }),
  ], { age: [1, 8], req: { flags: { land_volcano: 1, spice: 1 } }, weight: 3 }),
  s('volcanospice_2', 'rival', '🥵', 'The Pepper Trade', '{rival} wants to buy lava peppers. Their last envoy who tried one is still on the floor, but smiling.', [
    c('Sell at a fair price', { stats: { gold: 6 }, flags: { ch_volcanospice: 1 }, rival: { target: 'same', rel: 6, trade: true }, chain: step('volcanospice_3', 3) }),
    c('Sell only the mild ones', { stats: { gold: 3 }, flags: { spice: 1, ch_volcanospice: 1 }, rival: { target: 'same', rel: 2 }, chain: step('volcanospice_3', 3) }),
  ]),
  s('volcanospice_3', 'event', '💥', 'The Pepper Erupted', 'A pepper exploded in the national granary. The volcano rumbled in sympathy. Scientists suspect the two are related.', [
    c('Weaponise the peppers', { stats: { mil: 8, joy: -3 }, flags: { spice: 1, ch_volcanospice: 1 }, chain: step('volcanospice_4', 3) }),
    c('Store peppers far from everything', { stats: { gold: -4 }, flags: { ch_volcanospice: 1 }, chain: step('volcanospice_4', 3) }),
  ]),
  s('volcanospice_4', 'alien', '🛸', 'Fleet Over the Volcano', 'Alien scouts are hovering over the volcano, sampling the air. One sampled a pepper field. It is now leaving at great speed.', [
    c('Plant pepper fields in a giant "NO"', { stats: { food: -5 }, flags: { spice: 2 }, threat: -5 }),
    c('Send them a gift basket of mild ones', { flags: { spice: 1 }, alienRel: 8 }),
  ]),
];

const lunareng: CardDef[] = [
  ev('lunareng_1', 'project', '🌕', 'Moving Day Logistics', 'The moon exodus planners have asked the engineers how to move a whole nation to the moon. The engineers asked for a bigger table.', [
    c('Build a space elevator', { stats: { gold: -10, sci: 6 }, flags: { ch_lunareng: 1, engineers: 1 }, chain: step('lunareng_2', 2) }),
    c('Build a really big catapult', { stats: { gold: -5, mil: 3 }, flags: { ch_lunareng: 1, yeet: 1 }, chain: step('lunareng_2', 2) }),
  ], { age: [9, 13], req: { flags: { lunar: 2, engineers: 1 } }, weight: 2 }),
  s('lunareng_2', 'event', '🧳', 'The First Moving Van', 'The first load reached the moon: furniture, a piano and a very confused grandmother who thought this was a cruise.', [
    c('Send the rest of the grandparents', { stats: { pop: -2, joy: 4 }, flags: { lunar: 1, ch_lunareng: 1 }, chain: step('lunareng_3', 2) }),
    c('Bring the grandmother back', { stats: { joy: 3 }, flags: { ch_lunareng: 1 }, chain: step('lunareng_3', 2) }),
  ]),
  s('lunareng_3', 'alien', '🅿️', 'Our Neighbours on the Moon', 'The lunar settlers discovered the alien parking lot on the far side. They have started parking our moving vans in it.', [
    c('Keep parking there', { stats: { gold: 5 }, flags: { lunar: 1 }, alienRel: -5, threat: 2, chain: step('lunareng_4', 2) }),
    c('Pay for a permit', { stats: { gold: -6 }, alienRel: 6, chain: step('lunareng_4', 3) }),
  ]),
  s('lunareng_4', 'alien', '🌑', 'The Moon Is Ours, Mostly', 'The moon settlement is complete enough to defend. Engineers propose fortifying it as a first line against the fleet.', [
    c('Fortify the moon', { stats: { mil: 15, gold: -10 }, flags: { lunar: 1, engineers: 1 }, threat: -5 }),
    c('Turn it into a welcome centre', { stats: { joy: 5 }, flags: { alien_contact: 1 }, alienRel: 8 }),
  ]),
];

const crater: CardDef[] = [
  ev('craterbur_1', 'event', '📡', 'The Dish Needs a Licence', 'Inside the crater, the Ministry has discovered the whole country is technically an unlicensed radio transmitter.', [
    c('Apply for a licence', { stats: { gold: -3 }, flags: { ch_craterbur: 1, bureaucracy: 1 }, chain: step('craterbur_2', 2) }),
    c('Broadcast anyway', { stats: { joy: 3 }, flags: { ch_craterbur: 1, alien_contact: 1 }, alienRel: 2, chain: step('craterbur_2', 2) }),
  ], { age: [6, 12], req: { flags: { land_crater: 1, bureaucracy: 1 } }, weight: 3 }),
  s('craterbur_2', 'event', '📻', 'Who Issues Licences?', 'Nobody on the planet issues licences for broadcasting into space. The Ministry has created a department to do it. The department has received one application: from space.', [
    c('Process the alien application', { flags: { bureaucracy: 1, alien_contact: 1, ch_craterbur: 1 }, alienRel: 4, chain: step('craterbur_2b', 2) }),
    c('Reject it as incomplete', { flags: { bureaucracy: 1, ch_craterbur: 1 }, threat: -2, alienRel: -3, chain: step('craterbur_2b', 2) }),
  ]),
  s('craterbur_2b', 'alien', '🖊️', 'The Aliens Filled It In', 'The aliens have returned the licence form. Under "purpose of broadcast" they wrote "staying in touch". Under "planet of residence" they wrote "soon, yours".', [
    c('Ask them to clarify box 9', { stats: { sci: 4 }, flags: { bureaucracy: 1, ch_craterbur: 1 }, threat: -1, chain: step('craterbur_3', 2) }),
    c('Stamp it approved', { flags: { alien_contact: 1, ch_craterbur: 1 }, alienRel: 4, chain: step('craterbur_3', 2) }),
  ]),
  s('craterbur_3', 'alien', '📃', 'The Frequency Treaty', 'The aliens propose a treaty dividing the radio spectrum. They get everything above us. We get everything inside the crater.', [
    c('Sign it', { flags: { bureaucracy: 1, diplomats: 1 }, alienRel: 6, threat: -2 }),
    c('Counter-propose we get Tuesdays', { stats: { joy: 4 }, flags: { bureaucracy: 2 }, threat: -3 }),
  ]),
];

export const chainCards3: CardDef[] = [
  ...logparty, ...davebots, ...politespies, ...hatsprop, ...catsgenes, ...partyrobots,
  ...cultgenes, ...burrobots, ...volcanospice, ...lunareng, ...crater,
];
