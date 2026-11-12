// Content for the Farming, Iron and Exploration ages (15-age `age` scale).
import type { CardDef } from '../../types';
import { c, chk, dec, ev, luck, o } from './util';

const F: [number, number] = [1, 1];
const I: [number, number] = [3, 3];
const X: [number, number] = [7, 7];

const farming: CardDef[] = [
  dec('research', 'fa_seeds', F, '🌱', 'Seed Saving', 'Keep the best seeds instead of eating them. This is the hardest thing anyone has ever been asked to do.', 'Save the seeds', { stats: { food: 6, sci: 2, joy: -2 } }),
  dec('research', 'fa_plough', F, '🐂', 'The Plough', 'A stick, but dragged. The oxen are sceptical.', 'Drag the stick', { stats: { food: 7, sci: 2 } }),
  dec('research', 'fa_calendar', F, '📅', 'Planting Calendar', 'Plant when the big star is above the small hill. The small hill has been moved twice by pranksters.', 'Watch the star', { stats: { sci: 5, food: 3, faith: 1 } }),
  dec('research', 'fa_ferment', F, '🍺', 'Fermentation', 'Grain left in a pot too long turned into something wonderful and probably illegal.', 'Leave more pots out', { stats: { joy: 7, food: -2, weird: 2 }, flags: { party: 1 } }),
  dec('research', 'fa_granary', F, '🏚️', 'Granaries', 'A building whose only job is to be full.', 'Fill it', { stats: { food: 4, gold: 3 } }),
  dec('policy', 'fa_fences', F, '🪵', 'Fences', 'Ownership has been invented. It is a stick in the ground and a stern look.', 'Plant the sticks', { stats: { gold: 5, joy: -3 }, flags: { bureaucracy: 1 } }),
  dec('policy', 'fa_festival', F, '🌾', 'Harvest Festival', 'Celebrate the harvest by eating a good part of it.', 'Feast', { stats: { joy: 6, food: -3, faith: 2 } }),
  dec('policy', 'fa_goats', F, '🐐', 'Domesticate the Goat', 'The goat has agreed to live with us, under terms it will not disclose.', 'Accept the terms', { stats: { food: 4, joy: 2, weird: 2 } }),
  dec('policy', 'fa_rest_day', F, '😴', 'Day of Rest', 'One day in seven, nobody farms. The fields do not seem to mind.', 'Rest', { stats: { joy: 5, food: -2, faith: 2 } }),
  dec('project', 'fa_wall', F, '🧱', 'The First Village Wall', 'A wall around the village to keep out wolves, raiders and the neighbour\'s goat.', 'Build it', { stats: { mil: 5, gold: -3 } }),
  dec('project', 'fa_oven', F, '🔥', 'Communal Oven', 'One big oven for everybody. Gossip production expected to triple.', 'Light it', { stats: { food: 4, joy: 4, gold: -2 } }),
  dec('project', 'fa_scarecrows', F, '🎃', 'Scarecrow Program', 'Scarecrows so lifelike that two of them asked for wages.', 'Make more', { stats: { food: 3, weird: 3 } }),
  dec('project', 'fa_canal', F, '💧', 'Irrigation Ditch', 'Water goes where we want it to. The river has been informed.', 'Dig it', { stats: { food: 8, gold: -4 } }),
  dec('government', 'fa_gov_elders', F, '👵', 'Council of the Oldest', 'Whoever has seen the most harvests decides. Arguments about who is older are frequent and slow.', 'Let the elders rule', { gov: 'tribe', stats: { faith: 2 } }),
  dec('government', 'fa_gov_granary', F, '🪶', 'Chief of the Granary', 'Whoever holds the granary key rules the village. The key is very large.', 'Crown the keyholder', { gov: 'chiefdom', stats: { food: 2 } }),

  ev('fa_weed', 'event', '🌿', 'The First Weed', 'A plant grew where nobody planted it. Theologians are alarmed. Farmers are furious. The plant is thriving.', [
    c('Pull it out', { stats: { food: 2 } }),
    c('Worship it', { stats: { faith: 3, weird: 2 } }),
    luck('Eat it', [
      o(1, 'Delicious. We now call it lettuce.', { stats: { food: 4 } }),
      o(1, 'Not delicious. The village sees colours for a week.', { stats: { weird: 4, joy: 2 } }),
    ]),
  ], { age: F }),
  ev('fa_sheep', 'event', '🐑', 'Too Many Sheep', 'Counting the sheep keeps putting the counters to sleep. Nobody knows how many sheep there are.', [
    c('Train awake counters', { stats: { sci: 3 } }),
    c('Use sheep-counting as a sleep cure', { stats: { joy: 3, pop: 1 } }),
  ], { age: F }),
  ev('fa_hunters', 'history', '🏹', 'Farmers Versus Hunters', 'The hunters say farming is just waiting. The farmers say hunting is just running. Both are correct.', [
    c('Side with the farmers', { stats: { food: 4, mil: -1 } }),
    c('Side with the hunters', { stats: { mil: 3, food: 1 } }),
    c('Make them swap jobs for a week', { stats: { joy: 3, food: -2 }, text: 'Both groups come back with a lot more respect and several injuries.' }),
  ], { age: F }),
  ev('fa_scarecrow_talks', 'event', '🎃', 'The Scarecrow Spoke', 'A farmer swears the scarecrow told her to plant on the left side. The left side has the best harvest in years.', [
    c('Listen to the scarecrow', { stats: { food: 5, weird: 3 } }),
    c('Replace the scarecrow', { stats: { joy: -2 } }),
  ], { age: F }),
  ev('fa_rain_dance', 'event', '💃', 'The Rain Dance Worked', 'Dancers danced and it rained. Nobody is sure if this is cause and effect, but the dancers are insufferable now.', [
    c('Dance every week', { stats: { food: 3, joy: 3 }, flags: { dance: 1 } }),
    c('Test it in a dry month', { stats: { sci: 3 }, text: 'It does not rain. The dancers blame the moon.' }),
  ], { age: F }),
  ev('fa_tidy_field', 'alien', '✨', 'A Very Tidy Field', 'Overnight, one field was perfectly weeded, ploughed and arranged into rows so straight they hurt to look at.', [
    c('Leave a basket of thanks', { stats: { food: -2 }, alienRel: 3 }),
    c('Guard the field next night', { stats: { mil: 2 }, threat: -1, text: 'Nothing happens. The neighbouring field is tidied instead.' }),
    c('Charge the other farmers to see it', { stats: { gold: 3 } }),
  ], { age: F }),
  ev('fa_tax', 'history', '🧺', 'The First Tax', 'Someone has suggested everybody put one basket of grain into a pile for "the common good". The common good looks a lot like the chief.', [
    c('Pay the basket', { stats: { gold: 4, joy: -2 } }),
    c('Ask what the common good is for', { stats: { joy: 2, sci: 1 }, flags: { bureaucracy: 1 } }),
  ], { age: F }),
  ev('fa_locusts', 'event', '🦗', 'Locust Bargaining', 'A swarm of locusts has arrived. The shaman claims he can negotiate with them.', [
    luck('Let him negotiate', [
      o(1, 'The locusts leave. They take only the shaman\'s hat.', { stats: { faith: 4 } }),
      o(1, 'The locusts stay. They take everything except the shaman\'s hat.', { stats: { food: -6 } }),
    ]),
    c('Light smoke fires', { stats: { food: -2, sci: 2 } }),
  ], { age: F }),
  ev('fa_big_cow', 'event', '🐄', 'A Cow of Unusual Size', 'Careful breeding has produced a cow so large it has its own weather. Nobody can milk the top half.', [
    c('Breed more', { stats: { food: 5 }, flags: { genes: 1 } }),
    c('Make it a temple', { stats: { faith: 4, weird: 2 } }),
  ], { age: F }),
  ev('fa_neighbour_fence', 'rival', '🪵', 'The Neighbour\'s Fence', '{rival} has built a fence along the border. It is a nice fence. It is also two steps inside our field.', [
    c('Move it back at night', { stats: { food: 2 }, rival: { target: 'same', rel: -5 } }),
    c('Build a nicer fence', { stats: { gold: -2, joy: 2 }, rival: { target: 'same', rel: 3 } }),
    c('Invite them over to discuss it', { rival: { target: 'same', rel: 8 }, stats: { food: -2 } }),
  ], { age: F, req: { rival: true } }),
  ev('fa_barn_cat', 'event', '🐈', 'The Barn Cat', 'A cat has taken over the grain store. The mice are gone. So is the cat\'s interest in anything we say.', [
    c('Appoint it Keeper of Grain', { stats: { food: 3 }, flags: { cats: 1 } }),
    c('Shoo it away', { stats: { food: -2 } }),
  ], { age: F }),
  ev('fa_glow_seed', 'alien', '🌟', 'A Seed That Glows', 'A farmer found a seed in the furrow that glows faintly blue and is warm to the touch.', [
    c('Plant it', { stats: { food: 3, weird: 3 }, flags: { alien_contact: 1 }, text: 'It grows into a stalk that hums at night, pointing at the same spot in the sky.' }),
    c('Bury it deep', { stats: { faith: 2 }, threat: -1 }),
  ], { age: F }),
  ev('fa_first_beer', 'history', '🍻', 'The First Pub', 'A farmer has opened the first pub. It is a hut with one pot, one stool and a lot of opinions.', [
    c('Open a second pub', { stats: { joy: 5, food: -2 }, flags: { party: 1 } }),
    c('Close it at sunset', { stats: { food: 2, joy: -2 } }),
  ], { age: F }),
  ev('fa_ancestor_field', 'history', '🪦', 'Grandpa in the Field', 'The elders want to bury the dead in the fields "so they can keep an eye on the crops".', [
    c('Bury them in the fields', { stats: { food: 3, faith: 3, weird: 2 } }),
    c('Build a separate burial ground', { stats: { faith: 2, gold: -2 } }),
  ], { age: F }),
];

