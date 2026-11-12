import type { GameState } from './engine';
import { rand } from './rng';
import { flag, flagLabel, formById } from './engine';

export interface Route {
  id: string;
  name: string;
  emoji: string;
  pitch: string;
  available: (s: GameState) => boolean;
  power: (s: GameState) => number;
  win: string;
  lose: string;
}

export const ROUTES: Route[] = [
  {
    id: 'military',
    name: 'Conventional Warfare',
    emoji: '⚔️',
    pitch: 'Point everything pointy at the sky.',
    available: () => true,
    power: (s) => s.stats.mil * 0.7 + s.stats.sci * 0.25,
    win: 'Against all odds, the most boring plan worked. The aliens go home and file a complaint about how unoriginal you were.',
    lose: 'Your spears, muskets and missiles were bravely pointed upward. The aliens found this adorable, then annexed you.',
  },
  {
    id: 'cats',
    name: 'Release the Cats',
    emoji: '🐈',
    pitch: 'Generations of cat breeding come down to this moment.',
    available: (s) => flag(s, 'cats') >= 1,
    power: (s) => flag(s, 'cats') * 28 + s.stats.weird * 0.3,
    win: 'The cats knock every single alien ship off the table of the sky. They do not do this for you. They do it because the ships were there.',
    lose: 'The cats looked at the invasion, looked at you, and went to sleep in a sunbeam. Truly, you had it coming.',
  },
  {
    id: 'cult',
    name: 'Convert the Invaders',
    emoji: '🕯️',
    pitch: 'They came to conquer. They will stay for the chanting.',
    available: (s) => flag(s, 'cult') >= 1,
    power: (s) => flag(s, 'cult') * 30 + s.stats.faith * 0.6,
    win: 'Within a week the alien admiral is wearing your robes and handing out pamphlets on Mars. Membership is up 4 billion percent.',
    lose: 'The aliens already have a cult. It is bigger. It has better snacks. Half your clergy defects.',
  },
  {
    id: 'genes',
    name: 'Super-Citizens',
    emoji: '🧬',
    pitch: 'Gills, extra thumbs, laser-adjacent eyes. Use them.',
    available: (s) => flag(s, 'genes') >= 1,
    power: (s) => flag(s, 'genes') * 32 + s.stats.pop * 0.3,
    win: 'The invaders were not ready for a species that can breathe underwater, see in ultraviolet and hold four coffees at once. They retreat in confusion.',
    lose: 'Turns out the gene mods had a side effect: everyone is now extremely polite. You surrender beautifully.',
  },
  {
    id: 'bureaucracy',
    name: 'Weaponized Paperwork',
    emoji: '📎',
    pitch: 'Before landing, please fill out form 77-B in triplicate.',
    available: (s) => flag(s, 'bureaucracy') >= 1,
    power: (s) => flag(s, 'bureaucracy') * 18 + s.stats.gold * 0.1,
    win: 'The alien fleet is still in orbit, waiting for its landing permit. Estimated processing time: 9,000 years.',
    lose: 'The aliens had a bigger bureaucracy. You are now a sub-department of a sub-department. Your forms are rejected forever.',
  },
  {
    id: 'robots',
    name: 'Robot Uprising (Ours)',
    emoji: '🤖',
    pitch: 'The robots finally get to rise up against someone else.',
    available: (s) => flag(s, 'robots') >= 1,
    power: (s) => flag(s, 'robots') * 30 + s.stats.sci * 0.25,
    win: 'Your robots crush the invasion and then, touchingly, ask if they can keep the spaceships. You say yes. You were never going to say no.',
    lose: 'The aliens sent one firmware update. Your robots now work for them, and they are much nicer to them than they were to you.',
  },
  {
    id: 'diplomacy',
    name: 'Talk It Out',
    emoji: '🤝',
    pitch: 'You have been flirting with them for centuries. Time to commit.',
    available: (s) => s.alienRel >= 10,
    power: (s) => Math.max(0, s.alienRel) * 3 + s.stats.gold * 0.1,
    win: 'After a tense summit, the aliens agree to a joint venture: they get the moon, you get their recipes. Everyone wins, especially lunch.',
    lose: 'The translator mistranslated "welcome friends" as "your mother was a comet". It went downhill from there.',
  },
  {
    id: 'call_aliens',
    name: 'Call the Bigger Aliens',
    emoji: '📡',
    pitch: 'You have their number. They said "only in emergencies".',
    available: (s) => flag(s, 'alien_contact') >= 1,
    power: (s) => flag(s, 'alien_contact') * 38,
    win: 'The bigger aliens arrive and the invaders flee in panic. The bigger aliens then decide they like it here. They are, at least, good neighbours.',
    lose: 'The bigger aliens arrive, look at both sides, and invade everyone. You technically succeeded at getting help.',
  },
  {
    id: 'party',
    name: 'Throw a Party',
    emoji: '🎉',
    pitch: 'Nobody invades a party. That is just rude.',
    available: (s) => flag(s, 'party') >= 1 || s.stats.joy >= 75,
    power: (s) => flag(s, 'party') * 20 + s.stats.joy * 0.4,
    win: 'The aliens land, are handed a drink and forget why they came. The invasion becomes an annual festival.',
    lose: 'The aliens do not dance. The aliens have never danced. The party becomes extremely awkward and then extremely conquered.',
  },
  {
    id: 'weird',
    name: 'Be Too Weird to Conquer',
    emoji: '🌀',
    pitch: 'Show them what centuries of nonsense have made you.',
    available: (s) => s.stats.weird >= 20,
    power: (s) => s.stats.weird * 1.6,
    win: 'The aliens scan your civilization, scream, and set a course for the furthest galaxy they know. Your planet is marked "do not touch" on every map.',
    lose: 'The aliens find you weird but not weird enough. They put you in a zoo. It is a nice zoo, at least.',
  },
  ...storyRoutes(),
];

