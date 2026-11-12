// Rival cards driven by relations: allies, wars, friendly and hostile neighbours.
import type { CardDef, CardKind, Choice } from '../../types';
import { c, chk, ev, luck, o, step } from './util';

const ALLY = { allies: 1 };
const WAR = { wars: 1 };
const FRIEND = { rivalRel: [40, 100] as [number, number] };
const FOE = { rivalRel: [-100, -40] as [number, number] };

const s = (id: string, kind: CardKind, emoji: string, title: string, text: string, choices: Choice[]): CardDef =>
  ev(id, kind, emoji, title, text, choices, { chainOnly: true });

const allies: CardDef[] = [
  ev('al_bridge', 'rival', '🌉', 'The Friendship Bridge', 'Our ally {rival} proposes a bridge between our capitals. It would be very long and cross several other countries, who have not been asked.', [
    c('Build it together', { stats: { gold: -8, joy: 5 }, flags: { engineers: 1 }, rival: { target: 'same', rel: 10 } }),
    c('Build half and see what they do', { stats: { gold: -4 }, rival: { target: 'same', rel: -4 }, text: 'They build the other half. It does not meet in the middle.' }),
  ], { age: [3, 12], req: ALLY }),
  ev('al_help_bandits', 'rival', '🗡️', 'Our Ally Needs Swords', '{rival} is fighting off raiders and asks us to send troops, as the alliance requires. The raiders are numerous and badly dressed.', [
    chk('Send the army', { stats: { gold: -4 } }, {
      base: 0.45, stats: { mil: 0.003 }, flags: { logistics: 0.06, navy: 0.04 },
      success: { text: 'The raiders flee. {rival} names a street after us. It is a nice street.', effect: { stats: { mil: 3, joy: 4 }, rival: { target: 'same', rel: 15 } } },
      fail: { text: 'Our army got lost and arrived after the battle, but in time for the feast.', effect: { stats: { mil: -5 }, rival: { target: 'same', rel: -5 } } },
    }),
    c('Send money instead', { stats: { gold: -8 }, rival: { target: 'same', rel: 6 } }),
    c('Send a strongly worded letter to the raiders', { flags: { bureaucracy: 1 }, rival: { target: 'same', rel: -8 } }),
  ], { age: [1, 10], req: ALLY }),
  ev('al_shared_lab', 'rival', '🧪', 'The Joint Laboratory', '{rival} suggests pooling our scientists. Their scientists are excellent. Ours are excited.', [
    c('Pool the scientists', { stats: { sci: 8, gold: -4 }, flags: { scholars: 1 }, rival: { target: 'same', rel: 8 } }),
    c('Pool them, but keep our best ones home', { stats: { sci: 4 }, rival: { target: 'same', rel: 2 } }),
  ], { age: [5, 13], req: ALLY }),
  ev('al_royal_baby', 'rival', '👶', 'An Alliance Baby', 'The royal couple joining us and {rival} has had a baby. Both nations claim it. The baby claims the cat.', [
    c('Raise it in both capitals, alternating', { stats: { joy: 4, gold: -3 }, rival: { target: 'same', rel: 8 } }),
    c('Make it heir to both thrones', { stats: { gold: 5 }, rival: { target: 'same', rel: -6 }, text: '{rival} smiles politely and starts drafting a separate heir.' }),
    c('Give the cat a title', { flags: { cats: 1 }, stats: { joy: 3 } }),
  ], { age: [2, 8], req: ALLY }),
  ev('al_war_games', 'rival', '🎯', 'Joint Exercises', '{rival} invites our army to joint exercises. Their soldiers are disciplined. Ours keep trying to trade snacks.', [
    c('Train together', { stats: { mil: 6, food: -3 }, rival: { target: 'same', rel: 6 } }),
    c('Win the exercises at all costs', { stats: { mil: 8, joy: 2 }, rival: { target: 'same', rel: -6 } }),
  ], { age: [3, 13], req: ALLY }),
  ev('al_their_storyline', 'rival', '🐝', '{rival} Has Become Bees', 'Our ally {rival} has embraced their beekeeping a little too much. Their parliament is a hive. Their ambassador buzzes.', [
    c('Stay allied, buy beekeeper suits', { stats: { gold: -4, food: 4 }, rival: { target: 'same', rel: 6 } }),
    c('Learn from them', { flags: { bees: 1 }, stats: { sci: 3 } }),
    c('This is not what we signed up for', { rival: { target: 'same', rel: -10, ally: false } }),
  ], { age: [5, 12], req: ALLY }),
  ev('al_their_cult', 'rival', '🕯️', 'Our Ally Found God', '{rival} has converted to a new religion overnight. It worships a lamp. They would like us to try it.', [
    c('Try the lamp', { stats: { faith: 5, weird: 3 }, rival: { target: 'same', rel: 8 } }),
    c('Politely remain lampless', { stats: { joy: 2 }, rival: { target: 'same', rel: -3 } }),
  ], { age: [3, 11], req: ALLY }),
  ev('al_alien_pact', 'rival', '🛡️', 'A Pact Against the Sky', '{rival} proposes a joint defence plan against the coming fleet: we share radar, they share cannons, everyone shares panic.', [
    c('Sign the defence plan', { stats: { mil: 10, gold: -6 }, rival: { target: 'same', rel: 10 }, threat: -3 }),
    c('Ask them to hold the front line', { stats: { mil: 4 }, rival: { target: 'same', rel: -6 }, threat: -2 }),
  ], { age: [10, 14], req: ALLY }),
  ev('al_debt', 'rival', '💸', 'Our Ally Is Broke', '{rival} has spent its treasury on a monument to our alliance. It is beautiful. They would like to borrow money to finish its nose.', [
    c('Lend the money', { stats: { gold: -8 }, rival: { target: 'same', rel: 10 } }),
    c('Offer to finish the nose ourselves', { stats: { gold: -4, joy: 3 }, flags: { engineers: 1 }, rival: { target: 'same', rel: 4 } }),
    c('Suggest they leave it noseless', { stats: { joy: 2 }, rival: { target: 'same', rel: -8 } }),
  ], { age: [2, 12], req: ALLY }),
  ev('al_spy_on_ally', 'rival', '🕵️', 'Spying on Friends', 'Our spies ask permission to keep watching {rival}. "Allies today, who knows tomorrow." Their rationale is a shrug.', [
    c('Keep spying', { flags: { spies: 1 }, rival: { target: 'same', rel: -4 } }),
    c('Stop, and tell them we stopped', { flags: { diplomats: 1 }, rival: { target: 'same', rel: 8 }, text: 'They thank us and quietly stop spying on us too. Mostly.' }),
  ], { age: [4, 13], req: ALLY }),
  ev('al_final_feast', 'rival', '🍷', 'The Last Feast of Friends', 'With the fleet arriving, {rival} invites us to a feast "while there is still a sky to eat under".', [
    c('Attend and toast the alliance', { stats: { joy: 8, food: -4 }, rival: { target: 'same', rel: 10 }, flags: { party: 1 } }),
    c('Attend and discuss battle plans', { stats: { mil: 8 }, rival: { target: 'same', rel: 4 }, threat: -2 }),
  ], { age: [13, 14], req: ALLY }),
];

