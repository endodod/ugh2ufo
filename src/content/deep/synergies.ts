// Synergy cards: each needs two or more storylines, origins, forms or governments at once.
import type { CardDef, CardKind, Choice, Cond, EraRange } from '../../types';

function s(id: string, era: EraRange, emoji: string, title: string, text: string, req: Cond, choices: Choice[], kind: CardKind = 'event'): CardDef {
  return { id: `d_s_${id}`, kind, era, emoji, title, text, req, choices, once: true };
}

export const synergyCards: CardDef[] = [
  s('cats_ducks', [1, 6], '🦆', 'The Pond Standoff', 'The palace cats and the duck senators have met at the palace pond. Nobody has blinked for six hours.', { flags: { cats: 2, ducks: 1 } }, [
    { label: 'Side with the cats', effect: { stats: { mil: 3, joy: -2 }, flags: { cats: 1, ducks: -1 }, text: 'The ducks file an appeal. In triplicate. With feathers.' } },
    { label: 'Side with the ducks', effect: { stats: { gold: 3 }, flags: { ducks: 1, bureaucracy: 1 }, text: 'The cats accept the verdict and push it off a table.' } },
    { label: 'Build a second pond', effect: { stats: { gold: -4, joy: 5 } } },
  ]),
  s('cult_gerald', [2, 7], '🪨', 'Gerald Joins the Choir', 'The moon cult has adopted Gerald as their hymn-stone. Gerald does not sing. The cult says this is the most beautiful part.', { flags: { cult: 2, gerald: 2 } }, [
    { label: 'Bless the arrangement', effect: { stats: { faith: 6, weird: 3 }, flags: { cult: 1, gerald: 1 } } },
    { label: 'Gerald belongs to the state', effect: { stats: { mil: 2, faith: -3 }, flags: { gerald: 1 } } },
  ]),
  s('bureau_hole', [2, 7], '📏', 'Permit for the Bottom', 'The hole has gone deeper than the maximum depth allowed by law. The diggers need a permit. The permit office is at the bottom.', { flags: { bureaucracy: 2, hole: 2 } }, [
    { label: 'Send a clerk down', effect: { stats: { gold: -2, sci: 3 }, flags: { hole: 1 }, text: 'The clerk returns in nine days, stamped and pale.', chain: { id: 'ch_f_clerk', delay: 3 } } },
    { label: 'Retroactively legalise the hole', effect: { stats: { gold: 3, joy: -1 }, flags: { bureaucracy: 1 } } },
    { label: 'Fine the hole', effect: { stats: { gold: 4, weird: 2 }, text: 'The hole does not pay. The hole is now in debt.' } },
  ]),
  s('frog_yeet', [2, 7], '🐸', 'Frog Launch', 'The sacred frog has climbed into the trebuchet of its own accord. It is looking at you. It is ready.', { flags: { god_frog: 1, yeet: 2 } }, [
    { label: 'Launch the god', outcomes: [
      { weight: 2, text: 'The frog lands on {rival}\'s temple and simply sits there. They convert within the week.', effect: { stats: { faith: 8, weird: 4 }, flags: { yeet: 1 }, rival: { target: 'random', rel: 10 } } },
      { weight: 1, text: 'The frog lands in a lake, far away. It seems happy. You have lost a god.', effect: { stats: { faith: -6, joy: 3 }, flags: { yeet: 1 } } },
    ] },
    { label: 'Gently lift it out', effect: { stats: { faith: 3 } } },
  ]),
  s('pigeons_cats', [2, 7], '🪟', 'The Window Ledge Accords', 'The pigeon air force and the cat cavalry have clashed over who controls window ledges. Both sides claim a historic right.', { flags: { pigeons: 2, cats: 2 } }, [
    { label: 'Ledges for pigeons, sills for cats', effect: { stats: { joy: 4, sci: 2 }, flags: { bureaucracy: 1 }, text: 'The Accords are the most complicated treaty in history and are 90% about the word "sill".' } },
    { label: 'Let them fight it out', effect: { stats: { mil: 4, joy: -3, weird: 2 }, flags: { cats: 1 } } },
  ]),
  s('bees_fungus', [2, 7], '🍯', 'Honey Mould', 'The bees and the mushrooms have started trading. The result is a glowing honey that lets you hear other people think.', { flags: { bees: 2, fungus: 2 } }, [
    { label: 'Eat it at state dinners', effect: { stats: { sci: 5, joy: -2, weird: 4 }, flags: { genes: 1 } } },
    { label: 'Sell it to {rival}', effect: { stats: { gold: 7 }, rival: { target: 'random', rel: 5 } } },
    { label: 'Separate them', effect: { stats: { food: 3 } } },
  ]),
  s('dance_grudge', [2, 7], '💃', 'The Spite Tango', 'The grudge keepers have learned to dance, purely so they can do it at people. It is a very angry tango.', { flags: { dance: 2, grudge: 2 } }, [
    { label: 'Weaponise the tango', effect: { stats: { mil: 5, joy: 2 }, flags: { grudge: 1, dance: 1 } } },
    { label: 'Make it a festival', effect: { stats: { joy: 6, gold: -2 }, flags: { party: 1 } } },
  ]),
  s('heads_gerald', [2, 7], '🗿', 'Gerald Meets the Heads', 'Gerald has been placed in front of the giant stone heads. The heads seem to be looking down at him. Gerald is not looking up.', { flags: { heads: 2, gerald: 2 } }, [
    { label: 'Let them talk', effect: { stats: { weird: 6, sci: 3 }, flags: { alien_contact: 1 }, text: 'Nobody hears anything. Afterwards, all the heads are facing slightly more to the left.' } },
    { label: 'Make Gerald their supervisor', effect: { stats: { faith: 4 }, flags: { gerald: 1, heads: 1 } } },
  ]),
  s('ducks_prophecy', [2, 7], '📜', 'The Prophecy Was About Ducks', 'Scholars have filled in the missing word of the prophecy. The missing word was "ducks". This changes everything.', { flags: { ducks: 2, prophecy: 2 } }, [
    { label: 'Re-read everything with ducks in it', effect: { stats: { faith: 6, weird: 3 }, flags: { prophecy: 1, ducks: 1 } } },
    { label: 'The ducks deny everything', effect: { stats: { gold: 3 }, flags: { bureaucracy: 1 }, text: 'Their lawyers deny it in a 400-page brief.' } },
  ]),
  s('spice_yeet', [3, 8], '🌶️', 'Pepper Artillery', 'The trebuchet crews and the pepper navy have combined forces. The result is a very hot cloud over {rival}.', { flags: { spice: 2, yeet: 2 } }, [
    { label: 'Fire', effect: { stats: { mil: 7 }, flags: { spice: 1, yeet: 1 }, rival: { target: 'hostile', rel: -15, mil: -5 } } },
    { label: 'Fire at the clouds, for rain', effect: { stats: { food: 5, weird: 3 }, text: 'It rains salsa for a week. Crops are confused but motivated.' } },
  ], 'rival'),
  s('mascot_catking', [2, 8], '🐕', 'Dog Mayor, Cat King', 'The beloved dog mayor and the cat monarch are both scheduled to open the new bridge. Only one ribbon has been ordered.', { flags: { mascot: 1 }, gov: ['cat_monarchy'] }, [
    { label: 'The cat cuts it', effect: { stats: { faith: 3, joy: -2 }, text: 'The cat knocks the scissors into the river and leaves. The bridge is open anyway.' } },
    { label: 'The dog cuts it', effect: { stats: { joy: 6 }, flags: { mascot: 1 }, text: 'The dog eats the ribbon. The crowd goes wild.' } },
    { label: 'Two bridges', effect: { stats: { gold: -5, joy: 4 } } },
  ]),
  s('turk_gerald', [3, 8], '♟️', 'Chess With a Rock', 'The chess automaton has challenged Gerald. Gerald has not moved in 31 days. The automaton is sweating oil.', { flags: { turk: 2, gerald: 2 } }, [
    { label: 'Declare Gerald the winner', effect: { stats: { faith: 4, weird: 4 }, flags: { gerald: 1 } } },
    { label: 'Check inside Gerald for a small man', effect: { stats: { sci: 4, joy: 2 }, flags: { turk: 1 }, text: 'There is no small man inside Gerald. This is somehow worse.' } },
  ]),
  s('robots_cats', [5, 8], '🔴', 'The Laser Pointer Incident', 'A robot was fitted with a laser for targeting. Every cat in the nation followed the dot. The dot was pointed at the treasury.', { flags: { robots: 2, cats: 2 } }, [
    { label: 'Point it at {rival} instead', effect: { stats: { mil: 6 }, flags: { cats: 1 }, rival: { target: 'random', rel: -10, mil: -3 } } },
    { label: 'Repair the treasury', effect: { stats: { gold: -6, joy: 3 } } },
    { label: 'Make it a national sport', effect: { stats: { joy: 7, weird: 3 }, flags: { party: 1 } } },
  ]),
  s('party_naps', [1, 8], '🛌', 'The Sleep Rave', 'Party culture and sacred naptime have merged. Everyone dances until noon, then sleeps on the dance floor until three.', { flags: { party: 2, custom_naps: 1 } }, [
    { label: 'Embrace it', effect: { stats: { joy: 7, gold: -3 }, flags: { party: 1 } } },
    { label: 'Charge for floor space', effect: { stats: { gold: 5, joy: 2 } } },
  ]),
  s('hole_heads', [3, 8], '⬇️', 'The Heads Go Down', 'Diggers in the hole have found the bottom of a giant stone head. It has a neck. The neck has shoulders. The shoulders keep going.', { flags: { hole: 2, heads: 2 } }, [
    { label: 'Keep digging', effect: { stats: { sci: 5, weird: 6 }, flags: { hole: 1, heads: 1 }, threat: -1 } },
    { label: 'Fill it in, quickly', effect: { stats: { joy: -2, faith: 3 } } },
  ]),
  s('contact_mascot', [6, 8], '🐶', 'The Selfie Request', 'The aliens have sent a single, carefully translated message. It asks whether they could have a picture with the dog.', { flags: { alien_contact: 1, mascot: 2 } }, [
    { label: 'Send the photo', effect: { stats: { joy: 5 }, flags: { mascot: 1 }, alienRel: 10, text: 'The reply is one hundred heart symbols and a coordinate.', chain: { id: 'ch_f_selfie', delay: 2 } } },
    { label: 'Demand money for the photo', effect: { stats: { gold: 8 }, alienRel: -3 } },
  ], 'alien'),
  s('cave_fungus', [1, 6], '🕯️', 'The Glowing Ceiling', 'The cave mushrooms have spread across the ceiling and now glow at night. The caves have, for the first time, a sky.', { flags: { land_cave: 1, fungus: 1 } }, [
    { label: 'Worship the new sky', effect: { stats: { faith: 5, joy: 3 }, flags: { fungus: 1 } } },
    { label: 'Read by it', effect: { stats: { sci: 5 } } },
  ]),
  s('sun_yeet', [3, 8], '☀️', 'Throw Something at the Sun', 'The launch engineers want to return a gift to the sun god. They want to return it very hard.', { flags: { god_sun: 1, yeet: 2 } }, [
    { label: 'Throw a golden statue', effect: { stats: { gold: -6, faith: 8 }, flags: { yeet: 1 }, text: 'It does not reach the sun. It reaches {rival}. They keep it.' } },
    { label: 'Throw a priest', outcomes: [
      { weight: 1, text: 'The priest returns three days later, tanned and enlightened.', effect: { stats: { faith: 10, weird: 4 } } },
      { weight: 1, text: 'The priest has not returned. The sun seems pleased.', effect: { stats: { faith: 6, pop: -1 } } },
    ] },
  ]),
  s('volcano_spice', [1, 7], '🌋', 'Lava Salsa', 'The pepper growers have planted on the slopes of the sacred volcano. The resulting chillies are classified as geology.', { flags: { god_volcano: 1, spice: 1 } }, [
    { label: 'Offer them to the volcano', effect: { stats: { faith: 6, food: -2 }, flags: { spice: 1 } } },
    { label: 'Arm the army with them', effect: { stats: { mil: 6, joy: -2 }, flags: { spice: 1 } } },
  ]),
  s('hats_ducks', [1, 7], '🎩', 'A Duck in a Hat', 'A duck senator has started wearing a hat. Under the hat laws, a hat makes you a person. Under duck law, he already was. He is now two people.', { flags: { custom_hats: 1, ducks: 1 } }, [
    { label: 'Give him two votes', effect: { stats: { joy: 4, weird: 3 }, flags: { ducks: 1 } } },
    { label: 'Tax both of him', effect: { stats: { gold: 5 }, flags: { bureaucracy: 1 } } },
  ]),
  s('shout_bees', [1, 7], '📣', 'The Loud Hive', 'Your bees have picked up the national habit of shouting. The waggle dance is now accompanied by yelling. Pollination is up.', { flags: { custom_shout: 1, bees: 1 } }, [
    { label: 'Bees may shout', effect: { stats: { food: 5, joy: -2 }, flags: { bees: 1 } } },
    { label: 'Indoor voices, bees', effect: { stats: { joy: 2, food: -1 } } },
  ]),
  s('goat_grudge', [1, 6], '🐐', 'The Founder Takes Offence', 'The goat war has reached the descendants of the founding goat. They are, after all, goats. They have chosen a side. It is theirs.', { flags: { founder_goat: 1, grudge: 1 } }, [
    { label: 'Apologise to the sacred goats', effect: { stats: { faith: 4, mil: -2 }, set: { grudge_forgiven: 1 } } },
    { label: 'The goats lead the grudge now', effect: { stats: { mil: 6, weird: 4 }, flags: { grudge: 1 } } },
  ]),
  s('tax_ducks', [2, 8], '🧾', 'The Duck Audit', 'The Auditor Above has turned its gaze on the duck senators. Their bread expenses are, frankly, extraordinary.', { flags: { god_tax: 1, ducks: 2 } }, [
    { label: 'Audit the ducks', effect: { stats: { gold: 6, faith: 2 }, flags: { ducks: -1 } } },
    { label: 'Bread is a sacred expense', effect: { stats: { faith: -2, joy: 3 }, flags: { ducks: 1 } } },
  ]),
  s('records_gerald', [2, 7], '📎', 'Gerald Has Never Filed', 'The record-keepers have discovered Gerald has never filed a single form. Gerald has been a council member for centuries.', { flags: { custom_records: 1, gerald: 1 } }, [
    { label: 'File on his behalf', effect: { stats: { sci: 3, gold: -2 }, flags: { bureaucracy: 1, gerald: 1 } } },
    { label: 'Exempt all rocks', effect: { stats: { weird: 4, gold: -3 }, text: 'Within a week, nine citizens claim to be rocks.' } },
  ]),
  s('child_mascot', [1, 6], '👶', 'The Child Wants the Dog', 'The child ruler has decided the dog mayor should live in the palace. The dog mayor has decided the same thing.', { flags: { founder_child: 1, mascot: 1 } }, [
    { label: 'Merge the offices', effect: { stats: { joy: 8, gold: -3 }, flags: { mascot: 1 } } },
    { label: 'Weekends only', effect: { stats: { joy: 3 } } },
  ]),
  s('cat_pope', [2, 7], '😼', 'The Cat Pope', 'The holy cats have chosen a supreme pontiff. It is the fattest one. Its first decree was to be fed.', { flags: { god_cat: 1, cats: 3 } }, [
    { label: 'Feed the Pope', effect: { stats: { food: -5, faith: 9 }, flags: { cats: 1 } } },
    { label: 'Put the Pope on a diet', effect: { stats: { faith: -4, food: 3, joy: -2 }, text: 'The Pope has issued an excommunication. It is for you.' } },
  ]),
  s('swamp_fungus', [2, 7], '🫧', 'The Swamp Gets a Brain', 'The swamp gas and the mycelium have combined. The swamp is now able to hold a conversation. It mostly complains about smell.', { flags: { land_swamp: 1, fungus: 2 } }, [
    { label: 'Give the swamp a council seat', effect: { stats: { weird: 6, sci: 3 }, flags: { fungus: 1 } } },
    { label: 'Drain it a little', effect: { stats: { food: 4, joy: -2 } } },
  ]),
  s('island_pigeons', [1, 6], '🏝️', 'The Pigeons Found the Edge', 'The pigeon postal service has delivered the news: the island is small. Very small. They are surprised you did not know.', { flags: { land_island: 1, pigeons: 2 } }, [
    { label: 'Send them to find more islands', effect: { stats: { gold: 4, sci: 3 }, flags: { pigeons: 1 }, chain: { id: 'ch_f_islands', delay: 3 } } },
    { label: 'Ignore the news', effect: { stats: { joy: 3 } } },
  ]),
  s('tundra_grudge', [1, 7], '🧊', 'The Frozen Grudges', 'In the tundra nothing rots, including grudges. The grudge keepers have found one from the Stone Age, perfectly preserved.', { flags: { land_tundra: 1, grudge: 2 } }, [
    { label: 'Thaw it out and use it', effect: { stats: { mil: 6, joy: -3 }, flags: { grudge: 1 }, rival: { target: 'random', rel: -10 } } },
    { label: 'Put it in a museum', effect: { stats: { joy: 3, sci: 2 } } },
  ]),
  s('volcano_yeet', [3, 8], '🌋', 'The Volcano Cannon', 'Engineers propose aiming the volcano. Not using it, exactly. Just aiming it.', { flags: { land_volcano: 1, yeet: 2 } }, [
    { label: 'Aim it at the sky', effect: { stats: { mil: 8, gold: -5 }, flags: { yeet: 1 }, threat: -2 } },
    { label: 'Aim it at {rival}', effect: { stats: { mil: 5, faith: -2 }, rival: { target: 'hostile', rel: -20, mil: -6 } } },
  ]),
  s('lights_heads', [2, 8], '✨', 'The Heads Point Up', 'Every giant stone head has turned to face the blinking sky lights. The lights have started blinking back, in time.', { flags: { god_lights: 1, heads: 2 } }, [
    { label: 'Blink with them', effect: { stats: { faith: 5 }, flags: { alien_contact: 1, heads: 1 }, alienRel: 5 } },
    { label: 'Cover the heads with sheets', effect: { stats: { joy: -2, mil: 2 }, threat: -1 } },
  ]),
  s('probe_robots', [4, 8], '🤖', 'Dad Is Back Online', 'The metal man who founded {civ} has rebooted, thanks to your robotics programme. He has 11,000 years of unread messages.', { flags: { founder_probe: 1, robots: 2 } }, [
    { label: 'Ask what he was doing here', effect: { stats: { sci: 8, weird: 4 }, flags: { alien_contact: 1 }, threat: 2, text: 'He was a scout. He has sent the report. He seems sorry.' } },
    { label: 'Ask him to stay offline', effect: { stats: { faith: 4, sci: 3 }, threat: -2 } },
  ]),
  s('polite_grudge', [1, 7], '🙇', 'The Apology War', 'The grudge keepers are bound by the national politeness. Every insult must now be followed by an apology. The goat war has slowed to a crawl.', { flags: { custom_polite: 1, grudge: 1 } }, [
    { label: 'Apologise first, for once', effect: { stats: { joy: 5, mil: -2 }, set: { grudge_forgiven: 1 } } },
    { label: 'Weaponise apologies', effect: { stats: { mil: 4, joy: 2 }, flags: { grudge: 1 }, text: 'Our apologies are so sincere the enemy feels terrible about everything.' } },
  ]),
  s('late_prophecy', [1, 7], '⏳', 'The Prophecy Is Running Late', 'The prophecy said the sign would come "soon". Being {civ}, everyone assumed that meant centuries. It came on time. Nobody was ready.', { flags: { custom_late: 1, prophecy: 1 } }, [
    { label: 'Pretend we meant to be late', effect: { stats: { faith: 4, joy: 2 }, flags: { prophecy: 1 } } },
    { label: 'Reschedule the prophecy', effect: { stats: { gold: -3, joy: 3 }, flags: { bureaucracy: 1 } } },
  ]),
  s('dave_gerald', [1, 6], '🧔', 'Dave Meets Gerald', 'Dave, who may be a god, has met Gerald, who may be a rock. They have been sitting together quietly for days. People bring snacks.', { flags: { god_dave: 1, gerald: 1 } }, [
    { label: 'Make it a pilgrimage', effect: { stats: { faith: 6, gold: 3 }, flags: { gerald: 1 } } },
    { label: 'Ask Dave what Gerald thinks', effect: { stats: { weird: 4, sci: 2 }, text: 'Dave says Gerald thinks "it\'s fine". Dave says that about everything.' } },
  ]),
  s('gorb_bureau', [1, 7], '🪪', 'Gorb v. Gorb', 'A lawsuit has been filed by Gorb against Gorb. The bureaucracy has 400,000 files named Gorb and cannot find the right one.', { flags: { custom_names: 1, bureaucracy: 2 } }, [
    { label: 'Give everyone a number', effect: { stats: { sci: 4, joy: -4 }, flags: { bureaucracy: 1 } } },
    { label: 'Rule in favour of Gorb', effect: { stats: { joy: 5, weird: 2 }, text: 'Gorb is delighted. So is Gorb.' } },
  ]),
  s('theo_cult', [2, 7], '⛪', 'Two Churches, One Moon', 'The state church and the moon cult are arguing about whose moon it is. The moon has declined to comment.', { flags: { cult: 2 }, gov: ['theocracy'] }, [
    { label: 'Merge the churches', effect: { stats: { faith: 8, sci: -2 }, flags: { cult: 1 }, gov: 'cult_state' } },
    { label: 'Split the moon by phase', effect: { stats: { faith: 4, joy: 2 }, flags: { bureaucracy: 1 } } },
  ]),
  s('demo_ducks', [3, 8], '🗳️', 'The Duck Vote', 'In a free and fair election, the ducks have won 51% of the seats. Humans are demanding a recount. The ducks have provided one. It is also 51%.', { flags: { ducks: 2 }, gov: ['democracy', 'republic'] }, [
    { label: 'Respect democracy', effect: { stats: { joy: 3, gold: -3, weird: 4 }, flags: { ducks: 1 } } },
    { label: 'Raise the voting age to "must be a person"', effect: { stats: { joy: -4, mil: 2 }, text: 'The ducks have filed suit. They have very good lawyers.' } },
  ]),
  s('ai_cats', [6, 8], '🖥️', 'The AI Fears Cats', 'The AI overlord has stopped every cat-related policy. When asked why, it replied: "They walk on the keyboard. They do it on purpose."', { flags: { cats: 2 }, gov: ['ai_overlord'] }, [
    { label: 'Negotiate a cat-free server room', effect: { stats: { sci: 5, joy: -2 } } },
    { label: 'Release the cats', effect: { stats: { joy: 5, weird: 4 }, flags: { cats: 1 }, gov: 'cat_monarchy', text: 'The cats take the server room in nine minutes. The new ruler is asleep on the warm part.' } },
  ]),
  s('anarchy_bureau', [2, 8], '🏴', 'Anarchist Paperwork', 'Anarchy has been declared. The bureaucracy is still processing it. Abolishing the state requires Form 1, which nobody can approve.', { flags: { bureaucracy: 2 }, gov: ['anarchy'] }, [
    { label: 'Approve it yourself', effect: { stats: { joy: 4, gold: -3 }, flags: { bureaucracy: -1 } } },
    { label: 'Let the clerks run things, informally', effect: { stats: { gold: 4, joy: -2 }, gov: 'bureaucracy_state' } },
  ]),
  s('empire_mascot', [2, 8], '🦅', 'Emperor Good Boy', 'The empire\'s generals would like the dog mayor to inspect the troops. The dog mayor would like everyone to throw the ball.', { flags: { mascot: 2 }, gov: ['empire', 'monarchy'] }, [
    { label: 'Throw the ball, troops', effect: { stats: { mil: 4, joy: 6 }, flags: { mascot: 1 } } },
    { label: 'Make the dog a field marshal', effect: { stats: { mil: 7, sci: -2 }, rival: { target: 'random', rel: 5 }, text: 'The enemy refuses to fight a dog. Morale is at an all-time high.' } },
  ]),
  s('hive_party', [4, 8], '🐝', 'The Hive Throws a Party', 'The hive mind has decided to have fun. All at once. Every citizen laughed at the same joke at the same second.', { flags: { party: 2 }, gov: ['hive_mind'] }, [
    { label: 'Do it again', effect: { stats: { joy: 10, sci: -2 }, flags: { party: 1 } } },
    { label: 'Schedule fun quarterly', effect: { stats: { joy: 4, sci: 2 }, flags: { bureaucracy: 1 } } },
  ]),
  s('corp_prophecy', [5, 8], '📈', 'Prophecy Futures', 'The exchange now trades contracts on prophecies coming true. The end of the world is trading at a three per cent premium.', { flags: { prophecy: 2 }, gov: ['corporatocracy'] }, [
    { label: 'Short the apocalypse', effect: { stats: { gold: 10, faith: -3 }, threat: 1 } },
    { label: 'Go long on beans', effect: { stats: { gold: 4, food: 4 }, flags: { prophecy: 1 } } },
  ]),
  s('crown_gerald', [2, 7], '👑', 'Crowning a Rock', 'The royal family has died out. The law says the crown passes to the eldest member of the council. That is Gerald.', { flags: { gerald: 2 }, gov: ['monarchy', 'chiefdom'] }, [
    { label: 'Long live King Gerald', effect: { stats: { faith: 5, joy: 3, gold: -2 }, flags: { gerald: 1 }, text: 'The reign is calm. Historians call it the most stable period on record.' } },
    { label: 'Find a cousin, any cousin', effect: { stats: { gold: -4, mil: 2 } } },
  ]),
  s('bees_spice', [2, 7], '🔥', 'Hot Honey', 'The bees have been at the chilli fields. The honey is now hot enough to be filed under weapons.', { flags: { bees: 1, spice: 2 } }, [
    { label: 'Sell it as a delicacy', effect: { stats: { gold: 6, joy: 3 }, flags: { bees: 1 } } },
    { label: 'Smear it on the walls', effect: { stats: { mil: 5 }, flags: { spice: 1 } } },
  ]),
  s('turk_robots', [5, 8], '🧍', 'The Robot Hires a Man', 'One of the new robots has quietly hired a small man to sit inside it. It says it "feels more authentic this way".', { flags: { turk: 2, robots: 2 } }, [
    { label: 'Allow it', effect: { stats: { joy: 4, weird: 4 }, flags: { turk: 1, robots: 1 } } },
    { label: 'Unionise the men inside', effect: { stats: { gold: -4, joy: 5 }, flags: { bureaucracy: 1 } } },
  ]),
  s('hole_fungus', [2, 8], '🍄', 'Things Grow at the Bottom', 'Mushrooms are growing up the walls of the hole from below. They are growing faster than anyone can dig.', { flags: { hole: 2, fungus: 2 } }, [
    { label: 'Follow them down', effect: { stats: { sci: 4, weird: 5 }, flags: { hole: 1, fungus: 1 } } },
    { label: 'Harvest the walls', effect: { stats: { food: 7 } } },
  ]),
  s('dance_pigeons', [2, 7], '🐦', 'The Pigeon Strut', 'The pigeons have adopted the national dance. They were already doing most of it. Now they do it in formation.', { flags: { dance: 2, pigeons: 2 } }, [
    { label: 'Open an aerial ballet', effect: { stats: { joy: 6, gold: -2 }, flags: { dance: 1, pigeons: 1 } } },
    { label: 'Use the strut as code', effect: { stats: { mil: 3, sci: 3 } } },
  ]),
  s('yeet_ducks', [3, 8], '⚖️', 'The Duck Launch Case', 'Someone launched a duck. The duck lawyers have sued the entire launch programme. The duck flew there itself, which complicates things.', { flags: { yeet: 2, ducks: 2 } }, [
    { label: 'Settle out of court', effect: { stats: { gold: -6, joy: 2 } } },
    { label: 'Fight it to the Supreme Duck Court', outcomes: [
      { weight: 1, text: 'You lose. Every trebuchet must now carry a duck-sized parachute.', effect: { stats: { gold: -4, weird: 3 }, flags: { ducks: 1 } } },
      { weight: 1, text: 'You win on a technicality: ducks can fly, so they were never "launched".', effect: { stats: { mil: 4, joy: 3 }, flags: { yeet: 1 } } },
    ] },
  ]),
  s('heads_prophecy', [3, 8], '🗣️', 'The Heads Read Aloud', 'At midnight, the giant stone heads opened their mouths and recited the prophecy. Including the missing word. Which was not "beans".', { flags: { heads: 2, prophecy: 2 } }, [
    { label: 'Write it down', effect: { stats: { sci: 4, faith: 4 }, flags: { prophecy: 1, alien_contact: 1 } } },
    { label: 'Pretend we heard "beans"', effect: { stats: { food: 5, faith: 2 }, flags: { prophecy: 1 } } },
  ]),
  s('contact_grudge', [6, 8], '📡', 'The Grudge Transmission', 'The grudge keepers have learned the aliens are listening. They have started broadcasting a complete list of complaints.', { flags: { alien_contact: 1, grudge: 3 } }, [
    { label: 'Let them broadcast', effect: { stats: { mil: 4 }, flags: { grudge: 1 }, alienRel: -8, text: 'The aliens have started a list of their own.', chain: { id: 'ch_f_grudgecast', delay: 2 } } },
    { label: 'Broadcast an apology instead', effect: { stats: { joy: 2, faith: 3 }, alienRel: 8, set: { grudge_forgiven: 1 }, chain: { id: 'ch_f_apology', delay: 2 } } },
  ], 'alien'),
  s('genes_cats', [5, 8], '🐈‍⬛', 'The Fifty-Kilo House Cat', 'The gene labs have made a house cat the size of a small horse. It still fits in boxes. Nobody knows how.', { flags: { genes: 2, cats: 2 } }, [
    { label: 'Make more', effect: { stats: { mil: 6, food: -5 }, flags: { cats: 1, genes: 1 } } },
    { label: 'Study the box thing', effect: { stats: { sci: 7, weird: 4 } } },
  ]),
  s('genes_ducks', [5, 8], '🦆', 'A Duck With Hands', 'The gene labs have given a duck senator hands. He has used them to sign 900 bills in one afternoon.', { flags: { genes: 2, ducks: 2 } }, [
    { label: 'Hands for all ducks', effect: { stats: { gold: 4, weird: 5 }, flags: { ducks: 1, bureaucracy: 1 } } },
    { label: 'Take the hands back', effect: { stats: { joy: -3, sci: 2 }, text: 'He uses them one last time, to make a rude gesture.' } },
  ]),
  s('cult_hole', [2, 8], '🌑', 'A Moon at the Bottom', 'The moon cult has descended into the hole and come back with news: there is another moon down there. Smaller. Paler. Lonelier.', { flags: { cult: 2, hole: 2 } }, [
    { label: 'Worship both moons', effect: { stats: { faith: 7, weird: 4 }, flags: { cult: 1, hole: 1 } } },
    { label: 'Leave the lower moon alone', effect: { stats: { joy: -1, sci: 2 } } },
  ]),
  s('pigeons_mascot', [2, 7], '🐕', 'The Dog Chases the Air Force', 'The dog mayor has spent the morning chasing the pigeon air force around the square. The pigeons say it is "fine" and "fun", tightly.', { flags: { pigeons: 2, mascot: 1 } }, [
    { label: 'Make it a daily drill', effect: { stats: { mil: 4, joy: 4 } } },
    { label: 'Leash law for mayors', effect: { stats: { joy: -3 }, flags: { pigeons: 1 } } },
  ]),
  s('party_grudge', [2, 8], '🎉', 'The Grudge Party', 'The party committee and the grudge keepers have organised a joint event: everyone brings a grudge, and everyone leaves with a different one.', { flags: { party: 2, grudge: 2 } }, [
    { label: 'Swap grudges', effect: { stats: { joy: 6, mil: 2 }, flags: { party: 1 } } },
    { label: 'Burn them all on a bonfire', effect: { stats: { joy: 8, mil: -3 }, set: { grudge_forgiven: 1 } } },
  ]),
  s('wizard_contact', [5, 8], '🧙', 'The Wizard Was Real', 'Records reveal the founding wizard\'s "magic" matches alien technology exactly. His hat was a receiver. His stick was a remote.', { flags: { founder_wizard: 1, alien_contact: 1 } }, [
    { label: 'Find the stick', effect: { stats: { sci: 8, weird: 5 }, alienRel: 4 } },
    { label: 'Keep believing in magic', effect: { stats: { faith: 6, joy: 3 } } },
  ]),
  s('dance_law', [1, 6], '💃', 'Two Dance Laws', 'Dance-off justice and the dance craze have collided. Two dance laws now contradict each other. A dance-off to decide which applies is under way.', { flags: { custom_dance: 1, dance: 2 } }, [
    { label: 'Let the best dance win', effect: { stats: { joy: 6, mil: 2 }, flags: { dance: 1 } } },
    { label: 'Write it down instead', effect: { stats: { sci: 3, joy: -4 }, flags: { bureaucracy: 1 } } },
  ]),
  s('crater_heads', [2, 8], '☄️', 'The Heads Face the Crater', 'The giant stone heads have been rotating, very slowly, to face the centre of the crater. The rocks there have started humming in harmony.', { flags: { land_crater: 1, heads: 2 } }, [
    { label: 'Sing along', effect: { stats: { faith: 4, weird: 4 }, flags: { alien_contact: 1 }, alienRel: 4 } },
    { label: 'Put the heads back', effect: { stats: { mil: 2, gold: -3 } } },
  ]),
  s('tide_ducks', [6, 8], '🦆', 'The Floating Class', 'Since {civ} moved under the sea, the ducks have become the upper class. They float above everyone. They are insufferable about it.', { flags: { form_tide: 1, ducks: 1 } }, [
    { label: 'Accept duck nobility', effect: { stats: { gold: 4, joy: -2 }, flags: { ducks: 1 } } },
    { label: 'Teach the ducks to dive', effect: { stats: { joy: 4, weird: 2 } } },
  ]),
  s('ghost_ancestors', [6, 8], '👵', 'Grandma Was Right', 'Now that everyone is dead, the ancestors are insufferable. They told you so. They told you all of this.', { flags: { form_ghost: 1, god_ancestors: 1 } }, [
    { label: 'Admit it', effect: { stats: { faith: 8, joy: 2 } } },
    { label: 'Haunt them back', effect: { stats: { weird: 6, mil: 3 } } },
  ]),
  s('turtle_back', [6, 8], '🐢', 'Margaret Has a Mother', 'The turtle {civ} lives on has met a much larger turtle. Margaret is, it turns out, the baby.', { flags: { form_turtle: 1, land_back: 1 } }, [
    { label: 'Move onto the mother', effect: { stats: { pop: 4, mil: 4, gold: -5 }, threat: -2 } },
    { label: 'Stay loyal to Margaret', effect: { stats: { faith: 6, joy: 4 } } },
  ]),
  s('upload_gerald', [7, 8], '💾', 'Gerald Refuses to Upload', 'Everyone has been uploaded except Gerald. He is the last physical citizen. He seems fine with it.', { flags: { form_upload: 1, gerald: 1 } }, [
    { label: 'Leave Gerald as caretaker', effect: { stats: { faith: 4, mil: 4 }, flags: { gerald: 1 } } },
    { label: 'Scan him anyway', effect: { stats: { sci: 5, weird: 5 }, text: 'The scan of Gerald is a single, perfect gray pixel.' } },
  ]),
  s('spore_bees', [6, 8], '🐝', 'The Bloom Meets the Hive', 'The fungal network and the bee hive-mind have both noticed each other. They are having the longest, quietest conversation in history.', { flags: { form_spore: 1, bees: 2 } }, [
    { label: 'Let them merge', effect: { stats: { sci: 6, mil: 4, weird: 4 }, flags: { genes: 1, bees: 1 } } },
    { label: 'Keep them in separate rooms', effect: { stats: { joy: 2, food: 3 } } },
  ]),
  s('lunar_yeet', [7, 8], '🌕', 'Throw Earth a Postcard', 'From the moon, the launch crews have discovered that low gravity is very good for throwing things at Earth.', { flags: { form_lunar: 1, yeet: 2 } }, [
    { label: 'Throw rocks at the invaders', effect: { stats: { mil: 10 }, flags: { yeet: 1 }, threat: -3 } },
    { label: 'Throw postcards home', effect: { stats: { joy: 6 } } },
  ]),
  s('tower_bureau', [6, 8], '🗂️', 'The Floor Permit', 'Moving between floors of the Building now requires a permit, issued on the floor you want to go to.', { flags: { form_tower: 1, bureaucracy: 2 } }, [
    { label: 'Accept it', effect: { stats: { gold: 5, joy: -3 }, flags: { bureaucracy: 1 } } },
    { label: 'Abolish the stairs office', effect: { stats: { joy: 4, gold: -2 } } },
  ]),
  s('dream_frog', [6, 8], '🐸', 'The Frog Is the Dreamer', 'The sages are now certain: the god whose dream you live in is the sacred frog. It is large. In the dream, it is larger.', { flags: { form_dream: 1, god_frog: 1 } }, [
    { label: 'Thank the frog', effect: { stats: { faith: 8, weird: 4 } } },
    { label: 'Ask for a bigger pond', effect: { stats: { food: 6, joy: 3 } } },
  ]),
];
