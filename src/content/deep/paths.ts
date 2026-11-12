// Multi-era civilization form paths. Each path has a counter flag; the last step sets form_<id>.
import type { CardDef, Choice, Cond, Effect, EraRange, Outcome, Stat } from '../../types';

type Stats = Partial<Record<Stat, number>>;

function path(p: string) {
  const go = (label: string, stats: Stats, text?: string, more: Effect = {}): Choice => ({
    label, effect: { ...more, stats, flags: { ...(more.flags ?? {}), [p]: 1 }, ...(text ? { text } : {}) },
  });
  const gamble = (label: string, outcomes: Outcome[]): Choice => ({ label, effect: { flags: { [p]: 1 } }, outcomes });
  const stop = (label: string, stats: Stats, text?: string): Choice => ({
    label, effect: { stats, set: { [`${p}_off`]: 1 }, ...(text ? { text } : {}) },
  });
  const done = (label: string, stats: Stats, text: string, more: Effect = {}): Choice => ({
    label, effect: { ...more, stats, flags: { ...(more.flags ?? {}), [p]: 1 }, set: { ...(more.set ?? {}), [`form_${p}`]: 1 }, text },
  });
  const card = (step: number, era: EraRange, emoji: string, title: string, text: string, choices: Choice[], req: Cond = {}, alt = ''): CardDef => ({
    id: `d_${p}_${step}${alt}`, kind: 'event', era, emoji, title, text, once: true, weight: step === 1 && !req.flags ? 1 : 2,
    req: {
      ...req,
      flags: { ...(req.flags ?? {}), ...(step > 1 ? { [p]: step - 1 } : {}) },
      noFlags: [...(req.noFlags ?? []), `${p}_off`, ...(step === 1 ? [p] : [])],
    },
    choices,
  });
  return { go, gamble, stop, done, card };
}

const T = path('tide');
const tide: CardDef[] = [
  T.card(1, [0, 2], '🌊', 'The Wet Elder', 'Elder Mbuu keeps walking into the sea and coming back an hour later with opinions about kelp.', [
    T.go('Follow him in, a bit', { food: 2, weird: 2 }, 'Knee-deep consensus achieved.'),
    T.stop('Build a fence on the beach', { mil: 1, joy: -1 }, 'Mbuu climbs the fence. Then he climbs back.'),
  ], { flags: { land_coast: 1 } }, 'a'),
  T.card(1, [0, 2], '🫧', 'Breath-Holding Champion', 'Pell won the breath-holding contest by staying under for an hour. She says she was "visiting".', [
    T.go('Ask who she visited', { weird: 3, joy: 1 }),
    T.stop('Disqualify her for cheating', { joy: 2 }),
  ], {}, 'b'),
  T.card(2, [1, 4], '🏚️', 'Tidal Architecture', 'Houses are now built at low tide and flooded at high tide. Residents call it "half-time living". Rent is also half.', [
    T.go('Build only at low tide', { gold: -3, food: 4 }),
    T.go('Teach children to swim before they walk', { sci: 2, joy: 3, pop: -1 }, 'They walk later. Sideways, mostly.'),
    T.stop('Move inland like normal people', { food: -2, joy: 1 }),
  ]),
  T.card(3, [3, 5], '🪸', 'The Kelp Parliament', 'The council now meets underwater. Debates are short, laws are concise, and nobody filibusters twice.', [
    T.go('Motion carried, bubbles counted', { gold: 3, sci: 3, joy: -2 }),
    T.go('Fund breathing reeds for senators', { gold: -4, sci: 5 }),
    T.stop('Drain the chamber', { gold: -3, joy: 2 }, 'The senators flop around on the floor for a while, then resume yelling.'),
  ]),
  T.card(4, [4, 7], '🐙', 'The Octopus Deal', 'The octopuses offer the secret of glass domes in exchange for every jar in the nation. They will not say why they want the jars.', [
    T.go('Hand over the jars', { gold: -5, sci: 7, food: -2 }, 'Pickling becomes illegal overnight, for lack of jars.'),
    T.gamble('Ask for gills instead', [
      { weight: 2, text: 'The octopuses deliver gills. They are itchy but functional.', effect: { stats: { pop: 3, weird: 5 }, flags: { genes: 1 } } },
      { weight: 1, text: 'The octopuses deliver one gill. To one man. He is thrilled.', effect: { stats: { gold: -4, joy: 2 } } },
    ]),
    T.stop('Keep the jars, insult the octopuses', { gold: 3, mil: -2 }),
  ]),
  T.card(5, [6, 8], '🌊', 'Last Breath on Land', 'The domes are finished. The whole of {civ} can go under, for good. The land will be left to the seagulls and the bins.', [
    T.done('Into the sea, all of us', { pop: -3, food: 8, mil: -4, joy: 4 }, '{civ} is now a nation of Tide-Folk. The seagulls have declared a republic on the empty beaches.', { threat: -3 }),
    T.stop('Keep one foot on the beach', { joy: -3, gold: 3 }),
  ]),
];