const iron: CardDef[] = [
  dec('research', 'i_bloomery', I, '🔥', 'The Bloomery', 'A furnace that makes iron. Also makes everyone near it very red in the face.', 'Fire it up', { stats: { mil: 6, sci: 2 } }),
  dec('research', 'i_ploughs', I, '⚙️', 'Iron Ploughs', 'Ploughs that do not snap on the first rock. The rocks are furious.', 'Plough deeper', { stats: { food: 7, sci: 1 } }),
  dec('research', 'i_mail', I, '⛓️', 'Chainmail', 'A shirt made of tiny metal rings. It took a smith a whole year. He is never doing it again.', 'Make more anyway', { stats: { mil: 7, gold: -3 } }),
  dec('research', 'i_coins', I, '🪙', 'Coinage', 'Little round pieces of metal with a face on them. People will do anything for them. Strange.', 'Mint coins', { stats: { gold: 7 }, flags: { bureaucracy: 1 } }),
  dec('research', 'i_nails', I, '📌', 'Iron Nails', 'Buildings no longer fall down as often. Carpenters are thrilled and slightly bored.', 'Hammer it in', { stats: { gold: 3, pop: 2 } }),
  dec('policy', 'i_army', I, '🛡️', 'Standing Army', 'Soldiers who are soldiers all year, not just after harvest. They are very good at standing.', 'Raise the army', { stats: { mil: 8, joy: -4, food: -2 } }),
  dec('policy', 'i_guild', I, '🔨', 'Blacksmiths\' Guild', 'The smiths want a guild, a hall and a secret handshake that does not burn.', 'Charter the guild', { stats: { gold: 4, sci: 3 } }),
  dec('policy', 'i_roads', I, '🛤️', 'Paved Roads', 'Roads made of stone so armies, merchants and gossip can travel faster.', 'Pave them', { stats: { gold: 5, mil: 2 }, flags: { logistics: 1 } }),
  dec('policy', 'i_bronze_ban', I, '🥉', 'Ban Bronze Nostalgia', 'The elders keep saying things were better in the Bronze Age. A law is proposed.', 'Ban nostalgia', { stats: { sci: 4, joy: -2 } }),
  dec('project', 'i_forge', I, '🏭', 'The Great Forge', 'A forge so large it has its own district. And its own smell.', 'Build it', { stats: { mil: 6, sci: 3, gold: -4 } }),
  dec('project', 'i_hillfort', I, '⛰️', 'Hill Fort', 'A fort on a hill. Enemies will have to walk uphill, which is the best defence ever invented.', 'Build on the hill', { stats: { mil: 7, gold: -4 } }),
  dec('project', 'i_aqueduct', I, '🌉', 'Iron-Bound Aqueduct', 'Stone channels reinforced with iron bring water to the city. Pigeons use it as a highway.', 'Build it', { stats: { food: 5, pop: 2, gold: -4 } }),
  dec('project', 'i_armory', I, '🗡️', 'The Royal Armoury', 'A building full of weapons, and one old man who knows where everything is.', 'Stock it', { stats: { mil: 6, gold: -3 } }),
  dec('government', 'i_gov_crown', I, '👑', 'The Iron Crown', 'The strongest warrior has forged himself a crown. It weighs a lot. He insists it is fine.', 'Bow to the crown', { gov: 'monarchy', stats: { mil: 2 } }),
  dec('government', 'i_gov_warlords', I, '🦅', 'The Warlord Council', 'The generals propose ruling together, "temporarily".', 'Let them rule', { gov: 'empire', stats: { mil: 3, joy: -2 } }),

  ev('i_rust', 'event', '🟤', 'The Rust', 'Every sword in the armoury has gone orange. The smiths blame the rain. The rain declines to comment.', [
    c('Oil everything', { stats: { gold: -3, mil: 2 } }),
    c('Declare orange the national colour', { stats: { joy: 3, weird: 2 } }),
  ], { age: I }),
  ev('i_stone_sword', 'event', '🗡️', 'The Sword in the Stone', 'A sword has been found stuck in a rock. Legend says whoever pulls it out shall be king. Several people have tried. One is still trying.', [
    c('Let anyone try', { stats: { joy: 4 } }),
    c('Have the smiths cut it out', { stats: { mil: 3, faith: -3 }, text: 'It is a very ordinary sword. The rock, however, is fascinating.' }),
    luck('Let {leader} try', [
      o(1, 'It comes out. {leader} is now twice as king.', { stats: { faith: 5, joy: 4 } }),
      o(2, 'It does not move. {leader} claims it was a test of humility.', { stats: { joy: -2 } }),
    ]),
  ], { age: I }),
  ev('i_magnet', 'event', '🧲', 'The Pulling Stone', 'A smith found a stone that pulls iron towards it. It has pulled three swords, a helmet and a soldier inside the helmet.', [
    c('Study it', { stats: { sci: 5 } }),
    c('Use it to disarm enemies', { stats: { mil: 4, weird: 2 } }),
  ], { age: I }),
  ev('i_bronze_vets', 'history', '🥉', 'Bronze Veterans Protest', 'Old soldiers who fought with bronze are protesting the new iron weapons. Their signs are, of course, bronze.', [
    c('Give them pensions', { stats: { gold: -4, joy: 3 } }),
    c('Melt the signs down', { stats: { gold: 3, joy: -3 }, flags: { unrest: 1 } }),
  ], { age: I }),
  ev('i_smith_secret', 'event', '🤫', 'The Smith\'s Secret', 'The best smith in the land refuses to share his technique. He works alone, at night, and something in his forge sings.', [
    c('Pay him for the secret', { stats: { gold: -5, mil: 6, sci: 2 } }),
    c('Spy on him', { flags: { spies: 1 }, stats: { sci: 3 } }),
    c('Leave him alone', { stats: { faith: 2, weird: 2 } }),
  ], { age: I }),
  ev('i_meteor_iron', 'alien', '☄️', 'Sky Iron', 'A lump of iron fell from the sky. It is purer than anything our smiths can make and has a small serial number on one side.', [
    c('Forge it into a royal sword', { stats: { mil: 4, faith: 3 }, alienRel: -1 }),
    c('Copy the serial number down', { stats: { sci: 4 }, flags: { alien_contact: 1 } }),
    c('Leave it where it fell', { alienRel: 2, threat: -1 }),
  ], { age: I }),
  ev('i_tin_crash', 'history', '📉', 'The Tin Collapse', 'With bronze out of fashion, everyone who hoarded tin is suddenly very poor and very loud about it.', [
    c('Bail them out', { stats: { gold: -5 }, flags: { debt: 1 } }),
    c('Let them learn', { stats: { gold: 2, joy: -2 } }),
  ], { age: I }),
  ev('i_rival_forge', 'rival', '🔥', 'The Rival Forge', '{rival} claims their smiths make better iron. They have challenged ours to a hammering contest.', [
    chk('Accept the contest', {}, {
      base: 0.45, stats: { mil: 0.004 }, flags: { engineers: 0.08, custom_compete: 0.15 },
      success: { text: 'Our smith wins and then, out of pure energy, forges a second anvil.', effect: { stats: { mil: 4, joy: 4 }, rival: { target: 'same', rel: -3 } } },
      fail: { text: 'Their smith wins. Ours claims his hammer was cursed. It might have been.', effect: { stats: { joy: -3 }, rival: { target: 'same', rel: 3 } } },
    }),
    c('Propose a smith exchange', { stats: { sci: 3 }, rival: { target: 'same', rel: 6 } }),
  ], { age: I, req: { rival: true } }),
  ev('i_teeth', 'event', '🦷', 'Iron Teeth Fashion', 'Young nobles are having their teeth capped with iron. They clank when they talk. Parents are horrified.', [
    c('Ban the iron teeth', { stats: { joy: -3 } }),
    c('Tax the iron teeth', { stats: { gold: 4 } }),
    c('Issue them to the army', { stats: { mil: 3, weird: 3 } }),
  ], { age: I }),
  ev('i_goat_armour', 'event', '🐐', 'The Armoured Goat', 'A smith has made a full suit of armour for a goat. The goat is now unstoppable and knows it.', [
    c('Recruit more goats', { stats: { mil: 4, food: -2, weird: 2 } }),
    c('Make the goat a knight', { stats: { joy: 4, faith: 1 } }),
  ], { age: I }),
  ev('i_ore_strike', 'event', '⛏️', 'A Vein of Iron', 'Miners found a vein of iron running under the capital. To reach it, they would need to dig under the palace.', [
    c('Dig under the palace', { stats: { gold: 8, mil: 3, joy: -3 }, flags: { hole: 1 } }),
    c('Move the palace', { stats: { gold: -6, mil: 5 } }),
    c('Leave it', { stats: { faith: 2 } }),
  ], { age: I }),
  ev('i_horse_armour', 'event', '🐎', 'Armoured Horses', 'Horses in iron. They are slower, louder and look extremely serious.', [
    c('Armour the cavalry', { stats: { mil: 6, gold: -4 } }),
    c('Armour only the parade horses', { stats: { joy: 4, gold: -2 } }),
  ], { age: I }),
  ev('i_humming_anvil', 'alien', '🔔', 'The Humming Anvil', 'An anvil in the Great Forge hums every night at midnight. The hum is getting slightly louder each week.', [
    c('Record the pattern', { stats: { sci: 4 }, flags: { alien_contact: 1 }, threat: -1 }),
    c('Hit it until it stops', { stats: { mil: 2, joy: 2 }, alienRel: -2 }),
  ], { age: I }),
];

