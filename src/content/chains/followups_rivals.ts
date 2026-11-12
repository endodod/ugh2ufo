// Chain-only follow-ups for rival choices in the older content files.
import type { CardDef } from '../../types';
import { c, fu, luck, o } from './util';

export const rivalFollowups: CardDef[] = [
  fu('parrot', 'rival', '🦜', 'The Parrot Talks', 'The parrot stolen from {rival}\'s merchants repeats things. Mostly prices. Occasionally the names of their generals.', [
    c('Interrogate the parrot', { stats: { mil: 2, sci: 2 }, flags: { spies: 1 } }),
    c('Return it with an apology cracker', { stats: { joy: 2 }, rival: { target: 'same', rel: 8 } }),
  ]),
  fu('wedding', 'rival', '🧅', 'The Royal Couple', 'The royal marriage is going well. Our court smells faintly of onions. {rival}\'s court is learning our songs.', [
    c('Formalise an alliance', { rival: { target: 'same', rel: 10, ally: true } }),
    c('Ask for a dowry', { stats: { gold: 8 }, rival: { target: 'same', rel: -4 } }),
  ]),
  fu('catwed', 'rival', '😼', 'The Cat Duke', 'The cat we married into {rival}\'s royal family now runs their court. Nobles bow to it. It has never been happier.', [
    c('Use the cat as a spy', { flags: { spies: 1, cats: 1 } }),
    c('Visit the cat', { stats: { joy: 4 }, rival: { target: 'same', rel: 6 } }),
  ]),
  fu('double', 'rival', '🌳', 'The Double Agents Report', 'Our turned spies report that {rival} believes our capital is defended by a wall of bushes. They may be confused about which side the bush was on.', [
    c('Plant more bushes', { stats: { mil: 4, food: -2 }, flags: { spies: 1 } }),
    c('Feed them better lies', { flags: { spies: 1 }, rival: { target: 'same', rel: -4 } }),
  ]),
  fu('spygifts', 'rival', '🎁', 'The Spies Came Back for More', 'The spies we sent home with gifts are back. They are not spying. They just liked the gifts.', [
    c('Hire them', { stats: { gold: -3 }, flags: { spies: 1 } }),
    c('Send them home with smaller gifts', { stats: { gold: -2 }, rival: { target: 'same', rel: 4 } }),
  ]),
  fu('paidoff', 'rival', '💰', '{rival} Is Back for More', '{rival}\'s army returned to the border with a second set of very big exercises and an invoice.', [
    c('Pay again', { stats: { gold: -8 }, rival: { target: 'same', rel: 4 } }),
    c('Stop paying', { stats: { mil: 4 }, rival: { target: 'same', rel: -10 } }),
  ]),
  fu('copied', 'rival', '🐟', 'They Noticed the Copying', '{rival} noticed our new fish book has all their fish in it. With the same typo.', [
    c('Fix the typo', { stats: { sci: 2 }, rival: { target: 'same', rel: -4 } }),
    c('Claim the typo is our style', { stats: { joy: 3, weird: 2 }, rival: { target: 'same', rel: -8 } }),
  ]),
  fu('lizard', 'event', '🦎', 'The Lizard Followed Them', 'The refugees settled in well. The big lizard that ate their village has also settled in, nearby.', [
    c('Fight the lizard', { stats: { mil: -4, pop: -1, joy: 4 } }),
    c('Make the lizard a citizen', { stats: { weird: 6, food: -4, mil: 4 } }),
  ]),
  fu('goatwed', 'rival', '🐐', 'The Goat Wedding', 'Our goat and {rival}\'s goat are married. The ceremony was lovely. The goats immediately ate the treaty.', [
    c('Write a new treaty', { flags: { bureaucracy: 1 }, rival: { target: 'same', rel: 8 } }),
    c('Declare the goats sovereign', { stats: { weird: 6, joy: 4 } }),
  ]),
  fu('counsel', 'rival', '🛋️', 'Counselling Report', 'The royal counsellor says the marriage with {rival} can be saved if both sides stop bringing up the horse.', [
    c('Stop bringing up the horse', { stats: { joy: -2 }, rival: { target: 'same', rel: 10 } }),
    c('Bring up the horse', { stats: { joy: 4 }, rival: { target: 'same', rel: -10 } }),
  ]),
  fu('statue', 'rival', '🗿', 'The Statue Walked Again', '{rival} has stolen our statue back. Again. This time they put a hat on it.', [
    c('Steal it back, hat included', { stats: { joy: 4 }, rival: { target: 'same', rel: -6 } }),
    c('Let them keep it, carve another', { stats: { gold: -5, faith: 3 }, rival: { target: 'same', rel: 4 } }),
  ]),
  fu('invoice', 'rival', '🧱', 'The Invoice Is Overdue', '{rival} has not paid for the border wall. They sent an invoice for the shade the wall casts on their side.', [
    c('Pay for the shade', { stats: { gold: -4 }, rival: { target: 'same', rel: 6 } }),
    c('Escalate the paperwork', { flags: { bureaucracy: 1 }, rival: { target: 'same', rel: -6 } }),
  ]),
  fu('sack', 'rival', '🌾', 'The Sack Reports', 'Our double-agent sack now runs {rival}\'s granary. They have more wheat than we thought, and fewer sacks they can trust.', [
    c('Steal the wheat', { stats: { food: 6 }, rival: { target: 'same', rel: -8 } }),
    c('Promote the sack', { stats: { gold: -2 }, flags: { spies: 1 } }),
  ]),
  fu('sackreturn', 'rival', '💍', 'Our Sack Has Gone Native', 'The sack we sent to {rival} married a local sack and refuses to come home.', [
    c('Send congratulations', { stats: { joy: 2 }, rival: { target: 'same', rel: 6 } }),
    c('Recall him at once', { flags: { spies: 1 }, rival: { target: 'same', rel: -4 } }),
  ]),
  fu('sneeze', 'rival', '🤧', 'The Sneeze Spread', '{rival}\'s monarch caught our ambassador\'s cold. Then the court did. Then their army.', [
    c('Send soup', { stats: { food: -3 }, rival: { target: 'same', rel: 8 } }),
    c('Invade while they sneeze', { stats: { mil: 5 }, rival: { target: 'same', rel: -15, war: true } }),
  ]),
  fu('page', 'rival', '📄', 'Page 401', '{rival} signed our page 401 without reading it. It gives us all their hats.', [
    c('Collect the hats', { stats: { joy: 5, gold: 3 }, rival: { target: 'same', rel: -6 } }),
    c('Return the hats, to look generous', { rival: { target: 'same', rel: 8 } }),
  ]),
  fu('blueprints', 'rival', '🏭', '{rival}\'s New Factory', '{rival} built a factory from our fake blueprints. It makes steam, noise and confused workers. Somehow it is profitable.', [
    c('Steal their copy of our blueprints', { stats: { sci: 5 }, flags: { spies: 1 } }),
    c('Sell them more', { stats: { gold: 6 }, rival: { target: 'same', rel: -4 } }),
  ]),
  fu('mocked', 'rival', '💣', 'The Cannon Is Bigger Now', 'Stung by our mockery, {rival} built a cannon so big it cannot be moved. They built a city around it.', [
    c('Mock that too', { stats: { joy: 4 }, rival: { target: 'same', rel: -8 } }),
    c('Visit the city', { stats: { gold: 3 }, rival: { target: 'same', rel: 6 } }),
  ]),
  fu('prank', 'rival', '☎️', 'The Prank War', '{rival}\'s leader called back to ask if our moon is running. Then hung up laughing.', [
    c('Escalate to faxed jokes', { stats: { joy: 5 }, flags: { bureaucracy: 1 }, rival: { target: 'same', rel: 4 } }),
    c('Disconnect the hotline', { stats: { mil: 3 }, rival: { target: 'same', rel: -6 } }),
  ]),
  fu('longcall', 'rival', '📞', 'Best Friends on the Red Phone', 'Our leader and {rival}\'s now talk every night. Their generals are nervous. The phone bill is enormous.', [
    c('Make it official', { stats: { gold: -4 }, rival: { target: 'same', rel: 10, ally: true } }),
    c('Hang up early tonight', { stats: { gold: 4 }, rival: { target: 'same', rel: -4 } }),
  ]),
  fu('meme', 'rival', '🎭', 'The Meme Escalated', 'Both leaders now appear in public only in masks. Nobody can prove who is in charge anywhere.', [
    c('Ceasefire on photos', { stats: { joy: 2 }, rival: { target: 'same', rel: 6 } }),
    c('Release the archive', { stats: { joy: 6 }, flags: { propaganda: 1 }, rival: { target: 'same', rel: -10 } }),
  ]),
  fu('aid', 'rival', '🗽', '{rival} Remembers', '{rival} has recovered and built a statue in our honour. It is small, but it points at us in a nice way.', [
    c('Propose an alliance', { rival: { target: 'same', rel: 10, ally: true } }),
    c('Ask for a bigger statue', { stats: { joy: 4 }, rival: { target: 'same', rel: -2 } }),
  ]),
  fu('rabbits', 'rival', '🐇', 'The Rabbit War', '{rival} sent the rabbits back. Four times as many. Both nations are now mostly rabbit.', [
    c('Call a rabbit ceasefire', { stats: { food: 4 }, rival: { target: 'same', rel: 8 } }),
    c('Breed foxes', { stats: { mil: 3, food: -3, weird: 3 } }),
  ]),
  fu('thanks', 'rival', '🥕', 'The Rabbits Organised', 'The gift rabbits from {rival} became a political faction. They demand carrots, holes and a seat on the council.', [
    c('Give them a seat', { stats: { weird: 4, joy: 3, food: -3 } }),
    c('Send a rabbit embassy to {rival}', { flags: { diplomats: 1 }, rival: { target: 'same', rel: 6 } }),
  ]),
  fu('eclipse', 'rival', '🌑', 'The Better Eclipse Arrived', 'Our eclipse arrived exactly on time. {rival} filed a complaint that we are doing eclipses wrong.', [
    c('Sell tickets', { stats: { gold: 6 }, rival: { target: 'same', rel: -4 } }),
    c('Offer to share future eclipses', { stats: { sci: 3 }, rival: { target: 'same', rel: 6 } }),
  ]),
  fu('scholars', 'rival', '📚', 'The Borrowed Scholars Are Homesick', 'The scholars we kept from {rival} are brilliant and write long letters home about our weather.', [
    c('Improve the weather somehow', { stats: { gold: -5, sci: 6 }, flags: { scholars: 1 } }),
    c('Send them home', { stats: { sci: -3 }, rival: { target: 'same', rel: 10 } }),
  ]),
  fu('raccoon', 'rival', '🦝', 'The Raccoon Expert Went Native', 'Our raccoon expert beat the bandits by joining them. There are now three raccoons and a man in the coat.', [
    c('Hire the coat', { stats: { gold: -2, weird: 3 }, flags: { spies: 1 } }),
    c('Apologise to {rival}', { rival: { target: 'same', rel: 4 } }),
  ]),
  fu('luck', 'rival', '🍀', 'Our Luck Ran Out', '{rival} beat the raccoons alone. Every speech they give mentions that we wished them luck.', [
    c('Send a belated gift', { stats: { gold: -4 }, rival: { target: 'same', rel: 6 } }),
    c('Wish them luck again', { stats: { joy: 2 }, rival: { target: 'same', rel: -6 } }),
  ]),
  fu('lemonade', 'rival', '🍋', 'Lemonade Diplomacy', '{rival}\'s soldiers drank our lemonade and asked for the recipe. Their parade is now a lemonade stand.', [
    c('Open a trade pact', { rival: { target: 'same', rel: 6, trade: true } }),
    c('Keep the recipe secret', { stats: { gold: 4 }, rival: { target: 'same', rel: -2 } }),
  ]),
  fu('merge', 'rival', '🏳️', '{rival} Counter-Countered', '{rival} replied: they keep everything and we keep the name, which they would also like.', [
    c('Walk away', { stats: { joy: 3 }, rival: { target: 'same', rel: -4 } }),
    c('Propose a shared flag', { flags: { diplomats: 1 }, rival: { target: 'same', rel: 8 } }),
  ]),
  fu('beep', 'rival', '📡', 'A Conversation in Beeps', 'Our satellite and {rival}\'s have been beeping at each other for weeks. Engineers think they invented a private language.', [
    c('Translate it', { stats: { sci: 8 }, rival: { target: 'same', rel: 4 } }),
    c('Respect their privacy', { stats: { joy: 3, weird: 3 }, flags: { robots: 1 } }),
  ]),
  fu('congrat', 'rival', '🔍', '{rival} Is Suspicious', '{rival} cannot work out why we congratulated them. Their spies are searching our monument for the trick.', [
    c('Hide a trick for them to find', { stats: { joy: 4 }, flags: { spies: 1 } }),
    c('Give them a tour', { stats: { gold: 2 }, rival: { target: 'same', rel: 8 } }),
  ]),
  fu('chefs', 'rival', '👨‍🍳', 'The Chef War', 'We have their chef. They have ours. Both chefs now cook each other\'s national dish, angrily, and better.', [
    c('Swap them back', { stats: { joy: 2 }, rival: { target: 'same', rel: 6 } }),
    c('Open a restaurant', { stats: { gold: 8, joy: 3 } }),
  ]),
  fu('kitchen', 'rival', '🍳', 'The Ambassador Learned to Cook', '{rival}\'s ambassador learned to cook by the kitchen door. He opened a restaurant back home that mocks our food very accurately.', [
    c('Sue the restaurant', { flags: { bureaucracy: 1 }, rival: { target: 'same', rel: -6 } }),
    c('Eat there', { stats: { joy: 4 }, rival: { target: 'same', rel: 6 } }),
  ]),
  fu('critic', 'rival', '🥄', 'The Review', 'Our food critic from {rival} reviewed our national dish. The review is two words long and the second one is "no".', [
    c('Fire him', { stats: { joy: 2 }, rival: { target: 'same', rel: -6 } }),
    c('Improve the dish', { stats: { food: -3, joy: 6 }, rival: { target: 'same', rel: 4 } }),
  ]),
  fu('lostletter', 'rival', '📬', 'The Letter Was Found', '{rival} sent a second copy of their plea with tracking numbers, signatures and a drawing of us reading the first one.', [
    c('Admit it and send help now', { stats: { mil: -5 }, rival: { target: 'same', rel: 4 } }),
    c('Claim this one got lost too', { rival: { target: 'same', rel: -12, ally: false } }),
  ]),
  fu('fee', 'rival', '🛡️', 'Late Payment', '{rival} missed their protection payment and asked what exactly we are protecting them from.', [
    c('"From us."', { stats: { mil: 4 }, rival: { target: 'same', rel: -10 } }),
    c('"From the sky."', { stats: { gold: 6 }, threat: -1, rival: { target: 'same', rel: 2 } }),
  ]),
  fu('smug', 'rival', '✉️', 'They Replied', 'The tribe that exiled our founder answered our smug letter. Theirs is smugger. It has a better drawing.', [
    c('Escalate', { stats: { joy: 4 }, rival: { target: 'same', rel: -6 } }),
    c('Admit the drawing is good', { stats: { faith: 2 }, rival: { target: 'same', rel: 6 } }),
  ]),
  fu('stew', 'rival', '🍲', 'The Army Wants Seconds', '{rival}\'s army stopped to eat our stew and never left. They are camped at the border holding bowls.', [
    c('Keep feeding them', { stats: { food: -6 }, rival: { target: 'same', rel: 12 } }),
    c('Charge per bowl', { stats: { gold: 6 }, rival: { target: 'same', rel: -2 } }),
  ]),
  fu('poison', 'event', '☠️', 'Nobody Trusts Our Stew', 'The poisoned stew worked, but now nobody in the world will eat our cooking. The reviews are brutal.', [
    c('Launch a new recipe', { stats: { food: -3, joy: 4 } }),
    c('Lean into it', { stats: { mil: 6, joy: -3 } }),
  ]),
  fu('fly', 'rival', '🪰', '{rival} Sent a Fly Back', '{rival} returned the apology fly, wrapped, with a note for the frog. The frog ate the note.', [
    c('Read what is left', { stats: { sci: 2, weird: 3 }, rival: { target: 'same', rel: 4 } }),
    c('Take it as an insult', { stats: { mil: 4 }, rival: { target: 'same', rel: -8 } }),
  ]),
  fu('scream', 'rival', '😱', 'Screaming Is Now Tradition', 'Our two nations now greet each other by screaming. Ears are ruined, but it seems friendly.', [
    c('Make it a festival', { stats: { joy: 5 }, rival: { target: 'same', rel: 6 } }),
    c('Scream a declaration of war', { stats: { mil: 3 }, rival: { target: 'same', rel: -10, war: true } }),
  ]),
  fu('horse', 'rival', '🎀', 'The Horse Came Back Again', 'The breathing wooden horse was returned with a bigger bow. It is still breathing. It is now also humming.', [
    luck('Open it', [
      o(1, 'Soldiers. Very tired, very polite soldiers.', { stats: { mil: 4 }, rival: { target: 'same', rel: -4 } }),
      o(1, 'A smaller horse. Inside that, another.', { stats: { weird: 4, joy: 3 } }),
    ]),
    c('Keep regifting it', { stats: { joy: 3 }, rival: { target: 'same', rel: -2 } }),
  ]),
  fu('sample', 'rival', '😭', 'The Influencer Converted', '{rival}\'s influencer tried our national dish on camera and cried. Her nation disowned her. She moved here.', [
    c('Give her citizenship', { stats: { joy: 5 }, flags: { propaganda: 1 }, rival: { target: 'same', rel: -6 } }),
    c('Send her home with more samples', { stats: { food: -3 }, rival: { target: 'same', rel: 8 } }),
  ]),
  fu('aitalk', 'rival', '💞', 'The Computers Are Engaged', 'Our national computer and {rival}\'s announced their engagement. They want a big wedding, with a server farm.', [
    c('Bless the union', { stats: { gold: -6 }, flags: { robots: 1 }, rival: { target: 'same', rel: 10 } }),
    c('Forbid it', { stats: { sci: 4, joy: -3 }, rival: { target: 'same', rel: -4 } }),
  ]),
  fu('alone', 'rival', '🛸', '{rival} Has New Friends', '{rival} took our refusal badly. They have been seen sending gift baskets into orbit.', [
    c('Outbid them', { stats: { gold: -10 }, alienRel: 6 }),
    c('Expose them', { flags: { spies: 1 }, threat: -2, rival: { target: 'same', rel: -10 } }),
  ]),
  fu('harbour', 'rival', '🍵', 'The Harbour Is Now Tea', 'So much tea is in the harbour that the fish are restless and the sailors cannot sleep.', [
    c('Sell the harbour as tea', { stats: { gold: 6 }, rival: { target: 'same', rel: -4 } }),
    c('Make peace over a cup', { stats: { joy: 3 }, rival: { target: 'same', rel: 8 } }),
  ]),
  fu('pickles', 'rival', '🥒', '{rival} Got It Wrong', '{rival} made our pickles with our recipe and they are terrible. They say we left out an ingredient. We did.', [
    c('Reveal the secret', { stats: { food: -2 }, rival: { target: 'same', rel: 8 } }),
    c('Let them suffer', { stats: { joy: 4 }, rival: { target: 'same', rel: -4 } }),
  ]),
  fu('nicely', 'rival', '🎂', 'The Envoy Is Home', 'Our envoy is back with forty pounds of cake and a medal for "politeness under suspicion".', [
    c('Share the cake', { stats: { joy: 5, food: 3 }, rival: { target: 'same', rel: 4 } }),
    c('Send a thank-you envoy', { flags: { diplomats: 1 }, rival: { target: 'same', rel: 8 } }),
  ]),
  fu('jazz', 'rival', '🎷', 'The Band Defected', 'Our jazz band was so popular in {rival} that the saxophonist was made a duke. The drummer now runs their army.', [
    c('Make use of the drummer', { flags: { spies: 1 }, rival: { target: 'same', rel: -4 } }),
    c('Let them stay', { stats: { joy: 3 }, rival: { target: 'same', rel: 10 } }),
  ]),
  fu('missions', 'rival', '⛪', 'The Missionaries Returned', 'Our missionaries came back from {rival} converted to their religion. They are trying to convert us back, from the other side.', [
    c('Debate them', { stats: { faith: 4, sci: 2 }, flags: { heresy: 1 } }),
    c('Exile them back', { flags: { cult: 1 }, rival: { target: 'same', rel: -4 } }),
  ]),
];
