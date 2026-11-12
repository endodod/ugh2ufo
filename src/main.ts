import './style.css';
import type { Choice, Effect, OriginCategory, Stat } from './types';
import { STATS } from './types';
import {
  advanceFromResult,
  agesLeft,
  aliveRivals,
  dipOption,
  dipSituation,
  doDiplomacy,
  tradeIncome,
  TURN_INFO,
  allCards,
  choose,
  computeChance,
  fillText,
  formById,
  foundCivilization,
  newGame,
  newTrait,
  traitOf,
  originById,
  ORIGIN_CATEGORIES,
  pickDecision,
  registerCards,
  registerForms,
  registerHeadlines,
  registerOrigins,
  rollOffers,
  startTurn,
  type ActiveCard,
  type GameState,
  type StatDeltas,
  canPay,
} from './engine';
import { ERAS, FLAG_INFO, GOVERNMENTS, STAT_INFO, TURNS_PER_ERA, formatYear, yearOf } from './data';
import { WAVES, continueFinale, resolveWave, suits, waveOdds, waveRoutes } from './finale';
import { cards, forms, headlines, origins } from './content';
import { PAPERS, advisorName, councilReport, epithet } from './ui/advisor';
import { dailySeed, rand, randomSeed, rngState, seedRng, setRngState } from './rng';
import * as fx from './ui/fx';
import * as snd from './ui/sound';
import logoSvg from '../branding/logo.svg?raw';

registerCards(cards);
registerOrigins(origins);
registerForms(forms);
registerHeadlines(headlines);

const SAVE_KEY = 'ugh-to-ufo-save';
const app = document.getElementById('app')!;
let state: GameState | null = null;
let prevStats: Record<string, number> = {};
let prevEra = -1;
let setupPicks: Partial<Record<OriginCategory, string>> = {};
let setupStep = 0;
let busy = false;

const CATEGORY_LABEL: Record<OriginCategory, { title: string; sub: string; icon: string }> = {
  land: { title: 'Where do you start?', sub: 'The land shapes the people. Mostly by being in the way.', icon: '🗺️' },
  belief: { title: 'What do you worship?', sub: 'Every people needs something to blame.', icon: '🙏' },
  custom: { title: 'What is your strange custom?', sub: 'Every culture has one. Yours is worse.', icon: '🎭' },
  founder: { title: 'How did it all begin?', sub: 'The legend your children will get wrong.', icon: '📜' },
};

const KIND_LABEL: Record<string, string> = {
  event: 'Event',
  history: 'History, roughly',
  rival: 'Neighbours',
  alien: 'Strange Signals',
  research: 'Research',
  policy: 'Policy',
  project: 'Project',
  government: 'Government',
};

const FLAVOR = [
  'Sharpening sticks...',
  'Teaching fire not to do that again...',
  "Drafting a constitution. It's mostly about goats.",
  'Consulting the oracle. She says "maybe".',
  'Training cats to accept saddles...',
  'Your ancestors left no notes. Improvising.',
  'Filing the paperwork for the paperwork.',
  'Looking up. Nothing there yet.',
  'Reminding the king that he is, in fact, the king.',
  'Somewhere far away, a saucer is being polished.',
];