const U = path('turtle');
const turtle: CardDef[] = [
  U.card(1, [0, 2], '🐢', 'Name the Ground', 'Surveyors confirm the ground is a turtle. One very large turtle. The priests feel it deserves a name.', [
    U.go('Name it Margaret', { faith: 3, joy: 2 }, 'Margaret makes no comment. Margaret has not commented in eleven thousand years.'),
    U.stop('Refuse to acknowledge it', { faith: -2, sci: 2 }),
  ], { flags: { land_back: 1 } }, 'a'),
  U.card(1, [0, 2], '👣', 'A Footprint the Size of a Lake', 'Overnight, a footprint appeared next to the village. Something walked past and did not notice the village at all.', [
    U.go('Follow the footprints', { food: -2, sci: 3 }),
    U.stop('Decide it was always a lake', { joy: 1, faith: 1 }),
  ], {}, 'b'),
  U.card(2, [1, 4], '🥬', 'Catching Up', 'Scouts found it: a turtle the size of a mountain range, eating a forest at roughly one tree per week.', [
    U.go('Build a very long ladder', { gold: -3, faith: 3 }),
    U.go('Leave it offerings of lettuce', { food: -4, weird: 3 }, 'The turtle eats the lettuce, and also the field it was in. A good sign.'),
    U.stop('Let it walk away', { joy: -1 }),
  ]),
  U.card(3, [3, 5], '🏘️', 'The Moving Suburbs', 'Half the city now lives on the shell. Their address changes daily. The post office has stopped trying.', [
    U.go('Build more on the shell', { gold: -4, joy: 4 }),
    U.go('Tax by distance travelled', { gold: 5, joy: -2 }),
    U.stop('Everyone off the turtle', { pop: -2, mil: 1 }),
  ]),
  U.card(4, [4, 7], '🪢', 'The Steering Committee', 'Engineers propose a harness and reins. The turtle has been informed and has not reacted, which the committee counts as consent.', [
    U.go('Install the reins', { gold: -6, mil: 5 }),
    U.go('Steer with lettuce on a very long pole', { food: -5, weird: 4 }, 'Top speed: brisk.'),
    U.stop('Nobody steers Margaret', { faith: 3 }),
  ]),
  U.card(5, [6, 8], '🧳', 'Pack Up the Old Ground', 'The last fixed cities are emptying. {civ} can abandon the old ground for good and become a city that walks.', [
    U.done('All aboard Margaret', { gold: -6, mil: 6, joy: 4 }, '{civ} is now a nation of Shell-Riders. The maps have given up. The maps are just a picture of a turtle now.', { threat: -2 }),
    U.stop('Wave goodbye from the old ground', { joy: -4, food: 3 }),
  ]),
];

const S = path('spore');
const spore: CardDef[] = [
  S.card(1, [0, 2], '🧱', 'The Soft Wall', 'One wall of the cave has become soft, warm, and very slightly agreeable. People lean on it to think.', [
    S.go('Lean on it', { joy: 3, weird: 2 }),
    S.stop('Scrape it off', { sci: 1, joy: -1 }, 'The wall seems hurt. Walls are not supposed to seem anything.'),
  ], { flags: { land_cave: 1 } }, 'a'),
  S.card(1, [0, 2], '🍞', 'Bread That Breathes', 'Someone left a loaf out for a whole season. It now has a gentle pulse and a small following.', [
    S.go('Keep it on a nice shelf', { faith: 2, weird: 3 }),
    S.stop('Throw it in the fire', { food: 1 }),
  ], {}, 'b'),
  S.card(1, [2, 5], '📬', 'The Mail Has Opinions', 'The mycelium mail has started forwarding letters to people it thinks should really read them. It is usually right.', [
    S.go('Let the mushrooms decide', { sci: 3, weird: 3 }),
    S.stop('Go back to pigeons and shouting', { joy: -1 }),
  ], { flags: { fungus: 2 } }, 'c'),
  S.card(2, [1, 5], '🛏️', 'Shared Dreams', 'Everyone who sleeps on the new mushroom mattresses has the same dream. It is about being damp, and it is lovely.', [
    S.go('Mushroom beds for all', { joy: 2, sci: 2, weird: 3 }),
    S.go('Brew it into tea', { faith: 4, gold: -2 }),
    S.stop('Burn the beds', { joy: -2, food: 2 }),
  ]),
  S.card(3, [3, 5], '🕸️', 'The Network Remembers', 'The mycelium under the city now finishes people\'s sentences. Mostly the boring ones, which is a mercy.', [
    S.go('Let it remember for us', { sci: 5, joy: -3 }),
    S.go('Plug the council into it', { gold: -3, sci: 3, joy: 2 }, 'Meetings now take four seconds and smell of soil.'),
    S.stop('Pave everything', { gold: -4, mil: 2 }),
  ]),
  S.card(4, [4, 7], '🌱', 'Root Citizens', 'The first citizen has voluntarily put down roots. She says it feels like a very long nap with excellent gossip.', [
    S.go('Make rooting a right', { pop: -2, weird: 6, sci: 4 }),
    S.go('Root only the retired', { pop: -1, joy: 3, faith: 2 }),
    S.stop('Gently dig her back up', { joy: -2 }),
  ]),
  S.card(5, [6, 8], '🍄', 'The Bloom', 'The network is ready. {civ} can join it entirely: one mind, one continent, slightly damp, never lonely again.', [
    S.done('Bloom', { pop: -4, sci: 6, weird: 8, joy: -3 }, '{civ} is now the Bloom. Everyone agrees with everyone. It is very quiet and smells like a forest after rain.', { gov: 'hive_mind', flags: { fungus: 1 } }),
    S.stop('Stay individually damp', { joy: 3, weird: -3 }),
  ]),
];

