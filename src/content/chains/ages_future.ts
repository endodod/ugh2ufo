// Content for the Interstellar, Post-Human and Last Age (15-age `age` scale). Escalates towards the invasion.
import type { CardDef } from '../../types';
import { c, chk, dec, ev, luck, o } from './util';

const S: [number, number] = [12, 12];
const P: [number, number] = [13, 13];
const L: [number, number] = [14, 14];

const interstellar: CardDef[] = [
  dec('research', 's_warp_commute', S, '🌀', 'Warp Commuting', 'Living three star systems from work is now practical. Traffic is still terrible, but in more dimensions.', 'Open the lanes', { stats: { gold: 14, sci: 8, joy: -4 }, flags: { logistics: 1 } }),
  dec('research', 's_dyson', S, '☀️', 'Dyson Scaffolding', 'The first strut of a shell around the sun. The sun has been notified and has not replied.', 'Bolt it on', { stats: { sci: 16, gold: -10 }, flags: { engineers: 1 } }),
  dec('research', 's_etiquette', S, '🎩', 'Xeno-Etiquette', 'A complete guide to not offending four hundred species. Chapter one: never mention the moon to the Vloth.', 'Study the guide', { stats: { sci: 8 }, flags: { diplomats: 1 }, alienRel: 6 }),
  dec('research', 's_terraform', S, '🌱', 'Terraforming Kits', 'Planet in a box. Just add water, air, soil and four thousand years.', 'Ship the kits', { stats: { food: 14, pop: 6, gold: -8 } }),
  dec('research', 's_gravity', S, '🪐', 'Gravity Brewing', 'Scientists can now brew small amounts of gravity. It tastes like iron and makes your knees feel opinionated.', 'Brew a batch', { stats: { sci: 12, weird: 6, mil: 6 } }),
  dec('policy', 's_zoning', S, '📐', 'Galactic Zoning Laws', 'No planet may be painted a colour visible from more than two systems away. Purple is under review.', 'Pass the laws', { stats: { gold: 10, joy: -4 }, flags: { bureaucracy: 1 } }),
  dec('policy', 's_lottery', S, '🎟️', 'The Colony Lottery', 'Citizens win a new planet. Losers win a slightly smaller planet.', 'Draw the tickets', { stats: { joy: 10, pop: 4, gold: -6 } }),
  dec('policy', 's_ftl_gossip', S, '🗣️', 'Ban Faster-Than-Light Gossip', 'Rumours now arrive before the events they describe. Courts are overwhelmed with pre-scandals.', 'Ban it', { stats: { joy: -4, sci: 6 }, flags: { propaganda: 1 } }),
  dec('policy', 's_post', S, '📬', 'Interstellar Postal Service', 'Letters to any star in under a year. Parcels in under a century. Pigeons are deeply offended.', 'Open the post', { stats: { gold: 8, joy: 6 }, flags: { logistics: 1 } }),
  dec('project', 's_suburb', S, '🏡', 'A Suburb on Proxima', 'Cul-de-sacs around a red dwarf. Every lawn is maroon. Residents describe it as "quiet, a bit far".', 'Build the suburb', { stats: { pop: 10, gold: -12, joy: 6 } }),
  dec('project', 's_mall', S, '🛍️', 'The Orbital Mall', 'A shopping centre the size of a moon. It has its own weather and a food court with its own religions.', 'Open the doors', { stats: { gold: 20, joy: 6, weird: 4 } }),
  dec('project', 's_star_fence', S, '🚧', 'The Star Fence', 'A chain of defence satellites around the home system. It is technically a fence. The aliens have noticed it is not very high.', 'Build the fence', { stats: { mil: 22, gold: -14 }, threat: -4 }),
  dec('project', 's_embassy_ring', S, '🏛️', 'The Embassy Ring', 'A ring station where every species may open an embassy. The fleet\'s embassy is the largest and has no windows.', 'Open the ring', { stats: { gold: -10 }, flags: { diplomats: 2, alien_contact: 1 }, alienRel: 10 }),
  dec('government', 's_gov_hoa', S, '🗂️', 'The Galactic Homeowners\' Association', 'The suburbs have formed an association with the power to fine anyone, anywhere, for anything visible from their porch.', 'Submit to the association', { gov: 'bureaucracy_state', stats: { gold: 8 }, flags: { bureaucracy: 1 } }),
  dec('government', 's_gov_fleet', S, '🦅', 'The Fleet Admiralty', 'The admirals argue that a civilisation at war with the sky should be run like a ship.', 'Hand over the bridge', { gov: 'empire', stats: { mil: 12 } }),

  ev('s_sun_complaint', 'alien', '☀️', 'The Neighbours Complained About Our Sun', 'A nearby species has filed a formal complaint that our sun is "too yellow" and "lowers property values".', [
    c('Dim it a little', { stats: { food: -8, sci: 6 }, alienRel: 8 }),
    c('Complain about their sun', { stats: { joy: 6 }, alienRel: -6, flags: { bureaucracy: 1 } }),
    c('Paint the suburbs blue to compensate', { stats: { gold: -8, weird: 6 }, alienRel: 3 }),
  ], { age: S }),
  ev('s_estate_agent', 'alien', '🏠', 'An Alien Estate Agent', 'An alien estate agent has arrived to "value the planet". He keeps saying "great bones" and "obviously you\'d knock through the oceans".', [
    c('Ask what it would sell for', { stats: { sci: 6 }, threat: 2, text: 'More than we expected. Less than we hoped. He leaves a card.' }),
    c('Say it is not for sale', { stats: { joy: 4, mil: 4 }, alienRel: -4 }),
    c('Have the spies follow him', { flags: { spies: 1 }, threat: -3 }),
  ], { age: S }),
  ev('s_commute_lag', 'event', '⏱️', 'Arrived Before Leaving', 'Warp commuters are now arriving at work before they left home. Several have met themselves in the car park. Productivity is complicated.', [
    c('Make them all work double shifts', { stats: { gold: 16, joy: -8 } }),
    c('Ban meeting yourself', { stats: { sci: 6 }, flags: { bureaucracy: 1 } }),
  ], { age: S }),
  ev('s_colony_band', 'event', '🎸', 'The Colony Started a Band', 'A mining colony on an ice moon formed a band. Their first song is called "Send Heat". It is number one in eleven systems.', [
    c('Send heat', { stats: { gold: -6, joy: 8 } }),
    c('Sign them to the national label', { stats: { gold: 12 }, flags: { party: 1 } }),
  ], { age: S }),
  ev('s_scout_pause', 'alien', '🛸', 'The Scouts Have Stopped', 'The alien scout fleet has stopped at the edge of our system. They are just sitting there. Analysts think they are waiting for someone.', [
    c('Send them a welcome probe', { flags: { alien_contact: 1 }, alienRel: 8, threat: 2 }),
    c('Reinforce the border', { stats: { mil: 16, gold: -10 }, threat: -3 }),
    c('Pretend we have not noticed', { stats: { joy: 4 }, threat: 1 }),
  ], { age: S }),
  ev('s_lost_luggage', 'event', '🧳', 'Lost Luggage in Hyperspace', 'A suitcase lost in hyperspace has come back. It contains a stranger\'s clothes, a working weapon of unknown design and a sandwich from the future.', [
    c('Study the weapon', { stats: { mil: 14, sci: 8 }, threat: -2 }),
    c('Eat the sandwich', { stats: { joy: 6, weird: 8 }, text: 'It is a good sandwich. It tastes of next Tuesday.' }),
    c('Return it to lost and found', { stats: { faith: 4 }, alienRel: 4 }),
  ], { age: S }),
  ev('s_space_pigeons', 'event', '🐦', 'Space Pigeons', 'Pigeons have somehow reached the orbital stations. They live in the air vents, coo in zero gravity and steal sandwiches from astronauts.', [
    c('Adopt them as mascots', { stats: { joy: 8 }, flags: { pigeons: 1 } }),
    c('Train them as station couriers', { stats: { gold: 6 }, flags: { pigeons: 1, logistics: 1 } }),
    c('Vent them', { stats: { joy: -10, sci: 4 }, text: 'They come back. They always come back.' }),
  ], { age: S }),
  ev('s_census_taker', 'alien', '📋', 'The Galactic Census', 'A galactic census taker has arrived. He needs to know how many of us there are, and how many of us are "good at fighting".', [
    c('Answer honestly', { alienRel: 6, threat: 3 }),
    c('Inflate the army numbers', { stats: { weird: 4 }, threat: -3, alienRel: -2 }),
    chk('Ask who else is on his list', {}, {
      base: 0.35, flags: { diplomats: 0.1, spies: 0.1, alien_contact: 0.05 },
      success: { text: 'He lets slip that three other planets were "processed" last year. He gives us their old address.', effect: { stats: { sci: 10 }, flags: { alien_contact: 1 }, threat: -4 } },
      fail: { text: 'He notes that we asked. He underlines it.', effect: { threat: 3 } },
    }),
  ], { age: S }),
  ev('s_rival_colony', 'rival', '🪐', 'The Same Moon', '{rival} has landed colonists on the same moon as us. Both colonies have built their capitals within shouting distance.', [
    c('Share the moon', { stats: { gold: 6 }, rival: { target: 'same', rel: 10, trade: true } }),
    c('Claim the moon', { stats: { mil: 8 }, rival: { target: 'same', rel: -12 } }),
    c('Build a wall across it', { stats: { gold: -8, joy: 3 }, flags: { engineers: 1 }, rival: { target: 'same', rel: -4 } }),
  ], { age: S, req: { rival: true } }),
  ev('s_reverse_cargo', 'alien', '📦', 'They Worship Our Junk', 'A primitive alien species has found one of our old probes and built a religion around it. They pray to it every day. It still beeps.', [
    c('Visit them as gods', { stats: { faith: 10, weird: 6 }, flags: { cult: 1 }, alienRel: -4 }),
    c('Send them a better probe', { stats: { sci: 6, gold: -6 }, alienRel: 6 }),
    c('Leave them alone', { stats: { faith: 4 } }),
  ], { age: S }),
  ev('s_we_see_you', 'alien', '👁️', 'We See You', 'A message arrives on every frequency at once. It just says "we see you". Then, a minute later, "nice suburbs".', [
    c('Reply "thank you"', { flags: { alien_contact: 1 }, alienRel: 6, threat: 1 }),
    c('Turn off the porch lights', { stats: { joy: -6 }, threat: -3 }),
  ], { age: S }),
  ev('s_time_zones', 'event', '🕓', 'The Time Zone War', 'Colonies on planets with different day lengths cannot agree on when Tuesday is. One colony has declared independence over it.', [
    c('Impose one galactic time', { stats: { gold: 8, joy: -6 }, flags: { bureaucracy: 1 } }),
    c('Let every planet have its own Tuesday', { stats: { joy: 8, weird: 6 } }),
  ], { age: S }),
  ev('s_homesick_bots', 'event', '🤖', 'Homesick Robots', 'Robots on the outer colonies have started sending postcards home. They miss the rain, which is bad for them, and say so.', [
    c('Bring them home', { stats: { gold: -8, joy: 6 }, flags: { robots: 1 } }),
    c('Install rain on the colonies', { stats: { gold: -12, sci: 6 }, flags: { robots: 1, engineers: 1 } }),
  ], { age: S }),
];

