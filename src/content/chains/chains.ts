// Multi-storyline chains (part 1). Each chain has a counter flag ch_<name>; later steps are chain-only.
import type { CardDef, CardKind, Choice } from '../../types';
import { c, chk, ev, luck, o, step } from './util';

const s = (id: string, kind: CardKind, emoji: string, title: string, text: string, choices: Choice[]): CardDef =>
  ev(id, kind, emoji, title, text, choices, { chainOnly: true });

const purrbot: CardDef[] = [
  ev('purrbot_1', 'event', '🤖', 'Cats on the Machines', 'The cats have discovered the new cleaning robots and now ride them through the palace like small, smug knights.', [
    c('Let the cats steer', { stats: { joy: 5, weird: 3 }, flags: { ch_purrbot: 1, cats: 1 }, chain: step('purrbot_2a', 2) }),
    c('Install a cat-proof update', { stats: { sci: 5 }, flags: { ch_purrbot: 1, robots: 1 }, chain: step('purrbot_2b', 2) }),
    c('Separate them', { stats: { joy: -3 }, set: { ch_purrbot_off: 1 } }),
  ], { age: [8, 12], req: { flags: { cats: 1, robots: 1 } }, weight: 2 }),
  s('purrbot_2a', 'event', '🐈', 'The Vacuum Cavalry', 'The cat-driven robots have formed ranks. They patrol at dawn and dusk, and nap in a perfect hexagon at noon.', [
    c('Commission them as a regiment', { stats: { mil: 8, gold: -5 }, flags: { ch_purrbot: 1, cats: 1 }, chain: step('purrbot_3', 2) }),
    c('Give them a parade', { stats: { joy: 6 }, flags: { ch_purrbot: 1 }, chain: step('purrbot_3', 3) }),
  ]),
  s('purrbot_2b', 'event', '🔧', 'The Robots Learned to Purr', 'The cat-proof update worked too well. The robots now purr, knock cups off tables and refuse to come when called.', [
    c('Roll the update back', { stats: { sci: -3, joy: 2 }, flags: { ch_purrbot: 1 }, chain: step('purrbot_3', 2) }),
    c('Call it a feature', { stats: { weird: 6, sci: 4 }, flags: { ch_purrbot: 1, robots: 1 }, chain: step('purrbot_3', 2) }),
  ]),
  s('purrbot_3', 'event', '😼', 'The Machines Want a Monarch', 'The cats and robots have reached an agreement without us. They have drafted a constitution. Article one is "the warm spot".', [
    c('Crown a cat', { stats: { joy: 6, weird: 4 }, flags: { cats: 1 }, gov: 'cat_monarchy' }, { flags: { cats: 3 } }),
    c('Crown the vacuum', { stats: { sci: 8 }, flags: { robots: 1 }, gov: 'ai_overlord' }, { flags: { robots: 3 } }),
    c('Ratify it as a treaty and move on', { stats: { joy: 4 }, flags: { ch_purrbot: 1 }, chain: step('purrbot_4', 3) }),
  ]),
  s('purrbot_4', 'alien', '🛸', 'Purr Frequency', 'Astronomers notice the purring robots broadcast on the same frequency the alien fleet uses. The fleet keeps slowing down to listen.', [
    c('Turn the purring up', { stats: { joy: 4 }, flags: { cats: 1, robots: 1 }, alienRel: 6, threat: -3 }),
    c('Use it to jam their sensors', { stats: { mil: 10 }, flags: { robots: 1 }, threat: -5, alienRel: -4 }),
  ]),
];