const UP = path('upload');
const upload: CardDef[] = [
  UP.card(1, [2, 4], '📖', 'The Monk Who Wrote Himself', 'A monk claims that if you write down a person in enough detail, they become immortal. He is on page 40,000 of himself.', [
    UP.go('Fund the biography', { gold: -3, sci: 3 }),
    UP.stop('Ask him to write something useful', { sci: 1, faith: -1 }),
  ], {}, 'a'),
  UP.card(1, [3, 6], '⚙️', 'The Clockwork Confessor', 'A brass automaton has started asking citizens to "describe yourself completely, please". It takes notes. It takes a lot of notes.', [
    UP.go('Answer honestly', { sci: 4, weird: 2 }),
    UP.stop('Unwind it', { joy: 1 }),
  ], { flags: { robots: 1 } }, 'b'),
  UP.card(2, [4, 6], '🧶', 'The Punch-Card Grandmother', 'A loom factory has encoded a grandmother into 9,000 punch cards. The loom now knits exactly like her and disapproves of your posture.', [
    UP.go('Encode more grandmothers', { sci: 4, joy: -2 }),
    UP.go('Knit her a scarf from herself', { joy: 3, weird: 3 }),
    UP.stop('Burn the cards', { faith: 2, joy: -2 }, 'The real grandmother is relieved. The loom is not.'),
  ]),
  UP.card(3, [5, 7], '🖥️', 'Beta Testers', 'Forty volunteers have been uploaded into a room-sized computer. They report it is "fine, quite beige, no snacks".', [
    UP.go('Add colour and snacks', { gold: -5, joy: 3, sci: 3 }),
    UP.go('Add a premium heaven tier', { gold: 7, faith: -3 }),
    UP.stop('Pull the plug', { pop: -1, joy: -3 }, 'They left a one-star review on the way out.'),
  ]),
  UP.card(4, [6, 8], '🔌', 'The Server Vote', 'The uploaded now outnumber the living. They want the vote, and they want the electricity that powers the vote.', [
    UP.go('Give them the grid', { gold: -6, sci: 6 }),
    UP.go('Give them the vote', { joy: -3, sci: 4 }, 'They vote a million times a second. Turnout is up 99,000%.'),
    UP.stop('Put them on airplane mode', { mil: 3, joy: -2 }),
  ]),
  UP.card(5, [7, 8], '☁️', 'Mass Upload', 'The scanners are ready. Everyone in {civ} can be uploaded tonight. Bodies will go into storage, labelled and slightly folded.', [
    UP.done('Upload everyone', { pop: -5, sci: 10, joy: -4 }, '{civ} is now the Uploaded. The last person out turned off the lights. The lights were also uploaded.', { flags: { robots: 1 }, threat: -2 }),
    UP.stop('Stay meat', { joy: 4, sci: -3 }),
  ]),
];

const L = path('lunar');
const lunar: CardDef[] = [
  L.card(1, [0, 2], '🌕', 'The Moon Winked', 'During the festival, the moon winked. Only at us. The cult says it was flirting. The astronomers say nothing, loudly.', [
    L.go('Wink back', { faith: 3, weird: 2 }),
    L.stop('Stop looking at it', { faith: -2, sci: 2 }),
  ], { flags: { god_moon: 1 } }, 'a'),
  L.card(1, [0, 2], '🪜', 'The Moon Ladder', 'A man is building a ladder to the moon. He is on rung twelve. He is very confident about rung thirteen.', [
    L.go('Lend him wood', { gold: -1, faith: 2, weird: 2 }),
    L.stop('Use the ladder for firewood', { joy: -1, food: 1 }),
  ], {}, 'b'),
  L.card(2, [2, 4], '📅', 'Moon Calendar Supremacy', 'All holidays now fall on full moons. People have started planning their lives around the moon, and also their move to it.', [
    L.go('Make it the official calendar', { faith: 4, sci: 2, joy: -1 }),
    L.go('Start a moving fund', { gold: -3, joy: 3 }),
    L.stop('Go back to counting sunsets', { faith: -2, gold: 1 }),
  ]),
  L.card(3, [4, 6], '🏡', 'Lunar Real Estate', 'The priests are selling plots on the moon. Sea of Tranquillity views. Sold out in an afternoon.', [
    L.go('Take a cut', { gold: 6, faith: 3, joy: -1 }),
    L.go('Survey the plots with a big telescope', { sci: 5, gold: -3 }),
    L.stop('Refund everyone', { gold: -4, joy: 2 }),
  ]),
  L.card(4, [5, 7], '🤸', 'Practising Low Gravity', 'Citizens now live on trampolines to get used to the moon. Productivity is down. Altitude is up.', [
    L.go('Trampolines for all', { joy: 5, food: -3 }),
    L.go('Build the rockets instead', { gold: -6, sci: 6 }, undefined, { flags: { yeet: 1 } }),
    L.stop('Ground everyone', { joy: -4, gold: 2 }),
  ]),
  L.card(5, [7, 8], '🗝️', 'Leave the Keys Under the Mat', 'The rockets are fuelled. {civ} can move to the moon and leave Earth behind. The aliens can have it. Mind the bins.', [
    L.done('To the moon, for good', { pop: -4, food: -5, sci: 6, faith: 4 }, '{civ} is now the Moonfolk. Earth hangs in the sky like an ex you are doing fine without.', { threat: -5 }),
    L.stop('Visit, but come home for dinner', { joy: -2, sci: 2 }),
  ]),
];

