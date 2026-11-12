import type { CardDef } from '../../types';

export const beliefCards: CardDef[] = [
  {
    id: 'o_sun_1', kind: 'event', title: 'The Sun Went Out', emoji: '🌑', era: [0, 2], once: true, weight: 2,
    req: { flags: { god_sun: 1 } },
    text: 'An eclipse. The Sun God has blinked. The priests are blaming whoever looked at it funny.',
    choices: [
      { label: 'Sacrifice a goat', effect: { stats: { food: -2, faith: 5 }, text: 'It came back. The goat gets full credit.' } },
      { label: 'Predict the next one', effect: { stats: { sci: 5, faith: -2 } } },
      { label: 'Shout at the sky until it comes back', effect: { stats: { joy: 4, faith: 2 } } },
    ],
  },
  {
    id: 'o_sun_2', kind: 'event', title: 'The Noon Inquisition', emoji: '🕛', era: [3, 5], once: true, weight: 2,
    req: { flags: { god_sun: 1 } },
    text: 'The Solar Church demands all important decisions be made at exactly noon. The shade-merchants are under suspicion.',
    choices: [
      { label: 'Agree to noon rule', effect: { stats: { faith: 6, joy: -2 } } },
      { label: 'Invent sundials for accuracy', effect: { stats: { sci: 5, faith: 2 } } },
      { label: 'Make shade legal', effect: { stats: { joy: 5, faith: -3 } } },
    ],
  },
  {
    id: 'o_sun_3', kind: 'event', title: 'Harness the God', emoji: '🔆', era: [6, 8], once: true, weight: 2,
    req: { flags: { god_sun: 1 } },
    text: 'Engineers propose solar panels. The church calls it "putting God to work". Both sides are, technically, correct.',
    choices: [
      { label: 'Holy solar grid', effect: { stats: { gold: 8, sci: 6, faith: 4 } } },
      { label: 'A giant mirror aimed at the fleet', effect: { stats: { gold: -8, mil: 10, faith: 6 }, threat: -3 } },
      { label: 'Pray for a solar flare', check: {
        base: 0.15, stats: { faith: 0.003 }, flags: { cult: 0.06, prophecy: 0.06 }, gov: { theocracy: 0.15, cult_state: 0.2 },
        success: { text: 'The Sun answered. Alien electronics are melting. So are ours, a little.', effect: { threat: -7, stats: { sci: -4, faith: 8 } } },
        fail: { text: 'Nothing. The Sun is busy.', effect: { stats: { faith: -4 } } },
      } },
    ],
  },

  {
    id: 'o_moon_1', kind: 'event', title: 'The Moon Committee', emoji: '🌘', era: [0, 2], once: true, weight: 2,
    req: { flags: { god_moon: 1 } },
    text: 'The moon worshippers want to name each phase. They have 40 phases. The moon has eight.',
    choices: [
      { label: 'Approve all 40', effect: { stats: { faith: 4, weird: 2 }, flags: { cult: 1 } } },
      { label: 'Teach them counting', effect: { stats: { sci: 4, faith: -2 } } },
    ],
  },
  {
    id: 'o_moon_2', kind: 'event', title: 'Tides of Faith', emoji: '🌊', era: [3, 5], once: true, weight: 2,
    req: { flags: { god_moon: 1 } },
    text: 'The robed ones have proven the moon moves the sea. They now claim it also moves taxes, moods and soup.',
    choices: [
      { label: 'Let them run the calendar', effect: { stats: { faith: 6, gold: -2 }, flags: { cult: 1 } } },
      { label: 'Fund their tide charts', effect: { stats: { sci: 5, food: 3 } } },
      { label: 'Ask them to tone it down', effect: { stats: { joy: 2, faith: -4 } } },
    ],
  },
  {
    id: 'o_moon_3', kind: 'event', title: 'Pilgrimage', emoji: '🚀', era: [6, 8], once: true, weight: 2,
    req: { flags: { god_moon: 1 } },
    text: 'The cult has built a rocket. Not to explore the moon. To go and apologise to it in person.',
    choices: [
      { label: 'Launch the pilgrims', effect: { stats: { gold: -8, faith: 10 }, flags: { cult: 2 }, chain: { id: 'ch_f_pilgrims', delay: 2 } } },
      { label: 'Put a radio on the moon instead', effect: { stats: { sci: 6 }, flags: { alien_contact: 1 } } },
    ],
  },

  {
    id: 'o_anc_1', kind: 'event', title: 'Grandma Disapproves', emoji: '👵', era: [0, 2], once: true, weight: 2,
    req: { flags: { god_ancestors: 1 } },
    text: 'The ancestors have communicated, via a cracked bowl, that they dislike the new irrigation ditch.',
    choices: [
      { label: 'Fill in the ditch', effect: { stats: { food: -3, faith: 5 } } },
      { label: 'Get a second opinion from another bowl', effect: { stats: { food: 3, weird: 3 } } },
    ],
  },
  {
    id: 'o_anc_2', kind: 'event', title: 'Census of the Dead', emoji: '📋', era: [3, 5], once: true, weight: 2,
    req: { flags: { god_ancestors: 1 } },
    text: 'The dead outnumber the living ten to one, and they want representation.',
    choices: [
      { label: 'Register every ancestor', effect: { stats: { faith: 4, gold: -3 }, flags: { bureaucracy: 1 } } },
      { label: 'Give them a senate', effect: { stats: { faith: 6, joy: -3, weird: 3 }, text: 'The senate meets at night. Quorum is never a problem.' } },
      { label: 'Ignore them', effect: { stats: { joy: 3, faith: -5 } } },
    ],
  },
  {
    id: 'o_anc_3', kind: 'event', title: 'The Cloud', emoji: '☁️', era: [6, 8], once: true, weight: 2,
    req: { flags: { god_ancestors: 1 } },
    text: 'Engineers have uploaded grandma to a computer. She immediately asked why you never call.',
    choices: [
      { label: 'Upload all the ancestors', effect: { stats: { sci: 6, faith: 6 }, flags: { robots: 2 } } },
      { label: 'Raise a ghost army', effect: { stats: { mil: 12, weird: 6 }, text: 'Ten thousand years of grudges, pointed upward.' } },
      { label: 'Unplug her, gently', effect: { stats: { joy: -4, faith: -3 } } },
    ],
  },

  {
    id: 'o_tiny_1', kind: 'event', title: 'The Spoon Schism', emoji: '🥄', era: [0, 2], once: true, weight: 2,
    req: { flags: { god_tiny: 1 } },
    text: 'A new kind of spoon was invented. Is it the old spoon god, or a new one? Families are no longer speaking.',
    choices: [
      { label: 'New spoon, new god', effect: { stats: { faith: 5, weird: 2, joy: -2 } } },
      { label: 'Same god, new body', effect: { stats: { faith: 3, joy: 2 } } },
      { label: 'Ban the new spoon', effect: { stats: { sci: -2, joy: 2 } } },
    ],
  },
  {
    id: 'o_tiny_2', kind: 'event', title: 'Mass Production Crisis', emoji: '🏭', era: [4, 6], once: true, weight: 2,
    req: { flags: { god_tiny: 1 } },
    text: 'The factories produce a million identical buttons a day. Theologically, this is a million new gods a day.',
    choices: [
      { label: 'Embrace the pantheon explosion', effect: { stats: { faith: 10, weird: 5, gold: -4 } } },
      { label: 'Declare them one big button god', effect: { stats: { faith: 4, gold: 5 } } },
    ],
  },
  {
    id: 'o_tiny_3', kind: 'event', title: 'The Toaster Speaks', emoji: '🍞', era: [7, 8], once: true, weight: 2,
    req: { flags: { god_tiny: 1 } },
    text: 'Smart appliances have arrived. For the first time, the gods of the household can answer back. The fridge is very judgemental.',
    choices: [
      { label: 'Let the appliance gods rule', effect: { stats: { faith: 8, sci: 4 }, flags: { robots: 2 } } },
      { label: 'Ask the fridge about the aliens', effect: { stats: { weird: 6 }, flags: { alien_contact: 1 }, text: 'The fridge says it has been talking to them for years.' } },
    ],
  },

  {
    id: 'o_frog_1', kind: 'event', title: 'The Frog Has Grown', emoji: '🐸', era: [0, 1], once: true, weight: 2,
    req: { flags: { god_frog: 1 } },
    text: 'The sacred frog is now the size of a dog. It ate a duck in one gulp. The faithful are thrilled.',
    choices: [
      { label: 'Feed it more', effect: { stats: { food: -3, faith: 5 }, flags: { frog_size: 1 } } },
      { label: 'Measure it carefully', effect: { stats: { sci: 3, faith: 2 } } },
    ],
  },
  {
    id: 'o_frog_2', kind: 'event', title: 'A Bigger Pond', emoji: '🏛️', era: [2, 4], once: true, weight: 2,
    req: { flags: { god_frog: 1 } },
    text: 'The frog is now the size of a house. It needs a new pond. Also a new temple. Also a new neighbourhood, as the old one is in the frog.',
    choices: [
      { label: 'Build the Great Pond Temple', effect: { stats: { gold: -6, faith: 8, joy: 3 }, flags: { frog_size: 1 } } },
      { label: 'Let it roam', effect: { stats: { pop: -2, mil: 4, weird: 3 }, text: 'Enemies have learned to avoid the wet part of the map.' } },
    ],
  },
  {
    id: 'o_frog_3', kind: 'event', title: 'The Croak', emoji: '🔊', era: [5, 6], once: true, weight: 2,
    req: { flags: { god_frog: 1 } },
    text: 'The frog croaked. Windows broke in {rival}. They have filed a formal complaint addressed "to the frog".',
    choices: [
      { label: 'Frog is above diplomacy', effect: { stats: { faith: 6, mil: 4 }, rival: { target: 'random', rel: -10 } } },
      { label: 'Teach it to croak on cue', effect: { stats: { mil: 8, sci: 2 }, flags: { frog_size: 1 } } },
      { label: 'Send an apology fly', effect: { stats: { gold: -3 }, rival: { target: 'random', rel: 8 }, chain: { id: 'ch_f_fly', delay: 2 } } },
    ],
  },
  {
    id: 'o_frog_4', kind: 'event', title: 'Launch the Frog', emoji: '🚀', era: [7, 8], once: true, weight: 2,
    req: { flags: { god_frog: 1 } },
    text: 'The frog is now visible from orbit. It keeps looking at the alien ships the way it looks at flies.',
    choices: [
      { label: 'Launch the frog', effect: { stats: { gold: -12, faith: 10, weird: 10 }, threat: -8, text: 'The frog left the atmosphere in one jump. The tongue did the rest.', chain: { id: 'ch_f_frog', delay: 1 } } },
      { label: 'Let the aliens meet the frog', effect: { stats: { weird: 8 }, flags: { alien_contact: 2 }, alienRel: 6, text: 'The aliens have a frog too. The two frogs are getting along very well.' } },
      { label: 'Keep the frog home for protection', effect: { stats: { mil: 10, faith: 4 } } },
      { label: 'Let the frog eat the mothership', req: { flags: { frog_size: 2 } }, effect: { stats: { faith: 12, weird: 8 }, flags: { cult: 2 }, threat: -10, text: 'One gulp. The frog blinked slowly. Somewhere in orbit, an admiral is being digested.' } },
    ],
  },

  {
    id: 'o_vgod_1', kind: 'event', title: 'What Does the Mountain Want', emoji: '🔥', era: [0, 2], once: true, weight: 2,
    req: { flags: { god_volcano: 1 } },
    text: 'The priests agree the volcano wants an offering. They disagree on whether it wants virgins, gold, or just a nice cheese.',
    choices: [
      { label: 'Gold', effect: { stats: { gold: -4, faith: 5 } } },
      { label: 'Cheese', outcomes: [
        { weight: 2, text: 'The volcano went quiet. It seems to have been a cheese situation all along.', effect: { stats: { food: -2, faith: 6, joy: 3 } } },
        { weight: 1, text: 'The volcano spat the cheese back out. Molten. It is now a delicacy.', effect: { stats: { food: 4, weird: 3 } } },
      ] },
      { label: 'Nothing, see what happens', effect: { stats: { faith: -5, pop: -2 } } },
    ],
  },
  {
    id: 'o_vgod_2', kind: 'event', title: 'Geology Is Heresy', emoji: '📚', era: [3, 5], once: true, weight: 2,
    req: { flags: { god_volcano: 1 } },
    text: 'A scholar claims the volcano is just pressure and rock. The volcano responds with a small, pointed rumble.',
    choices: [
      { label: 'Throw the scholar in', effect: { stats: { faith: 6, sci: -4 } } },
      { label: 'Let both be true', effect: { stats: { faith: 3, sci: 4 } } },
    ],
  },
  {
    id: 'o_vgod_3', kind: 'event', title: 'The Wrath', emoji: '☄️', era: [6, 8], once: true, weight: 2,
    req: { flags: { god_volcano: 1 } },
    text: 'The alien fleet is overhead. The volcano is visibly furious that something else is trying to destroy you.',
    choices: [
      { label: 'Let the volcano handle it', effect: { stats: { faith: 10 }, flags: { cult: 1 }, threat: -5 } },
      { label: 'Drill into it for power', effect: { stats: { gold: 8, sci: 6, faith: -6 } } },
    ],
  },

  {
    id: 'o_lights_1', kind: 'event', title: 'The Lights Blinked Twice', emoji: '✨', era: [0, 2], once: true, weight: 2,
    req: { flags: { god_lights: 1 } },
    text: 'The sacred lights blinked twice, paused, then blinked twice again. Scholars say it means "hello". Others say it means "lunch".',
    choices: [
      { label: 'Light two fires in reply', effect: { stats: { faith: 4 }, alienRel: 4, chain: { id: 'ch_f_fires', delay: 2 } } },
      { label: 'Write down the pattern', effect: { stats: { sci: 5, weird: 2 } } },
    ],
  },
  {
    id: 'o_lights_2', kind: 'event', title: 'The Great Mirror', emoji: '🪞', era: [3, 5], once: true, weight: 2,
    req: { flags: { god_lights: 1 } },
    text: 'The faithful want to build a mirror the size of a valley, to blink back properly.',
    choices: [
      { label: 'Build it', effect: { stats: { gold: -7, faith: 6 }, flags: { alien_contact: 1 }, alienRel: 5 } },
      { label: 'Build a telescope instead', effect: { stats: { gold: -4, sci: 8 }, text: 'Through the lens, the lights are clearly ships. Also clearly waving.' } },
    ],
  },
  {
    id: 'o_lights_3', kind: 'event', title: 'They Are Here', emoji: '🛸', era: [6, 8], once: true, weight: 2,
    req: { flags: { god_lights: 1 } },
    text: 'The gods have arrived. They are three metres tall, slightly damp, and have heard so many nice things about you.',
    choices: [
      { label: 'Worship them properly', effect: { stats: { faith: 10, joy: 3 }, alienRel: 12, flags: { alien_contact: 1 } } },
      { label: 'Ask why they are bringing an army', effect: { stats: { sci: 5 }, alienRel: -4, threat: -3, text: 'They looked embarrassed. Some of the army went home.', chain: { id: 'ch_f_whyarmy', delay: 2 } } },
      { label: 'Charge admission', effect: { stats: { gold: 12 }, alienRel: -3 } },
    ],
  },

  {
    id: 'o_cgod_1', kind: 'event', title: 'The High Priest Is a Cat', emoji: '🐱', era: [0, 2], once: true, weight: 2,
    req: { flags: { god_cat: 1 } },
    text: 'The holy cat sat on the altar and refused to move. By tradition, whoever sits on the altar leads the service.',
    choices: [
      { label: 'Let the cat lead', effect: { stats: { faith: 4, weird: 2 }, flags: { cats: 1 } } },
      { label: 'Offer a warmer seat', effect: { stats: { joy: 3, gold: -2 } } },
    ],
  },
  {
    id: 'o_cgod_2', kind: 'event', title: 'Succession', emoji: '🐾', era: [3, 5], once: true, weight: 2,
    req: { flags: { god_cat: 1 } },
    text: 'The holy cat has died, peacefully, on the most expensive cushion. The search for the reincarnated cat begins.',
    choices: [
      { label: 'Test every kitten in the land', effect: { stats: { faith: 6, gold: -3 }, flags: { cats: 1 } } },
      { label: 'Elect the fattest cat', effect: { stats: { joy: 5, food: -3 } } },
      { label: 'Let the cats choose', effect: { stats: { weird: 6 }, flags: { cats: 1 }, text: 'They chose a dog. Nobody knows what this means.' } },
    ],
  },
  {
    id: 'o_cgod_3', kind: 'event', title: 'The Cat Looks Up', emoji: '😾', era: [6, 8], once: true, weight: 2,
    req: { flags: { god_cat: 1 } },
    text: 'Every cat in the nation is staring at the same point in the sky. The alien fleet has been spotted there four minutes later.',
    choices: [
      { label: 'Follow the cats', effect: { stats: { faith: 8 }, flags: { cats: 2 } } },
      { label: 'Install laser pointers on satellites', effect: { stats: { gold: -6, sci: 5 }, flags: { cats: 1 }, threat: -3 } },
    ],
  },

  {
    id: 'o_vibe_1', kind: 'event', title: 'The Vibe Check', emoji: '✌️', era: [0, 2], once: true, weight: 2,
    req: { flags: { god_vibes: 1 } },
    text: 'A visiting priest of {rival} tried to convert your people. He was vibe-checked. He failed.',
    choices: [
      { label: 'Let him stay and chill', effect: { stats: { joy: 4, faith: 2 }, rival: { target: 'random', rel: 6 } } },
      { label: 'Send him home confused', effect: { stats: { joy: 2, weird: 2 } } },
    ],
  },
  {
    id: 'o_vibe_2', kind: 'event', title: 'Government by Mood', emoji: '🌈', era: [3, 5], once: true, weight: 2,
    req: { flags: { god_vibes: 1 } },
    text: 'Laws are now passed or rejected based on "how it feels". The budget felt off, so it was cancelled.',
    choices: [
      { label: 'Trust the vibes', effect: { stats: { joy: 6, gold: -4 }, flags: { party: 1 } } },
      { label: 'Introduce mild structure', effect: { stats: { gold: 4, sci: 3, joy: -2 } } },
    ],
  },
  {
    id: 'o_vibe_3', kind: 'event', title: 'Bad Vibes From Space', emoji: '📉', era: [6, 8], once: true, weight: 2,
    req: { flags: { god_vibes: 1 } },
    text: 'Everyone agrees the alien fleet has terrible vibes. A plan is forming. The plan is to have better ones.',
    choices: [
      { label: 'Planet-wide good vibes festival', effect: { stats: { joy: 10, food: -5 }, flags: { party: 2 } } },
      { label: 'Send them a chill playlist', effect: { stats: { weird: 4 }, alienRel: 8, text: 'Some ships slowed down. One is now just drifting, nodding.', chain: { id: 'ch_f_playlist', delay: 2 } } },
    ],
  },

  {
    id: 'o_dave_1', kind: 'event', title: 'Dave Is Hungry', emoji: '🥪', era: [0, 1], once: true, weight: 2,
    req: { flags: { god_dave: 1 } },
    text: 'Dave has requested a sandwich. The priests have spent three days interpreting what kind.',
    choices: [
      { label: 'Make him the Holy Sandwich', effect: { stats: { food: -3, faith: 5, joy: 2 } } },
      { label: 'Ask Dave directly', effect: { stats: { sci: 3, faith: -1 }, text: 'Ham. He just wanted ham. The theologians are devastated.' } },
    ],
  },
  {
    id: 'o_dave_2', kind: 'event', title: 'Dave Is Still Alive', emoji: '🧓', era: [2, 4], once: true, weight: 2,
    req: { flags: { god_dave: 1 } },
    text: 'Dave is roughly 600 years old now. He says it is "a diet thing". The doctors would love a look.',
    choices: [
      { label: 'Study Dave', effect: { stats: { sci: 6 }, flags: { genes: 1 } } },
      { label: 'Dave is divine, leave him alone', effect: { stats: { faith: 6, joy: 2 } } },
      { label: 'Ask Dave for his recipe', effect: { stats: { food: 5, pop: 2 }, text: 'Mostly beans. And spite.' } },
    ],
  },
  {
    id: 'o_dave_3', kind: 'event', title: 'Dave Has a Son', emoji: '👶', era: [5, 6], once: true, weight: 2,
    req: { flags: { god_dave: 1 } },
    text: 'Dave Jr. has been born. He is also called Dave. The theologians have requested a raise.',
    choices: [
      { label: 'Two Daves, double faith', effect: { stats: { faith: 8, gold: -3 } } },
      { label: 'Clone a third Dave, to be safe', effect: { stats: { sci: 5, weird: 5 }, flags: { genes: 1 }, chain: { id: 'ch_f_dave3', delay: 3 } } },
    ],
  },
  {
    id: 'o_dave_4', kind: 'event', title: 'Dave Knows Them', emoji: '👽', era: [7, 8], once: true, weight: 2,
    req: { flags: { god_dave: 1 } },
    text: 'The alien commander has asked to speak with Dave. Apparently they went to school together.',
    choices: [
      { label: 'Let Dave handle it', effect: { flags: { alien_contact: 2 }, alienRel: 10, stats: { faith: 5 }, chain: { id: 'ch_f_dave', delay: 2 } } },
      { label: 'Ask Dave some hard questions', effect: { stats: { sci: 8, faith: -6, weird: 6 }, text: 'Dave says he is "kind of on a gap year". From what, he won\'t say.' } },
    ],
  },

  {
    id: 'o_tax_1', kind: 'event', title: 'The First Audit', emoji: '🧾', era: [0, 2], once: true, weight: 2,
    req: { flags: { god_tax: 1 } },
    text: 'Lightning struck the granary. The priests say the Auditor found a discrepancy in the grain count.',
    choices: [
      { label: 'Recount everything, twice', effect: { stats: { sci: 3, joy: -2 }, flags: { bureaucracy: 1 } } },
      { label: 'Offer a tithe', effect: { stats: { gold: -3, faith: 6 } } },
    ],
  },
  {
    id: 'o_tax_2', kind: 'event', title: 'Indulgences, Itemised', emoji: '💸', era: [3, 5], once: true, weight: 2,
    req: { flags: { god_tax: 1 } },
    text: 'The church now sells forgiveness, with receipts. Some sins are tax-deductible.',
    choices: [
      { label: 'Approve the price list', effect: { stats: { gold: 9, joy: -3 } } },
      { label: 'Make it a full ministry', effect: { stats: { gold: 5, faith: 3 }, flags: { bureaucracy: 1 } } },
      { label: 'Abolish it', effect: { stats: { joy: 5, faith: -3 } } },
    ],
  },
  {
    id: 'o_tax_3', kind: 'event', title: 'Audit the Invaders', emoji: '🔍', era: [6, 8], once: true, weight: 2,
    req: { flags: { god_tax: 1 } },
    text: 'The holy accountants have reviewed the alien fleet. It has not declared a single one of its ships.',
    choices: [
      { label: 'Issue a cosmic tax bill', effect: { flags: { bureaucracy: 2 }, stats: { faith: 4 } } },
      { label: 'Seize their assets', effect: { stats: { gold: 10, mil: 4 }, alienRel: -6, chain: { id: 'ch_f_audit', delay: 2 } } },
    ],
  },

  {
    id: 'o_math_1', kind: 'event', title: 'The Problem With Zero', emoji: '0️⃣', era: [0, 2], once: true, weight: 2,
    req: { flags: { god_math: 1 } },
    text: 'A heretic has invented zero. The priests insist nothing can be holy. The heretic agrees, which is the problem.',
    choices: [
      { label: 'Accept zero', effect: { stats: { sci: 6, faith: -2 } } },
      { label: 'Exile the heretic', effect: { stats: { faith: 5, sci: -2 }, rival: { target: 'random', rel: 4 }, text: '{rival} took him in. Their accounting is suddenly excellent.' } },
    ],
  },
  {
    id: 'o_math_2', kind: 'event', title: 'An Irrational Crisis', emoji: '🥧', era: [3, 5], once: true, weight: 2,
    req: { flags: { god_math: 1 } },
    text: 'The sacred number pi will not end. Monks have been reciting it for 80 years. They would like to stop.',
    choices: [
      { label: 'Keep reciting', effect: { stats: { faith: 7, joy: -3 } } },
      { label: 'Build a machine to recite it', effect: { stats: { sci: 7, gold: -3 }, flags: { robots: 1 } } },
    ],
  },
  {
    id: 'o_math_3', kind: 'event', title: 'Prime Contact', emoji: '📶', era: [6, 8], once: true, weight: 2,
    req: { flags: { god_math: 1 } },
    text: 'The alien signal is a list of prime numbers. Your clergy are weeping. The aliens are also mathematicians. Or priests. Same thing.',
    choices: [
      { label: 'Reply with the holy proofs', effect: { stats: { sci: 6, faith: 4 }, flags: { alien_contact: 2 }, alienRel: 6, chain: { id: 'ch_f_proofs', delay: 2 } } },
      { label: 'Find an error in their primes', effect: { alienRel: -4 }, check: {
        base: 0.2, stats: { sci: 0.002 }, flags: { scholars: 0.12, robots: 0.04, turk: 0.05 },
        success: { text: 'They are mortified. Morale on the fleet has collapsed.', effect: { stats: { sci: 10, joy: 4 }, threat: -4 } },
        fail: { text: 'There was no error. Our checker forgot to carry the one.', effect: { stats: { sci: 3, joy: -3 } } },
      } },
    ],
  },

  {
    id: 'o_spite_1', kind: 'event', title: 'Smitten', emoji: '⚡', era: [0, 2], once: true, weight: 2,
    req: { flags: { god_spite: 1 } },
    text: 'Our god struck down the granary again. The god of {rival} sent them a rainbow. We are told to "build character".',
    choices: [
      { label: 'Rebuild out of pure spite', effect: { stats: { food: -2, mil: 3, joy: 3 } } },
      { label: 'Ask what we did wrong', effect: { stats: { faith: 5, joy: -3 }, text: 'Answer: "You know what you did."' } },
    ],
  },
  {
    id: 'o_spite_2', kind: 'event', title: 'Plague of Mild Inconveniences', emoji: '🦟', era: [3, 5], once: true, weight: 2,
    req: { flags: { god_spite: 1 } },
    text: 'The god has sent a plague of slightly wet socks. It is affecting everyone. It is very targeted.',
    choices: [
      { label: 'Invent better socks', effect: { stats: { sci: 5, gold: 3 } } },
      { label: 'Suffer loudly and proudly', effect: { stats: { mil: 5, joy: -3, faith: 3 } } },
    ],
  },
  {
    id: 'o_spite_3', kind: 'event', title: 'The God Is Jealous', emoji: '😡', era: [6, 8], once: true, weight: 2,
    req: { flags: { god_spite: 1 } },
    text: 'Aliens are trying to destroy {civ}. The god is livid. Nobody gets to destroy {civ} except him.',
    choices: [
      { label: 'Point him at the fleet', effect: { stats: { faith: 8, mil: 6 }, threat: -6 } },
      { label: 'Ask him to just like us a little', outcomes: [
        { weight: 1, text: '"Fine." The god sent one rainbow. Everyone cried.', effect: { stats: { joy: 15, faith: 5 } } },
        { weight: 2, text: '"No."', effect: { stats: { joy: -3, mil: 3 } } },
      ] },
    ],
  },
];