const wars: CardDef[] = [
  ev('wr_white_flag', 'rival', '🏳️', 'A White Flag', 'A rider from {rival} arrives with a white flag. On closer inspection it is a tablecloth. There are still crumbs on it.', [
    c('Accept peace', { stats: { joy: 6 }, rival: { target: 'same', rel: 15, war: false } }),
    c('Demand the tablecloth as tribute', { stats: { gold: 3, joy: 2 }, rival: { target: 'same', rel: 5, war: false } }),
    c('Keep fighting', { stats: { mil: 3, joy: -3 }, rival: { target: 'same', rel: -5 } }),
  ], { age: [0, 14], req: WAR }),
  ev('wr_siege_snacks', 'rival', '🏰', 'The Siege Is Boring', 'Our siege of {rival}\'s fortress has lasted months. Both sides now trade snacks over the walls at lunchtime.', [
    chk('Storm the walls after lunch', { stats: { food: -3 } }, {
      base: 0.4, stats: { mil: 0.003 }, flags: { engineers: 0.06, yeet: 0.06 },
      success: { text: 'The fortress falls. They were mid-dessert. It felt rude, but it worked.', effect: { stats: { gold: 10, mil: 4 }, rival: { target: 'same', mil: -10, rel: -10 } } },
      fail: { text: 'They saw us coming. They always see us coming. We are very loud.', effect: { stats: { mil: -8, joy: -4 } } },
    }),
    c('Turn the snack trade into a truce', { stats: { food: 3 }, rival: { target: 'same', rel: 10, war: false } }),
  ], { age: [1, 9], req: WAR }),
  ev('wr_prisoners', 'rival', '⛓️', 'Prisoner Exchange', '{rival} offers to swap prisoners. They have twelve of our soldiers. We have one of theirs, who refuses to leave because of our food.', [
    c('Swap twelve for one', { stats: { pop: 1, joy: 3 }, rival: { target: 'same', rel: 6 } }),
    c('Offer them our cook', { stats: { joy: 2, food: -2 }, rival: { target: 'same', rel: 10 }, text: 'The war ends shortly after, for reasons historians call "gravy".' }),
  ], { age: [1, 12], req: WAR }),
  ev('wr_weary', 'event', '😩', 'War Weariness', 'The war with {rival} has gone on for so long the soldiers have started knitting between battles. The scarves are excellent.', [
    c('Sell the scarves to fund the war', { stats: { gold: 6, joy: -3 } }),
    c('Sue for peace', { stats: { joy: 6, mil: -3 }, rival: { target: 'same', rel: 10, war: false } }),
    c('Rally the troops with a speech', { stats: { mil: 4, joy: 2 }, flags: { propaganda: 1 } }),
  ], { age: [2, 13], req: WAR }),
  ev('wr_holiday', 'rival', '🎄', 'Ceasefire for the Holiday', 'Soldiers on both sides have stopped fighting for the midwinter festival. Someone brought a ball. The generals are furious.', [
    c('Let them play', { stats: { joy: 8 }, flags: { party: 1 }, rival: { target: 'same', rel: 10 } }),
    c('Order an attack during the match', { stats: { mil: 5, joy: -8, faith: -3 }, rival: { target: 'same', rel: -15, mil: -5 } }),
  ], { age: [3, 12], req: WAR }),
  ev('wr_alien_threat', 'alien', '📡', '{rival} Is Talking to the Sky', 'Spies report that {rival}, still at war with us, has been signalling the alien fleet. Their message is "we know where they live".', [
    c('Make peace before it is too late', { stats: { gold: -10 }, rival: { target: 'same', rel: 20, war: false }, threat: -2 }),
    c('Jam their signals', { stats: { sci: 4 }, flags: { spies: 1 }, threat: -1 }),
    c('Signal the aliens first', { flags: { alien_contact: 1 }, alienRel: 5, rival: { target: 'same', rel: -10 } }),
  ], { age: [10, 14], req: WAR }),
  ev('wr_bonds', 'policy', '📜', 'War Bonds', 'The treasury wants to sell war bonds to fund the war with {rival}. The posters show {leader} pointing at the viewer. It is unsettling.', [
    c('Sell the bonds', { stats: { gold: 10, joy: -3 }, flags: { debt: 1, propaganda: 1 } }),
    c('Sell peace bonds instead', { stats: { gold: 4, joy: 3 }, rival: { target: 'same', rel: 6 } }),
  ], { age: [6, 12], req: WAR }),
  ev('wr_champion', 'rival', '🤺', 'Single Combat', '{rival} proposes ending the war by single combat between champions. Their champion is enormous. Ours is very confident.', [
    chk('Accept the duel', {}, {
      base: 0.4, stats: { mil: 0.002 }, flags: { cats: 0.04, catmech: 0.08, genes: 0.06 },
      success: { text: 'Our champion wins by making their champion laugh until he falls over. The war ends.', effect: { stats: { joy: 10 }, rival: { target: 'same', rel: 10, war: false } } },
      fail: { text: 'Our champion loses gracefully and is carried home on a shield, still confident.', effect: { stats: { joy: -6, gold: -6 }, rival: { target: 'same', rel: 5, war: false } } },
    }),
    c('Decline, keep the war', { stats: { mil: 3, joy: -2 } }),
  ], { age: [1, 8], req: WAR }),
  ev('wr_occupation', 'rival', '🏘️', 'The Occupied Village', 'We captured a village from {rival}. The villagers are polite, pay their taxes and spy on us constantly.', [
    c('Give it back as a goodwill gesture', { stats: { gold: -3 }, rival: { target: 'same', rel: 15 } }),
    c('Win them over with festivals', { stats: { gold: -4, joy: 3 }, flags: { party: 1 }, chain: step('wr_occupation_2', 3) }),
    c('Spy on them back', { flags: { spies: 1 }, stats: { mil: 2 } }),
  ], { age: [2, 11], req: WAR }),
  s('wr_occupation_2', 'rival', '🎊', 'The Village Votes', 'The festive occupied village has voted to stay with us. {rival} says the vote was rigged with cake. It was.', [
    c('Accept the result', { stats: { pop: 2, joy: 3 }, rival: { target: 'same', rel: -8 } }),
    c('Hold a second vote, without cake', { stats: { joy: -2 }, rival: { target: 'same', rel: 6 }, text: 'The village votes to stay anyway. It liked the cake that much.' }),
  ]),
  ev('wr_last_war', 'rival', '⚔️', 'War at the End of the World', 'The fleet is almost here and we are still at war with {rival}. Both armies keep looking up mid-battle.', [
    c('Call a truce for the end of the world', { stats: { joy: 4 }, rival: { target: 'same', rel: 20, war: false }, threat: -2 }),
    c('Finish the war first', { stats: { mil: -6 }, rival: { target: 'same', mil: -15, rel: -10 }, threat: 2 }),
  ], { age: [13, 14], req: WAR }),
];

