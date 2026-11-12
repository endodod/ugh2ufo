import type { CardDef } from '../../types';

const crises: CardDef[] = [
  {
    id: 'famine', kind: 'event', chainOnly: true, once: false, emoji: '🍂', title: 'The Granaries Are Empty',
    text: 'There is no food left. People are eating things that should not be eaten, such as soup made of other soup.',
    choices: [
      { label: 'Raid {rival}', effect: { stats: { mil: -2 }, rival: { target: 'random', rel: -25 } }, check: {
        base: 0.3, stats: { mil: 0.006 }, flags: { logistics: 0.1, yeet: 0.08, grudge: 0.06 },
        success: { text: 'The raid returns with carts of grain and one confused goat.', effect: { stats: { food: 12 } } },
        fail: { text: 'The raiders came back with a single turnip and several new scars.', effect: { stats: { food: 2, pop: -1 } } },
      } },
      { label: 'Buy grain', req: { stats: { gold: 8 } }, effect: { stats: { gold: -8, food: 10 } } },
      { label: 'Pray for rain', outcomes: [
        { weight: 1, text: 'It rains. Also it rains frogs. Edible frogs.', effect: { stats: { food: 10, faith: 4, weird: 2 } } },
        { weight: 2, text: 'Nothing happens. The gods are on holiday.', effect: { stats: { pop: -2, faith: -3 } } },
      ] },
    ],
  },
  {
    id: 'revolution', kind: 'event', chainOnly: true, once: false, emoji: '🔥', title: 'Revolution!',
    text: 'The people have had it. There are pitchforks. There are torches. There is a very angry man with a pamphlet.',
    choices: [
      { label: 'Give them what they want', effect: { stats: { joy: 30, gold: -10 }, gov: 'democracy' } },
      { label: 'Crush it', effect: { stats: { mil: -6, pop: -3 } }, check: {
        base: 0.3, stats: { mil: 0.005 }, flags: { propaganda: 0.12, spies: 0.08 }, gov: { empire: 0.15, chiefdom: 0.1, democracy: -0.15 },
        success: { text: 'Order is restored. Nobody is happy, but everyone is quiet.', effect: { stats: { joy: 20 } } },
        fail: { text: 'The army joined the revolution halfway through. It had better snacks.', effect: { stats: { joy: 25, gold: -8 }, gov: 'anarchy' } },
      } },
      { label: 'Let chaos reign', effect: { stats: { joy: 35, gold: -6, weird: 5 }, gov: 'anarchy' } },
    ],
  },
];