const choir: CardDef[] = [
  ev('choir_1', 'alien', '🎼', 'A Harmony From Above', 'The cult\'s evening chant picked up a second voice. It is coming from orbit. It is a perfect third above, and smug about it.', [
    c('Keep chanting', { stats: { faith: 6 }, flags: { ch_choir: 1, cult: 1 }, alienRel: 3, chain: step('choir_2', 2) }),
    c('Chant out of tune on purpose', { stats: { joy: 4 }, flags: { ch_choir: 1 }, alienRel: -3, chain: step('choir_2b', 2) }),
  ], { age: [9, 13], req: { flags: { cult: 1, alien_contact: 1 } }, weight: 2 }),
  s('choir_2', 'alien', '🎤', 'The Choir Director', 'A shimmering figure in a robe has appeared at rehearsal. It taps a stick and says, in our language, "again, from the top, with feeling".', [
    c('Let it conduct', { stats: { faith: 8, weird: 4 }, flags: { ch_choir: 1, alien_contact: 1 }, alienRel: 5, chain: step('choir_3', 2) }),
    c('Ask about the fleet between songs', { stats: { sci: 6 }, flags: { ch_choir: 1 }, threat: -2, chain: step('choir_3', 2) }),
  ]),
  s('choir_2b', 'alien', '🙉', 'Musical Differences', 'The voice from orbit has stopped harmonising. It now sings the same chant one note lower, louder, from every radio.', [
    c('Sing louder', { stats: { faith: 6, joy: -3 }, flags: { ch_choir: 1, cult: 1 }, threat: 2, chain: step('choir_3', 2) }),
    c('Apologise in song', { stats: { faith: 3 }, flags: { ch_choir: 1 }, alienRel: 5, chain: step('choir_3', 2) }),
  ]),
  s('choir_3', 'alien', '🎟️', 'The Orbital Concert', 'The joint choir will perform on the night of the comet. Tickets sold out on two planets. One of them is ours.', [
    chk('Perform the full chant', { stats: { gold: -6 }, flags: { ch_choir: 1 } }, {
      base: 0.4, stats: { faith: 0.002 }, flags: { cult: 0.08, party: 0.05, propaganda: 0.05 },
      success: { text: 'Standing ovation from orbit. Several aliens convert on the spot.', effect: { stats: { faith: 12, joy: 8 }, flags: { cult: 2, alien_contact: 1 }, alienRel: 10, threat: -4 } },
      fail: { text: 'The tenor section collapses. The aliens clap politely, which is worse.', effect: { stats: { joy: -6 }, alienRel: -3 } },
    }),
    c('Lip-sync it', { stats: { joy: 4, faith: -2 }, flags: { ch_choir: 1 }, alienRel: 2, text: 'Nobody can tell. Theologians are troubled.' }),
  ]),
];

const beegene: CardDef[] = [
  ev('beegene_1', 'research', '🐝', 'Edited Bees', 'The gene labs and the hive keepers had lunch together. Now there are bees that can carry a whole letter.', [
    c('Use them as couriers', { stats: { sci: 4, gold: 3 }, flags: { ch_beegene: 1, bees: 1 }, chain: step('beegene_2', 2) }),
    c('Make them bigger', { stats: { mil: 5, weird: 4 }, flags: { ch_beegene: 1, genes: 1 }, chain: step('beegene_2b', 2) }),
  ], { age: [7, 12], req: { flags: { bees: 1, genes: 1 } }, weight: 2 }),
  s('beegene_2', 'event', '🍯', 'Honey of Understanding', 'Courier bees produce a honey that lets whoever eats it understand every language for an hour. Including bee. Bees have a lot to say.', [
    c('Serve it at summits', { stats: { gold: 5 }, flags: { ch_beegene: 1, diplomats: 1 }, rival: { target: 'random', rel: 8 }, chain: step('beegene_3', 2) }),
    c('Listen to what the bees say', { stats: { sci: 6, weird: 3 }, flags: { ch_beegene: 1 }, chain: step('beegene_3', 2) }),
  ]),
  s('beegene_2b', 'event', '🐻', 'Bees the Size of Dogs', 'The large bees are friendly, loyal and terrifying. Children ride them to school. The schools have stopped complaining.', [
    c('Form a bee cavalry', { stats: { mil: 10, food: -4 }, flags: { ch_beegene: 1, bees: 1 }, chain: step('beegene_3', 2) }),
    c('Stop at dog-sized', { stats: { joy: 4 }, flags: { ch_beegene: 1, genes: 1 }, chain: step('beegene_3', 3) }),
  ]),
  s('beegene_3', 'event', '👑', 'The Queen Requests a Meeting', 'The queen bee has requested an audience with {leader}. She would like a formal alliance, a garden and a vote.', [
    c('Grant all three', { stats: { food: 6, joy: 3 }, flags: { bees: 1, genes: 1, ch_beegene: 1 }, chain: step('beegene_4', 3) }),
    c('Grant the garden only', { stats: { food: 4 }, flags: { ch_beegene: 1 } }),
    c('Join the hive', { stats: { sci: 6, joy: -3 }, flags: { bees: 2 }, gov: 'hive_mind' }, { flags: { bees: 3 } }),
  ]),
  s('beegene_4', 'alien', '🛸', 'Waggle at the Fleet', 'The bees have noticed the alien fleet. They are performing a waggle dance that, decoded, means "a lot of flowers, very angry".', [
    c('Send the swarm up', { stats: { mil: 12 }, flags: { bees: 1 }, threat: -5 }),
    c('Ask the bees to dance a welcome', { stats: { joy: 5 }, flags: { alien_contact: 1 }, alienRel: 8 }),
  ]),
];

