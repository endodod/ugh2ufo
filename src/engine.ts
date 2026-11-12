import type { CardDef, Check, Choice, CivForm, Cond, Effect, EraRange, Headline, OriginCategory, OriginDef, Outcome, Stat } from './types';
import { STATS } from './types';
import { ERAS, FLAG_INFO, GOVERNMENTS, STAT_INFO, TURNS_PER_ERA, yearOf, pick, randomPeopleName, randomRivalEmoji, randomRivalName } from './data';

export type Personality = 'warlike' | 'merchant' | 'pious' | 'weird';

export interface Rival {
  name: string;
  emoji: string;
  personality: Personality;
  mil: number;
  rel: number;
  ally: boolean;
  war: boolean;
  alive: boolean;
  trade: boolean;
}

export interface ActiveCard {
  def: CardDef;
  rival: number;
  choices: Choice[];
}

export type Phase = 'setup' | 'intro' | 'decision' | 'diplomacy' | 'event' | 'result' | 'era' | 'finale' | 'battle' | 'ending';

export type TurnType = 'standard' | 'research' | 'reform' | 'works' | 'crisis' | 'diplomacy' | 'quiet';

export interface ChancePart {
  label: string;
  value: number;
}

export type StatDeltas = Partial<Record<Stat, number>>;

export interface ResultInfo {
  title: string;
  lines: string[];
  kind?: 'result' | 'passage' | 'era' | 'finale';
  headlines?: string[];
  yearFrom?: number;
  yearTo?: number;
  deltas?: StatDeltas;
  // flags that went up during the period, for the era summary
  grew?: string[];
  rolled?: boolean;
  roll?: { chance: number; roll: number; success: boolean; parts: ChancePart[] };
}

export interface WaveResult {
  wave: number;
  route: string;
  name: string;
  emoji: string;
  strength: number;
  threat: number;
  chance: number;
  roll: number;
  win: boolean;
  text: string;
  parts: ChancePart[];
}

export interface FinaleState {
  wave: number;
  results: WaveResult[];
}

export interface GameState {
  civ: string;
  leader: string;
  turn: number;
  era: number;
  stats: Record<Stat, number>;
  flags: Record<string, number>;
  gov: string;
  rivals: Rival[];
  threat: number;
  alienRel: number;
  used: string[];
  lastSeen: Record<string, number>;
  chains: { id: string; turn: number; rival?: number }[];
  log: { turn: number; text: string }[];
  phase: Phase;
  decisionOptions: ActiveCard[];
  eventQueue: ActiveCard[];
  current: ActiveCard | null;
  result: ResultInfo | null;
  ending: { win: boolean; title: string; text: string; route: string } | null;
  pendingDecision: boolean;
  origins: string[];
  form: string | null;
  lastChoice: { title: string; label: string; deltas: StatDeltas } | null;
  turnStart: Record<Stat, number> | null;
  eraStart: { stats: Record<Stat, number>; flags: Record<string, number> } | null;
  offers: Record<OriginCategory, string[]>;
  turnType: TurnType;
  finale: FinaleState | null;
  dipSituation?: DipSituation | null;
}

// ---------- registries ----------

let CARDS: CardDef[] = [];
const BY_ID = new Map<string, CardDef>();
const ORIGINS = new Map<string, OriginDef>();
const FORMS = new Map<string, CivForm>();
const HEADLINES: Headline[] = [];

const STAT_LABEL = Object.fromEntries(Object.entries(STAT_INFO).map(([k, v]) => [k, `${v.icon} ${v.name}`])) as Record<Stat, string>;

export function flagLabel(k: string) {
  const o = ORIGINS.get(k);
  if (o) return `${o.emoji} ${o.name}`;
  const f = FLAG_INFO[k];
  return f ? `${f.icon} ${f.name}` : k.replace(/_/g, ' ');
}

// Original content uses 9 eras; the game has 15 ages. Each old era covers a span of ages.
const SPAN: EraRange[] = [
  [0, 1],
  [2, 3],
  [4, 4],
  [5, 5],
  [6, 7],
  [8, 8],
  [9, 9],
  [10, 10],
  [11, 14],
];

export function mapEra(r: EraRange): EraRange {
  const at = (n: number) => SPAN[Math.max(0, Math.min(SPAN.length - 1, n))];
  return [at(r[0])[0], at(r[1])[1]];
}

const NORMALIZED = new WeakSet<object>();

function normCond(c: Cond | undefined) {
  if (!c || NORMALIZED.has(c)) return;
  NORMALIZED.add(c);
  if (c.age) {
    c.era = c.age;
    delete c.age;
  } else if (c.era) c.era = mapEra(c.era);
}

function normCard(c: CardDef) {
  if (NORMALIZED.has(c)) return;
  NORMALIZED.add(c);
  if (c.age) {
    c.era = c.age;
    delete c.age;
  } else if (c.era) c.era = mapEra(c.era);
  normCond(c.req);
  for (const ch of c.choices) normCond(ch.req);
}

export function registerCards(cards: CardDef[]) {
  for (const c of cards) {
    if (BY_ID.has(c.id)) continue;
    normCard(c);
    BY_ID.set(c.id, c);
    CARDS.push(c);
  }
}

export function allCards() {
  return CARDS;
}

export const ORIGIN_CATEGORIES: OriginCategory[] = ['land', 'belief', 'custom', 'founder'];

export function registerOrigins(list: OriginDef[]) {
  for (const o of list) ORIGINS.set(o.id, o);
}

export function originById(id: string) {
  return ORIGINS.get(id);
}

export function hasOrigins() {
  return ORIGINS.size > 0;
}

export function registerForms(list: CivForm[]) {
  for (const f of list) FORMS.set(f.id, f);
}

export function formById(id: string | null) {
  return id ? FORMS.get(id) : undefined;
}