const general: CardDef[] = [
  {
    id: 'ev_genius_child', kind: 'event', era: [0, 8], emoji: '👶', title: 'A Strange Child',
    text: 'A child in the village keeps building things nobody understands. Yesterday it was a small bridge. Today it was a small bridge to nowhere.',
    choices: [
      { label: 'Send them to study', effect: { stats: { sci: 5, gold: -2 }, chain: { id: 'ch_f_genius', delay: 3 } } },
      { label: 'Make them a priest', effect: { stats: { faith: 5 } } },
      { label: 'Let them be weird', effect: { stats: { weird: 5, joy: 2 } } },
    ],
  },
  {
    id: 'ev_good_harvest', kind: 'event', era: [0, 5], emoji: '🌽', title: 'Bumper Harvest',
    text: 'The harvest is enormous. The barns are full. The mice are throwing a party.',
    choices: [
      { label: 'Store it', effect: { stats: { food: 10 } } },
      { label: 'Sell it', effect: { stats: { food: 4, gold: 6 } } },
      { label: 'Feast!', effect: { stats: { food: 3, joy: 8 }, flags: { party: 1 } } },
    ],
  },
  {
    id: 'ev_plague', kind: 'event', era: [1, 5], emoji: '🤧', title: 'The Sniffles',
    text: 'A mysterious illness is going around. Symptoms include coughing, sneezing and loudly announcing that you are fine.',
    choices: [
      { label: 'Quarantine', effect: { stats: { pop: -1, gold: -4, joy: -4 } } },
      { label: 'Ignore it', outcomes: [
        { weight: 1, text: 'It was just a cold. Phew.', effect: { stats: { joy: 2 } } },
        { weight: 1, text: 'It was not just a cold.', effect: { stats: { pop: -5, joy: -6 } } },
      ] },
      { label: 'Ask the doctors', req: { stats: { sci: 20 } }, effect: { stats: { pop: 1, sci: 2 } } },
    ],
  },
  {
    id: 'ev_comet', kind: 'event', era: [0, 6], emoji: '☄️', title: 'A Comet!',
    text: 'A big burning rock flies across the sky. Everyone agrees it means something. Nobody agrees what.',
    choices: [
      { label: 'It means war', effect: { stats: { mil: 5, joy: -2 } } },
      { label: 'It means good luck', effect: { stats: { joy: 6, faith: 2 } } },
      { label: 'It means science', effect: { stats: { sci: 5 } } },
    ],
  },
  {
    id: 'ev_flood', kind: 'event', era: [0, 7], emoji: '🌊', title: 'The River Got Ideas',
    text: 'The river has decided to visit the town. All of the town.',
    choices: [
      { label: 'Build levees', effect: { stats: { gold: -5 } }, check: {
        base: 0.3, stats: { sci: 0.004 }, flags: { engineers: 0.12, hole: 0.08, land_swamp: 0.2, land_delta: 0.2 },
        success: { text: 'The levees hold. The river sulks back to its bed.', effect: { stats: { food: 4 } } },
        fail: { text: 'The levee was built on the wrong side of town.', effect: { stats: { food: -4, pop: -1 } } },
      } },
      { label: 'Move uphill', effect: { stats: { food: -4, joy: -2 } } },
      { label: 'Fish in the streets', effect: { stats: { food: 6, joy: 3, weird: 2 } } },
    ],
  },
  {
    id: 'ev_hero', kind: 'event', era: [1, 6], emoji: '🦸', title: 'A Hero Emerges',
    text: 'A young warrior has single-handedly defeated a bear, a bandit gang and a rude merchant. In one afternoon.',
    choices: [
      { label: 'Make them general', effect: { stats: { mil: 8 } } },
      { label: 'Write songs about them', effect: { stats: { joy: 6, faith: 2 } } },
      { label: 'They are getting too popular', effect: { stats: { joy: -4, gold: 3 }, text: 'The hero is sent on a very long quest to find a very specific rock.' } },
    ],
  },
  {
    id: 'ev_gold_rush', kind: 'event', era: [3, 6], emoji: '⛏️', title: 'Gold in the Hills!',
    text: 'Someone found gold. Half the population left with shovels. The other half is selling them shovels.',
    choices: [
      { label: 'Tax the shovels', effect: { stats: { gold: 10, joy: -2 } } },
      { label: 'Join the rush', effect: { stats: { food: -4 } }, check: {
        base: 0.25, stats: { sci: 0.002 }, flags: { hole: 0.1, engineers: 0.1, land_mountain: 0.15, land_cave: 0.15, depleted: -0.1 },
        success: { text: 'Jackpot!', effect: { stats: { gold: 20 } } },
        fail: { text: 'It was pyrite. Fools all around.', effect: { stats: { gold: -4, joy: -2 } } },
      } },
    ],
  },
  {
    id: 'ev_gambler', kind: 'event', era: [2, 8], emoji: '🎲', title: 'The Gambler',
    text: 'A stranger with a gold tooth offers a wager: double or nothing on the treasury.',
    choices: [
      { label: 'Bet half the treasury', outcomes: [
        { weight: 1, text: 'You won! The stranger leaves, muttering.', effect: { stats: { gold: 15, joy: 3 } } },
        { weight: 1, text: 'You lost. The stranger is gone. So is the gold.', effect: { stats: { gold: -15 } } },
      ] },
      { label: 'Bet the royal cat', req: { flags: { cats: 1 } }, outcomes: [
        { weight: 1, text: 'You won his whole fortune. The cat did not care either way.', effect: { stats: { gold: 25 } } },
        { weight: 1, text: 'You lost the cat. Three days later the cat came back with the stranger\'s wallet.', effect: { stats: { gold: 10, weird: 3 }, flags: { cats: 1 } } },
      ] },
      { label: 'Decline', effect: { stats: { faith: 1 } } },
    ],
  },
  {
    id: 'ev_inventor', kind: 'event', era: [4, 8], emoji: '🛠️', title: 'A Mad Inventor',
    text: 'A wild-haired inventor wants funding for a machine that "will change everything". He refuses to say how.',
    choices: [
      { label: 'Fund it', effect: { stats: { gold: -5 } }, check: {
        base: 0.25, stats: { sci: 0.003 }, flags: { scholars: 0.1, engineers: 0.08, robots: 0.06, founder_wizard: 0.1 }, gov: { technocracy: 0.15 },
        success: { text: 'It changed everything. It is also a robot. It is called Gerald. Gerald is lovely.', effect: { stats: { sci: 12, joy: 2 }, flags: { robots: 1 } } },
        fail: { text: 'It exploded. Spectacularly. Some useful lessons.', effect: { stats: { sci: 3, pop: -1 } } },
      } },
      { label: 'Show him the door', effect: { stats: { gold: 1 } } },
    ],
  },
  {
    id: 'ev_strange_mushrooms', kind: 'event', era: [0, 3], emoji: '🍄', title: 'Special Mushrooms',
    text: 'The shaman found mushrooms that make you see the future. The future is mostly colours.',
    choices: [
      { label: 'Consult the future', effect: { stats: { weird: 6, faith: 4 } } },
      { label: 'Eat them for dinner', outcomes: [
        { weight: 1, text: 'Dinner went on for three days. Great dinner.', effect: { stats: { joy: 8, weird: 4 } } },
        { weight: 1, text: 'Everyone saw the same vision: a sky full of ships.', effect: { stats: { weird: 4, faith: 4 }, alienRel: 3 } },
      ] },
      { label: 'Burn them', effect: { stats: { sci: 2 } } },
    ],
  },
  {
    id: 'ev_influencer', kind: 'event', era: [7, 8], emoji: '🤳', title: 'The Influencer',
    text: 'A teenager with 400 million followers says the government is "kind of mid". Approval ratings collapse.',
    choices: [
      { label: 'Hire them', effect: { stats: { gold: -6, joy: 8 }, chain: { id: 'ch_f_influencer', delay: 3 } } },
      { label: 'Ban the app', effect: { stats: { joy: -8, sci: 2 } } },
      { label: 'Post a dance', outcomes: [
        { weight: 1, text: 'It went viral. The nation is united in cringe.', effect: { stats: { joy: 10 }, flags: { party: 1 } } },
        { weight: 1, text: 'It went viral for the wrong reasons.', effect: { stats: { joy: -6, weird: 4 } } },
      ] },
    ],
  },
];

