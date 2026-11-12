// Finance, military life, discovery and trade diplomacy.
import type { CardDef } from '../../types';

export const economyCards: CardDef[] = [
  {
    id: 'x_f_loan', kind: 'event', title: 'A Generous Loan', emoji: '🏦', era: [3, 8],
    text: 'A foreign banking family offers a loan at very reasonable interest. The fine print is in a font only ants can read.',
    choices: [
      { label: 'Take the loan', effect: { stats: { gold: 12 }, flags: { debt: 1 } } },
      { label: 'Take a bigger loan', effect: { stats: { gold: 20 }, flags: { debt: 2 } } },
      { label: 'Decline', effect: { stats: { joy: 1 } } },
    ],
  },
  {
    id: 'x_f_creditors', kind: 'event', title: 'Creditors at the Door', emoji: '📬', era: [3, 8], req: { flags: { debt: 2 } },
    text: 'The bankers are back. They are holding a very long scroll and an even longer face.',
    choices: [
      { label: 'Pay up', effect: { stats: { gold: -14 }, set: { debt: 0 } } },
      { label: 'Default', effect: { stats: { gold: 4, joy: -3 }, set: { debt: 0 }, flags: { unrest: 1 }, text: 'Our credit rating is now "lol".' } },
      { label: 'Borrow more to pay the interest', effect: { stats: { gold: 3 }, flags: { debt: 1, inflation: 1 } } },
    ],
  },
  {
    id: 'x_f_print', kind: 'event', title: 'Print More Money', emoji: '🖨️', era: [5, 8],
    text: 'The treasurer has a brilliant idea: what if we simply made more money?',
    choices: [
      { label: 'Print it', effect: { stats: { gold: 10 }, flags: { inflation: 1 } } },
      { label: 'Print a little', effect: { stats: { gold: 5 } } },
      { label: 'Fire the treasurer', effect: { stats: { joy: 2 } } },
    ],
  },
  {
    id: 'x_f_inflation', kind: 'event', title: 'Wheelbarrow Economy', emoji: '🛒', era: [4, 8], req: { flags: { inflation: 2 } },
    text: 'A loaf of bread now costs a wheelbarrow of cash. Thieves steal the wheelbarrows and leave the cash.',
    choices: [
      { label: 'Introduce a new currency', effect: { stats: { gold: -6, joy: 3 }, set: { inflation: 0 } } },
      { label: 'Return to barter', effect: { stats: { gold: -4, food: 3, weird: 3 }, set: { inflation: 0 } } },
      { label: 'Add more zeroes', effect: { stats: { joy: -5, weird: 3 }, flags: { inflation: 1, unrest: 1 } } },
    ],
  },
  {
    id: 'x_f_tax', kind: 'event', title: 'Tax Reform', emoji: '🧾', era: [1, 8],
    text: 'The treasury proposes a new tax. Candidates include windows, beards and the number of chairs owned.',
    choices: [
      { label: 'Window tax', effect: { stats: { gold: 6, joy: -3 }, text: 'Houses are now very dark.' } },
      { label: 'Beard tax', effect: { stats: { gold: 5, joy: -2, mil: -1 } } },
      { label: 'Tax the rich', effect: { stats: { gold: 7, joy: 2 }, flags: { unrest: 1 } } },
    ],
  },
  {
    id: 'x_f_tariff', kind: 'event', title: 'Tariff Debate', emoji: '🚢', era: [4, 8],
    text: 'Domestic cheesemakers demand tariffs on foreign cheese. Foreign cheesemakers threaten tariffs on our hats.',
    choices: [
      { label: 'Impose tariffs', effect: { stats: { gold: 5, joy: -2 } } },
      { label: 'Free trade', effect: { stats: { gold: 3, food: 3, joy: 1 } } },
      { label: 'Tariff only the smelly cheeses', effect: { stats: { gold: 2, joy: 3 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_f_bank', kind: 'event', title: 'Bank Run', emoji: '🏃', era: [5, 8],
    text: 'A rumor says the national bank is empty. Everyone ran to withdraw their savings. The rumor is now true.',
    choices: [
      { label: 'Bail out the bank', effect: { stats: { gold: -8, joy: 2 }, flags: { debt: 1 } } },
      { label: 'Let it fail', effect: { stats: { joy: -6, gold: -2 }, flags: { unrest: 1 } } },
      { label: 'Declare a bank holiday', effect: { stats: { joy: 3 }, flags: { party: 1 }, text: 'Everyone is too busy celebrating to panic.' } },
    ],
  },
  {
    id: 'x_f_canal', kind: 'event', title: 'The Grand Canal', emoji: '🛶', era: [2, 7], once: true,
    text: 'Engineers propose a canal through the mountains. The mountains have not been consulted.',
    choices: [
      { label: 'Dig it', effect: { stats: { gold: -10, food: 5 }, chain: { id: 'x_f_canal_done', delay: 4 } } },
      { label: 'Build a road instead', effect: { stats: { gold: -4, pop: 2 } } },
    ],
  },
  {
    id: 'x_f_canal_done', kind: 'event', title: 'The Canal Opens', emoji: '🚢', chainOnly: true, once: true,
    text: 'The canal is finished. On opening day, the very first ship gets stuck sideways in it.',
    choices: [
      { label: 'Pull it out with oxen', effect: { stats: { food: -2 } }, check: {
        base: 0.35, stats: { sci: 0.003 }, flags: { engineers: 0.15, logistics: 0.08, yeet: 0.05 },
        success: { text: 'The ship pops out like a cork. Trade floods through.', effect: { stats: { gold: 12 } } },
        fail: { text: 'The oxen are now also stuck. The canal is closed for the season.', effect: { stats: { gold: 3, joy: -2 } } },
      } },
      { label: 'Charge tourists to see it', effect: { stats: { gold: 8, joy: 3 } } },
    ],
  },
  {
    id: 'x_m_veterans', kind: 'event', title: 'The Veterans Return', emoji: '🎖️', era: [1, 8],
    text: 'The army is back from campaign. The soldiers want land, pensions and for someone to listen to their stories.',
    choices: [
      { label: 'Grant them land', effect: { stats: { food: 4, gold: -3, mil: 2 } } },
      { label: 'Pay pensions', effect: { stats: { gold: -6, joy: 3, mil: 3 } } },
      { label: 'Ignore them', effect: { stats: { mil: -3 }, flags: { unrest: 1 } } },
    ],
  },
  {
    id: 'x_m_supply', kind: 'event', title: 'Supply Lines', emoji: '🥫', era: [2, 8],
    text: 'The army has run out of food at the front. The quartermaster sent ten thousand left boots instead.',
    choices: [
      { label: 'Send food urgently', effect: { stats: { food: -6, mil: 3 } } },
      { label: 'Fire the quartermaster', effect: { stats: { mil: -2 }, flags: { bureaucracy: 1 } } },
      { label: 'Teach soldiers to hop', effect: { stats: { mil: -1, joy: 3, weird: 3 } } },
    ],
  },
  {
    id: 'x_m_morale', kind: 'event', title: 'Troop Morale', emoji: '🪖', era: [1, 8],
    text: 'Soldiers are bored and miserable. Desertions are up. One deserter left a polite note.',
    choices: [
      { label: 'Raise their pay', effect: { stats: { gold: -5, mil: 4 } } },
      { label: 'Send a band', effect: { stats: { gold: -2, mil: 2, joy: 2 }, chain: { id: 'ch_f_band', delay: 2 } } },
      { label: 'Flog the morale back in', effect: { stats: { mil: -2, joy: -3 } } },
    ],
  },
  {
    id: 'x_m_walls', kind: 'event', title: 'The Great Wall Proposal', emoji: '🧱', era: [1, 5], once: true,
    text: 'The generals want a wall along the entire border. The budget wants to know which border.',
    choices: [
      { label: 'Build the whole wall', effect: { stats: { gold: -12, joy: -2 } }, check: {
        base: 0.35, stats: { sci: 0.008 }, flags: { engineers: 0.15, logistics: 0.08, custom_big: 0.15 },
        success: { text: 'The wall is finished. You can see it from very far away, if you squint.', effect: { stats: { mil: 10 } } },
        fail: { text: 'The wall was built along the wrong border. The sea is now very well defended.', effect: { stats: { mil: 3, weird: 3 } } },
      } },
      { label: 'Build a very convincing painting of a wall', effect: { stats: { gold: -3, mil: 3, weird: 3 } } },
      { label: 'Build half a wall', effect: { stats: { gold: -5, mil: 3 } } },
    ],
  },
  {
    id: 'x_m_coup', kind: 'event', title: 'Coup Rumors', emoji: '🗡️', era: [3, 8], req: { stats: { mil: 20 }, maxStats: { joy: 45 } },
    text: 'The generals are holding meetings without inviting {leader}. The snacks at these meetings are excellent.',
    choices: [
      { label: 'Invite yourself', effect: { stats: { mil: 2, joy: 2 } } },
      { label: 'Purge the generals', effect: { stats: { mil: -6 } }, check: {
        base: 0.3, flags: { spies: 0.15, propaganda: 0.08, custom_secret: 0.1 },
        success: { text: 'The generals are retired to a farm. A real one, surprisingly.', effect: { stats: { joy: 2 } } },
        fail: { text: 'The generals were tipped off. Half of them escaped with half the army.', effect: { stats: { mil: -6, joy: -4 }, flags: { unrest: 1 } } },
      } },
      { label: 'Hand them power', effect: { stats: { mil: 5, joy: -4 }, gov: 'empire' } },
    ],
  },
  {
    id: 'x_m_deserter', kind: 'event', title: 'The Enemy Defector', emoji: '🏳️', era: [2, 8],
    text: 'A foreign officer defected with their battle plans. Unfortunately the plans are for a war three hundred years ago.',
    choices: [
      { label: 'Study them anyway', effect: { stats: { sci: 3, mil: 2 } } },
      { label: 'Make him a general', effect: { stats: { mil: 4, weird: 2 } } },
    ],
  },
  {
    id: 'x_d_ruins', kind: 'event', title: 'Ancient Ruins', emoji: '🏛️', era: [3, 8],
    text: 'Archaeologists found ruins of a civilization older than ours. They had better plumbing.',
    choices: [
      { label: 'Excavate carefully', effect: { stats: { sci: 6, gold: -4 } } },
      { label: 'Loot it', effect: { stats: { gold: 8, faith: -2 } } },
      { label: 'Check for alien fingerprints', effect: { stats: { sci: 3, weird: 3 }, alienRel: 2, threat: -1 } },
    ],
  },
  {
    id: 'x_d_script', kind: 'event', title: 'The Old Script', emoji: '📜', era: [3, 8], once: true,
    text: 'Scholars have deciphered an ancient tablet. After years of work, it turns out to be a receipt for barley.',
    choices: [
      { label: 'Keep deciphering', check: {
        base: 0.25, stats: { sci: 0.002 }, flags: { scholars: 0.12, alien_contact: 0.06, prophecy: 0.06 },
        success: { text: 'The third tablet describes lights in the sky and a very specific date.', effect: { stats: { sci: 4 }, threat: -3 } },
        fail: { text: 'The second tablet is a complaint about the barley. Scholars weep with joy.', effect: { stats: { sci: 5, joy: 3 } } },
      } },
      { label: 'Frame the receipt', effect: { stats: { joy: 2, gold: 1 } } },
    ],
  },
  {
    id: 'x_d_lostship', kind: 'event', title: 'The Lost Research Ship', emoji: '🚢', era: [4, 8], once: true,
    text: 'Our research ship vanished two years ago. It just sailed back into port with a crew that is very tanned and very vague.',
    choices: [
      { label: 'Debrief the crew', outcomes: [
        { weight: 1, text: 'They found an island of giant tortoises who taught them patience.', effect: { stats: { sci: 6, joy: 3 } } },
        { weight: 1, text: 'They will only say "they asked about you" and point upward.', effect: { stats: { weird: 5 }, flags: { alien_contact: 1 } } },
      ] },
      { label: 'Fund a second voyage', effect: { stats: { gold: -5, sci: 4, food: 3 }, chain: { id: 'ch_f_voyage2', delay: 3 } } },
    ],
  },
  {
    id: 'x_d_patent', kind: 'event', title: 'Patent Wars', emoji: '📑', era: [5, 8],
    text: 'Two inventors claim they invented the same machine. Both machines are very similar. Both inventors are very loud.',
    choices: [
      { label: 'Grant both patents', effect: { stats: { sci: 3, gold: -2 }, flags: { bureaucracy: 1 } } },
      { label: 'Make them build it together', effect: { stats: { sci: 6, joy: -2 } } },
      { label: 'Abolish patents', effect: { stats: { sci: 5, gold: -4 } } },
    ],
  },
  {
    id: 'x_d_eureka', kind: 'event', title: 'Shower Thought', emoji: '💡', era: [2, 8],
    text: 'The Royal Scientist had a sudden breakthrough in the bath. She is now running through the palace demanding a pencil.',
    choices: [
      { label: 'Fetch her a pencil', effect: { stats: { sci: 6 } } },
      { label: 'Install pencils in every bath', effect: { stats: { sci: 4, gold: -2, joy: 2 } } },
    ],
  },
  {
    id: 'x_r_embargo', kind: 'rival', title: 'Embargo', emoji: '🚫', era: [3, 8], req: { rival: true },
    text: '{rival} has embargoed our exports. Our warehouses are full of our famous decorative spoons.',
    choices: [
      { label: 'Smuggle the spoons', effect: { stats: { gold: 4 }, flags: { corruption: 1 }, rival: { target: 'same', rel: -5 } } },
      { label: 'Embargo them back', effect: { stats: { gold: -3 }, rival: { target: 'same', rel: -10 } } },
      { label: 'Negotiate', effect: { stats: { gold: -2 } }, check: {
        base: 0.35, flags: { diplomats: 0.13, custom_polite: 0.2, bureaucracy: 0.03 }, allies: 0.05,
        success: { text: 'The embargo is lifted. We include a free spoon as a gesture.', effect: { stats: { gold: 4 }, rival: { target: 'same', rel: 12 } } },
        fail: { text: 'The talks stall over the shape of the table. Then the shape of the spoons.', effect: { rival: { target: 'same', rel: 3 } } },
      } },
    ],
  },
  {
    id: 'x_r_piracy', kind: 'rival', title: 'Piracy on the Trade Route', emoji: '🏴‍☠️', era: [2, 7], req: { rival: true },
    text: 'Pirates are raiding the shipping lane to {rival}. They are, by all accounts, extremely polite about it.',
    choices: [
      { label: 'Joint naval patrol', effect: { stats: { gold: -3 }, rival: { target: 'same', rel: 10 } }, check: {
        base: 0.3, flags: { navy: 0.15, land_coast: 0.1, land_island: 0.1 }, allies: 0.06,
        success: { text: 'The pirates surrender, politely. Trade resumes.', effect: { stats: { gold: 5, mil: 2 } } },
        fail: { text: 'Our patrol boat was boarded. The pirates apologized the whole time.', effect: { stats: { mil: -2 } } },
      } },
      { label: 'Pay the pirates off', effect: { stats: { gold: -5 }, flags: { corruption: 1 } } },
      { label: 'Hire the pirates', effect: { stats: { mil: 4, gold: -2 }, rival: { target: 'same', rel: -10 }, text: 'Their politeness unsettles the enemy.' } },
    ],
  },
  {
    id: 'x_r_trade_deal', kind: 'rival', title: 'A Trade Deal', emoji: '🤝', era: [2, 8], req: { rival: true },
    text: '{rival} proposes a trade deal: our grain for their iron. Their iron is good. Our grain is mostly grain.',
    choices: [
      { label: 'Sign it', effect: { stats: { food: -4, mil: 4, gold: 2 }, rival: { target: 'same', rel: 10 } } },
      { label: 'Demand their silk too', effect: { stats: { food: -4, gold: 4 }, rival: { target: 'same', rel: -5 } } },
    ],
  },
  {
    id: 'x_r_threatened', kind: 'rival', title: 'Nervous Neighbors', emoji: '😰', era: [2, 8], req: { rival: true, stats: { mil: 20 } },
    text: 'Our army is so large that {rival} has started sleeping with a sword under the pillow. The swords are uncomfortable.',
    choices: [
      { label: 'Reassure them', effect: { stats: { gold: -3 }, rival: { target: 'same', rel: 15 } } },
      { label: 'Hold maneuvers at the border', effect: { stats: { mil: 3 }, rival: { target: 'same', rel: -15 } } },
      { label: 'Offer them protection, for a fee', effect: { stats: { gold: 6 }, rival: { target: 'same', rel: -5, ally: true }, chain: { id: 'ch_f_fee', delay: 3 } } },
    ],
  },
  {
    id: 'x_r_reputation', kind: 'rival', title: 'Reputation Abroad', emoji: '🗞️', era: [4, 8], req: { rival: true },
    text: "{rival}'s newspapers describe {civ} as 'the weird ones down the road'. The description is circulating widely.",
    choices: [
      { label: 'Launch a charm campaign', effect: { stats: { gold: -4, joy: 2 }, rival: { target: 'same', rel: 10 } } },
      { label: 'Lean into it', effect: { stats: { weird: 5, joy: 3 } } },
      { label: 'Ban their newspapers', effect: { stats: { joy: -2 }, rival: { target: 'same', rel: -5 } } },
    ],
  },
  {
    id: 'x_r_techtransfer', kind: 'rival', title: 'Technology Transfer', emoji: '🔧', era: [3, 8], req: { rival: true },
    text: '{rival} offers to share their latest invention if we share ours. Theirs is a clock. Ours is a spoon with a hat.',
    choices: [
      { label: 'Swap inventions', effect: { stats: { sci: 5 }, rival: { target: 'same', rel: 10 } } },
      { label: 'Take the clock and keep the spoon', effect: { stats: { sci: 6 }, rival: { target: 'same', rel: -15 } } },
    ],
  },
  {
    id: 'x_r_ambassador', kind: 'rival', title: 'The Insulted Ambassador', emoji: '🎩', era: [2, 8], req: { rival: true },
    text: "{rival}'s ambassador was seated next to the kitchen door at dinner. He considers it the gravest insult in diplomatic history.",
    choices: [
      { label: 'Give him the best seat next time', effect: { stats: { joy: -1 }, rival: { target: 'same', rel: 10 } } },
      { label: 'Seat him in the kitchen', effect: { stats: { joy: 4 }, rival: { target: 'same', rel: -15 }, chain: { id: 'ch_f_kitchen', delay: 3 } } },
      { label: 'Hire him as a food critic', effect: { stats: { gold: -2, food: 2 }, rival: { target: 'same', rel: 5 }, chain: { id: 'ch_f_critic', delay: 2 } } },
    ],
  },
  {
    id: 'x_r_allyhelp', kind: 'rival', title: 'Call to Arms', emoji: '📯', era: [2, 8], req: { rival: true },
    text: 'Our closest ally {rival} has been attacked and is invoking our alliance. They have sent a very sad letter with illustrations.',
    choices: [
      { label: 'March to their aid', effect: { stats: { mil: -4 }, rival: { target: 'same', rel: 15, ally: true } }, check: {
        base: 0.35, stats: { mil: 0.004 }, flags: { logistics: 0.12, navy: 0.05 }, allies: 0.06,
        success: { text: 'The attackers are routed. The next sad letter is a thank-you card.', effect: { stats: { joy: 4, mil: 2 }, rival: { target: 'same', rel: 10 } } },
        fail: { text: 'We arrived late and lost. They appreciate the effort, mostly.', effect: { stats: { mil: -3, joy: -2 } } },
      } },
      { label: 'Send supplies', effect: { stats: { food: -4, gold: -3 }, rival: { target: 'same', rel: 10 } } },
      { label: 'Pretend the letter got lost', effect: { rival: { target: 'same', rel: -20, ally: false }, chain: { id: 'ch_f_lostletter', delay: 1 } } },
    ],
  },
];
