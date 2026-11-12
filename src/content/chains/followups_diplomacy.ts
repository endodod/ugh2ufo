// Chain-only follow-ups for diplomacy choices (see doDiplomacy in engine.ts).
import type { CardDef } from '../../types';
import { c, chk, fu, luck, nx, o } from './util';

export const diplomacyFollowups: CardDef[] = [
  fu('dip_snub', 'rival', '🥶', '{rival} Has Cooled Off', '{rival} offered friendship and got a shrug. Their envoys now greet us with the warmth of a damp cellar.', [
    c('Send flowers and an apology', { stats: { gold: -3 }, rival: { target: 'same', rel: 8 }, chain: nx('dip_snub2', 3) }),
    c('Shrug again', { stats: { joy: 2 }, rival: { target: 'same', rel: -8 } }),
  ]),
  fu('dip_snub2', 'rival', '🕊️', '{rival} Asks Once More', '{rival} is offering the alliance again. The envoy says it is "a final offer", in the tone of someone who has said that before.', [
    c('Accept, finally', { rival: { target: 'same', ally: true, rel: 12 } }),
    c('Decline with more style', { stats: { weird: 2 }, rival: { target: 'same', rel: -15 } }),
  ]),
  fu('dip_spycaught', 'rival', '🕵️', 'The Spy Has Opinions', 'The spy {rival} sent back in a vase has defected to a tavern, then to {rival}, then back to us. He wants it known that he feels used.', [
    chk('Hire him back', {}, {
      base: 0.5, stats: { gold: 0.01 }, flags: { spies: 0.05 },
      success: { text: 'He is a superb double agent. He is also a superb triple agent, but only on weekends.', effect: { stats: { sci: 4 }, flags: { spies: 1 } } },
      fail: { text: 'He takes the signing bonus and the silverware, then vanishes into a vase.', effect: { stats: { gold: -4 } } },
    }),
    c('Hand him over to {rival}', { rival: { target: 'same', rel: 12 }, stats: { joy: -2 } }),
    c('Exile him', { stats: { joy: 2 }, rival: { target: 'same', rel: -4 } }),
  ]),
  fu('dip_insult', 'rival', '📜', '{rival} Answers in Verse', 'The rebuttal to our insult arrived by herald. It rhymes better than ours. It also mentions our mothers.', [
    c('Publish a longer insult', { stats: { joy: 4, weird: 2 }, rival: { target: 'same', rel: -12 } }),
    c('Concede the poetry contest', { stats: { joy: -2 }, rival: { target: 'same', rel: 6 } }),
    luck('Send a rhyming apology', [
      o(1, 'It scans. They forgive us.', { rival: { target: 'same', rel: 14 } }),
      o(1, 'It does not scan. They send a second poem.', { stats: { joy: -3 }, rival: { target: 'same', rel: -6 } }),
    ]),
  ]),
  fu('dip_sided', 'rival', '🐐', '{rival} Repays the Favour', 'Having won the goat argument with our help, {rival} has sent something. The goat, by the smell of it.', [
    c('Accept the gift', { stats: { gold: 6, food: 4 }, rival: { target: 'same', rel: 6 } }),
    c('Ask for troops instead', { stats: { mil: 5 }, rival: { target: 'same', rel: 2 } }),
  ]),
  fu('dip_grudge', 'rival', '😤', '{rival} Keeps the Receipt', 'We backed their neighbour in the goat dispute. {rival} has started a list. We are on it, twice.', [
    c('Send a goat as peace offering', { stats: { food: -2 }, rival: { target: 'same', rel: 10 } }),
    chk('Talk them down', {}, {
      base: 0.45, stats: { joy: 0.004 }, flags: { diplomats: 0.1 },
      success: { text: 'The list is shortened to "mostly forgiven".', effect: { rival: { target: 'same', rel: 12 } } },
      fail: { text: 'We are added to a second list, for talking.', effect: { rival: { target: 'same', rel: -6 } } },
    }),
    c('Ignore the list', { rival: { target: 'same', rel: -10 } }),
  ]),
  fu('dip_raiders', 'rival', '🏴', 'The Raiders Remember', 'The raiders we paid off have spent it. They are back, and have brought a bigger sack.', [
    c('Pay again', { stats: { gold: -8 }, rival: { target: 'same', rel: 4 } }),
    chk('Ambush them at the handover', {}, {
      base: 0.4, stats: { mil: 0.01 },
      success: { text: 'The raiders are routed. We keep the sack, and the money in it.', effect: { stats: { mil: 4, gold: 6 } } },
      fail: { text: 'They were expecting an ambush. They brought a larger ambush.', effect: { stats: { mil: -4, pop: -1 } } },
    }),
    c('Refuse', { stats: { pop: -1 }, rival: { target: 'same', rel: -8 } }),
  ]),
];