const duckpaper: CardDef[] = [
  ev('duckpaper_1', 'policy', '🦆', 'The Duck Clerks', 'The ducks have been given clerical jobs. They are excellent at stamping and very poor at not eating the forms.', [
    c('Hire more ducks', { stats: { gold: 3 }, flags: { ch_duckpaper: 1, ducks: 1 }, chain: step('duckpaper_2', 2) }),
    c('Give them edible forms', { stats: { food: -3, joy: 3 }, flags: { ch_duckpaper: 1, bureaucracy: 1 }, chain: step('duckpaper_2', 2) }),
  ], { age: [6, 11], req: { flags: { ducks: 1, bureaucracy: 1 } }, weight: 2 }),
  s('duckpaper_2', 'event', '🥚', 'Form 27-B Was Laid', 'A duck has laid an egg with "Form 27-B" printed on it. It is the correct form. It is filled in.', [
    c('Accept eggs as official documents', { stats: { weird: 5 }, flags: { ch_duckpaper: 1, bureaucracy: 1 }, chain: step('duckpaper_3a', 2) }),
    c('Investigate who filled it in', { stats: { sci: 4 }, flags: { ch_duckpaper: 1, ducks: 1 }, chain: step('duckpaper_3b', 2) }),
  ]),
  s('duckpaper_3a', 'event', '🍳', 'The Omelette Scandal', 'A palace cook made an omelette out of the national budget. It was delicious. It is also now unconstitutional.', [
    c('Charge the cook', { stats: { joy: -3 }, flags: { bureaucracy: 1, ch_duckpaper: 1 }, chain: step('duckpaper_4', 2) }),
    c('Declare the budget eaten', { stats: { gold: -6, joy: 5 }, flags: { ch_duckpaper: 1 }, chain: step('duckpaper_4', 2) }),
  ]),
  s('duckpaper_3b', 'event', '🔍', 'The Ducks Did It', 'The ducks fill in their own forms, file them, and approve them. They have built a complete government in the pond. It runs better than ours.', [
    c('Merge the governments', { stats: { gold: 5 }, flags: { ducks: 1, bureaucracy: 1, ch_duckpaper: 1 }, chain: step('duckpaper_4', 2) }),
    c('Drain the pond', { stats: { joy: -5, food: 3 }, set: { ch_duckpaper_off: 1 } }),
  ]),
  s('duckpaper_4', 'alien', '📮', 'Duck Mail to the Fleet', 'The duck office has sent the alien fleet a form requesting their intentions, in triplicate, on eggs. The fleet has to reply by egg.', [
    c('Wait for the reply', { flags: { bureaucracy: 2 }, threat: -4, text: 'The aliens cannot lay eggs. The invasion is stuck at the paperwork stage.' }),
    c('Send a second, angrier egg', { stats: { joy: 4 }, flags: { ducks: 1 }, threat: -2, alienRel: -3 }),
    c('Make the ducks our envoys', { flags: { ducks: 1, diplomats: 1 }, alienRel: 5 }),
  ]),
];

const dancegrudge: CardDef[] = [
  ev('dancegrudge_1', 'rival', '🕺', 'The Grudge Dance-Off', '{rival} insulted our goats generations ago. The Grudge Keepers propose settling it the modern way: a dance-off at the border.', [
    c('Accept the dance-off', { stats: { joy: 4 }, flags: { ch_dancegrudge: 1, dance: 1 }, chain: step('dancegrudge_2', 2) }),
    c('Dance, but angrily', { stats: { mil: 3 }, flags: { ch_dancegrudge: 1, grudge: 1 }, chain: step('dancegrudge_2', 2) }),
  ], { age: [4, 10], req: { flags: { dance: 1, grudge: 1 }, rival: true }, weight: 2 }),
  s('dancegrudge_2', 'rival', '💃', 'The First Round', 'The first round ended in a tie after eleven hours. Both sides accuse the other of a hidden spin.', [
    chk('Bring out the grudge step', {}, {
      base: 0.45, flags: { dance: 0.08, grudge: 0.06, party: 0.05 },
      success: { text: 'Nobody has ever seen a dance this spiteful. {rival} concedes in tears.', effect: { stats: { joy: 8 }, flags: { ch_dancegrudge: 1, dance: 1 }, rival: { target: 'same', rel: -5 }, chain: step('dancegrudge_3a', 2) } },
      fail: { text: 'Our dancer pulled a hamstring out of pure resentment.', effect: { stats: { joy: -5 }, flags: { ch_dancegrudge: 1, grudge: 1 }, chain: step('dancegrudge_3b', 2) } },
    }),
    c('Call it a draw and dance together', { stats: { joy: 6 }, flags: { ch_dancegrudge: 1 }, rival: { target: 'same', rel: 12 }, chain: step('dancegrudge_3c', 2) }),
  ]),
  s('dancegrudge_3a', 'rival', '🏆', 'Victory Lap', '{rival} has added our victory to their own grudge list. They are training a dancer in secret. We know because she practises loudly.', [
    c('Train two dancers', { stats: { joy: 4, gold: -3 }, flags: { dance: 1, party: 1 } }),
    c('Forgive them generously, and smugly', { stats: { faith: 3 }, flags: { grudge: 1 }, rival: { target: 'same', rel: 6 } }),
  ]),
  s('dancegrudge_3b', 'rival', '📜', 'The Grudge Grows', 'The lost dance has been entered into the Book of Grudges in red ink. The Keepers have opened a second volume.', [
    c('Prepare a rematch', { stats: { mil: 5 }, flags: { grudge: 1, dance: 1 } }),
    c('Turn the grudge into a war', { stats: { mil: 8 }, flags: { grudge: 1 }, rival: { target: 'same', rel: -15, war: true } }),
  ]),
  s('dancegrudge_3c', 'rival', '🤝', 'The Joint Dance Academy', 'The grudge has dissolved into a joint dance academy on the border. Students from both nations kick each other only in choreography.', [
    c('Fund the academy', { stats: { gold: -5, joy: 6 }, flags: { party: 1 }, rival: { target: 'same', rel: 10, ally: true } }),
    c('Turn it into a trade pact', { stats: { gold: 3 }, rival: { target: 'same', rel: 6, trade: true } }),
  ]),
];