export function registerHeadlines(list: Headline[]) {
  for (const h of list) {
    const copy: Headline = { ...h };
    if (copy.age) copy.era = copy.age;
    else if (copy.era) copy.era = mapEra(copy.era);
    delete copy.age;
    if (copy.req) {
      copy.req = { ...copy.req };
      normCond(copy.req);
    }
    HEADLINES.push(copy);
  }
}

export function rollOffers(s: GameState, only?: OriginCategory) {
  for (const cat of ORIGIN_CATEGORIES) {
    if (only && cat !== only) continue;
    const pool = [...ORIGINS.values()].filter((o) => o.category === cat).sort(() => Math.random() - 0.5);
    s.offers[cat] = pool.slice(0, 3).map((o) => o.id);
  }
}

export function foundCivilization(s: GameState, picks: string[]) {
  const lines: string[] = [];
  for (const id of picks) {
    const o = ORIGINS.get(id);
    if (!o) continue;
    s.origins.push(id);
    s.flags[id] = 1;
    applyEffect(s, o.effect, null, lines);
  }
  s.phase = 'intro';
}

export function statDiff(a: Record<Stat, number>, b: Record<Stat, number>): StatDeltas {
  const out: StatDeltas = {};
  for (const k of STATS) if (b[k] !== a[k]) out[k] = b[k] - a[k];
  return out;
}

function pickHeadlines(s: GameState, n: number): string[] {
  const pool = HEADLINES.filter((h) => (!h.era || (s.era >= h.era[0] && s.era <= h.era[1])) && condOk(s, h.req));
  const out: string[] = [];
  const alive = aliveRivals(s);
  const dummy = { rival: alive.length ? pick(alive).i : -1 } as ActiveCard;
  for (let i = 0; i < n && pool.length; i++) {
    const h = weightedPick(pool, (x) => (x.weight ?? 1) * (x.req ? 3 : 1));
    if (!h) break;
    pool.splice(pool.indexOf(h), 1);
    out.push(fillText(s, dummy, h.text));
  }
  return out;
}

const DECISION_KINDS = new Set(['research', 'policy', 'project', 'government']);

const LEADER_FIRST = ['Ugg', 'Grunda', 'Thok', 'Bleh', 'Morwen', 'Gary', 'Ixa', 'Dobbs', 'Pell', 'Yorrik', 'Fenna', 'Kev', 'Zuzu', 'Olaf', 'Brenda', 'Quill', 'Vex', 'Nim'];
const LEADER_EPITHET = ['the Pretty Okay', 'the Damp', 'Big-Arms', 'the Unready', 'the Loud', 'the Slightly Sticky', 'the Confused', 'Twice-Elected', 'the Snack-Bringer', 'of Little Patience', 'the Bold-ish', 'the Forgetful', 'the Overclocked', 'the Mostly Organic'];
const LEADER_TITLE = ['Chief', 'Chief', 'Elder', 'Elder', 'Consul', 'King', 'Duke', 'Admiral', 'Chairman', 'President', 'Chief Executive', 'Supreme Admin', 'Star-Regent', 'Prime Instance', 'Last Custodian'];

export function newLeader(era: number) {
  return `${LEADER_TITLE[Math.min(era, LEADER_TITLE.length - 1)]} ${pick(LEADER_FIRST)} ${pick(LEADER_EPITHET)}`;
}

export function newGame(): GameState {
  const personalities: Personality[] = (['warlike', 'merchant', 'pious', 'weird'] as Personality[]).sort(() => Math.random() - 0.5);
  const rivals: Rival[] = [];
  for (let i = 0; i < 3; i++) {
    rivals.push({
      name: randomRivalName(),
      emoji: randomRivalEmoji(rivals.map((r) => r.emoji)),
      personality: personalities[i],
      mil: 3 + Math.floor(Math.random() * 3),
      rel: Math.floor(Math.random() * 21) - 10,
      ally: false,
      war: false,
      alive: true,
      trade: false,
    });
  }
  const s: GameState = {
    civ: `The ${randomPeopleName()} People`,
    leader: newLeader(0),
    turn: 0,
    era: 0,
    stats: { pop: 10, food: 10, gold: 5, mil: 3, sci: 0, faith: 0, joy: 50, weird: 0 },
    flags: {},
    gov: 'tribe',
    rivals,
    threat: 30,
    alienRel: 0,
    used: [],
    lastSeen: {},
    chains: [],
    log: [],
    phase: 'intro',
    decisionOptions: [],
    eventQueue: [],
    current: null,
    result: null,
    ending: null,
    pendingDecision: false,
    origins: [],
    form: null,
    lastChoice: null,
    turnStart: null,
    eraStart: null,
    offers: { land: [], belief: [], custom: [], founder: [] },
    turnType: 'standard',
    finale: null,
  };
  if (hasOrigins()) {
    s.phase = 'setup';
    rollOffers(s);
  }
  return s;
}

export function flag(s: GameState, name: string) {
  return s.flags[name] ?? 0;
}

export function aliveRivals(s: GameState) {
  return s.rivals.map((r, i) => ({ r, i })).filter((x) => x.r.alive);
}

export function condOk(s: GameState, c: Cond | undefined): boolean {
  if (!c) return true;
  if (c.era && (s.era < c.era[0] || s.era > c.era[1])) return false;
  if (c.flags) for (const k in c.flags) if (flag(s, k) < c.flags[k]) return false;
  if (c.noFlags) for (const k of c.noFlags) if (flag(s, k) > 0) return false;
  if (c.stats) for (const k in c.stats) if (s.stats[k as Stat] < (c.stats[k as Stat] ?? 0)) return false;
  if (c.maxStats) for (const k in c.maxStats) if (s.stats[k as Stat] > (c.maxStats[k as Stat] ?? 0)) return false;
  if (c.gov && !c.gov.includes(s.gov)) return false;
  const alive = aliveRivals(s);
  if (c.rival && alive.length === 0) return false;
  if (c.allies && alive.filter((x) => x.r.ally).length < c.allies) return false;
  if (c.wars && alive.filter((x) => x.r.war).length < c.wars) return false;
  if (c.rivalRel && !alive.some((x) => x.r.rel >= c.rivalRel![0] && x.r.rel <= c.rivalRel![1])) return false;
  return true;
}