const friends: CardDef[] = [
  ev('fr_trade_pact', 'rival', '🤝', 'A Proper Trade Pact', '{rival} likes us. They propose a permanent trade pact: our goods, their goods, everyone\'s tariffs abolished, except on hats.', [
    c('Sign the pact', { rival: { target: 'same', rel: 6, trade: true } }),
    c('Sign, but include hats', { stats: { joy: 2 }, rival: { target: 'same', rel: -2, trade: true }, text: 'They sign. Their hat lobby is in mourning.' }),
    c('Not now', { rival: { target: 'same', rel: -3 } }),
  ], { age: [1, 13], req: FRIEND }),
  ev('fr_wedding', 'rival', '💒', 'A Love Match', 'Our heir and {rival}\'s heir have fallen in love. For real. Diplomats on both sides are deeply uncomfortable with how genuine it is.', [
    c('Bless the marriage and an alliance', { stats: { joy: 6, gold: -5 }, rival: { target: 'same', rel: 10, ally: true } }),
    c('Bless the marriage, skip the alliance', { stats: { joy: 5 }, rival: { target: 'same', rel: 6 } }),
    c('Forbid it, dramatically', { stats: { joy: -4, weird: 3 }, rival: { target: 'same', rel: -10 }, text: 'A tragic play about it becomes the most popular work in both nations.' }),
  ], { age: [1, 9], req: FRIEND }),
  ev('fr_festival', 'rival', '🎆', 'Joint Festival', '{rival} invites us to co-host the Festival of Neighbours. Each side brings a dish. Both sides plan to secretly bring a better dish.', [
    c('Bring the better dish', { stats: { joy: 6, food: -4 }, rival: { target: 'same', rel: 4 }, flags: { party: 1 } }),
    c('Bring the same dish as them, as a gesture', { stats: { joy: 4 }, rival: { target: 'same', rel: 10 } }),
  ], { age: [0, 12], req: FRIEND }),
  ev('fr_alliance_offer', 'rival', '📯', 'A Formal Alliance', 'After years of good relations, {rival} asks to make it official. Their envoy has brought a ring. It is a treaty ring. It still feels like a lot.', [
    c('Say yes', { rival: { target: 'same', rel: 10, ally: true } }),
    c('Ask for time', { stats: { joy: -2 }, rival: { target: 'same', rel: -4 } }),
  ], { age: [1, 13], req: { rivalRel: [55, 100] } }),
  ev('fr_students', 'rival', '🎒', 'Exchange Students', '{rival} wants to send exchange students. They are bright, polite and will learn all our secrets within a week.', [
    c('Welcome them', { stats: { sci: 4 }, rival: { target: 'same', rel: 8 } }),
    c('Send ours in return', { stats: { sci: 6, gold: -3 }, flags: { scholars: 1 }, rival: { target: 'same', rel: 6 } }),
  ], { age: [3, 12], req: FRIEND }),
  ev('fr_their_ducks', 'rival', '🦆', 'Their Ducks Have Rights Too', '{rival} has followed our example and given ducks the vote. Their ducks immediately voted to be friends with our ducks.', [
    c('Host a duck summit', { stats: { joy: 4, weird: 3 }, flags: { ducks: 1 }, rival: { target: 'same', rel: 6 } }),
    c('Tell them it was a joke', { stats: { joy: -2 }, rival: { target: 'same', rel: -6 } }),
  ], { age: [5, 12], req: { rivalRel: [40, 100], flags: { ducks: 1 } } }),
  ev('fr_canal', 'rival', '🚢', 'The Shared Canal', '{rival} proposes digging a canal through the border so both nations can trade by boat. Engineers on both sides are excited. Geologists are not.', [
    c('Dig it together', { stats: { gold: -8 }, flags: { navy: 1, logistics: 1 }, rival: { target: 'same', rel: 8, trade: true } }),
    c('Dig our half deeper', { stats: { gold: -5, weird: 3 }, flags: { hole: 1 } }),
  ], { age: [4, 11], req: FRIEND }),
  ev('fr_their_robots', 'rival', '🤖', '{rival}\'s Robots Are Lonely', '{rival}\'s robots have asked whether our robots would like to be pen pals. The letters are mostly numbers, and very sweet.', [
    c('Connect the robots', { stats: { sci: 6 }, flags: { robots: 1 }, rival: { target: 'same', rel: 6 } }),
    c('Read the letters first', { flags: { spies: 1 }, stats: { sci: 3 }, rival: { target: 'same', rel: -2 } }),
  ], { age: [8, 13], req: FRIEND }),
  ev('fr_sky_watch', 'rival', '🔭', 'Shared Sky Watch', '{rival} offers to share their observatory data on the alien fleet. Their astronomers have been counting ships. They ran out of numbers.', [
    c('Share data both ways', { stats: { sci: 8 }, rival: { target: 'same', rel: 6 }, threat: -2 }),
    c('Take their data, keep ours', { stats: { sci: 5 }, rival: { target: 'same', rel: -6 }, threat: -2 }),
  ], { age: [9, 14], req: FRIEND }),
  ev('fr_gift_cheese', 'rival', '🧀', 'An Enormous Cheese', '{rival} has sent us a cheese the size of a cart as a token of friendship. It is a lovely gesture. It is also getting warm.', [
    c('Hold a cheese festival', { stats: { joy: 6, food: 6 }, rival: { target: 'same', rel: 4 } }),
    c('Send an even bigger cheese back', { stats: { food: -8 }, rival: { target: 'same', rel: 10 }, chain: step('fr_cheese_2', 3) }),
  ], { age: [1, 10], req: FRIEND }),
  s('fr_cheese_2', 'rival', '🧀', 'The Cheese Escalation', '{rival} has replied to our cheese with a cheese so large it required its own road. Both nations\' farmers are exhausted and very proud.', [
    c('Call it a tie and eat both', { stats: { food: 10, joy: 6 }, rival: { target: 'same', rel: 10 } }),
    c('Build a cheese bigger than a village', { stats: { food: -12, joy: 4, weird: 6 }, rival: { target: 'same', rel: 4 }, text: 'It is visible from the moon. The aliens note it in their files.' }),
  ]),
];