const G = path('ghost');
const ghost: CardDef[] = [
  G.card(1, [0, 2], '👵', 'Grandma Wants a Vote', 'The ancestors have started attending council meetings. They take the good chairs and vote twice, once for each world.', [
    G.go('Give the dead a seat', { faith: 3, joy: -1, weird: 2 }),
    G.stop('Living members only', { faith: -3, joy: 2 }, 'The good chairs remain cold for weeks.'),
  ], { flags: { god_ancestors: 1 } }, 'a'),
  G.card(1, [1, 3], '📜', 'Clerical Error', 'A scribe has recorded the entire village as deceased. Correcting it requires a form, signed by the deceased.', [
    G.go('Accept it, technically', { gold: -3, joy: 2, weird: 3 }, 'Being dead turns out to be mostly a scheduling change.'),
    G.stop('Fill out 400 forms', { gold: -3, sci: 1 }),
  ], { flags: { bureaucracy: 1 } }, 'b'),
  G.card(1, [0, 2], '🕯️', 'The Man Who Did Not Stop', 'Old Hurn died last week and has not noticed. He still turns up to fish. He still catches the most fish.', [
    G.go('Let him keep fishing', { food: 2, weird: 3 }),
    G.stop('Tell him, gently', { faith: 2, joy: -2 }, 'He takes it well, then fades away mid-sentence, which was rude.'),
  ], {}, 'c'),
  G.card(2, [2, 5], '🏚️', 'The Dead Pay No Rent', 'Being officially dead has perks: no taxes, no conscription, front-row seats at funerals. The living are getting jealous.', [
    G.go('Anyone may register as dead', { gold: -4, joy: 5 }),
    G.go('Charge a small death fee', { gold: 5, faith: 2 }),
    G.stop('Death is for the dead only', { mil: 2, joy: -2 }),
  ]),
  G.card(3, [3, 6], '⛓️', 'Haunting as a Career', 'The guild of haunters is now the fastest-growing profession. Graduates can rattle chains in six languages.', [
    G.go('Haunt {rival} for practice', { mil: 3, weird: 4 }, undefined, { rival: { target: 'random', rel: -8, mil: -2 } }),
    G.go('Haunt tourists for money', { gold: 5, weird: 3 }),
    G.stop('Close the guild', { joy: -2, faith: -1 }),
  ]),
  G.card(4, [5, 7], '📊', 'The Quiet Census', 'The census counts four million dead citizens and nine living ones. The dead have excellent attendance at everything.', [
    G.go('Govern for the majority', { faith: 6, pop: -2 }),
    G.go('Give the living a small museum', { joy: 3, gold: -3 }),
    G.stop('Recount until more people are alive', { gold: -4, pop: 2 }),
  ]),
  G.card(5, [6, 8], '👻', 'Give Up the Ghost (Keep the Ghost)', 'The final rite is ready. {civ} can fade completely: technically dead, extremely present, and very hard to invade. Who invades a graveyard?', [
    G.done('Fade together', { pop: -6, faith: 8, weird: 8, joy: -2 }, '{civ} is now the Late. Lights flicker politely. Doors open on their own, for guests.', { threat: -3 }),
    G.stop('Stay inconveniently alive', { joy: 3, faith: -3 }),
  ]),
];

const W = path('tower');
const tower: CardDef[] = [
  W.card(1, [0, 2], '🛖', 'The Hut Extension', 'Someone added a room to their hut. Then another. The hut now has a smaller hut inside it, as a lobby.', [
    W.go('Add a third room', { gold: -2, joy: 3 }),
    W.stop('Ban extensions', { gold: 1, joy: -1 }),
  ], { flags: { custom_big: 1 } }, 'a'),
  W.card(1, [0, 2], '🪵', 'The Longhouse Gets Longer', 'The longhouse is now longer than the village. Walking to the other end counts as a pilgrimage.', [
    W.go('Keep building', { gold: -2, pop: 2 }),
    W.stop('Cut it in half', { joy: -1, food: 1 }),
  ], {}, 'b'),
  W.card(2, [2, 4], '🧗', 'The Roof Is the Road', 'Streets have been abolished. Everyone walks across the roofs, which are now connected. Falling off is considered leaving town.', [
    W.go('Connect every roof', { gold: -3, mil: 3 }),
    W.go('Build roof gardens', { food: 4, gold: -2 }),
    W.stop('Bring back streets', { joy: 1, gold: -1 }),
  ]),
  W.card(3, [3, 6], '🚪', 'Nobody Has Been Outside', 'A child asks what "outside" is. The parents point at a window, which opens into another room.', [
    W.go('Outside is a myth anyway', { gold: 4, sci: 3, joy: -2 }),
    W.go('Paint a sky on the ceiling', { joy: 4, faith: 2, gold: -2 }),
    W.stop('Mandatory outside day', { joy: -1, pop: 1 }, 'People stand in the sun, blinking, holding their coats like shields.'),
  ]),
  W.card(4, [5, 7], '🛗', 'Floor 9,000', 'The building has its own weather on floor 6,000 and a monarchy on floor 7,200. The lift takes one generation each way.', [
    W.go('Install express lifts', { gold: -6, sci: 5 }),
    W.go('Let each floor govern itself', { joy: 4, mil: -2, weird: 3 }),
    W.stop('Demolish the top half', { gold: -4, pop: -2 }),
  ]),
  W.card(5, [6, 8], '🏢', 'One Address', 'The last houses outside are empty. {civ} can move into the Building for good. One door. One postcode. One very long stairwell.', [
    W.done('Everyone inside, lock the door', { food: -4, mil: 8, gold: 4 }, '{civ} is now the Building. The doormat says "Go Away" in nine languages, and soon a tenth.', { threat: -1 }),
    W.stop('Keep a few cottages, for the view', { joy: 3, mil: -2 }),
  ]),
];