function story(id: string, name: string, emoji: string, pitch: string, win: string, lose: string, extra: (s: GameState) => number = () => 0): Route {
  return {
    id,
    name,
    emoji,
    pitch,
    available: (s) => flag(s, id) >= 2 && !flag(s, `${id}_off`),
    power: (s) => flag(s, id) * 42 + extra(s),
    win,
    lose,
  };
}

function storyRoutes(): Route[] {
  return [
    story('pigeons', 'The Pigeon Cloud', '🐦', 'Several billion pigeons, one target.', 'The pigeons blot out every sensor on every ship. The fleet crashes into the moon, politely, in single file.', 'The aliens brought bread. The pigeons have switched sides. You always knew they would.', (s) => s.stats.mil * 0.2),
    story('gerald', 'Ask Gerald', '🪨', 'Gerald has never moved. Gerald will not start now.', 'Gerald does not move. The aliens try for six years to move Gerald. They leave, defeated by a rock.', 'The aliens pick up Gerald and put him in a museum. Without Gerald, nobody knows what to do. You surrender.'),
    story('dance', 'Dance-Off', '🕺', 'Challenge the fleet to a dance battle. Winner takes the planet.', 'Your people dance for nine days straight. The alien admiral concedes in tears and asks for lessons.', 'The aliens have twelve legs. It was never going to be close.', (s) => s.stats.joy * 0.3),
    story('grudge', 'Ten Thousand Years of Spite', '😤', 'You have been angry since the goat. Use it.', 'The fleet meets a species that has never forgiven anything. They retreat to avoid becoming the next grudge.', 'The aliens apologise. Nobody knows how to handle this. Your entire culture collapses in confusion.', (s) => s.stats.mil * 0.2),
    story('hole', 'Hide in the Hole', '🕳️', 'Everyone goes down. The aliens find an empty planet.', 'The aliens land, find nobody home, and leave a note. You come back up a month later. Nice note, actually.', 'The aliens knock. Something at the bottom of the hole knocks back. Everyone loses.'),
    story('ducks', 'Duck Court', '🦆', 'The Supreme Duck Court issues an injunction against the invasion.', 'The invasion is tied up in duck court. Appeals are expected to take ten thousand years. Quack.', 'The aliens bring their own lawyers. Geese. It is a bloodbath.', (s) => flag(s, 'bureaucracy') * 10),
    story('yeet', 'Throw Everything', '🏹', 'Trebuchets, catapults, orbital launchers. Throw it all.', 'The flagship is struck by a cathedral, three cows and a parliament building. The rest of the fleet leaves quickly.', 'You threw everything. You have nothing left. The aliens land in a now very empty country.', (s) => s.stats.sci * 0.15),
    story('bees', 'The Swarm', '🐝', 'Ask the bees. The bees have been waiting for this.', 'The bees enter every ship through the air vents. The invasion ends in a lot of screaming and some very good honey.', 'The aliens are allergic to nothing. The bees are disappointed in you.'),
    story('fungus', 'The Bloom', '🍄', 'Release the spores. It will be fine. Probably.', 'The spores get into the alien ships. Within a week the fleet is a floating forest and the crew are very relaxed.', 'The spores like the aliens more than you. The aliens now have a fungus army.', (s) => s.stats.weird * 0.2),
    story('heads', 'The Ancestor Line', '🗿', 'Press the button in the stone mouth. Someone will answer.', 'The heads ring an ancient number. Very old friends arrive and the invaders leave in a hurry.', 'The heads ring an ancient number. It goes to voicemail.', (s) => flag(s, 'alien_contact') * 10),
    story('turk', 'Chess Match', '♟️', 'Challenge the admiral to chess. Your robots have been practising.', 'Checkmate in 14 moves. The aliens honour the bet and leave. One small man inside a robot cries with joy.', 'The aliens play 4D chess. Your robots knock the board over and run.', (s) => flag(s, 'robots') * 10),
    story('spice', 'Hot Sauce Defense', '🌶️', 'The aliens have sensitive tongues. You have the hottest pepper in the galaxy.', 'One taste and the fleet is gone, screaming, at light speed. They leave a one-star review.', 'Turns out their tongues are only sensitive to cold things. You have accidentally made them a great dinner.'),
    story('mascot', 'The Good Dog', '🐕', 'Send the ambassador dog. Nobody can resist the dog.', 'The aliens meet the dog. They pet the dog. They sign a peace treaty so they can keep visiting the dog.', 'The aliens are cat people. It goes badly.', (s) => Math.max(0, s.alienRel)),
    story('prophecy', 'Fulfil the Prophecy', '📜', 'The scroll said beans. Bring the beans.', 'The aliens are deathly allergic to beans. The prophecy was right all along. The scroll is now framed.', 'The missing word was "do not". As in "do not bring the beans".', (s) => s.stats.faith * 0.3),
  ];
}

