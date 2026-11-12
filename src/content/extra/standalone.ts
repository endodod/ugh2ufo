// Standalone random events.
import type { CardDef } from '../../types';

export const standaloneCards: CardDef[] = [
  {
    id: 'x_e_comet', kind: 'event', title: 'A Comet', emoji: '☄️', era: [0, 3],
    text: 'A comet hangs in the sky. Every soothsayer has a different explanation, all of them bad for someone else.',
    choices: [
      { label: 'Declare it a good omen', effect: { stats: { joy: 4, faith: 2 } } },
      { label: 'Blame the neighbors', effect: { stats: { mil: 3, joy: 1 } } },
      { label: 'Write down its path', effect: { stats: { sci: 4 } } },
    ],
  },
  {
    id: 'x_e_stampede', kind: 'event', title: 'Mammoth Stampede', emoji: '🦣', era: [0, 1],
    text: 'A herd of mammoths is heading for the village. They do not seem angry, just very committed.',
    choices: [
      { label: 'Hunt them', check: {
        base: 0.4, stats: { mil: 0.025 }, flags: { yeet: 0.12, cats: 0.06, land_tundra: 0.1 },
        success: { text: 'Dinner for a season. Legends for a lifetime.', effect: { stats: { food: 10, pop: -1 } } },
        fail: { text: 'The mammoths win. Very decisively.', effect: { stats: { pop: -3, mil: -2 } } },
      } },
      { label: 'Move the village', effect: { stats: { food: -2, joy: -2 } } },
    ],
  },
  {
    id: 'x_e_boat', kind: 'event', title: 'The Big Boat', emoji: '🛶', era: [0, 3], once: true,
    text: 'An old man built an enormous boat in the desert and insists a flood is coming. He is charging admission. Two per family.',
    choices: [
      { label: 'Buy tickets', outcomes: [
        { weight: 1, text: 'The flood comes. Smug passengers wave from the deck.', effect: { stats: { gold: -3, pop: 2, faith: 4 } } },
        { weight: 2, text: 'No flood. The boat is now a very popular restaurant.', effect: { stats: { gold: -3, joy: 4 } } },
      ] },
      { label: 'Mock him', effect: { stats: { joy: 3 } } },
    ],
  },
  {
    id: 'x_e_volcano', kind: 'event', title: 'The Volcano Debate', emoji: '🌋', era: [0, 2], once: true,
    text: 'The volcano is rumbling. The priests want a sacrifice. The volunteers want a second opinion.',
    choices: [
      { label: 'Sacrifice a very large fruit', effect: { stats: { food: -3, faith: 3 }, text: 'The volcano seems unmoved, but polite.' } },
      { label: 'Evacuate', effect: { stats: { food: -4, pop: 1, sci: 2 } } },
      { label: 'Throw the priests in', effect: { stats: { faith: -5, joy: 4, weird: 2 } } },
    ],
  },
  {
    id: 'x_e_hermit', kind: 'event', title: 'The Mountain Hermit', emoji: '🧙', era: [0, 5],
    text: 'A hermit has come down from the mountain bearing wisdom. He will share it for a goat.',
    choices: [
      { label: 'Pay the goat', outcomes: [
        { weight: 1, text: '"Wash your hands." Revolutionary.', effect: { stats: { pop: 3, sci: 3, food: -2 } } },
        { weight: 1, text: '"Never trust a man who sells wisdom for goats." He leaves with the goat.', effect: { stats: { food: -2, weird: 2 } } },
      ] },
      { label: 'Send him back up', effect: { stats: { joy: 1 }, chain: { id: 'ch_f_hermit', delay: 2 } } },
    ],
  },
  {
    id: 'x_e_harvest', kind: 'event', title: 'Bumper Harvest', emoji: '🌽', era: [0, 8],
    text: 'The fields have overproduced. The granaries are full and the vegetables are starting to look smug.',
    choices: [
      { label: 'Feast', effect: { stats: { food: 4, joy: 5 } } },
      { label: 'Sell the surplus', effect: { stats: { gold: 6 } } },
      { label: 'Store it for later', effect: { stats: { food: 8 } } },
    ],
  },
  {
    id: 'x_e_famine', kind: 'event', title: 'Lean Year', emoji: '🥀', era: [0, 6],
    text: 'Crops failed. The royal chef is serving soup made from a recipe for soup.',
    choices: [
      { label: 'Open the treasury', effect: { stats: { gold: -6, food: 6 } } },
      { label: 'Tighten belts', effect: { stats: { food: -3, joy: -4, pop: -1 } } },
      { label: 'Pray for rain', effect: { stats: { faith: 3, food: -4 } } },
    ],
  },
  {
    id: 'x_e_quake', kind: 'event', title: 'Earthquake', emoji: '🫨', era: [0, 8],
    text: 'The ground shook for a full minute. Everything that was up is now down.',
    choices: [
      { label: 'Rebuild quickly', effect: { stats: { gold: -5, joy: 2 } } },
      { label: 'Rebuild properly', effect: { stats: { gold: -8 } }, check: {
        base: 0.4, stats: { sci: 0.003 }, flags: { engineers: 0.15, land_mountain: 0.1, custom_big: -0.1 },
        success: { text: 'The new buildings sway politely during aftershocks. Engineers are smug.', effect: { stats: { sci: 4, joy: 3, pop: 1 } } },
        fail: { text: 'Properly, it turns out, meant "same as before but more expensive".', effect: { stats: { sci: 1 } } },
      } },
      { label: 'Call it modern architecture', effect: { stats: { joy: -3, weird: 3 } } },
    ],
  },
  {
    id: 'x_e_census', kind: 'event', title: 'Census Error', emoji: '🧮', era: [2, 8],
    text: 'The census counted everyone twice. On paper, {civ} is a superpower.',
    choices: [
      { label: 'Keep the numbers', effect: { stats: { mil: 3, gold: -3, weird: 2 }, text: 'Neighbors are suddenly very polite.' } },
      { label: 'Recount', effect: { stats: { gold: -2, sci: 2 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_e_inventor', kind: 'event', title: 'Eccentric Inventor', emoji: '🧑‍🔬', era: [3, 7],
    text: 'An inventor arrives with a machine covered in a sheet. He refuses to say what it does until he is paid.',
    choices: [
      { label: 'Pay him', effect: { stats: { gold: -5 } }, outcomes: [
        { weight: 1, text: 'It is a self-buttering toast machine. Morale soars.', effect: { stats: { joy: 8 } } },
        { weight: 1, text: 'It is a cannon that fires smaller cannons.', effect: { stats: { mil: 8 } } },
        { weight: 1, text: 'It is just the sheet. He is gone.', effect: { stats: { weird: 3 } } },
      ] },
      { label: 'Lift the sheet yourself', effect: { stats: { sci: 3, joy: -1 } } },
    ],
  },
  {
    id: 'x_e_heir', kind: 'event', title: 'The Odd Heir', emoji: '🤴', era: [1, 6],
    text: "{leader}'s heir only speaks to horses and has started signing documents with a hoof print.",
    choices: [
      { label: 'Appoint a horse as tutor', effect: { stats: { weird: 4, joy: 2 } } },
      { label: 'Send the heir to military school', effect: { stats: { mil: 3, joy: -2 }, chain: { id: 'ch_f_heir', delay: 3 } } },
      { label: 'Let the horse inherit', effect: { stats: { weird: 6, joy: 4, mil: -2 } } },
    ],
  },
  {
    id: 'x_e_riot', kind: 'event', title: 'Bread Riots', emoji: '🥖', era: [2, 8], req: { maxStats: { joy: 35 } },
    text: 'An angry mob is at the palace gates. They want bread. They also brought their own bread, to throw.',
    choices: [
      { label: 'Give them bread', effect: { stats: { food: -6, joy: 8 } } },
      { label: 'Give them cake', effect: { stats: { gold: -4, joy: 3, weird: 2 }, text: 'Surprisingly, this worked.' } },
      { label: 'Send the guards', effect: { stats: { mil: -2, joy: -4, pop: -2 } } },
    ],
  },
  {
    id: 'x_e_generals', kind: 'event', title: 'Restless Generals', emoji: '🎖️', era: [2, 8], req: { stats: { mil: 15 } },
    text: 'The generals are bored. Bored generals start wars, or worse, write memoirs.',
    choices: [
      { label: 'Give them a war game', effect: { stats: { gold: -4, mil: 3, joy: 2 } } },
      { label: 'Give them medals', effect: { stats: { gold: -2, joy: 1 } } },
      { label: 'Ignore them', outcomes: [
        { weight: 1, text: 'They sulk. A coup is planned, then forgotten.', effect: { stats: { joy: -2 } } },
        { weight: 1, text: 'They invade a small island. Nobody lived there. Now they do.', effect: { stats: { pop: 2, mil: -2, weird: 2 } } },
      ] },
    ],
  },
  {
    id: 'x_e_scandal', kind: 'event', title: 'Palace Scandal', emoji: '🫢', era: [3, 8],
    text: "Letters reveal {leader} has been secretly sneaking into the theater dressed as an ordinary citizen. Reviews of the plays are scathing.",
    choices: [
      { label: 'Deny everything', effect: { stats: { joy: -3, mil: 1 } } },
      { label: 'Publish the reviews', effect: { stats: { joy: 5, gold: 2 }, text: 'The theater is sold out for a year.' } },
    ],
  },
  {
    id: 'x_e_socks', kind: 'event', title: 'Sock Shortage', emoji: '🧦', era: [5, 8],
    text: 'There is a national shortage of socks. Every washing machine is under investigation.',
    choices: [
      { label: 'Ration socks', effect: { stats: { joy: -3 }, flags: { bureaucracy: 1 } } },
      { label: 'Embrace sandals', effect: { stats: { joy: 4, weird: 2 } } },
      { label: 'Raid the washing machines', outcomes: [
        { weight: 2, text: 'Thousands of single socks recovered. None of them match.', effect: { stats: { joy: 2, gold: 2 } } },
        { weight: 1, text: 'One machine contains a small portal. The socks go somewhere.', effect: { stats: { weird: 5, sci: 4 }, alienRel: 2 } },
      ] },
    ],
  },
  {
    id: 'x_e_witch', kind: 'event', title: 'The Trial', emoji: '🧹', era: [3, 4], once: true,
    text: "A woman is accused of witchcraft. Her crimes: knowing what plants do and owning a confident cat.",
    choices: [
      { label: 'Acquit her', effect: { stats: { sci: 3, faith: -2 } } },
      { label: 'Hire her', effect: { stats: { pop: 3, sci: 3, weird: 2 }, chain: { id: 'ch_f_witch', delay: 2 } } },
      { label: 'Put the cat on trial', req: { flags: { cats: 1 } }, effect: { stats: { weird: 3 }, flags: { cats: 1 }, text: 'The cat is found innocent and promptly promoted.' } },
    ],
  },
  {
    id: 'x_e_lottery', kind: 'event', title: 'National Lottery', emoji: '🎟️', era: [4, 8],
    text: 'A minister proposes a lottery to fund the state. It is a tax on hope, but hope is very taxable.',
    choices: [
      { label: 'Run the lottery', effect: { stats: { gold: 6, joy: 2 } } },
      { label: 'Buy a ticket for the treasury', outcomes: [
        { weight: 1, text: 'The treasury wins its own lottery. Auditors are confused.', effect: { stats: { gold: 12 } } },
        { weight: 4, text: 'The treasury does not win.', effect: { stats: { gold: -1 } } },
      ] },
    ],
  },
  {
    id: 'x_e_ghost', kind: 'event', title: 'The Palace Ghost', emoji: '👻', era: [3, 6], once: true,
    text: "A ghost is haunting the palace. It claims to be a former ruler and has notes on {leader}'s performance.",
    choices: [
      { label: 'Listen to the notes', effect: { stats: { sci: 3, joy: -2, faith: 2 } } },
      { label: 'Hire an exorcist', effect: { stats: { gold: -3, faith: 3 } } },
      { label: 'Give it a cabinet post', effect: { stats: { weird: 5 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'x_e_bones', kind: 'event', title: 'Dragon Bones', emoji: '🦴', era: [4, 6], once: true,
    text: 'Miners have found enormous bones. Scholars say dinosaur. The public says dragon. The public is louder.',
    choices: [
      { label: 'It was a dragon', effect: { stats: { faith: 4, joy: 3, weird: 2 } } },
      { label: 'Build a museum', effect: { stats: { sci: 5, gold: -3 } } },
    ],
  },
  {
    id: 'x_e_strike', kind: 'event', title: 'General Strike', emoji: '🪧', era: [5, 8],
    text: 'Every worker has gone on strike. Demands include better pay, shorter hours and a ban on Mondays.',
    choices: [
      { label: 'Meet the demands', effect: { stats: { gold: -6, joy: 6 } } },
      { label: 'Ban Mondays only', effect: { stats: { joy: 4, gold: -2, weird: 2 }, text: 'The week is now six days. Tuesday has never been more loathed.' } },
      { label: 'Wait them out', effect: { stats: { gold: -3, joy: -5 } } },
    ],
  },
  {
    id: 'x_e_ruffs', kind: 'event', title: 'Fashion Crisis', emoji: '🥸', era: [3, 6], once: true,
    text: 'Collar ruffs have become so large that nobles can no longer see their own food. Several have starved fashionably.',
    choices: [
      { label: 'Regulate collar size', effect: { stats: { joy: -2, pop: 1 }, flags: { bureaucracy: 1 } } },
      { label: 'Invent long spoons', effect: { stats: { sci: 3, joy: 3 } } },
    ],
  },
  {
    id: 'x_e_clone', kind: 'event', title: 'Leader Cloned', emoji: '👥', era: [7, 8], once: true,
    text: 'A lab accident produced a perfect copy of {leader}. It is more popular than the original.',
    choices: [
      { label: 'Let the clone do public events', effect: { stats: { joy: 6, weird: 3 }, flags: { genes: 1 }, chain: { id: 'ch_f_clone', delay: 2 } } },
      { label: 'Make it a backup', effect: { stats: { sci: 3 }, flags: { genes: 1 } } },
      { label: 'Destroy the clone', effect: { stats: { joy: -3, faith: 2 } } },
    ],
  },
  {
    id: 'x_e_hacker', kind: 'event', title: 'Teen Hacker', emoji: '⌨️', era: [7, 8], once: true,
    text: "A fourteen-year-old has hacked the defense network. The missiles now only fire at people who don't hold the door.",
    choices: [
      { label: 'Hire the kid', effect: { stats: { sci: 6, mil: 2, gold: -3 }, chain: { id: 'ch_f_hacker', delay: 2 } } },
      { label: 'Keep the new targeting rules', effect: { stats: { joy: 5, mil: -2, weird: 3 } } },
    ],
  },
  {
    id: 'x_e_cheese', kind: 'event', title: 'Runaway Cheese', emoji: '🧀', era: [2, 5],
    text: 'A giant wheel of cheese has escaped the market and is rolling down the hill. A crowd is chasing it, for some reason.',
    choices: [
      { label: 'Make it an annual festival', effect: { stats: { joy: 6, pop: -1 }, flags: { party: 1 } } },
      { label: 'Stop the cheese', check: {
        base: 0.35, stats: { mil: 0.006 }, flags: { yeet: 0.1, engineers: 0.06, custom_compete: 0.1 },
        success: { text: 'The cheese is tackled. It is delicious and slightly flatter.', effect: { stats: { food: 5 } } },
        fail: { text: 'The cheese reached the river and is now a navigational hazard.', effect: { stats: { joy: 2, weird: 2 } } },
      } },
    ],
  },
  {
    id: 'x_e_toppled', kind: 'event', title: 'Statue Toppled', emoji: '🗿', era: [5, 8],
    text: "Protesters toppled a statue. On inspection, it was of someone nobody remembers and had a pigeon's nest inside.",
    choices: [
      { label: 'Put up a statue of the pigeon', effect: { stats: { joy: 4, weird: 2 } } },
      { label: 'Leave the plinth empty', effect: { stats: { joy: 2, faith: -1 } } },
    ],
  },
  {
    id: 'x_e_preacher', kind: 'event', title: 'Doomsday Preacher', emoji: '📢', era: [4, 8],
    text: 'A man with a sign announces the end of the world. He is, for once, broadly correct about the sky.',
    choices: [
      { label: 'Join his congregation', effect: { stats: { faith: 5, joy: -2 }, flags: { cult: 1 } } },
      { label: 'Ask him for specifics', effect: { stats: { sci: 2 }, threat: -1, chain: { id: 'ch_f_preacher', delay: 2 } } },
      { label: 'Ignore him', effect: { stats: { joy: 1 } } },
    ],
  },
  {
    id: 'x_e_lab', kind: 'event', title: 'Lab Accident', emoji: '🧪', era: [6, 8],
    text: 'A beaker was knocked over in the gene lab. Three lab rats now have opposable thumbs and a lawyer.',
    choices: [
      { label: 'Study the rats', effect: { stats: { sci: 5 }, flags: { genes: 1 } } },
      { label: 'Negotiate with the lawyer', effect: { stats: { gold: -3 }, flags: { bureaucracy: 1 } } },
      { label: 'Destroy everything', effect: { stats: { sci: -2, joy: 2 } } },
    ],
  },
  {
    id: 'x_e_catcensus', kind: 'event', title: 'Cat Census', emoji: '🐈', era: [2, 8], req: { flags: { cats: 2 } },
    text: 'The cat census has failed. Every cat refused to be counted, and several were counted in multiple houses.',
    choices: [
      { label: 'Count them anyway', effect: { stats: { gold: -2 }, flags: { cats: 1, bureaucracy: 1 } } },
      { label: 'Assume there are more', effect: { stats: { weird: 2, joy: 3 }, flags: { cats: 1 } } },
    ],
  },
  {
    id: 'x_e_lostform', kind: 'event', title: 'The Lost Form', emoji: '📄', era: [3, 8], req: { flags: { bureaucracy: 1 } },
    text: 'A single form has gone missing. The entire government has stopped until it is found.',
    choices: [
      { label: 'Form a committee to find it', effect: { stats: { gold: -3 }, flags: { bureaucracy: 1 } } },
      { label: 'Forge a new one', effect: { stats: { joy: 2, weird: 2 } } },
    ],
  },
  {
    id: 'x_e_holiday', kind: 'event', title: 'Accidental Holiday', emoji: '🎈', era: [3, 8],
    text: 'A typo in the calendar created a new national holiday. Nobody will admit it was a typo.',
    choices: [
      { label: 'Celebrate it', effect: { stats: { joy: 6, gold: -3 }, flags: { party: 1 } } },
      { label: 'Correct the calendar', effect: { stats: { gold: 2, joy: -4 } } },
    ],
  },
  {
    id: 'x_e_twins', kind: 'event', title: 'Twin Problem', emoji: '👯', era: [1, 5], once: true,
    text: '{leader} has twin heirs. Nobody wrote down which was born first. Both are very sure.',
    choices: [
      { label: 'Split the kingdom', effect: { stats: { pop: -3, joy: -2, mil: 2 } } },
      { label: 'Let them rule on alternate days', effect: { stats: { joy: 3, weird: 3 } } },
      { label: 'Hold a footrace', effect: { stats: { joy: 5 } } },
    ],
  },
];