const LOGO = logoSvg
  .replace(/#FF8A3D/gi, 'var(--accent)')
  .replace(/#EDE6D6/gi, 'var(--text)')
  .replace(/#7CF29A/gi, 'var(--accent-2)')
  .replace(/#14121F/gi, 'var(--bg)')
  .replace('<svg ', '<svg class="logo" ');

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

function save() {
  if (!state) return;
  try {
    state.rng = rngState();
    localStorage.setItem(SAVE_KEY, JSON.stringify(state, (k, v) => (k === 'def' ? v.id : v)));
  } catch {
    /* storage unavailable */
  }
}

function load(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const byId = new Map(allCards().map((c) => [c.id, c]));
    const s = JSON.parse(raw, (k, v) => (k === 'def' ? byId.get(v) : v)) as GameState;
    const cardsOk = (list: (ActiveCard | null)[]) => list.every((c) => !c || c.def);
    if (!cardsOk([s.current, ...(s.decisionOptions ?? []), ...(s.eventQueue ?? [])])) return null;
    if (s.phase === 'ending' || !('lastChoice' in s)) return null;
    if (s.seed) setRngState(s.rng);
    else {
      s.seed = randomSeed();
      seedRng(s.seed);
      s.rng = rngState();
    }
    if (!s.trait) s.trait = newTrait();
    return s;
  } catch {
    return null;
  }
}

function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* storage unavailable */
  }
}

function signed(n: number) {
  return n > 0 ? `+${n}` : `${n}`;
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function flagName(k: string) {
  const o = originById(k);
  if (o) return `${o.emoji} ${o.name}`;
  return FLAG_INFO[k] ? `${FLAG_INFO[k].icon} ${FLAG_INFO[k].name}` : `✨ ${k.replace(/_/g, ' ')}`;
}

function statChips(d: StatDeltas | Partial<Record<Stat, number>> | undefined, cls = '') {
  if (!d) return '';
  return STATS.filter((k) => d[k])
    .map((k, i) => `<span class="chip ${d[k]! > 0 ? 'up' : 'down'} ${cls}" style="--i:${i}">${STAT_INFO[k].icon} ${signed(d[k]!)}</span>`)
    .join('');
}

function effectChips(e: Effect | undefined, s: GameState, card: ActiveCard): string[] {
  const out: string[] = [];
  if (!e) return out;
  if (e.stats)
    for (const k of STATS) {
      const v = e.stats[k];
      if (v) out.push(`<span class="chip ${v > 0 ? 'up' : 'down'}">${STAT_INFO[k].icon} ${signed(v)}</span>`);
    }
  if (e.flags)
    for (const k in e.flags) {
      const v = e.flags[k];
      if (v && !k.endsWith('_off')) out.push(`<span class="chip special">${flagName(k)} ${v > 0 ? '▲' : '▼'}</span>`);
    }
  if (e.rival) {
    const r = card.rival >= 0 ? s.rivals[card.rival] : null;
    const who = e.rival.target === 'same' || e.rival.target === undefined ? (r?.emoji ?? '🏳️') : '🏳️';
    if (e.rival.rel) out.push(`<span class="chip ${e.rival.rel > 0 ? 'up' : 'down'}">${who} relations ${signed(e.rival.rel)}</span>`);
    if (e.rival.war) out.push(`<span class="chip down">${who} war</span>`);
    if (e.rival.ally) out.push(`<span class="chip up">${who} alliance</span>`);
    if (e.rival.mil) out.push(`<span class="chip">${who} ⚔️ ${signed(e.rival.mil)}</span>`);
  }
  if (e.threat) out.push(`<span class="chip ${e.threat > 0 ? 'down' : 'up'}">👽 threat ${signed(e.threat)}</span>`);
  if (e.alienRel) out.push(`<span class="chip special">👽 ♥ ${signed(e.alienRel)}</span>`);
  if (e.gov && GOVERNMENTS[e.gov]) out.push(`<span class="chip special">${GOVERNMENTS[e.gov].emoji} ${GOVERNMENTS[e.gov].name}</span>`);
  if (e.promise) out.push(`<span class="chip special">⏳ ${esc(e.promise.text)} · ${e.promise.turns} turns</span>`);
  if (e.chain) out.push(`<span class="chip special">⏳ consequences</span>`);
  return out;
}

function oddsBlock(s: GameState, c: Choice) {
  if (!c.check) return '';
  const { chance, parts } = computeChance(s, c.check);
  const tone = chance >= 0.65 ? 'good' : chance >= 0.35 ? 'mid' : 'bad';
  const list = parts.map((p) => `<span class="${p.value >= 0 ? 'pos' : 'neg'}">${esc(p.label)} ${p.label === 'Base' ? pct(p.value) : (p.value >= 0 ? '+' : '') + pct(p.value)}</span>`).join('');
  return `<span class="odds ${tone}">
    <span class="odds-top"><span class="odds-label">🎲 Chance</span><b>${pct(chance)}</b></span>
    <span class="odds-bar"><span style="--w:${Math.round(chance * 100)}%"></span></span>
    <span class="odds-parts">${list}</span>
  </span>`;
}

function choiceButton(s: GameState, card: ActiveCard, c: Choice, attr: string, i: number) {
  const chips = effectChips(c.effect, s, card);
  if (c.outcomes?.length) chips.push(`<span class="chip special">🎲 gamble</span>`);
  return `<button class="choice ${c.check ? 'has-check' : ''}" ${attr} style="--i:${i}">
    <span class="key">${i + 1}</span>
    <span class="label">${esc(fillText(s, card, c.label))}</span>
    ${oddsBlock(s, c)}
    <span class="chips">${chips.join('')}</span>
  </button>`;
}

function renderStats(s: GameState) {
  const rows = STATS.map((k: Stat) => {
    const v = s.stats[k];
    const shown = k === 'joy' ? `${v}%` : `${v}`;
    const bar = k === 'joy' ? `<span class="minibar"><span style="width:${v}%"></span></span>` : '';
    return `<div class="stat" data-stat="${k}"><span>${STAT_INFO[k].icon} ${STAT_INFO[k].name}</span><span class="v ${v < 0 ? 'neg' : ''}">${shown}</span>${bar}</div>`;
  }).join('');
  const flags = Object.entries(s.flags)
    .filter(([k, v]) => v > 0 && !k.endsWith('_off') && !k.startsWith('form_') && !originById(k))
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `<div class="flag"><span>${flagName(k)}</span><span class="pips">${'●'.repeat(Math.min(v, 6))}<span class="off">${'●'.repeat(Math.max(0, 6 - v))}</span></span></div>`)
    .join('');
  const pledges = s.promises
    .map((p) => {
      const left = p.due - s.turn;
      return `<div class="flag ${left <= 1 && !canPay(s, p) ? 'neg' : ''}"><span>⏳ ${esc(p.text)} · ${left} turn${left === 1 ? '' : 's'} left</span></div>`;
    })
    .join('');
  const ids = s.origins.map((id) => originById(id)).filter(Boolean);
  const identity = ids.length ? `<div class="panel identity"><h3>Who You Are</h3>${ids.map((o) => `<div class="flag"><span>${o!.emoji} ${esc(o!.name)}</span></div>`).join('')}</div>` : '';
  return `
    <div class="panel"><h3>Your People</h3>${rows}</div>
    <div class="panel"><h3>Things That Are Happening</h3>${pledges}${flags || (pledges ? '' : '<div class="empty">Nothing weird yet. Give it time.</div>')}</div>
    ${identity}`;
}

function personalityLabel(p: string) {
  return { warlike: '🗡️ warlike', merchant: '🪙 merchants', pious: '🕯️ pious', weird: '🌀 weird' }[p] ?? p;
}

function renderWorld(s: GameState) {
  const rivals = s.rivals
    .map((r) => {
      const w = Math.abs(r.rel) / 2;
      const color = r.rel >= 0 ? 'var(--good)' : 'var(--bad)';
      const bar = r.rel >= 0 ? `left:50%;width:${w}%;` : `right:50%;width:${w}%;`;
      const tags = !r.alive
        ? '<span class="tag dead">gone</span>'
        : `${r.war ? '<span class="tag war">at war</span>' : ''}${r.ally ? '<span class="tag ally">🛡️ ally</span>' : ''}${r.trade ? `<span class="tag trade">🐪 +${tradeIncome(s, r)}/turn</span>` : ''}${!r.ally && r.rel >= 50 ? '<span class="tag ally">would help</span>' : ''}${!r.ally && (r.rel <= -50 || r.war) ? '<span class="tag war">may join aliens</span>' : ''}`;
      return `<div class="rival ${r.war ? 'at-war' : ''} ${r.alive ? '' : 'gone'}">
        <div class="name"><span class="remoji">${r.emoji}</span> ${esc(r.name)}</div>
        <div class="meta"><span>${personalityLabel(r.personality)}</span><span>⚔️ ${r.mil}</span>${tags}</div>
        ${r.alive ? `<div class="relbar"><div style="${bar}background:${color}"></div></div>` : ''}
      </div>`;
    })
    .join('');
  const known = s.era >= 6;
  const danger = Math.min(1, s.threat / 600);
  const threat = known
    ? `<div class="threat" style="--danger:${danger}">${s.threat}</div><div class="empty">Alien fleet strength. It only goes up.</div>`
    : `<div class="threat unknown">???</div><div class="empty">Something is out there. Probably.</div>`;
  const rel = s.alienRel !== 0 ? `<div class="stat"><span>👽 Alien opinion of you</span><span class="v">${signed(s.alienRel)}</span></div>` : '';
  const log = s.log
    .slice(0, 30)
    .map((l) => `<div><b>${formatYear(yearOf(l.turn))}</b> ${esc(l.text)}</div>`)
    .join('');
  return `
    <div class="panel"><h3>Neighbours</h3>${rivals}</div>
    <div class="panel sky era-${s.era}"><h3>The Sky · arrives in ${agesLeft(s)} age${agesLeft(s) === 1 ? '' : 's'}</h3><div class="sky-art"><span class="ship" style="--n:${s.era}">🛸</span></div>${threat}${rel}</div>
    <div class="panel"><h3>Chronicle</h3><div class="log">${log || '<div>History has not started yet.</div>'}</div></div>`;
}

function lastChoiceToast(s: GameState) {
  const lc = s.lastChoice;
  if (!lc) return '';
  const chips = statChips(lc.deltas, 'pop-in');
  s.lastChoice = null;
  if (!chips) return '';
  return `<div class="toast"><span class="toast-label">↳ ${esc(lc.label)}</span><span class="chips">${chips}</span></div>`;
}

function renderCard(s: GameState, card: ActiveCard) {
  const d = card.def;
  const choices = card.choices.map((c, i) => choiceButton(s, card, c, `data-choice="${i}"`, i)).join('');
  const banner = s.turnType === 'crisis' || s.turnType === 'quiet' ? turnBanner(s) : '';
  return `${lastChoiceToast(s)}${banner}<div class="card event-card kind-${d.kind}">
    <div class="card-shine"></div>
    <div class="kind">${KIND_LABEL[d.kind] ?? d.kind} · ${formatYear(yearOf(s.turn))}</div>
    <div class="emoji bob">${d.emoji ?? '❔'}</div>
    <h2>${esc(fillText(s, card, d.title))}</h2>
    <p class="type">${esc(fillText(s, card, d.text))}</p>
    <div class="choices">${choices}</div>
  </div>`;
}

function turnBanner(s: GameState) {
  const t = TURN_INFO[s.turnType ?? 'standard'];
  return `<div class="turn-banner tt-${s.turnType ?? 'standard'}"><span class="tb-emoji">${t.emoji}</span><span><b>${t.name}</b><span class="tb-blurb">${t.blurb}</span></span></div>`;
}

function renderDiplomacy(s: GameState) {
  const sit = dipSituation(s);
  const who = sit.rivals
    .map((i) => {
      const r = s.rivals[i];
      const w = Math.abs(r.rel) / 2;
      const bar = r.rel >= 0 ? `left:50%;width:${w}%;background:var(--good)` : `right:50%;width:${w}%;background:var(--bad)`;
      return `<div class="dip-who"><span class="dip-emoji">${r.emoji}</span><div><b>${esc(r.name)}</b>
        <span class="dip-desc">${personalityLabel(r.personality)} · ⚔️ ${r.mil} · relations ${signed(r.rel)}</span>
        <div class="relbar"><div style="${bar}"></div></div></div></div>`;
    })
    .join('');
  const actions = sit.choices
    .map((c, n) => {
      const o = dipOption(s, c);
      return `<button class="dip-btn" data-dip="${n}" ${o.ok ? '' : `disabled title="${esc(o.why ?? '')}"`}>
        <span class="dip-emoji">${o.emoji}</span>
        <span><b>${esc(o.label)}</b><span class="dip-desc">${esc(o.ok ? o.desc : (o.why ?? o.desc))}</span>
        ${o.chance ? `<span class="dip-chance">🎲 ${pct(o.chance.chance)}</span>` : ''}</span>
      </button>`;
    })
    .join('');
  return `${lastChoiceToast(s)}${turnBanner(s)}<div class="card event-card dip-card">
    <div class="card-shine"></div>
    <div class="kind">Diplomacy · ${formatYear(yearOf(s.turn))}</div>
    <div class="emoji bob">${sit.emoji}</div>
    <h2>${esc(sit.title)}</h2>
    <p class="type">${esc(sit.text)}</p>
    <div class="dip-whos">${who}</div>
    <div class="dip-actions">${actions}</div>
  </div>`;
}

function renderCouncil(s: GameState) {
  const notes = councilReport(s)
    .map((n, i) => `<li class="note ${n.tone}" style="--i:${i}"><span class="note-icon">${n.icon}</span><span>${esc(n.text)}</span></li>`)
    .join('');
  return `<div class="council"><div class="council-head">${advisorName(s)} reports</div><ul>${notes}</ul></div>`;
}

function renderDecisions(s: GameState) {
  const cards = s.decisionOptions
    .map((card, i) => {
      const d = card.def;
      const c = card.choices[0];
      return `<div class="card decision tilt kind-${d.kind}" style="--i:${i}">
        <div class="card-shine"></div>
        <div class="kind">${KIND_LABEL[d.kind] ?? d.kind}</div>
        <div class="emoji">${d.emoji ?? '❔'}</div>
        <h2>${esc(fillText(s, card, d.title))}</h2>
        <p>${esc(fillText(s, card, d.text))}</p>
        ${c ? choiceButton(s, card, c, `data-decision="${i}"`, i) : ''}
      </div>`;
    })
    .join('');
  return `${lastChoiceToast(s)}${turnBanner(s)}${renderCouncil(s)}
    <div class="phase-title"><h2>What should ${esc(s.civ)} focus on?</h2><span>Pick one</span></div>
    <div class="decisions">${cards}</div>`;
}

function renderResult(s: GameState) {
  const r = s.result!;
  s.lastChoice = null;
  if (r.kind === 'passage') return renderPassage(s);
  if (r.kind === 'era') return renderEra(s);
  if (r.kind === 'finale') return renderFinaleIntro(s);
  const items = r.lines.map((l, i) => `<li style="--i:${i}">${esc(l)}</li>`).join('');
  let dice = '';
  if (r.roll) {
    const need = Math.round(r.roll.chance * 100);
    const got = Math.max(1, Math.ceil(r.roll.roll * 100));
    dice = `<div class="dice-box" data-got="${got}" data-success="${r.roll.success ? 1 : 0}">
      <div class="dice">🎲</div>
      <div class="dice-num">--</div>
      <div class="dice-need">Needed ${need} or less</div>
      <div class="verdict ${r.roll.success ? 'success' : 'fail'}">${r.roll.success ? 'Success!' : 'Failed!'}</div>
    </div>`;
  } else if (r.rolled) {
    dice = `<div class="dice-box gamble" data-got="0"><div class="dice">🎲</div><div class="dice-num">?</div></div>`;
  }
  return `<div class="card result ${dice ? 'has-dice' : 'revealed'}">
    <h2>${esc(r.title)}</h2>
    ${dice}
    <div class="reveal">
      ${items ? `<ul class="lines">${items}</ul>` : ''}
      ${r.deltas && Object.keys(r.deltas).length ? `<div class="chips deltas">${statChips(r.deltas, 'pop-in')}</div>` : ''}
      <button class="primary" data-continue>Continue <span class="kbd">␣</span></button>
    </div>
  </div>`;
}

function renderPassage(s: GameState) {
  const r = s.result!;
  const heads = (r.headlines ?? []).map((h, i) => `<li style="--i:${i}">${esc(h)}</li>`).join('');
  const lines = r.lines.map((l, i) => `<li style="--i:${i}">${esc(l)}</li>`).join('');
  const deltas = statChips(r.deltas, 'pop-in');
  return `<div class="card passage">
    <div class="hourglass">⏳</div>
    <div class="year" data-from="${r.yearFrom}" data-to="${r.yearTo}">${formatYear(r.yearFrom ?? 0)}</div>
    <div class="timebar"><div></div></div>
    ${heads ? `<div class="paper"><div class="masthead">📰 ${PAPERS[s.era]} <span>${formatYear(r.yearTo ?? 0)}</span></div><ul class="headlines">${heads}</ul></div>` : ''}
    <div class="after-tick">
      ${lines ? `<ul class="lines">${lines}</ul>` : ''}
      ${deltas ? `<div class="turn-sum"><span>This turn</span><span class="chips">${deltas}</span></div>` : ''}
      <button class="primary" data-continue>Next turn <span class="kbd">␣</span></button>
    </div>
  </div>`;
}

function renderEra(s: GameState) {
  const r = s.result!;
  const era = ERAS[s.era];
  const letters = [...r.title].map((ch, i) => `<span style="--i:${i}">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');
  const sum = STATS.filter((k) => r.deltas?.[k])
    .map((k, i) => `<div class="era-stat" style="--i:${i}"><span>${STAT_INFO[k].icon}</span><b class="${r.deltas![k]! > 0 ? 'up' : 'down'}" data-count="${r.deltas![k]}">0</b></div>`)
    .join('');
  const grew = (r.grew ?? []).slice(0, 3).map(flagName);
  const heads = (r.headlines ?? []).map((h, i) => `<li style="--i:${i}">${esc(h)}</li>`).join('');
  return `<div class="card era-splash">
    <div class="era-emoji">${era.emoji}</div>
    <div class="kind">${formatYear(r.yearTo ?? 0)}</div>
    <h2 class="era-title">${letters}</h2>
    <div class="era-body">
      <div class="era-sub">The last era, in numbers</div>
      <div class="era-stats">${sum || '<span class="empty">Nothing changed. Impressive, in a way.</span>'}</div>
      ${grew.length ? `<div class="remembered">History will remember it for: <b>${grew.map(esc).join(', ')}</b></div>` : ''}
      <ul class="lines">${r.lines.map((l, i) => `<li style="--i:${i}">${esc(l)}</li>`).join('')}</ul>
      ${heads ? `<div class="paper"><div class="masthead">📰 ${PAPERS[s.era]}</div><ul class="headlines">${heads}</ul></div>` : ''}
      <button class="primary" data-continue>Onward <span class="kbd">␣</span></button>
    </div>
  </div>`;
}

function renderFinaleIntro(s: GameState) {
  return `<div class="card finale-intro">
    <div class="fleet">${'🛸'.repeat(7)}</div>
    <h2>The Sky Darkens</h2>
    <p>${formatYear(s.result?.yearTo ?? 4500)}. A shadow falls across the planet. Thousands of ships. They are not here for the cats. Hopefully.</p>
    <p>They will come in three waves: the orbit, the landing and the aftermath. For each wave you pick a different plan.</p>
    <p class="empty">Fleet strength: <b>${s.threat}</b></p>
    <button class="primary danger" data-continue>Face them</button>
  </div>`;
}

function renderFinale(s: GameState) {
  const w = s.finale?.wave ?? 0;
  const wave = WAVES[w];
  const done = (s.finale?.results ?? [])
    .map((r) => `<span class="wave-pill ${r.win ? 'won' : 'lost'}">${WAVES[r.wave].emoji} ${r.emoji} ${r.win ? 'held' : 'lost'}</span>`)
    .join('');
  const routes = waveRoutes(s)
    .map((r) => ({ r, o: waveOdds(s, r, w), fit: suits(r, wave) }))
    .sort((a, b) => b.o.chance - a.o.chance)
    .map(
      ({ r, o, fit }, i) => `<button class="choice route ${fit ? 'fit' : 'misfit'}" data-route="${r.id}" style="--i:${i}">
        <span class="em">${r.emoji}</span>
        <span><span class="label">${esc(r.name)}${fit ? ' <span class="fit-tag">good for this wave</span>' : ''}</span><span class="empty">${esc(r.pitch)}</span>
          <span class="odds-bar"><span style="--w:${Math.round(o.chance * 100)}%"></span></span>
          <span class="odds-parts">${o.parts.map((p) => `<span class="pos">${esc(p.label)} ${Math.round(p.value)}</span>`).join('')}</span></span>
        <span class="pct">${pct(o.chance)}</span>
      </button>`,
    )
    .join('');
  return `<div class="card finale">
    <div class="waves-done">${done}</div>
    <div class="kind">${wave.name} · ${w + 1} of 3</div>
    <div class="emoji bob">${wave.emoji}</div>
    <h2>${wave.name.split(': ')[1]}</h2>
    <p>${wave.desc} Each plan can only be used once, so think about the waves still to come. Win two of three and you survive.</p>
    <div class="choices">${routes}</div>
  </div>`;
}

function renderBattle(s: GameState) {
  const res = s.finale!.results[s.finale!.results.length - 1];
  const wave = WAVES[res.wave];
  const share = res.strength / (res.strength + res.threat);
  const got = Math.max(1, Math.ceil(res.roll * 100));
  const last = s.finale!.wave >= WAVES.length;
  return `<div class="card battle has-dice" data-share="${share.toFixed(3)}" data-win="${res.win ? 1 : 0}">
    <div class="kind">${wave.name}</div>
    <h2>${res.emoji} ${esc(res.name)}</h2>
    <div class="tug"><div class="tug-fill" style="--pos:50%"></div><div class="tug-knot" style="--pos:50%">💥</div></div>
    <div class="tug-labels"><span>${esc(s.civ)} <b data-count="${res.strength}">0</b></span><span><b data-count="${res.threat}">0</b> Aliens 🛸</span></div>
    <div class="battle-parts">${res.parts.map((p, i) => `<span class="chip pop-in" style="--i:${i}">${esc(p.label)} +${Math.round(p.value)}</span>`).join('')}</div>
    <div class="dice-box" data-got="${got}" data-success="${res.win ? 1 : 0}" data-wait="1">
      <div class="dice">🎲</div><div class="dice-num">--</div>
      <div class="dice-need">Needed ${Math.round(res.chance * 100)} or less</div>
      <div class="verdict ${res.win ? 'success' : 'fail'}">${res.win ? 'Wave held!' : 'Wave lost!'}</div>
    </div>
    <div class="reveal">
      <p>${esc(res.text)}</p>
      <button class="primary ${last ? 'pulse' : ''}" data-battle-next>${last ? 'See how it ends' : 'Next wave'} <span class="kbd">␣</span></button>
    </div>
  </div>`;
}

function renderEnding(s: GameState) {
  const e = s.ending!;
  const st = s.stats;
  const waves = (s.finale?.results ?? [])
    .map((r, i) => `<div class="wave-row ${r.win ? 'won' : 'lost'}" style="--i:${i}"><span class="em">${WAVES[r.wave].emoji}</span><span><b>${WAVES[r.wave].name}: ${r.emoji} ${esc(r.name)}</b> <span class="verdict-small">${r.win ? 'held' : 'lost'}</span><br /><span class="empty">${esc(r.text)}</span></span></div>`)
    .join('');
  return `<div class="ending ${e.win ? 'win' : 'lose'}"><div class="card">
    <div class="emoji big-pop">${e.win ? '🏆' : '🪦'}</div>
    <h2>${esc(e.title)}</h2>
    <p class="type">${esc(e.text)}</p>
    ${waves ? `<div class="wave-list">${waves}</div>` : ''}
    <div class="summary">
      <div>${STAT_INFO.pop.icon} ${st.pop}</div><div>${STAT_INFO.mil.icon} ${st.mil}</div>
      <div>${STAT_INFO.sci.icon} ${st.sci}</div><div>${STAT_INFO.weird.icon} ${st.weird}</div>
    </div>
    <p class="empty">${esc(s.civ)}, ${esc(epithet(s))}. ${ERAS[s.era].name}.</p>
    <p class="empty">Seed: ${esc(s.seed)} <button class="ghost seed-copy" data-copy-seed>Copy</button></p>
    <button class="primary" data-new>Try another civilization</button>
  </div></div>`;
}

const seedLabel = (seed: string) => (seed.startsWith('DAILY-') ? `Daily ${seed.slice(6)}` : esc(seed));

function soundCtl() {
  return `<span class="badge sound-ctl"><button class="snd-btn" data-mute title="Mute / unmute">${snd.isMuted() ? '🔇' : '🔊'}</button><input type="range" class="snd-vol" min="0" max="1" step="0.05" value="${snd.getVolume()}" aria-label="Volume"></span>`;
}

function renderTitle() {
  const saved = load();
  snd.setAmbientAge(-1);
  app.innerHTML = `<div class="title-screen">
    <h1 class="sr-only">Ugh to UFO</h1>
    <div class="logo-wrap">${LOGO}</div>
    <div class="tagline">Fifteen ages to get ready. You won't be.</div>
    <div class="buttons">
      <button class="primary pulse" data-new title="Start a civilization. Try to keep it.">New Run</button>
      <button class="ghost" data-new data-seed="${dailySeed()}" title="Same world for everyone today">Daily Run</button>
      ${saved ? '<button class="ghost" data-resume>Continue</button>' : ''}
    </div>
    <div class="seed-row"><input id="seed-in" class="seed-input" maxlength="24" placeholder="Seed" aria-label="Seed" /><button class="ghost" data-new data-seed-input>Play seed</button></div>
    <div class="badges title-sound">${soundCtl()}</div>
    <div class="flavor">${FLAVOR[Math.floor(Math.random() * FLAVOR.length)]}</div>
  </div>`;
}

function originCard(s: GameState, id: string, cat: OriginCategory, i: number) {
  const o = originById(id)!;
  const chips = effectChips(o.effect, s, { rival: -1 } as ActiveCard);
  for (const [k, v] of Object.entries(o.perTurn ?? {}))
    if (v) chips.push(`<span class="chip ${v > 0 ? 'up' : 'down'}">${STAT_INFO[k as Stat].icon} ${signed(v)}/turn</span>`);
  const taken = Object.values(setupPicks).filter((p) => p && p !== setupPicks[cat]);
  const blocked = taken.some((p) => o.excludes?.includes(p!) || originById(p!)?.excludes?.includes(o.id));
  return `<button class="card origin tilt ${setupPicks[cat] === o.id ? 'picked' : ''}" data-origin="${o.id}" data-cat="${cat}" ${blocked ? 'disabled' : ''} style="--i:${i}">
    <div class="card-shine"></div>
    <div class="emoji">${o.emoji}</div>
    <h2>${esc(o.name)}</h2>
    <p>${esc(o.desc)}</p>
    <span class="chips">${chips.join('')}</span>
  </button>`;
}

function renderSetup(s: GameState) {
  const steps = ORIGIN_CATEGORIES.length + 2;
  const dots = Array.from({ length: steps }, (_, i) => `<span class="dot ${i === setupStep ? 'on' : i < setupStep ? 'done' : ''}"></span>`).join('');
  let body = '';
  if (setupStep < 0) {
    const slides = [
      {
        icon: '🌌',
        title: 'Far away, in a galaxy that is honestly quite close...',
        text: 'A fleet starts its engines. Destination: your planet. Estimated arrival: fifteen ages from now. They are not coming to say hello.',
      },
      {
        icon: '🔥',
        title: 'You have until then.',
        text: 'You lead one people from the first campfire to the stars. You never micromanage. Each turn you make one big call and deal with what happens. Some turns are crises, some are diplomacy, some are mercifully quiet.',
      },
      {
        icon: '🛸',
        title: 'When they come, they come in three waves.',
        text: 'The orbit, the landing and the aftermath. For each wave you pick a different plan, built from everything you did: armies, science, allies, cults, cats, paperwork, or something much stranger. One trick will not be enough. Hold two waves and you survive.',
      },
    ];
    const slide = slides[setupStep + 3];
    const pdots = slides.map((_, i) => `<span class="dot ${i === setupStep + 3 ? 'on' : i < setupStep + 3 ? 'done' : ''}"></span>`).join('');
    return `<div class="setup prologue"><div class="dots">${pdots}</div><div class="setup-page">
      <div class="setup-icon prologue-icon">${slide.icon}</div>
      <h2>${slide.title}</h2>
      <p class="prologue-text">${slide.text}</p>
      <div class="setup-actions">
        <button class="ghost" data-step="0">Skip intro</button>
        <button class="primary pulse" data-step="${setupStep + 1}">${setupStep === -1 ? 'Found a civilization' : 'Next'}</button>
      </div>
    </div></div>`;
  }
  if (setupStep === 0) {
    body = `<div class="setup-page" key="name">
      <div class="setup-icon">🔥</div>
      <h2>${ERAS[0].year}. A small tribe sits around a fire.</h2>
      <p class="empty">What do they call themselves?</p>
      <input id="civ-name" class="big-input" maxlength="40" value="${esc(s.civ)}" />
      <div class="setup-actions">
        <button class="ghost" data-random-all>🎲 Surprise me (skip setup)</button>
        <button class="primary" data-step="1">Next</button>
      </div>
    </div>`;
  } else if (setupStep <= ORIGIN_CATEGORIES.length) {
    const cat = ORIGIN_CATEGORIES[setupStep - 1];
    const L = CATEGORY_LABEL[cat];
    body = `<div class="setup-page">
      <div class="setup-icon">${L.icon}</div>
      <h2>${L.title}</h2>
      <p class="empty">${L.sub}</p>
      <div class="decisions origins">${s.offers[cat].filter((id) => originById(id)).map((id, i) => originCard(s, id, cat, i)).join('')}</div>
      <div class="setup-actions">
        <button class="ghost" data-step="${setupStep - 1}">Back</button>
        <button class="ghost" data-reroll="${cat}">🎲 Other options</button>
      </div>
    </div>`;
  } else {
    const picked = ORIGIN_CATEGORIES.map((c) => originById(setupPicks[c] ?? ''))
      .filter(Boolean)
      .map((o, i) => `<div class="summary-row" style="--i:${i}"><span class="emoji">${o!.emoji}</span><span><b>${esc(o!.name)}</b><br /><span class="empty">${esc(o!.desc)}</span></span></div>`)
      .join('');
    body = `<div class="setup-page">
      <div class="setup-icon">🏕️</div>
      <h2>${esc(s.civ)}</h2>
      <p class="empty">This is who you are. It will matter more than you think.</p>
      <div class="summary-list">${picked}</div>
      <div class="setup-actions">
        <button class="ghost" data-step="${setupStep - 1}">Back</button>
        <button class="primary pulse" data-found>Found the civilization</button>
      </div>
    </div>`;
  }
  return `<div class="setup"><div class="dots">${dots}</div>${body}</div>`;
}

function renderIntro(s: GameState) {
  return `<div class="card intro">
    <div class="kind">${ERAS[0].year}</div>
    <div class="emoji bob">🔥</div>
    <h2>${esc(s.civ)}</h2>
    ${s.origins.length ? `<p class="origin-line">${s.origins.map((id) => originById(id)).filter((o) => o).map((o) => `${o!.emoji} ${esc(o!.name)}`).join(' · ')}</p>` : ''}
    <p>Your people have discovered fire, the rock, and a strong opinion about the tribe across the river. ${esc(s.leader)} has just been put in charge, mostly because they were holding the stick.</p>
    <p>Somewhere out there, a fleet is on its way. It arrives in fifteen ages, in three waves. Everything you build until then is a weapon, a shield, or at least a distraction.</p>
    <p>You get one big decision per turn. Make them count, or at least make them interesting.</p>
    <button class="primary pulse" data-start>Begin the Stone Age</button>
  </div>`;
}

function render() {
  if (!state) {
    renderTitle();
    return;
  }
  const s = state;
  document.documentElement.dataset.era = `${s.era}`;
  fx.setAmbientEra(s.era);
  snd.setAmbientAge(s.era);
  if (s.phase === 'setup') {
    app.innerHTML = `<div class="app">${renderSetup(s)}</div>`;
    save();
    return;
  }
  let stage = '';
  if (s.phase === 'intro') stage = renderIntro(s);
  else if (s.phase === 'decision') stage = renderDecisions(s);
  else if (s.phase === 'event' && s.current) stage = renderCard(s, s.current);
  else if ((s.phase === 'result' || s.phase === 'era' || s.phase === 'finale') && s.result) stage = renderResult(s);
  else if (s.phase === 'finale') stage = renderFinale(s);
  else if (s.phase === 'battle') stage = renderBattle(s);
  else if (s.phase === 'diplomacy') stage = renderDiplomacy(s);
  else if (s.phase === 'ending') stage = renderEnding(s);

  const gov = GOVERNMENTS[s.gov];
  const form = formById(s.form);
  const total = ERAS.length * TURNS_PER_ERA;
  const turnShown = Math.min(s.turn + 1, total);
  const ticks = ERAS.map((e, i) => `<span class="tick ${i <= s.era ? 'past' : ''}" style="left:${(i / ERAS.length) * 100}%" title="${e.name}">${e.emoji}</span>`).join('');
  app.innerHTML = `<div class="app">
    <div class="topbar">
      <div class="civ"><h1>${esc(s.civ)}</h1><div class="sub">${esc(epithet(s))} · ${esc(s.leader)} · <span title="${esc(traitOf(s).desc)}">${traitOf(s).emoji} ${esc(traitOf(s).name)}</span></div></div>
      <div class="badges">
        ${soundCtl()}
        <button class="badge seed-badge" data-copy-seed title="Copy seed">🌱 ${seedLabel(s.seed)}</button>
        <span class="badge year-badge">📅 ${formatYear(yearOf(s.turn))}</span>
        <span class="badge">${ERAS[s.era].emoji} ${ERAS[s.era].name}</span>
        <span class="badge" title="${esc(gov?.desc ?? '')}">${gov?.emoji ?? ''} ${gov?.name ?? s.gov}</span>
        ${form ? `<span class="badge form-badge" title="${esc(form.desc)}">${form.emoji} ${esc(form.name)}</span>` : ''}
        <span class="badge">Turn ${turnShown}/${total}</span>
      </div>
    </div>
    <div class="progress"><div style="width:${(s.turn / total) * 100}%"></div>${ticks}</div>
    <div class="layout">
      <aside class="sidebar">${renderStats(s)}</aside>
      <main class="stage">${stage}</main>
      <aside class="sidebar">${renderWorld(s)}</aside>
    </div>
  </div>`;
  save();
}

let prevKey = '';
function afterRender() {
  const s = state;
  if (!s) return;
  // stat count-ups and floating deltas
  for (const k of STATS) {
    const before = prevStats[k];
    const now = s.stats[k];
    const row = app.querySelector(`.stat[data-stat="${k}"]`);
    const v = row?.querySelector('.v') as HTMLElement | null;
    if (!row || !v || before === undefined || before === now) continue;
    fx.countUp(v, before, now, 700, (n) => (k === 'joy' ? `${n}%` : `${n}`));
    v.classList.add(now > before ? 'flash-up' : 'flash-down');
    fx.floatText(row, signed(now - before), now > before ? 'up' : 'down');
  }
  prevStats = { ...s.stats };

  if (s.era !== prevEra && prevEra !== -1 && s.phase === 'era') {
    fx.flash('rgba(255,138,61,0.25)');
    fx.burstAt(app.querySelector('.era-emoji'), [ERAS[s.era].emoji, '✨', '⭐'], 30, 12);
  }
  prevEra = s.era;
  const key = `${s.phase}:${s.turn}:${s.era}:${s.result?.kind ?? ''}`;
  if (key !== prevKey) {
    prevKey = key;
    if (s.phase === 'finale' || s.phase === 'battle') snd.sfx('alien');
    else if (s.result?.kind === 'era') snd.sfx('era');
    else if (s.phase === 'event' || s.phase === 'decision') snd.sfx('card');
  }

  const year = app.querySelector('.passage .year') as HTMLElement | null;
  if (year) {
    const from = Number(year.dataset.from);
    const to = Number(year.dataset.to);
    fx.countUp(year, from, to, 1300, formatYear);
  }
  app.querySelectorAll<HTMLElement>('.era-stat b[data-count]').forEach((b, i) => {
    setTimeout(() => fx.countUp(b, 0, Number(b.dataset.count), 800, signed), 600 + i * 120);
  });

  const battle = app.querySelector('.battle') as HTMLElement | null;
  const diceBox = app.querySelector('.dice-box') as HTMLElement | null;
  if (battle) animateBattle(battle);
  else if (diceBox) rollDice(diceBox);

  const typed = app.querySelector('.event-card p.type') as HTMLElement | null;
  if (typed) fx.typewriter(typed, 12);

  if (s.phase === 'battle') {
    // effects are triggered by animateBattle
  }
  if (s.phase === 'finale' && s.result) {
    fx.shake('big');
    fx.flash('rgba(255,60,60,0.35)');
    fx.rain(['🛸', '👽', '🛸'], 18);
  }
  if (s.phase === 'ending' && s.ending) {
    if (s.ending.win) fx.confetti(['🎉', '🏆', '✨', '🎊', ERAS[s.era].emoji], 5);
    else {
      fx.shake('big');
      fx.rain(['💥', '🛸', '🪨', '🔥'], 35);
    }
  }
}

function animateBattle(card: HTMLElement) {
  const share = Number(card.dataset.share);
  const win = card.dataset.win === '1';
  const fill = card.querySelector('.tug-fill') as HTMLElement;
  const knot = card.querySelector('.tug-knot') as HTMLElement;
  card.querySelectorAll<HTMLElement>('.tug-labels b[data-count]').forEach((b) => fx.countUp(b, 0, Number(b.dataset.count), 1200));
  const final = win ? Math.max(62, Math.min(92, share * 100 + 20)) : Math.min(38, Math.max(8, share * 100 - 20));
  const setPos = (p: number) => {
    fill.style.setProperty('--pos', `${p}%`);
    knot.style.setProperty('--pos', `${p}%`);
  };
  const box = card.querySelector('.dice-box') as HTMLElement;
  if (fx.reducedMotion) {
    setPos(final);
    rollDice(box);
    return;
  }
  let t = 0;
  const id = setInterval(() => {
    t++;
    const wobble = share * 100 + Math.sin(t * 1.3) * (22 - t) + (Math.random() - 0.5) * 10;
    setPos(Math.max(5, Math.min(95, wobble)));
    if (t % 4 === 0) fx.burstAt(knot, ['💥', '⚡', '✨'], 5, 5);
    if (t >= 16) {
      clearInterval(id);
      setPos(final);
      fx.shake(win ? 'small' : 'big');
      rollDice(box);
    }
  }, 120);
}

function rollDice(box: HTMLElement) {
  const card = box.closest('.card') as HTMLElement;
  const num = box.querySelector('.dice-num') as HTMLElement;
  const got = Number(box.dataset.got);
  const success = box.dataset.success === '1';
  const gamble = box.classList.contains('gamble');
  snd.sfx('dice');
  const finish = () => {
    snd.sfx(gamble || success ? 'success' : 'fail');
    if (!gamble) num.textContent = `${got}`;
    else num.textContent = '!';
    box.classList.add('landed');
    card.classList.add('revealed');
    if (gamble) {
      fx.burstAt(box, ['✨', '🎲', '❓'], 14, 8);
      return;
    }
    if (success) {
      fx.burstAt(box, ['✨', '🎉', '⭐', '💫'], 26, 11);
      fx.flash('rgba(124,242,154,0.22)');
    } else {
      fx.shake('small');
      fx.burstAt(box, ['💥', '💨', '😬'], 16, 8);
      fx.flash('rgba(255,90,95,0.22)');
    }
  };
  if (fx.reducedMotion) return finish();
  let ticks = 0;
  const id = setInterval(() => {
    ticks++;
    num.textContent = gamble ? ['?', '!', '?', '…'][ticks % 4] : `${1 + Math.floor(Math.random() * 100)}`;
    if (ticks >= 14) {
      clearInterval(id);
      finish();
    }
  }, 60);
}

function act(fn: () => void, animateOut = true) {
  if (busy) return;
  const card = app.querySelector('.stage .card, .setup-page') as HTMLElement | null;
  const done = () => {
    fn();
    const keepScroll = false;
    render();
    afterRender();
    busy = false;
    if (!keepScroll) window.scrollTo({ top: 0, behavior: fx.reducedMotion ? 'auto' : 'smooth' });
  };
  if (animateOut && card && !fx.reducedMotion) {
    busy = true;
    card.classList.add('toss-out');
    setTimeout(done, 220);
  } else done();
}

app.addEventListener('click', (ev) => {
  const t = (ev.target as HTMLElement).closest('button') as HTMLButtonElement | null;
  if (!t || t.disabled) return;
  fx.ripple(t, ev);
  if (t.hasAttribute('data-mute')) {
    snd.setMuted(!snd.isMuted());
    app.querySelectorAll('.snd-btn').forEach((b) => (b.textContent = snd.isMuted() ? '🔇' : '🔊'));
    return;
  }
  if (t.hasAttribute('data-copy-seed')) {
    navigator.clipboard?.writeText(state?.seed ?? '').catch(() => {});
    return;
  }
  if (t.hasAttribute('data-new')) {
    act(() => {
      clearSave();
      const typed = t.hasAttribute('data-seed-input') ? (document.getElementById('seed-in') as HTMLInputElement).value.trim().toUpperCase() : '';
      state = newGame(t.dataset.seed || typed || undefined);
      prevStats = {};
      prevEra = -1;
      setupPicks = {};
      setupStep = -3;
    });
    return;
  }
  if (t.hasAttribute('data-resume')) {
    act(() => {
      state = load();
      prevStats = {};
    });
    return;
  }
  const s = state;
  if (!s) return;
  if (t.dataset.origin && t.dataset.cat) {
    const cat = t.dataset.cat as OriginCategory;
    setupPicks[cat] = t.dataset.origin;
    fx.burstAt(t, [originById(t.dataset.origin)?.emoji ?? '✨', '✨'], 14, 7);
    t.classList.add('picked');
    busy = true;
    setTimeout(() => {
      busy = false;
      act(() => {
        setupStep += 1;
      });
    }, 380);
    return;
  }
  if (t.dataset.step !== undefined) return act(() => (setupStep = Number(t.dataset.step)));
  if (t.dataset.reroll) {
    const cat = t.dataset.reroll as OriginCategory;
    return act(() => {
      rollOffers(s, cat);
      delete setupPicks[cat];
    });
  }
  if (t.hasAttribute('data-random-all'))
    return act(() => {
      setupPicks = {};
      for (const cat of ORIGIN_CATEGORIES) {
        const ok = s.offers[cat].filter((id) => !Object.values(setupPicks).some((p) => originById(p!)?.excludes?.includes(id) || originById(id)?.excludes?.includes(p!)));
        if (ok.length) setupPicks[cat] = ok[Math.floor(rand() * ok.length)];
      }
      setupStep = ORIGIN_CATEGORIES.length + 1;
    });
  if (t.hasAttribute('data-found')) return act(() => foundCivilization(s, ORIGIN_CATEGORIES.map((c) => setupPicks[c]!).filter(Boolean)));
  if (t.hasAttribute('data-start')) return act(() => startTurn(s));
  if (t.dataset.decision !== undefined) {
    fx.burstAt(t, ['✨', '⭐'], 10, 6);
    return act(() => pickDecision(s, Number(t.dataset.decision)));
  }
  if (t.dataset.choice !== undefined) return act(() => choose(s, Number(t.dataset.choice)));
  if (t.hasAttribute('data-continue'))
    return act(() => {
      if (s.phase === 'finale') s.result = null;
      else advanceFromResult(s);
    });
  if (t.dataset.dip) {
    fx.burstAt(t, ['✨', '🤝'], 10, 6);
    return act(() => doDiplomacy(s, Number(t.dataset.dip)));
  }
  if (t.hasAttribute('data-battle-next')) return act(() => continueFinale(s));
  if (t.dataset.route) {
    const r = waveRoutes(s).find((x) => x.id === t.dataset.route);
    return act(() => {
      if (r) resolveWave(s, r);
    });
  }

});

app.addEventListener('input', (ev) => {
  const t = ev.target as HTMLInputElement;
  if (t.classList.contains('snd-vol')) {
    snd.setVolume(Number(t.value));
    app.querySelectorAll('.snd-btn').forEach((b) => (b.textContent = snd.isMuted() ? '🔇' : '🔊'));
    return;
  }
  if (t.id === 'civ-name' && state) {
    state.civ = t.value.trim() || state.civ;
    save();
  }
});

document.addEventListener('keydown', (ev) => {
  if ((ev.target as HTMLElement).tagName === 'INPUT') return;
  const key = ev.key;
  if (/^[1-9]$/.test(key)) {
    const btn = app.querySelector(`.stage [data-choice="${Number(key) - 1}"], .stage [data-decision="${Number(key) - 1}"]`) as HTMLButtonElement | null;
    if (btn) {
      ev.preventDefault();
      btn.click();
    }
  } else if (key === ' ' || key === 'Enter') {
    const btn = app.querySelector('.stage [data-continue], .stage [data-start], .stage [data-battle-next]') as HTMLButtonElement | null;
    const card = btn?.closest('.card');
    if (btn && (!card || !card.classList.contains('has-dice') || card.classList.contains('revealed'))) {
      ev.preventDefault();
      btn.click();
    }
  }
});

fx.startAmbient();
fx.enableTilt(app);
render();
afterRender();
