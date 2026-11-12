// Interactions with rival civilizations.
import type { CardDef } from '../../types';

export const rivalCards: CardDef[] = [
  {
    id: 'x_r_wedding', kind: 'rival', title: 'Royal Wedding', emoji: '💍', era: [0, 5], req: { rival: true },
    text: "{rival} proposes a marriage between their heir and yours. Their heir is, by most accounts, a goat.",
    choices: [
      { label: 'Accept', effect: { stats: { joy: 3, weird: 3 }, rival: { target: 'same', rel: 20, ally: true } } },
      { label: 'Counter-offer our own goat', effect: { stats: { weird: 4 }, rival: { target: 'same', rel: 5 }, text: 'The goats are very happy together.', chain: { id: 'ch_f_goatwed', delay: 2 } } },
      { label: 'Decline', effect: { rival: { target: 'same', rel: -10 } } },
    ],
  },
  {
    id: 'x_r_divorce', kind: 'rival', title: 'The Divorce', emoji: '💔', era: [3, 8], req: { rival: true },
    text: '{rival} wants to end the old royal marriage. Their lawyers demand half of everything, including half a horse.',
    choices: [
      { label: 'Split the horse', effect: { stats: { gold: -4, weird: 2 }, rival: { target: 'same', rel: 5 } } },
      { label: 'Keep the horse', effect: { stats: { mil: 2 }, rival: { target: 'same', rel: -15 } } },
      { label: 'Couples counseling', effect: { stats: { gold: -3, joy: 2 }, rival: { target: 'same', rel: 10 }, chain: { id: 'ch_f_counsel', delay: 2 } } },
    ],
  },
  {
    id: 'x_r_spices', kind: 'rival', title: 'Spice Caravan', emoji: '🐫', era: [1, 5], req: { rival: true },
    text: '{rival} offers a caravan of spices for gold. The camels look like they have opinions about the price.',
    choices: [
      { label: 'Trade', effect: { stats: { gold: -3, food: 6 }, rival: { target: 'same', rel: 10 } } },
      {
        label: 'Haggle aggressively',
        outcomes: [
          { weight: 1, text: 'A bargain. The camels look betrayed.', effect: { stats: { food: 6 }, rival: { target: 'same', rel: -3 } } },
          { weight: 1, text: 'The merchant storms off. The camels spit on the way out.', effect: { stats: { joy: -2 }, rival: { target: 'same', rel: -8 } } },
        ],
      },
    ],
  },
  {
    id: 'x_r_statue', kind: 'rival', title: 'The Missing Statue', emoji: '🗽', era: [1, 6], req: { rival: true },
    text: "Our finest statue is now standing in {rival}'s capital. They claim it walked over by itself.",
    choices: [
      { label: 'Steal it back', effect: { stats: { joy: 5, mil: -2 }, rival: { target: 'same', rel: -15 }, chain: { id: 'ch_f_statue', delay: 3 } } },
      {
        label: 'Steal their statue too',
        check: {
          base: 0.25, flags: { spies: 0.12, custom_secret: 0.15, heads: 0.06 },
          success: { text: 'Success. We now have two statues. One of them is very confused.', effect: { stats: { joy: 6, faith: 2 }, rival: { target: 'same', rel: -10 } } },
          fail: { text: 'The thieves are caught posing as the statue. For eleven days.', effect: { stats: { gold: -3 }, rival: { target: 'same', rel: -20 } } },
        },
      },
      { label: 'Let it go', effect: { stats: { joy: -3 }, rival: { target: 'same', rel: 5 } } },
    ],
  },
  {
    id: 'x_r_border', kind: 'rival', title: 'Border Stones', emoji: '🪨', era: [0, 4], req: { rival: true },
    text: '{rival} moved the border stones three feet. We moved them back. They moved them six feet.',
    choices: [
      { label: 'Move them twelve feet', effect: { stats: { mil: 2, food: 2 }, rival: { target: 'same', rel: -10 } } },
      { label: 'Build a wall and invoice them', effect: { stats: { gold: -5, mil: 3 }, flags: { bureaucracy: 1 }, rival: { target: 'same', rel: -5 }, chain: { id: 'ch_f_invoice', delay: 2 } } },
      { label: 'Go to war over it', effect: { stats: { mil: -3, joy: 2 }, rival: { target: 'same', rel: -30, war: true } } },
    ],
  },
  {
    id: 'x_r_sack', kind: 'rival', title: 'The Nervous Sack', emoji: '🌾', era: [1, 5], req: { rival: true },
    text: 'A spy from {rival} was found in the granary disguised as a sack of wheat. A very sweaty sack.',
    choices: [
      { label: 'Execute the sack', effect: { stats: { mil: 2 }, rival: { target: 'same', rel: -15 } } },
      { label: 'Turn him into a double agent', effect: { stats: { sci: 5 }, rival: { target: 'same', rel: -5 }, chain: { id: 'ch_f_sack', delay: 2 } } },
      { label: 'Send him home with a sack of our own', effect: { stats: { weird: 2 }, rival: { target: 'same', rel: 5 }, chain: { id: 'ch_f_sackreturn', delay: 3 } } },
    ],
  },
  {
    id: 'x_r_sneeze', kind: 'rival', title: 'Diplomatic Incident', emoji: '🤧', era: [1, 7], req: { rival: true },
    text: "Our ambassador sneezed on {rival}'s monarch. Their court calls it an act of war. Their doctors call it a cold.",
    choices: [
      { label: 'Apologize lavishly', effect: { stats: { gold: -4 }, rival: { target: 'same', rel: 10 } } },
      { label: 'Claim it was a blessing', effect: { stats: { faith: 3 }, rival: { target: 'same', rel: -5 } } },
      { label: 'Sneeze again, on purpose', effect: { stats: { joy: 4 }, rival: { target: 'same', rel: -20, war: true }, chain: { id: 'ch_f_sneeze', delay: 2 } } },
    ],
  },
  {
    id: 'x_r_pact', kind: 'rival', title: 'Mutual Defense Pact', emoji: '🤝', era: [2, 8], req: { rival: true },
    text: "{rival} proposes an alliance against 'whatever comes'. They seem to know something they're not saying.",
    choices: [
      { label: 'Sign the pact', effect: { stats: { mil: 3 }, rival: { target: 'same', rel: 20, ally: true } } },
      { label: 'Ask what they know', effect: { stats: { sci: 3 }, rival: { target: 'same', rel: -3 }, threat: -1, text: "They mention lights in the sky, then change the subject to weather." } },
      { label: 'Decline', effect: { rival: { target: 'same', rel: -5 } } },
    ],
  },
  {
    id: 'x_r_melon', kind: 'rival', title: 'The Melon War', emoji: '🍈', era: [1, 6], req: { rival: true },
    text: '{rival} has declared war on us over a disputed melon. It is a very good melon.',
    choices: [
      { label: 'Fight for the melon', effect: { stats: { mil: -3, joy: 3 }, rival: { target: 'same', war: true, rel: -20 } } },
      { label: 'Surrender the melon', effect: { stats: { food: -2, joy: -4 }, rival: { target: 'same', rel: 15 } } },
      {
        label: 'Duel of champions',
        check: {
          base: 0.3, stats: { mil: 0.006 }, flags: { cats: 0.06, yeet: 0.08, custom_compete: 0.15, medicine: 0.05 },
          success: { text: 'Our champion wins. The melon is ours. It is eaten in triumph.', effect: { stats: { joy: 8, mil: 2 }, rival: { target: 'same', rel: -5 } } },
          fail: { text: 'Our champion trips on the melon. Theirs eats it out of pity.', effect: { stats: { joy: -5 }, rival: { target: 'same', rel: 5 } } },
        },
      },
    ],
  },
  {
    id: 'x_r_socks', kind: 'rival', title: 'Peace Treaty', emoji: '🕊️', era: [2, 8], req: { rival: true },
    text: '{rival} offers a peace treaty. It is four hundred pages long. Page 212 grants them all of our socks.',
    choices: [
      { label: 'Sign without reading', effect: { stats: { joy: -3 }, rival: { target: 'same', rel: 20, war: false } } },
      { label: 'Strike page 212', effect: { stats: { gold: -2 }, flags: { bureaucracy: 1 }, rival: { target: 'same', rel: 10, war: false } } },
      { label: 'Add a page of our own', effect: { stats: { gold: 4, weird: 2 }, rival: { target: 'same', rel: 5 }, text: 'They now owe us one hat per year, forever.', chain: { id: 'ch_f_page', delay: 2 } } },
    ],
  },
  {
    id: 'x_r_feast', kind: 'rival', title: 'The Long Feast', emoji: '🍗', era: [0, 6], req: { rival: true },
    text: '{rival} invites our nobles to a feast. The menu is suspiciously long and the doors suspiciously lockable.',
    choices: [
      {
        label: 'Attend',
        check: {
          base: 0.55, flags: { diplomats: 0.08, spies: 0.08, custom_polite: 0.15, founder_chef: 0.15 }, allies: 0.05,
          success: { text: 'An excellent feast. Several nobles propose marriage to the pudding.', effect: { stats: { joy: 5, food: 3 }, rival: { target: 'same', rel: 10 } } },
          fail: { text: 'It was a trap. The nobles escape through the soup tunnel.', effect: { stats: { pop: -2, mil: 2 }, rival: { target: 'same', rel: -20 } } },
        },
      },
      { label: 'Send body doubles', effect: { stats: { gold: -2, weird: 2 } } },
    ],
  },
  {
    id: 'x_r_sketch', kind: 'rival', title: 'Factory Tourists', emoji: '📝', era: [5, 7], req: { rival: true },
    text: "{rival}'s engineers keep touring our factories carrying sketchbooks and very large hats.",
    choices: [
      { label: 'Check the hats', effect: { stats: { sci: 3 }, rival: { target: 'same', rel: -10 }, text: 'Each hat contains a smaller engineer.' } },
      { label: 'Give them fake blueprints', effect: { stats: { weird: 3, sci: 2 }, rival: { target: 'same', rel: -5 }, chain: { id: 'ch_f_blueprints', delay: 3 } } },
      { label: 'Charge admission', effect: { stats: { gold: 5, sci: -2 } } },
    ],
  },
  {
    id: 'x_r_refugees', kind: 'rival', title: 'Tax Refugees', emoji: '🧳', era: [2, 8], req: { rival: true },
    text: "Citizens of {rival} are fleeing their new tax on breathing. They arrive holding their breath.",
    choices: [
      { label: 'Welcome them', effect: { stats: { pop: 5, food: -3, joy: 2 }, rival: { target: 'same', rel: -5 } } },
      { label: 'Charge a gentler breathing tax', effect: { stats: { pop: 3, gold: 4 } } },
      { label: 'Close the border', effect: { stats: { mil: 2, joy: -2 }, rival: { target: 'same', rel: 5 } } },
    ],
  },
  {
    id: 'x_r_final', kind: 'rival', title: 'The Big Match', emoji: '⚽', era: [2, 8], req: { rival: true },
    text: 'Our team faces {rival} in the championship. Both nations have stopped working to watch.',
    choices: [
      {
        label: 'Cheer loudly',
        outcomes: [
          { weight: 1, text: 'We win. A national holiday is declared. Then two more.', effect: { stats: { joy: 10, gold: -3 }, flags: { party: 1 }, rival: { target: 'same', rel: -5 } } },
          { weight: 1, text: 'We lose on a disputed call. The referee now lives in exile.', effect: { stats: { joy: -6 }, rival: { target: 'same', rel: -10 } } },
        ],
      },
      { label: 'Bribe the referee', effect: { stats: { gold: -5, joy: 6 }, rival: { target: 'same', rel: -15 } } },
    ],
  },
  {
    id: 'x_r_arms', kind: 'rival', title: 'Arms Race', emoji: '🚀', era: [5, 8], req: { rival: true },
    text: '{rival} unveils a bigger cannon. Our generals immediately feel inadequate.',
    choices: [
      { label: 'Build a bigger one', effect: { stats: { mil: 8, gold: -8 }, rival: { target: 'same', rel: -10, mil: 3 } } },
      { label: 'Propose mutual disarmament', effect: { stats: { gold: 3 }, rival: { target: 'same', rel: 10, mil: -3 } } },
      { label: 'Make fun of it', effect: { stats: { joy: 4 }, rival: { target: 'same', rel: -5 }, chain: { id: 'ch_f_mocked', delay: 2 } } },
    ],
  },
  {
    id: 'x_r_proxy', kind: 'rival', title: 'Proxy Squabble', emoji: '🏝️', era: [6, 7], req: { rival: true },
    text: 'We and {rival} are funding opposite sides in a war between two islands that would very much like to be left alone.',
    choices: [
      { label: 'Fund harder', effect: { stats: { gold: -6, mil: 4 }, rival: { target: 'same', rel: -10 } } },
      { label: 'Fund both sides', effect: { stats: { gold: 4, weird: 3 }, text: 'The islands are now very well armed and very confused.' } },
      { label: 'Leave the islands alone', effect: { stats: { joy: 3 }, rival: { target: 'same', rel: 5 } } },
    ],
  },
  {
    id: 'x_r_phone', kind: 'rival', title: 'The Red Phone', emoji: '☎️', era: [6, 8], req: { rival: true },
    text: 'The emergency hotline to {rival} is ringing. It is their leader. He wants to know if our fridge is running.',
    choices: [
      { label: 'Prank them back', effect: { stats: { joy: 5 }, rival: { target: 'same', rel: 5 }, chain: { id: 'ch_f_prank', delay: 1 } } },
      { label: 'Report a serious breach of protocol', effect: { flags: { bureaucracy: 1 }, rival: { target: 'same', rel: -10 } } },
      { label: 'Talk for three hours', effect: { stats: { gold: -2 }, rival: { target: 'same', rel: 15, ally: true }, text: 'An unlikely friendship is born.', chain: { id: 'ch_f_longcall', delay: 2 } } },
    ],
  },
  {
    id: 'x_r_meme', kind: 'rival', title: 'Meme War', emoji: '🖼️', era: [7, 8], req: { rival: true },
    text: '{rival} posted an unflattering photo of {leader} mid-sneeze. It has twelve million shares.',
    choices: [
      { label: 'Retaliate with a worse photo', effect: { stats: { joy: 5, weird: 2 }, rival: { target: 'same', rel: -10 }, chain: { id: 'ch_f_meme', delay: 1 } } },
      { label: 'Embrace it as the new flag', effect: { stats: { joy: 7, faith: -2 }, flags: { party: 1 } } },
      { label: 'Declare war', effect: { stats: { mil: -2 }, rival: { target: 'same', rel: -30, war: true } } },
    ],
  },
  {
    id: 'x_r_weak', kind: 'rival', title: 'A Weak Neighbor', emoji: '🎯', era: [1, 7], req: { rival: true }, weight: 0.7,
    text: '{rival} looks weak. Very weak. Suspiciously weak.',
    choices: [
      {
        label: 'Invade',
        effect: { stats: { mil: -4 } },
        check: {
          base: 0.25, stats: { mil: 0.003 }, flags: { spies: 0.12, logistics: 0.08 }, allies: 0.06,
          success: { text: 'It was not a trick. {rival} is absorbed into {civ}.', effect: { stats: { pop: 8, gold: 6 }, rival: { target: 'same', destroy: true } } },
          fail: { text: 'It was a trick. Their whole army was hiding behind one large tree.', effect: { stats: { mil: -4, pop: -3 }, rival: { target: 'same', war: true, rel: -30 } } },
        },
      },
      { label: 'Send aid instead', effect: { stats: { gold: -4, faith: 2 }, rival: { target: 'same', rel: 20 }, chain: { id: 'ch_f_aid', delay: 3 } } },
    ],
  },
  {
    id: 'x_r_rabbits', kind: 'rival', title: 'A Gift of Rabbits', emoji: '🐇', era: [0, 6], req: { rival: true },
    text: '{rival} sent a crate of rabbits as a gift. There are more rabbits now than when the crate arrived.',
    choices: [
      { label: 'Eat the problem', effect: { stats: { food: 6, joy: -2 } } },
      { label: 'Send them back, twice as many', effect: { stats: { weird: 2 }, rival: { target: 'same', rel: -5 }, text: 'A rabbit cold war begins.', chain: { id: 'ch_f_rabbits', delay: 2 } } },
      { label: 'Write a thank-you note', effect: { stats: { food: 3 }, rival: { target: 'same', rel: 10 }, chain: { id: 'ch_f_thanks', delay: 3 } } },
    ],
  },
  {
    id: 'x_r_eclipse', kind: 'rival', title: 'Stolen Eclipse', emoji: '🌑', era: [1, 4], req: { rival: true },
    text: "{rival}'s astronomers predicted an eclipse and now claim it belongs to them. They are charging to look at it.",
    choices: [
      { label: 'Predict a better eclipse', effect: { stats: { sci: 4, faith: 2 }, rival: { target: 'same', rel: -5 }, chain: { id: 'ch_f_eclipse', delay: 2 } } },
      { label: 'Look anyway, for free', effect: { stats: { joy: 4 }, rival: { target: 'same', rel: -10 } } },
      { label: 'Pay the fee', effect: { stats: { gold: -3 }, rival: { target: 'same', rel: 10 } } },
    ],
  },
  {
    id: 'x_r_scholars', kind: 'rival', title: 'Scholar Exchange', emoji: '🎓', era: [2, 8], req: { rival: true },
    text: '{rival} proposes swapping scholars for a year. Theirs are brilliant. Ours are mostly enthusiastic.',
    choices: [
      { label: 'Swap', effect: { stats: { sci: 5 }, rival: { target: 'same', rel: 10 } } },
      { label: 'Keep their scholars forever', effect: { stats: { sci: 8 }, rival: { target: 'same', rel: -20 }, chain: { id: 'ch_f_scholars', delay: 3 } } },
    ],
  },
  {
    id: 'x_r_bridge', kind: 'rival', title: 'The Bridge', emoji: '🌉', era: [2, 6], req: { rival: true },
    text: 'We and {rival} built a bridge from both sides of the river. The halves do not meet. They miss by a mile.',
    choices: [
      { label: 'Blame their engineers', effect: { stats: { joy: 2 }, rival: { target: 'same', rel: -10 } } },
      { label: 'Build a third bridge between the two', effect: { stats: { gold: -5, pop: 3 }, rival: { target: 'same', rel: 10 } } },
      { label: 'Call it art', effect: { stats: { joy: 4, weird: 3 } } },
    ],
  },
  {
    id: 'x_r_privateers', kind: 'rival', title: 'Licensed Pirates', emoji: '🏴‍☠️', era: [3, 5], req: { rival: true },
    text: 'Pirates with official paperwork from {rival} are raiding our ships. The paperwork is immaculate.',
    choices: [
      { label: 'Hire our own licensed pirates', effect: { rival: { target: 'same', rel: -10 } }, check: {
        base: 0.3, flags: { navy: 0.12, bureaucracy: 0.05, land_coast: 0.15, land_island: 0.15 },
        success: { text: 'Our pirates are better. Their paperwork is also better.', effect: { stats: { gold: 7, mil: 2 } } },
        fail: { text: 'Our pirates read the contract and joined theirs.', effect: { stats: { gold: -3 } } },
      } },
      { label: 'Build a navy', effect: { stats: { mil: 6, gold: -6 } } },
      { label: 'Contest the paperwork', effect: { stats: { gold: 3 }, flags: { bureaucracy: 1 }, rival: { target: 'same', rel: -5 } } },
    ],
  },
  {
    id: 'x_r_island', kind: 'rival', title: 'Two Flags, One Island', emoji: '🚩', era: [4, 6], req: { rival: true },
    text: '{rival} planted a flag on an island where we planted a flag yesterday. The island is confused.',
    choices: [
      { label: 'Plant a bigger flag', effect: { stats: { gold: -2, joy: 3 }, rival: { target: 'same', rel: -10 } } },
      { label: 'Share the island', effect: { stats: { food: 3 }, rival: { target: 'same', rel: 15 } } },
      { label: 'Ask the islanders', effect: { stats: { faith: 2, weird: 2 }, text: 'They plant a third flag, which says "please leave".' } },
    ],
  },
  {
    id: 'x_r_oil', kind: 'rival', title: 'Under the Border', emoji: '🛢️', era: [5, 7], req: { rival: true },
    text: 'Oil was found under the border with {rival}. Both sides have drills angled at very suspicious angles.',
    choices: [
      { label: 'Drill diagonally', effect: { stats: { gold: 9 }, rival: { target: 'same', rel: -15 } } },
      { label: 'Split it fairly', effect: { stats: { gold: 5 }, rival: { target: 'same', rel: 10 } } },
      { label: 'Leave it in the ground', effect: { stats: { joy: 3, faith: 2 } } },
    ],
  },
  {
    id: 'x_r_aid', kind: 'rival', title: 'An Ally Asks', emoji: '📯', era: [1, 8], req: { rival: true },
    text: '{rival}, our closest friend, asks for help against bandits. The bandits are three raccoons in a coat.',
    choices: [
      { label: 'Send troops', effect: { stats: { mil: -2 }, rival: { target: 'friendliest', rel: 15 } } },
      { label: 'Send a raccoon expert', effect: { stats: { sci: 2, gold: -2 }, rival: { target: 'friendliest', rel: 10 }, chain: { id: 'ch_f_raccoon', delay: 2 } } },
      { label: 'Wish them luck', effect: { rival: { target: 'friendliest', rel: -10 }, chain: { id: 'ch_f_luck', delay: 2 } } },
    ],
  },
  {
    id: 'x_r_parade', kind: 'rival', title: 'The Border Parade', emoji: '🎺', era: [1, 8], req: { rival: true },
    text: '{rival} is marching its entire army along our border. They are waving. It is not friendly waving.',
    choices: [
      { label: 'Hold a bigger parade', effect: { stats: { mil: 4, gold: -4, joy: 3 }, rival: { target: 'hostile', rel: -5 } } },
      { label: 'Wave back, aggressively', effect: { stats: { joy: 2 }, rival: { target: 'hostile', rel: -5 } } },
      { label: 'Send them lemonade', effect: { stats: { food: -2 }, rival: { target: 'hostile', rel: 10 }, chain: { id: 'ch_f_lemonade', delay: 1 } } },
    ],
  },
  {
    id: 'x_r_merge', kind: 'rival', title: 'Union Proposal', emoji: '🧩', era: [4, 8], req: { rival: true }, weight: 0.6,
    text: '{rival} proposes merging our nations. They want the capital, the flag and the anthem. We get to keep the name.',
    choices: [
      { label: 'Merge, but we keep the anthem', effect: { stats: { pop: 10, gold: 6, joy: -4 }, rival: { target: 'same', destroy: true }, text: '{rival} is now part of {civ}. The anthem is longer.' } },
      { label: 'Counter: we keep everything', effect: { rival: { target: 'same', rel: -10 }, chain: { id: 'ch_f_merge', delay: 2 } } },
      { label: 'Politely decline', effect: { rival: { target: 'same', rel: 5 } } },
    ],
  },
  {
    id: 'x_r_satellite', kind: 'rival', title: 'The Beeping', emoji: '🛰️', era: [6, 8], req: { rival: true },
    text: '{rival} launched a satellite. It beeps. It beeps at us specifically.',
    choices: [
      { label: 'Launch a louder satellite', effect: { stats: { sci: 6, gold: -6 }, rival: { target: 'same', rel: -5 } } },
      { label: 'Beep back', effect: { stats: { joy: 3, weird: 2 }, rival: { target: 'same', rel: 5 }, chain: { id: 'ch_f_beep', delay: 2 } } },
    ],
  },
  {
    id: 'x_r_snitch', kind: 'rival', title: 'Selling Us Out', emoji: '👽', era: [7, 8], req: { rival: true },
    text: '{rival} is secretly negotiating with the aliens. Their offer: spare them, take us.',
    choices: [
      { label: 'Expose them', effect: { rival: { target: 'same', rel: -25 } }, check: {
        base: 0.3, flags: { spies: 0.1, propaganda: 0.1, pigeons: 0.05 }, allies: 0.05,
        success: { text: 'The recordings go public. The aliens find the whole thing tacky and withdraw the offer.', effect: { threat: -2, rival: { target: 'same', mil: -5 } } },
        fail: { text: 'Nobody believes us. Their counter-leak is much better edited.', effect: { stats: { joy: -3 }, alienRel: -3 } },
      } },
      { label: 'Outbid them', effect: { stats: { gold: -10 }, alienRel: 6 } },
      { label: 'Join their deal', effect: { stats: { weird: 3 }, rival: { target: 'same', rel: 10, ally: true }, alienRel: 4 } },
    ],
  },
  {
    id: 'x_r_monument', kind: 'rival', title: 'Monument Envy', emoji: '🏔️', era: [1, 8], req: { rival: true },
    text: 'Since {rival} built their giant monument, ours is technically the second-largest. Which is basically a hill.',
    choices: [
      { label: 'Build a taller one', effect: { stats: { gold: -7, joy: 5, faith: 2 }, rival: { target: 'same', rel: -5 } } },
      { label: 'Put a hat on ours', effect: { stats: { gold: -1, joy: 3 }, text: 'Technically it is now taller.' } },
      { label: 'Congratulate them', effect: { stats: { joy: -2 }, rival: { target: 'same', rel: 10 }, chain: { id: 'ch_f_congrat', delay: 2 } } },
    ],
  },
  {
    id: 'x_r_chess', kind: 'rival', title: 'The Chess Summit', emoji: '♟️', era: [3, 8], req: { rival: true },
    text: '{rival} challenges us to settle our differences over chess. Their champion is twelve and has never lost.',
    choices: [
      {
        label: 'Accept',
        check: {
          base: 0.15, stats: { sci: 0.002 }, flags: { turk: 0.12, scholars: 0.1, robots: 0.04, god_math: 0.15 },
          success: { text: 'Our champion wins by making the child laugh at a crucial moment.', effect: { stats: { joy: 6, sci: 2 }, rival: { target: 'same', rel: 5 } } },
          fail: { text: 'The child wins in nine moves and asks for a snack.', effect: { stats: { joy: -3 }, rival: { target: 'same', rel: 10 } } },
        },
      },
      { label: 'Suggest checkers instead', effect: { stats: { weird: 2 }, rival: { target: 'same', rel: -5 } } },
    ],
  },
  {
    id: 'x_r_hostage_chef', kind: 'rival', title: 'The Poached Chef', emoji: '👨‍🍳', era: [2, 8], req: { rival: true },
    text: "{rival} has hired away our best chef. The palace has been eating toast for a week.",
    choices: [
      { label: 'Poach theirs', effect: { stats: { joy: 4, gold: -3 }, rival: { target: 'same', rel: -10 }, chain: { id: 'ch_f_chefs', delay: 2 } } },
      { label: 'Learn to cook', effect: { stats: { food: 3, sci: 2 } } },
      { label: 'Demand his return or war', effect: { stats: { mil: 2 }, rival: { target: 'same', rel: -20, war: true } } },
    ],
  },
];
