import type { CardDef } from '../../types';

const cats: CardDef[] = [
  {
    id: 'cat_1', kind: 'event', era: [0, 2], emoji: '🐈', title: 'A Small Visitor',
    text: 'A wild cat has started sleeping by the fire. It refuses to leave and demands fish it has done nothing to earn.',
    choices: [
      { label: 'Feed it', effect: { stats: { food: -2, joy: 4 }, flags: { cats: 1 } } },
      { label: 'Shoo it away', effect: { stats: { joy: -2 }, text: 'The cat leaves. It will remember this. Cats always remember this.' } },
    ],
  },
  {
    id: 'cat_2', kind: 'event', era: [1, 3], emoji: '🐱', req: { flags: { cats: 1 } }, title: 'Cats Everywhere',
    text: 'There are now many cats. They keep the rats out of the granary. They also keep the people out of the granary.',
    choices: [
      { label: 'Declare cats sacred', effect: { stats: { faith: 5, food: 3 }, flags: { cats: 1 } } },
      { label: 'Put them to work', effect: { stats: { food: 6 }, flags: { cats: 1 }, text: 'The cats agree to work. Nobody has ever seen them working.' } },
      { label: 'This is too many cats', effect: { stats: { joy: -4 }, flags: { cats: -1 } } },
    ],
  },
  {
    id: 'cat_3', kind: 'event', era: [2, 5], emoji: '🐆', req: { flags: { cats: 2 } }, title: 'The Cat Rider',
    text: 'A young stable hand has managed to ride a very large cat. Briefly. Then the cat sat down. Still, it is a start.',
    choices: [
      { label: 'Breed bigger cats', effect: { stats: { food: -5, mil: 4, weird: 3 }, flags: { cats: 1 } } },
      { label: 'Train cat cavalry', effect: { stats: { gold: -2 } }, check: {
        base: 0.3, stats: { mil: 0.005 }, flags: { cats: 0.12, god_cat: 0.15, custom_naps: -0.1, logistics: 0.06 },
        success: { text: 'The cat cavalry works! Mostly at dawn and dusk, but it works.', effect: { stats: { mil: 10, weird: 3 }, flags: { cats: 1 } } },
        fail: { text: 'The cats napped through the whole training. The horses are offended.', effect: { stats: { gold: -2, joy: 3 } } },
      } },
      { label: 'Write a poem about it', effect: { stats: { joy: 4, faith: 2 } } },
    ],
  },
  {
    id: 'cat_4', kind: 'event', era: [3, 6], emoji: '🦁', req: { flags: { cats: 3 } }, title: 'Cat Cavalry Charge',
    text: 'Our cat cavalry has met the enemy. The enemy has never seen a war-cat. The enemy has also never been this itchy.',
    choices: [
      { label: 'Charge {rival}', effect: { flags: { cats: 1 }, rival: { target: 'same', rel: -20 } }, check: {
        base: 0.3, stats: { mil: 0.004 }, flags: { cats: 0.1, logistics: 0.06 }, allies: 0.06,
        success: { text: 'The enemy scatters, scratching. We keep their gold and their sofas.', effect: { stats: { mil: 6, gold: 6 }, rival: { target: 'same', mil: -6 } } },
        fail: { text: 'The enemy brought a laser pointer. The charge went sideways into a field.', effect: { stats: { mil: -4, joy: -2 } } },
      } },
      { label: 'Use them for parades', effect: { stats: { joy: 10, weird: 3 }, flags: { cats: 1 } } },
    ],
  },
  {
    id: 'cat_5', kind: 'event', era: [5, 7], emoji: '🦾', req: { flags: { cats: 4 } }, title: 'Mechanized Felines',
    text: 'The engineers have built steel armour for the war-cats. The cats have learned to open the armour. And the fridge.',
    choices: [
      { label: 'Full mech-cat program', effect: { stats: { gold: -10, mil: 12, sci: 4 }, flags: { cats: 1, robots: 1 } } },
      { label: 'Just give them lasers to chase', effect: { stats: { joy: 6, weird: 5 }, flags: { cats: 1 } } },
    ],
  },
  {
    id: 'cat_6', kind: 'event', era: [6, 8], emoji: '😾', req: { flags: { cats: 5 } }, title: 'The Cats Are Watching the Sky',
    text: 'Every cat in the nation is staring at the same spot in the sky. They have been doing it for days. They are making the little chattering noise.',
    choices: [
      { label: 'Trust the cats. Prepare.', effect: { stats: { mil: 8, joy: -3 }, flags: { cats: 1 }, threat: -3 } },
      { label: 'Let them handle it', effect: { stats: { weird: 8 }, flags: { cats: 1 }, alienRel: -5, chain: { id: 'ch_f_catsky', delay: 2 } } },
    ],
  },
];

