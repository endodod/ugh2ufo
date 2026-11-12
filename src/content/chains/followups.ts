// Chain-only follow-ups for choices in the older content files (alien contact and misc).
import type { CardDef } from '../../types';
import { c, chk, fu, luck, nx, o } from './util';

const alien: CardDef[] = [
  fu('astro', 'alien', '🔭', 'The Stars Blinked Back', 'The astronomers kept staring at the blinking stars. Last night one of them stared back, then looked away first.', [
    c('Declare victory', { stats: { joy: 3, faith: 2 } }),
    c('Blink back with a lantern', { stats: { weird: 2 }, alienRel: 3, flags: { alien_contact: 1 } }),
  ]),
  fu('radio', 'alien', '📻', 'Listener Mail', 'Our first broadcast got a letter. The stamp is a hexagon and the postmark is a star nobody has named. It asks us to play less polka.', [
    c('Play more polka', { stats: { joy: 4 }, alienRel: -2, threat: 1 }),
    c('Take requests', { stats: { weird: 2 }, alienRel: 4, flags: { alien_contact: 1 } }),
  ]),
  fu('xeno', 'alien', '📑', 'Peer Review From Above', 'Our xenobiology papers got a review from the subjects: "Methodology sound. Our left side is our front, actually."', [
    c('Issue a correction', { stats: { sci: 8 }, alienRel: 4 }),
    c('Stand by the original', { stats: { joy: 3, mil: 4 }, alienRel: -3 }),
  ]),
  fu('pyramid', 'alien', '🔺', 'A Review of the Pyramid', 'Lights circled the new pyramid for three nights. Then a pebble fell from the sky with one word carved into it: "derivative".', [
    c('Build a bigger one out of spite', { stats: { gold: -4, faith: 4, joy: 2 } }),
    c('Carve "no u" on the tip', { stats: { weird: 3 }, alienRel: 2 }),
  ]),
  fu('catsky', 'alien', '🐈', 'The Cats Have Handled It', 'After nineteen days of staring, a small alien satellite fell into the capital, covered in scratches. The cats pretend they were asleep.', [
    c('Reward the cats', { stats: { food: -6, joy: 6 }, flags: { cats: 1 } }),
    c('Study the satellite', { stats: { sci: 10 }, threat: -2, alienRel: -2 }),
  ]),
  fu('chant', 'alien', '📢', 'The Sky Asks Us to Keep It Down', 'The cult chanted louder. The sky has sent a second message: a noise complaint, notarised.', [
    c('Chant at a respectful volume', { stats: { faith: 5 }, alienRel: 4 }),
    c('Chant louder still', { stats: { faith: 10, joy: -3 }, flags: { cult: 1 }, alienRel: -4, threat: 2 }),
  ]),
  fu('skyadvice', 'alien', '🗣️', 'Advice From Above', 'The voice in the sky answered. It advised us to drink more water, invest in shields and "not take it personally when it happens".', [
    c('Invest in shields', { stats: { gold: -10, mil: 12 }, threat: -2 }),
    c('Drink more water', { stats: { joy: 4, pop: 2 } }),
    c('Ask what "it" is', { stats: { sci: 6, weird: 4 }, threat: 1 }),
  ]),
  fu('superdip', 'alien', '🧬', 'The Diplomats Come Back Smug', 'Our superhuman diplomats impressed the fleet, then intimidated it, then annoyed it by correcting its grammar.', [
    c('Promote them', { stats: { sci: 6 }, flags: { diplomats: 1 }, alienRel: -3 }),
    c('Send them back to apologise', { stats: { joy: -3 }, alienRel: 6 }),
  ]),
  fu('faxurgent', 'alien', '📠', 'Your Fax Has Been Escalated', 'The aliens marked our urgent fax as "urgent (low)". It is in a queue behind four planets and a moon.', [
    c('Fax them about the queue', { flags: { bureaucracy: 1 }, threat: -2 }),
    c('Give up and buy a cannon', { stats: { mil: 10, gold: -6 } }),
  ]),
  fu('faxfollow', 'alien', '📠', 'Re: Re: Re: Planet Under Review', 'The aliens replied to our follow-up with a form. Field 7: "reason for continued existence (max. 40 characters)".', [
    c('"We have nice beaches."', { stats: { joy: 3 }, alienRel: 4 }),
    c('Attach a 900-page appendix', { stats: { joy: -3 }, flags: { bureaucracy: 1 }, threat: -3 }),
  ]),
  fu('wave', 'alien', '👋', 'They Waved Back', 'The lights came back and dipped twice, which the shamans agree is a wave. Children now wave at every bright thing, including the fire.', [
    c('Teach fire safety', { stats: { sci: 2, pop: 1 } }),
    c('Wave harder', { stats: { joy: 2, weird: 2 }, alienRel: 3 }),
  ]),
  fu('rocks', 'alien', '🪨', 'One Rock Came Back', 'A rock fell from the sky into the chief\'s soup. It is the same rock we threw. It has been polished.', [
    c('Keep it as a relic', { stats: { faith: 4, weird: 2 } }),
    c('Throw it again, harder', { stats: { mil: 3 }, alienRel: -3, threat: 1 }),
  ]),
  fu('circlereply', 'alien', '🌾', 'Pen Pals', 'Our reply in the wheat got a reply: a diagram of our village with a small arrow labelled "you are here".', [
    c('Draw a map of the stars back', { stats: { sci: 4 }, alienRel: 3, flags: { alien_contact: 1 } }),
    c('Move the village slightly', { stats: { food: -3, mil: 2 }, threat: -1 }),
  ]),
  fu('bort', 'alien', '🧳', 'Bort Returns', 'Uncle Bort returns from the mothership. He has a tan, a pamphlet titled "Your Planet and You: A Transition" and a new way of saying our name.', [
    c('Read the pamphlet', { stats: { sci: 6 }, threat: -2, text: 'Chapter four is about staying calm when the sky opens.' }),
    c('Send Bort up again with a reply', { stats: { weird: 3 }, alienRel: 5, chain: nx('bort2', 3) }),
    c('Ground Bort', { stats: { joy: 2 } }),
  ]),
  fu('bort2', 'alien', '🪪', 'Bort Has a Desk Now', 'A postcard from Bort: he has a desk on the mothership, a title ("Human Consultant") and dental. He says they ask about us a lot.', [
    c('Ask Bort to put in a good word', { alienRel: 8, threat: -2, flags: { alien_contact: 1 }, chain: nx('bort3', 3) }),
    chk('Ask Bort to steal something', {}, {
      base: 0.35, flags: { spies: 0.1, alien_contact: 0.05 },
      success: { text: 'A crate lands in the capital. Inside: a fleet manual and Bort\'s lunch.', effect: { stats: { sci: 12 }, threat: -4 } },
      fail: { text: 'Bort was caught. He has been demoted to the mothership gift shop.', effect: { alienRel: -6, threat: 2 } },
    }),
  ]),
  fu('bort3', 'alien', '💺', 'Bort Saved Us Seats', 'Bort writes that he is coming home on the first landing ship. He has saved us seats and would like to know if we still have his chair.', [
    c('Keep his chair warm', { stats: { joy: 4 }, alienRel: 6 }),
    c('Ask which ship, exactly', { flags: { spies: 1 }, threat: -3 }),
  ]),
  fu('bortdoubt', 'alien', '🪧', 'Bort Was Right', 'The ship Uncle Bort described was seen over the market. Bort is standing in the square holding a sign that just says "well".', [
    c('Apologise to Bort publicly', { stats: { joy: 3, faith: -2, sci: 2 } }),
    c('Still not believe Bort', { stats: { joy: -2, weird: 3 }, threat: 2 }),
  ]),
  fu('farone', 'alien', '🌌', 'The Far One Is Interested', 'The bigger, further voice answered. It wants to know who else is out here. It sounds hungry, in a polite way.', [
    c('Mention the approaching fleet', { flags: { alien_contact: 1 }, threat: -4, alienRel: -4, text: 'The far voice says "oh, them". The fleet goes quiet for a week.' }),
    c('Say it is just us', { stats: { weird: 4 }, threat: 1 }),
  ]),
  fu('nearone', 'alien', '🎟️', 'The Near One Is Flattered', 'The fleet is delighted we answered them first. They sent a gift voucher and moved our planet up their itinerary.', [
    c('Use the voucher', { stats: { gold: 8 }, threat: 2 }),
    c('Ask to be moved back down', { alienRel: -2, threat: -2 }),
  ]),
  fu('bigcat', 'alien', '🐱', 'The Big Ones Want More Cats', 'The distant species answered the cat picture with eleven thousand messages. All of them ask for more cat pictures.', [
    c('Start a cat broadcast', { stats: { sci: -3 }, flags: { cats: 1, alien_contact: 1 }, alienRel: 4 }),
    c('Charge per picture', { stats: { gold: 12 }, flags: { cats: 1 } }),
  ]),
  fu('hangup', 'alien', '☎️', 'They Called Back', 'The distant species called back. They say we were "cut off". They sound like they are writing something down.', [
    c('Pick up', { stats: { weird: 4 }, flags: { alien_contact: 1 } }),
    c('Let it ring forever', { stats: { joy: -4 }, threat: 2 }),
  ]),
  fu('tour', 'alien', '📸', 'The Ambassador\'s Holiday Photos', 'The very tall ambassador published his holiday photos of us. Every one is of a gate, a wall or a cannon. The captions are numbers.', [
    c('Move the cannons around', { stats: { mil: 6, gold: -4 }, threat: -2 }),
    c('Ask him to tag us', { stats: { weird: 3 }, alienRel: 4 }),
  ]),
  fu('bass', 'alien', '🔊', 'A Neighbour Two Light-Years Away', 'A message arrived from two light-years away. It is their word for "the bass", followed by "more".', [
    c('Give them more', { stats: { joy: 4 }, flags: { party: 1 }, alienRel: 6, threat: 1 }),
    c('Send a setlist', { stats: { gold: -3, sci: 3 }, alienRel: 4 }),
  ]),
  fu('beacon', 'alien', '🔦', 'The Beacon Got a Prayer Back', 'The aliens want to know if our god is taking new followers, and whether there is parking.', [
    c('Welcome the converts', { stats: { faith: 6 }, flags: { cult: 1 }, alienRel: 6 }),
    c('Our god is full', { stats: { faith: 4 }, threat: 1 }),
  ]),
  fu('dish', 'alien', '📡', 'Wrong Number', 'The deep space dish got an answer: an automated menu in four hundred languages. Press 1 for invasions. Press 2 for tourism.', [
    c('Press 2', { stats: { gold: 5 }, alienRel: 6, threat: -2 }),
    luck('Press 1 to see what happens', [
      o(1, 'You are on hold. The music is lovely.', { stats: { joy: 4 } }),
      o(1, 'Your invasion has been confirmed. Thank you for choosing us.', { stats: { sci: 6 }, threat: 4 }),
    ]),
    c('Press 0 for a human', { stats: { weird: 5 }, flags: { alien_contact: 1 }, text: 'A human answers. He sounds a lot like Uncle Bort.' }),
  ]),
  fu('bread', 'alien', '🍞', 'Bread Received', 'The aliens spent a month translating the pigeons\' message. Their reply: one enormous loaf, lowered from orbit.', [
    c('Eat the loaf', { stats: { food: 15, joy: 6 } }),
    c('Study the loaf', { stats: { sci: 10 }, flags: { alien_contact: 1 } }),
    c('Feed it to the pigeons', { stats: { joy: 3 }, flags: { pigeons: 1 }, alienRel: 4 }),
  ]),
  fu('geraldsilent', 'alien', '🪨', 'Gerald\'s Answer', 'Gerald has been asked about the aliens for three weeks and has not answered. The aliens have started sending their own questions to Gerald.', [
    c('Let Gerald handle diplomacy', { flags: { gerald: 1 }, alienRel: 5, threat: -2 }),
    c('Unplug Gerald', { stats: { sci: -6, joy: -4 }, text: 'Gerald does not seem to need power. That is worse.' }),
  ]),
  fu('forgive', 'alien', '🕊️', 'Forgiveness Was Noticed', 'The aliens heard the Grudge Keepers forgave everyone. Their analysts suspect a trick of unprecedented subtlety.', [
    c('Keep forgiving', { stats: { joy: 5, faith: 3 }, alienRel: 6 }),
    c('Remember one small thing again', { stats: { mil: 6 }, flags: { grudge: 1 }, threat: -2 }),
  ]),
  fu('ducksue', 'alien', '🦆', 'The Duck Court Has a Verdict', 'The fleet was found guilty of trespass, loitering and "being suspicious near a pond". It has been served. Nobody knows how.', [
    c('Enforce the ruling', { stats: { mil: 6 }, flags: { ducks: 1 }, threat: -3 }),
    c('Settle out of court', { stats: { gold: 12 }, alienRel: 4 }),
  ]),
  fu('basket', 'alien', '🧺', 'The Basket Landed', 'The gift basket hit the flagship at seven kilometres per second. The aliens sent a thank-you note and an insurance claim.', [
    c('Pay the claim', { stats: { gold: -10 }, alienRel: 6 }),
    c('Throw another basket', { stats: { mil: 6 }, flags: { yeet: 1 }, alienRel: -3, threat: -2 }),
  ]),
  fu('salsa', 'alien', '🌶️', 'The Salsa Crisis', 'Three alien delegates tried our mildest salsa and are still in the infirmary. The fourth asked for the recipe, quietly.', [
    c('Give the fourth the recipe', { stats: { gold: 4 }, flags: { spice: 1 }, alienRel: 8 }),
    c('Apologise with yoghurt', { stats: { food: -4, joy: 2 }, alienRel: 4 }),
  ]),
  fu('biscuit', 'alien', '🐕', 'Biscuit\'s Report', 'Biscuit is back from the mothership with a tiny medal, a sunburnt nose and the commander\'s slipper. He will not give back the slipper.', [
    c('Return the slipper', { stats: { joy: 3 }, alienRel: 8 }),
    c('Keep it as leverage', { stats: { mil: 4 }, flags: { mascot: 1 }, alienRel: -2, threat: -4 }),
  ]),
  fu('flag', 'alien', '🚩', 'Someone Moved Our Flag', 'The flag on the moon has been moved two metres to the left. Next to it is a second flag, also ours, folded more neatly.', [
    c('Send astronauts to check', { stats: { sci: 8, gold: -6 }, threat: -1 }),
    c('Pretend we did that', { stats: { joy: 4, weird: 3 } }),
  ]),
  fu('note', 'alien', '📝', 'The Note Got a Reply', 'Under our polite note on the moon, someone has written "likewise". The handwriting is neat and slightly upside down.', [
    c('Leave another note', { flags: { alien_contact: 1 }, alienRel: 5 }),
    c('Frame the reply', { stats: { faith: 4, joy: 4 } }),
  ]),
  fu('zoo', 'event', '🐒', 'The Space Zoo Is Unionising', 'The animals in orbit have organised. The monkeys run the meetings, the dogs do security and the tortoise takes minutes.', [
    c('Negotiate with the zoo', { stats: { gold: -5, sci: 6 }, alienRel: 2 }),
    c('Send a cat to break the union', { stats: { joy: 3, weird: 3 }, flags: { cats: 1 } }),
  ]),
  fu('spacecat', 'event', '🛰️', 'The Space Cat Will Not Come Down', 'The cat found a warm spot on a solar panel and has ignored mission control for nine days.', [
    c('Send treats up', { stats: { gold: -6, joy: 4 }, flags: { cats: 1 } }),
    c('Leave it there as a guard', { stats: { mil: 4, weird: 3 }, threat: -2 }),
  ]),
  fu('marshspear', 'alien', '🗡️', 'Spear Returned, Sharpened', 'The spear we threw at the lights was left at the edge of camp. It has been sharpened, balanced and fitted with a better grip.', [
    c('Copy the grip', { stats: { mil: 4, sci: 2 } }),
    c('Leave an apology fish', { stats: { food: -2 }, alienRel: 3 }),
  ]),
  fu('sheep', 'alien', '🐑', 'The Sheep Have a Fifth Note', 'The disc came back and added a fifth note. The sheep now hum a complete tune. One shepherd says it is a march.', [
    c('Teach them a lullaby instead', { stats: { joy: 3 }, alienRel: 3 }),
    c('March with the sheep', { stats: { mil: 3, weird: 3 }, threat: 1 }),
  ]),
  fu('cow', 'alien', '🐄', 'They Want the Cow Back', 'The beam of light came back to the same field and hovered there for an hour. There was a lot of disappointed humming.', [
    c('Offer a different cow', { stats: { food: -3 }, alienRel: 4 }),
    c('Hide behind the barn', { stats: { joy: -2, weird: 2 }, threat: 1 }),
  ]),
  fu('circles', 'alien', '🌾', 'The Wheat Correspondence', 'The circles answered our thanks: "you\'re welcome", and then, smaller, "nice villages too". Farmers are flattered and uneasy.', [
    c('Stamp "come for dinner"', { stats: { food: -3 }, flags: { alien_contact: 1 }, alienRel: 5 }),
    c('Stamp "no further questions"', { stats: { joy: 2 }, threat: -1 }),
  ]),
  fu('burnt', 'alien', '🔥', 'A Circle in the Ashes', 'A perfect circle appeared in the ashes of the burnt field. In the middle, one word in our own script: "rude".', [
    c('Plant flowers in it', { stats: { faith: 3 }, alienRel: 3 }),
    c('Burn another field', { stats: { food: -4, mil: 3 }, threat: 2 }),
  ]),
  fu('meteor', 'alien', '🔔', 'The Metal Is Ringing', 'Every sword forged from the meteor rings softly at night, like a doorbell. Soldiers report someone asking "hello?"', [
    c('Answer the swords', { stats: { weird: 4 }, flags: { alien_contact: 1 }, alienRel: 3 }),
    c('Melt them down again', { stats: { gold: -4, mil: -2 }, threat: -1, text: 'The ringing stops. The silence sounds like sulking.' }),
  ]),
  fu('snacks', 'alien', '🍿', 'The Minister of Snacks Reports', 'The new snacks are delicious. Everyone who eats them ends up facing slightly more towards the sky.', [
    c('Keep the snacks', { stats: { joy: 8, weird: 4 }, alienRel: 4, threat: 1 }),
    c('Return to the old snacks', { stats: { joy: -4 }, threat: -2 }),
  ]),
  fu('falseinfo', 'alien', '🪿', 'The Invasion Plan Was Updated', 'Spies report the aliens rewrote their plans based on the chancellor\'s notes. They now expect our army to be made of geese.', [
    c('Hire some geese', { stats: { food: -4, mil: 5 }, threat: -2 }),
    c('Leak more lies', { stats: { weird: 2 }, flags: { spies: 1 }, threat: -3 }),
  ]),
  fu('cube', 'alien', '🧊', 'The Cube Is Now a Slightly Different Cube', 'After the poking, the cube grew a little. It is still warm. It now ticks once a day, at noon.', [
    c('Keep poking', { stats: { sci: 6, weird: 3 }, threat: 2, chain: nx('cube2', 2) }),
    c('Fence it off and walk away', { stats: { gold: -3 }, threat: -1 }),
  ]),
  fu('cube2', 'alien', '📦', 'The Cube Opened', 'The cube opened at noon. Inside is a smaller cube and a note: "stop poking".', [
    c('Poke the small cube', { stats: { sci: 10 }, alienRel: -4, threat: 3 }),
    c('Put both cubes in a museum', { stats: { gold: 6, joy: 3 } }),
  ]),
  fu('bench', 'alien', '🪑', 'The Bench Is Popular', 'People who sit on the warm cube come away with a perfect memory of a planet they have never seen.', [
    c('Charge for sitting', { stats: { gold: 6 }, alienRel: -2 }),
    c('Let anyone sit', { stats: { sci: 4, weird: 3 }, alienRel: 3 }),
  ]),
  fu('laughed', 'alien', '⭐', 'The Aliens Wrote a Review', 'The tourists posted a review of our planet: one star, "locals hostile, monuments small". Bookings from three galaxies were cancelled.', [
    c('Build a bigger monument', { stats: { gold: -8, joy: 4 }, alienRel: 2 }),
    c('Write a one-star review of them', { stats: { joy: 5 }, alienRel: -4, threat: 2 }),
  ]),
  fu('souvenir', 'alien', '☕', 'Our Mug Is in Orbit', 'A souvenir mug from our capital was seen on the bridge of an alien warship. The officer drinking from it looks almost fond of us.', [
    c('Make more mugs', { stats: { gold: 6 }, alienRel: 3 }),
    c('Bug the next batch', { flags: { spies: 1 }, alienRel: -2, threat: -2 }),
  ]),
  fu('dinner', 'alien', '🍮', 'The Guests Brought Dessert', 'The four hundred extra citizens came to dinner with dessert. It wobbles, sings faintly and is the best thing anyone has eaten.', [
    c('Ask for the recipe', { stats: { food: 6 }, flags: { alien_contact: 1 }, alienRel: 4 }),
    c('Invite them again next week', { stats: { joy: 4, food: -4 }, alienRel: 6, threat: 1, chain: nx('dinner2', 2) }),
  ]),
  fu('dinner2', 'alien', '🍽️', 'Thursday Dinners', 'The aliens now come every Thursday and have their own chairs. Last week one of them brought a date from the fleet.', [
    c('Set more places', { stats: { food: -5 }, flags: { diplomats: 1 }, alienRel: 6 }),
    c('Ask the date about the fleet', { stats: { sci: 6 }, alienRel: -2, threat: -2 }),
  ]),
  fu('roundup', 'alien', '🛏️', 'The Four Hundred Are Missing', 'The detained "humans" vanished overnight. The doors are locked, the beds are made, and one of them left a tip.', [
    c('Recount the census', { stats: { sci: 3 }, flags: { bureaucracy: 1 } }),
    c('Keep the tip', { stats: { gold: 5 }, alienRel: -2 }),
  ]),
  fu('onestar', 'alien', '🛸', 'Your Feedback Has Been Received', 'The abductors improved the lighting, added a cushion and took twelve more citizens to test the changes.', [
    c('Demand them back', { stats: { mil: 5, pop: -1 }, threat: 1 }),
    c('Rate the new version', { stats: { joy: 3, pop: -1 }, alienRel: 3 }),
  ]),
  fu('clipboard', 'alien', '📋', 'The Clipboard Questions', 'Question one asks how long we can hold our breath. Question two asks the same thing, but more seriously.', [
    c('Train breath-holding', { stats: { pop: 2, mil: 4 }, threat: -2 }),
    c('Return the clipboards, filled out', { stats: { sci: 4 }, alienRel: 4 }),
  ]),
  fu('countdown', 'alien', '⏳', 'The Countdown Paused', 'After our reply the countdown stopped. Then it started again, slower, as if someone was thinking about it.', [
    c('Reply again', { flags: { alien_contact: 1 }, alienRel: 4, threat: 1 }),
    c('Leave it thinking', { stats: { sci: 6 }, threat: -2 }),
  ]),
  fu('song', 'alien', '🎶', 'The Song Charted', 'Our song went to number one in a galaxy we cannot see. Royalties arrived as a small, heavy cube.', [
    c('Write a follow-up album', { stats: { joy: 4 }, flags: { party: 1 }, alienRel: 5, chain: nx('album', 3) }),
    c('Sell the cube', { stats: { gold: 12 }, alienRel: -2 }),
  ]),
  fu('album', 'alien', '🎤', 'The Album Tour', 'The aliens want the band to tour. The first venue is the flagship. Capacity: ten million.', [
    c('Send the band', { stats: { joy: 5, pop: -1 }, flags: { party: 1 }, alienRel: 8 }),
    c('Send a recording', { stats: { gold: 6 }, alienRel: 3 }),
  ]),
  fu('played', 'alien', '📃', 'Request Denied', 'The listeners forty light-years away sent a list of every song we ever played, each with a frowning face.', [
    c('Finally play the request', { stats: { joy: 2 }, alienRel: 5 }),
    c('Play the list backwards', { stats: { weird: 5, joy: 2 }, threat: 1 }),
  ]),
  fu('moonprobe', 'alien', '🅿️', 'The Probe Found the Parking Lot', 'The structure on the far side of the moon is a parking lot. Our probe has received a ticket.', [
    c('Pay the ticket', { stats: { gold: -5 }, alienRel: 4 }),
    c('Contest the ticket', { stats: { sci: 4 }, flags: { bureaucracy: 1 }, threat: -2 }),
  ]),
  fu('noparking', 'alien', '🚫', 'They Parked Anyway', 'A large object is parked right next to our no-parking sign on the moon. Its hazard lights are on.', [
    c('Tow it', { stats: { mil: 8, gold: -5 }, alienRel: -4, threat: -2 }),
    c('Let it go this once', { alienRel: 4 }),
  ]),
  fu('survey2', 'alien', '📊', 'Thank You for Your Honesty', 'The aliens appreciated our honest "2". The follow-up survey asks: "What would make you a 1?"', [
    c('List the things', { stats: { sci: 4 }, flags: { bureaucracy: 1 }, threat: -2 }),
    c('Refuse further surveys', { stats: { mil: 4 }, alienRel: -3 }),
  ]),
  fu('survey11', 'alien', '📏', 'Eleven Was Not an Option', 'They flagged our "11" as invalid and sent a technician. He is polite and keeps measuring the coastline.', [
    c('Show him the coastline', { alienRel: 4, threat: 2 }),
    c('Lose him in the paperwork', { flags: { bureaucracy: 1 }, threat: -1 }),
  ]),
  fu('coupon', 'alien', '🎫', 'The Better Coupon', 'The second species sent a better coupon: 40% off protection, valid until the invasion. The small print is in a colour we cannot see.', [
    c('Redeem it', { stats: { gold: -12, mil: 6 }, threat: -5 }),
    c('Frame it', { stats: { joy: 3 }, alienRel: 2 }),
  ]),
  fu('replyall', 'alien', '📧', 'Everyone Is in This Thread', 'Our reply-all reached the whole fleet. Thousands of crew replied asking to be removed. The admiral is furious, mostly at them.', [
    c('Reply all again', { stats: { joy: 6 }, alienRel: -3, threat: 2 }),
    c('Unsubscribe gracefully', { stats: { sci: 4 }, alienRel: 3 }),
  ]),
  fu('deleted', 'alien', '🗑️', 'A Thank-You From the Fleet', 'The alien who leaked the plans thanked us for deleting them. Attached, by accident, is the second half.', [
    c('Read the second half', { stats: { sci: 10 }, threat: -4, alienRel: -3 }),
    c('Delete that too', { stats: { faith: 3 }, alienRel: 8 }),
  ]),
  fu('laser', 'alien', '🔦', 'The Laser Hit Something', 'The orbital laser hit something we could not see. It is now visible, and not pleased.', [
    c('Fire again', { stats: { mil: 8 }, alienRel: -6, threat: 3 }),
    c('Send flowers', { stats: { gold: -5 }, alienRel: 5, threat: -1 }),
  ]),
  fu('banner', 'alien', '🧹', 'They Wiped Their Feet', 'The lead alien ship has rolled out a giant mat and is wiping its landing struts on it.', [
    c('Add "PLEASE TAKE YOUR SHOES OFF"', { stats: { joy: 4, weird: 3 }, alienRel: 4 }),
    c('Add "JUST KIDDING, GO HOME"', { stats: { joy: 4 }, alienRel: -6, threat: -2 }),
  ]),
  fu('bribe', 'alien', '🧾', 'The Aliens Took the Bribe', 'The alien attaché accepted our bribe and issued a receipt. Under "service purchased" it says: "later".', [
    c('Bribe them more', { stats: { gold: -15 }, flags: { corruption: 1 }, alienRel: 4, threat: -4 }),
    c('Ask for a refund', { stats: { gold: 6 }, alienRel: -4, threat: 2 }),
  ]),
  fu('isle', 'alien', '🏝️', 'The Island Is Now on the Map', 'The aliens added our island to their charts with a little star. The legend says it means "nice people, small".', [
    c('Wave again', { stats: { joy: 3 }, alienRel: 4 }),
    c('Hide again', { stats: { weird: 3 }, threat: -3 }),
  ]),
  fu('crater', 'alien', '📡', 'The Dish Is Ringing', 'Since we used the country as a dish, it rings when someone calls. The whole crater hums at a pitch only dogs and grandparents can hear.', [
    c('Answer it', { stats: { weird: 4 }, flags: { alien_contact: 1 }, alienRel: 5 }),
    c('Put it on silent', { stats: { joy: 3 }, threat: -2 }),
  ]),
  fu('welcome', 'alien', '🛬', 'Something Landed on the W', 'A small ship landed right on the W of "WELCOME". The crew took a photo with the sign and left.', [
    c('Repaint it bigger', { stats: { gold: -4 }, alienRel: 5 }),
    c('Sell the photo rights', { stats: { gold: 8 } }),
  ]),
  fu('nosign', 'alien', '❓', 'They Added a Question Mark', 'Overnight, a ship added a question mark to our giant "NO". It now reads "NO?".', [
    c('Paint over it', { stats: { mil: 4 }, alienRel: -3, threat: -2 }),
    c('Add "THANK YOU"', { stats: { joy: 3 }, alienRel: 4 }),
  ]),
  fu('fires', 'alien', '🔥', 'The Lights Want a Third Fire', 'The sacred lights blinked three times. The elders argue whether it means "and you?" or "more fire, please".', [
    c('Light three fires', { stats: { food: -2, faith: 3 }, alienRel: 3 }),
    c('Light one, to be mysterious', { stats: { weird: 3 }, threat: -1 }),
  ]),
  fu('whyarmy', 'alien', '📜', 'The Army, Explained', 'The gods sent a long explanation for the army. It mentions "protocol", "insurance" and "a misunderstanding in an earlier galaxy".', [
    c('Ask for a smaller army', { alienRel: 3, threat: -3 }),
    c('Bring our own army to the meeting', { stats: { mil: 10 }, threat: 2 }),
  ]),
  fu('playlist', 'alien', '🎧', 'The Fleet Is Vibing', 'The fleet slowed to half speed after receiving our playlist. Sensors detect gentle swaying.', [
    c('Send volume two', { stats: { joy: 4 }, alienRel: 5, threat: -2 }),
    c('Switch to drum and bass', { stats: { joy: 6, mil: 4 }, threat: 2 }),
  ]),
  fu('dave', 'alien', '🧢', 'Dave\'s Report', 'Dave is back from the flagship. The commander has not changed at all, still owes him money and sends regards to everyone, especially our army.', [
    c('Collect the debt', { stats: { gold: 15 }, alienRel: -2 }),
    c('Forgive it, as a gesture', { alienRel: 8, threat: -2 }),
  ]),
  fu('audit', 'alien', '⚖️', 'The Aliens Have Appealed', 'The fleet appealed our audit. Their lawyer is a sphere. It is very good.', [
    c('Fight the appeal', { stats: { gold: 8 }, flags: { bureaucracy: 1 }, threat: 3 }),
    c('Settle', { stats: { gold: -6 }, alienRel: 6 }),
  ]),
  fu('proofs', 'alien', '✏️', 'The Aliens Found a Typo', 'The aliens returned our holy proofs with corrections in red. The clergy are devastated. The mathematicians are delighted.', [
    c('Accept the corrections', { stats: { sci: 10, faith: -4 }, alienRel: 4 }),
    c('Declare the typo sacred', { stats: { faith: 8, weird: 4 }, alienRel: -2 }),
  ]),
  fu('hats', 'alien', '📶', 'Hello Back', 'Every antenna hat in the country got a reply at the same moment: "hello", in a very small, very warm voice.', [
    c('Ask the voice its name', { stats: { weird: 4 }, flags: { alien_contact: 1 }, alienRel: 5 }),
    c('Ban the hats', { stats: { joy: -6 }, threat: -2 }),
  ]),
  fu('sorry', 'alien', '📚', 'They Read All 400 Pages', 'The aliens read our apology and replied with a 900-page apology for something they have not done yet.', [
    c('Accept it in advance', { alienRel: 8, threat: -3 }),
    c('Ask what they are going to do', { stats: { sci: 6, joy: -4 }, threat: -2 }),
  ]),
  fu('tea', 'alien', '🫖', 'Tea With the Invaders', 'The aliens drank the milk, ate the sugar cubes whole and complimented the cups. One asked if the cups were "also citizens".', [
    c('Gift them the cups', { stats: { gold: -4 }, alienRel: 6 }),
    c('Invite them again', { stats: { food: -4 }, flags: { diplomats: 1 }, alienRel: 4 }),
  ]),
  fu('moreprobes', 'alien', '🍖', 'Seconds', 'The aliens sent another probe, this time with a sign reading "NOT FOOD". A family has already lit the barbecue.', [
    c('Stop the barbecue', { stats: { joy: -3 }, alienRel: 4 }),
    c('Let them cook', { stats: { food: 6, joy: 5 }, alienRel: -6, threat: 2 }),
  ]),
  fu('gorb', 'alien', '👽', 'Gorb Has Accepted', 'The alien we named Gorb now signs every transmission "Gorb". The others are jealous. Requests for names are pouring in.', [
    c('Name them all', { stats: { joy: 4 }, flags: { bureaucracy: 1 }, alienRel: 8, chain: nx('gorb2', 2) }),
    c('There is only one Gorb', { stats: { faith: 4 }, alienRel: -2 }),
  ]),
  fu('gorb2', 'alien', '🌀', 'Too Many Gorbs', 'Forty thousand aliens now have our names. The fleet\'s chain of command collapsed because nobody knows which Gorb is in charge.', [
    c('Help them sort it out', { flags: { bureaucracy: 1 }, alienRel: 6 }),
    c('Encourage the confusion', { stats: { weird: 4 }, threat: -5 }),
  ]),
  fu('spacegoat', 'alien', '🐐', 'The Goat Kept Walking', 'The space goat is still walking slowly toward the fleet. It has been weeks. The fleet has started edging away from the goat.', [
    c('Send more goats', { stats: { food: -5, weird: 4 }, threat: -3 }),
    c('Recall the goat', { stats: { faith: 3, joy: 3 } }),
  ]),
  fu('epic', 'alien', '📖', 'The Aliens Are Still Listening', 'We are on canto three hundred of the national epic. The aliens cancelled two other invasions to keep listening.', [
    c('Keep reciting', { stats: { joy: -2 }, alienRel: 6, threat: -3 }),
    c('Stop on a cliffhanger', { stats: { weird: 3 }, alienRel: 3, threat: -5 }),
  ]),
  fu('sleepover', 'alien', '🛌', 'The Sleepover Went Late', 'Somebody told a ghost story at the alien sleepover. The aliens have not slept since. They are scared of something called Bloody Mary.', [
    c('Tell them it is real', { stats: { weird: 4 }, alienRel: -3, threat: -4, chain: nx('sleepover2', 2) }),
    c('Tell them it is not real', { stats: { joy: 4 }, alienRel: 6 }),
  ]),
  fu('sleepover2', 'alien', '🪞', 'Mary Is Now Classified', 'The fleet issued an official warning about "the Mary entity". Sentries refuse to look into mirrors. Morale on the flagship is low.', [
    c('Install mirrors everywhere', { stats: { gold: -6, weird: 4 }, threat: -4 }),
    c('Confess', { stats: { joy: 3 }, alienRel: 6 }),
  ]),
  fu('eagle', 'alien', '🦅', 'They Want to Meet the Eagle', 'The aliens believed the story about the talking eagle and would like to meet it to discuss the planet\'s ownership.', [
    c('Hire an eagle and a ventriloquist', { stats: { gold: -10 }, alienRel: 3, threat: -4 }),
    c('Say the eagle is on holiday', { stats: { joy: 3, weird: 2 }, threat: 1 }),
  ]),
  fu('soup', 'alien', '🍲', 'The Soup Was a Hit', 'The aliens finished the bowl and asked who the soup\'s ambassador is. The soup has applied for the job.', [
    c('Appoint the soup', { stats: { weird: 5 }, flags: { diplomats: 1 }, alienRel: 6 }),
    c('Keep the soup at home', { stats: { food: 8, faith: 3 } }),
  ]),
  fu('aob', 'alien', '🗓️', 'Any Other Business', 'Under any other business, the aliens raised "the invasion". It was deferred to a subcommittee that meets in two hundred years.', [
    c('Chair the subcommittee', { flags: { bureaucracy: 1 }, threat: -4 }),
    c('Fast-track it, out of curiosity', { stats: { sci: 6 }, threat: 3 }),
  ]),
  fu('founder', 'alien', '🛢️', 'The Fleet Has Questions for the Founder', 'The fleet replied: "Mission complete? You were sent ten thousand years ago to check the oil." The founder is embarrassed. We are fascinated.', [
    c('Ask what oil', { stats: { sci: 8, weird: 4 }, flags: { alien_contact: 1 } }),
    c('Insist we are lovely too', { stats: { joy: 4 }, alienRel: 6 }),
  ]),
  fu('founderfight', 'alien', '🤖', 'The Founder Is Sulking', 'The reprogrammed founder fights well in drills but keeps sending the fleet passive-aggressive notes about "people who changed his settings".', [
    c('Reprogram him again', { stats: { sci: 6, mil: 6 }, alienRel: -3 }),
    c('Apologise to the founder', { stats: { mil: -4, joy: 3 }, alienRel: 6 }),
  ]),
  fu('parkingfee', 'alien', '🪙', 'Paid in Exact Change', 'The lights paid their parking fee in coins of an unknown metal. They are warm and rearrange themselves in the vault.', [
    c('Spend them quickly', { stats: { gold: 12, weird: 4 } }),
    c('Study them', { stats: { sci: 8 }, flags: { alien_contact: 1 } }),
  ]),
  fu('selfie', 'alien', '💌', 'Fan Mail', 'Since the selfie, a ton of fan mail falls from orbit every day. Most is for the dog. Some is addressed "to the person holding the dog".', [
    c('Open a fan club', { stats: { gold: 8 }, flags: { mascot: 1 }, alienRel: 4 }),
    c('Ask the fans to cancel the invasion', { alienRel: 2, threat: -4 }),
  ]),
  fu('apology', 'alien', '📃', 'The Apology Was Accepted, Mostly', 'The aliens accepted our apology and attached a short list of their own grievances against us, for balance.', [
    c('Read the list', { stats: { sci: 4, joy: -3 }, alienRel: 3 }),
    c('Hand it to the Grudge Keepers', { stats: { mil: 5 }, flags: { grudge: 1 }, alienRel: -3 }),
  ]),
  fu('grudgecast', 'alien', '😤', 'The Aliens Started a Grudge Too', 'The aliens heard our list of complaints. They started their own. It is shorter, but it is all about us.', [
    c('Compare lists', { stats: { weird: 5 }, alienRel: 2 }),
    c('Make ours longer', { stats: { mil: 8 }, flags: { grudge: 1 }, threat: 2 }),
  ]),
  fu('single', 'alien', '💿', 'Copyright Claim', 'The static single went platinum. A copyright claim arrived from deep space. They want 12% and a credit.', [
    c('Pay and credit them', { stats: { gold: -8 }, alienRel: 6 }),
    c('Claim it was sampled legally', { stats: { gold: 6 }, alienRel: -4, threat: 1 }),
  ]),
  fu('armedsat', 'alien', '🛰️', 'The Armed Satellite Is Gone Too', 'The armed satellite vanished as well. This receipt says: "Thank you. Please send more, they are very interesting."', [
    c('Launch a decoy full of bees', { stats: { weird: 4 }, flags: { bees: 1 }, threat: -2 }),
    c('Stop launching things', { stats: { gold: 6 }, threat: 1 }),
  ]),
  fu('wrongway', 'alien', '🧭', 'The Scout Got Very Lost', 'The alien scout followed our directions and radioed the fleet from the wrong side of the sun, furious.', [
    c('Send him a map, as an apology', { alienRel: 4, threat: 1 }),
    c('Give the fleet the same directions', { alienRel: -4, threat: -4 }),
  ]),
  fu('rightway', 'alien', '🗺️', 'The Scout Left a Review', 'The scout made it home and gave us five stars for helpfulness. The fleet now uses our planet as a landmark.', [
    c('Charge for directions', { stats: { gold: 8 } }),
    c('Ask him to keep it vague', { stats: { weird: 3 }, threat: -2 }),
  ]),
  fu('seized', 'alien', '🚀', 'The Seized Ship Woke Up', 'The captured ship sulks in its hangar, flickering at the scientists. It will only open for someone it likes.', [
    c('Send a kind scientist', { stats: { sci: 12 }, alienRel: 2 }),
    c('Cut it open', { stats: { mil: 10, sci: 6 }, alienRel: -6, threat: 2 }),
  ]),
  fu('onestar2', 'alien', '📉', 'The Planet Was Downgraded', 'Thanks to our one-star rating, the planet went from "invade" to "invade if passing".', [
    c('Rate it zero next time', { stats: { joy: 3 }, threat: -3 }),
    c('Tidy up a bit anyway', { stats: { gold: -6, joy: 6 } }),
  ]),
  fu('defector', 'alien', '🎖️', 'The Defector Has Opinions', 'The defector has opinions on our defences, our food, our posture and her old manager, who she says is coming personally.', [
    c('Make her a general', { stats: { mil: 12 }, alienRel: -4, threat: -3, chain: nx('defector2', 2) }),
    c('Give her a talk show', { stats: { joy: 8 }, alienRel: 2 }),
  ]),
  fu('defector2', 'alien', '👔', 'Her Manager Arrives', 'Her old manager is in orbit demanding she return her uniform. She sent it back, folded, with a note.', [
    c('Back her up', { stats: { mil: 6, joy: 4 }, alienRel: -4, text: 'The note is about his leadership style. It is devastating.' }),
    c('Hand her over', { stats: { mil: -8 }, alienRel: 8, threat: -3 }),
  ]),
  fu('defback', 'alien', '🍎', 'The Fruit Basket Started a Conversation', 'Her manager loved the fruit basket, asked for the name of our grocer and lowered our planet from "urgent" to "when convenient".', [
    c('Send the grocer up', { alienRel: 6, threat: -3 }),
    c('Send a second basket, with bees', { stats: { weird: 3 }, flags: { bees: 1 }, alienRel: -2, threat: -1 }),
  ]),
  fu('census', 'alien', '🔢', 'Someone Corrected Our Census', 'The census we beamed into space came back corrected. We have more cats than we thought, fewer generals and one more Bort.', [
    c('Accept the figures', { stats: { sci: 6 }, flags: { cats: 1 } }),
    c('Recount with spite', { stats: { mil: 4 }, flags: { bureaucracy: 1 } }),
  ]),
  fu('protocol', 'alien', '📘', 'The Aliens Have a Protocol Too', 'The aliens sent their own first contact protocol. Page one: "Do not let them hand you 900 pages."', [
    c('Hand them 1,800 pages', { flags: { bureaucracy: 1 }, threat: -3 }),
    c('Merge the protocols', { flags: { diplomats: 1 }, alienRel: 6 }),
  ]),
  fu('envoy', 'alien', '👩‍👦', 'The Envoy\'s Mother Called', 'The detained envoy\'s mother called the palace. She is very large, in orbit, and wants to know when her son will be home for dinner.', [
    c('Release him immediately', { alienRel: 6, threat: -2 }),
    chk('Ask her a few questions too', {}, {
      base: 0.3, flags: { diplomats: 0.1, spies: 0.08 },
      success: { text: 'She tells us everything about the fleet. She is very proud of her son\'s job.', effect: { stats: { sci: 10 }, threat: -4 } },
      fail: { text: 'She hangs up and calls the fleet instead.', effect: { alienRel: -6, threat: 4 } },
    }),
  ]),
  fu('snack', 'alien', '🥨', 'The Envoy Wants to Come Back', 'The small envoy wrote that the snack was the best part of its career. It would like to defect, but only for snacks.', [
    c('Accept the defector', { stats: { sci: 6 }, alienRel: -2, threat: -2 }),
    c('Send a lifetime supply instead', { stats: { food: -8 }, alienRel: 6 }),
  ]),
];