function cardEligible(s: GameState, c: CardDef): boolean {
  if (c.chainOnly) return false;
  if (c.era && (s.era < c.era[0] || s.era > c.era[1])) return false;
  if (c.once !== false && s.used.includes(c.id) && (c.once || !DECISION_KINDS.has(c.kind))) return false;
  const seen = s.lastSeen[c.id];
  if (seen !== undefined && s.turn - seen < 6) return false;
  if (c.kind === 'government' && c.choices.every((ch) => ch.effect?.gov === s.gov)) return false;
  if (c.kind === 'rival' && aliveRivals(s).length === 0) return false;
  return condOk(s, c.req);
}

function cardWeight(s: GameState, c: CardDef): number {
  let w = c.weight ?? 1;
  const need = c.req?.flags;
  if (need) {
    w *= 2.5;
    // the next step of a storyline the player is already on
    if (Object.keys(need).some((k) => flag(s, k) - need[k] <= 1)) w *= 3;
  } else if (c.choices.some((ch) => Object.entries(ch.effect?.flags ?? {}).some(([k, v]) => v > 0 && flag(s, k) === 0 && !flag(s, `${k}_off`)))) {
    // starts a new storyline
    w *= 2;
  }
  if (c.req?.allies || c.req?.wars || c.req?.rivalRel) w *= 2;
  return w;
}

function weightedPick<T>(items: T[], weight: (t: T) => number): T | null {
  const total = items.reduce((a, t) => a + weight(t), 0);
  if (total <= 0) return null;
  let r = Math.random() * total;
  for (const t of items) {
    r -= weight(t);
    if (r <= 0) return t;
  }
  return items[items.length - 1];
}

function bindRival(s: GameState, def: CardDef): number {
  let alive = aliveRivals(s);
  if (!alive.length) return -1;
  const req = def.req;
  if (req?.rivalRel) {
    const match = alive.filter((x) => x.r.rel >= req.rivalRel![0] && x.r.rel <= req.rivalRel![1]);
    if (match.length) alive = match;
  }
  if (req?.allies) {
    const match = alive.filter((x) => x.r.ally);
    if (match.length) alive = match;
  } else if (req?.wars) {
    const match = alive.filter((x) => x.r.war);
    if (match.length) alive = match;
  }
  const target = def.choices.map((c) => c.effect?.rival?.target).find((t) => t && t !== 'same' && t !== 'random');
  if (target === 'strongest') return alive.reduce((a, b) => (b.r.mil > a.r.mil ? b : a)).i;
  if (target === 'friendliest') return alive.reduce((a, b) => (b.r.rel > a.r.rel ? b : a)).i;
  if (target === 'hostile') return alive.reduce((a, b) => (b.r.rel < a.r.rel ? b : a)).i;
  return pick(alive).i;
}

function activate(s: GameState, def: CardDef, rival?: number): ActiveCard {
  s.lastSeen[def.id] = s.turn;
  const keep = rival !== undefined && rival >= 0 && s.rivals[rival]?.alive;
  return { def, rival: keep ? rival! : bindRival(s, def), choices: def.choices.filter((ch) => condOk(s, ch.req)) };
}

export function fillText(s: GameState, card: ActiveCard, text: string): string {
  const rival = card.rival >= 0 ? s.rivals[card.rival].name : 'the neighbours';
  return text.replace(/\{civ\}/g, s.civ).replace(/\{leader\}/g, s.leader).replace(/\{rival\}/g, rival);
}

// ---------- turn types ----------

export const TURN_INFO: Record<TurnType, { name: string; emoji: string; blurb: string }> = {
  standard: { name: 'Council Turn', emoji: '🪑', blurb: 'The council wants one big decision.' },
  research: { name: 'Research Turn', emoji: '🔬', blurb: 'The scholars have cornered you. Pick a field.' },
  reform: { name: 'Reform Turn', emoji: '📜', blurb: 'The people want change. Policies and governments only.' },
  works: { name: 'Great Works', emoji: '🏗️', blurb: 'The builders are bored. Commission something big.' },
  crisis: { name: 'Crisis!', emoji: '🚨', blurb: 'No time for planning. Things are happening all at once.' },
  diplomacy: { name: 'Diplomacy Turn', emoji: '🤝', blurb: 'Something needs your attention abroad.' },
  quiet: { name: 'A Quiet Decade', emoji: '🍵', blurb: 'Almost nothing happens. Enjoy it.' },
};

function pickTurnType(s: GameState): TurnType {
  if (s.turn % TURNS_PER_ERA === 0) return 'standard';
  const options: [TurnType, number][] = [
    ['standard', 3],
    ['research', 1.1],
    ['reform', 1],
    ['works', 1],
    ['crisis', 1.2],
    ['diplomacy', aliveRivals(s).length ? 1.4 : 0],
    ['quiet', 0.6],
  ];
  const filtered = options.filter(([t]) => t === 'standard' || t !== s.turnType);
  return weightedPick(filtered, ([, w]) => w)?.[0] ?? 'standard';
}

