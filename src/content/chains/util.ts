import type { CardDef, CardKind, Check, Choice, Cond, Effect, EraRange, Outcome } from '../../types';

export const fu = (id: string, kind: CardKind, emoji: string, title: string, text: string, choices: Choice[]): CardDef => ({
  id: `ch_f_${id}`, kind, emoji, title, text, chainOnly: true, once: true, choices,
});

export const c = (label: string, effect: Effect, req?: Cond): Choice => (req ? { label, effect, req } : { label, effect });

export const chk = (label: string, effect: Effect, check: Check, req?: Cond): Choice => ({ label, effect, check, ...(req ? { req } : {}) });

export const luck = (label: string, outcomes: Outcome[], effect: Effect = {}, req?: Cond): Choice => ({ label, effect, outcomes, ...(req ? { req } : {}) });

export const o = (weight: number, text: string, effect: Effect): Outcome => ({ weight, text, effect });

export const nx = (id: string, delay = 2) => ({ id: `ch_f_${id}`, delay });

export const step = (id: string, delay = 2) => ({ id: `ch_${id}`, delay });

export const ev = (
  id: string, kind: CardKind, emoji: string, title: string, text: string, choices: Choice[],
  opts: { age?: EraRange; req?: Cond; weight?: number; chainOnly?: boolean; once?: boolean } = {},
): CardDef => ({ id: `ch_${id}`, kind, emoji, title, text, once: opts.once ?? true, choices, ...opts });

export const dec = (
  kind: CardKind, id: string, age: EraRange, emoji: string, title: string, text: string, label: string, effect: Effect, req?: Cond,
): CardDef => ({ id: `ch_${id}`, kind, age, emoji, title, text, ...(req ? { req } : {}), choices: [{ label, effect }] });