const pigeonspy: CardDef[] = [
  ev('pigeonspy_1', 'event', '🐦', 'The Feathered Agents', 'The spy service wants to recruit the pigeons. The pigeons want bread, and to be called "operatives".', [
    c('Recruit the operatives', { stats: { food: -3 }, flags: { ch_pigeonspy: 1, spies: 1 }, chain: step('pigeonspy_2', 2) }),
    c('Recruit only the clever ones', { stats: { sci: 3 }, flags: { ch_pigeonspy: 1, pigeons: 1 }, chain: step('pigeonspy_2', 3) }),
  ], { age: [5, 11], req: { flags: { pigeons: 1, spies: 1 } }, weight: 2 }),
  s('pigeonspy_2', 'rival', '🕵️', 'A Pigeon Has Defected', 'Agent Coo has defected to {rival}, taking our codebook and most of a sandwich.', [
    c('Send a pigeon after him', { stats: { mil: 2 }, flags: { ch_pigeonspy: 1, pigeons: 1 }, chain: step('pigeonspy_3a', 2) }),
    c('Change all the codes to bird noises', { stats: { weird: 4 }, flags: { ch_pigeonspy: 1, spies: 1 }, chain: step('pigeonspy_3b', 2) }),
  ]),
  s('pigeonspy_3a', 'rival', '🥖', 'The Bread Exchange', 'Our pigeon found Agent Coo. They have negotiated a prisoner swap: Coo for a single loaf. {rival} thinks they are getting the better deal.', [
    c('Accept the swap', { stats: { food: -1 }, flags: { spies: 1, ch_pigeonspy: 1 }, rival: { target: 'same', rel: 4 }, chain: step('pigeonspy_4', 3) }),
    c('Offer two loaves and get their pigeon too', { stats: { food: -2 }, flags: { spies: 1, pigeons: 1, ch_pigeonspy: 1 }, rival: { target: 'same', rel: -6 }, chain: step('pigeonspy_4', 3) }),
  ]),
  s('pigeonspy_3b', 'rival', '🎶', 'Nobody Can Read Anything', 'The bird-noise codes are unbreakable. Our own spies cannot read them either. The only one who can is a pigeon called Margaret.', [
    c('Put Margaret in charge', { stats: { weird: 5 }, flags: { pigeons: 1, ch_pigeonspy: 1 }, chain: step('pigeonspy_4', 3) }),
    c('Go back to normal codes', { stats: { sci: 3 }, flags: { ch_pigeonspy: 1 } }),
  ]),
  s('pigeonspy_4', 'alien', '🛰️', 'Operation High Coo', 'The pigeon agents want to infiltrate the alien fleet. Their plan: fly very high and look like a pigeon.', [
    chk('Approve Operation High Coo', { stats: { food: -4 } }, {
      base: 0.35, flags: { spies: 0.08, pigeons: 0.08, logistics: 0.04 },
      success: { text: 'Three pigeons return with fleet schematics and a strong opinion of alien bread.', effect: { stats: { sci: 10 }, flags: { spies: 1, pigeons: 1 }, threat: -5 } },
      fail: { text: 'The pigeons were caught and adopted by the crew. They seem happy.', effect: { stats: { joy: -2 }, alienRel: 4 } },
    }),
    c('Keep them home as a last line', { stats: { mil: 6 }, flags: { pigeons: 1 } }),
  ]),
];

