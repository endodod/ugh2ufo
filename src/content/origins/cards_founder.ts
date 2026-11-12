import type { CardDef } from '../../types';

export const founderCards: CardDef[] = [
  {
    id: 'o_expl_1', kind: 'history', title: 'The Founder\'s Map', emoji: '🗺️', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_explorer: 1 } },
    text: 'Scholars have found the founder\'s map. The arrow says "much better place, this way". It points at the sea.',
    choices: [
      { label: 'Follow the arrow', check: {
        base: 0.35, flags: { navy: 0.15, logistics: 0.1, land_coast: 0.15, land_island: 0.15 },
        success: { text: 'They found an island full of fruit. Founder was right.', effect: { stats: { food: 6, sci: 3 } } },
        fail: { text: 'They found more sea. Lots of it. They are still out there.', effect: { stats: { pop: -2, sci: 3 } } },
      } },
      { label: 'Frame it in the palace', effect: { stats: { faith: 3, joy: 2 } } },
    ],
  },
  {
    id: 'o_expl_2', kind: 'history', title: 'Asking for Directions', emoji: '❓', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_explorer: 1 } },
    text: 'In honour of the founder, every citizen is legally obliged to refuse to ask for directions. Traffic has become a philosophy.',
    choices: [
      { label: 'Fund cartography instead', effect: { stats: { sci: 7, gold: -3 } } },
      { label: 'Keep the tradition', effect: { stats: { joy: 3, weird: 3, gold: -2 } } },
    ],
  },
  {
    id: 'o_expl_3', kind: 'history', title: 'Where He Was Going', emoji: '🌌', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_explorer: 1 } },
    text: 'Telescopes finally decoded the founder\'s notes. The "much better place" was a star. He was very, very lost.',
    choices: [
      { label: 'Finish his journey', effect: { stats: { gold: -8, sci: 10 }, flags: { alien_contact: 1 } } },
      { label: 'Admit this is the better place', effect: { stats: { joy: 8, faith: 4 } } },
    ],
  },

  {
    id: 'o_twin_1', kind: 'history', title: 'Two Capitals', emoji: '👯', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_twins: 1 } },
    text: 'Each twin built a capital on opposite sides of the river. The river has been asked to pick one. It declined.',
    choices: [
      { label: 'Build a bridge', effect: { stats: { gold: -3, joy: 4, pop: 2 } } },
      { label: 'Keep them competing', effect: { stats: { mil: 4, sci: 3, joy: -3 } } },
    ],
  },
  {
    id: 'o_twin_2', kind: 'history', title: 'The Feud Returns', emoji: '⚔️', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_twins: 1 } },
    text: 'Two noble houses, descended from each twin, have started a war over who was born first. Both have documents. Both documents are forged.',
    choices: [
      { label: 'Let them fight it out', effect: { stats: { mil: 6, pop: -3, joy: -2 } } },
      { label: 'Declare them both younger', effect: { stats: { joy: 5, weird: 3 }, text: 'Both are furious. They have, for the first time, something in common.' } },
      { label: 'Hold a census of the archives', effect: { stats: { sci: 3 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'o_twin_3', kind: 'history', title: 'Two Space Programs', emoji: '🚀', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_twins: 1 } },
    text: 'The two halves of {civ} each have a space program. Each one is mostly aimed at the other.',
    choices: [
      { label: 'Unite against the aliens', effect: { stats: { mil: 12, joy: 4 }, threat: -2, text: 'Nothing unites twins like a third sibling nobody invited.' } },
      { label: 'Let them race', effect: { stats: { sci: 12, gold: -6 } } },
    ],
  },

  {
    id: 'o_goat_1', kind: 'history', title: 'The Goat\'s Descendants', emoji: '🐐', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_goat: 1 } },
    text: 'The founding goat\'s descendants claim noble rights. They have eaten the treaty that says otherwise.',
    choices: [
      { label: 'Grant the goats a council seat', effect: { stats: { weird: 4, joy: 3, gold: -2 } } },
      { label: 'Goat cheese, but holy', effect: { stats: { food: 5, faith: 3 } } },
    ],
  },
  {
    id: 'o_goat_2', kind: 'history', title: 'The Goat Constitution', emoji: '📜', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_goat: 1 } },
    text: 'Historians realise the constitution was co-written by a goat. Article 4 just says "mmeeeh". Lawyers have argued about it for a century.',
    choices: [
      { label: 'Interpret it as freedom', effect: { stats: { joy: 6 } } },
      { label: 'Interpret it as war', effect: { stats: { mil: 6, joy: -2 } } },
      { label: 'Ask a goat', effect: { stats: { weird: 6, faith: 3 }, text: 'The goat ate the constitution. This is now the official interpretation.' } },
    ],
  },
  {
    id: 'o_goat_3', kind: 'history', title: 'Goat in Orbit', emoji: '🛰️', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_goat: 1 } },
    text: 'Tradition says the founding goat walked until it found the right place. The space agency has a goat in a suit and it is walking toward the airlock.',
    choices: [
      { label: 'Open the airlock', effect: { stats: { weird: 10, faith: 4 }, flags: { alien_contact: 1 }, alienRel: 4, chain: { id: 'ch_f_spacegoat', delay: 3 } } },
      { label: 'Genetically upgrade the goats', effect: { stats: { sci: 6, food: 4 }, flags: { genes: 2 } } },
    ],
  },

  {
    id: 'o_exile_1', kind: 'history', title: 'Proving Them Wrong', emoji: '😤', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_exile: 1 } },
    text: 'Word arrived that the tribe that expelled our founder is having a great harvest. Morale is now pure spite.',
    choices: [
      { label: 'Have a better harvest', effect: { stats: { food: 6, joy: -1 } } },
      { label: 'Send them a smug letter', effect: { stats: { joy: 4 }, rival: { target: 'hostile', rel: -6 }, chain: { id: 'ch_f_smug', delay: 2 } } },
    ],
  },
  {
    id: 'o_exile_2', kind: 'history', title: 'The Reasons', emoji: '📄', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_exile: 1 } },
    text: 'Historians found the actual reason the founder was expelled. It was for "repeatedly licking the chief\'s spear".',
    choices: [
      { label: 'Bury the evidence', effect: { stats: { gold: -3, joy: 3 } } },
      { label: 'Make spear-licking a national sport', effect: { stats: { joy: 5, weird: 5, mil: 2 } } },
    ],
  },
  {
    id: 'o_exile_3', kind: 'history', title: 'They Want to Join Us', emoji: '🤝', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_exile: 1 } },
    text: 'The descendants of the tribe that expelled us are asking to shelter with us from the invasion. You have waited thousands of years for this moment.',
    choices: [
      { label: 'Let them in, graciously', effect: { stats: { pop: 6, mil: 4, joy: 4 }, rival: { target: 'hostile', rel: 20 } } },
      { label: 'Expel them', effect: { stats: { joy: 8, weird: 2 }, text: 'It felt amazing. Nobody regrets it. Yet.' } },
    ],
  },

  {
    id: 'o_acc_1', kind: 'history', title: 'Still Unpacking', emoji: '🧳', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_accident: 1 } },
    text: 'Nobody has ever fully unpacked. The palace is mostly boxes. The king sleeps in a bag labelled "misc".',
    choices: [
      { label: 'Unpack, finally', effect: { stats: { joy: 5, gold: 2 } } },
      { label: 'Stay ready to move', effect: { stats: { mil: 4, pop: 1 } } },
    ],
  },
  {
    id: 'o_acc_2', kind: 'history', title: 'The Temporary Capital', emoji: '⛺', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_accident: 1 } },
    text: 'The capital has been the "temporary capital" for 900 years. Planning permission for anything permanent is still pending.',
    choices: [
      { label: 'Make it permanent', effect: { stats: { gold: -5, pop: 4, joy: 3 } } },
      { label: 'Keep it temporary', effect: { stats: { gold: 4 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'o_acc_3', kind: 'history', title: 'We Were Just Leaving', emoji: '🚌', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_accident: 1 } },
    text: 'The alien fleet approaches. Your people realise they were technically always just resting here.',
    choices: [
      { label: 'Pack up and move to orbit', effect: { stats: { gold: -10, sci: 8 }, threat: -4 } },
      { label: 'Tell the aliens we were here first', effect: { stats: { mil: 6, joy: 4 } } },
    ],
  },

  {
    id: 'o_poet_1', kind: 'history', title: 'The Rhyming Law', emoji: '✍️', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_poet: 1 } },
    text: 'A criminal has been acquitted because the law against theft did not scan properly.',
    choices: [
      { label: 'Rewrite it in prose', effect: { stats: { gold: 3, joy: -3 } } },
      { label: 'Hire a better poet', effect: { stats: { joy: 4, gold: -2 } } },
    ],
  },
  {
    id: 'o_poet_2', kind: 'history', title: 'The Epic Is Too Long', emoji: '📖', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_poet: 1 } },
    text: 'The founding epic gets a new verse every year. It now takes 11 days to recite. Recitals are mandatory.',
    choices: [
      { label: 'Recite it all', effect: { stats: { faith: 6, gold: -4, joy: 2 } } },
      { label: 'Release an abridged version', effect: { stats: { gold: 4, sci: 2, faith: -2 } } },
    ],
  },
  {
    id: 'o_poet_3', kind: 'history', title: 'Poetry Against the Void', emoji: '🌠', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_poet: 1 } },
    text: 'The aliens judge species by their art. Your entire national identity is poetry. The other nations are panicking.',
    choices: [
      { label: 'Recite the epic to them', effect: { alienRel: 10, stats: { joy: 4 }, chain: { id: 'ch_f_epic', delay: 2 } } },
      { label: 'Write them a devastating sonnet', check: {
        base: 0.45, flags: { scholars: 0.08, propaganda: 0.08, alien_contact: 0.05 },
        success: { text: 'The alien admiral cried for three days. The fleet is drifting.', effect: { threat: -6, alienRel: 4 } },
        fail: { text: 'They did not like the rhyme scheme. They are now angrier.', effect: { threat: 3 } },
      } },
    ],
  },

  {
    id: 'o_kid_1', kind: 'history', title: 'Dessert First', emoji: '🍰', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_child: 1 } },
    text: 'The founding law says dessert comes first. Lawyers are now arguing whether a meal of only dessert is legal.',
    choices: [
      { label: 'It is legal', effect: { stats: { joy: 6, food: -4 } } },
      { label: 'Require one vegetable', effect: { stats: { pop: 3, joy: -2 } } },
    ],
  },
  {
    id: 'o_kid_2', kind: 'history', title: 'The Grown-Ups Are Back', emoji: '🪵', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_child: 1 } },
    text: 'Descendants of the adults who went for firewood have turned up. They have firewood. They are very sorry. And they want to be in charge.',
    choices: [
      { label: 'Let them rule', effect: { stats: { gold: 6, sci: 4, joy: -6 } } },
      { label: 'Send them to their room', effect: { stats: { joy: 5, mil: 2 }, chain: { id: 'ch_f_room', delay: 2 } } },
    ],
  },
  {
    id: 'o_kid_3', kind: 'history', title: 'Space Is for Fun', emoji: '🎈', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_child: 1 } },
    text: 'Your space program was founded "because rockets are cool". It is somehow the most advanced in the world.',
    choices: [
      { label: 'Build a rocket shaped like a dinosaur', effect: { stats: { sci: 8, joy: 6 }, flags: { party: 1 } } },
      { label: 'Invite the aliens to a sleepover', effect: { alienRel: 10, stats: { weird: 4 }, chain: { id: 'ch_f_sleepover', delay: 1 } } },
    ],
  },

  {
    id: 'o_liar_1', kind: 'history', title: 'The Talking Eagle', emoji: '🦅', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_liar: 1 } },
    text: 'Someone pointed out that eagles do not talk. Twelve priests have been sent to find one that does.',
    choices: [
      { label: 'Find any eagle and nod', effect: { stats: { faith: 5, gold: -2 } } },
      { label: 'The eagle was a metaphor', effect: { stats: { sci: 3, faith: -2, joy: 2 } } },
    ],
  },
  {
    id: 'o_liar_2', kind: 'history', title: 'The Myth Grows', emoji: '🐉', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_liar: 1 } },
    text: 'The founding myth now includes a dragon, two floods and the founder personally inventing the colour blue.',
    choices: [
      { label: 'Add more', effect: { stats: { faith: 6, weird: 3 } } },
      { label: 'Sell the myth abroad as a play', effect: { stats: { gold: 8, joy: 2 } } },
    ],
  },
  {
    id: 'o_liar_3', kind: 'history', title: 'Inherited Talent', emoji: '🎭', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_liar: 1 } },
    text: 'Negotiations with the aliens have begun. {leader} has inherited the founder\'s greatest gift.',
    choices: [
      { label: 'Tell them we have a bigger fleet', check: {
        base: 0.4, stats: { mil: 0.002 }, flags: { navy: 0.1, propaganda: 0.08, spies: 0.06 },
        success: { text: 'They believed it. They are recalculating everything.', effect: { threat: -7 } },
        fail: { text: 'They asked to see it. Awkward.', effect: { threat: 3, stats: { joy: -3 } } },
      } },
      { label: 'Tell them a talking eagle promised us this planet', effect: { alienRel: 6, stats: { faith: 5, weird: 4 }, chain: { id: 'ch_f_eagle', delay: 2 } } },
    ],
  },

  {
    id: 'o_chef_1', kind: 'history', title: 'The Eternal Soup', emoji: '🍲', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_chef: 1 } },
    text: 'The founder\'s pot of soup has been simmering for 200 years. Each generation adds something. Nobody knows what is at the bottom.',
    choices: [
      { label: 'Keep adding', effect: { stats: { food: 5, faith: 3 } } },
      { label: 'Taste the bottom', outcomes: [
        { weight: 1, text: 'Incredible. Life-changing. The taster now speaks only in compliments.', effect: { stats: { joy: 6, weird: 2 } } },
        { weight: 1, text: 'A shoe. Possibly the founder\'s.', effect: { stats: { faith: 4, joy: -2 } } },
      ] },
    ],
  },
  {
    id: 'o_chef_2', kind: 'history', title: 'Diplomacy by Stew', emoji: '🥘', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_chef: 1 } },
    text: '{rival} has sent an army. Your generals propose sending a very good stew first, to see what happens.',
    choices: [
      { label: 'Send the stew', effect: { stats: { food: -4 }, rival: { target: 'random', rel: 15 }, chain: { id: 'ch_f_stew', delay: 1 } } },
      { label: 'Poison the stew', effect: { stats: { mil: 5, faith: -3 }, rival: { target: 'random', rel: -15 }, text: 'The founder would be ashamed. The soup bubbles disapprovingly.', chain: { id: 'ch_f_poison', delay: 2 } } },
    ],
  },
  {
    id: 'o_chef_3', kind: 'history', title: 'The Soup Goes to Space', emoji: '🥣', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_chef: 1 } },
    text: 'The Eternal Soup is now 3,000 years old. Scientists say it has become self-aware. It would like a bigger pot.',
    choices: [
      { label: 'Offer the aliens a bowl', effect: { alienRel: 10, flags: { alien_contact: 1 }, stats: { food: -4 }, chain: { id: 'ch_f_soup', delay: 2 } } },
      { label: 'Study the soup', effect: { stats: { sci: 8 }, flags: { genes: 2 } } },
    ],
  },

  {
    id: 'o_wiz_1', kind: 'history', title: 'The Wizard\'s Tower', emoji: '🗼', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_wizard: 1 } },
    text: 'The founder\'s tower contains a stick, a pointy hat and a lot of scribbles. Apprentices are fighting over the hat.',
    choices: [
      { label: 'Found a wizard school', effect: { stats: { sci: 4, weird: 3, gold: -2 } } },
      { label: 'Burn the scribbles', effect: { stats: { faith: 4, weird: -2 } } },
    ],
  },
  {
    id: 'o_wiz_2', kind: 'history', title: 'It Was Science', emoji: '⚗️', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_wizard: 1 } },
    text: 'Scholars decoded the scribbles. The founder\'s "spells" were mostly correct chemistry and one excellent soup recipe.',
    choices: [
      { label: 'Fund the wizard-scientists', effect: { stats: { sci: 8, gold: -3 } } },
      { label: 'Keep calling it magic', effect: { stats: { faith: 5, weird: 4 } } },
    ],
  },
  {
    id: 'o_wiz_3', kind: 'history', title: 'The Last Spell', emoji: '🪄', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_wizard: 1 } },
    text: 'The final page reads: "In case of invaders from the sky". The rest is a very specific wiring diagram.',
    choices: [
      { label: 'Build it', outcomes: [
        { weight: 2, text: 'It is a robot. It is wearing the hat. It is very good.', effect: { flags: { robots: 2 }, stats: { sci: 6 } } },
        { weight: 1, text: 'It makes rabbits. Many rabbits. Food is sorted forever.', effect: { stats: { food: 15, weird: 6 } } },
      ] },
      { label: 'Wear the hat and hope', effect: { stats: { weird: 8, joy: 4 } } },
    ],
  },

  {
    id: 'o_com_1', kind: 'history', title: 'The Minutes', emoji: '📑', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_committee: 1 } },
    text: 'The founding minutes are read aloud each year. This year a clerk found an item that was never voted on: "Snacks?"',
    choices: [
      { label: 'Vote on snacks now', effect: { stats: { joy: 5, food: -2 } } },
      { label: 'Form a subcommittee', effect: { stats: { joy: -2 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'o_com_2', kind: 'history', title: 'Point of Order', emoji: '🪑', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_committee: 1 } },
    text: 'War has been declared on {civ}. Parliament cannot respond until the previous motion, about chairs, is resolved.',
    choices: [
      { label: 'Suspend the rules', effect: { stats: { mil: 6, joy: -2 } } },
      { label: 'Resolve the chair motion first', effect: { stats: { mil: -3, sci: 3 }, flags: { bureaucracy: 1 }, text: 'The chairs are excellent now.' } },
    ],
  },
  {
    id: 'o_com_3', kind: 'history', title: 'A Committee for the Aliens', emoji: '👔', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_committee: 1 } },
    text: 'The alien fleet has been invited to a planning meeting. To your horror, they accepted and brought an agenda.',
    choices: [
      { label: 'Out-meeting them', effect: { flags: { bureaucracy: 2 }, threat: -2, stats: { joy: -3 } } },
      { label: 'Skip to any other business', effect: { alienRel: 6, stats: { joy: 4 }, chain: { id: 'ch_f_aob', delay: 2 } } },
    ],
  },

  {
    id: 'o_probe_1', kind: 'history', title: 'The Metal Man Beeps', emoji: '🤖', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_probe: 1 } },
    text: 'The founder\'s old metal body still beeps every full moon. Priests have written down every beep. There are 3 million of them.',
    choices: [
      { label: 'Treat the beeps as scripture', effect: { stats: { faith: 5, weird: 3 } } },
      { label: 'Treat the beeps as maths', effect: { stats: { sci: 6 } } },
    ],
  },
  {
    id: 'o_probe_2', kind: 'history', title: 'The Spare Parts', emoji: '🔩', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_probe: 1 } },
    text: 'Tinkerers have opened the founder\'s chest panel. Inside: gears, wires and a note in an unknown language with a smiley face.',
    choices: [
      { label: 'Copy the gears', effect: { stats: { sci: 6, gold: 3 }, flags: { robots: 1 } } },
      { label: 'Close it respectfully', effect: { stats: { faith: 5, joy: 2 } } },
    ],
  },
  {
    id: 'o_probe_3', kind: 'history', title: 'The Founder Calls Home', emoji: '📞', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_probe: 1 } },
    text: 'The founder has switched himself on and sent a message to the fleet. It reads: "Mission complete. They are lovely. Do not attack."',
    choices: [
      { label: 'Back him up', effect: { alienRel: 15, flags: { alien_contact: 1 }, chain: { id: 'ch_f_founder', delay: 2 } } },
      { label: 'Reprogram him to fight', effect: { stats: { mil: 10 }, flags: { robots: 2 }, alienRel: -8, chain: { id: 'ch_f_founderfight', delay: 2 } } },
    ],
  },

  {
    id: 'o_who_1', kind: 'history', title: 'Founder Theories', emoji: '🤔', era: [0, 2], once: true, weight: 2,
    req: { flags: { founder_nobody: 1 } },
    text: 'Three schools of thought: the founder was a hero, a woman named Ulla, or a large wet dog. Debates are fierce.',
    choices: [
      { label: 'Officially, it was Ulla', effect: { stats: { joy: 3, faith: 3 } } },
      { label: 'Officially, it was the dog', effect: { stats: { joy: 5, weird: 3 } } },
      { label: 'Officially, we will never know', effect: { stats: { sci: 4 } } },
    ],
  },
  {
    id: 'o_who_2', kind: 'history', title: 'The Excavation', emoji: '⛏️', era: [3, 5], once: true, weight: 2,
    req: { flags: { founder_nobody: 1 } },
    text: 'Archaeologists found the founder\'s grave. It is empty except for a sign that says "back soon".',
    choices: [
      { label: 'Wait', effect: { stats: { faith: 6, weird: 3 } } },
      { label: 'Fill the grave with someone more convenient', effect: { stats: { gold: 4, joy: 2 } } },
    ],
  },
  {
    id: 'o_who_3', kind: 'history', title: 'Back Soon', emoji: '🚪', era: [6, 8], once: true, weight: 2,
    req: { flags: { founder_nobody: 1 } },
    text: 'A figure has stepped off an alien shuttle, looked around, and said "Oh. You kept it all going. Nice."',
    choices: [
      { label: 'Ask who they are', outcomes: [
        { weight: 1, text: 'They are the founder. They are an alien. They are slightly embarrassed.', effect: { flags: { alien_contact: 2 }, alienRel: 8 } },
        { weight: 1, text: 'They are just a tourist. They have no idea what you are talking about.', effect: { stats: { weird: 6, joy: 3 } } },
      ] },
      { label: 'Do not ask. Bow.', effect: { stats: { faith: 10 }, alienRel: 4 } },
    ],
  },
];