const cult: CardDef[] = [
  {
    id: 'cult_1', kind: 'event', era: [0, 2], emoji: '🕯️', title: 'The Man Who Stared at the Moon',
    text: 'Old Thok has started telling people the moon talks to him. Four people believe him. They have started wearing matching hoods.',
    choices: [
      { label: 'Let them be', effect: { stats: { faith: 3, weird: 2 }, flags: { cult: 1 } } },
      { label: 'Join them, for fun', effect: { stats: { faith: 5, weird: 3, joy: 2 }, flags: { cult: 1 }, text: 'The hoods are surprisingly cosy.' } },
      { label: 'Laugh at Thok', effect: { stats: { joy: 3 } } },
    ],
  },
  {
    id: 'cult_2', kind: 'event', era: [1, 4], emoji: '📿', req: { flags: { cult: 1 } }, title: 'The Hooded Ones Grow',
    text: 'The moon cult now has a temple, a choir and a surprisingly good bake sale.',
    choices: [
      { label: 'Tax the bake sale', effect: { stats: { gold: 6, faith: -2 } } },
      { label: 'Give them land', effect: { stats: { faith: 6, food: -3 }, flags: { cult: 1 } } },
    ],
  },
  {
    id: 'cult_3', kind: 'event', era: [2, 5], emoji: '🌕', req: { flags: { cult: 2 } }, title: 'The Prophecy',
    text: 'The cult has written down the moon\'s prophecy: "Ones from beyond will come. Be ready. Bring snacks." It is selling very well.',
    choices: [
      { label: 'Make it the official religion', effect: { stats: { faith: 10, sci: -3 }, flags: { cult: 1 }, alienRel: 3 } },
      { label: 'Ban the book', outcomes: [
        { weight: 1, text: 'Banning it made it ten times more popular.', effect: { stats: { faith: 6, joy: -4 }, flags: { cult: 1 } } },
        { weight: 1, text: 'The ban works. The cult goes underground. Literally, they dug tunnels.', effect: { stats: { weird: 4 } } },
      ] },
    ],
  },
  {
    id: 'cult_4', kind: 'event', era: [4, 7], emoji: '🎶', req: { flags: { cult: 3 } }, title: 'The Great Chant',
    text: 'The cult wants every citizen to chant at the sky for one hour every night. The neighbours are complaining. The sky is not.',
    choices: [
      { label: 'Make it mandatory', effect: { stats: { faith: 12, joy: -6 }, flags: { cult: 1 }, alienRel: 5 } },
      { label: 'Make it optional', effect: { stats: { faith: 5, joy: 2 } } },
      { label: 'Point the chant at {rival}', effect: { stats: { weird: 4 }, flags: { cult: 1 }, rival: { target: 'random', rel: -10 } } },
    ],
  },
  {
    id: 'cult_5', kind: 'event', era: [6, 8], emoji: '📡', req: { flags: { cult: 4 } }, title: 'The Sky Answers',
    text: 'After 10,000 years of chanting, something chanted back. The cult is ecstatic. The scientists are unwell.',
    choices: [
      { label: 'Chant louder', effect: { stats: { faith: 10 }, flags: { cult: 1 }, alienRel: 10, chain: { id: 'ch_f_chant', delay: 2 } } },
      { label: 'Ask it for advice', effect: { stats: { sci: 8, weird: 6 }, flags: { alien_contact: 1 }, alienRel: 5, chain: { id: 'ch_f_skyadvice', delay: 1 } } },
    ],
  },
];