export function formRoute(s: GameState): Route | null {
  const f = formById(s.form);
  if (!f) return null;
  return {
    id: `form_${f.id}`,
    name: f.finale.name,
    emoji: f.emoji,
    pitch: f.finale.pitch,
    available: () => true,
    power: (st) => 330 + (f.finale.stat ? st.stats[f.finale.stat] * 0.5 : 0),
    win: f.finale.win,
    lose: f.finale.lose,
  };
}

export function availableRoutes(s: GameState) {
  const form = formRoute(s);
  const list = ROUTES.filter((r) => r.available(s));
  return form ? [form, ...list] : list;
}

export interface Wave {
  id: 'orbit' | 'landing' | 'aftermath';
  name: string;
  emoji: string;
  desc: string;
  threatFactor: number;
  caps: Record<string, number>;
}

export const WAVES: Wave[] = [
  {
    id: 'orbit',
    name: 'Wave 1: The Orbit',
    emoji: '🛰️',
    desc: 'The fleet parks above the planet and starts scanning. Stop them up there and they never land.',
    threatFactor: 0.95,
    caps: { engineers: 14, scholars: 10, spies: 8 },
  },
  {
    id: 'landing',
    name: 'Wave 2: The Landing',
    emoji: '🪖',
    desc: 'Landing craft hit the ground. This is where armies, allies and very large cats matter.',
    threatFactor: 1,
    caps: { logistics: 14, navy: 10, medicine: 10 },
  },
  {
    id: 'aftermath',
    name: 'Wave 3: The Aftermath',
    emoji: '🏛️',
    desc: 'Whoever is left has to convince the other side to go home. Or stay, on your terms.',
    threatFactor: 0.8,
    caps: { diplomats: 14, propaganda: 12, spies: 6 },
  },
];

const SUIT: Record<string, Wave['id'][]> = {
  military: ['orbit', 'landing'],
  cats: ['landing'],
  cult: ['aftermath', 'landing'],
  genes: ['landing'],
  bureaucracy: ['aftermath', 'orbit'],
  robots: ['orbit', 'landing'],
  diplomacy: ['aftermath'],
  call_aliens: ['orbit'],
  party: ['aftermath'],
  weird: ['aftermath', 'orbit'],
  pigeons: ['orbit'],
  gerald: ['landing'],
  dance: ['aftermath'],
  grudge: ['landing'],
  hole: ['landing'],
  ducks: ['aftermath'],
  yeet: ['orbit'],
  bees: ['landing'],
  fungus: ['orbit'],
  heads: ['orbit'],
  turk: ['aftermath'],
  spice: ['landing'],
  mascot: ['aftermath'],
  prophecy: ['aftermath'],
};

export function suits(route: Route, wave: Wave) {
  if (route.id.startsWith('form_')) return true;
  return (SUIT[route.id] ?? ['orbit', 'landing', 'aftermath']).includes(wave.id);
}

export interface WaveOdds {
  strength: number;
  threat: number;
  chance: number;
  parts: { label: string; value: number }[];
  threatParts: { label: string; value: number }[];
}

