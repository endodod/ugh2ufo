import { advanceFromResult, aliveRivals, choose, dipOptions, doDiplomacy, foundCivilization, newGame, ORIGIN_CATEGORIES, pickDecision, registerCards, registerForms, registerOrigins, startTurn, type GameState } from '../src/engine';
import { continueFinale, resolveWave, waveOdds, waveRoutes } from '../src/finale';
import { cards, forms, origins } from '../src/content';
import type { Choice } from '../src/types';

registerCards(cards);
registerOrigins(origins);
registerForms(forms);

type Policy = 'random' | 'greedy';

function score(c: Choice, focus: string): number {
  const e = c.effect ?? {};
  let v = 0;
  for (const [k, n] of Object.entries(e.stats ?? {})) v += (n ?? 0) * (k === 'mil' || k === 'sci' ? 1.2 : 1);
  for (const [k, n] of Object.entries(e.flags ?? {})) v += n * (k === focus ? 25 : 4);
  v -= (e.threat ?? 0) * 2;
  if (c.outcomes || c.check) v += 3;
  return v + Math.random() * 6;
}

function best(choices: Choice[], policy: Policy, focus: string) {
  if (policy === 'random') return Math.floor(Math.random() * choices.length);
  let bi = 0;
  choices.forEach((c, i) => {
    if (score(c, focus) > score(choices[bi], focus)) bi = i;
  });
  return bi;
}

function diplomacy(s: GameState, policy: Policy) {
  const alive = aliveRivals(s);
  const { i } = alive[Math.floor(Math.random() * alive.length)];
  const opts = dipOptions(s, i).filter((o) => o.ok);
  const prefer = policy === 'greedy' ? opts.find((o) => o.action === 'alliance') ?? opts.find((o) => o.action === 'trade') ?? opts.find((o) => o.action === 'gift') : undefined;
  const o = prefer ?? opts[Math.floor(Math.random() * opts.length)];
  doDiplomacy(s, i, o.action);
}

function play(policy: Policy, focus: string) {
  const s: GameState = newGame();
  if (s.phase === 'setup') foundCivilization(s, ORIGIN_CATEGORIES.map((c) => s.offers[c][Math.floor(Math.random() * s.offers[c].length)]));
  startTurn(s);
  const seen = new Set<string>();
  const expected: number[] = [];
  for (let g = 0; g < 4000; g++) {
    if (s.phase === 'decision') {
      s.decisionOptions.forEach((o) => seen.add(o.def.id));
      pickDecision(s, best(s.decisionOptions.map((o) => o.choices[0]), policy, focus));
    } else if (s.phase === 'event' && s.current) {
      seen.add(s.current.def.id);
      choose(s, best(s.current.choices, policy, focus));
    } else if (s.phase === 'diplomacy') diplomacy(s, policy);
    else if (s.phase === 'result' || s.phase === 'era') advanceFromResult(s);
    else if (s.phase === 'finale') {
      if (s.result) {
        s.result = null;
        continue;
      }
      const w = s.finale!.wave;
      const opts = waveRoutes(s).map((r) => ({ r, c: waveOdds(s, r, w).chance }));
      opts.sort((a, b) => b.c - a.c);
      expected.push(opts[0].c);
      resolveWave(s, opts[0].r);
    } else if (s.phase === 'battle') continueFinale(s);
    else break;
  }
  return { s, seen, expected };
}

const N = Number(process.argv[2] ?? 300);
const focuses = (process.argv[3] ?? ',cats,cult,genes,bureaucracy,robots,party').split(',');
for (const policy of ['random', 'greedy'] as Policy[]) {
  for (const focus of policy === 'random' ? [''] : focuses) {
    let dead = 0;
    let wins = 0;
    let finales = 0;
    const waveChance: number[][] = [[], [], []];
    const routeCounts: Record<string, number> = {};
    const stats: Record<string, number[]> = {};
    const seenCount: number[] = [];
    const turnTypes: Record<string, number> = {};
    for (let i = 0; i < N; i++) {
      const { s, seen, expected } = play(policy, focus);
      seenCount.push(seen.size);
      if (s.ending?.route === 'extinct') {
        dead++;
        continue;
      }
      if (!s.finale) continue;
      finales++;
      if (s.ending?.win) wins++;
      expected.forEach((c, w) => waveChance[w].push(c));
      for (const r of s.finale.results) routeCounts[r.route] = (routeCounts[r.route] ?? 0) + 1;
      for (const [k, v] of Object.entries({ ...s.stats, threat: s.threat, alienRel: s.alienRel, allies: s.rivals.filter((r) => r.alive && r.ally).length })) (stats[k] ??= []).push(v);
      turnTypes[s.turnType] = (turnTypes[s.turnType] ?? 0) + 1;
    }
    const avg = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
    console.log(`\n== ${policy}${focus ? ` focus=${focus}` : ''}: finales ${finales}/${N}, died ${dead}, WON ${((wins / Math.max(1, finales)) * 100).toFixed(0)}%, wave chances ${waveChance.map((w) => (avg(w) * 100).toFixed(0) + '%').join(' / ')}, cards seen ${avg(seenCount).toFixed(0)}`);
    console.log('   routes used:', Object.entries(routeCounts).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([k, v]) => `${k}:${v}`).join(' '));
    console.log('   end stats:', Object.entries(stats).map(([k, v]) => `${k}=${avg(v).toFixed(0)}`).join(' '));
  }
}