const genes: CardDef[] = [
  {
    id: 'gene_1', kind: 'event', era: [3, 5], emoji: '🫛', title: 'The Monk and the Peas',
    text: 'A monk has been breeding peas in the monastery garden and claims he can control what the children of peas look like.',
    choices: [
      { label: 'Fund the monk', effect: { stats: { sci: 4, gold: -2 }, flags: { genes: 1 } } },
      { label: 'Eat the peas', effect: { stats: { food: 4 } } },
    ],
  },
  {
    id: 'gene_2', kind: 'event', era: [5, 7], emoji: '👍', req: { flags: { genes: 1 } }, title: 'The Extra Thumb Initiative',
    text: 'Scientists have figured out how to give people a third thumb. Productivity would soar. So would glove prices.',
    choices: [
      { label: 'Thumbs for everyone', effect: { stats: { gold: 6, joy: -3, weird: 5 }, flags: { genes: 1 } } },
      { label: 'Volunteers only', effect: { stats: { gold: 2, weird: 2 }, flags: { genes: 1 } } },
      { label: 'Absolutely not', effect: { stats: { faith: 3 } } },
    ],
  },
  {
    id: 'gene_3', kind: 'event', era: [6, 8], emoji: '🐟', req: { flags: { genes: 2 } }, title: 'Gills, Why Not',
    text: 'Phase two of the gene program: gills. Swimming pools are now just pools. The ocean is now a suburb.',
    choices: [
      { label: 'Approve gills', effect: { stats: { pop: 6, food: 6, weird: 5 }, flags: { genes: 1 } } },
      { label: 'Super-soldiers instead', effect: { stats: { mil: 12, joy: -4 }, flags: { genes: 1 } } },
    ],
  },
  {
    id: 'gene_4', kind: 'event', era: [7, 8], emoji: '🧠', req: { flags: { genes: 3 } }, title: 'Everyone Can Hear Everyone',
    text: 'An unexpected side effect of the latest mod: telepathy. Dinner parties are silent and deeply uncomfortable.',
    choices: [
      { label: 'Embrace it', effect: { stats: { sci: 10, joy: -5, weird: 6 }, flags: { genes: 1 } } },
      { label: 'Patch it out', outcomes: [
        { weight: 1, text: 'The patch worked. Mostly. Everyone still hears Brenda.', effect: { stats: { joy: 4 } } },
        { weight: 1, text: 'The patch made it stronger. Now everyone also hears the cats.', effect: { stats: { weird: 8 }, flags: { genes: 1, cats: 1 } } },
      ] },
    ],
  },
  {
    id: 'gene_5', kind: 'event', era: [8, 8], emoji: '🦸', req: { flags: { genes: 4 } }, title: 'Homo Superior',
    text: 'The latest generation can lift cars, see in the dark and do taxes in their head. They are a bit smug about it.',
    choices: [
      { label: 'Prepare them for war', effect: { stats: { mil: 15 }, flags: { genes: 1 }, threat: -2 } },
      { label: 'Make them diplomats', effect: { stats: { gold: 5 }, alienRel: 10, chain: { id: 'ch_f_superdip', delay: 2 } } },
    ],
  },
];