function drawDecisions(s: GameState, kinds?: string[]): ActiveCard[] {
  const pool = CARDS.filter((c) => DECISION_KINDS.has(c.kind) && (!kinds || kinds.includes(c.kind)) && cardEligible(s, c));
  const out: CardDef[] = [];
  const kindsWanted = ['research', 'policy', 'project', 'government'];
  for (let i = 0; i < 3; i++) {
    const remaining = pool.filter((c) => !out.includes(c));
    const fresh = remaining.filter((c) => !out.some((o) => o.kind === c.kind));
    const research = !kinds && i === 0 ? remaining.filter((c) => c.kind === 'research') : [];
    const from = research.length ? research : fresh.length && Math.random() < 0.9 ? fresh : remaining;
    const govFactor = kinds?.includes('government') ? 1.5 : 0.6;
    const p = weightedPick(from, (c) => cardWeight(s, c) * (c.kind === 'government' ? govFactor : 1));
    if (p) out.push(p);
  }
  out.sort((a, b) => kindsWanted.indexOf(a.kind) - kindsWanted.indexOf(b.kind));
  return out.map((d) => activate(s, d));
}

function drawEvents(s: GameState, count?: number, crisis = false): ActiveCard[] {
  const out: ActiveCard[] = [];
  const due = s.chains.filter((c) => c.turn <= s.turn);
  s.chains = s.chains.filter((c) => c.turn > s.turn);
  for (const c of due) {
    const def = BY_ID.get(c.id);
    if (def) out.push(activate(s, def, c.rival));
  }
  if (s.stats.joy <= 0 && BY_ID.has('revolution')) out.unshift(activate(s, BY_ID.get('revolution')!));
  if (s.stats.food <= 0 && BY_ID.has('famine') && s.lastSeen['famine'] !== s.turn) out.unshift(activate(s, BY_ID.get('famine')!));
  const base = count ?? (Math.random() < 0.45 ? 2 : 1);
  const wanted = Math.max(0, base - Math.min(out.length, 1));
  for (let i = 0; i < wanted; i++) {
    const pool = CARDS.filter((c) => !DECISION_KINDS.has(c.kind) && cardEligible(s, c) && !out.some((o) => o.def.id === c.id));
    const p = weightedPick(pool, (c) => cardWeight(s, c) * (crisis && c.choices.some((ch) => ch.check) ? 3 : 1));
    if (p) out.push(activate(s, p));
  }
  return out;
}

// ---------- effects ----------

function clampStats(s: GameState) {
  for (const k of STATS) {
    s.stats[k] = Math.round(s.stats[k]);
    if (k !== 'food' && s.stats[k] < 0) s.stats[k] = 0;
  }
  s.stats.joy = Math.min(100, s.stats.joy);
  s.stats.food = Math.max(-5, s.stats.food);
  s.alienRel = Math.max(-100, Math.min(100, s.alienRel));
  for (const r of s.rivals) {
    r.rel = Math.max(-100, Math.min(100, Math.round(r.rel)));
    if (r.war) r.trade = false;
  }
}

function rivalFor(s: GameState, card: ActiveCard | null, target: string): number {
  const alive = aliveRivals(s);
  if (!alive.length) return -1;
  if (target === 'same' && card && card.rival >= 0 && s.rivals[card.rival].alive) return card.rival;
  if (target === 'strongest') return alive.reduce((a, b) => (b.r.mil > a.r.mil ? b : a)).i;
  if (target === 'friendliest') return alive.reduce((a, b) => (b.r.rel > a.r.rel ? b : a)).i;
  if (target === 'hostile') return alive.reduce((a, b) => (b.r.rel < a.r.rel ? b : a)).i;
  if (card && card.rival >= 0 && s.rivals[card.rival].alive && target !== 'random') return card.rival;
  return pick(alive).i;
}

export function applyEffect(s: GameState, e: Effect | undefined, card: ActiveCard | null, lines: string[]) {
  if (!e) return;
  if (e.stats) for (const k in e.stats) s.stats[k as Stat] += e.stats[k as Stat] ?? 0;
  if (e.flags) for (const k in e.flags) s.flags[k] = Math.max(0, flag(s, k) + e.flags[k]);
  if (e.set)
    for (const k in e.set) {
      s.flags[k] = e.set[k];
      if (k.startsWith('form_') && e.set[k] > 0) {
        s.form = k.slice(5);
        const f = FORMS.get(s.form);
        if (f) lines.push(`${f.emoji} ${s.civ} are now ${f.name}.`);
      }
    }
  if (e.threat) s.threat += e.threat;
  if (e.alienRel) s.alienRel += e.alienRel;
  if (e.rival) {
    const i = rivalFor(s, card, e.rival.target);
    if (i >= 0) {
      const r = s.rivals[i];
      if (e.rival.rel) r.rel += e.rival.rel;
      if (e.rival.mil) r.mil = Math.max(0, r.mil + e.rival.mil);
      if (e.rival.ally !== undefined) {
        r.ally = e.rival.ally;
        if (r.ally) r.war = false;
        lines.push(r.ally ? `${r.emoji} ${r.name} is now your ally.` : `${r.emoji} ${r.name} cancelled the alliance.`);
      }
      if (e.rival.war !== undefined) {
        r.war = e.rival.war;
        if (r.war) r.ally = false;
        lines.push(r.war ? `⚔️ War with ${r.name}!` : `🕊️ Peace with ${r.name}.`);
      }
      if (e.rival.trade !== undefined && r.trade !== e.rival.trade) {
        r.trade = e.rival.trade;
        lines.push(r.trade ? `🐪 Trade pact with ${r.name}. Caravans will roll every turn.` : `🚫 The trade pact with ${r.name} is over.`);
      }
      if (e.rival.destroy) {
        r.alive = false;
        lines.push(`💀 ${r.name} is no more.`);
      }
    }
  }
  if (e.chain) s.chains.push({ id: e.chain.id, turn: s.turn + Math.max(1, e.chain.delay), rival: card?.rival });
  if (e.gov && GOVERNMENTS[e.gov]) {
    s.gov = e.gov;
    lines.push(`${GOVERNMENTS[e.gov].emoji} You are now a ${GOVERNMENTS[e.gov].name}.`);
  }
  if (e.text) lines.push(fillText(s, card ?? ({ rival: -1 } as ActiveCard), e.text));
  clampStats(s);
}