const C = path('catmech');
const catmech: CardDef[] = [
  C.card(1, [2, 5], '🐈', 'The Saddle Bond', 'The cat cavalry riders refuse to be separated from their cats, even for baths. Rider and cat now sleep in one heap.', [
    C.go('Respect the heap', { mil: 3, joy: 2 }),
    C.stop('Separate beds, by law', { joy: -3, mil: 1 }, 'Every rider is scratched. Every cat is offended.'),
  ], { flags: { cats: 2 } }, 'a'),
  C.card(1, [1, 4], '😼', 'The Cat Chooses', 'The holy cat has selected a rider. It sat on him and would not move. The priests say this is a coronation.', [
    C.go('Crown the rider', { faith: 3, mil: 2 }),
    C.stop('Lift the cat off him', { faith: -3 }),
  ], { flags: { god_cat: 1 } }, 'b'),
  C.card(2, [3, 6], '〰️', 'Whisker Interfaces', 'Riders have started gluing whiskers to their faces. Communication with their cats has improved three hundred per cent.', [
    C.go('Issue regulation whiskers', { gold: -3, mil: 4 }),
    C.go('Teach the cats to purr in code', { sci: 4, weird: 3 }),
    C.stop('Ban facial whiskers', { joy: -2 }),
  ]),
  C.card(3, [4, 7], '🦾', 'Brass Paws', 'The engineers have made brass prosthetics that link rider and cat. Nobody knows who is steering. Both seem happy.', [
    C.go('Fit every pair', { gold: -6, mil: 6, sci: 3 }, undefined, { flags: { robots: 1 } }),
    C.go('Test on the generals first', { mil: 3, joy: 2 }, 'The generals now knock things off tables during briefings.'),
    C.stop('Paws off', { gold: 2, mil: -1 }),
  ]),
  C.card(4, [5, 8], '🐆', 'The Fusion', 'The final procedure would fuse every citizen with a cybernetic war-cat. One body, two minds, nine lives.', [
    C.done('Become the Purrcussion', { mil: 12, food: -6, joy: 3 }, '{civ} is now the Purrcussion. Productivity peaks at dawn, collapses at noon, and everyone fits in a box.', { flags: { cats: 1, robots: 1 } }),
    C.stop('Stay merely cat-adjacent', { joy: 2, mil: -2 }),
  ]),
];

const D = path('dream');
const dream: CardDef[] = [
  D.card(1, [0, 2], '😴', 'Naptime Overrun', 'The sacred nap lasted three days. Everyone woke up remembering the same hallway, and the same door at the end.', [
    D.go('Nap again, find the door', { joy: 4, gold: -2 }),
    D.stop('Shorten naptime', { joy: -3, gold: 2 }),
  ], { flags: { custom_naps: 1 } }, 'a'),
  D.card(1, [0, 2], '🌙', 'Everyone Dreamt of It', 'Last night every single person dreamt of an enormous sleeping thing, breathing slowly. Nobody can agree who was dreaming whom.', [
    D.go('Try to dream of it again', { faith: 3, weird: 2 }),
    D.stop('Stay up all night instead', { joy: -2, mil: 1 }),
  ], {}, 'b'),
  D.card(2, [2, 4], '🌾', 'Dream Harvest', 'Crops grown in dreams taste better than real ones. They are not very filling, but nobody complains with their mouth full.', [
    D.go('Farm the dream fields', { joy: 4, food: -2, faith: 2 }),
    D.go('Tax dream income', { gold: 4, joy: -2 }),
    D.stop('Wake the farmers', { food: 3, joy: -2 }),
  ]),
  D.card(3, [3, 6], '🌀', 'The Dreamer Revealed', 'The sages are now sure: a god sleeps beneath the world, and {civ} is the thing it is dreaming. It is a nice dream, mostly.', [
    D.go('Sing it lullabies, to keep it asleep', { faith: 6, joy: -1 }),
    D.go('Ask it to dream us richer', { gold: 6, weird: 4 }, 'Overnight, everyone has slightly better shoes.'),
    D.stop('Pinch everyone, hard', { joy: -4, sci: 3 }),
  ]),
  D.card(4, [5, 7], '🛏️', 'Lucid Engineering', 'Architects now design buildings while asleep. The stairs go somewhere new every day. The building inspectors weep.', [
    D.go('Approve the dream plans', { sci: 4, joy: 3, weird: 4 }),
    D.go('Dream up a stronger army', { mil: 6, joy: -2 }, 'The soldiers are excellent. Some of them have no faces, but they are excellent.'),
    D.stop('Ban building while asleep', { gold: 2, joy: -2 }),
  ]),
  D.card(5, [6, 8], '💤', 'Fall Asleep Together', 'The whole of {civ} could step into the dream for good. Bodies tucked in, reality optional, breakfast on request.', [
    D.done('Lie down, everyone', { joy: 8, gold: -5, mil: -3, weird: 6 }, '{civ} is now the Dreamt. Tuesday is purple. Nobody minds.', { threat: -3 }),
    D.stop('Set an alarm', { joy: -3, sci: 3 }),
  ]),
];