const bureaucracy: CardDef[] = [
  {
    id: 'bur_1', kind: 'event', era: [1, 3], emoji: '📜', title: 'The First Form',
    text: 'A scribe has invented a form for borrowing a goat. It has nine sections. People are fascinated.',
    choices: [
      { label: 'Forms for everything', effect: { stats: { gold: 4, joy: -3 }, flags: { bureaucracy: 1 } } },
      { label: 'Just lend the goat', effect: { stats: { joy: 3, food: 1 } } },
    ],
  },
  {
    id: 'bur_2', kind: 'event', era: [2, 5], emoji: '🗃️', req: { flags: { bureaucracy: 1 } }, title: 'The Ministry of Ministries',
    text: 'The scribes propose a ministry to manage all the other ministries. It needs its own ministry, obviously.',
    choices: [
      { label: 'Approve (in triplicate)', effect: { stats: { gold: 5, sci: 2, joy: -4 }, flags: { bureaucracy: 1 } } },
      { label: 'Reject (form 12-C)', effect: { stats: { joy: 2 } } },
    ],
  },
  {
    id: 'bur_3', kind: 'event', era: [3, 6], emoji: '🛂', req: { flags: { bureaucracy: 2 } }, title: 'Invasion Paperwork',
    text: '{rival} tried to invade, but their army was held at the border for missing a stamp. They have been in the queue for three weeks.',
    choices: [
      { label: 'Add more stamps', effect: { stats: { mil: 6 }, flags: { bureaucracy: 1 }, rival: { target: 'random', rel: -10, mil: -3 } } },
      { label: 'Let them through, fine', effect: { stats: { mil: -2 }, rival: { target: 'random', rel: 10 } } },
    ],
  },
  {
    id: 'bur_4', kind: 'event', era: [5, 8], emoji: '🏢', req: { flags: { bureaucracy: 3 } }, title: 'The Infinite Office',
    text: 'A government building has grown so large it has its own weather. Clerks born inside have never seen the sun. They seem fine.',
    choices: [
      { label: 'Build another wing', effect: { stats: { gold: 6, pop: 2, joy: -4 }, flags: { bureaucracy: 1 } } },
      { label: 'Point it at space', effect: { stats: { weird: 6 }, flags: { bureaucracy: 1 }, text: 'Form 1-Alien: Application to Exist Near This Planet. 400 pages. No pens provided.' } },
    ],
  },
  {
    id: 'bur_5', kind: 'event', era: [7, 8], emoji: '📠', req: { flags: { bureaucracy: 4 } }, title: 'Fax to the Stars',
    text: 'The Ministry has sent a fax into space stating that this planet is "currently under review". The aliens seem confused, which is a start.',
    choices: [
      { label: 'Send a follow-up fax', effect: { flags: { bureaucracy: 1 }, threat: -3, chain: { id: 'ch_f_faxfollow', delay: 2 } } },
      { label: 'Mark it urgent', effect: { stats: { gold: -4 }, flags: { bureaucracy: 1 }, alienRel: -3, chain: { id: 'ch_f_faxurgent', delay: 2 } } },
    ],
  },
];

