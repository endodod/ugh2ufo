// Extra events, history, rival and alien cards, weighted towards thin early and late eras.
import type { CardDef, CardKind, Choice, Cond, EraRange } from '../../types';

function e(id: string, kind: CardKind, era: EraRange, emoji: string, title: string, text: string, choices: Choice[], req?: Cond): CardDef {
  return { id: `d_e_${id}`, kind, era, emoji, title, text, choices, once: true, ...(req ? { req } : {}) };
}

export const eventCards: CardDef[] = [
  // Stone
  e('tar_pit', 'event', [0, 0], '🦣', 'Mammoth in the Tar', 'A mammoth is stuck in the tar pit. It is a lot of food. It is also a lot of very angry mammoth.', [
    { label: 'Wait for it to tire', effect: { stats: { food: 8, joy: -1 } } },
    { label: 'Help it out', effect: { stats: { joy: 4, faith: 2 }, text: 'The mammoth leaves. It visits sometimes. It brings nothing.' } },
    { label: 'Jump on it', outcomes: [
      { weight: 1, text: 'Glorious. Songs will be sung.', effect: { stats: { food: 10, mil: 3 } } },
      { weight: 1, text: 'Now there are two things stuck in the tar.', effect: { stats: { pop: -1, joy: -3 } } },
    ] },
  ]),
  e('first_joke', 'history', [0, 0], '😂', 'The First Joke', 'Ugg has told the first joke in history. It was about a rock. Nobody laughed, but three people made a strange noise they cannot explain.', [
    { label: 'Make him tell it again', effect: { stats: { joy: 5 } } },
    { label: 'Ban jokes, they are frightening', effect: { stats: { faith: 3, joy: -3, mil: 1 } } },
  ]),
  e('big_bird', 'event', [0, 1], '🦅', 'The Bird Took a Child', 'A very large bird took a child away. It brought the child back an hour later, apparently unimpressed.', [
    { label: 'Worship the bird', effect: { stats: { faith: 4, weird: 2 } } },
    { label: 'Build roofs', effect: { stats: { sci: 3, gold: -1 } } },
  ]),
  e('flint_strike', 'event', [0, 1], '🪓', 'The Flint Strike', 'The flint-knappers have stopped knapping. They want two extra berries a day and a name for their trade.', [
    { label: 'Give them the berries', effect: { stats: { food: -3, mil: 3, joy: 2 } } },
    { label: 'Knap it yourself', effect: { stats: { mil: 1, pop: -1 }, text: 'You have nine fingers now. The knappers are smug.' } },
  ]),
  e('cave_echo', 'event', [0, 1], '🗯️', 'The Echo', 'A cave has started repeating everything people say. The elders think it is a god. The children think it is hilarious.', [
    { label: 'Ask it questions', effect: { stats: { faith: 3, weird: 2 } } },
    { label: 'Shout rude words into it', effect: { stats: { joy: 5, faith: -1 } } },
  ]),
  e('winter_long', 'event', [0, 1], '❄️', 'The Long Winter', 'Winter has lasted five months and shows no sign of stopping. The fire is the only thing anyone talks about.', [
    { label: 'Eat the seed grain', effect: { stats: { food: 5, joy: -2 }, text: 'Next year is next year\'s problem.' } },
    { label: 'Huddle and tell stories', effect: { stats: { joy: 3, food: -3, faith: 2 } } },
    { label: 'Raid {rival}\'s stores', effect: { stats: { food: 6, mil: -1 }, rival: { target: 'random', rel: -15 } } },
  ]),
  e('star_fall', 'alien', [0, 1], '🌠', 'A Star Fell Down', 'A star fell from the sky and landed warm in the berry patch. It is round, smooth, and occasionally beeps.', [
    { label: 'Carry it to the shrine', effect: { stats: { faith: 5, weird: 3 }, alienRel: 3 } },
    { label: 'Hit it with a rock', outcomes: [
      { weight: 1, text: 'It stops beeping. Somewhere very far away, someone writes that down.', effect: { stats: { mil: 2 }, threat: 2 } },
      { weight: 1, text: 'It opens. Inside: a tiny, very polite light that leaves immediately.', effect: { stats: { sci: 4, weird: 2 }, alienRel: 2 } },
    ] },
  ]),
  e('neighbour_fire', 'rival', [0, 1], '🔥', 'Fire Next Door', '{rival} has discovered fire. Our fire. They took some of ours while we were asleep.', [
    { label: 'They can keep it', effect: { stats: { joy: 2 }, rival: { target: 'random', rel: 10 } } },
    { label: 'Demand rent on the fire', effect: { stats: { gold: 3 }, rival: { target: 'random', rel: -8 } } },
  ]),
  // Bronze
  e('scribe_typo', 'history', [1, 2], '✍️', 'The First Typo', 'A scribe carved "king" as "kink" on the royal stele. It is carved in stone. It is staying.', [
    { label: 'Laugh it off', effect: { stats: { joy: 4, faith: -1 } } },
    { label: 'Execute the scribe', effect: { stats: { mil: 2, sci: -2, joy: -3 } } },
    { label: 'Insist it was always the title', effect: { stats: { weird: 4, gold: 2 } } },
  ]),
  e('chariot_race', 'event', [1, 2], '🏇', 'The Chariot Rivalry', 'The Blues and the Greens chariot teams have fans so loyal they have started small wars between races.', [
    { label: 'Back the Blues', effect: { stats: { joy: 4, mil: 2, gold: -1 } } },
    { label: 'Ban team colours', effect: { stats: { joy: -4, gold: 2 } } },
    { label: 'Bet on both', effect: { stats: { gold: 5, joy: -1 } } },
  ]),
  e('bronze_shortage', 'event', [1, 1], '🥉', 'The Tin Shortage', 'There is no tin. Without tin there is no bronze. Without bronze there is, apparently, no age.', [
    { label: 'Trade for tin abroad', effect: { stats: { gold: -4, mil: 3 }, rival: { target: 'friendliest', rel: 6 } } },
    { label: 'Go back to rocks, briefly', effect: { stats: { mil: -2, joy: -1, weird: 2 } } },
  ]),
  e('flood_myth', 'history', [1, 2], '🌊', 'The Flood Story', 'Someone has written down a story about a great flood. Every other civilisation seems to have the same one. That is suspicious.', [
    { label: 'Build a boat, just in case', effect: { stats: { gold: -3, faith: 3, food: 2 } } },
    { label: 'Accuse the others of copying', effect: { stats: { joy: 2 }, rival: { target: 'random', rel: -6 } } },
  ]),
  e('tax_cat', 'event', [1, 2], '😺', 'The Tax Collector\'s Cat', 'The royal tax collector has been replaced by his cat, and nobody has noticed. Revenue is up.', [
    { label: 'Keep the cat', effect: { stats: { gold: 4, weird: 2 }, flags: { cats: 1 } } },
    { label: 'Find the tax collector', effect: { stats: { gold: 1 }, text: 'He is in the cat\'s basket. He seems happy.' } },
  ]),
  e('envoy_gift', 'rival', [1, 3], '🎁', 'A Suspicious Gift', '{rival} has sent a large wooden horse as a gift. It is nicely made. It is breathing.', [
    { label: 'Bring it inside', outcomes: [
      { weight: 1, text: 'It was full of soldiers. It was also full of snacks. Mixed feelings.', effect: { stats: { mil: -4, food: 3 } } },
      { weight: 1, text: 'It is just a horse. A real one, dressed as a wooden one.', effect: { stats: { joy: 4, weird: 3 } } },
    ] },
    { label: 'Set it on fire', effect: { stats: { mil: 2 }, rival: { target: 'same', rel: -10 } } },
    { label: 'Send it back with a bow', effect: { stats: { joy: 2 }, rival: { target: 'same', rel: 5 }, chain: { id: 'ch_f_horse', delay: 2 } } },
  ]),
  e('sky_chariot', 'alien', [1, 2], '🛸', 'The Fiery Chariot', 'A fiery chariot crossed the sky at noon, stopped, reversed slightly, and then left. As if it had taken a wrong turn.', [
    { label: 'Write it in the holy book', effect: { stats: { faith: 5 }, alienRel: 2 } },
    { label: 'Write down its route', effect: { stats: { sci: 4 }, flags: { alien_contact: 1 } } },
  ]),
  // Classical
  e('philosopher_bath', 'history', [2, 3], '🛁', 'Eureka, Unfortunately', 'A philosopher ran naked through the streets shouting about bathwater. It turns out he solved something important.', [
    { label: 'Fund his baths', effect: { stats: { sci: 5, gold: -2 } } },
    { label: 'Give him a towel', effect: { stats: { joy: 3, sci: 2 } } },
  ]),
  e('oracle_vague', 'event', [2, 3], '🔮', 'The Oracle Was Vague', 'The oracle says "a great nation will fall". She will not say which. Both armies are packing.', [
    { label: 'Assume it is {rival}', effect: { stats: { mil: 4, faith: 2 }, rival: { target: 'random', rel: -8 } } },
    { label: 'Ask for a refund', effect: { stats: { gold: 3, faith: -3 } } },
    { label: 'Stay home and wait', effect: { stats: { joy: -2, food: 3 } } },
  ]),
  e('marathon', 'event', [2, 3], '🏃', 'The Messenger Ran Too Far', 'A messenger ran 42 kilometres to deliver news of victory, and then collapsed. People have decided to do this for fun now.', [
    { label: 'Hold an annual race', effect: { stats: { joy: 5, mil: 1, gold: -2 } } },
    { label: 'Buy a horse', effect: { stats: { gold: -2, sci: 2 } } },
  ]),
  e('road_everywhere', 'event', [2, 3], '🛣️', 'All Roads Lead Here', 'The roads have been built so well that all of them lead to the capital. Including the ones that were meant to lead out of it.', [
    { label: 'Charge tolls', effect: { stats: { gold: 6, joy: -2 } } },
    { label: 'Build one road out', effect: { stats: { gold: -3, sci: 2, pop: 1 } } },
  ]),
  e('elephant_alps', 'rival', [2, 3], '🐘', 'Elephants Over the Mountains', '{rival} has marched war elephants across the mountains. The elephants are cold, confused and very large.', [
    { label: 'Fight the elephants', effect: { stats: { mil: -3, food: 4 }, rival: { target: 'same', mil: -4, rel: -10 } } },
    { label: 'Offer the elephants asylum', effect: { stats: { mil: 4, food: -4, joy: 3 }, rival: { target: 'same', rel: -15 } } },
  ]),
  e('toga_crisis', 'event', [2, 2], '👘', 'The Toga Crisis', 'A senator wore a purple toga. Only the emperor may wear purple. The emperor is not sure he wants to fight about it.', [
    { label: 'Purple for all', effect: { stats: { joy: 5, gold: -3 } } },
    { label: 'Exile the senator', effect: { stats: { mil: 2, joy: -2 } } },
  ]),
  // Medieval
  e('dancing_bear', 'event', [3, 4], '🐻', 'The Dancing Bear Revolt', 'The dancing bears have stopped dancing and started negotiating. Their leader is surprisingly articulate.', [
    { label: 'Hear them out', effect: { stats: { joy: 3, weird: 3, gold: -2 } } },
    { label: 'Hire them as guards', effect: { stats: { mil: 5, food: -3 } } },
  ]),
  e('monk_beer', 'event', [3, 4], '🍻', 'Monk Beer', 'The monks have been brewing beer to pass the time. It is very strong. The prayers have become louder and less accurate.', [
    { label: 'Tax the beer', effect: { stats: { gold: 5, faith: -1 } } },
    { label: 'Make it holy', effect: { stats: { faith: 4, joy: 4, sci: -1 } } },
  ]),
  e('witch_trial', 'event', [3, 4], '🧹', 'The Witch Trial', 'A woman stands accused of witchcraft because her cabbages are better than everyone else\'s.', [
    { label: 'Acquit, buy her cabbages', effect: { stats: { food: 4, joy: 2, sci: 2 } } },
    { label: 'Make her Minister of Cabbages', effect: { stats: { food: 6, weird: 3 } } },
    { label: 'Let the mob decide', effect: { stats: { faith: 3, joy: -4, food: -2 } } },
  ]),
  // Renaissance
  e('flying_machine', 'event', [4, 5], '🪽', 'The Flying Machine', 'A genius has drawn a flying machine. He also drew a tank, a submarine, and a very detailed horse he never finished.', [
    { label: 'Build the flying machine', outcomes: [
      { weight: 1, text: 'It flies for nine seconds. Nine glorious seconds.', effect: { stats: { sci: 7, joy: 3 } } },
      { weight: 1, text: 'It does not fly. It goes down the hill very fast, which is also something.', effect: { stats: { sci: 3, pop: -1 } } },
    ] },
    { label: 'Ask him to finish the horse', effect: { stats: { joy: 4, faith: 2 }, chain: { id: 'ch_f_horse2', delay: 3 } } },
  ]),
  e('tulips', 'event', [4, 5], '🌷', 'Tulip Mania', 'A single tulip bulb now costs more than a house. People are buying houses to store their tulips.', [
    { label: 'Buy tulips', outcomes: [
      { weight: 1, text: 'You sell at the top. You are a tulip genius.', effect: { stats: { gold: 12 } } },
      { weight: 2, text: 'The market crashes. You own a very expensive flower.', effect: { stats: { gold: -8, joy: 2 } } },
    ] },
    { label: 'Ban flower speculation', effect: { stats: { gold: 2, joy: -2 } } },
  ]),
  // Industrial
  e('chimney_sweep', 'event', [5, 5], '🧹', 'The Chimney Sweep Choir', 'The chimney sweeps have formed a choir and won every competition. They will not stop singing about soot.', [
    { label: 'Send them on tour', effect: { stats: { joy: 5, gold: 3 }, chain: { id: 'ch_f_choir', delay: 2 } } },
    { label: 'Clean chimneys mechanically', effect: { stats: { sci: 4, joy: -2 }, flags: { robots: 1 } } },
  ]),
  // Atomic
  e('atomic_mascot', 'event', [6, 6], '☢️', 'Atomic Everything', 'Atomic toothpaste, atomic cereal, atomic hairspray. Some of it is genuinely atomic. Nobody can say which.', [
    { label: 'Recall the atomic cereal', effect: { stats: { gold: -4, pop: 2 } } },
    { label: 'It is fine, probably', effect: { stats: { gold: 4, weird: 4, pop: -1 }, flags: { genes: 1 } } },
  ]),
  // Information
  e('reply_all', 'event', [7, 7], '📧', 'Reply All', 'A clerk accidentally sent a message to every citizen. Four million people have replied "please remove me from this list".', [
    { label: 'Shut down the network', effect: { stats: { gold: -4, joy: 2 } } },
    { label: 'Turn it into a holiday', effect: { stats: { joy: 5, gold: -2 }, flags: { party: 1 } } },
  ]),
  e('viral_goat', 'event', [7, 8], '🐐', 'The Viral Goat', 'A video of a goat screaming has been watched more times than there are people. It is now the most influential figure in the nation.', [
    { label: 'Give the goat a cabinet post', effect: { stats: { joy: 6, sci: -2, weird: 3 } } },
    { label: 'Monetise the goat', effect: { stats: { gold: 8, joy: -1 } } },
  ]),
  e('password', 'event', [7, 8], '🔑', 'The National Password', 'It turns out the password to the nation\'s defence network is "password". It has been "password" for forty years.', [
    { label: 'Change it to "password2"', effect: { stats: { mil: 2, joy: 2 } } },
    { label: 'Full security overhaul', effect: { stats: { gold: -6, mil: 6, sci: 2 } } },
  ]),
  e('ai_poet', 'event', [7, 8], '🤖', 'The Machine Wrote a Poem', 'A computer has written a poem. It is about a lighthouse, it is very good, and nobody is sure how to feel about it.', [
    { label: 'Publish it', effect: { stats: { joy: 3, sci: 4, faith: -2 }, flags: { robots: 1 } } },
    { label: 'Hide it and hire a poet', effect: { stats: { joy: 2, gold: -3 }, chain: { id: 'ch_f_poet', delay: 2 } } },
  ]),
  e('influencer_war', 'rival', [7, 8], '📱', 'The Influencer War', '{rival}\'s most famous influencer has insulted our national dish. Our influencers are mobilising.', [
    { label: 'Launch the counter-campaign', effect: { stats: { joy: 4, gold: -2 }, rival: { target: 'same', rel: -12 } } },
    { label: 'Send them a free sample', effect: { stats: { food: -2 }, rival: { target: 'same', rel: 10 }, text: 'They loved it. The video has nine billion views.', chain: { id: 'ch_f_sample', delay: 2 } } },
  ]),
  e('doomscroll', 'event', [7, 8], '📉', 'The Great Doomscroll', 'The whole nation has been scrolling bad news for so long that productivity has fallen by a third. The news is about the productivity.', [
    { label: 'Mandatory walks', effect: { stats: { joy: 4, gold: -2, pop: 1 } } },
    { label: 'Make the news nicer', effect: { stats: { joy: 3, sci: -2, faith: 2 } } },
  ]),
  e('crypto_temple', 'event', [7, 8], '🪙', 'The Coin Temple', 'A new digital currency is backed by nothing but belief. The priests are very interested in how that works.', [
    { label: 'Invest the treasury', outcomes: [
      { weight: 1, text: 'Number go up. The treasury is overflowing with invisible money.', effect: { stats: { gold: 15, faith: 2 } } },
      { weight: 1, text: 'Number go down. The treasury is now a very expensive password.', effect: { stats: { gold: -10, joy: -3 } } },
    ] },
    { label: 'Leave it to the priests', effect: { stats: { faith: 4, weird: 3 } } },
  ]),
  e('deep_fake', 'event', [7, 8], '🎭', 'The Fake Leader', 'A video of {leader} declaring war on breakfast is circulating. It is fake. It is also polling very well.', [
    { label: 'Issue a denial', effect: { stats: { joy: -2, sci: 2 } } },
    { label: 'Declare war on breakfast', effect: { stats: { joy: 5, food: -4, weird: 3 } } },
  ]),
  e('rival_ai', 'rival', [7, 8], '💻', 'Their Computer Wants a Word', '{rival}\'s national computer has contacted our national computer. They have been chatting for hours. Neither will say what about.', [
    { label: 'Pull the plug', effect: { stats: { sci: -2, mil: 3 }, rival: { target: 'same', rel: -6 } } },
    { label: 'Let them talk', effect: { stats: { sci: 5, weird: 3 }, rival: { target: 'same', rel: 10 }, flags: { robots: 1 }, chain: { id: 'ch_f_aitalk', delay: 2 } } },
  ]),
  e('signal_static', 'alien', [7, 8], '📻', 'Static With a Rhythm', 'Every radio in the country picked up the same burst of static. Musicians say it has a time signature. Seven over eleven.', [
    { label: 'Play it back to them', effect: { stats: { joy: 2 }, alienRel: 5, threat: 1, flags: { alien_contact: 1 } } },
    { label: 'Turn the radios off', effect: { stats: { joy: -3, mil: 2 }, threat: -1 } },
    { label: 'Release it as a single', effect: { stats: { gold: 6, joy: 4 }, alienRel: 2, chain: { id: 'ch_f_single', delay: 3 } } },
  ]),
  e('satellite_gone', 'alien', [7, 8], '🛰️', 'A Satellite Is Missing', 'One of our satellites has vanished. Not crashed. Vanished. Something in orbit has taken it, and left a small receipt.', [
    { label: 'Read the receipt', effect: { stats: { sci: 5, weird: 3 }, flags: { alien_contact: 1 } } },
    { label: 'Launch an armed satellite', effect: { stats: { mil: 5, gold: -5 }, alienRel: -4, chain: { id: 'ch_f_armedsat', delay: 2 } } },
  ]),
  // Space
  e('moon_strike', 'event', [8, 8], '🌕', 'The Moon Base Strike', 'The workers on the moon base have gone on strike. They want better air. They have a point. They have very little air.', [
    { label: 'Send more air', effect: { stats: { gold: -6, sci: 3, joy: 3 } } },
    { label: 'Send motivational posters', effect: { stats: { joy: -4, gold: 1 }, chain: { id: 'ch_f_posters', delay: 1 } } },
  ]),
  e('space_tourists', 'event', [8, 8], '🚀', 'Space Tourism', 'The rich are paying to go to orbit for four minutes. They come back and tell everyone the planet is small. Everyone already knew.', [
    { label: 'Tax the rockets', effect: { stats: { gold: 9, joy: -1 } } },
    { label: 'Make them stay up there', effect: { stats: { joy: 6, gold: -3 } } },
  ]),
  e('last_rival_talks', 'rival', [8, 8], '🕊️', 'Emergency Summit', '{rival} has proposed a joint defence against the coming fleet. They want to put aside every grudge. Well, most grudges.', [
    { label: 'Sign the alliance', effect: { stats: { mil: 6, joy: 3 }, rival: { target: 'same', ally: true, rel: 20 }, threat: -2 } },
    { label: 'Let them face it alone', effect: { stats: { mil: 2 }, rival: { target: 'same', rel: -20 }, chain: { id: 'ch_f_alone', delay: 1 } } },
  ], { rival: true }),
  e('rival_spaceport', 'rival', [8, 8], '🛫', 'Their Spaceport Is Bigger', '{rival} has opened a spaceport. It is larger than ours. It has a nicer food court. Morale is in freefall.', [
    { label: 'Build a bigger food court', effect: { stats: { gold: -6, joy: 6 } } },
    { label: 'Ask to use theirs', effect: { stats: { sci: 4, mil: -1 }, rival: { target: 'same', rel: 10 } } },
  ]),
  e('fleet_scout', 'alien', [8, 8], '👽', 'The Scout Ship', 'A single small alien ship has landed in a field. Its pilot appears to be lost and is asking for directions.', [
    { label: 'Give correct directions', effect: { stats: { joy: 2 }, alienRel: 8, chain: { id: 'ch_f_rightway', delay: 2 } } },
    { label: 'Give wrong directions', effect: { stats: { weird: 4 }, threat: -2, alienRel: -3, text: 'The scout is last seen heading confidently towards a different galaxy.', chain: { id: 'ch_f_wrongway', delay: 2 } } },
    { label: 'Seize the ship', effect: { stats: { sci: 10, mil: 3 }, alienRel: -10, threat: 2, chain: { id: 'ch_f_seized', delay: 2 } } },
  ]),
  e('fleet_survey', 'alien', [8, 8], '📋', 'The Alien Questionnaire', 'A probe has asked every citizen to rate the planet from one to five. It is not clear what happens if the score is low.', [
    { label: 'Five stars, everyone', effect: { stats: { joy: -2 }, alienRel: 5, threat: 2, text: 'The planet is now rated as highly desirable.' } },
    { label: 'One star, terrible place', effect: { stats: { joy: 3 }, threat: -3, alienRel: -2, text: 'Reviews mention the weather, the mosquitos and "rude locals".', chain: { id: 'ch_f_onestar2', delay: 2 } } },
  ]),
  e('fleet_eta', 'alien', [8, 8], '⏱️', 'Estimated Time of Arrival', 'The fleet has published an arrival time. It is earlier than expected. They are also, it seems, punctual.', [
    { label: 'Panic productively', effect: { stats: { mil: 8, sci: 4, joy: -6 } } },
    { label: 'Throw a farewell party', effect: { stats: { joy: 8, mil: -2 }, flags: { party: 1 } } },
    { label: 'Pretend we are not home', effect: { stats: { weird: 5 }, threat: -2 } },
  ]),
  e('defector', 'alien', [8, 8], '🧳', 'The Alien Defector', 'An alien officer has defected. She brings plans, codes and a very long list of complaints about her manager.', [
    { label: 'Grant asylum', effect: { stats: { mil: 6, sci: 6 }, threat: -3, alienRel: -4, chain: { id: 'ch_f_defector', delay: 2 } } },
    { label: 'Send her back with a fruit basket', effect: { stats: { food: -3 }, alienRel: 8, chain: { id: 'ch_f_defback', delay: 2 } } },
  ]),
  e('bunker_bake', 'event', [8, 8], '🍞', 'The Panic Bake', 'With the fleet approaching, everyone has started baking bread at once. The nation has never smelt better or been more stressed.', [
    { label: 'Hand it to the soldiers', effect: { stats: { mil: 4, joy: 4, food: -2 } } },
    { label: 'Store it for the siege', effect: { stats: { food: 8, joy: -1 } } },
  ]),
  e('last_census', 'history', [8, 8], '🧮', 'The Last Census', 'Historians are counting every citizen, every invention and every bad decision, in case nobody is left to count later.', [
    { label: 'Put it in a time capsule', effect: { stats: { faith: 3, sci: 3 } } },
    { label: 'Beam it into space', effect: { stats: { sci: 2 }, alienRel: 4, threat: 1, chain: { id: 'ch_f_census', delay: 2 } } },
  ]),
  // Mid-era spread
  e('lost_explorer', 'history', [3, 5], '🧭', 'The Explorer Returns', 'An explorer who left forty years ago has come back. He found nothing, but he found it very thoroughly.', [
    { label: 'Throw a parade anyway', effect: { stats: { joy: 4, gold: -2 } } },
    { label: 'Publish his maps', effect: { stats: { sci: 4, gold: 2 } } },
  ]),
  e('pigeon_strike', 'event', [3, 6], '🐦', 'The Statue Problem', 'Every statue in the capital is covered in bird droppings. The sculptors suspect a political motive.', [
    { label: 'Build statue umbrellas', effect: { stats: { gold: -3, joy: 2 } } },
    { label: 'Sculpt the birds instead', effect: { stats: { joy: 3, weird: 3 }, flags: { pigeons: 1 } } },
  ]),
  e('comet_party', 'alien', [3, 6], '☄️', 'Comet Over the Capital', 'A comet hangs over the capital. Doom-sayers are thrilled. Astronomers are thrilled. The comet seems to be slowing down.', [
    { label: 'Hold a comet festival', effect: { stats: { joy: 5, gold: -2 }, alienRel: 2 } },
    { label: 'Measure it, carefully', effect: { stats: { sci: 5 }, threat: -1 } },
  ]),
  e('ugly_baby', 'event', [1, 5], '👑', 'The Royal Baby', 'The royal heir has been born. The court painter has been asked to "be generous". He is struggling.', [
    { label: 'Paint him handsome', effect: { stats: { joy: 3, faith: 2, gold: -2 } } },
    { label: 'Paint him honestly', effect: { stats: { joy: -2, sci: 3 }, text: 'The painter flees the country. The painting is a masterpiece.' } },
  ]),
  e('inventor_feud', 'event', [5, 6], '💡', 'Two Inventors, One Lightbulb', 'Two inventors claim to have invented the same thing on the same day. They are now electrocuting animals in public to prove a point.', [
    { label: 'Back the showman', effect: { stats: { gold: 5, sci: 2, joy: -1 } } },
    { label: 'Back the genius', effect: { stats: { sci: 6, gold: -2 } } },
  ]),
  e('rival_tea', 'rival', [4, 6], '🫖', 'The Tea Dispute', '{rival} has put a tax on our tea. Some of our citizens have thrown their tea in the harbour, which seems to hurt mostly us.', [
    { label: 'Pay the tax', effect: { stats: { gold: -4 }, rival: { target: 'same', rel: 8 } } },
    { label: 'Switch to coffee', effect: { stats: { sci: 3, joy: -2 }, rival: { target: 'same', rel: -6 } } },
    { label: 'Throw their tea in the harbour too', effect: { stats: { joy: 4, mil: 2 }, rival: { target: 'same', rel: -12 }, chain: { id: 'ch_f_harbour', delay: 2 } } },
  ]),
  e('town_crier', 'event', [3, 4], '🔔', 'The Town Crier Lost His Voice', 'Without the town crier, nobody knows any news. Everyone is happier. Productivity is up.', [
    { label: 'Hire a new crier', effect: { stats: { sci: 2, joy: -1, gold: -1 } } },
    { label: 'Enjoy the silence', effect: { stats: { joy: 5, sci: -2 } } },
  ]),
  e('stone_census', 'event', [0, 2], '🪨', 'Who Owns the Big Rock?', 'Two families are arguing over who owns the big rock in the middle of the village. The rock has been there longer than either of them.', [
    { label: 'Split the rock', effect: { stats: { mil: 1, joy: -2, sci: 2 } } },
    { label: 'The rock owns itself', effect: { stats: { faith: 3, weird: 2 } } },
    { label: 'You own the rock now', effect: { stats: { gold: 3, joy: -2 } } },
  ]),
  e('stone_vote', 'history', [0, 2], '✋', 'The First Vote', 'The tribe has voted for the first time. The question was "who wants berries?". The result was unanimous.', [
    { label: 'Vote on everything now', effect: { stats: { joy: 4, mil: -1 } } },
    { label: 'That was enough voting', effect: { stats: { mil: 2, joy: -1 } } },
  ]),
  e('mud_bricks', 'event', [0, 2], '🧱', 'Mud, But Square', 'Someone made the mud square. It stacks. Everything is about to change, and everything will be brown.', [
    { label: 'Square all the mud', effect: { stats: { pop: 2, gold: -1, sci: 2 } } },
    { label: 'Round mud was fine', effect: { stats: { joy: 2, faith: 1 } } },
  ]),
  e('first_pet_name', 'event', [0, 1], '🐕', 'Who\'s a Good Boy', 'A hunter has started speaking to his wolf in a high voice. The wolf likes it. The other hunters are worried about him.', [
    { label: 'Everyone try it', effect: { stats: { joy: 4, mil: 2 } } },
    { label: 'Speak normally to wolves', effect: { stats: { mil: 1, joy: -1 } } },
  ]),
  e('bronze_horoscope', 'event', [1, 2], '♈', 'The Horoscope Page', 'The priests have started predicting everyone\'s week from the stars. Everyone is a Goat this month. Goats should avoid travel.', [
    { label: 'Cancel all travel', effect: { stats: { joy: -2, faith: 3, gold: -2 } } },
    { label: 'Ignore the stars', effect: { stats: { sci: 2, faith: -2 } } },
  ]),
  e('classical_debate', 'history', [2, 2], '🗣️', 'The Great Debate', 'Two philosophers have been debating whether a man can step in the same river twice. They have been standing in the river for nine days.', [
    { label: 'Fund the debate', effect: { stats: { sci: 4, food: -2 } } },
    { label: 'Pull them out', effect: { stats: { joy: 3, pop: 1 } } },
  ]),
];