const rivals: CardDef[] = [
  {
    id: 'rv_trade', kind: 'rival', req: { rival: true }, era: [0, 8], once: false, weight: 1.5, emoji: '🤝', title: 'Merchants from {rival}',
    text: 'Traders from {rival} arrived with exotic goods: shiny rocks, a strange fruit and a very confident parrot.',
    choices: [
      { label: 'Trade fairly', effect: { stats: { gold: 4 }, rival: { target: 'same', rel: 10 } } },
      { label: 'Haggle aggressively', effect: { stats: { gold: 8 }, rival: { target: 'same', rel: -8 } } },
      { label: 'Steal the parrot', effect: { stats: { joy: 4, weird: 2 }, rival: { target: 'same', rel: -15 }, chain: { id: 'ch_f_parrot', delay: 2 } } },
    ],
  },
  {
    id: 'rv_border', kind: 'rival', req: { rival: true }, era: [0, 8], once: false, emoji: '🪧', title: 'Border Dispute',
    text: '{rival} claims a hill on the border. We claim the same hill. The hill has no opinion.',
    choices: [
      { label: 'Fight for the hill', effect: { stats: { mil: -2 }, rival: { target: 'same', rel: -20 } }, check: {
        base: 0.35, stats: { mil: 0.004 }, flags: { logistics: 0.08, grudge: 0.06 }, allies: 0.08,
        success: { text: 'The hill is ours. It is a very nice hill.', effect: { stats: { gold: 4, joy: 3 } } },
        fail: { text: 'We lost the hill and a bit of the field behind it.', effect: { stats: { mil: -3, joy: -3 } } },
      } },
      { label: 'Share the hill', effect: { stats: { joy: 2 }, rival: { target: 'same', rel: 10 } } },
      { label: 'Declare war', effect: { rival: { target: 'same', war: true, rel: -40 } } },
    ],
  },
  {
    id: 'rv_marriage', kind: 'rival', req: { rival: true }, era: [1, 5], emoji: '💍', title: 'A Royal Wedding',
    text: 'The ruler of {rival} proposes a marriage between our families. Their candidate is 74 and smells of onions.',
    choices: [
      { label: 'Accept', effect: { stats: { joy: -2, gold: 5 }, rival: { target: 'same', rel: 30, ally: true }, chain: { id: 'ch_f_wedding', delay: 3 } } },
      { label: 'Politely decline', effect: { rival: { target: 'same', rel: -10 } } },
      { label: 'Offer the cat instead', req: { flags: { cats: 2 } }, effect: { stats: { weird: 5 }, rival: { target: 'same', rel: 15 }, text: 'They accept. The cat is now a duke of {rival}.', chain: { id: 'ch_f_catwed', delay: 3 } } },
    ],
  },
  {
    id: 'rv_alliance', kind: 'rival', req: { rival: true }, era: [2, 8], emoji: '🛡️', title: 'An Offer of Alliance',
    text: '{rival} suggests an alliance against "everyone else, and also whatever is up there".',
    choices: [
      { label: 'Sign it', effect: { stats: { gold: -4 }, rival: { target: 'friendliest', ally: true, rel: 20 } } },
      { label: 'Not now', effect: { rival: { target: 'friendliest', rel: -5 } } },
    ],
  },
  {
    id: 'rv_spies', kind: 'rival', req: { rival: true }, era: [3, 8], once: false, emoji: '🕶️', title: 'Spies!',
    text: 'We caught a spy from {rival} hiding in a bush. The bush was also a spy.',
    choices: [
      { label: 'Execute the bush', effect: { stats: { mil: 2 }, rival: { target: 'same', rel: -15 } } },
      { label: 'Turn them into double agents', effect: { stats: { sci: 5 }, rival: { target: 'same', rel: -5 }, chain: { id: 'ch_f_double', delay: 2 } } },
      { label: 'Send them back with gifts', effect: { stats: { gold: -3 }, rival: { target: 'same', rel: 12 }, chain: { id: 'ch_f_spygifts', delay: 3 } } },
    ],
  },
  {
    id: 'rv_war_threat', kind: 'rival', req: { rival: true }, era: [1, 8], once: false, emoji: '😠', title: '{rival} Is Getting Ideas',
    text: 'The army of {rival} has been "doing exercises" near our border for a while now. Very big exercises. With siege weapons.',
    choices: [
      { label: 'Pay them off', effect: { stats: { gold: -8 }, rival: { target: 'hostile', rel: 20 }, chain: { id: 'ch_f_paidoff', delay: 3 } } },
      { label: 'Build up the army', effect: { stats: { mil: 6, gold: -3 } } },
      { label: 'Strike first', effect: { rival: { target: 'hostile', war: true } }, check: {
        base: 0.3, stats: { mil: 0.004 }, flags: { spies: 0.08, logistics: 0.08, yeet: 0.05 }, allies: 0.08,
        success: { text: 'The exercises are over. Their siege weapons are now our siege weapons.', effect: { stats: { mil: 3 }, rival: { target: 'hostile', mil: -10 } } },
        fail: { text: 'They were expecting us. It was, after all, a very big exercise.', effect: { stats: { mil: -6, joy: -4 }, rival: { target: 'hostile', mil: -2 } } },
      } },
    ],
  },
  {
    id: 'rv_tech_swap', kind: 'rival', req: { rival: true }, era: [2, 8], once: false, emoji: '📦', title: 'Knowledge Exchange',
    text: 'The scholars of {rival} offer to swap books. Theirs are mostly about fish, but very good fish.',
    choices: [
      { label: 'Swap books', effect: { stats: { sci: 5 }, rival: { target: 'same', rel: 8 } } },
      { label: 'Copy theirs, keep ours', effect: { stats: { sci: 7 }, rival: { target: 'same', rel: -10 }, chain: { id: 'ch_f_copied', delay: 2 } } },
    ],
  },
  {
    id: 'rv_refugees', kind: 'rival', req: { rival: true }, era: [1, 8], emoji: '🚶', title: 'Refugees from {rival}',
    text: 'A crowd from {rival} arrives at the border. Their village was eaten by something they describe only as "a big lizard, bigger than that".',
    choices: [
      { label: 'Welcome them', effect: { stats: { pop: 4, food: -4, joy: 2 }, rival: { target: 'same', rel: 10 }, chain: { id: 'ch_f_lizard', delay: 3 } } },
      { label: 'Turn them away', effect: { stats: { joy: -3 }, rival: { target: 'same', rel: -10 } } },
      { label: 'Ask about the lizard', effect: { stats: { weird: 4, sci: 2 } } },
    ],
  },
];

