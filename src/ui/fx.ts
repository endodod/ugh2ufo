export const reducedMotion = (() => {
  try {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
})();

let layer: HTMLDivElement | null = null;

function fxLayer() {
  if (!layer) {
    layer = document.createElement('div');
    layer.className = 'fx-layer';
    document.body.appendChild(layer);
  }
  return layer;
}

export function countUp(el: HTMLElement, from: number, to: number, ms: number, fmt: (n: number) => string = (n) => `${n}`) {
  if (reducedMotion || from === to) {
    el.textContent = fmt(to);
    return;
  }
  const start = performance.now();
  setTimeout(() => (el.textContent = fmt(to)), ms + 80);
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / ms);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = fmt(Math.round(from + (to - from) * eased));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

interface Particle {
  el: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  life: number;
}

const particles: Particle[] = [];
let running = false;

function tick() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.vy += 0.35;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= 1;
    p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
    p.el.style.opacity = `${Math.min(1, p.life / 30)}`;
    if (p.life <= 0 || p.y > innerHeight + 50) {
      p.el.remove();
      particles.splice(i, 1);
    }
  }
  if (particles.length) requestAnimationFrame(tick);
  else running = false;
}

function trim() {
  while (particles.length > 160) particles.shift()!.el.remove();
}

export function burst(x: number, y: number, symbols: string[], count = 18, power = 9) {
  if (reducedMotion || document.hidden) return;
  trim();
  const L = fxLayer();
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'particle';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.fontSize = `${14 + Math.random() * 16}px`;
    L.appendChild(el);
    const a = Math.random() * Math.PI * 2;
    const v = power * (0.4 + Math.random() * 0.8);
    particles.push({ el, x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - power * 0.6, rot: Math.random() * 360, vr: (Math.random() - 0.5) * 20, life: 60 + Math.random() * 40 });
  }
  if (!running) {
    running = true;
    requestAnimationFrame(tick);
  }
}

export function burstAt(el: Element | null, symbols: string[], count?: number, power?: number) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, symbols, count, power);
}

export function confetti(symbols = ['🎉', '✨', '⭐', '🎊', '💫'], waves = 3) {
  if (reducedMotion) return;
  for (let w = 0; w < waves; w++) {
    setTimeout(() => {
      burst(innerWidth * (0.2 + Math.random() * 0.6), innerHeight * 0.35, symbols, 26, 13);
    }, w * 350);
  }
}

export function rain(symbols: string[], count = 30) {
  if (reducedMotion || document.hidden) return;
  trim();
  const L = fxLayer();
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'particle';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.fontSize = `${16 + Math.random() * 18}px`;
    L.appendChild(el);
    particles.push({ el, x: Math.random() * innerWidth, y: -40 - Math.random() * 300, vx: (Math.random() - 0.5) * 2, vy: Math.random() * 2, rot: 0, vr: (Math.random() - 0.5) * 6, life: 220 });
  }
  if (!running) {
    running = true;
    requestAnimationFrame(tick);
  }
}

export function shake(strength: 'small' | 'big' = 'small') {
  if (reducedMotion) return;
  const el = document.querySelector('.app') as HTMLElement | null;
  if (!el) return;
  el.classList.remove('shake-small', 'shake-big');
  void el.offsetWidth;
  el.classList.add(strength === 'big' ? 'shake-big' : 'shake-small');
  setTimeout(() => el.classList.remove('shake-small', 'shake-big'), 700);
}

export function flash(color: string) {
  if (reducedMotion) return;
  const el = document.createElement('div');
  el.className = 'screen-flash';
  el.style.background = color;
  fxLayer().appendChild(el);
  setTimeout(() => el.remove(), 700);
}

export function floatText(anchor: Element, text: string, cls: string) {
  const r = anchor.getBoundingClientRect();
  const el = document.createElement('span');
  el.className = `float-text ${cls}`;
  el.textContent = text;
  el.style.left = `${r.right - 8}px`;
  el.style.top = `${r.top}px`;
  fxLayer().appendChild(el);
  setTimeout(() => el.remove(), 1400);
}