export function computeChance(s: GameState, c: Check): { chance: number; parts: ChancePart[] } {
  const parts: ChancePart[] = [{ label: 'Base', value: c.base }];
  if (c.stats)
    for (const k in c.stats) {
      const v = (c.stats[k as Stat] ?? 0) * s.stats[k as Stat];
      if (v) parts.push({ label: STAT_LABEL[k as Stat] ?? k, value: v });
    }
  if (c.flags)
    for (const k in c.flags) {
      const v = c.flags[k] * flag(s, k);
      if (v) parts.push({ label: flagLabel(k), value: v });
    }
  if (c.gov && c.gov[s.gov]) parts.push({ label: GOVERNMENTS[s.gov]?.name ?? s.gov, value: c.gov[s.gov] });
  if (c.allies) {
    const allies = s.rivals.filter((r) => r.alive && r.ally).length;
    const wars = s.rivals.filter((r) => r.alive && r.war).length;
    if (allies) parts.push({ label: 'Allies', value: c.allies * allies });
    if (wars) parts.push({ label: 'Wars', value: -c.allies * wars });
  }
  const raw = parts.reduce((a, p) => a + p.value, 0);
  return { chance: Math.max(0.05, Math.min(0.95, raw)), parts };
}

function rollOutcome(outcomes: Outcome[]): Outcome {
  return weightedPick(outcomes, (o) => o.weight) ?? outcomes[0];
}

export function addLog(s: GameState, text: string) {
  s.log.unshift({ turn: s.turn, text });
  if (s.log.length > 60) s.log.length = 60;
}

export function choose(s: GameState, choiceIndex: number) {
  const card = s.current;
  if (!card) return;
  const choice = card.choices[choiceIndex];
  const lines: string[] = [];
  const before = { ...s.stats };
  applyEffect(s, choice.effect, card, lines);
  const rolled = !!choice.outcomes?.length;
  if (choice.outcomes?.length) {
    const o = rollOutcome(choice.outcomes);
    lines.unshift(fillText(s, card, o.text));
    applyEffect(s, o.effect, card, lines);
  }
  let roll: ResultInfo['roll'];
  if (choice.check) {
    const { chance, parts } = computeChance(s, choice.check);
    const r = Math.random();
    const success = r < chance;
    const res = success ? choice.check.success : choice.check.fail;
    roll = { chance, roll: r, success, parts };
    lines.unshift(fillText(s, card, res.text));
    applyEffect(s, res.effect, card, lines);
  }
  if (choice.effect?.chain || choice.check?.success.effect.chain || choice.check?.fail.effect.chain || choice.outcomes?.some((o) => o.effect.chain))
    if (!lines.some((l) => l.startsWith('⏳'))) lines.push('⏳ This will come back around.');
  const deltas = statDiff(before, s.stats);
  s.lastChoice = { title: fillText(s, card, card.def.title), label: fillText(s, card, choice.label), deltas };
  if (card.def.once !== false) s.used.push(card.def.id);
  addLog(s, `${card.def.emoji ?? '•'} ${fillText(s, card, card.def.title)}: ${choice.label}`);
  s.current = null;
  if (s.phase === 'decision') {
    s.decisionOptions = [];
    s.eventQueue = drawEvents(s, s.turnType === 'standard' ? undefined : 1);
  }
  showResultOrNext(s, { title: fillText(s, card, card.def.title), lines, deltas, rolled, roll, kind: 'result' });
}

function showResultOrNext(s: GameState, r: ResultInfo) {
  if (r.lines.length) {
    s.result = r;
    s.phase = 'result';
  } else {
    s.result = null;
    nextEvent(s);
  }
}

export function continueFromResult(s: GameState) {
  s.result = null;
  nextEvent(s);
}

function nextEvent(s: GameState) {
  if (s.ending) {
    s.phase = 'ending';
    return;
  }
  const next = s.eventQueue.shift();
  if (next) {
    if (next.choices.length === 0) return nextEvent(s);
    s.current = next;
    s.phase = 'event';
    return;
  }
  endTurn(s);
}

// ---------- diplomacy ----------

export type DipAction = 'gift' | 'trade' | 'alliance' | 'spy' | 'insult' | 'war' | 'peace' | 'side' | 'ignore';

export interface DipChoice {
  action: DipAction;
  rival: number;
  // the rival who loses out when you take a side
  other?: number;
  label?: string;
}

export interface DipSituation {
  emoji: string;
  title: string;
  text: string;
  rivals: number[];
  choices: DipChoice[];
}

export interface DipOption {
  action: DipAction;
  emoji: string;
  label: string;
  desc: string;
  ok: boolean;
  why?: string;
  chance?: { chance: number; parts: ChancePart[] };
}

function giftCost(s: GameState) {
  return 5 + s.era * 3;
}

function spyCheck(s: GameState): Check {
  return {
    base: 0.35,
    flags: { spies: 0.12 },
    stats: { sci: 0.001 },
    success: { text: '', effect: {} },
    fail: { text: '', effect: {} },
  };
}

function peaceCheck(s: GameState, r: Rival): Check {
  return {
    base: 0.3 + Math.max(0, r.rel + 60) / 300,
    flags: { diplomats: 0.12 },
    allies: 0.08,
    success: { text: '', effect: {} },
    fail: { text: '', effect: {} },
  };
}