const exploration: CardDef[] = [
  dec('research', 'x_compass', X, '🧭', 'A Better Compass', 'The new compass points north, mostly. The old one pointed at whatever the captain wanted.', 'Trust the needle', { stats: { sci: 6, gold: 3 }, flags: { navy: 1 } }),
  dec('research', 'x_longitude', X, '🕰️', 'Longitude', 'Knowing where you are east-to-west requires a very good clock. Clockmakers are suddenly the most important people in the world.', 'Fund the clockmakers', { stats: { sci: 8, gold: -4 }, flags: { logistics: 1 } }),
  dec('research', 'x_scurvy', X, '🍋', 'The Lemon Cure', 'Sailors who eat lemons keep their teeth. Sailors who do not, do not. The navy is now mostly lemons.', 'Pack lemons', { stats: { pop: 3, mil: 3 }, flags: { medicine: 1 } }),
  dec('research', 'x_charts', X, '🗺️', 'Charts of Everything', 'Mapmakers have stopped writing "here be dragons" and started writing "here be Gary, who is fine".', 'Draw the maps', { stats: { sci: 5, gold: 4 }, flags: { logistics: 1 } }),
  dec('research', 'x_biscuits', X, '🍪', 'Ship Biscuits', 'A biscuit that lasts five years and can stop an arrow.', 'Bake them', { stats: { food: 6, mil: 2, joy: -2 } }),
  dec('policy', 'x_marque', X, '🏴‍☠️', 'Letters of Marque', 'Official permission to be a pirate, but only at other people.', 'Issue the letters', { stats: { gold: 8, mil: 3 }, flags: { navy: 1 }, rival: { target: 'random', rel: -6 } }),
  dec('policy', 'x_charter', X, '📜', 'Colonial Charter', 'A company is given the right to own whatever it finds. It has already found several things that were not lost.', 'Sign the charter', { stats: { gold: 10, joy: -3 }, flags: { corruption: 1 } }),
  dec('policy', 'x_prize', X, '🏆', 'The Explorer\'s Prize', 'A large reward for anyone who finds something new. Applicants have already found three new kinds of hat.', 'Offer the prize', { stats: { gold: -5, sci: 6, joy: 3 } }),
  dec('policy', 'x_missions', X, '⛪', 'Missionary Voyages', 'Send priests on every ship. They are terrible sailors but excellent at morale, or at least at prayer during storms.', 'Send the priests', { stats: { faith: 6, gold: -3 }, flags: { cult: 1 } }),
  dec('project', 'x_drydock', X, '⚓', 'The Great Dry Dock', 'A harbour where ships can be built, fixed and occasionally argued with.', 'Build it', { stats: { mil: 6, gold: -5 }, flags: { navy: 1 } }),
  dec('project', 'x_lighthouses', X, '🗼', 'Lighthouse Network', 'A light on every rock. Ships stop crashing. Rocks feel left out.', 'Light them', { stats: { gold: 5, pop: 2 } }),
  dec('project', 'x_warehouse', X, '🏬', 'Spice Warehouse', 'A building that smells so good the whole city is hungry all the time.', 'Fill it with spice', { stats: { gold: 8, food: 2 } }),
  dec('project', 'x_atlas', X, '📖', 'The Great Atlas', 'Every map ever drawn, bound in one enormous book. It takes four people to turn a page.', 'Compile it', { stats: { sci: 8, gold: -4 }, flags: { scholars: 1 } }),
  dec('government', 'x_gov_merchants', X, '🏛️', 'The Merchant Republic', 'The shipowners propose a republic, run by shipowners.', 'Let them run it', { gov: 'republic', stats: { gold: 4 } }),
  dec('government', 'x_gov_admiralty', X, '🦅', 'Rule of the Admiralty', 'The admirals suggest a government with a clear chain of command and more ships.', 'Hand over the wheel', { gov: 'empire', stats: { mil: 4 }, flags: { navy: 1 } }),

  ev('x_dragons', 'event', '🐉', 'Here Be Dragons', 'An expedition returned from the blank part of the map. They report there was, in fact, a dragon. It was small and asked for directions.', [
    c('Send it a map', { stats: { sci: 3, weird: 4 } }),
    c('Keep "here be dragons" on the maps', { stats: { faith: 3, joy: 2 } }),
  ], { age: X }),
  ev('x_edge', 'event', '🌍', 'The Edge of the World', 'A captain claims to have found the edge of the world. It turned out to be a very large waterfall. He refuses to admit it.', [
    c('Fund a second look', { stats: { gold: -4, sci: 5 } }),
    c('Name the waterfall after him', { stats: { joy: 3 } }),
  ], { age: X }),
  ev('x_inhabited', 'history', '🏝️', 'The New Land Has People', 'Our explorers discovered a new continent. It was, they report with some embarrassment, already discovered by the people who live there.', [
    c('Trade with them', { stats: { gold: 6, sci: 3 }, flags: { diplomats: 1 } }),
    c('Claim it anyway', { stats: { gold: 8, joy: -3, faith: -2 }, flags: { corruption: 1 } }),
    c('Apologise and go home', { stats: { faith: 3, joy: 2 } }),
  ], { age: X }),
  ev('x_mutiny', 'event', '🍪', 'Mutiny Over Biscuits', 'The crew of our flagship has mutinied. Their only demand: biscuits that do not break teeth.', [
    c('Give them softer biscuits', { stats: { food: -3, joy: 3 } }),
    c('Put down the mutiny', { stats: { mil: 3, joy: -4 } }),
    c('Join the mutiny', { stats: { joy: 5, weird: 3 }, text: '{leader} is now a pirate. Briefly.' }),
  ], { age: X }),
  ev('x_parrots', 'event', '🦜', 'The Parrot Lobby', 'Every sailor now has a parrot. The parrots have learned to repeat orders. Ships are increasingly run by parrots.', [
    c('Ban parrots on the bridge', { stats: { mil: 2, joy: -2 } }),
    c('Give the parrots ranks', { stats: { weird: 4, joy: 3 } }),
  ], { age: X }),
  ev('x_serpent', 'event', '🐍', 'Sea Serpent Sighting', 'A merchant ship reports a sea serpent. Its description is suspiciously close to a very long eel in a hat.', [
    luck('Send a warship to check', [
      o(1, 'It is an eel. In a hat. Nobody knows who gave it the hat.', { stats: { joy: 4, weird: 3 } }),
      o(1, 'It is not an eel. The warship comes back faster than it left.', { stats: { mil: -3, faith: 3 } }),
    ]),
    c('Charge tourists to see it', { stats: { gold: 4 } }),
  ], { age: X }),
  ev('x_ghost_ship', 'alien', '🚢', 'A Ship From Nowhere', 'A ship sailed into port with no crew, no sails and no wake. Its hull is warm. The harbourmaster is not coping.', [
    c('Board it', { stats: { sci: 5, weird: 4 }, flags: { alien_contact: 1 } }),
    c('Tow it back out to sea', { threat: -1, stats: { joy: 2 } }),
    c('Charge it docking fees', { stats: { gold: 4 }, alienRel: -2 }),
  ], { age: X }),
  ev('x_came_back_wrong', 'event', '🧭', 'The Explorer Who Came Back Wrong', 'Our greatest explorer has returned after ten years. He is taller, left-handed now and insists he was gone for a weekend.', [
    c('Debrief him', { stats: { sci: 4, weird: 4 }, threat: -1 }),
    c('Throw him a parade', { stats: { joy: 5 } }),
  ], { age: X }),
  ev('x_kraken', 'event', '🦑', 'Kraken Negotiations', 'A kraken has wrapped itself around a trade ship and is refusing to let go until it is given "something shiny".', [
    c('Give it a crate of mirrors', { stats: { gold: -3 }, text: 'The kraken leaves, admiring itself.' }),
    c('Fight it', { stats: { mil: -4, food: 6 }, text: 'Calamari for everyone.' }),
  ], { age: X }),
  ev('x_spice_bubble', 'history', '📈', 'The Spice Bubble', 'The price of pepper has risen so high that people are paying their rent in peppercorns. Economists are nervous.', [
    c('Sell the spice reserves now', { stats: { gold: 10, food: -2 } }),
    c('Hold on, it will go higher', { stats: { gold: -6 }, flags: { debt: 1 }, text: 'It does not go higher.' }),
  ], { age: X }),
  ev('x_rival_flag', 'rival', '🚩', 'Someone Else\'s Flag', 'Our explorers reached a new island and found {rival}\'s flag already there. Next to it, a note: "Too slow."', [
    c('Plant our flag higher', { stats: { joy: 3 }, rival: { target: 'same', rel: -6 } }),
    c('Share the island', { stats: { gold: 3 }, rival: { target: 'same', rel: 8, trade: true } }),
    c('Steal their flag', { stats: { joy: 4, mil: 1 }, rival: { target: 'same', rel: -10 } }),
  ], { age: X, req: { rival: true } }),
  ev('x_southern_stars', 'alien', '✨', 'The Wrong Stars', 'Sailors in the far south report different stars. One of them is moving. It seems to be following the ships.', [
    c('Steer by the moving star', { stats: { gold: 4, weird: 3 }, alienRel: 3 }),
    c('Chart its course', { stats: { sci: 5 }, flags: { alien_contact: 1 } }),
    c('Turn the ships around', { threat: -1, stats: { joy: -2 } }),
  ], { age: X }),
  ev('x_bird_island', 'event', '🐦', 'Island of Talking Birds', 'A ship found an island where the birds talk. They do not say anything interesting. They mostly complain about the weather.', [
    c('Bring some home', { stats: { joy: 3, weird: 3 }, flags: { pigeons: 1 } }),
    c('Leave them be', { stats: { faith: 2 } }),
  ], { age: X }),
  ev('x_colony_letter', 'event', '✉️', 'A Letter From the Colony', 'The new colony has sent its first letter home. It took nine months. It says they have run out of salt and are "doing great".', [
    c('Send a salt ship', { stats: { gold: -4, pop: 2 } }),
    c('Tell them to find their own salt', { stats: { gold: 2, joy: -2 } }),
  ], { age: X }),
];

export const ageCardsEarly: CardDef[] = [...farming, ...iron, ...exploration];
