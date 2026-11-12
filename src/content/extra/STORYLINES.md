# Extra storyline flags

Each storyline uses a counter flag (stage 1-6) and a `<flag>_off` flag set when the player opts out.

- `pigeons` (1-6): pet pigeon -> postal service -> spy agency -> pigeon air force -> orbital pigeons -> sky message. Peak feeds `mil`, `robots`, `alien_contact`, alienRel. Finale idea: pigeon swarm blots out the fleet's sensors.
- `gerald` (1-6): a rock named Gerald -> council member -> schism -> silicon descendants -> Gerald.exe -> sets gov `ai_overlord`. Peak feeds `robots`. Finale idea: Gerald simply does not move, and the aliens cannot either.
- `dance` (1-5): dance craze -> dancing plague -> laws by dance-off -> dance-powered grid -> interstellar dance-off. Peak feeds `party`, alienRel. Finale idea: win the invasion by dance battle.
- `grudge` (1-5): goat insult -> grudge keepers -> goat war -> spite engine -> grudge against the aliens. Peak feeds `mil`. `grudge_forgiven` set if the player forgives everyone at the end. Finale idea: millennia of spite as a weapon.
- `hole` (1-6): a hole -> deeper hole -> knocking from below -> undercity -> the door at the bottom. Feeds `alien_contact`, lowers threat. Finale idea: the whole civ hides underground and the aliens find an empty planet.
- `bees` (1-5): honey -> royal jelly diplomacy -> waggle translation -> swarm logic -> bee-graft hive link. Peak feeds `genes`; gov card `hive_mind` at bees >= 4. Finale idea: war swarm.
- `heads` (1-5): giant stone heads -> hundreds of heads -> they rotate -> they are an antenna array -> buttons in their mouths. Peak feeds `alien_contact`. Finale idea: the ancestors' phone line calls in old friends.
- `ducks` (1-5): duck citizen -> duck senator -> duck lawyers -> Supreme Duck Court -> interplanetary injunction. Peak feeds `bureaucracy`. Finale idea: the invasion is stalled in duck court forever.
- `prophecy` (1-5): sneezed-on scroll -> nation plants beans -> missing word -> prophecy industry -> final reading. Feeds `cult`, faith, lowers threat. Finale idea: aliens are allergic to beans.
- `yeet` (1-5): rock thrower -> trebuchets -> launching people -> orbital throwing program -> throw everything at the fleet. Peak feeds `mil`, sci. Finale idea: the fleet is hit by a cathedral.
- `fungus` (1-5): oracle mushrooms -> mycelium mail -> library mold -> spore consciousness -> the continental bloom. Peak feeds `genes`, weird; gov card `hive_mind` at fungus >= 4. Finale idea: spores in the alien ships.
- `turk` (1-5): fake chess automaton -> small men inside machines -> union of men inside -> robot that believes in its man -> grandmaster robot army. Peak feeds `robots`. Finale idea: beat the aliens at chess.
- `spice` (1-5): angry berry -> heat wars -> pepper navy -> seismic pepper -> aliens have sensitive tongues. Peak feeds `mil`, `genes`. Finale idea: hot sauce defense.
- `mascot` (1-5): dog elected mayor -> dog dynasty -> belly rub peace accords -> global celebrity dog -> dog ambassador to the aliens. Peak feeds `party`, alienRel. Finale idea: the aliens just want to pet the dog.

# Reactive state flags

These flags are raised by ordinary events and decisions. Later cards check them and usually reset them with `set`.

- `debt`: from loans and bailouts. At 2 or more, "Creditors at the Door" appears (pay, default or borrow more).
- `inflation`: from printing money and refinancing debt. At 2 or more, "Wheelbarrow Economy" appears.
- `corruption`: from bribes, smuggling and nationalized oil. At 2 or more, "Golden Toilet Scandal" appears. At 4 or more, "Everyone Is On the Take" can switch the government to corporatocracy.
- `unrest`: from hat laws, ignored veterans, defaults and bans. At 2 or more, "Peasant Revolt" appears (one option switches the government to anarchy).
- `plague`: from ignoring disease or skipping baths. At 1 or more, "Second Wave" appears.
- `heresy`: from tolerated sects and lost debates with prophets. At 2 or more, "Holy War of the Spoons" appears.
- `pollution`: from coal and oil. At 1 or more, "Smog Day" appears. At 2 or more, "Three-Eyed Fish" (which feeds genes) and "Getting Warm in Here" (which raises threat if ignored) appear.
- `depleted`: from exhausted mines and forests. At 2 or more, "Running Out of Everything" appears.
- `education`: from schools. At 2 or more, "Too Educated" appears.
