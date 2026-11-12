export type Stat = 'pop' | 'food' | 'gold' | 'mil' | 'sci' | 'faith' | 'joy' | 'weird';

export const STATS: Stat[] = ['pop', 'food', 'gold', 'mil', 'sci', 'faith', 'joy', 'weird'];

// `era` uses the original content scale:
//   0 Stone, 1 Bronze, 2 Classical, 3 Medieval, 4 Renaissance, 5 Industrial, 6 Atomic, 7 Information, 8 Space
// The game now has 15 ages; `era` ranges are spread over them automatically
// (0 -> Stone + Farming, 1 -> Bronze + Iron, 4 -> Renaissance + Exploration, 8 -> Space + all future ages).
// `age` uses the full 15-age scale directly and wins over `era` when both are set:
//   0 Stone, 1 Farming, 2 Bronze, 3 Iron, 4 Classical, 5 Medieval, 6 Renaissance,
//   7 Exploration, 8 Industrial, 9 Atomic, 10 Information, 11 Space,
//   12 Interstellar, 13 Post-Human, 14 The Last Age (Probably)
export type EraRange = [number, number];

export type RivalTarget = 'random' | 'strongest' | 'friendliest' | 'hostile' | 'same';

export interface RivalEffect {
  target: RivalTarget;
  rel?: number;
  mil?: number;
  // marks the rival as allied (true) or at war (false)
  ally?: boolean;
  war?: boolean;
  // wipes the rival from the map
  destroy?: boolean;
  // opens (true) or cancels (false) a trade pact: +gold every turn while it lasts
  trade?: boolean;
}

export interface Effect {
  stats?: Partial<Record<Stat, number>>;
  // adds to flag counters
  flags?: Record<string, number>;
  // sets flag counters to exact values
  set?: Record<string, number>;
  rival?: RivalEffect;
  // alien invasion strength (+ makes the finale harder)
  threat?: number;
  // alien attitude towards you (+ friendlier)
  alienRel?: number;
  // schedules a follow-up event (chainOnly event id) N turns later
  chain?: { id: string; delay: number };
  gov?: string;
  // extra flavour line shown after choosing
  text?: string;
}

export interface Outcome {
  weight: number;
  text: string;
  effect: Effect;
}

export interface Cond {
  era?: EraRange;
  // flag must be >= value
  flags?: Record<string, number>;
  // flag must be 0 / missing
  noFlags?: string[];
  // stat must be >= value
  stats?: Partial<Record<Stat, number>>;
  // stat must be <= value
  maxStats?: Partial<Record<Stat, number>>;
  gov?: string[];
  // needs at least one living rival
  rival?: boolean;
  // 12-age scale, see EraRange
  age?: EraRange;
  // at least this many allied rivals / rivals at war with you
  allies?: number;
  wars?: number;
  // some living rival has relations within [min, max] (-100..100); {rival} is bound to it
  rivalRel?: [number, number];
}

// A skill check: the success chance is built from what the player did earlier.
// Final chance is clamped to 5%..95% and shown to the player with its breakdown.
export interface Check {
  // base chance, 0..1
  base: number;
  // added chance per stat point, e.g. { mil: 0.01 } = +1% per Military point
  stats?: Partial<Record<Stat, number>>;
  // added chance per flag level (storylines, origins, reactive flags); may be negative
  flags?: Record<string, number>;
  // flat bonus/malus for the current government
  gov?: Record<string, number>;
  // flat bonus per allied rival / malus per rival at war
  allies?: number;
  // leader trait modifier that applies to this roll
  trait?: 'spy' | 'peace';
  success: { text: string; effect: Effect };
  fail: { text: string; effect: Effect };
}

export interface Choice {
  label: string;
  effect?: Effect;
  // random result instead of (or on top of) the fixed effect
  outcomes?: Outcome[];
  // chance-based result; applied after `effect` (which acts as the cost of trying)
  check?: Check;
  // choice only shown when condition met
  req?: Cond;
}

export type CardKind =
  | 'event'
  | 'history'
  | 'rival'
  | 'alien'
  | 'research'
  | 'policy'
  | 'project'
  | 'government';

export interface CardDef {
  id: string;
  kind: CardKind;
  title: string;
  // placeholders: {civ} your civ, {leader} your ruler, {rival} a rival civ name
  text: string;
  emoji?: string;
  era?: EraRange;
  // 12-age scale, preferred for new content
  age?: EraRange;
  weight?: number;
  once?: boolean;
  req?: Cond;
  // only appears via an Effect.chain
  chainOnly?: boolean;
  // decision cards (research/policy/project/government) use a single choice
  choices: Choice[];
}

// Picked once at the start of a run. The engine sets flag `<id>` = 1, so cards can
// require an origin via `req: { flags: { land_coast: 1 } }`.
export type OriginCategory = 'land' | 'belief' | 'custom' | 'founder';

export interface OriginDef {
  id: string;
  category: OriginCategory;
  name: string;
  emoji: string;
  desc: string;
  // applied once at the start
  effect: Effect;
  // applied every turn for the whole run
  perTurn?: Partial<Record<Stat, number>>;
  // origins that cannot be combined with this one
  excludes?: string[];
}

// Short flavour line shown on the time-passing screen between turns.
// Placeholders: {civ}, {leader}, {rival}
export interface Headline {
  text: string;
  era?: EraRange;
  age?: EraRange;
  req?: Cond;
  weight?: number;
}

// A transformation of the whole civilization (underwater, uploaded, fungal...).
// Cards turn it on with `set: { form_<id>: 1 }`; the latest one set is the active form.
export interface CivForm {
  id: string;
  name: string;
  emoji: string;
  // replaces "People" in the civ name display, e.g. "Tide-Folk"
  noun: string;
  desc: string;
  perTurn?: Partial<Record<Stat, number>>;
  finale: {
    name: string;
    pitch: string;
    win: string;
    lose: string;
    // stat that adds to this ending's strength
    stat?: Stat;
  };
}

export interface Government {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  // applied every turn
  perTurn: Partial<Record<Stat, number>>;
}
