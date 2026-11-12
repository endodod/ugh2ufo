let a = 1;

export function seedRng(seed: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 0x01000193);
  a = h >>> 0;
}

export const rngState = () => a;
export const setRngState = (n: number) => {
  a = n >>> 0;
};

// mulberry32
export function rand(): number {
  a = (a + 0x6d2b79f5) >>> 0;
  let t = a;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function randomSeed(): string {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 36).toString(36)).join('').toUpperCase();
}

export function dailySeed(): string {
  return `DAILY-${new Date().toISOString().slice(0, 10)}`;
}
