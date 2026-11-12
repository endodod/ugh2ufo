import type { CardDef } from '../../types';

export const customCards: CardDef[] = [
  {
    id: 'o_hat_1', kind: 'event', title: 'Hat Status', emoji: '🎩', era: [0, 1], once: true, weight: 2,
    req: { flags: { custom_hats: 1 } },
    text: 'The tallest hat in the village now belongs to a man who stacked three hats. The chief is threatened.',
    choices: [
      { label: 'Cap hat height by law', effect: { stats: { joy: -2, gold: 3 } } },
      { label: 'Chief wears four hats', effect: { stats: { joy: 3, mil: 2 }, text: 'He can no longer pass through doors. He rules from the yard.' } },
    ],
  },
  {
    id: 'o_hat_2', kind: 'event', title: 'The Hat Standard', emoji: '🪙', era: [2, 4], once: true, weight: 2,
    req: { flags: { custom_hats: 1 } },
    text: 'Coins have failed to catch on. Everyone pays in hats. A cow costs one top hat and two berets.',
    choices: [
      { label: 'Make hats official currency', effect: { stats: { gold: 7, joy: 3, sci: -2 } } },
      { label: 'Found a central hat bank', effect: { stats: { gold: 5 }, flags: { bureaucracy: 1 } } },
      { label: 'Print paper hats', outcomes: [
        { weight: 1, text: 'Inflation. A loaf now costs a hat of hats.', effect: { stats: { gold: -5, joy: -2 } } },
        { weight: 1, text: 'It works. Nobody wonders why.', effect: { stats: { gold: 8 } } },
      ] },
    ],
  },
  {
    id: 'o_hat_3', kind: 'event', title: 'Helmets Are Just Hats', emoji: '⛑️', era: [5, 6], once: true, weight: 2,
    req: { flags: { custom_hats: 1 } },
    text: 'The army refuses to wear standard helmets. Every soldier wears a personal statement piece, reinforced.',
    choices: [
      { label: 'Armour the fancy hats', effect: { stats: { gold: -5, mil: 8, joy: 3 } } },
      { label: 'Enforce identical helmets', effect: { stats: { mil: 5, joy: -5 } } },
    ],
  },
  {
    id: 'o_hat_4', kind: 'event', title: 'The Antenna Hat', emoji: '📡', era: [7, 8], once: true, weight: 2,
    req: { flags: { custom_hats: 1 } },
    text: 'Fashion has peaked: hats with antennas. Millions of people, all tuned to the same frequency, all accidentally pointed at space.',
    choices: [
      { label: 'Broadcast "hello" to the stars', effect: { stats: { weird: 6 }, flags: { alien_contact: 2 }, alienRel: 4, chain: { id: 'ch_f_hats', delay: 1 } } },
      { label: 'Turn the population into a radar', effect: { stats: { sci: 8, mil: 6 }, threat: -3 } },
      { label: 'Tinfoil hats, just in case', effect: { stats: { joy: 4, weird: 4 }, alienRel: -4, threat: -2 } },
    ],
  },

  {
    id: 'o_late_1', kind: 'event', title: 'Fashionably Late to War', emoji: '🐢', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_late: 1 } },
    text: 'Your army arrived at the battle two days late. The enemy had got bored and gone home. Victory, technically.',
    choices: [
      { label: 'Claim it as genius', effect: { stats: { mil: 4, joy: 4 } } },
      { label: 'Try to be on time next time', effect: { stats: { mil: 2, joy: -3, sci: 2 } } },
    ],
  },
  {
    id: 'o_late_2', kind: 'event', title: 'Clocks of Shame', emoji: '🕰️', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_late: 1 } },
    text: 'Foreign traders mock your timing. Your clockmakers have built the most precise clocks in the world. Everyone ignores them.',
    choices: [
      { label: 'Sell the clocks abroad', effect: { stats: { gold: 8, sci: 2 } } },
      { label: 'Mandatory punctuality', outcomes: [
        { weight: 1, text: 'It worked for a whole week. Productivity soared. So did complaints.', effect: { stats: { gold: 6, joy: -6 } } },
        { weight: 1, text: 'The decree arrived late.', effect: { stats: { joy: 2 } } },
      ] },
    ],
  },
  {
    id: 'o_late_3', kind: 'event', title: 'We Missed the Invasion', emoji: '⌛', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_late: 1 } },
    text: 'The aliens scheduled their attack. Your defence forces have already written "be there around then-ish" in their diaries.',
    choices: [
      { label: 'Be late on purpose', effect: { stats: { joy: 5, weird: 5 }, threat: -3, text: 'The aliens hate waiting. Nobody has ever made them wait.' } },
      { label: 'Hire foreign timekeepers', effect: { stats: { gold: -8, mil: 8 } } },
    ],
  },

  {
    id: 'o_rec_1', kind: 'event', title: 'The Record of Records', emoji: '📚', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_records: 1 } },
    text: 'The archive now needs an index. The index needs an index. A scribe has proposed a third index and been hugged.',
    choices: [
      { label: 'Fund the third index', effect: { stats: { sci: 4, gold: -2 }, flags: { bureaucracy: 1 } } },
      { label: 'Burn a few old tablets', effect: { stats: { joy: 3, sci: -2 }, text: 'The scribes held a funeral. It was well documented.' } },
    ],
  },
  {
    id: 'o_rec_2', kind: 'event', title: 'Every Sneeze Is Sacred', emoji: '🤧', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_records: 1 } },
    text: 'The Ministry of Sneezes has collected 80 years of data. A clerk has noticed the sneezes predict plagues.',
    choices: [
      { label: 'Found public health', effect: { stats: { pop: 5, sci: 5 } } },
      { label: 'Expand the ministry', effect: { stats: { joy: -3, gold: -2 }, flags: { bureaucracy: 2 } } },
    ],
  },
  {
    id: 'o_rec_3', kind: 'event', title: 'Form 7B: Invasion', emoji: '📝', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_records: 1 } },
    text: 'The alien fleet has entered orbit without filing a landing permit. The clerks are quietly, terrifyingly calm.',
    choices: [
      { label: 'Reject their application', effect: { flags: { bureaucracy: 2 }, threat: -2 } },
      { label: 'Read their entire history from our files', effect: { stats: { sci: 10 }, text: 'We have records on them. Of course we do. From 2,000 years ago.' } },
    ],
  },

  {
    id: 'o_dance_1', kind: 'event', title: 'Murder Trial by Dance', emoji: '🕺', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_dance: 1 } },
    text: 'The accused murderer is an incredible dancer. The victim\'s family has two left feet. Justice looks unlikely.',
    choices: [
      { label: 'Let the dance decide', effect: { stats: { joy: 5, faith: -2 }, flags: { party: 1 } } },
      { label: 'Introduce written laws', effect: { stats: { sci: 4, joy: -3 } } },
      { label: 'Allow professional stand-in dancers', effect: { stats: { gold: 5, joy: 2 } } },
    ],
  },
  {
    id: 'o_dance_2', kind: 'event', title: 'War, But Dancing', emoji: '🪩', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_dance: 1 }, rival: true },
    text: '{rival} has declared war. Your generals propose settling it the traditional way. The enemy generals have been practising.',
    choices: [
      { label: 'Dance-off', check: {
        base: 0.45, flags: { dance: 0.12, party: 0.05, medicine: 0.05 },
        success: { text: 'Total victory. The enemy general wept and asked for lessons.', effect: { stats: { joy: 8 }, flags: { party: 1 }, rival: { target: 'random', rel: 15 } } },
        fail: { text: 'They had a guy who could spin on his head. You lost a province.', effect: { stats: { gold: -5, pop: -3 }, rival: { target: 'random', rel: 5 } } },
      } },
      { label: 'Fight like normal people', effect: { stats: { mil: 4, joy: -4 }, rival: { target: 'random', rel: -10 } } },
    ],
  },
  {
    id: 'o_dance_3', kind: 'event', title: 'The Final Dance-Off', emoji: '👽', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_dance: 1 } },
    text: 'Legal scholars confirm the alien invasion counts as a dispute. Your constitution is very clear about how disputes are settled.',
    choices: [
      { label: 'Challenge the fleet to a dance-off', effect: { stats: { joy: 8, weird: 6 }, flags: { party: 2 }, alienRel: 4 } },
      { label: 'Train for a year first', effect: { stats: { gold: -6, joy: 4, mil: 4 }, flags: { party: 1 } } },
    ],
  },

  {
    id: 'o_hoard_1', kind: 'event', title: 'The Pile', emoji: '🗑️', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_hoard: 1 } },
    text: 'The town pile of things that might be useful later is now taller than the temple. It has its own weather.',
    choices: [
      { label: 'Sort it', effect: { stats: { gold: 5, joy: -2 } } },
      { label: 'Build houses into it', effect: { stats: { pop: 3, weird: 3 } } },
    ],
  },
  {
    id: 'o_hoard_2', kind: 'event', title: 'It Was Useful After All', emoji: '🔧', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_hoard: 1 } },
    text: 'A broken cart wheel from 400 years ago turned out to be exactly the part a new machine needed. The hoarders are insufferable now.',
    choices: [
      { label: 'Fund the Pile Archaeology Institute', effect: { stats: { sci: 7, gold: -2 } } },
      { label: 'Sell the ancient junk as antiques', effect: { stats: { gold: 9 } } },
    ],
  },
  {
    id: 'o_hoard_3', kind: 'event', title: 'The Pile Reaches Orbit', emoji: '🛰️', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_hoard: 1 } },
    text: 'The pile is now technically a space elevator. Nobody planned this. It just kept going up.',
    choices: [
      { label: 'Use it as a space elevator', effect: { stats: { sci: 10, gold: 5 } } },
      { label: 'Build robots out of the junk', effect: { stats: { gold: -4, mil: 6 }, flags: { robots: 2 } } },
      { label: 'Topple it onto the landing zone', effect: { stats: { joy: -3 }, threat: -6 } },
    ],
  },

  {
    id: 'o_pol_1', kind: 'event', title: 'After You', emoji: '🚪', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_polite: 1 } },
    text: 'Two elders met at a doorway and insisted the other go first. That was six weeks ago. Food is being passed in.',
    choices: [
      { label: 'Widen all doors', effect: { stats: { gold: -3, joy: 4 } } },
      { label: 'Assign a door referee', effect: { stats: { joy: 2 }, flags: { bureaucracy: 1 } } },
    ],
  },
  {
    id: 'o_pol_2', kind: 'event', title: 'An Apologetic War', emoji: '🙏', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_polite: 1 }, rival: true },
    text: '{rival} has invaded. Your soldiers are apologising for being in the way. The enemy feels terrible.',
    choices: [
      { label: 'Apologise harder', effect: { stats: { joy: 3 }, rival: { target: 'random', rel: 15 }, text: 'The invasion was called off. Thank-you notes are being exchanged.' } },
      { label: 'Fight, but politely', effect: { stats: { mil: 5 }, rival: { target: 'random', rel: -5 }, text: 'Every arrow came with a note saying "so sorry".' } },
    ],
  },
  {
    id: 'o_pol_3', kind: 'event', title: 'Terribly Sorry About Your Fleet', emoji: '🫖', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_polite: 1 } },
    text: 'Your foreign ministry has drafted a letter to the aliens. It is 400 pages, mostly apologies, and very moving.',
    choices: [
      { label: 'Send it', effect: { alienRel: 12, stats: { joy: 3 }, chain: { id: 'ch_f_sorry', delay: 3 } } },
      { label: 'Invite them for tea', effect: { alienRel: 8, flags: { alien_contact: 1 }, stats: { food: -4 }, chain: { id: 'ch_f_tea', delay: 2 } } },
    ],
  },

  {
    id: 'o_food_1', kind: 'event', title: 'Is That Edible', emoji: '🪨', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_food: 1 } },
    text: 'A cook has discovered that a certain grey rock, boiled for two days, tastes like a slightly worse potato.',
    choices: [
      { label: 'Rock soup for everyone', effect: { stats: { food: 6, joy: -2 } } },
      { label: 'Keep looking for something better', effect: { stats: { sci: 3, food: 2 } } },
    ],
  },
  {
    id: 'o_food_2', kind: 'event', title: 'Cuisine of Fear', emoji: '🦂', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_food: 1 }, rival: true },
    text: 'The ambassador from {rival} was served the national dish. He is still in the bathroom. He has been there for days.',
    choices: [
      { label: 'Serve it to all enemies', effect: { stats: { mil: 5 }, rival: { target: 'random', rel: -8 } } },
      { label: 'Open a restaurant abroad', effect: { stats: { gold: 7, weird: 3 } } },
    ],
  },
  {
    id: 'o_food_3', kind: 'event', title: 'We Ate the Probe', emoji: '🛸', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_food: 1 } },
    text: 'An alien probe landed. By the time the scientists arrived, a family had roasted it. They say it was "zesty".',
    choices: [
      { label: 'Study the eaters', effect: { stats: { sci: 6 }, flags: { genes: 2 } } },
      { label: 'Ask the aliens for more', effect: { stats: { weird: 8, food: 5 }, alienRel: -6, text: 'The aliens are now deeply afraid of you.' , threat: -3, chain: { id: 'ch_f_moreprobes', delay: 2 } } },
    ],
  },

  {
    id: 'o_shout_1', kind: 'event', title: 'Volume Diplomacy', emoji: '📢', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_shout: 1 } },
    text: 'Your envoy greeted {rival} with a warm, friendly scream. They have mobilised their army.',
    choices: [
      { label: 'Explain it was a hello', effect: { stats: { sci: 2 }, rival: { target: 'random', rel: 6 } } },
      { label: 'Scream louder', effect: { stats: { mil: 5 }, rival: { target: 'random', rel: -8 }, chain: { id: 'ch_f_scream', delay: 2 } } },
    ],
  },
  {
    id: 'o_shout_2', kind: 'event', title: 'The Quiet Riot', emoji: '🤐', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_shout: 1 } },
    text: 'A group of radicals has started whispering. Nobody knows what they are saying. It is deeply unsettling.',
    choices: [
      { label: 'Ban whispering', effect: { stats: { mil: 3, joy: -3 } } },
      { label: 'Make whispering a science', effect: { stats: { sci: 6, weird: 2 } } },
    ],
  },
  {
    id: 'o_shout_3', kind: 'event', title: 'The Loudest Planet', emoji: '🔊', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_shout: 1 } },
    text: 'Physicists confirm a coordinated national shout would be audible in orbit, despite space famously having no air.',
    choices: [
      { label: 'Shout at the fleet', effect: { stats: { joy: 3 } }, check: {
        base: 0.25, stats: { pop: 0.003 }, flags: { propaganda: 0.1, grudge: 0.08, heads: 0.06 },
        success: { text: 'The whole nation shouts at once. Three ships blow a fuse. Nobody can explain it.', effect: { stats: { mil: 10, joy: 2 }, threat: -5 } },
        fail: { text: 'Someone shouted a beat early. The whole thing fell apart into arguing.', effect: { stats: { mil: 3 }, threat: -1 } },
      } },
      { label: 'Shout a nice greeting', effect: { stats: { joy: 5 }, flags: { alien_contact: 1, party: 1 } } },
    ],
  },

  {
    id: 'o_nap_1', kind: 'event', title: 'The Siege of Naptime', emoji: '💤', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_naps: 1 } },
    text: 'Raiders from {rival} attacked at noon. Everyone was asleep. The raiders, unsure, also lay down.',
    choices: [
      { label: 'Wake up and win', effect: { stats: { mil: 4, joy: 2 } } },
      { label: 'Keep napping together', effect: { stats: { joy: 5 }, rival: { target: 'random', rel: 10 } } },
    ],
  },
  {
    id: 'o_nap_2', kind: 'event', title: 'Dream Research', emoji: '🌙', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_naps: 1 } },
    text: 'Scholars now do all their thinking while asleep. Output is down. Quality is way up. Some papers are just drawings of horses.',
    choices: [
      { label: 'Fund the Academy of Napping', effect: { stats: { sci: 7, gold: -3 } } },
      { label: 'Make naps optional', effect: { stats: { gold: 6, joy: -5 } } },
    ],
  },
  {
    id: 'o_nap_3', kind: 'event', title: 'Sleep Through It', emoji: '🛏️', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_naps: 1 } },
    text: 'The invasion is scheduled for 1pm local time. The nation has issued a polite request to reschedule.',
    choices: [
      { label: 'Nap anyway', outcomes: [
        { weight: 1, text: 'The aliens landed, found everyone asleep, and assumed you were all dead. They left flowers.', effect: { threat: -8, stats: { joy: 6 } } },
        { weight: 1, text: 'You woke up conquered. Mildly. They let you finish the nap.', effect: { stats: { joy: -6, pop: -4 } } },
      ] },
      { label: 'Emergency coffee', effect: { stats: { mil: 8, joy: -6 } } },
    ],
  },

  {
    id: 'o_gorb_1', kind: 'event', title: 'Gorb Wants a Word', emoji: '🪪', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_names: 1 } },
    text: 'Gorb has accused Gorb of stealing Gorb\'s goat. The judge, Gorb, has requested a moment.',
    choices: [
      { label: 'Introduce numbers', effect: { stats: { sci: 4 }, flags: { bureaucracy: 1 }, text: 'Gorb 1 to Gorb 4,000 are now legally distinct.' } },
      { label: 'Everyone owns all the goats', effect: { stats: { joy: 4, food: 2, gold: -3 } } },
    ],
  },
  {
    id: 'o_gorb_2', kind: 'event', title: 'Assassination Attempt', emoji: '🗡️', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_names: 1 } },
    text: 'Foreign spies were sent to kill "Gorb, ruler of {civ}". They are now hopelessly stuck in the first village.',
    choices: [
      { label: 'Lean into it', effect: { stats: { mil: 5, weird: 3 } } },
      { label: 'Give the ruler a different name', effect: { stats: { joy: -4, gold: 3 }, text: 'The ruler is now called Gorbert. It is a scandal.' } },
    ],
  },
  {
    id: 'o_gorb_3', kind: 'event', title: 'Take Me to Gorb', emoji: '👽', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_names: 1 } },
    text: 'The aliens have demanded to speak to your leader. Eight billion people stepped forward.',
    choices: [
      { label: 'Let them all talk at once', effect: { stats: { weird: 10, joy: 4 }, alienRel: 4, threat: -2 } },
      { label: 'Name one of the aliens Gorb', effect: { flags: { alien_contact: 1 }, alienRel: 8, text: 'He is delighted. He is one of us now.', chain: { id: 'ch_f_gorb', delay: 2 } } },
    ],
  },

  {
    id: 'o_comp_1', kind: 'event', title: 'Competitive Farming', emoji: '🥕', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_compete: 1 } },
    text: 'Two farmers are in a turnip-size arms race. One turnip now needs its own fence.',
    choices: [
      { label: 'Host a harvest championship', effect: { stats: { food: 6, joy: 2 } } },
      { label: 'Stop them before the turnips get loose', effect: { stats: { joy: -2, mil: 2 } } },
    ],
  },
  {
    id: 'o_comp_2', kind: 'event', title: 'The Funeral Olympics', emoji: '🥇', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_compete: 1 } },
    text: 'Families now compete for the most impressive funeral. The deceased is often still alive at the qualifying round.',
    choices: [
      { label: 'Make it an official sport', effect: { stats: { gold: 5, faith: 4, joy: 2 } } },
      { label: 'Redirect into science prizes', effect: { stats: { sci: 8, joy: -2 } } },
    ],
  },
  {
    id: 'o_comp_3', kind: 'event', title: 'The Space Race (Solo)', emoji: '🏁', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_compete: 1 } },
    text: 'Nobody else is racing to space, so your country split into two teams and is racing itself. Both are winning.',
    choices: [
      { label: 'Fund both teams', effect: { stats: { gold: -10, sci: 14 } } },
      { label: 'Challenge the aliens instead', outcomes: [
        { weight: 1, text: 'They accepted. They lost a footrace. They are sulking in orbit.', effect: { stats: { joy: 10, mil: 4 }, threat: -4 } },
        { weight: 1, text: 'They won. They are being smug about it.', effect: { stats: { joy: -5 }, alienRel: 6 } },
      ] },
    ],
  },

  {
    id: 'o_sec_1', kind: 'event', title: 'Who Is the King', emoji: '🤫', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_secret: 1 } },
    text: 'Nobody knows who the ruler is. Including {leader}, who just found a crown in a drawer and is nervous.',
    choices: [
      { label: 'Put the crown on', effect: { stats: { joy: -2, gold: 4 } } },
      { label: 'Put the crown back', effect: { stats: { mil: 3, weird: 3 } } },
    ],
  },
  {
    id: 'o_sec_2', kind: 'event', title: 'A Secret Society of Everyone', emoji: '🗝️', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_secret: 1 } },
    text: 'Every citizen is in a secret society. Every society is secretly the same society. Nobody has noticed.',
    choices: [
      { label: 'Use it as a spy network', effect: { stats: { mil: 7 } } },
      { label: 'Hold a secret vote', effect: { stats: { joy: 5 }, flags: { cult: 1 } } },
    ],
  },
  {
    id: 'o_sec_3', kind: 'event', title: 'Nothing to See Here', emoji: '🫥', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_secret: 1 } },
    text: 'The alien scanners return no useful data on {civ}. Not because of technology. Because everyone lies on surveys.',
    choices: [
      { label: 'Keep lying', effect: { stats: { weird: 6 }, threat: -6 } },
      { label: 'Leak them fake battle plans', effect: { stats: { mil: 10, sci: 3 } } },
    ],
  },

  {
    id: 'o_big_1', kind: 'event', title: 'The Giant Door', emoji: '🚪', era: [0, 2], once: true, weight: 2,
    req: { flags: { custom_big: 1 } },
    text: 'The new hall has a door forty metres tall. It takes 30 people to open it. It is also, technically, the only door.',
    choices: [
      { label: 'Add a normal door in the giant door', effect: { stats: { joy: 3, gold: -2 } } },
      { label: 'Make opening it a holy rite', effect: { stats: { faith: 5, mil: 2 } } },
    ],
  },
  {
    id: 'o_big_2', kind: 'event', title: 'The Big Statue', emoji: '🗿', era: [3, 5], once: true, weight: 2,
    req: { flags: { custom_big: 1 } },
    text: 'The new statue of {leader} is so big ships navigate by it. Its nose has a small village in it.',
    choices: [
      { label: 'Make it bigger', effect: { stats: { gold: -6, faith: 5, joy: 4 } } },
      { label: 'Charge ships a fee', effect: { stats: { gold: 7 } } },
    ],
  },
  {
    id: 'o_big_3', kind: 'event', title: 'Huge Robot', emoji: '🦾', era: [6, 8], once: true, weight: 2,
    req: { flags: { custom_big: 1 } },
    text: 'Engineers were asked for a defence robot. In keeping with tradition, they built one the size of a mountain.',
    choices: [
      { label: 'Switch it on', effect: { stats: { gold: -10, mil: 12 }, flags: { robots: 2 } } },
      { label: 'Leave it standing there, menacingly', effect: { stats: { mil: 5, weird: 4 }, threat: -3 } },
    ],
  },
];