export function dipOption(s: GameState, c: DipChoice): DipOption {
  const r = s.rivals[c.rival];
  const cost = giftCost(s);
  const o = (opt: Omit<DipOption, 'action'>): DipOption => ({ action: c.action, ...opt, label: c.label ?? opt.label });
  switch (c.action) {
    case 'gift':
      return o({ emoji: '🎁', label: 'Send gifts', desc: `-${cost} gold, relations +${r.personality === 'merchant' ? 25 : 18}`, ok: s.stats.gold >= cost, why: `Needs ${cost} gold` });
    case 'trade':
      return o({ emoji: '🐪', label: 'Sign a trade pact', desc: `+${tradeIncome(s, r)} gold every turn while it lasts`, ok: true });
    case 'alliance':
      return o({ emoji: '🛡️', label: 'Accept the alliance', desc: 'They fight beside you, now and when the aliens come', ok: true });
    case 'spy':
      return o({ emoji: '🕵️', label: 'Send spies', desc: `+${4 + s.era * 2} science. Caught: relations -25`, ok: true, chance: computeChance(s, spyCheck(s)) });
    case 'insult':
      return o({ emoji: '😤', label: 'Insult them publicly', desc: '+6 happiness, relations -25', ok: true });
    case 'war':
      return o({ emoji: '⚔️', label: 'Strike first', desc: `Declare war. Their army ${r.mil} vs yours ${s.stats.mil}`, ok: true });
    case 'peace':
      return o({ emoji: '🕊️', label: 'Offer peace', desc: 'End the war', ok: true, chance: computeChance(s, peaceCheck(s, r)) });
    case 'side':
      return o({ emoji: r.emoji, label: `Back ${r.name}`, desc: `${r.name} +20, ${s.rivals[c.other!].name} -20`, ok: true });
    case 'ignore':
      return o({ emoji: '🤷', label: 'Stay out of it', desc: 'Nothing changes', ok: true });
  }
}

// Builds the one situation this diplomacy turn is about, from the current relations.
function makeSituation(s: GameState): DipSituation {
  const alive = aliveRivals(s);
  const list: DipSituation[] = [];
  for (const { r, i } of alive) {
    if (r.war)
      list.push({
        emoji: '🔥', title: 'Smoke on the Border', rivals: [i],
        text: `Raiders from ${r.name} burned another village last night. The generals want orders. The farmers want it to stop.`,
        choices: [{ action: 'peace', rival: i }, { action: 'gift', rival: i, label: 'Pay them off' }, { action: 'insult', rival: i, label: 'Rally the people against them' }],
      });
    else if (r.rel >= 45 && !r.ally)
      list.push({
        emoji: '🤝', title: 'An Offer of Friendship', rivals: [i],
        text: `An envoy from ${r.name} arrives with a sword, a flag and a very long speech about eternal friendship.`,
        choices: [{ action: 'alliance', rival: i }, r.trade ? { action: 'gift', rival: i } : { action: 'trade', rival: i, label: 'Just trade for now' }, { action: 'ignore', rival: i, label: 'Politely decline' }],
      });
    else if (r.rel <= -35 && !r.ally)
      list.push({
        emoji: '⚠️', title: 'Troops at the Border', rivals: [i],
        text: `${r.name} is massing soldiers along the border. They say it is a parade. It is facing us.`,
        choices: [{ action: 'gift', rival: i, label: 'Calm them with gifts' }, { action: 'war', rival: i }, { action: 'insult', rival: i, label: 'Mock their parade' }],
      });
    else if (r.rel >= 15 && !r.trade)
      list.push({
        emoji: '🐪', title: 'Caravans at the Gate', rivals: [i],
        text: `Merchants from ${r.name} wait outside the walls with carts of goods and suspiciously large ears.`,
        choices: [{ action: 'trade', rival: i }, { action: 'spy', rival: i, label: 'Search the carts for secrets' }, { action: 'ignore', rival: i, label: 'Send them away' }],
      });
    else
      list.push({
        emoji: '🎩', title: 'Strangers at Court', rivals: [i],
        text: `An envoy from ${r.name} has arrived. Nobody is sure what they want. They have been eating the palace grapes for three days.`,
        choices: [{ action: 'gift', rival: i }, { action: 'spy', rival: i, label: 'Follow them home' }, { action: 'insult', rival: i, label: 'Throw them out' }],
      });
  }
  if (alive.length >= 2) {
    const [a, b] = [...alive].sort(() => Math.random() - 0.5);
    list.push({
      emoji: '⚖️', title: 'A Neighbourly Feud', rivals: [a.i, b.i],
      text: `${a.r.name} and ${b.r.name} are fighting over a river, a goat, and who saw the goat first. Both demand you take their side.`,
      choices: [{ action: 'side', rival: a.i, other: b.i }, { action: 'side', rival: b.i, other: a.i }, { action: 'ignore', rival: a.i }],
    });
  }
  return list[Math.floor(Math.random() * list.length)];
}

export function dipSituation(s: GameState) {
  return (s.dipSituation ??= makeSituation(s));
}

export function doDiplomacy(s: GameState, n: number) {
  const sit = dipSituation(s);
  const { action, rival: i, other } = sit.choices[n];
  const r = s.rivals[i];
  const lines: string[] = [];
  const before = { ...s.stats };
  let roll: ResultInfo['roll'];
  const card = { rival: i } as ActiveCard;
  const rollCheck = (c: Check) => {
    const { chance, parts } = computeChance(s, c);
    const x = Math.random();
    roll = { chance, roll: x, success: x < chance, parts };
    return roll.success;
  };
  switch (action) {
    case 'gift':
      s.stats.gold -= giftCost(s);
      r.rel += r.personality === 'merchant' ? 25 : 18;
      lines.push(`${r.emoji} ${r.name} accepts your gifts and pretends they were expecting them.`);
      break;
    case 'trade':
      applyEffect(s, { rival: { target: 'same', trade: true, rel: 5 } }, card, lines);
      break;
    case 'alliance':
      applyEffect(s, { rival: { target: 'same', ally: true, rel: 10 } }, card, lines);
      lines.push('They will remember this when the sky goes dark. Probably.');
      break;
    case 'spy':
      if (rollCheck(spyCheck(s))) {
        s.stats.sci += 4 + s.era * 2;
        lines.push(`Your spies return from ${r.name} with blueprints, recipes and a very nice hat.`);
      } else {
        r.rel -= 25;
        lines.push(`Your spy was caught hiding in a vase. ${r.name} has sent the vase back. With the spy.`);
      }
      break;
    case 'insult':
      s.stats.joy += 6;
      r.rel -= r.personality === 'warlike' ? 35 : 25;
      lines.push(`The insult is read aloud in every square. It rhymes. ${r.name} is furious.`);
      break;
    case 'war':
      applyEffect(s, { rival: { target: 'same', war: true, rel: -40 } }, card, lines);
      break;
    case 'peace':
      if (rollCheck(peaceCheck(s, r))) {
        r.war = false;
        r.rel = Math.max(r.rel, -15);
        lines.push(`${r.name} agrees to peace. Both sides claim they won.`);
      } else lines.push(`${r.name} tears up the peace offer and eats it. The war goes on.`);
      break;
    case 'side': {
      const o = s.rivals[other!];
      r.rel += 20;
      o.rel -= 20;
      lines.push(`You back ${r.name}. They are delighted. ${o.name} keeps the goat out of spite.`);
      break;
    }
    case 'ignore':
      lines.push('You let it pass. The envoys go home and the matter is quietly forgotten.');
      break;
  }
  clampStats(s);
  addLog(s, `🤝 ${sit.title}: ${dipOption(s, sit.choices[n]).label}`);
  s.dipSituation = null;
  s.eventQueue = drawEvents(s, 1);
  s.result = { title: sit.title, lines, deltas: statDiff(before, s.stats), roll, kind: 'result' };
  s.phase = 'result';
}