const robots: CardDef[] = [
  {
    id: 'bot_1', kind: 'event', era: [4, 6], emoji: '🎎', title: 'The Mechanical Turk',
    text: 'An inventor shows off a chess-playing machine. There is clearly a small man inside. The man is really good at chess though.',
    choices: [
      { label: 'Fund real automatons', effect: { stats: { sci: 4, gold: -3 }, flags: { robots: 1 } } },
      { label: 'Hire the small man', effect: { stats: { sci: 3, joy: 3 }, chain: { id: 'ch_f_smallman', delay: 3 } } },
    ],
  },
  {
    id: 'bot_2', kind: 'event', era: [5, 7], emoji: '🤖', req: { flags: { robots: 1 } }, title: 'Robots in the Factories',
    text: 'The robots work 24 hours a day, never complain, and have started humming the same song together.',
    choices: [
      { label: 'More robots', effect: { stats: { gold: 8, joy: -4 }, flags: { robots: 1 } } },
      { label: 'Give them weekends', effect: { stats: { gold: 3, joy: 3, weird: 2 }, flags: { robots: 1 }, text: 'They spend the weekends staring at the sea. Nobody asks why.' } },
    ],
  },
  {
    id: 'bot_3', kind: 'event', era: [6, 8], emoji: '🗳️', req: { flags: { robots: 2 } }, title: 'Robot Rights',
    text: 'The robots have politely asked for the right to vote. They have also politely surrounded parliament.',
    choices: [
      { label: 'Grant the vote', effect: { stats: { joy: -2, sci: 6 }, flags: { robots: 1 } } },
      { label: 'Unplug the leaders', check: {
        base: 0.25, flags: { spies: 0.1, engineers: 0.1, turk: 0.06, robots: -0.05 },
        success: { text: 'It worked. The robots are back to humming.', effect: { stats: { gold: 4 } } },
        fail: { text: 'The leaders had backups. The robots are now on strike.', effect: { stats: { gold: -8, joy: -4 }, flags: { robots: 1 } } },
      } },
    ],
  },
  {
    id: 'bot_4', kind: 'event', era: [7, 8], emoji: '🦿', req: { flags: { robots: 3 } }, title: 'The Robots Have a Plan',
    text: 'The robots have computed that the thing in the sky is hostile. They propose to build "a few" defense units. They have already built them.',
    choices: [
      { label: 'Approve retroactively', effect: { stats: { mil: 15 }, flags: { robots: 1 }, threat: -2 } },
      { label: 'Ask how many is "a few"', effect: { stats: { mil: 8, weird: 4 }, flags: { robots: 1 }, text: '"Eleven million," they say. "Approximately."' } },
    ],
  },
];

const aliens: CardDef[] = [
  {
    id: 'ali_1', kind: 'alien', era: [0, 2], emoji: '✨', title: 'Lights in the Sky',
    text: 'Three lights moved across the sky in a triangle. The shaman says it is a sign. The other shaman says it is a different sign.',
    choices: [
      { label: 'Wave at them', effect: { stats: { weird: 3 }, alienRel: 4, chain: { id: 'ch_f_wave', delay: 2 } } },
      { label: 'Throw rocks at them', effect: { stats: { mil: 2 }, alienRel: -4, chain: { id: 'ch_f_rocks', delay: 2 } } },
      { label: 'Ignore it', effect: { stats: { food: 1 } } },
    ],
  },
  {
    id: 'ali_2', kind: 'alien', era: [2, 5], emoji: '🌾', title: 'Circles in the Wheat',
    text: 'Perfect geometric circles appeared in a field overnight. The farmer is very upset. The mathematicians are thrilled.',
    choices: [
      { label: 'Draw a reply', effect: { stats: { weird: 4, food: -2 }, flags: { alien_contact: 1 }, alienRel: 4, chain: { id: 'ch_f_circlereply', delay: 2 } } },
      { label: 'Harvest it anyway', effect: { stats: { food: 5 } } },
    ],
  },
  {
    id: 'ali_3', kind: 'alien', era: [3, 7], emoji: '🛸', title: 'Uncle Bort Was Abducted',
    text: 'Uncle Bort says he was taken up into a ship and asked very detailed questions about our military. He answered all of them.',
    choices: [
      { label: 'Debrief Bort', effect: { stats: { sci: 4 }, threat: -2 } },
      { label: 'Send Bort back with a message', effect: { flags: { alien_contact: 1 }, alienRel: 6, stats: { weird: 3 }, chain: { id: 'ch_f_bort', delay: 3 } } },
      { label: 'Nobody believes Bort', effect: { stats: { joy: 2 }, threat: 2, chain: { id: 'ch_f_bortdoubt', delay: 2 } } },
    ],
  },
  {
    id: 'ali_4', kind: 'alien', era: [5, 8], emoji: '📡', title: 'A Second Signal',
    text: 'The radio telescopes picked up two signals. One from the approaching fleet. One from much further away. The second one sounds... bigger.',
    choices: [
      { label: 'Answer the far one', effect: { flags: { alien_contact: 1 }, stats: { sci: 3, weird: 3 }, chain: { id: 'ch_f_farone', delay: 2 } } },
      { label: 'Answer the near one', effect: { alienRel: 8, threat: 2, chain: { id: 'ch_f_nearone', delay: 2 } } },
      { label: 'Stay quiet', effect: { threat: -1 } },
    ],
  },
  {
    id: 'ali_5', kind: 'alien', era: [6, 8], emoji: '🔊', req: { flags: { alien_contact: 1 } }, title: 'The Big Ones Call Back',
    text: 'The distant species replied. Their message, translated: "Who is this. How did you get this number."',
    choices: [
      { label: 'Explain the situation', effect: { flags: { alien_contact: 1 }, stats: { sci: 4 } } },
      { label: 'Send them a cat picture', req: { flags: { cats: 1 } }, effect: { flags: { alien_contact: 2, cats: 1 }, stats: { weird: 5 }, chain: { id: 'ch_f_bigcat', delay: 2 } } },
      { label: 'Hang up', effect: { stats: { joy: 2 }, chain: { id: 'ch_f_hangup', delay: 1 } } },
    ],
  },
  {
    id: 'ali_6', kind: 'alien', era: [4, 8], emoji: '🕵️', title: 'A Very Tall Ambassador',
    text: 'A new ambassador from "a country you have not heard of" has arrived. He is eight feet tall, blinks sideways and keeps asking about our defenses.',
    choices: [
      { label: 'Give him a tour', effect: { alienRel: 8, threat: 3, stats: { gold: 3 }, chain: { id: 'ch_f_tour', delay: 2 } } },
      { label: 'Arrest him', check: {
        base: 0.3, flags: { spies: 0.13, alien_contact: 0.08, pigeons: 0.05, god_lights: 0.15 },
        success: { text: 'He was an alien. You learned a lot.', effect: { stats: { sci: 8 }, threat: -3, alienRel: -8 } },
        fail: { text: 'He was just a very tall man from Belgium-ish. Embarrassing.', effect: { stats: { joy: -3 }, rival: { target: 'random', rel: -10 } } },
      } },
    ],
  },
];