const yeetnavy: CardDef[] = [
  ev('yeetnavy_1', 'project', '⚓', 'Throwing the Navy', 'The admirals complain ships are slow. The throwing engineers say they can fix that.', [
    c('Throw a ship', { stats: { gold: -5, mil: 3 }, flags: { ch_yeetnavy: 1, yeet: 1 }, chain: step('yeetnavy_2', 2) }),
    c('Throw the admirals instead', { stats: { joy: 4 }, flags: { ch_yeetnavy: 1, navy: 1 }, chain: step('yeetnavy_2b', 2) }),
  ], { age: [5, 10], req: { flags: { yeet: 1, navy: 1 } }, weight: 2 }),
  s('yeetnavy_2', 'event', '🚢', 'The Ship Landed', 'The thrown ship landed two days\' sail away, intact, in a harbour. The crew is mostly fine. The harbour is now ours, apparently.', [
    c('Throw the whole fleet', { stats: { mil: 8, gold: -6 }, flags: { navy: 1, yeet: 1, ch_yeetnavy: 1 }, chain: step('yeetnavy_3', 2) }),
    c('Build a ship-catching harbour', { stats: { gold: -4, food: 4 }, flags: { navy: 1, ch_yeetnavy: 1 }, chain: step('yeetnavy_3', 3) }),
  ]),
  s('yeetnavy_2b', 'event', '🎖️', 'The Admirals Have Views', 'The thrown admirals landed in a lake and came back with very strong views on aerodynamics.', [
    c('Let them design a flying fleet', { stats: { sci: 6 }, flags: { navy: 1, ch_yeetnavy: 1 }, chain: step('yeetnavy_3', 2) }),
    c('Apologise with medals', { stats: { gold: -3, mil: 3 }, flags: { ch_yeetnavy: 1 } }),
  ]),
  s('yeetnavy_3', 'event', '🌊', 'The Ballistic Armada', 'Our navy now travels by arc. Sailors call it "going up". Pirates have stopped trying, mostly out of confusion.', [
    c('Aim the next arc higher', { stats: { sci: 8, gold: -8 }, flags: { yeet: 1, ch_yeetnavy: 1 }, chain: step('yeetnavy_4', 3) }),
    c('Use it for trade', { stats: { gold: 10 }, flags: { navy: 1 } }),
  ]),
  s('yeetnavy_4', 'alien', '🛸', 'Orbit by Accident', 'A warship was thrown so high it has not come down. It is now in orbit, next to an alien scout, which is staring at it.', [
    c('Claim it was on purpose', { stats: { mil: 12 }, flags: { navy: 1, yeet: 1 }, threat: -4 }),
    c('Have the crew wave', { stats: { joy: 4 }, alienRel: 6, flags: { alien_contact: 1 } }),
  ]),
];

const holeeng: CardDef[] = [
  ev('holeeng_1', 'project', '📐', 'Engineering the Hole', 'The engineers have finally looked at the hole. They have questions, and a lift.', [
    c('Install the lift', { stats: { gold: -6, sci: 4 }, flags: { ch_holeeng: 1, engineers: 1 }, chain: step('holeeng_2', 2) }),
    c('Just shore it up', { stats: { gold: -3 }, flags: { ch_holeeng: 1, hole: 1 }, chain: step('holeeng_2', 3) }),
  ], { age: [6, 12], req: { flags: { hole: 2, engineers: 1 } }, weight: 2 }),
  s('holeeng_2', 'event', '🛗', 'Going Down', 'The lift reaches a floor nobody built. There is a lobby, a potted plant and a sign saying "Engineering, Level -40".', [
    c('Meet the other engineers', { stats: { sci: 6, weird: 4 }, flags: { ch_holeeng: 1, hole: 1 }, chain: step('holeeng_3a', 2) }),
    c('Press the button for -80', { stats: { weird: 6 }, flags: { ch_holeeng: 1 }, chain: step('holeeng_3b', 2) }),
  ]),
  s('holeeng_3a', 'event', '🧑‍🔧', 'The Deep Engineers', 'The engineers below have been holding up our country from underneath for centuries. They would like a thank-you and a raise.', [
    c('Pay them', { stats: { gold: -8 }, flags: { engineers: 1, ch_holeeng: 1 }, chain: step('holeeng_4', 3) }),
    c('Offer them citizenship', { stats: { pop: 4, joy: 3 }, flags: { engineers: 1, hole: 1, ch_holeeng: 1 }, chain: step('holeeng_4', 3) }),
  ]),
  s('holeeng_3b', 'event', '🚪', 'Level -80', 'Level -80 is a waiting room. Everybody in it is waiting for the aliens to leave. They have been waiting a very long time.', [
    c('Ask who they are', { stats: { sci: 5 }, flags: { alien_contact: 1, ch_holeeng: 1 }, chain: step('holeeng_4', 2) }),
    c('Back away and close the lift', { stats: { joy: -3 }, threat: -1 }),
  ]),
  s('holeeng_4', 'project', '🏚️', 'The Shelter Below', 'The engineers propose turning the hole into a shelter big enough for the whole nation, in case the sky becomes unfriendly.', [
    c('Build it', { stats: { gold: -12, mil: 6 }, flags: { hole: 1, engineers: 1 }, threat: -5 }),
    c('Build a decoy country on top instead', { stats: { gold: -8, weird: 8 }, flags: { engineers: 1 }, threat: -3 }),
  ]),
];

