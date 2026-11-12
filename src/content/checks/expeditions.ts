// Invest now, roll later: each decision starts a chain whose event checks the capability it built.
import type { CardDef } from '../../types';

export const expeditionCards: CardDef[] = [
  {
    id: 'c_exp_maps', kind: 'project', era: [1, 3], emoji: '🗺️', title: 'Map the Known World', weight: 0.8,
    text: 'Send surveyors in every direction with string, sticks and strict instructions to come back.',
    choices: [{ label: 'Send the surveyors', effect: { stats: { gold: -4 }, flags: { logistics: 1 }, chain: { id: 'c_exp_maps_ret', delay: 3 } } }],
  },
  {
    id: 'c_exp_maps_ret', kind: 'event', chainOnly: true, once: true, emoji: '🧭', title: 'The Mapmakers Return',
    text: 'The surveyors are back, sunburnt and arguing. They have a map. They insist it is the right way up.',
    choices: [
      { label: 'Study the map', check: {
        base: 0.3, flags: { logistics: 0.1, scholars: 0.1, navy: 0.06, founder_explorer: 0.15 },
        success: { text: 'The map is accurate. One region is just labelled "no". Trade routes open everywhere else.', effect: { stats: { sci: 6, gold: 5 }, flags: { logistics: 1 } } },
        fail: { text: 'The map is mostly of the mapmaker\'s house, in great detail.', effect: { stats: { sci: 2 } } },
      } },
      { label: 'Sell copies to the neighbours', effect: { stats: { gold: 6 }, rival: { target: 'random', rel: 5 } } },
    ],
  },
  {
    id: 'c_exp_north', kind: 'project', era: [3, 5], emoji: '🧊', title: 'The Northern Passage', weight: 0.8,
    text: 'Somewhere past the ice there is a shortcut to everywhere. Probably. Send ships to find it.',
    choices: [{ label: 'Outfit the ships', effect: { stats: { gold: -6 }, flags: { navy: 1 }, chain: { id: 'c_exp_north_ice', delay: 2 } } }],
  },
  {
    id: 'c_exp_north_ice', kind: 'event', chainOnly: true, once: true, emoji: '🐧', title: 'Stuck in the Ice',
    text: 'The northern expedition is frozen in. The captain\'s letters are getting shorter and colder.',
    choices: [
      { label: 'Push through', check: {
        base: 0.25, flags: { navy: 0.12, medicine: 0.1, logistics: 0.08, land_tundra: 0.2 },
        success: { text: 'The ice cracks. The passage is real. Trade routes are halved, and so is the captain\'s beard.', effect: { stats: { gold: 12, sci: 4 }, flags: { navy: 1 } } },
        fail: { text: 'The ships are now part of the ice. Penguins live in them.', effect: { stats: { pop: -2, mil: -2 } } },
      } },
      { label: 'Wait for spring', effect: { stats: { food: -4, sci: 2 }, text: 'They come home in spring, with frostbite and very strong opinions about ice.' } },
    ],
  },
  {
    id: 'c_exp_ruins', kind: 'research', era: [2, 4], emoji: '🏺', title: 'Seek the Lost City', weight: 0.8,
    text: 'An old song describes a city in the jungle with golden roofs. Send scholars who can sing along.',
    choices: [{ label: 'Fund the search', effect: { stats: { gold: -4 }, flags: { scholars: 1 }, chain: { id: 'c_exp_ruins_found', delay: 3 } } }],
  },
  {
    id: 'c_exp_ruins_found', kind: 'event', chainOnly: true, once: true, emoji: '🛕', title: 'The Lost City Is Found',
    text: 'The scholars found it. The roofs are not golden, but the vault doors are, and the walls are covered in writing.',
    choices: [
      { label: 'Read the inscriptions', check: {
        base: 0.25, stats: { sci: 0.003 }, flags: { scholars: 0.12, heads: 0.08, custom_records: 0.1 },
        success: { text: 'They describe the last time the ships came. And, crucially, how it ended.', effect: { stats: { sci: 8 }, threat: -3 } },
        fail: { text: 'The inscriptions are a very long list of complaints about the neighbours.', effect: { stats: { sci: 2, joy: 2 } } },
      } },
      { label: 'Haul out the gold doors', effect: { stats: { gold: 7, faith: -2 }, text: 'The doors are melted down. Behind them was another, plainer door.' } },
    ],
  },
  {
    id: 'c_exp_embassy', kind: 'policy', era: [2, 5], emoji: '🎩', title: 'The Grand Embassy', weight: 0.8,
    text: 'Send our best-dressed people abroad with gifts, speeches and strict orders not to mention the goat.',
    choices: [{ label: 'Send the embassy', effect: { stats: { gold: -6 }, flags: { diplomats: 1 }, chain: { id: 'c_exp_embassy_court', delay: 2 } } }],
  },
  {
    id: 'c_exp_embassy_court', kind: 'rival', chainOnly: true, once: true, emoji: '👑', title: 'At the Court of {rival}',
    text: 'Our embassy has reached the court of {rival}. The queen is listening. The queen is also eating, loudly.',
    choices: [
      { label: 'Propose an alliance', check: {
        base: 0.2, flags: { diplomats: 0.12, custom_polite: 0.15, mascot: 0.08, propaganda: 0.05 }, allies: 0.05,
        success: { text: 'The queen agrees, pending one small dance. The dance goes well.', effect: { rival: { target: 'same', rel: 25, ally: true } } },
        fail: { text: 'Our envoy called the queen "mate". It did not translate well.', effect: { rival: { target: 'same', rel: -10 } } },
      } },
      { label: 'Just enjoy the banquet', effect: { stats: { joy: 3, food: 2 }, rival: { target: 'same', rel: 8 } } },
    ],
  },
  {
    id: 'c_exp_mole', kind: 'policy', era: [3, 6], emoji: '🦫', title: 'Plant a Mole', weight: 0.8,
    text: 'A loyal citizen moves abroad, marries well, gets a job at court and waits for a letter.',
    choices: [{ label: 'Send the mole', effect: { stats: { gold: -5 }, flags: { spies: 1 }, chain: { id: 'c_exp_mole_wakes', delay: 4 } } }],
  },
  {
    id: 'c_exp_mole_wakes', kind: 'rival', chainOnly: true, once: true, emoji: '🕯️', title: 'The Mole Wakes Up',
    text: 'Our mole in {rival} has risen to Deputy Keeper of the War Room. He would like instructions and a raise.',
    choices: [
      { label: 'Steal the war plans', check: {
        base: 0.3, flags: { spies: 0.13, propaganda: 0.05, pigeons: 0.05 },
        success: { text: 'The plans arrive rolled up inside a loaf of bread. Their army is now very predictable.', effect: { stats: { mil: 3 }, rival: { target: 'same', mil: -8 } } },
        fail: { text: 'The mole was caught. He confessed to everything, including several things we did not do.', effect: { rival: { target: 'same', rel: -20, war: true } } },
      } },
      { label: 'Just collect gossip', effect: { stats: { sci: 3, joy: 2 }, text: 'The reports are mostly about who is sleeping in which wing. Very useful, in a way.' } },
      { label: 'Let him retire in peace', effect: { stats: { joy: 2 }, text: 'He opens a bakery. It is excellent.' } },
    ],
  },
  {
    id: 'c_exp_vaccine', kind: 'research', era: [4, 6], emoji: '💉', title: 'The Great Inoculation Tour', weight: 0.8,
    text: 'Doctors travel the land scratching cowpox into everyone. People now moo slightly when nervous.',
    choices: [{ label: 'Start the tour', effect: { stats: { gold: -4, pop: 1 }, flags: { medicine: 1 }, chain: { id: 'c_exp_vax_outbreak', delay: 3 } } }],
  },
  {
    id: 'c_exp_vax_outbreak', kind: 'rival', chainOnly: true, once: true, emoji: '🤧', title: 'Outbreak in {rival}',
    text: 'A plague is sweeping through {rival}. They have heard about our mooing doctors.',
    choices: [
      { label: 'Send our doctors', check: {
        base: 0.25, flags: { medicine: 0.13, logistics: 0.08, diplomats: 0.05 },
        success: { text: 'The plague breaks. {rival} names a hospital after us. And a cow.', effect: { stats: { sci: 3 }, rival: { target: 'same', rel: 25 } } },
        fail: { text: 'Our doctors came home with more than gratitude.', effect: { stats: { pop: -3 }, flags: { plague: 1 } } },
      } },
      { label: 'Close the borders', effect: { stats: { gold: -3, joy: -2 }, rival: { target: 'same', rel: -5 } } },
    ],
  },
  {
    id: 'c_exp_campaign', kind: 'policy', era: [4, 7], emoji: '🗳️', title: 'Hearts and Minds', weight: 0.8,
    text: 'A permanent campaign to make people like the government. It has posters, songs and a mascot made of foam.',
    choices: [{ label: 'Launch the campaign', effect: { stats: { gold: -5, joy: 2 }, flags: { propaganda: 1 }, chain: { id: 'c_exp_campaign_vote', delay: 3 } } }],
  },
  {
    id: 'c_exp_campaign_vote', kind: 'event', chainOnly: true, once: true, emoji: '📊', title: 'The Big Referendum',
    text: 'The people get to vote on whether {leader} is doing a good job. The foam mascot is visibly nervous.',
    choices: [
      { label: 'Campaign hard', check: {
        base: 0.3, stats: { joy: 0.004 }, flags: { propaganda: 0.12, mascot: 0.08, dance: 0.05 },
        success: { text: 'A landslide. The foam mascot is carried through the streets.', effect: { stats: { joy: 8, gold: 4 }, set: { unrest: 0 } } },
        fail: { text: 'The vote is lost by one ballot, cast by the foam mascot.', effect: { stats: { joy: -6 }, flags: { unrest: 1 } } },
      } },
      { label: 'Rig it', effect: { stats: { joy: -2 }, flags: { corruption: 1, unrest: 1 }, text: '104% in favour. Nobody asks questions out loud. Everyone asks them quietly.' } },
    ],
  },
  {
    id: 'c_exp_moon', kind: 'project', era: [6, 8], emoji: '🌕', title: 'Moon Base', weight: 0.8,
    text: 'A permanent base on the moon. Mostly to prove we can. Partly to see who parks on the far side.',
    choices: [{ label: 'Build it', effect: { stats: { gold: -10, sci: 4 }, flags: { engineers: 1 }, chain: { id: 'c_exp_moon_base', delay: 2 } } }],
  },
  {
    id: 'c_exp_moon_base', kind: 'event', chainOnly: true, once: true, emoji: '🛰️', title: 'Moon Base Report',
    text: 'The moon base is up. The crew reports dust, boredom and a faint humming from the far side.',
    choices: [
      { label: 'Dig toward the humming', check: {
        base: 0.25, stats: { sci: 0.002 }, flags: { engineers: 0.1, logistics: 0.08, hole: 0.08 },
        success: { text: 'They found the back entrance of the alien parking lot. With a staff rota pinned to the door.', effect: { stats: { sci: 8 }, flags: { alien_contact: 1 }, threat: -4 } },
        fail: { text: 'They dug into a moon cave. The moon cave dug back.', effect: { stats: { pop: -1, gold: -4 } } },
      } },
      { label: 'Install guns and leave it at that', effect: { stats: { gold: -4, mil: 6 }, threat: -2 } },
    ],
  },
];