const O = path('loop');
const loop: CardDef[] = [
  O.card(1, [1, 3], '🔁', 'Tuesday, Again', 'Everyone agrees today already happened. The fish market remembers selling this exact fish to this exact man.', [
    O.go('Lean into it', { sci: 2, weird: 3 }),
    O.stop('Insist it is Wednesday', { joy: -1, faith: 1 }),
  ], {}, 'a'),
  O.card(1, [0, 3], '⏰', 'Arriving Before Leaving', 'The famously late have begun arriving before they set off. It is the first time anyone has been on time, and it is horrifying.', [
    O.go('Study the latecomers', { sci: 4, joy: -1 }),
    O.stop('Tell them to be late normally', { joy: 2 }),
  ], { flags: { custom_late: 1 } }, 'b'),
  O.card(2, [2, 5], '☂️', 'The Umbrella Merchants', 'Merchants have started selling umbrellas the morning before it rains. They insist it is "a hunch, every time".', [
    O.go('Hire them as advisors', { gold: 6, weird: 2 }),
    O.go('Use the hunches in war', { mil: 5, joy: -1 }, undefined, { rival: { target: 'random', rel: -5, mil: -2 } }),
    O.stop('Arrest them for cheating time', { gold: -2, joy: 1 }),
  ]),
  O.card(3, [4, 6], '🔬', 'The Same Accident, Faster', 'The scientists are looping their experiments. One has now lived through the same lab explosion four hundred times and has notes.', [
    O.go('Publish the notes', { sci: 8, joy: -3 }),
    O.go('Give him a holiday, in a loop', { joy: 3, sci: 3 }),
    O.stop('Break the loop with a hammer', { sci: -2, mil: 2 }),
  ]),
  O.card(4, [5, 7], '🕰️', 'The Loop Clock', 'A clock has been built that only ever shows the same afternoon. Everyone who looks at it gets that afternoon back.', [
    O.go('Put one in every square', { gold: -5, joy: 5 }),
    O.go('Keep it for the generals', { mil: 5, sci: 2 }),
    O.stop('Smash it', { joy: -3 }, 'The clock is smashed. Then it was never smashed. Then it was. It takes a while.'),
  ]),
  O.card(5, [6, 8], '♾️', 'Close the Loop', 'The engineers can lock {civ} into a perfect loop of its best century. Everyone would know every outcome, forever.', [
    O.done('Close it', { sci: 8, joy: 4, pop: -2 }, '{civ} is now the Recurrents. Everyone knows how this ends. Everyone is fine with it.', { threat: -2 }),
    O.stop('Let time go forward, rudely', { joy: -2, gold: 3 }),
  ]),
];

const M = path('mural');
const mural: CardDef[] = [
  M.card(1, [0, 1], '🦬', 'The Painting Moved', 'The buffalo on the cave wall is now facing the other way. It appears to be grazing.', [
    M.go('Paint it some grass', { joy: 2, weird: 2 }),
    M.stop('Paint over it', { faith: 1 }),
  ]),
  M.card(2, [1, 3], '🚪', 'The Painter Went In', 'A painter painted a door on the wall and walked through it. Postcards arrive weekly, in watercolour.', [
    M.go('Send him paint and bread', { food: -2, joy: 3, weird: 2 }),
    M.go('Paint a second door', { faith: 3, weird: 3 }),
    M.stop('Whitewash the wall', { joy: -2 }, 'The postcards stop. The last one just says "oh".'),
  ]),
  M.card(3, [3, 5], '🎨', 'Weekend in the Frame', 'Citizens now spend weekends inside paintings. They come back slightly flatter, very relaxed, and smelling of linseed oil.', [
    M.go('Open a public gallery', { joy: 6, gold: -3 }),
    M.go('Sell tickets', { gold: 5, joy: 2 }),
    M.stop('Ban unauthorised entry into art', { joy: -3, sci: 2 }),
  ]),
  M.card(4, [4, 7], '📐', 'The Perspective Wars', 'A painter has invented perspective. The painted side now has depth, and is annexing the hallway.', [
    M.go('Give the painted side more wall', { joy: 3, weird: 5, gold: -2 }),
    M.go('Paint them an army', { mil: 6, gold: -3 }, 'The painted army is splendid and does not move unless watched.'),
    M.stop('Frame them firmly', { mil: 2, joy: -2 }),
  ]),
  M.card(5, [6, 8], '🖼️', 'Into the Frame', 'The Great Mural is finished, a whole country in oil paint. {civ} can step inside and stay. Painted food never runs out.', [
    M.done('Step into the picture', { pop: -3, joy: 8, food: 6, mil: -3 }, '{civ} is now the Painted. The light is perfect at all times. It is always about four in the afternoon.', { threat: -2 }),
    M.stop('Admire it from the outside', { joy: -2, gold: 3 }),
  ]),
];