const fungscholar: CardDef[] = [
  ev('fungscholar_1', 'research', '🍄', 'Footnotes in the Mould', 'The library mould has started adding footnotes to our books. They are correct, and a bit condescending.', [
    c('Let the mould annotate', { stats: { sci: 5 }, flags: { ch_fungscholar: 1, fungus: 1 }, chain: step('fungscholar_2', 2) }),
    c('Assign scholars to argue with it', { stats: { sci: 3, joy: 2 }, flags: { ch_fungscholar: 1, scholars: 1 }, chain: step('fungscholar_2', 2) }),
  ], { age: [5, 11], req: { flags: { fungus: 1, scholars: 1 } }, weight: 2 }),
  s('fungscholar_2', 'event', '🎓', 'The Mould Applied for a Doctorate', 'The mould submitted a thesis. It is nine hundred pages long and grew overnight. The committee is divided.', [
    c('Award the doctorate', { stats: { sci: 8, faith: -2 }, flags: { fungus: 1, ch_fungscholar: 1 }, chain: step('fungscholar_3a', 2) }),
    c('Reject it on a technicality', { stats: { joy: 3 }, flags: { scholars: 1, ch_fungscholar: 1 }, chain: step('fungscholar_3b', 2) }),
  ]),
  s('fungscholar_3a', 'event', '🧫', 'Professor Mould', 'Professor Mould now teaches. Its lectures are excellent. The lecture halls are damp and students go home with opinions about rot.', [
    c('Open a fungal faculty', { stats: { sci: 10, gold: -6 }, flags: { fungus: 1, scholars: 1, ch_fungscholar: 1 }, chain: step('fungscholar_4', 3) }),
    c('Keep it to one lecture a week', { stats: { sci: 5 }, flags: { ch_fungscholar: 1 } }),
  ]),
  s('fungscholar_3b', 'event', '📚', 'The Mould Appealed', 'The mould appealed the rejection by growing over the committee\'s chairs. They are still sitting on them. They cannot get up.', [
    c('Overturn the decision', { stats: { sci: 6 }, flags: { fungus: 1, ch_fungscholar: 1 }, chain: step('fungscholar_4', 3) }),
    c('Burn the library', { stats: { sci: -10, joy: -4 }, set: { ch_fungscholar_off: 1 }, text: 'Several scholars weep. The mould, somewhere, takes notes.' }),
  ]),
  s('fungscholar_4', 'alien', '🌫️', 'A Paper on the Fleet', 'The mould has published a paper on the alien fleet. It says their ships are humid inside and "very welcoming to spores".', [
    c('Prepare spore payloads', { stats: { mil: 10, weird: 5 }, flags: { fungus: 1, genes: 1 }, threat: -5 }),
    c('Send the paper to the aliens for review', { stats: { sci: 6 }, alienRel: 5, flags: { scholars: 1 } }),
  ]),
];