export function tradeIncome(s: GameState, r: Rival) {
  return 2 + Math.floor(s.era / 2) + (r.personality === 'merchant' ? 2 : 0);
}

// ---------- upkeep ----------

function upkeep(s: GameState): string[] {
  const lines: string[] = [];
  const st = s.stats;
  const gov = GOVERNMENTS[s.gov];
  if (gov) for (const k in gov.perTurn) st[k as Stat] += gov.perTurn[k as Stat] ?? 0;
  const formPer = s.form ? FORMS.get(s.form)?.perTurn : undefined;
  if (formPer) for (const k in formPer) st[k as Stat] += formPer[k as Stat] ?? 0;
  for (const id of s.origins) {
    const per = ORIGINS.get(id)?.perTurn;
    if (per) for (const k in per) st[k as Stat] += per[k as Stat] ?? 0;
  }

  const produced = 3 + Math.floor(s.era * 0.6) + Math.floor(st.pop / 6);
  const eaten = Math.ceil(st.pop / 3);
  st.food += produced - eaten;
  st.gold += 1 + Math.floor(st.pop / 10);
  const upkeepCost = Math.floor(st.mil / 20);
  if (upkeepCost > 0) {
    st.gold -= upkeepCost;
    if (st.gold < 0) {
      st.mil -= 3;
      lines.push(`💸 Soldiers went unpaid. Some of them left.`);
    }
  }
  if (st.food >= st.pop) {
    const growth = 1 + Math.floor(st.pop / 12);
    st.pop += growth;
    st.food -= Math.ceil(growth * 1.5);
    lines.push(`👶 Population grew by ${growth}.`);
  }
  if (st.food < 0) {
    const lost = Math.max(1, Math.ceil(st.pop * 0.1));
    st.pop -= lost;
    st.joy -= 6;
    lines.push(`🍂 Hunger! ${lost} people starved or left.`);
  }
  if (st.joy > 55) st.joy -= 2;
  else if (st.joy < 45) st.joy += 2;

  s.threat += 2 + Math.floor(s.era * 0.78);

  let tradeGold = 0;
  for (const r of s.rivals) {
    if (!r.alive) continue;
    r.mil += 1 + Math.floor(s.era / 3) + (r.personality === 'warlike' ? 1 : 0);
    if (r.trade) {
      tradeGold += tradeIncome(s, r);
      r.rel += 1;
    }
    if (r.ally) {
      r.rel += 1;
      st.sci += 1;
    }
    // personalities judge you
    if (r.personality === 'warlike' && st.mil < r.mil * 0.6) r.rel -= 2;
    if (r.personality === 'pious' && st.faith >= 30) r.rel += 1;
    if (r.personality === 'weird' && st.weird >= 30) r.rel += 1;
    if (r.personality === 'merchant' && !r.trade && r.rel > 0) r.rel -= 1;
    if (!r.war && !r.ally && r.rel <= -60 && Math.random() < 0.35) {
      r.war = true;
      lines.push(`⚔️ ${r.emoji} ${r.name} has had enough of you and declares war!`);
    } else if (!r.war && r.rel <= -35 && Math.random() < 0.2) {
      const stolen = Math.min(st.gold, 3 + s.era);
      st.gold -= stolen;
      st.joy -= 2;
      lines.push(`🗡️ Agents of ${r.name} sabotaged a market. ${stolen} gold went missing.`);
    } else if (r.ally && Math.random() < 0.15) {
      const gift = 3 + s.era;
      st.food += gift;
      lines.push(`🎁 Your ally ${r.name} sent ${gift} food, unprompted. Suspicious, but delicious.`);
    }
    if (r.war) {
      const allyHelp = s.rivals.filter((a) => a.alive && a.ally && a !== r).reduce((a, x) => a + x.mil * 0.4, 0);
      const myPower = (st.mil + allyHelp) * (0.75 + Math.random() * 0.5);
      const theirPower = r.mil * (0.75 + Math.random() * 0.5);
      if (myPower >= theirPower) {
        const loot = 2 + s.era;
        st.gold += loot;
        r.mil = Math.max(0, r.mil - 2);
        lines.push(`🛡️ You beat back ${r.name}${allyHelp ? ' with help from your allies' : ''}. Loot: ${loot} gold.`);
        if (myPower > theirPower * 2.2 && Math.random() < 0.3) {
          r.alive = false;
          st.pop += 3;
          lines.push(`🏳️ ${r.name} collapsed entirely. Their people join you.`);
        }
      } else {
        const lost = 1 + Math.floor(s.era / 5);
        st.pop -= lost;
        st.gold = Math.max(0, st.gold - 3);
        st.joy -= 3;
        lines.push(`🔥 ${r.name} raided you. Lost ${lost} people.`);
      }
      if (Math.random() < 0.15) {
        r.war = false;
        r.rel = -20;
        lines.push(`🕊️ Both sides got bored. Peace with ${r.name}.`);
      }
    }
  }
  if (tradeGold) {
    st.gold += tradeGold;
    lines.push(`🐪 Trade caravans brought ${tradeGold} gold.`);
  }
  clampStats(s);
  return lines;
}

