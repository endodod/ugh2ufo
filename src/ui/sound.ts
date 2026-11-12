// All audio is synthesized with the Web Audio API.
const KEY = 'ugh-to-ufo-sound';
type Name = 'dice' | 'success' | 'fail' | 'card' | 'era' | 'alien';

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;
let volume = 0.6;
let group = -1;
let ambient: { stop: () => void } | null = null;

try {
  const o = JSON.parse(localStorage.getItem(KEY) ?? '{}');
  if (typeof o.muted === 'boolean') muted = o.muted;
  if (typeof o.volume === 'number') volume = Math.min(1, Math.max(0, o.volume));
} catch {}

const persist = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify({ muted, volume }));
  } catch {}
};
const level = () => (muted ? 0 : volume);

function ensure() {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC() as AudioContext;
    master = ctx.createGain();
    master.gain.value = level();
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

// browsers block audio until a gesture; unlock and start any pending ambient
for (const ev of ['pointerdown', 'keydown'])
  window.addEventListener(ev, () => {
    if (ensure() && group >= 0 && !ambient) startAmbient(group);
  }, { passive: true });

export const isMuted = () => muted;
export const getVolume = () => volume;
export function setMuted(m: boolean) {
  muted = m;
  apply();
}
export function setVolume(v: number) {
  volume = Math.min(1, Math.max(0, v));
  if (volume > 0) muted = false;
  apply();
}
function apply() {
  persist();
  if (ctx && master) master.gain.setTargetAtTime(level(), ctx.currentTime, 0.03);
}

function tone(type: OscillatorType, f0: number, f1: number, t: number, dur: number, vol: number, out: AudioNode) {
  const c = ctx!;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + dur + 0.05);
}

function noise(t: number, dur: number, vol: number, freq: number, out: AudioNode, q = 1) {
  const c = ctx!;
  const buf = c.createBuffer(1, Math.max(1, Math.floor(c.sampleRate * dur)), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  const f = c.createBiquadFilter();
  const g = c.createGain();
  src.buffer = buf;
  f.type = 'bandpass';
  f.frequency.value = freq;
  f.Q.value = q;
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(out);
  src.start(t);
}

export function sfx(name: Name) {
  const c = ensure();
  if (!c || !master || level() === 0) return;
  const t = c.currentTime;
  const m = master;
  switch (name) {
    case 'dice':
      for (let i = 0; i < 14; i++) noise(t + i * 0.06 + Math.random() * 0.02, 0.05, 0.35, 1800 + Math.random() * 2500, m, 4);
      break;
    case 'success':
      noise(t, 0.08, 0.5, 900, m);
      tone('triangle', 523, 523, t + 0.05, 0.18, 0.3, m);
      tone('triangle', 784, 784, t + 0.16, 0.35, 0.3, m);
      break;
    case 'fail':
      noise(t, 0.12, 0.6, 300, m);
      tone('sawtooth', 220, 110, t + 0.05, 0.4, 0.25, m);
      break;
    case 'card':
      noise(t, 0.09, 0.4, 3500, m, 2);
      tone('sine', 700, 1100, t, 0.08, 0.08, m);
      break;
    case 'era':
      [523, 659, 784, 1047].forEach((f, i) => tone('square', f, f, t + i * 0.13, i === 3 ? 0.7 : 0.2, 0.12, m));
      [262, 392].forEach((f) => tone('triangle', f, f, t + 0.39, 0.7, 0.2, m));
      break;
    case 'alien':
      tone('sawtooth', 55, 40, t, 2.2, 0.35, m);
      tone('sine', 82, 60, t, 2.2, 0.35, m);
      tone('sine', 400, 150, t + 0.1, 1.2, 0.08, m);
      break;
  }
}

const groupOf = (age: number) => (age <= 3 ? 0 : age <= 7 ? 1 : age <= 10 ? 2 : 3);

function startAmbient(g: number) {
  const c = ctx!;
  const out = c.createGain();
  out.gain.value = 0;
  out.gain.setTargetAtTime(0.5, c.currentTime, 0.8);
  out.connect(master!);
  const nodes: OscillatorNode[] = [];
  let timer = 0;
  const drone = (type: OscillatorType, freqs: number[], vol: number, lp: number, lfo = 0) => {
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = lp;
    const v = c.createGain();
    v.gain.value = vol;
    f.connect(v).connect(out);
    for (const hz of freqs) {
      const o = c.createOscillator();
      o.type = type;
      o.frequency.value = hz;
      o.connect(f);
      o.start();
      nodes.push(o);
    }
    if (lfo) {
      const l = c.createOscillator();
      const lg = c.createGain();
      l.frequency.value = lfo;
      lg.gain.value = vol * 0.5;
      l.connect(lg).connect(v.gain);
      l.start();
      nodes.push(l);
    }
  };
  if (g === 0) {
    let i = 0;
    timer = window.setInterval(() => {
      const t = c.currentTime;
      const hit = i % 4 === 0 || i % 4 === 2 ? 90 : 130;
      tone('sine', hit * 1.6, hit, t, 0.25, i % 4 === 0 ? 0.5 : 0.3, out);
      if (i % 2) noise(t, 0.05, 0.05, 700, out);
      i++;
    }, 500);
  } else if (g === 1) {
    drone('triangle', [110, 164.8, 220], 0.12, 900, 0.12);
    drone('sine', [329.6, 440], 0.04, 1500, 0.2);
  } else if (g === 2) {
    drone('sawtooth', [50, 100.3], 0.07, 300, 0.4);
    drone('square', [150], 0.02, 400, 6);
  } else {
    drone('sawtooth', [55, 55.5, 110], 0.05, 700, 0.15);
    drone('sine', [220, 330], 0.05, 1200, 0.3);
  }
  ambient = {
    stop: () => {
      clearInterval(timer);
      out.gain.setTargetAtTime(0, c.currentTime, 0.4);
      setTimeout(() => {
        nodes.forEach((n) => n.stop());
        out.disconnect();
      }, 2000);
    },
  };
}

// age < 0 stops the ambient (title screen)
export function setAmbientAge(age: number) {
  const g = age < 0 ? -1 : groupOf(age);
  if (g === group) return;
  group = g;
  ambient?.stop();
  ambient = null;
  if (g >= 0 && ctx && ctx.state === 'running') startAmbient(g);
}