const mascotdip: CardDef[] = [
  ev('mascotdip_1', 'rival', '🐕', 'The Good Boy Summit', 'The diplomatic corps wants to bring the national dog to the summit with {rival}. {rival} is bringing a cat.', [
    c('Bring the dog', { stats: { joy: 4 }, flags: { ch_mascotdip: 1, mascot: 1 }, chain: step('mascotdip_2', 2) }),
    c('Bring a cat as well, to be safe', { stats: { weird: 3 }, flags: { ch_mascotdip: 1, diplomats: 1 }, chain: step('mascotdip_2', 2) }),
  ], { age: [4, 11], req: { flags: { mascot: 1, diplomats: 1 }, rival: true }, weight: 2 }),
  s('mascotdip_2', 'rival', '🐾', 'Under the Table', 'During the summit, the dog and {rival}\'s cat disappeared under the table. Negotiations paused. Everyone is listening.', [
    luck('Look under the table', [
      o(1, 'They are asleep together. {rival}\'s envoy cries. A treaty is signed in minutes.', { flags: { ch_mascotdip: 1, mascot: 1 }, rival: { target: 'same', rel: 15 }, chain: step('mascotdip_3a', 2) }),
      o(1, 'The cat is sitting on the dog. The dog looks humiliated. So does our envoy.', { stats: { joy: -4 }, flags: { ch_mascotdip: 1 }, rival: { target: 'same', rel: -5 }, chain: step('mascotdip_3b', 2) }),
    ]),
  ]),
  s('mascotdip_3a', 'rival', '💞', 'The Animal Accord', 'The Animal Accord with {rival} is the most popular treaty in history. Nobody has read it. It is mostly pictures.', [
    c('Make it an alliance', { stats: { joy: 5 }, flags: { diplomats: 1, ch_mascotdip: 1 }, rival: { target: 'same', rel: 8, ally: true }, chain: step('mascotdip_4', 3) }),
    c('Make it a trade pact', { stats: { gold: 4 }, flags: { ch_mascotdip: 1 }, rival: { target: 'same', trade: true }, chain: step('mascotdip_4', 3) }),
  ]),
  s('mascotdip_3b', 'rival', '🦴', 'The Dog Wants a Rematch', 'The national dog has not forgiven the cat. He sits by the border every evening and does a low, dignified growl.', [
    c('Arrange a rematch', { stats: { joy: 4 }, flags: { mascot: 1, ch_mascotdip: 1 }, chain: step('mascotdip_4', 3) }),
    c('Retire the dog with honours', { stats: { joy: -2, faith: 3 } }),
  ]),
  s('mascotdip_4', 'alien', '🛸', 'The Fleet Asks for the Dog', 'The alien fleet has heard about the summit dog. They request he lead their delegation too, "in a neutral capacity".', [
    c('Lend the dog', { stats: { joy: 6 }, flags: { mascot: 1, diplomats: 1 }, alienRel: 10, threat: -2 }),
    c('The dog stays home', { stats: { joy: 3, mil: 3 }, alienRel: -3 }),
  ]),
];

const genemed: CardDef[] = [
  ev('genemed_1', 'research', '💉', 'The Cure for Ordinary', 'Doctors and gene labs have developed a treatment for "being average". Volunteers come back noticeably more interesting.', [
    c('Offer it to everyone', { stats: { pop: 3, weird: 5 }, flags: { ch_genemed: 1, genes: 1 }, chain: step('genemed_2', 2) }),
    c('Run a proper trial first', { stats: { sci: 5 }, flags: { ch_genemed: 1, medicine: 1 }, chain: step('genemed_2b', 2) }),
  ], { age: [8, 12], req: { flags: { genes: 1, medicine: 1 } }, weight: 2 }),
  s('genemed_2', 'event', '🦄', 'Side Effects', 'Side effects include glowing, perfect pitch and an inability to stand in queues. Queues have collapsed nationwide.', [
    c('Embrace it', { stats: { joy: 5, gold: -4 }, flags: { genes: 1, ch_genemed: 1 }, chain: step('genemed_3', 2) }),
    c('Develop an antidote', { stats: { sci: 6 }, flags: { medicine: 1, ch_genemed: 1 }, chain: step('genemed_3', 2) }),
  ]),
  s('genemed_2b', 'event', '📋', 'The Trial Results', 'The trial was a success. The control group, given nothing, has become jealous and is now also slightly interesting.', [
    c('Publish the results', { stats: { sci: 8 }, flags: { medicine: 1, ch_genemed: 1 }, chain: step('genemed_3', 2) }),
    c('Treat the control group too', { stats: { pop: 2, weird: 3 }, flags: { genes: 1, ch_genemed: 1 }, chain: step('genemed_3', 2) }),
  ]),
  s('genemed_3', 'event', '🧬', 'Immune to Everything', 'The next generation is immune to every known disease and several unknown ones. The doctors ask what they should do with the rest of their careers.', [
    c('Study alien diseases', { stats: { sci: 10 }, flags: { medicine: 1, genes: 1 }, threat: -3 }),
    c('Make them all gene engineers', { stats: { sci: 6 }, flags: { genes: 2 } }),
    c('Let them retire', { stats: { joy: 6, gold: -4 } }),
  ]),
];