const posthuman: CardDef[] = [
  dec('research', 'p_backup', P, '💾', 'Mind Backups', 'Everyone can now back up their mind every night. Nobody reads the terms. The terms are mostly about the cloud owning your dreams.', 'Back everyone up', { stats: { pop: 12, sci: 14, joy: -6 }, flags: { upload: 1 } }),
  dec('research', 'p_body_optional', P, '👤', 'Bodies Optional', 'Bodies are now an accessory. Many people keep theirs for weekends.', 'Make it optional', { stats: { sci: 18, weird: 12, food: 10 } }),
  dec('research', 'p_merge', P, '🧠', 'Consciousness Merging', 'Two minds can now become one, temporarily. Couples who try it report "too much information".', 'Allow merging', { stats: { sci: 14, joy: 8, weird: 8 } }),
  dec('research', 'p_feel_weather', P, '🌦️', 'Emotional Weather', 'The sky now changes with the national mood. It has been overcast with a chance of anxiety for weeks.', 'Switch it on', { stats: { joy: 12, weird: 10, sci: 6 } }),
  dec('research', 'p_nostalgia', P, '📼', 'Nostalgia Engines', 'Machines that make you miss things that never happened. The most popular product in history.', 'Mass produce them', { stats: { gold: 22, joy: 10, sci: -6 } }),
  dec('policy', 'p_grand_vote', P, '👵', 'Votes for the Uploaded', 'Uploaded grandparents want the vote. There are now more uploaded grandparents than living citizens.', 'Give them the vote', { stats: { joy: -6, faith: 10 }, flags: { upload: 1, bureaucracy: 1 } }),
  dec('policy', 'p_body_holidays', P, '🏖️', 'Mandatory Body Holidays', 'Everyone must spend at least two weeks a year in a physical body, "for perspective".', 'Mandate it', { stats: { joy: 8, pop: 6, gold: -8 } }),
  dec('policy', 'p_no_sleep', P, '🌙', 'Sleep Abolished', 'Sleep is no longer necessary. Productivity triples. Dreams are now a hobby, like knitting.', 'Abolish sleep', { stats: { gold: 18, sci: 10, joy: -12 } }),
  dec('policy', 'p_identity', P, '🪪', 'Identity Licensing', 'You may now be up to four people at once, with the correct licence.', 'Issue licences', { stats: { gold: 14, weird: 8 }, flags: { bureaucracy: 1 } }),
  dec('project', 'p_museum', P, '🏛️', 'The Museum of Humanity', 'A museum of what we used to be: bodies, queues, toast. Admission is free for anyone who still has a mouth.', 'Open the museum', { stats: { joy: 10, faith: 8, gold: -10 } }),
  dec('project', 'p_planet_brain', P, '🌐', 'The Planetary Brain', 'Every computer, upload and pigeon network linked into one mind. It is thinking about lunch.', 'Wire the planet', { stats: { sci: 28, gold: -16 }, flags: { robots: 1 } }),
  dec('project', 'p_mega_choir', P, '🎶', 'The Billion-Voice Choir', 'Every uploaded mind singing one note at once. It can be heard in three neighbouring galaxies. They are asking for earplugs.', 'Conduct the choir', { stats: { joy: 14, faith: 10 }, flags: { party: 1 }, alienRel: 6 }),
  dec('project', 'p_spare_planet', P, '🪐', 'The Spare Planet', 'A backup Earth, kept in another system, just in case. It is identical except for the weather, which is nicer.', 'Build the spare', { stats: { pop: 10, gold: -20 }, threat: -4 }),
  dec('government', 'p_gov_consensus', P, '🐝', 'The Consensus of Minds', 'The merged minds propose governing by consensus. They have already reached consensus on proposing it.', 'Join the consensus', { gov: 'hive_mind', stats: { sci: 8 } }),
  dec('government', 'p_gov_algorithm', P, '🖥️', 'The Algorithm', 'An algorithm offers to run everything. Its manifesto is a single, very long number.', 'Run the number', { gov: 'ai_overlord', stats: { gold: 10 }, flags: { robots: 1 } }),

  ev('p_grandma_cloud', 'event', '👵', 'Grandma Is in the Cloud', 'The uploaded grandparents have discovered they can comment on everything, everywhere, forever. Grandma has notes on your posture.', [
    c('Listen to grandma', { stats: { joy: -4, faith: 8, pop: 4 } }),
    c('Give grandma a hobby', { stats: { gold: -8, joy: 6 } }),
    c('Mute the grandparents for one day', { stats: { joy: 10, faith: -8 }, text: 'The silence is deafening. And then very relaxing.' }),
  ], { age: P }),
  ev('p_exhibits', 'event', '🦖', 'The Exhibits Are Running the Museum', 'The Museum of Humanity\'s animatronic exhibits have taken over. They charge admission, give the tours and correct visitors about history.', [
    c('Let them run it', { stats: { gold: 10, weird: 8 }, flags: { robots: 1 } }),
    c('Take back the museum', { stats: { joy: -6, mil: 4 } }),
    c('Hire them as teachers', { stats: { sci: 12 }, flags: { scholars: 1 } }),
  ], { age: P }),
  ev('p_last_body', 'history', '🧍', 'The Last Person With a Body', 'Only one citizen still has a body full-time. He is now a national treasure, mobbed everywhere he goes, and would like some privacy.', [
    c('Make him a national monument', { stats: { joy: 8, faith: 6 } }),
    c('Respect his privacy', { stats: { faith: 4 } }),
    c('Ask him what it is like', { stats: { sci: 6, joy: 4 }, text: '"Itchy," he says. "But nice."' }),
  ], { age: P }),
  ev('p_fork', 'event', '👥', 'Forking Accident', 'A backup error has produced two copies of {leader}. Both insist they are the original. Both are making decisions.', [
    c('Let them rule together', { stats: { gold: 10, joy: -6 }, flags: { bureaucracy: 1 } }),
    luck('Flip a coin', [
      o(1, 'The loser is relieved and opens a bakery.', { stats: { food: 10, joy: 6 } }),
      o(1, 'The loser starts a rival government in the cloud.', { stats: { joy: -8, weird: 8 }, flags: { unrest: 1 } }),
    ]),
  ], { age: P }),
  ev('p_queue_riots', 'event', '🚶', 'Nostalgia for Queues', 'Citizens miss queuing. Illegal queues have formed outside closed shops. People wait in them for hours, perfectly happy.', [
    c('Legalise recreational queuing', { stats: { joy: 12 }, flags: { bureaucracy: 1 } }),
    c('Disperse the queues', { stats: { joy: -8, mil: 4 }, flags: { unrest: 1 } }),
  ], { age: P }),
  ev('p_still_there', 'alien', '📞', 'Are You Still There?', 'The alien fleet has sent a message: "Your planet looks different. Are you still there?" They sound worried we have left without them.', [
    c('Reply "still here"', { flags: { alien_contact: 1 }, alienRel: 6, threat: 2 }),
    c('Do not reply', { threat: -4, stats: { weird: 6 }, text: 'The fleet slows down, uncertain.' }),
    c('Reply as a hundred different species', { stats: { weird: 10 }, flags: { upload: 1 }, threat: -2, alienRel: -4 }),
  ], { age: P }),
  ev('p_defrag', 'event', '🧹', 'Defrag Day', 'National Defragmentation Day. All uploaded minds are tidied, sorted and compressed. Several people came back missing their least favourite memory.', [
    c('Make it annual', { stats: { joy: 10, sci: 6 } }),
    c('Restore the lost memories', { stats: { joy: -4, faith: 6 } }),
  ], { age: P }),
  ev('p_childhood_tours', 'event', '🧸', 'Childhood Tours', 'A company sells trips back into your own childhood memories. Customers return with scraped knees, somehow.', [
    c('Tax it', { stats: { gold: 14 } }),
    c('Ban it', { stats: { joy: -6 } }),
    c('Go on one yourself', { stats: { joy: 10, weird: 6 }, text: '{leader} came back with a lollipop and no explanation.' }),
  ], { age: P }),
  ev('p_ghost_body', 'event', '👻', 'A Ghost Wants Its Body Back', 'A citizen uploaded centuries ago would like a body again. The only one available is a decommissioned vending machine.', [
    c('Give her the vending machine', { stats: { weird: 8, gold: 4 }, flags: { robots: 1 } }),
    c('Grow her a new body', { stats: { gold: -10, pop: 2 }, flags: { genes: 1 } }),
  ], { age: P }),
  ev('p_body_rental', 'event', '🏷️', 'The Body Rental Market', 'Unused bodies are now rented out by the hour. Several have been returned with new tattoos.', [
    c('Regulate the market', { stats: { gold: 10 }, flags: { bureaucracy: 1 } }),
    c('Rent bodies to the army', { stats: { mil: 18, joy: -6 } }),
  ], { age: P }),
  ev('p_calendar', 'alien', '📆', 'The Fleet Is in the Calendar', 'Someone has added the alien invasion to the national calendar. It is a public holiday. Shops are already selling decorations.', [
    c('Cancel the holiday', { stats: { joy: -8, mil: 6 } }),
    c('Lean into it', { stats: { joy: 10, gold: 8 }, flags: { party: 1 }, threat: 2 }),
    c('Move the date, to confuse them', { stats: { weird: 6 }, flags: { bureaucracy: 1 }, threat: -2 }),
  ], { age: P }),
  ev('p_uploaded_cat', 'event', '🐈', 'Someone Uploaded a Cat', 'A cat has been uploaded. It has taken over seven servers and is sitting on the important data. It will not move.', [
    c('Let it sit', { stats: { joy: 8, sci: -8 }, flags: { cats: 1 } }),
    c('Upload more cats to reason with it', { stats: { weird: 10 }, flags: { cats: 2 } }),
  ], { age: P }),
  ev('p_rival_merge', 'rival', '🧠', 'A Mind-Merge Proposal', '{rival} proposes merging our two national minds into one. It would end all conflict. It would also end all arguments, which some people enjoy.', [
    c('Merge', { stats: { sci: 12, joy: -6 }, rival: { target: 'same', rel: 25, ally: true } }),
    c('Merge just the scientists', { stats: { sci: 14 }, rival: { target: 'same', rel: 8 } }),
    c('Refuse', { stats: { joy: 4 }, rival: { target: 'same', rel: -8 } }),
  ], { age: P, req: { rival: true } }),
];