const foes: CardDef[] = [
  ev('fo_sabotage', 'rival', '🧨', 'Sabotage at the Granary', 'Someone from {rival} snuck into the granary and replaced all the grain with very convincing sand.', [
    c('Retaliate in kind', { stats: { food: -4 }, flags: { spies: 1 }, rival: { target: 'same', rel: -8 } }),
    c('Double the guards', { stats: { food: -4, gold: -3, mil: 2 } }),
    c('Sell the sand as glass material', { stats: { food: -4, gold: 5 } }),
  ], { age: [1, 10], req: FOE }),
  ev('fo_spy_ring', 'rival', '🕵️', 'A Spy Ring', 'We uncovered a {rival} spy ring in the capital. Its members include a baker, a bishop and our minister of spies.', [
    chk('Use them to feed false information', {}, {
      base: 0.4, flags: { spies: 0.1, custom_secret: 0.15 },
      success: { text: '{rival} now believes our army is twice the size and allergic to them.', effect: { stats: { mil: 4 }, flags: { spies: 1 }, rival: { target: 'same', rel: -4, mil: -5 } } },
      fail: { text: 'The baker figured it out and told everyone at breakfast.', effect: { stats: { joy: -4 }, rival: { target: 'same', rel: -6 } } },
    }),
    c('Arrest them all', { stats: { joy: -2, mil: 2 }, rival: { target: 'same', rel: -6 } }),
    c('Keep the baker, he is good', { stats: { food: 3, joy: 3 } }),
  ], { age: [3, 13], req: FOE }),
  ev('fo_side_aliens', 'alien', '🛸', '{rival} Threatens to Join the Aliens', '{rival} has announced that if we do not cede the border hills, they will "help the visitors find their way around".', [
    c('Cede the hills', { stats: { gold: -6, joy: -4 }, rival: { target: 'same', rel: 20 } }),
    c('Call their bluff', { stats: { mil: 4 }, rival: { target: 'same', rel: -10 }, threat: 3 }),
    c('Tell the aliens about {rival} first', { flags: { alien_contact: 1 }, alienRel: 3, rival: { target: 'same', rel: -15 } }),
  ], { age: [10, 14], req: FOE }),
  ev('fo_map_leak', 'alien', '🗺️', '{rival} Sold Our Maps', 'Intelligence reports {rival} has sold detailed maps of our country to the alien fleet. The maps are flattering, at least.', [
    c('Redraw the country', { stats: { gold: -8, weird: 6 }, flags: { engineers: 1 }, threat: -2 }),
    c('Plant fake maps for the aliens', { flags: { spies: 1 }, threat: -3 }),
    c('Accept it and dig in', { stats: { mil: 6 }, threat: 2 }),
  ], { age: [10, 14], req: FOE }),
  ev('fo_propaganda', 'rival', '📰', 'Smear Campaign', '{rival}\'s newspapers say {leader} eats soup with a fork. It is technically true.', [
    c('Counter-campaign: "the fork was a spoon"', { stats: { joy: 3 }, flags: { propaganda: 1 }, rival: { target: 'same', rel: -4 } }),
    c('Lean into it: soup forks for everyone', { stats: { joy: 5, weird: 4 } }),
  ], { age: [5, 13], req: FOE }),
  ev('fo_poisoned_gift', 'rival', '🎁', 'A Gift From an Enemy', '{rival}, who hates us, has sent a gift. It is a beautiful clock. It ticks backwards. It ticks loudly.', [
    luck('Open the back of the clock', [
      o(1, 'It is just a clock. A bad, loud clock.', { stats: { joy: -2 } }),
      o(1, 'There is a tiny spy inside. He is very sorry.', { stats: { sci: 3 }, flags: { spies: 1 } }),
      o(1, 'There is a note: "for the end". Nobody likes that.', { stats: { weird: 5 }, threat: 1 }),
    ]),
    c('Send it back unopened', { rival: { target: 'same', rel: -4 } }),
  ], { age: [2, 12], req: FOE }),
  ev('fo_border_shout', 'rival', '📢', 'The Border Shouting', '{rival}\'s soldiers have been shouting insults across the border every morning. Some of them are quite inventive.', [
    c('Hire better shouters', { stats: { joy: 4, gold: -2 }, rival: { target: 'same', rel: -4 } }),
    c('Write down the best insults and sell them', { stats: { gold: 5 } }),
    c('Declare war', { stats: { mil: 3 }, rival: { target: 'same', rel: -15, war: true } }),
  ], { age: [0, 10], req: FOE }),
  ev('fo_assassin', 'rival', '🗡️', 'An Assassin Sent Back', 'An assassin from {rival} reached the throne room, saw {leader} eating breakfast, and lost his nerve. He would like a job.', [
    c('Hire him as a bodyguard', { stats: { mil: 3 }, flags: { spies: 1 } }),
    c('Send him back with a note', { rival: { target: 'same', rel: -6 }, text: 'The note says "nice try". {rival} has framed it.' }),
  ], { age: [2, 13], req: FOE }),
  ev('fo_dam', 'rival', '🌊', 'They Dammed the River', '{rival} has built a dam upstream. Our river is now a series of puddles, each with a disappointed fish.', [
    chk('Send engineers to "inspect" it', { stats: { gold: -3 } }, {
      base: 0.4, flags: { engineers: 0.1, spies: 0.06 },
      success: { text: 'The dam develops a mysterious leak shaped exactly like our river.', effect: { stats: { food: 8 }, rival: { target: 'same', rel: -8 } } },
      fail: { text: 'The engineers are caught admiring the dam and asking for blueprints.', effect: { stats: { joy: -3 }, rival: { target: 'same', rel: -4 } } },
    }),
    c('Dig wells instead', { stats: { gold: -5, food: 3 }, flags: { hole: 1 } }),
    c('Buy water from them', { stats: { gold: -6, food: 5 }, rival: { target: 'same', rel: 6 } }),
  ], { age: [2, 11], req: FOE }),
  ev('fo_their_storyline', 'rival', '🍄', '{rival} Has Been Taken by Fungus', 'Our enemy {rival} has been absorbed by a vast mushroom network. Their insults now arrive as spores, and smell faintly of soil.', [
    c('Burn the spores at the border', { stats: { mil: 3, food: -2 }, rival: { target: 'same', rel: -6 } }),
    c('Ask the mushroom if it is still angry', { stats: { weird: 4 }, flags: { fungus: 1 }, rival: { target: 'same', rel: 12 }, text: 'It is not. It is mostly just damp.' }),
  ], { age: [4, 12], req: FOE }),
  ev('fo_alien_envoy', 'alien', '👽', 'The Aliens Visited {rival} First', 'The alien envoy stopped at {rival} before us. They were given a feast, a tour and, apparently, a list of our weaknesses.', [
    c('Throw a bigger feast', { stats: { food: -8, joy: 3 }, alienRel: 6 }),
    c('Publish a list of {rival}\'s weaknesses', { flags: { propaganda: 1 }, rival: { target: 'same', rel: -10 }, alienRel: 2 }),
    c('Seek peace with {rival} quietly', { stats: { gold: -5 }, rival: { target: 'same', rel: 15 }, threat: -2 }),
  ], { age: [11, 14], req: FOE }),
  ev('fo_reconcile', 'rival', '🕊️', 'An Unexpected Letter', 'A letter has arrived from {rival}. It says the sky is falling and old grudges seem small now. It is signed, which they never do.', [
    c('Write back warmly', { stats: { joy: 3 }, rival: { target: 'same', rel: 25 } }),
    c('Write back suspiciously', { flags: { spies: 1 }, rival: { target: 'same', rel: 5 } }),
    c('Add it to the grudge archive', { flags: { grudge: 1 }, rival: { target: 'same', rel: -5 } }),
  ], { age: [12, 14], req: FOE }),
];

export const rivalRelationCards: CardDef[] = [...allies, ...wars, ...friends, ...foes];