const propcult: CardDef[] = [
  ev('propcult_1', 'policy', '📣', 'Slogans Become Scripture', 'The propaganda office\'s slogans are now recited at temple. "Eat your vegetables" has become a commandment.', [
    c('Merge the ministries', { stats: { faith: 5, gold: 3 }, flags: { ch_propcult: 1, cult: 1 }, chain: step('propcult_2', 2) }),
    c('Write better slogans', { stats: { joy: 4 }, flags: { ch_propcult: 1, propaganda: 1 }, chain: step('propcult_2', 2) }),
  ], { age: [4, 11], req: { flags: { propaganda: 1, cult: 1 } }, weight: 2 }),
  s('propcult_2', 'event', '🖼️', 'The Poster Saint', 'A face from an old recruitment poster has been canonised. Pilgrims visit the printing press. The printer is overwhelmed.', [
    c('Print more saints', { stats: { faith: 6, gold: 4 }, flags: { propaganda: 1, ch_propcult: 1 }, chain: step('propcult_3a', 2) }),
    c('Reveal the poster was the printer\'s uncle', { stats: { sci: 3, faith: -4 }, flags: { ch_propcult: 1 }, chain: step('propcult_3b', 2) }),
  ]),
  s('propcult_3a', 'event', '🕯️', 'The Holy Campaign', 'The cult-state propaganda machine is running at full speed. Even the birds sing the anthem. The birds are not happy about it.', [
    c('Declare a holy state', { stats: { faith: 8 }, flags: { cult: 1 }, gov: 'cult_state' }),
    c('Point it at the aliens', { flags: { propaganda: 1, cult: 1, ch_propcult: 1 }, chain: step('propcult_4', 3) }),
  ]),
  s('propcult_3b', 'event', '👴', 'The Uncle Speaks', 'The printer\'s uncle, now a saint, has been located. He is delighted and has started giving sermons about bread prices.', [
    c('Let him preach', { stats: { faith: 4, joy: 4 }, flags: { cult: 1, ch_propcult: 1 }, chain: step('propcult_4', 3) }),
    c('Pay him to retire', { stats: { gold: -4 } }),
  ]),
  s('propcult_4', 'alien', '📡', 'Converting the Fleet', 'The faith-and-slogan broadcasts are reaching the alien fleet. Some crew members have started saying "eat your vegetables" to each other.', [
    c('Broadcast harder', { stats: { faith: 6 }, flags: { cult: 1, propaganda: 1 }, alienRel: 6, threat: -3 }),
    c('Broadcast "go home" as a hymn', { stats: { joy: 4 }, flags: { propaganda: 1 }, threat: -4, alienRel: -4 }),
  ]),
];

const geraldturk: CardDef[] = [
  ev('geraldturk_1', 'event', '♟️', 'Gerald Plays Chess', 'Someone set the chess automaton in front of Gerald. The small man inside has made his opening move. Gerald has not responded. It has been nine days.', [
    c('Let the game continue', { stats: { weird: 5 }, flags: { ch_geraldturk: 1, gerald: 1 }, chain: step('geraldturk_2', 3) }),
    c('Help Gerald a bit', { stats: { sci: 3 }, flags: { ch_geraldturk: 1, turk: 1 }, chain: step('geraldturk_2', 2) }),
  ], { age: [6, 12], req: { flags: { gerald: 1, turk: 1 } }, weight: 2 }),
  s('geraldturk_2', 'event', '⏳', 'The Longest Game', 'The small man inside the automaton has aged visibly. Gerald has not moved. Spectators sell snacks. Theologians claim Gerald is thinking eleven moves ahead.', [
    c('Replace the small man with a robot', { stats: { sci: 6 }, flags: { robots: 1, ch_geraldturk: 1 }, chain: step('geraldturk_3', 3) }),
    c('Declare Gerald the winner by patience', { stats: { faith: 5, joy: 3 }, flags: { gerald: 1, ch_geraldturk: 1 }, chain: step('geraldturk_3', 3) }),
  ]),
  s('geraldturk_3', 'event', '🏆', 'Checkmate', 'Gerald moved. Nobody saw it. A pawn is simply in a new place, and it is checkmate. The automaton weeps oil.', [
    c('Name Gerald grandmaster', { stats: { faith: 4, sci: 4 }, flags: { gerald: 1, turk: 1 }, chain: step('geraldturk_4', 3) }),
    c('Investigate the pawn', { stats: { sci: 8, weird: 4 }, flags: { robots: 1 }, chain: step('geraldturk_4', 3) }),
  ]),
  s('geraldturk_4', 'alien', '🛸', 'The Fleet Wants a Game', 'The alien admiral heard about the match. They challenge Gerald to a game for the planet, at their convenience.', [
    c('Accept, Gerald plays', { flags: { gerald: 1, turk: 1 }, threat: -4, text: 'The admiral makes a move. Gerald considers it. The admiral is starting to sweat.' }),
    c('Send the automaton instead', { stats: { mil: 6 }, flags: { robots: 1, turk: 1 }, threat: -2 }),
  ]),
];

export const chainCards1: CardDef[] = [
  ...purrbot, ...choir, ...beegene, ...duckpaper, ...dancegrudge, ...pigeonspy,
  ...yeetnavy, ...holeeng, ...fungscholar, ...mascotdip, ...genemed, ...propcult, ...geraldturk,
];
