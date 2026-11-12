import type { CardDef } from '../../types';

export const landCards: CardDef[] = [
  {
    id: 'o_coast_1', kind: 'event', title: 'The Fishing Navy', emoji: '🎣', era: [0, 1], once: true, weight: 2,
    req: { flags: { land_coast: 1 } },
    text: '{rival} raiders are sailing in. Your only ships are fishing boats crewed by men who think a battle is a type of eel.',
    choices: [
      {
        label: 'Send the fishermen', check: {
          base: 0.4, stats: { mil: 0.02 }, flags: { navy: 0.15, custom_food: 0.1 },
          success: { text: 'They netted the enemy fleet, sorted it by size and threw the small ones back.', effect: { stats: { mil: 4, food: 3 } } },
          fail: { text: 'They got distracted by a shoal of mackerel. The raiders took the beach and a lot of mackerel.', effect: { stats: { food: -4, joy: -3 } } },
        },
      },
      { label: 'Throw fish at them from shore', effect: { stats: { food: -3, mil: 2, joy: 3 }, text: 'Historians call it the Battle of the Wet Slap.' } },
    ],
  },
  {
    id: 'o_coast_2', kind: 'event', title: 'Admiral Codfather', emoji: '⚓', era: [2, 4], once: true, weight: 2,
    req: { flags: { land_coast: 1 } },
    text: 'The fishing navy now has ranks. The highest rank is Admiral Codfather. He has never left sight of land and considers this a strategy.',
    choices: [
      { label: 'Fund real warships', effect: { stats: { gold: -6, mil: 7 } } },
      { label: 'Keep it a fishing navy', effect: { stats: { food: 6, mil: 2, joy: 2 }, text: 'Every patrol returns with dinner. Morale is unbeatable.' } },
      { label: 'Explore the horizon', effect: { stats: { gold: -3, sci: 5 }, text: 'The horizon keeps moving. The sailors find this personally insulting.', chain: { id: 'ch_f_horizon', delay: 3 } } },
    ],
  },
  {
    id: 'o_coast_3', kind: 'event', title: 'The Sea Wants In', emoji: '🌊', era: [5, 6], once: true, weight: 2,
    req: { flags: { land_coast: 1 } },
    text: 'The sea level is rising. The coastal quarter is now a coastal quarter and a half.',
    choices: [
      { label: 'Build a big wall', effect: { stats: { gold: -8, joy: 3, pop: 2 } } },
      { label: 'Build underwater domes', effect: { stats: { gold: -6, sci: 6, weird: 3 }, text: 'Residents report the fish are staring. The fish report the same.' } },
      { label: 'Let it in, learn to swim', effect: { stats: { pop: -3, joy: -2 }, flags: { genes: 1 }, text: 'A few volunteers have started growing webbing. On purpose.' } },
    ],
  },
  {
    id: 'o_coast_4', kind: 'event', title: 'Atlantis, But On Purpose', emoji: '🐙', era: [7, 8], once: true, weight: 2,
    req: { flags: { land_coast: 1 } },
    text: 'Half of {civ} now lives underwater. The aliens are scanning the land. Nobody is scanning the sea.',
    choices: [
      { label: 'Hide the whole civ underwater', effect: { stats: { pop: 6, joy: 4 }, threat: -4, text: 'The invasion fleet will find empty beaches and a sign saying "Gone fishing".' } },
      { label: 'Give everyone gills', effect: { stats: { gold: -10, sci: 6 }, flags: { genes: 2 } } },
      { label: 'Arm the squid', effect: { stats: { mil: 12, weird: 6 }, text: 'The squid signed up eagerly. Too eagerly.' } },
    ],
  },

  {
    id: 'o_mtn_1', kind: 'event', title: 'The Yodel Network', emoji: '🗣️', era: [0, 2], once: true, weight: 2,
    req: { flags: { land_mountain: 1 } },
    text: 'Messages are yodelled from peak to peak. Accuracy is 60%. Echoes are a known security problem.',
    choices: [
      { label: 'Standardise the yodels', effect: { stats: { sci: 4, gold: -2 } } },
      { label: 'Use it for war signals', effect: { stats: { mil: 4, joy: -1 }, text: 'Enemies now flee at the sound of anyone singing.' } },
      { label: 'Ban yodelling', effect: { stats: { joy: -5, sci: 1 } } },
    ],
  },
  {
    id: 'o_mtn_2', kind: 'event', title: 'The Mountain Is Hollow', emoji: '⛏️', era: [3, 5], once: true, weight: 2,
    req: { flags: { land_mountain: 1 } },
    text: 'The miners dug too deep and found the mountain is mostly empty inside. And very echoey.',
    choices: [
      { label: 'Move the treasury in', effect: { stats: { gold: 7, mil: 2 } } },
      { label: 'Build a fortress city inside', effect: { stats: { gold: -6, mil: 8, joy: -2 } } },
      {
        label: 'Keep digging', outcomes: [
          { weight: 2, text: 'Gold. A lot of gold. One miner now walks with a permanent stoop of wealth.', effect: { stats: { gold: 10 } } },
          { weight: 1, text: 'They found a door. It was locked from the other side.', effect: { stats: { weird: 6, faith: 3 } } },
        ],
      },
    ],
  },
  {
    id: 'o_mtn_3', kind: 'event', title: 'Shortest Way Up', emoji: '🚡', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_mountain: 1 } },
    text: 'Your engineers point out that you are already halfway to space. Technically.',
    choices: [
      { label: 'Build a launch rail up the peak', effect: { stats: { gold: -10, sci: 10 }, threat: -2 } },
      { label: 'Turn the mountain into a gun', effect: { stats: { gold: -8, mil: 15 }, text: 'The Peak Cannon is aimed straight up. The goats are nervous.' } },
      { label: 'Put a radio dish on top', effect: { stats: { sci: 4 }, flags: { alien_contact: 1 } } },
    ],
  },

  {
    id: 'o_desert_1', kind: 'event', title: 'Mirage Diplomacy', emoji: '🏜️', era: [0, 2], once: true, weight: 2,
    req: { flags: { land_desert: 1 } },
    text: 'An envoy from {rival} crossed the desert and has been negotiating with a mirage for three days. The mirage is winning.',
    choices: [
      { label: 'Rescue him and offer water', effect: { stats: { food: -2 }, rival: { target: 'random', rel: 12 } } },
      { label: 'Let the mirage finish the deal', effect: { stats: { gold: 5, weird: 3 }, rival: { target: 'random', rel: -5 }, text: 'The mirage got excellent terms. You will honour them.' } },
    ],
  },
  {
    id: 'o_desert_2', kind: 'event', title: 'Glass From Sand', emoji: '🔍', era: [3, 5], once: true, weight: 2,
    req: { flags: { land_desert: 1 } },
    text: 'Lightning struck a dune and left glass. You have an infinite amount of sand and a sudden idea.',
    choices: [
      { label: 'Lenses for everyone', effect: { stats: { sci: 7, gold: -3 } } },
      { label: 'Sell glass to the world', effect: { stats: { gold: 8 } } },
      { label: 'Build a mirror to blind enemies', effect: { stats: { mil: 6, joy: -1 }, text: 'Also blinded three of our own generals. They were not using their eyes much anyway.' } },
    ],
  },
  {
    id: 'o_desert_3', kind: 'event', title: 'Silicon Valley, Literally', emoji: '💾', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_desert: 1 } },
    text: 'It turns out sand can think, if you shout at it with enough electricity. You own all of it.',
    choices: [
      { label: 'Make thinking machines', effect: { stats: { gold: -6, sci: 9 }, flags: { robots: 2 } } },
      { label: 'Sell chips to everyone', effect: { stats: { gold: 15, joy: 2 } } },
      { label: 'Ask the dunes what they want', effect: { stats: { weird: 8, faith: 4 }, text: 'They want to be a beach. They have always wanted to be a beach.' } },
    ],
  },

  {
    id: 'o_jungle_1', kind: 'event', title: 'Everything Is Poisonous', emoji: '🍄', era: [0, 2], once: true, weight: 2,
    req: { flags: { land_jungle: 1 } },
    text: 'A taster died. Then another. The third one says the frog tastes fine, just "very purple".',
    choices: [
      { label: 'Hire more tasters', effect: { stats: { pop: -2, sci: 5 } } },
      { label: 'Poison darts for the army', effect: { stats: { mil: 5, joy: -2 } } },
      { label: 'Lick the frog for wisdom', effect: { stats: { faith: 4, weird: 4, sci: -1 } } },
    ],
  },
  {
    id: 'o_jungle_2', kind: 'event', title: 'The Jungle Takes Back', emoji: '🌿', era: [3, 5], once: true, weight: 2,
    req: { flags: { land_jungle: 1 } },
    text: 'The old capital was abandoned for one weekend. The jungle has reclaimed it, and added a waterfall.',
    choices: [
      { label: 'Cut it back', effect: { stats: { gold: -4, pop: 3 } } },
      { label: 'Call it a temple now', effect: { stats: { faith: 6, joy: 2 } } },
      { label: 'Study what the vines did', effect: { stats: { sci: 5 }, flags: { genes: 1 } } },
    ],
  },
  {
    id: 'o_jungle_3', kind: 'event', title: 'The Green Arsenal', emoji: '🧪', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_jungle: 1 } },
    text: 'Your scientists have catalogued every jungle plant. One of them makes metal rot. Another makes you see the colour nine.',
    choices: [
      { label: 'Spray the rot on alien ships', effect: { stats: { gold: -8 } }, check: {
        base: 0.3, stats: { sci: 0.002 }, flags: { yeet: 0.08, engineers: 0.08, genes: 0.05, pigeons: 0.05 },
        success: { text: 'Three scout ships rust mid-orbit and drift off apologizing.', effect: { stats: { mil: 8 }, threat: -5 } },
        fail: { text: 'The rot never made it past the clouds. Several weather balloons are now rust.', effect: { stats: { mil: 2 }, threat: -1 } },
      } },
      { label: 'Engineer super-crops', effect: { stats: { food: 12, pop: 4 }, flags: { genes: 1 } } },
      { label: 'Everybody try the colour nine', effect: { stats: { weird: 12, joy: 6, sci: -4 } } },
    ],
  },

  {
    id: 'o_tundra_1', kind: 'event', title: 'The Mammoth Situation', emoji: '🦣', era: [0, 1], once: true, weight: 2,
    req: { flags: { land_tundra: 1 } },
    text: 'A mammoth has taken an interest in the village. It is either hungry or lonely. Possibly both.',
    choices: [
      { label: 'Hunt it', check: {
        base: 0.4, stats: { mil: 0.025 }, flags: { yeet: 0.12, founder_explorer: 0.1 },
        success: { text: 'Food for a whole winter. And a coat the size of a house.', effect: { stats: { food: 8, joy: 2 } } },
        fail: { text: 'The mammoth won. The mammoth was smug about it.', effect: { stats: { pop: -2, mil: -1 } } },
      } },
      { label: 'Befriend it', effect: { stats: { mil: 4, weird: 2, food: -2 }, text: 'His name is Lumps. He pulls the sledges and sulks in summer.' } },
    ],
  },
  {
    id: 'o_tundra_2', kind: 'event', title: 'Nothing Ever Rots', emoji: '🧊', era: [2, 5], once: true, weight: 2,
    req: { flags: { land_tundra: 1 } },
    text: 'Food buried in the ice is still perfect a decade later. So is the grudge against whoever buried it.',
    choices: [
      { label: 'Build a great ice larder', effect: { stats: { food: 8, gold: -2 } } },
      { label: 'Sell frozen fish abroad', effect: { stats: { gold: 7, food: -2 } } },
      { label: 'Freeze the elderly for later', effect: { stats: { pop: 2, weird: 5, joy: -2 }, text: 'Grandpa will be thawed when there is something worth seeing.', chain: { id: 'ch_f_frozen', delay: 3 } } },
    ],
  },
  {
    id: 'o_tundra_3', kind: 'event', title: 'Free Cooling', emoji: '🖥️', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_tundra: 1 } },
    text: 'Computers run hot. Your whole country is a fridge. Tech companies are queueing at the border in shorts.',
    choices: [
      { label: 'Build giant server farms', effect: { stats: { gold: 10, sci: 6 }, flags: { robots: 1 } } },
      { label: 'Thaw grandpa', effect: { stats: { joy: 4, weird: 4 }, text: 'He has looked at everything and would like to go back in.' } },
    ],
  },

  {
    id: 'o_swamp_1', kind: 'event', title: 'Swamp Gas Prophets', emoji: '💨', era: [0, 2], once: true, weight: 2,
    req: { flags: { land_swamp: 1 } },
    text: 'Everyone who walks past the bubbling pool comes back a prophet. There are now 40 prophets and they all disagree.',
    choices: [
      { label: 'Fence off the pool', effect: { stats: { faith: -2, joy: 2 } } },
      { label: 'Hold a prophet tournament', effect: { stats: { faith: 6, weird: 3, joy: 2 } } },
      { label: 'Bottle the gas', effect: { stats: { gold: 4, weird: 3 } } },
    ],
  },
  {
    id: 'o_swamp_2', kind: 'event', title: 'Bog Archive', emoji: '🗄️', era: [3, 5], once: true, weight: 2,
    req: { flags: { land_swamp: 1 } },
    text: 'The bog preserves everything. Including 300 years of taxmen who went in and never came out. Each is still holding a ledger.',
    choices: [
      { label: 'Recover the ledgers', effect: { stats: { gold: 6, sci: 2 }, flags: { bureaucracy: 1 } } },
      { label: 'Leave them as a warning', effect: { stats: { mil: 4, joy: 2 } } },
    ],
  },
  {
    id: 'o_swamp_3', kind: 'event', title: 'The Swamp Has Opinions', emoji: '🫧', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_swamp: 1 } },
    text: 'Scientists confirm the swamp is a single organism. It is old, mildly irritated, and very large.',
    choices: [
      { label: 'Make it a citizen', effect: { stats: { weird: 10, joy: 3 }, flags: { genes: 1 } } },
      { label: 'Ask it to swallow the invaders', effect: { stats: { faith: 4 }, threat: -5, text: 'The swamp burped. You choose to read this as yes.' } },
      { label: 'Drain it', effect: { stats: { food: 10, pop: 4, weird: -6, joy: -3 } } },
    ],
  },

  {
    id: 'o_volc_1', kind: 'event', title: 'Rumbling', emoji: '🌋', era: [0, 2], once: true, weight: 2,
    req: { flags: { land_volcano: 1 } },
    text: 'The mountain is rumbling. The soil is fantastic. These two facts are in constant negotiation.',
    choices: [
      { label: 'Move further down', effect: { stats: { food: -4, pop: 2 } } },
      { label: 'Stay and farm harder', outcomes: [
        { weight: 3, text: 'A record harvest. The mountain just cleared its throat.', effect: { stats: { food: 8 } } },
        { weight: 1, text: 'The mountain spat. One village is now a very interesting rock.', effect: { stats: { pop: -4, faith: 3 } } },
      ] },
    ],
  },
  {
    id: 'o_volc_2', kind: 'event', title: 'Hot Baths', emoji: '♨️', era: [3, 5], once: true, weight: 2,
    req: { flags: { land_volcano: 1 } },
    text: 'Someone discovered that the scary water near the lava is actually very relaxing.',
    choices: [
      { label: 'Open public baths', effect: { stats: { joy: 7, gold: 2 } } },
      { label: 'Use the heat for forges', effect: { stats: { mil: 6, sci: 2 } } },
    ],
  },
  {
    id: 'o_volc_3', kind: 'event', title: 'Magma Power', emoji: '⚡', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_volcano: 1 } },
    text: 'You live on a free, infinite, slightly murderous power plant.',
    choices: [
      { label: 'Geothermal everything', effect: { stats: { gold: 10, sci: 6 } } },
      { label: 'Lava moat around the capital', effect: { stats: { mil: 12, gold: -5 }, threat: -2 } },
      { label: 'Trigger a controlled eruption at the fleet', check: {
        base: 0.15, stats: { sci: 0.002 }, flags: { engineers: 0.1, hole: 0.06, yeet: 0.05, god_volcano: 0.15 },
        success: { text: 'A pillar of fire knocked a mothership out of the sky. Aliens are rewriting their brochures.', effect: { threat: -8, stats: { mil: 5 } } },
        fail: { text: 'There is no such thing as a controlled eruption.', effect: { stats: { pop: -6, food: -6, weird: 5 } } },
      } },
    ],
  },

  {
    id: 'o_isle_1', kind: 'event', title: 'The Big Stupid Birds', emoji: '🦤', era: [0, 2], once: true, weight: 2,
    req: { flags: { land_island: 1 } },
    text: 'The island is full of huge flightless birds that walk up to people and wait to be eaten. It feels like a trap.',
    choices: [
      { label: 'Eat them', effect: { stats: { food: 8, joy: 1 }, text: 'Delicious. There are noticeably fewer of them.' } },
      { label: 'Protect them', effect: { stats: { joy: 4, faith: 2, weird: 2 } } },
    ],
  },
  {
    id: 'o_isle_2', kind: 'event', title: 'Tourists', emoji: '🧳', era: [3, 5], once: true, weight: 2,
    req: { flags: { land_island: 1 } },
    text: 'Visitors from {rival} arrive by boat, take pictures of everything, and leave with seashells. It is maddening and profitable.',
    choices: [
      { label: 'Charge for the seashells', effect: { stats: { gold: 8, joy: -2 }, rival: { target: 'random', rel: 4 } } },
      { label: 'Close the beaches', effect: { stats: { joy: 4, gold: -2 }, rival: { target: 'random', rel: -6 } } },
    ],
  },
  {
    id: 'o_isle_3', kind: 'event', title: 'Not On The Map', emoji: '🗺️', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_island: 1 } },
    text: 'The alien star charts list the whole planet except your island. Cartographers everywhere are furious.',
    choices: [
      { label: 'Stay quiet and very still', effect: { stats: { joy: 4 }, threat: -5 } },
      { label: 'Wave at them', effect: { flags: { alien_contact: 1 }, alienRel: 6, stats: { weird: 3 }, chain: { id: 'ch_f_isle', delay: 2 } } },
      { label: 'Sell hiding spots to other nations', effect: { stats: { gold: 12, pop: 3 } } },
    ],
  },

  {
    id: 'o_delta_1', kind: 'event', title: 'The Annual Flood', emoji: '💧', era: [0, 2], once: true, weight: 2,
    req: { flags: { land_delta: 1 } },
    text: 'The river floods on schedule. Some people want to measure exactly when. Others just want to stop being wet.',
    choices: [
      { label: 'Invent a calendar', effect: { stats: { sci: 5, faith: 2 } } },
      { label: 'Build dykes', effect: { stats: { gold: -3, food: 5, pop: 2 } } },
      { label: 'Enjoy the mud', effect: { stats: { joy: 4, food: 2 } } },
    ],
  },
  {
    id: 'o_delta_2', kind: 'event', title: 'Water Law', emoji: '⚖️', era: [3, 5], once: true, weight: 2,
    req: { flags: { land_delta: 1 } },
    text: 'There are now 700 canals and 7,000 lawsuits about who owns which wet bit.',
    choices: [
      { label: 'Create a Canal Ministry', effect: { stats: { gold: 4, joy: -2 }, flags: { bureaucracy: 1 } } },
      { label: 'Settle it by boat race', effect: { stats: { joy: 6, mil: 2 } } },
    ],
  },
  {
    id: 'o_delta_3', kind: 'event', title: 'The River Decides', emoji: '🛶', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_delta: 1 } },
    text: 'The river moved overnight, again. This time it moved into the space centre.',
    choices: [
      { label: 'Build a floating launchpad', effect: { stats: { gold: -8, sci: 10 } } },
      { label: 'Flood the alien landing zones', effect: { stats: { food: -4 }, threat: -5, text: 'The aliens have never seen mud. They are horrified.' } },
    ],
  },

  {
    id: 'o_crater_1', kind: 'event', title: 'The Humming Rocks', emoji: '🪨', era: [0, 2], once: true, weight: 2,
    req: { flags: { land_crater: 1 } },
    text: 'The rocks at the centre of the crater hum. If you put your ear close, they hum a little louder, as if pleased.',
    choices: [
      { label: 'Make tools from them', effect: { stats: { mil: 4, sci: 3, weird: 2 } } },
      { label: 'Worship them', effect: { stats: { faith: 5, weird: 3 } } },
      { label: 'Throw them away, far away', effect: { stats: { joy: 3 }, alienRel: -3 } },
    ],
  },
  {
    id: 'o_crater_2', kind: 'event', title: 'Something Is Still Here', emoji: '🔦', era: [3, 5], once: true, weight: 2,
    req: { flags: { land_crater: 1 } },
    text: 'Diggers found the thing that made the crater. It is metal, warm, and has a slot shaped exactly like a hand.',
    choices: [
      { label: 'Put a hand in', outcomes: [
        { weight: 1, text: 'The volunteer now speaks every language, including some that have not been invented.', effect: { stats: { sci: 8, weird: 4 }, flags: { alien_contact: 1 } } },
        { weight: 1, text: 'The slot ate a glove and beeped disapprovingly.', effect: { stats: { weird: 4 }, alienRel: 3 } },
      ] },
      { label: 'Bury it again', effect: { stats: { joy: 3, faith: 2 } } },
    ],
  },
  {
    id: 'o_crater_3', kind: 'event', title: 'The Crater Is a Dish', emoji: '📡', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_crater: 1 } },
    text: 'Engineers notice the crater is a perfect parabola. Your entire country is a satellite dish and always has been.',
    choices: [
      { label: 'Call the stars', effect: { stats: { sci: 6 }, flags: { alien_contact: 2 }, alienRel: 5, chain: { id: 'ch_f_crater', delay: 2 } } },
      { label: 'Jam their signals', effect: { stats: { sci: 4, mil: 6 }, threat: -4 } },
    ],
  },

  {
    id: 'o_back_1', kind: 'event', title: 'The Ground Sighed', emoji: '😮‍💨', era: [0, 2], once: true, weight: 2,
    req: { flags: { land_back: 1 } },
    text: 'The ground rose two metres, held it, and slowly sank back down. The priests suggest this was "breathing".',
    choices: [
      { label: 'Tiptoe from now on', effect: { stats: { joy: -2, faith: 4 } } },
      { label: 'Scratch it', outcomes: [
        { weight: 2, text: 'The whole continent leaned into it. Crops grew twice as fast out of gratitude.', effect: { stats: { food: 7, weird: 3 } } },
        { weight: 1, text: 'It twitched. The coastline is now somewhere else.', effect: { stats: { pop: -3, weird: 4 } } },
      ] },
    ],
  },
  {
    id: 'o_back_2', kind: 'event', title: 'We Are Moving', emoji: '🧭', era: [3, 5], once: true, weight: 2,
    req: { flags: { land_back: 1 } },
    text: 'Astronomers confirm the stars are in the wrong place. The stars are fine. You are the ones walking.',
    choices: [
      { label: 'Map the route', effect: { stats: { sci: 6, gold: -2 } } },
      { label: 'Hang a carrot in front', effect: { stats: { weird: 5, food: -3 }, text: 'It works. Nobody knows where it is going, but faster.' } },
      { label: 'Charge {rival} for rides', effect: { stats: { gold: 7 }, rival: { target: 'random', rel: 4 } } },
    ],
  },
  {
    id: 'o_back_3', kind: 'event', title: 'It Is Waking Up', emoji: '👁️', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_back: 1 } },
    text: 'The thing you live on just opened an eye the size of a lake and looked straight up at the alien fleet.',
    choices: [
      { label: 'Ask it to fight for us', effect: { stats: { weird: 8, faith: 6 }, threat: -6 } },
      { label: 'Ask it to swim into space', effect: { stats: { weird: 12 }, flags: { alien_contact: 1 }, alienRel: 5, text: 'It has always wanted to. It was just waiting for someone to ask.' } },
      { label: 'Hold very still', effect: { stats: { joy: -4 } } },
    ],
  },

  {
    id: 'o_cave_1', kind: 'event', title: 'Mushroom Economy', emoji: '🍄', era: [0, 2], once: true, weight: 2,
    req: { flags: { land_cave: 1 } },
    text: 'The caves grow 300 kinds of mushroom. 12 are food. 40 are medicine. The rest are why the cave paintings look like that.',
    choices: [
      { label: 'Farm the food ones', effect: { stats: { food: 6 } } },
      { label: 'Farm the other ones', effect: { stats: { weird: 6, faith: 3, joy: 3 } } },
    ],
  },
  {
    id: 'o_cave_2', kind: 'event', title: 'The Sun Is Real', emoji: '🌞', era: [3, 5], once: true, weight: 2,
    req: { flags: { land_cave: 1 } },
    text: 'An expedition reached the surface and confirmed the sun exists. Half the population refuses to believe it.',
    choices: [
      { label: 'Move up to the surface', effect: { stats: { food: 5, pop: 3, mil: -3 } } },
      { label: 'Declare it propaganda', effect: { stats: { mil: 4, joy: -3, faith: 3 } } },
      { label: 'Install mirrors down the shafts', effect: { stats: { gold: -4, sci: 6, joy: 3 } } },
    ],
  },
  {
    id: 'o_cave_3', kind: 'event', title: 'Underground Again', emoji: '🚇', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_cave: 1 } },
    text: 'The aliens are coming. The rest of the world is panicking. Your citizens are quietly unpacking their old cave stuff.',
    choices: [
      { label: 'Everyone back in the caves', effect: { stats: { pop: 4, joy: 2 }, threat: -5 } },
      { label: 'Rent the caves to other nations', effect: { stats: { gold: 15 } } },
      { label: 'Build robot miners for deep bunkers', effect: { stats: { gold: -6, mil: 6 }, flags: { robots: 1 } } },
    ],
  },

  {
    id: 'o_plain_1', kind: 'event', title: 'Nine Days of Warning', emoji: '👀', era: [0, 2], once: true, weight: 2,
    req: { flags: { land_plain: 1 } },
    text: 'Scouts saw an army approaching. It will arrive in nine days. Everyone is extremely bored waiting.',
    choices: [
      { label: 'Prepare a perfect ambush', check: {
        base: 0.45, stats: { mil: 0.02 }, flags: { spies: 0.12, yeet: 0.08, custom_secret: 0.15 },
        success: { text: 'Nine days of preparation pay off. The army walks into a ditch, then a net, then a second ditch.', effect: { stats: { mil: 7 }, rival: { target: 'random', mil: -3 } } },
        fail: { text: 'Nine days was too long. Everyone fell asleep in the bushes.', effect: { stats: { mil: 1, joy: -2 } } },
      } },
      { label: 'Throw a welcome party', effect: { stats: { joy: 5, food: -3 }, flags: { party: 1 }, text: 'The army arrived to a buffet. Half of them stayed.' } },
      { label: 'Pack up and leave for nine days', effect: { stats: { gold: -3, pop: 2 } } },
    ],
  },
  {
    id: 'o_plain_2', kind: 'event', title: 'The Flat Earth Society', emoji: '📏', era: [3, 5], once: true, weight: 2,
    req: { flags: { land_plain: 1 } },
    text: 'Locally, the earth is flat. Scientists have measured it. Arguments with foreign scholars have become violent.',
    choices: [
      { label: 'Concede the round thing', effect: { stats: { sci: 6, joy: -2 } } },
      { label: 'Fund a flat expedition', outcomes: [
        { weight: 1, text: 'The expedition walked off one side and arrived from the other. They refuse to discuss it.', effect: { stats: { sci: 4, weird: 4 } } },
        { weight: 1, text: 'They found another flat country. It is very nice. You signed a treaty.', effect: { stats: { gold: 6 }, rival: { target: 'random', rel: 10 } } },
      ] },
    ],
  },
  {
    id: 'o_plain_3', kind: 'event', title: 'A Very Big Runway', emoji: '🛬', era: [6, 8], once: true, weight: 2,
    req: { flags: { land_plain: 1 } },
    text: 'Seen from orbit, {civ} looks like it was built specifically to land spaceships on.',
    choices: [
      { label: 'Paint "WELCOME" on it', effect: { stats: { joy: 3, weird: 4 }, flags: { alien_contact: 1 }, alienRel: 6, chain: { id: 'ch_f_welcome', delay: 2 } } },
      { label: 'Paint "NO" on it', effect: { stats: { mil: 4, joy: 3 }, threat: -2, alienRel: -4, chain: { id: 'ch_f_nosign', delay: 2 } } },
      { label: 'Build a launch strip', effect: { stats: { gold: -8, sci: 9 } } },
    ],
  },
];