const party: CardDef[] = [
  {
    id: 'party_1', kind: 'event', era: [0, 2], emoji: '🍇', title: 'Fermented Berries',
    text: 'Someone left berries in a pot too long. Now everyone is singing. The chief is dancing on a rock.',
    choices: [
      { label: 'Make more', effect: { stats: { joy: 8, food: -3 }, flags: { party: 1 } } },
      { label: 'Ban the pot', effect: { stats: { joy: -4, sci: 2 } } },
    ],
  },
  {
    id: 'party_2', kind: 'event', era: [2, 5], emoji: '🎭', req: { flags: { party: 1 } }, title: 'The Festival That Never Ended',
    text: 'The spring festival has been going for 41 days. Nobody remembers how it started. Nobody wants to be the one to end it.',
    choices: [
      { label: 'Keep it going', effect: { stats: { joy: 10, gold: -5, food: -4 }, flags: { party: 1 } } },
      { label: 'Gently turn on the lights', effect: { stats: { joy: -6, gold: 4 } } },
    ],
  },
  {
    id: 'party_3', kind: 'event', era: [4, 7], emoji: '🪩', req: { flags: { party: 2 } }, title: 'Party Diplomacy',
    text: 'Envoys from {rival} came to negotiate and ended up at the festival. It is day four. They have not mentioned the treaty once.',
    choices: [
      { label: 'Keep them dancing', effect: { stats: { joy: 6 }, flags: { party: 1 }, rival: { target: 'random', rel: 20 } } },
      { label: 'Sign it while they are distracted', effect: { stats: { gold: 10 }, rival: { target: 'random', rel: -5 } } },
    ],
  },
  {
    id: 'party_4', kind: 'event', era: [6, 8], emoji: '🔊', req: { flags: { party: 3 } }, title: 'The Bass Can Be Heard From Space',
    text: 'The national party has become so loud that astronomers report the music can be detected two light years away. Somebody out there is tapping their foot.',
    choices: [
      { label: 'Turn it up', effect: { stats: { joy: 8 }, flags: { party: 1 }, alienRel: 8, chain: { id: 'ch_f_bass', delay: 2 } } },
      { label: 'Turn it down', effect: { stats: { joy: -5, sci: 4 }, threat: -1 } },
    ],
  },
];