export function forecast(s: GameState): Record<'food' | 'gold', number> {
  const st = s.stats;
  const out = {
    food: 3 + Math.floor(s.era * 0.6) + Math.floor(st.pop / 6) - Math.ceil(st.pop / 3),
    gold: 1 + Math.floor(st.pop / 10) - Math.floor(st.mil / 20) + s.rivals.filter((r) => r.alive && r.trade).reduce((a, r) => a + tradeIncome(s, r), 0),
  };
  const sources = [GOVERNMENTS[s.gov]?.perTurn, s.form ? FORMS.get(s.form)?.perTurn : undefined, ...s.origins.map((id) => ORIGINS.get(id)?.perTurn)];
  for (const per of sources) {
    out.food += per?.food ?? 0;
    out.gold += per?.gold ?? 0;
  }
  return out;
}

function grownFlags(s: GameState): string[] {
  const before = s.eraStart?.flags ?? {};
  return Object.keys(s.flags)
    .filter((k) => (s.flags[k] ?? 0) > (before[k] ?? 0) && !k.endsWith('_off') && !k.startsWith('form_') && !ORIGINS.has(k))
    .sort((a, b) => s.flags[b] - (before[b] ?? 0) - (s.flags[a] - (before[a] ?? 0)));
}

export function agesLeft(s: GameState) {
  return ERAS.length - s.era;
}

function endTurn(s: GameState) {
  const yearFrom = yearOf(s.turn);
  const lines = upkeep(s);
  if (s.turnType === 'quiet') {
    s.stats.joy = Math.min(100, s.stats.joy + 4);
    lines.unshift('🍵 A quiet decade. People took naps. Happiness +4.');
  }
  if (s.stats.pop <= 0) {
    s.ending = {
      win: false,
      route: 'extinct',
      title: 'Nobody Left',
      text: `${s.civ} faded away. Archaeologists from a cooler civilization will later find your pottery and call it "fine".`,
    };
    s.phase = 'ending';
    return;
  }
  s.turn += 1;
  const yearTo = yearOf(s.turn);
  const turnDeltas = s.turnStart ? statDiff(s.turnStart, s.stats) : {};
  s.eventQueue = [];
  if (s.turn % TURNS_PER_ERA === 0) {
    const eraDeltas = s.eraStart ? statDiff(s.eraStart.stats, s.stats) : {};
    const grew = grownFlags(s);
    if (s.era >= ERAS.length - 1) {
      s.phase = 'finale';
      s.finale = { wave: 0, results: [] };
      s.result = { kind: 'finale', title: 'The Sky Darkens', lines, deltas: eraDeltas, grew, yearFrom, yearTo, headlines: [] };
      return;
    }
    const oldLeader = s.leader;
    s.era += 1;
    s.leader = newLeader(s.era);
    s.threat += 6;
    const left = agesLeft(s);
    s.result = {
      kind: 'era',
      title: `The ${ERAS[s.era].name}`,
      lines: [`${oldLeader} retires. ${s.leader} takes charge.`, left === 1 ? '🛸 This is the last age. They are almost here.' : `🛸 The fleet arrives in ${left} ages.`, ...lines],
      deltas: eraDeltas,
      grew,
      yearFrom,
      yearTo,
      headlines: pickHeadlines(s, 2),
    };
    s.eraStart = { stats: { ...s.stats }, flags: { ...s.flags } };
    s.phase = 'era';
    return;
  }
  s.result = { kind: 'passage', title: 'Time passes', lines, deltas: turnDeltas, yearFrom, yearTo, headlines: pickHeadlines(s, 3) };
  s.phase = 'result';
  s.pendingDecision = true;
}

export function startTurn(s: GameState) {
  s.result = null;
  s.pendingDecision = false;
  s.turnStart = { ...s.stats };
  if (!s.eraStart) s.eraStart = { stats: { ...s.stats }, flags: { ...s.flags } };
  s.turnType = pickTurnType(s);
  s.decisionOptions = [];
  const t = s.turnType;
  if (t === 'diplomacy' && aliveRivals(s).length) {
    s.phase = 'diplomacy';
    s.dipSituation = makeSituation(s);
    return;
  }
  if (t === 'crisis' || t === 'quiet') {
    s.eventQueue = drawEvents(s, t === 'crisis' ? 3 : 1, t === 'crisis');
    nextEvent(s);
    return;
  }
  const kinds = t === 'research' ? ['research'] : t === 'reform' ? ['policy', 'government'] : t === 'works' ? ['project'] : undefined;
  s.decisionOptions = drawDecisions(s, kinds);
  if (kinds && s.decisionOptions.length < 2) {
    s.turnType = 'standard';
    s.decisionOptions = drawDecisions(s);
  }
  if (!s.decisionOptions.length) {
    s.eventQueue = drawEvents(s);
    nextEvent(s);
    return;
  }
  s.phase = 'decision';
}

export function pickDecision(s: GameState, i: number) {
  const card = s.decisionOptions[i];
  s.current = card;
  choose(s, 0);
}

export function advanceFromResult(s: GameState) {
  if (s.phase === 'finale' || s.phase === 'battle') return;
  if (s.phase === 'era' || s.pendingDecision) {
    startTurn(s);
    return;
  }
  continueFromResult(s);
}