const F = path('drift');
const drift: CardDef[] = [
  F.card(1, [1, 3], '🧺', 'The Floating Basket', 'A basket over a fire floated away with a goat in it. The goat came back three weeks later, changed.', [
    F.go('Build a bigger basket', { gold: -2, sci: 3 }),
    F.stop('Keep goats on the ground', { food: 1 }),
  ], {}, 'a'),
  F.card(1, [2, 4], '🐦', 'Follow the Pigeons', 'The pigeons have offered to tow a basket. They have drawn up a contract. It mostly concerns bread.', [
    F.go('Sign the contract', { food: -3, sci: 3, joy: 2 }),
    F.stop('No deals with birds', { joy: -1 }),
  ], { flags: { pigeons: 2 } }, 'b'),
  F.card(2, [3, 5], '🎈', 'Airborne Hamlets', 'The first village has been lifted on balloons. Its residents wave down at everyone, a bit smugly.', [
    F.go('Lift another village', { gold: -4, joy: 4 }),
    F.go('Drop leaflets on {rival}', { mil: 3, weird: 2 }, undefined, { rival: { target: 'random', rel: -6 } }),
    F.stop('Cut the ropes', { pop: -2, joy: -2 }, 'The village drifts off to sea. They send a polite letter from Somewhere Else.'),
  ]),
  F.card(3, [4, 6], '☁️', 'Ground Is for Cowards', 'A new movement says living on the ground is undignified. Its members refuse to land, even to vote.', [
    F.go('Let them vote by dropped pebble', { joy: 3, sci: 3 }),
    F.go('Tax the ground-dwellers', { gold: 5, joy: -3 }),
    F.stop('Ground the movement', { mil: 2, joy: -2 }),
  ]),
  F.card(4, [5, 7], '🌧️', 'Cloud Farming', 'Farmers have learned to grow crops in clouds. The harvest falls as rain, which is inconvenient, but salad.', [
    F.go('Farm every cloud', { food: 6, gold: -3 }),
    F.go('Rain on {rival}\'s parade', { joy: 4 }, undefined, { rival: { target: 'random', rel: -8 } }),
    F.stop('Leave the clouds alone', { food: -2 }),
  ]),
  F.card(5, [6, 8], '🪂', 'Cut the Last Rope', 'The last anchored city could be released. {civ} would live entirely on the wind, never touching the ground again.', [
    F.done('Cut it', { food: -4, sci: 5, joy: 5, mil: -2 }, '{civ} is now the Sky-Drifters. Gravity has been informed and is taking it personally.', { threat: -2 }),
    F.stop('Keep one rope, just in case', { joy: -2, gold: 3 }),
  ]),
];

const I = path('inc');
const inc: CardDef[] = [
  I.card(1, [1, 3], '🧾', 'The Founder\'s IOU', 'Archaeologists found the founder\'s receipt. The whole nation was technically sold to a man called Merv for three goats.', [
    I.go('Honour the contract', { gold: 3, joy: -2 }, 'Merv\'s descendants are thrilled. Merv\'s descendants are everyone.'),
    I.stop('Eat the contract', { food: 1, joy: 2 }),
  ], {}, 'a'),
  I.card(1, [1, 3], '🧮', 'Divine Audit', 'The Auditor Above has finished reviewing the nation and concluded it is, legally, a small business.', [
    I.go('Register the business', { gold: 5, faith: 2, joy: -2 }),
    I.stop('Appeal to a higher auditor', { faith: -2 }),
  ], { flags: { god_tax: 1 } }, 'b'),
  I.card(2, [3, 5], '📈', 'Citizens Get Shares', 'Every newborn now receives one share in the nation. Babies are attending shareholder meetings. They are the most reasonable people there.', [
    I.go('Pay a dividend', { gold: -4, joy: 5 }),
    I.go('Pay it in vouchers', { gold: 3, joy: -1 }),
    I.stop('Citizens are not stock', { joy: 2, gold: -2 }),
  ]),
  I.card(3, [4, 6], '🙏', 'Quarterly Earnings Prayer', 'The temples now close each service with a reading of quarterly results. Faith tracks the stock price perfectly.', [
    I.go('Pray for growth', { gold: 6, faith: 2, joy: -2 }),
    I.go('Hire a priest as CFO', { gold: 4, faith: 4, sci: -2 }),
    I.stop('Keep God out of accounting', { faith: 3, gold: -3 }),
  ]),
  I.card(4, [5, 7], '🤝', 'Hostile Takeover', 'The board proposes a hostile takeover of {rival}. Not a war. Just a lot of paperwork and a very aggressive handshake.', [
    I.go('Acquire them', { gold: -8, mil: 4 }, 'They are now a subsidiary. Their flag has been moved to slide 14.', { rival: { target: 'random', rel: -15, mil: -4 } }),
    I.go('Merge as equals', { gold: 4, joy: 2 }, undefined, { rival: { target: 'friendliest', rel: 15 } }),
    I.stop('Stay a nation, not a company', { joy: 3, gold: -3 }),
  ]),
  I.card(5, [6, 8], '🔔', 'Go Public', 'The lawyers are ready. {civ} can dissolve into a single legal entity, ring a bell, and list on every exchange in the galaxy.', [
    I.done('Ring the bell', { gold: 12, joy: -4 }, '{civ} is now Incorporated. The anthem has a jingle. The jingle has a copyright.', { gov: 'corporatocracy', flags: { bureaucracy: 1 } }),
    I.stop('Stay private', { joy: 2, gold: -2 }),
  ]),
];

