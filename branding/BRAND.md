# Ugh to UFO - Brand Sheet

## Tagline
**Nine ages to get ready. You won't be.**

Alternates:
- From grunting to getting probed in 25 minutes.
- The aliens are coming. Have you tried a cult?
- One decision per turn. Make it a weird one.
- History, but shorter and worse.

## Elevator pitch
Ugh to UFO is a quick civilization game where you make one big decision per turn and spend the rest of it dealing with the fallout. You have nine ages to get from the Stone Age to the Space Age before aliens show up, and whether you meet them with tanks, mech-cats, or a very persuasive religion is entirely your problem.

## itch.io description (~120 words)
You lead a tribe of people who have just discovered rocks. In about 25 minutes, aliens will arrive. Get ready.

Each turn you make one big call: what to research, which law to pass, what to build, who's in charge. Then history happens. Plagues, philosophers, a king who outlaws Tuesdays. You react, mostly by making it worse.

Trade with rival civilizations, marry into their royal families, or annoy them until they leave you alone. Push through nine eras to the Space Age, then find out if it was enough.

You can win with an army. You can also win with cat cavalry that later becomes mech-cats, a cult that converts the invaders, or paperwork so dense they give up.

Plays in your browser. No install.

## Feature bullets
- One big decision per turn, so a full run fits in a lunch break
- Nine eras, from sharpened sticks to orbital lasers
- Hundreds of parody history events, most of which go wrong
- Rival civilizations to trade with, marry into, or quietly irritate
- Many ways to survive the invasion, including cats, cults, and forms in triplicate

## Voice & tone

The game talks like a tired historian who has seen every civilization make the same mistakes and still finds it a bit funny.

Rules:
1. **Short.** Event text is two or three sentences. The joke goes last.
2. **Deadpan.** State absurd things as plain facts. Never wink, never use exclamation marks to sell a joke.
3. **Specific beats random.** "A goat was elected mayor" is funnier than "something crazy happened".
4. **The player is in charge, not the butt of every joke.** Mock the citizens, the advisors, history itself. Tease the player gently.
5. **Choices are labeled by what they do,** with flavor after. The player should never have to guess what a button means.
6. **No modern internet slang** (no "epic", "based", "yeet"). It dates fast and breaks the historian voice.
7. **Emoji support the text, they don't replace it.** One per card title is plenty.

Examples:

| Do | Don't |
|---|---|
| "Your scholars invented the wheel. They are now arguing about whether it counts if it's square." | "OMG your scholars invented the WHEEL!!! 🎉🎉 Time to roll!" |
| "A traveling prophet says the world ends Thursday. Productivity is down 40%." | "Something totally random and crazy happened to your people, lol." |
| Button: **Fund the moon program** (+Science, -Gold) | Button: **Shoot for the stars?!** |

## Color palette

Built for a dark UI first. Every accent passes comfortable contrast on the dark background.

### Dark (default)

| Name | Hex | Role |
|---|---|---|
| Night Sky | `#14121F` | Page background |
| Cave Wall | `#221E33` | Cards, panels |
| Flint | `#EDE6D6` | Main text (warm off-white) |
| Ember | `#FF8A3D` | Primary accent, buttons, early eras, "Ugh" in the logo |
| Saucer Green | `#7CF29A` | Secondary accent, late eras, positive effects, "UFO" in the logo |
| Tractor Beam | `#A78BFA` | Rare events, special choices, highlights |
| Bad News | `#FF5A5F` | Danger, losses, negative effects |

### Light variant

| Name | Hex | Role |
|---|---|---|
| Parchment | `#F6F1E7` | Page background |
| Clay | `#FFFFFF` | Cards, panels |
| Charcoal | `#1E1A2B` | Main text |
| Ember | `#D9601A` | Primary accent |
| Saucer Green | `#1F9D55` | Secondary accent |
| Tractor Beam | `#6D4FD8` | Rare events, highlights |
| Bad News | `#D63A3F` | Danger, losses |

Muted text: use Flint at 65% opacity on dark, Charcoal at 65% on light.

## Fonts (Google Fonts)
- **Display: Lilita One** - chunky and rounded, matches the logo, good for era names, card titles, and big numbers.
- **Body: Atkinson Hyperlegible** - very readable at small sizes, which matters on a dense dashboard. Has a slightly odd personality that suits the tone.

Fallbacks: `"Lilita One", "Arial Rounded MT Bold", system-ui, sans-serif` and `"Atkinson Hyperlegible", system-ui, sans-serif`.

## Logo files
- `logo.svg` - horizontal wordmark, for dark backgrounds. "UGH" in Ember, "UFO" in Saucer Green, the O has a saucer disc with lights across its middle. All letters are drawn as strokes, no fonts needed.
- `icon.svg` - 512x512 app icon and favicon. A saucer beaming up a rock.