const last: CardDef[] = [
  dec('research', 'l_sun_deal', L, '🌞', 'Renegotiate the Sun', 'Our scientists have found a way to talk to the sun. It wants better terms. It has a list.', 'Agree to its terms', { stats: { food: 20, sci: 14, gold: -16 }, threat: -2 }),
  dec('research', 'l_toe_draft', L, '📝', 'Theory of Everything (Draft)', 'The final theory of everything is finished. It has three typos and a coffee stain. Physicists are afraid to fix them.', 'Publish the draft', { stats: { sci: 30, weird: 10, faith: -8 } }),
  dec('research', 'l_nostalgia_ray', L, '📼', 'Weaponised Nostalgia', 'A beam that makes anyone it hits miss their home planet very badly. Field tests on volunteers caused a lot of crying.', 'Arm the beams', { stats: { mil: 24, joy: -8 }, threat: -3 }),
  dec('research', 'l_planet_engine', L, '🚀', 'The Planetary Engine', 'Giant engines that could, in theory, move the whole planet. Theory is doing a lot of work here.', 'Install the engines', { stats: { sci: 20, gold: -20, mil: 10 }, threat: -4 }),
  dec('research', 'l_grid', L, '🛡️', 'Defence Grid, Final Version', 'Version Final, after Final 2 and Final Final. This one definitely works. Nobody has tested it.', 'Switch it on', { stats: { mil: 30, gold: -18 }, threat: -5 }),
  dec('policy', 'l_medals', L, '🎖️', 'Everyone Gets a Medal', 'Morale is low. Every citizen is awarded a medal for "being here". The medal factories have not slept.', 'Award the medals', { stats: { joy: 16, gold: -12 }, flags: { propaganda: 1 } }),
  dec('policy', 'l_diplomacy', L, '🤝', 'Last-Minute Diplomacy', 'Every diplomat we have is sent to the fleet at once with flowers, apologies and a strongly-worded leaflet.', 'Send the diplomats', { stats: { gold: -12 }, flags: { diplomats: 1 }, alienRel: 12, threat: -2 }),
  dec('policy', 'l_evac', L, '🎟️', 'Evacuation Lottery', 'A lottery for seats on the escape ships. First prize: a seat. Second prize: two seats, which is worse.', 'Draw the tickets', { stats: { pop: -6, joy: 8 }, threat: -2 }),
  dec('policy', 'l_no_panic', L, '😐', 'National Day of Not Panicking', 'Everyone is ordered to remain calm for one day. Panic is rescheduled to Thursday.', 'Declare it', { stats: { joy: 12, sci: 4, mil: 4 } }),
  dec('project', 'l_last_wall', L, '🧱', 'The Last Wall', 'A wall around the whole planet. It is very tall. The aliens can fly. Nobody wants to mention this.', 'Build it anyway', { stats: { mil: 26, joy: 6, gold: -20 } }),
  dec('project', 'l_time_capsule', L, '📦', 'A Time Capsule for the Winner', 'A capsule addressed to "whoever is in charge afterwards". It contains our history, our recipes and a firmly worded complaint.', 'Bury it', { stats: { faith: 10, joy: 6, gold: -6 }, alienRel: 4 }),
  dec('project', 'l_red_button', L, '🔴', 'The Big Red Button', 'Engineers have built a big red button. Nobody knows what it does. They built it "for morale".', 'Install the button', { stats: { mil: 14, weird: 14, joy: 6 } }),
  dec('project', 'l_moon_fortress', L, '🌕', 'Moon Fortress', 'The whole moon has been turned into a fortress. It looks the same from here, but angrier.', 'Fortify the moon', { stats: { mil: 28, gold: -22 }, threat: -4 }),
  dec('government', 'l_gov_committee', L, '🗂️', 'Emergency Committee of Everything', 'In a crisis, everything must go through one committee. It has four thousand members and meets constantly.', 'Form the committee', { gov: 'bureaucracy_state', stats: { gold: 10 }, flags: { bureaucracy: 1 } }),
  dec('government', 'l_gov_panic_king', L, '👑', 'The Panic Monarchy', 'In the confusion, someone put on the old crown. People seem to like having a single person to blame.', 'Long live the panic king', { gov: 'monarchy', stats: { mil: 8, joy: 4 } }),
  dec('government', 'l_gov_final_cult', L, '🔮', 'Cult of the Final Hour', 'The robes are back. The chanting is louder. The cult says it saw this coming, and it did.', 'Put on the robes', { gov: 'cult_state', stats: { faith: 16 }, flags: { cult: 1 } }),

  ev('l_sun_raise', 'event', '☀️', 'The Sun Wants a Raise', 'Following the renegotiation rumours, the sun has started flickering in a way astronomers describe as "passive-aggressive".', [
    c('Pay the sun', { stats: { gold: -16, food: 10 } }),
    c('Threaten to get a new sun', { stats: { joy: 6, food: -10 }, text: 'The sun flares once, theatrically, and settles down.' }),
  ], { age: L }),
  ev('l_daylight_fleet', 'alien', '🛸', 'The Fleet in Daylight', 'The alien fleet is now visible in the middle of the day. Children point at it. Adults pretend it is weather.', [
    c('Hold a national staring day', { stats: { joy: 8 }, threat: 1, alienRel: 4 }),
    c('Put up shades', { stats: { gold: -10, joy: 4 } }),
    c('Aim everything at it', { stats: { mil: 16 }, alienRel: -8, threat: 2 }),
  ], { age: L }),
  ev('l_restroom', 'alien', '🚻', 'An Advance Scout Needs the Bathroom', 'A small alien scout has landed in the capital and is asking, urgently, where the bathroom is.', [
    c('Show him', { alienRel: 10, flags: { alien_contact: 1 }, text: 'He is very grateful. He says he will "put in a word".' }),
    chk('Hold the bathroom hostage', {}, {
      base: 0.35, flags: { spies: 0.08, bureaucracy: 0.06 },
      success: { text: 'In desperation he hands over his fleet clearance codes.', effect: { stats: { sci: 16 }, threat: -6 } },
      fail: { text: 'He finds a bush. The fleet is informed of our hospitality.', effect: { alienRel: -10, threat: 4 } },
    }),
  ], { age: L }),
  ev('l_exes', 'event', '💔', 'Everyone Is Calling Their Ex', 'With the end possibly near, the phone network has collapsed under the weight of everyone calling their exes.', [
    c('Expand the network', { stats: { gold: -10, joy: 6 } }),
    c('Make it illegal until after the invasion', { stats: { joy: -6, mil: 4 }, text: 'Many relationships are saved by this law. Several are ruined.' }),
  ], { age: L }),
  ev('l_grudge_census', 'history', '📜', 'The Final Grudge Census', 'Historians are compiling every grudge we have ever held, in case the aliens need to know who to blame.', [
    c('Publish the list', { stats: { joy: 6 }, flags: { grudge: 1 } }),
    c('Forgive everything on the list', { stats: { joy: 10, faith: 8 }, alienRel: 6 }),
    c('Add the aliens to it', { stats: { mil: 10 }, flags: { grudge: 1 }, alienRel: -6 }),
  ], { age: L }),
  ev('l_brochure', 'alien', '📰', 'The Invasion Brochure', 'Leaflets are falling from the sky. They are a glossy brochure for the invasion, including a map, a schedule and "what to expect".', [
    c('Read it carefully', { stats: { sci: 12 }, threat: -3 }),
    c('Correct the typos and send it back', { stats: { joy: 6 }, flags: { bureaucracy: 1 }, alienRel: 4 }),
    c('Burn them all', { stats: { mil: 6, joy: 4 }, alienRel: -4 }),
  ], { age: L }),
  ev('l_seating', 'alien', '🪑', 'The Seating Plan', 'The aliens have sent a seating plan for "after". Our leaders are seated near the kitchen.', [
    c('Demand better seats', { stats: { joy: 6 }, alienRel: -4 }),
    c('Accept graciously', { alienRel: 8, stats: { faith: 4 } }),
    c('Steal the plan and study it', { flags: { spies: 1 }, threat: -3, stats: { sci: 6 } }),
  ], { age: L }),
  ev('l_all_call', 'rival', '☎️', 'Everyone Calls at Once', 'Every neighbouring nation has called the palace at the same moment. They all want to know the same thing: "Are you seeing this?"', [
    c('Host an emergency summit', { stats: { gold: -10 }, flags: { diplomats: 1 }, rival: { target: 'random', rel: 15 }, threat: -2 }),
    c('Put them all on hold', { stats: { joy: 4 }, rival: { target: 'random', rel: -10 } }),
  ], { age: L, req: { rival: true } }),
  ev('l_last_tuesday', 'history', '☕', 'The Last Ordinary Tuesday', 'Historians have declared today the last ordinary Tuesday. People are having a very ordinary time, very deliberately.', [
    c('Make it a national memory', { stats: { joy: 12, faith: 6 } }),
    c('Spend it preparing', { stats: { mil: 12, joy: -4 } }),
  ], { age: L }),
  ev('l_prophets_agree', 'event', '🔮', 'Every Prophet Agrees', 'For the first time in history, every prophet, oracle and fortune teller agrees on something. They agree it will be "a lot".', [
    c('Fund the prophets', { stats: { faith: 14, gold: -8 }, flags: { prophecy: 1 } }),
    c('Ask them for specifics', { stats: { sci: 6 }, threat: -2, text: 'Their specifics include "lights", "noise" and "bring a coat".' }),
  ], { age: L }),
  ev('l_moon_leaves', 'alien', '🌑', 'The Moon Is Leaving', 'The moon has started to drift. The fleet is towing it. They have left a note saying they will bring it back.', [
    c('Demand the moon back', { stats: { mil: 10 }, alienRel: -6, threat: 2 }),
    c('Let them borrow it', { alienRel: 10, stats: { faith: -6 } }),
    c('Throw something at the tow cable', { stats: { mil: 8 }, flags: { yeet: 1 }, threat: -2 }),
  ], { age: L }),
  ev('l_omens', 'event', '🐦‍⬛', 'Too Many Omens', 'In one week: a two-headed calf, a rain of frogs, a comet, a solar eclipse and a pigeon that said "soon". The augurs are exhausted.', [
    c('Hire more augurs', { stats: { faith: 10, gold: -8 } }),
    c('Ignore the omens', { stats: { joy: 6, faith: -8 } }),
    c('Interview the pigeon', { stats: { weird: 10 }, flags: { pigeons: 1, alien_contact: 1 } }),
  ], { age: L }),
  ev('l_flyers', 'alien', '📃', 'Flyers in the Town Square', 'A small ship landed in the square, and a crew member is handing out flyers. They say "SURRENDER EARLY, SAVE 15%".', [
    c('Take a flyer', { alienRel: 4, stats: { gold: 6 }, threat: 2 }),
    c('Hand him one of ours', { stats: { joy: 6 }, flags: { propaganda: 1 }, text: 'Ours says "LEAVE EARLY, SAVE 100%". He takes it home.' }),
    c('Arrest him', { stats: { mil: 6 }, alienRel: -8, threat: -1 }),
  ], { age: L }),
  ev('l_fire_drill', 'event', '🚨', 'The Final Fire Drill', 'A national drill for the invasion. Half the population went to the shelters. The other half went to a party they thought it was.', [
    c('Run it again, properly', { stats: { mil: 10, joy: -6 }, threat: -2 }),
    c('Join the party', { stats: { joy: 14 }, flags: { party: 1 } }),
  ], { age: L }),
];

export const ageCardsFuture: CardDef[] = [...interstellar, ...posthuman, ...last];