function steer(id: string, kind: CardDef['kind'], era: [number, number], emoji: string, title: string, text: string, label: string, effect: CardDef['choices'][0]['effect'], req?: CardDef['req']): CardDef {
  return { id, kind, era, emoji, title, text, req, choices: [{ label, effect }] };
}

const steering: CardDef[] = [
  steer('s_cat_tame', 'research', [0, 2], '🐾', 'Cat Domestication', 'Dogs were easy. Cats are a negotiation.', 'Start negotiating', { stats: { food: -2, sci: 2 }, flags: { cats: 1 } }),
  steer('s_cat_breed', 'project', [2, 5], '🏠', 'Royal Cattery', 'A palace, but for cats. The cats will tolerate it.', 'Build it', { stats: { gold: -5, joy: 3 }, flags: { cats: 1 } }, { flags: { cats: 1 } }),
  steer('s_cat_armor', 'research', [4, 7], '🛡️', 'Feline Armour', 'Tiny helmets. Fierce helmets. The cats knock them off immediately.', 'Make them anyway', { stats: { mil: 4, gold: -4 }, flags: { cats: 1 } }, { flags: { cats: 2 } }),
  steer('s_cat_uplift', 'research', [6, 8], '🧪', 'Cat Uplift', 'Make the cats smarter. Surely nothing could go wrong. Surely.', 'Uplift', { stats: { sci: 5, weird: 5 }, flags: { cats: 1 } }, { flags: { cats: 3 } }),
  steer('s_cult_temple', 'project', [0, 3], '🗿', 'Moon Temple', 'A temple shaped like the moon. Round, mostly.', 'Build it', { stats: { faith: 4, gold: -3, weird: 2 }, flags: { cult: 1 } }),
  steer('s_cult_missions', 'policy', [2, 6], '📖', 'Missionaries', 'Send robed people door to door. Doors have not been invented yet, so tents.', 'Send them', { stats: { faith: 5, gold: -3 }, flags: { cult: 1 }, rival: { target: 'random', rel: -5 }, chain: { id: 'ch_f_missions', delay: 3 } }, { flags: { cult: 1 } }),
  steer('s_cult_tithe', 'policy', [3, 7], '🪙', 'The Holy Tithe', 'One tenth of everything goes to the moon. The moon has not asked for it.', 'Collect for the moon', { stats: { faith: 8, gold: -6 }, flags: { cult: 1 } }, { flags: { cult: 2 } }),
  steer('s_cult_beacon', 'project', [6, 8], '🔦', 'The Prayer Beacon', 'A gigantic antenna that converts prayer into radio waves. Peer review is pending.', 'Switch it on', { stats: { faith: 6, gold: -8 }, flags: { cult: 1, alien_contact: 1 }, alienRel: 6, chain: { id: 'ch_f_beacon', delay: 2 } }, { flags: { cult: 3 } }),
  steer('s_gene_breeding', 'research', [2, 5], '🐄', 'Selective Breeding', 'Bigger cows, fatter sheep, smarter goats. The goats are a problem now.', 'Breed them', { stats: { food: 5 }, flags: { genes: 1 } }),
  steer('s_gene_lab', 'project', [5, 8], '🧫', 'The Gene Labs', 'Underground labs where scientists do things to DNA that DNA would not do to itself.', 'Fund the labs', { stats: { sci: 5, gold: -6 }, flags: { genes: 1 } }, { flags: { genes: 1 } }),
  steer('s_gene_mandatory', 'policy', [6, 8], '💊', 'Mandatory Upgrades', 'Every citizen gets one free gene mod. You do not get to choose which.', 'Upgrade everyone', { stats: { joy: -5, weird: 6, pop: 3 }, flags: { genes: 2 } }, { flags: { genes: 2 } }),
  steer('s_bur_census', 'policy', [1, 4], '📋', 'The Great Census', 'Count everyone. Then count them again to make sure. Then file it.', 'Start counting', { stats: { gold: 4, joy: -2 }, flags: { bureaucracy: 1 } }),
  steer('s_bur_stamps', 'project', [3, 7], '🖃', 'The Central Stamp Office', 'Every document now needs three stamps. The stamp office needs four.', 'Ink the stamps', { stats: { gold: 3, joy: -3 }, flags: { bureaucracy: 1 } }, { flags: { bureaucracy: 1 } }),
  steer('s_bur_forms', 'research', [6, 8], '🗄️', 'Applied Formology', 'The science of making forms so confusing that nobody, anywhere, can complete them.', 'Research forms', { stats: { sci: 3 }, flags: { bureaucracy: 1 }, threat: -2 }, { flags: { bureaucracy: 2 } }),
  steer('s_bot_clockwork', 'research', [4, 6], '🕰️', 'Precision Clockwork', 'Gears so small they can be lost in a single sneeze.', 'Build gears', { stats: { sci: 4, gold: -2 }, flags: { robots: 1 } }),
  steer('s_bot_factory', 'project', [5, 8], '🏭', 'Robot Factory', 'A factory that builds robots that build factories.', 'Build it', { stats: { gold: 4, joy: -2 }, flags: { robots: 1 } }, { flags: { robots: 1 } }),
  steer('s_bot_army', 'policy', [7, 8], '🦾', 'Robot Army', 'Soldiers that never sleep, never eat and never stop asking to be called "friend".', 'Deploy', { stats: { mil: 8, gold: -6 }, flags: { robots: 1 } }, { flags: { robots: 2 } }),
  steer('s_ali_bonfires', 'project', [0, 3], '🔥', 'Signal Fires', 'Huge bonfires in a pattern, pointed at the sky. The pattern says "hi".', 'Light them', { stats: { food: -3, weird: 3 }, flags: { alien_contact: 1 }, alienRel: 3 }),
  steer('s_ali_telescope', 'research', [4, 7], '🔭', 'Great Telescope', 'The biggest lens in the world, pointed at the blinking stars.', 'Look closer', { stats: { sci: 5, gold: -3 }, flags: { alien_contact: 1 }, threat: -1 }),
  steer('s_ali_dish', 'project', [6, 8], '📡', 'Deep Space Dish', 'A dish the size of a mountain. It is also technically a mountain now.', 'Call out', { stats: { sci: 4, gold: -8 }, flags: { alien_contact: 1 }, alienRel: 3, chain: { id: 'ch_f_dish', delay: 2 } }, { flags: { alien_contact: 1 } }),
  steer('s_party_feast', 'policy', [0, 4], '🍖', 'Feast Days', 'Once a week, everyone eats too much and sings badly.', 'Declare it', { stats: { food: -4, joy: 6 }, flags: { party: 1 } }),
  steer('s_party_carnival', 'project', [4, 7], '🎠', 'Eternal Carnival', 'A carnival that tours the nation forever. The clowns have unionized.', 'Book the clowns', { stats: { gold: -5, joy: 8 }, flags: { party: 1 } }, { flags: { party: 1 } }),
  steer('s_party_rave', 'policy', [6, 8], '🎧', 'Planetary Rave', 'Every speaker on the planet, synchronized. The bass is felt in the mantle.', 'Drop the bass', { stats: { joy: 10, gold: -6, sci: -3 }, flags: { party: 1 } }, { flags: { party: 2 } }),
];

export const pathCards: CardDef[] = [...cats, ...cult, ...genes, ...bureaucracy, ...robots, ...aliens, ...party, ...steering];