const Y = path('wee');
const wee: CardDef[] = [
  Y.card(1, [2, 4], '⚗️', 'The Shrinking Draught', 'An alchemist has shrunk himself to the size of a bean. He reports that the rent is wonderful and the sparrows are a problem.', [
    Y.go('Fund more draughts', { gold: -3, sci: 4, weird: 2 }),
    Y.stop('Keep him in a jar, for safety', { sci: 1, joy: 1 }),
  ]),
  Y.card(2, [3, 5], '🧵', 'The Thimble District', 'A whole neighbourhood has drunk the draught. They live in a thimble now and have founded three universities in it.', [
    Y.go('Give them a second thimble', { sci: 4, pop: 2 }),
    Y.go('Charge them tiny rent', { gold: 3, joy: -1 }),
    Y.stop('Restore them to size', { pop: -1, gold: -3 }, 'They return to size, all at once, and the thimble does not survive.'),
  ]),
  Y.card(3, [4, 6], '🍎', 'One Apple Feeds a District', 'The shrunken districts are eating like kings on a single apple per year. The tall are starting to feel very tall.', [
    Y.go('Shrink the poor first', { food: 6, joy: -3 }),
    Y.go('Shrink volunteers only', { food: 3, joy: 2 }),
    Y.stop('Ration the draught', { food: -2, mil: 2 }),
  ]),
  Y.card(4, [5, 7], '⚛️', 'Atomic Neighbours', 'The smallest citizens report there are other, smaller citizens living below them. They want to trade.', [
    Y.go('Open microscopic trade', { sci: 6, gold: 3, weird: 4 }),
    Y.go('Declare war on the very small', { mil: 5, joy: -3 }, 'It is impossible to tell who is winning.'),
    Y.stop('Stop shrinking at a sensible size', { joy: -1 }),
  ]),
  Y.card(5, [6, 8], '🔬', 'Shrink the Nation', 'The draught is ready in bulk. {civ} can become the size of a grain of rice. A teacup would be a continent.', [
    Y.done('Drink, everyone', { pop: 6, food: 8, mil: -6 }, '{civ} is now the Wee Folk. The old capital is a footprint. The new capital is a teacup.', { threat: -5 }),
    Y.stop('Stay full-sized', { mil: 2, food: -2 }),
  ]),
];

const B = path('belly');
const belly: CardDef[] = [
  B.card(1, [0, 3], '🐸', 'The Frog Yawned', 'The sacred frog yawned during the festival. Inside, it is warm, spacious, and has excellent acoustics.', [
    B.go('Send in the choir', { faith: 4, joy: 2 }),
    B.stop('Close its mouth politely', { faith: -1 }),
  ], { flags: { god_frog: 1 } }, 'a'),
  B.card(1, [1, 3], '🐋', 'The Whale That Stayed', 'A whale has beached itself on purpose and opened its mouth. Inside is a dry room with a very good view of a tongue.', [
    B.go('Take a look inside', { weird: 3, food: 2 }),
    B.stop('Push it back to sea', { joy: 2, mil: -1 }),
  ], {}, 'b'),
  B.card(2, [2, 5], '🛋️', 'Interior Decorating', 'The first families have moved in. They have hung curtains on the ribs. The host does not seem to mind, or notice.', [
    B.go('Allow it', { pop: 2, joy: 3, weird: 2 }),
    B.go('Tax the interior', { gold: 4, joy: -1 }),
    B.stop('Evict everyone', { pop: -2, joy: -2 }),
  ]),
  B.card(3, [4, 6], '🫀', 'Gut Politics', 'The stomach district and the lung district are feuding. The heart district refuses to take sides, rhythmically.', [
    B.go('Hold elections by organ', { joy: 4, gold: -2 }),
    B.go('Feed the host well, keep the peace', { food: -6, faith: 5 }),
    B.stop('Everybody out', { pop: -3, mil: 2 }),
  ]),
  B.card(4, [5, 8], '🐸', 'Moving In', 'The host is about to leave. It is swimming, or hopping, somewhere far away. {civ} can go inside and go with it.', [
    B.done('All inside', { pop: -2, food: 4, faith: 6, mil: -2 }, '{civ} is now the Swallowed. It is dark, warm and gently rocking. Every hiccup is a national holiday.', { threat: -2 }),
    B.stop('Wave it goodbye from the shore', { joy: -3, gold: 2 }),
  ]),
];

export const pathCards: CardDef[] = [
  ...tide, ...turtle, ...spore, ...upload, ...lunar, ...ghost, ...tower, ...catmech,
  ...dream, ...loop, ...mural, ...drift, ...inc, ...wee, ...belly,
];