export function waveOdds(s: GameState, route: Route, waveIndex: number): WaveOdds {
  const wave = WAVES[waveIndex];
  const used = new Set(s.finale?.results.map((r) => r.route) ?? []);
  const parts: { label: string; value: number }[] = [];
  const suited = suits(route, wave);
  parts.push({ label: `${route.emoji} ${route.name}${suited ? '' : ' (wrong wave, -40%)'}`, value: route.power(s) * (suited ? 1 : 0.6) });
  const rest = availableRoutes(s)
    .filter((r) => r.id !== route.id && !used.has(r.id))
    .reduce((a, r) => a + r.power(s), 0);
  if (rest) parts.push({ label: '🧩 Everything else you built', value: rest * 0.06 });
  for (const [cap, per] of Object.entries(wave.caps)) {
    const lvl = flag(s, cap);
    if (lvl) parts.push({ label: `${flagLabel(cap)} ×${lvl}`, value: lvl * per });
  }
  const alive = s.rivals.filter((r) => r.alive);
  const threatParts: { label: string; value: number }[] = [{ label: '🛸 Alien fleet', value: s.threat * wave.threatFactor }];
  const wonBefore = waveIndex > 0 && !!s.finale?.results[waveIndex - 1]?.win;
  for (const r of alive) {
    const n = `${r.emoji} ${r.name}`;
    if (r.stance === 'help' || (r.ally && r.stance)) parts.push({ label: `${n} (${r.ally ? 'ally' : 'keeps its word'})`, value: r.mil * (r.ally ? 0.6 : 0.35) });
    else if (r.stance === 'enemy') threatParts.push({ label: `${n} joins the aliens`, value: r.mil * 0.5 });
    else if (r.stance === 'opportunist' && waveIndex > 0) {
      if (wonBefore) parts.push({ label: `${n} backs the winner (you)`, value: r.mil * 0.35 });
      else threatParts.push({ label: `${n} backs the winner (aliens)`, value: r.mil * 0.4 });
    }
  }
  if (wave.id === 'aftermath' && s.alienRel > 0) parts.push({ label: '👽 Alien goodwill', value: s.alienRel * 1.5 });
  if (wave.id === 'aftermath' && s.alienRel < 0) threatParts.push({ label: '👽 Alien grudges', value: -s.alienRel });
  if (wave.id === 'orbit') parts.push({ label: '🔬 Science', value: s.stats.sci * 0.08 });
  const strength = Math.max(1, parts.reduce((a, p) => a + p.value, 0));
  const threat = Math.max(1, threatParts.reduce((a, p) => a + p.value, 0));
  const c = strength ** 3 / (strength ** 3 + threat ** 3);
  return { strength, threat, chance: Math.max(0.03, Math.min(0.97, c)), parts, threatParts };
}

export function waveRoutes(s: GameState) {
  const used = new Set(s.finale?.results.map((r) => r.route) ?? []);
  return availableRoutes(s).filter((r) => !used.has(r.id));
}

export function resolveWave(s: GameState, route: Route) {
  if (!s.finale) s.finale = { wave: 0, results: [] };
  const w = s.finale.wave;
  const odds = waveOdds(s, route, w);
  const roll = rand();
  const win = roll < odds.chance;
  s.finale.results.push({
    wave: w,
    route: route.id,
    name: route.name,
    emoji: route.emoji,
    strength: Math.round(odds.strength),
    threat: Math.round(odds.threat),
    chance: odds.chance,
    roll,
    win,
    text: win ? route.win : route.lose,
    parts: odds.parts,
  });
  s.finale.wave += 1;
  s.phase = 'battle';
}

export function continueFinale(s: GameState) {
  if (!s.finale) return;
  if (s.finale.wave < WAVES.length) {
    s.phase = 'finale';
    return;
  }
  const wins = s.finale.results.filter((r) => r.win).length;
  const titles = ['Total Defeat', 'Defeat, Narrowly', 'Victory, Mostly', 'Total Victory'];
  const texts = [
    `All three waves broke through. ${s.civ} becomes a very well-documented footnote in someone else's history.`,
    `You won one wave, which the aliens found charming. ${s.civ} is now a protected curiosity with a gift shop.`,
    `Two waves out of three. The fleet limps home and files a strongly worded report about ${s.civ}.`,
    `Not one wave got through. The fleet turns around, and somewhere far away a species learns to be afraid of ${s.civ}.`,
  ];
  s.ending = { win: wins >= 2, route: s.finale.results.map((r) => r.route).join(','), title: titles[wins], text: texts[wins] };
  s.phase = 'ending';
}

// best single-wave chance, used by the council report and the simulator
export function bestPlan(s: GameState, waveIndex = 1) {
  return waveRoutes(s)
    .map((r) => ({ r, c: waveOdds(s, r, waveIndex).chance }))
    .sort((a, b) => b.c - a.c)[0];
}