const misc: CardDef[] = [
  fu('sailors', 'event', '⛵', 'The First Ships Return', 'The navigators found the world is round, two new islands and a captain they did not leave with.', [
    c('Settle the islands', { stats: { pop: 3, gold: 4 }, flags: { navy: 1 } }),
    c('Interview the extra captain', { stats: { weird: 4, sci: 3 } }),
  ]),
  fu('genius', 'event', '🌉', 'The Child Graduated', 'The strange child came back from study and built a bridge to nowhere that turns out to go somewhere. Nobody wants to cross first.', [
    luck('Cross it', [
      o(1, 'It goes to the next village, faster.', { stats: { gold: 5, food: 3 } }),
      o(1, 'It goes somewhere else. The volunteer sends a postcard.', { stats: { weird: 6, sci: 4 } }),
    ]),
    c('Make the child an engineer', { stats: { sci: 4 }, flags: { engineers: 1 } }),
  ]),
  fu('woodencow', 'rival', '🐮', 'The Wooden Cow Was Opened', '{rival} opened our wooden cow. It was full of milk. They are confused and, against all odds, grateful.', [
    c('Send a wooden pig', { stats: { food: -3 }, rival: { target: 'same', rel: 6 } }),
    c('Send a wooden horse after all', { stats: { mil: 4 }, rival: { target: 'same', rel: -8 } }),
  ]),
  fu('crusadeletter', 'history', '🏆', 'The Relic Holders Wrote Back', 'The keepers of the relic replied: it is indeed just a cup, and they will post it.', [
    c('Accept the cup', { stats: { faith: 4, joy: 3 } }),
    c('Insist it is holy', { stats: { faith: 6, sci: -2 }, flags: { cult: 1 } }),
  ]),
  fu('mars', 'history', '🔴', 'Mars Replied', 'The Mars colony answered our stern letter with a sterner one. They also invented a new punctuation mark for disapproval.', [
    c('Recognise their independence', { stats: { joy: 3, gold: -4, sci: 6 } }),
    c('Send another letter', { stats: { mil: 5 }, flags: { bureaucracy: 1 } }),
  ]),
  fu('billionaires', 'alien', '🚀', 'One Billionaire Has Not Come Back', 'Two rockets came back. The third billionaire radioed that he "met some people" and will return "with a business opportunity".', [
    c('Wait for him', { stats: { gold: 6 }, alienRel: 4, threat: 1 }),
    c('Change the locks', { stats: { joy: 4 }, threat: -2 }),
  ]),
  fu('hermit', 'event', '⛰️', 'The Hermit Took a Goat', 'The hermit took a goat back up the mountain and sent down one more piece of wisdom: "Never send a man up a mountain with a goat."', [
    c('Accept the wisdom', { stats: { faith: 3, sci: 2 } }),
    c('Demand the goat', { stats: { food: 2, joy: -2 } }),
  ]),
  fu('heir', 'event', '🐎', 'The Heir Returns From School', 'The horse-whispering heir now commands a cavalry regiment that obeys him perfectly. The humans in it do not.', [
    c('Give him the cavalry', { stats: { mil: 6, weird: 3 } }),
    c('Find him a horse wife', { stats: { joy: 4, weird: 4 }, text: 'Diplomatically, this goes better than expected.' }),
  ]),
  fu('clone', 'event', '👥', 'The Clone Wants a Raise', '{leader}\'s clone has done three hundred public events. It wants a raise, a title and a clone of its own.', [
    c('Give it a clone', { stats: { joy: 3, weird: 4 }, flags: { genes: 1 }, chain: nx('clone2', 3) }),
    c('Swap places for a day', { stats: { joy: 6, gold: -3 }, text: 'Nobody notices. That is the worrying part.' }),
  ]),
  fu('clone2', 'event', '🎉', 'The Clones Have a Party', '{leader}\'s clones now outnumber the cabinet. They formed a party. Its slogan is "More of Me".', [
    c('Join the party', { stats: { joy: 4 }, flags: { genes: 1, party: 1 } }),
    c('Ban cloning', { stats: { sci: -4, joy: -2 } }),
  ]),
  fu('preacher', 'alien', '🪧', 'The Preacher\'s Specifics', 'The doomsday preacher came back with a date, a direction and a drawing of a ship. It matches our telescope photos exactly.', [
    c('Hire him as an analyst', { stats: { sci: 6 }, threat: -2 }),
    c('Ask how he knows', { stats: { weird: 6 }, flags: { alien_contact: 1 }, alienRel: 3 }),
  ]),
  fu('emigrants', 'event', '✉️', 'Postcards From Abroad', 'The scholars who left write that the weather is great and the food is terrible. They would come home for a decent university.', [
    c('Build one', { stats: { gold: -8, sci: 8 }, flags: { scholars: 1 } }),
    c('Send them recipes', { stats: { joy: 3, food: -2 } }),
  ]),
  fu('band', 'event', '🎺', 'The Army Formed a Band', 'The band taught the soldiers to play. The army is now mostly a brass section.', [
    c('March to music', { stats: { mil: 4, joy: 5 } }),
    c('Confiscate the trumpets', { stats: { mil: 6, joy: -4 } }),
  ]),
  fu('voyage2', 'event', '🚢', 'The Second Ship Returned', 'The second research ship also came back tanned and vague. The captain wears a necklace made of something that glows.', [
    c('Study the necklace', { stats: { sci: 8, weird: 4 }, flags: { alien_contact: 1 } }),
    c('Send a third ship', { stats: { gold: -6 }, flags: { navy: 1 } }),
  ]),
  fu('horizon', 'event', '🐟', 'Admiral Codfather Lost Sight of Land', 'Admiral Codfather finally lost sight of land. He reports the horizon keeps moving and would like to come home now.', [
    c('Order him onward', { stats: { gold: 4, joy: -2 }, flags: { navy: 1 } }),
    c('Bring him home a hero', { stats: { joy: 5, faith: 2 } }),
  ]),
  fu('frozen', 'event', '🧊', 'The Elders Thawed Early', 'A warm spell thawed three frozen elders. They are fine, furious about the cold and want to know why nobody fixed the roof.', [
    c('Fix the roof', { stats: { gold: -3, joy: 3 } }),
    c('Ask them about the old days', { stats: { sci: 3, faith: 3 } }),
  ]),
  fu('frog', 'alien', '🐸', 'The Frog Is Hunting', 'The launched frog ate an alien scout ship. It is now looking at the bigger ones.', [
    c('Feed it more', { stats: { food: -10 }, threat: -4 }),
    c('Bring it home', { stats: { faith: 6, joy: 4 } }),
  ]),
  fu('pilgrims', 'alien', '🌕', 'The Moon Forgave Us', 'The pilgrims apologised to the moon in person. The moon was gracious. They also report a parking lot on the far side.', [
    c('Build a chapel there', { stats: { faith: 8, gold: -6 }, flags: { cult: 1 } }),
    c('Report the parking lot', { stats: { sci: 4 }, threat: -2 }),
  ]),
  fu('room', 'history', '🚪', 'The Grown-Ups Are Still Sulking', 'The grown-ups have been in their room for a month. They formed a government in exile, inside the room.', [
    c('Let them out', { stats: { joy: 2, gold: 4 } }),
    c('Recognise the room as a nation', { stats: { weird: 6, joy: 3 } }),
  ]),
  fu('clerk', 'event', '🗂️', 'The Clerk Reached the Bottom', 'The clerk reached the permit office at the bottom of the hole. It is staffed. Nobody up here hired them.', [
    c('File a request', { flags: { bureaucracy: 1, hole: 1 } }),
    c('Close the hole', { stats: { joy: -2 }, threat: -1 }),
  ]),
  fu('islands', 'event', '🐦', 'The Pigeons Found More Islands', 'The pigeons are back with news of nine new islands. Two are inhabited. One is inhabited by more pigeons.', [
    c('Settle the empty ones', { stats: { pop: 3, food: 3 }, flags: { pigeons: 1 } }),
    c('Open talks with the pigeon island', { stats: { weird: 4 }, flags: { diplomats: 1 } }),
  ]),
  fu('choir', 'event', '🎶', 'The Choir Is Famous Abroad', 'The chimney sweep choir is a hit abroad. Their song about soot is number one in three countries. Two have since banned chimneys.', [
    c('Extend the tour', { stats: { gold: 6, joy: 3 }, flags: { propaganda: 1 } }),
    c('Bring them home', { stats: { joy: 5 } }),
  ]),
  fu('posters', 'event', '🪧', 'The Strikers Have Posters Too', 'The moon workers made posters out of our motivational posters. Theirs are funnier and have spread back home.', [
    c('Send air', { stats: { gold: -8, joy: 4 } }),
    c('Ban posters', { stats: { joy: -5 }, flags: { propaganda: 1 } }),
  ]),
  fu('monkey', 'alien', '🐒', 'The Monkey Has Opinions', 'The monkey came back from the moon and will not stop signing about what it saw. The signs are rude and seem to be about a parking lot.', [
    c('Make the monkey an astronaut', { stats: { sci: 6, joy: 4 } }),
    c('Ask about the parking lot', { flags: { alien_contact: 1 }, threat: -2 }),
  ]),
  fu('taxman', 'event', '🧾', 'The Tax Collector Landed', 'The launched tax collector landed in a far country and taxed it. It paid. He is asking for instructions.', [
    c('Collect', { stats: { gold: 8 }, rival: { target: 'random', rel: -6 } }),
    c('Bring him home', { stats: { joy: 4 } }),
  ]),
  fu('mail', 'event', '✉️', 'Return Mail', 'The neighbours started launching their replies back. Letters now fall from the sky in all weather.', [
    c('Build a catapult post office', { stats: { gold: 3 }, flags: { yeet: 1 } }),
    c('Install stronger roofs', { stats: { gold: -3, joy: 3 } }),
  ]),
  fu('smallman', 'event', '♟️', 'The Small Man Wants a Raise', 'The small man inside the chess machine has won every game in the kingdom. He wants a raise and a window.', [
    c('Give him a window', { stats: { sci: 3, joy: 3 }, flags: { turk: 1 } }),
    c('Build a smaller man', { stats: { weird: 4 }, flags: { robots: 1 } }),
  ]),
  fu('witch', 'event', '🧙', 'The Witch\'s First Report', 'The court witch cured the cough, the gout and the leaky roof. Her confident cat has been given a seat on the council.', [
    c('Fund her workshop', { stats: { sci: 4 }, flags: { medicine: 1 } }),
    c('Give the cat a second seat', { stats: { joy: 3 }, flags: { cats: 1 } }),
  ]),
  fu('poet', 'event', '✒️', 'The Poet Is the Machine', 'The poet we hired is suspiciously good. He has been sending all his work to the computer for feedback.', [
    c('Let them collaborate', { stats: { joy: 4, sci: 4 }, flags: { robots: 1 } }),
    c('Fire both', { stats: { joy: -3 } }),
  ]),
  fu('chickens', 'event', '🐔', 'The Chickens Won', 'The chickens defeated the locusts. They are now organised, well fed and staring at us.', [
    c('Give them a parade', { stats: { food: -3, joy: 4 } }),
    c('Draft them', { stats: { mil: 4, weird: 3 } }),
  ]),
  fu('dave3', 'event', '🧔', 'There Are Too Many Daves', 'Clone Dave and Dave Jr. are arguing over which is the real Dave. The original Dave has gone fishing.', [
    c('Make all three priests', { stats: { faith: 6, weird: 3 } }),
    c('Hold a Dave election', { stats: { joy: 4 }, flags: { bureaucracy: 1 } }),
  ]),
  fu('hacker', 'alien', '💻', 'The Kid Found Something', 'Our teenage hacker broke into a network that is not on our planet. She asks if she should "do something funny".', [
    luck('Do something funny', [
      o(1, 'The fleet\'s lights now flash our anthem.', { stats: { joy: 6 }, alienRel: -3 }),
      o(1, 'Their navigation now points at the sun.', { alienRel: -6, threat: -4 }),
    ]),
    c('Log out quietly', { stats: { sci: 6 }, flags: { spies: 1 } }),
  ]),
  fu('influencer', 'event', '🤳', 'The Influencer Was Cancelled', 'Our government influencer was cancelled for a video of her eating soup wrong. Approval dropped again.', [
    c('Defend the soup', { stats: { joy: 3 }, flags: { propaganda: 1 } }),
    c('Hire a new one', { stats: { gold: -4, joy: 4 } }),
  ]),
  fu('horse2', 'event', '🐴', 'The Horse Is Finished', 'The genius finished the horse. It is a horse. Perfectly normal. Everyone is a little disappointed and he says that was the point.', [
    c('Ride it', { stats: { joy: 3, mil: 2 } }),
    c('Ask about the flying machine again', { stats: { sci: 6, gold: -3 } }),
  ]),
];

export const followupCards: CardDef[] = [...alien, ...misc];
