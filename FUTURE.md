# Future features

Ideas parked for later. Not started.

## Seeds
- Every run gets a seed (shown on the ending screen and in the top bar).
- Entering a seed replays the same origins offered, rivals, and card draws.
- Daily seed: everyone plays the same civilization each day, compare endings.
- Needs a seeded RNG in place of `Math.random()` throughout the engine.

## Multiplayer
- Hot-seat: 2-4 players, each runs a civilization on the same planet, and the other players are the rivals instead of AI neighbours.
- Async: share a seed and compare results, or a shared leaderboard per seed.
- Co-op finale: every player defends one of the three invasion waves.
- Needs a backend for anything beyond hot-seat.

## Achievements
- Unlocked per ending, form, and storyline peak (e.g. win with the cats, become the Tide-Folk, reach Gerald.exe).
- Odd ones: lose every wave, never declare war, reach the Space Age as a Tribe, all three neighbours allied.
- Collection screen on the title page, stored locally.

## Sound
- Short effects: dice roll, success/fail stamp, card flip, era fanfare, alien rumble in the finale.
- Ambient loop per age (drums in the Stone Age, factory hum in the Industrial era, synth hum in space).
- Mute toggle and volume, remembered between sessions.

## Neighbours act on their own
- Each turn a small chance that a neighbour makes a move off-screen: declares war on another neighbour, signs a pact with one, gets conquered (`alive` / `destroy` already exist).
- Their moves feed new diplomacy situations, e.g. two neighbours at war and both ask for help.
- Makes the Neighbours panel feel alive between diplomacy turns.

## Diplomacy situations with memory
- Store the choice made in a situation as a flag (e.g. declined the alliance with X).
- Bring it back later as a follow-up through the chain system (`chains`, `ch_*` flags): snubbed friends cool off, a caught spy returns as a vengeful defector.

## Promises and deadlines
- Some choices create a promise with a timer: "Pay 10 gold within 3 turns or they invade."
- Shown as a countdown chip under Things That Are Happening.
- Adds tension without adding menus.

## Neighbours in the alien finale
- A few ages before the fleet arrives, neighbours hint at what they will do: "The Urporsnifians say they will side with whoever is winning."
- Turns late-game diplomacy into preparation for the finale, where allies and enemies already count.

## Leader traits
- Each leader gets one trait that nudges odds: better spy rolls, more happiness from insults, worse peace rolls.
- A leader dying or being replaced becomes an event.
- More variety between runs with very little UI.

## Megaprojects
- A wonder built over several turns (Great Wall, Moon Cannon), with resources committed each turn.
- Neighbours react: envy, sabotage events.
- Finishing it gives a finale bonus. Gives a run a long-term goal beyond reacting to cards.

## Run history and unlocks
- Record each run's ending and the storylines seen; show them in a codex on the title screen.
- Seeing an ending unlocks new origins or forms.
- Overlaps with the Achievements collection screen; build them together.