const history: CardDef[] = [
  {
    id: 'hi_flood_myth', kind: 'history', era: [0, 1], emoji: '🛶', title: 'The Big Flood',
    text: 'It rained for a very long time. One man built a boat and put two of every animal in it. He has now opened a petting zoo.',
    choices: [
      { label: 'Buy a ticket', effect: { stats: { joy: 5, gold: -2, food: 2 } } },
      { label: 'Steal the cats', effect: { stats: { weird: 2 }, flags: { cats: 1 } } },
    ],
  },
  {
    id: 'hi_olympics', kind: 'history', era: [2, 2], emoji: '🏅', title: 'The First Games',
    text: 'Athletes run, jump and throw things, naked, for an olive wreath. Sponsorship deals are still being worked out.',
    choices: [
      { label: 'Host the games', effect: { stats: { joy: 8, gold: -4 }, rival: { target: 'random', rel: 10 } } },
      { label: 'Send the best athletes', outcomes: [
        { weight: 1, text: 'Gold medal! The nation weeps with pride.', effect: { stats: { joy: 10 } } },
        { weight: 1, text: 'Our runner stopped for a snack mid-race.', effect: { stats: { joy: -2, food: 1 } } },
      ] },
    ],
  },
  {
    id: 'hi_library_fire', kind: 'history', era: [2, 3], emoji: '🔥', req: { stats: { sci: 20 } }, title: 'The Library Is on Fire',
    text: 'The great library has caught fire. The librarians are running out with as many scrolls as they can carry. One is carrying only the cookbook.',
    choices: [
      { label: 'Save the science', effect: { stats: { sci: -4, food: -2 } } },
      { label: 'Save the cookbook', effect: { stats: { sci: -10, food: 6, joy: 4 } } },
      { label: 'Roast marshmallows', effect: { stats: { sci: -12, joy: 6, weird: 3 } } },
    ],
  },
  {
    id: 'hi_tulips', kind: 'history', era: [4, 4], emoji: '🌷', title: 'Tulip Mania',
    text: 'A single tulip bulb is now worth more than a house. People are trading their houses for tulips. Then living in the tulips.',
    choices: [
      { label: 'Buy tulips!', outcomes: [
        { weight: 1, text: 'You sold at the top. A genius.', effect: { stats: { gold: 20 } } },
        { weight: 2, text: 'The bubble burst. You now own a very expensive flower.', effect: { stats: { gold: -12, joy: 2 } } },
      ] },
      { label: 'Ban tulips', effect: { stats: { gold: 3, joy: -3 } } },
    ],
  },
  {
    id: 'hi_moon', kind: 'history', era: [6, 7], emoji: '🌕', title: 'One Small Step',
    text: 'Our astronaut has landed on the moon. Their first words are being broadcast live. They have forgotten their first words.',
    choices: [
      { label: '"Hello, moon"', effect: { stats: { joy: 10, sci: 5 } } },
      { label: 'Plant a flag', effect: { stats: { mil: 3, joy: 6 }, threat: 1 } },
      { label: 'Look for aliens', outcomes: [
        { weight: 1, text: 'There is a sign on the dark side: "KEEP OUT. -Management."', effect: { stats: { weird: 6 }, alienRel: -3, threat: -2 } },
        { weight: 1, text: 'Nothing. Just rocks. Very quiet rocks.', effect: { stats: { sci: 4 } } },
      ] },
    ],
  },
  {
    id: 'hi_y2k', kind: 'history', era: [7, 7], emoji: '💾', title: 'The Millennium Bug',
    text: 'Experts warn that when the clocks turn over, computers may think it is the year 1900. The robots are especially worried.',
    choices: [
      { label: 'Fix every computer', effect: { stats: { gold: -8, sci: 4 } } },
      { label: 'Do nothing', outcomes: [
        { weight: 3, text: 'Nothing happened. As usual.', effect: { stats: { gold: 2 } } },
        { weight: 1, text: 'Every robot now thinks it is 1900 and is looking for a horse.', effect: { stats: { weird: 6, joy: 3 }, flags: { robots: -1 } } },
      ] },
    ],
  },
];

export const eventCards: CardDef[] = [...crises, ...general, ...rivals, ...history];