export function ripple(btn: HTMLElement, ev: MouseEvent) {
  if (reducedMotion) return;
  const r = btn.getBoundingClientRect();
  const el = document.createElement('span');
  el.className = 'ripple';
  const size = Math.max(r.width, r.height) * 2;
  el.style.width = el.style.height = `${size}px`;
  el.style.left = `${ev.clientX - r.left - size / 2}px`;
  el.style.top = `${ev.clientY - r.top - size / 2}px`;
  btn.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

export function enableTilt(root: HTMLElement) {
  if (reducedMotion) return;
  root.addEventListener('mousemove', (ev) => {
    const card = (ev.target as HTMLElement).closest('.tilt') as HTMLElement | null;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width - 0.5;
    const y = (ev.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-3px)`;
    card.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
  });
  root.addEventListener(
    'mouseleave',
    (ev) => {
      const card = (ev.target as HTMLElement).closest?.('.tilt') as HTMLElement | null;
      if (card) card.style.transform = '';
    },
    true,
  );
}

export function typewriter(el: HTMLElement, ms = 18) {
  if (reducedMotion) return;
  const full = el.textContent ?? '';
  el.textContent = '';
  let i = 0;
  const id = setInterval(() => {
    i += 2;
    el.textContent = full.slice(0, i);
    if (i >= full.length) clearInterval(id);
  }, ms);
}

// Ambient background that changes with the era
type Mote = { x: number; y: number; vx: number; vy: number; r: number; a: number; tw: number };

const AMBIENT: { color: string; rise: number; count: number; glow: boolean; twinkle: boolean; square?: boolean }[] = [
  { color: '255,138,61', rise: -0.5, count: 40, glow: true, twinkle: false },
  { color: '255,170,90', rise: -0.4, count: 35, glow: true, twinkle: false },
  { color: '240,220,170', rise: -0.15, count: 45, glow: false, twinkle: true },
  { color: '255,200,120', rise: -0.3, count: 35, glow: true, twinkle: false },
  { color: '230,210,255', rise: -0.1, count: 45, glow: false, twinkle: true },
  { color: '160,150,140', rise: -0.6, count: 55, glow: false, twinkle: false },
  { color: '124,242,154', rise: -0.2, count: 40, glow: true, twinkle: true },
  { color: '124,242,154', rise: 0.6, count: 50, glow: false, twinkle: false, square: true },
  { color: '220,225,255', rise: 0.05, count: 110, glow: true, twinkle: true },
];

const AMBIENT_FOR_AGE = [0, 0, 1, 1, 2, 3, 4, 4, 5, 6, 7, 8, 8, 8, 8];

function ambientCfg(age: number) {
  return AMBIENT[AMBIENT_FOR_AGE[Math.min(age, AMBIENT_FOR_AGE.length - 1)]];
}

let ambientEra = 0;
let motes: Mote[] = [];
let shooting: { x: number; y: number; t: number } | null = null;

export function setAmbientEra(era: number) {
  if (era === ambientEra && motes.length) return;
  ambientEra = era;
  const cfg = ambientCfg(era);
  motes = Array.from({ length: cfg.count }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: cfg.rise * (0.5 + Math.random()),
    r: 0.8 + Math.random() * 2.2,
    a: 0.15 + Math.random() * 0.45,
    tw: Math.random() * Math.PI * 2,
  }));
}

export function startAmbient() {
  const canvas = document.createElement('canvas');
  canvas.className = 'ambient';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const resize = () => {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  };
  resize();
  addEventListener('resize', resize);
  setAmbientEra(0);
  const draw = () => {
    const cfg = ambientCfg(ambientEra);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const m of motes) {
      if (!reducedMotion) {
        m.x += m.vx;
        m.y += m.vy;
        m.tw += 0.03;
        if (m.y < -10) m.y = innerHeight + 10;
        if (m.y > innerHeight + 10) m.y = -10;
        if (m.x < -10) m.x = innerWidth + 10;
        if (m.x > innerWidth + 10) m.x = -10;
      }
      const alpha = cfg.twinkle ? m.a * (0.55 + 0.45 * Math.sin(m.tw)) : m.a;
      ctx.fillStyle = `rgba(${cfg.color},${alpha})`;
      if (cfg.glow) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${cfg.color},${alpha})`;
      } else ctx.shadowBlur = 0;
      if (cfg.square) ctx.fillRect(m.x, m.y, m.r * 1.6, m.r * 1.6);
      else {
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (ambientEra >= 9 && !reducedMotion) {
      if (!shooting && Math.random() < 0.004) shooting = { x: Math.random() * innerWidth * 0.7, y: Math.random() * innerHeight * 0.4, t: 0 };
      if (shooting) {
        shooting.t += 1;
        const len = 80;
        const x = shooting.x + shooting.t * 9;
        const y = shooting.y + shooting.t * 4;
        const g = ctx.createLinearGradient(x - len, y - len * 0.45, x, y);
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(1, 'rgba(255,255,255,0.8)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(x - len, y - len * 0.45);
        ctx.lineTo(x, y);
        ctx.stroke();
        if (shooting.t > 40) shooting = null;
      }
    }
    if (!reducedMotion) requestAnimationFrame(draw);
  };
  draw();
}
