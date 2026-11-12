# Chain flags

Every multi-storyline chain in `chains.ts`, `chains2.ts` and `chains3.ts` has a counter flag `ch_<name>` that goes up by one per step. Some chains also set `ch_<name>_off` when the player backs out. All other flags used in this folder already existed: storylines, capabilities, forms, origins and reactive flags like `unrest`, `heresy`, `debt` and `corruption`.

| Flag | Display name | Emoji | Started by |
| --- | --- | --- | --- |
| `ch_purrbot` | Cat-Driven Machines | 🤖 | cats + robots |
| `ch_choir` | The Orbital Choir | 🎼 | cult + alien_contact |
| `ch_beegene` | Edited Bees | 🐝 | bees + genes |
| `ch_duckpaper` | Duck Clerks | 🦆 | ducks + bureaucracy |
| `ch_dancegrudge` | The Grudge Dance-Off | 🕺 | dance + grudge |
| `ch_pigeonspy` | Feathered Agents | 🐦 | pigeons + spies |
| `ch_yeetnavy` | Ballistic Navy | ⚓ | yeet + navy |
| `ch_holeeng` | Engineering the Hole | 📐 | hole + engineers |
| `ch_fungscholar` | Professor Mould | 🍄 | fungus + scholars |
| `ch_mascotdip` | The Summit Dog | 🐕 | mascot + diplomats |
| `ch_genemed` | The Cure for Ordinary | 💉 | genes + medicine |
| `ch_propcult` | Holy Slogans | 📣 | propaganda + cult |
| `ch_geraldturk` | Gerald's Chess Match | ♟️ | gerald + turk |
| `ch_spicemed` | Pepper Medicine | 🌶️ | spice + medicine |
| `ch_headsscholar` | The Nostril Texts | 🗿 | heads + scholars |
| `ch_tidenavy` | The Kelp Admiralty | 🌊 | tide + navy |
| `ch_uploadbur` | Afterlife Paperwork | 💾 | upload + bureaucracy |
| `ch_ghostspy` | Ghost Agents | 👻 | ghost + spies |
| `ch_catmecheng` | Cat-Knight Maintenance | 🐆 | catmech + engineers |
| `ch_loopproph` | Notes to Self | 🔁 | loop + prophecy |
| `ch_incdip` | Acquisition Talks | 💼 | inc + diplomats |
| `ch_driftpig` | Airspace Dispute | 🎈 | drift + pigeons |
| `ch_weemed` | Tiny Doctors | 🔬 | wee + medicine |
| `ch_bellyfrog` | The Temple in the Frog | 🐸 | belly + god_frog |
| `ch_logparty` | Party Logistics | 🎪 | party + logistics |
| `ch_davebots` | Dave.exe | 🖥️ | god_dave + robots |
| `ch_politespies` | Apologetic Spies | 🙇 | custom_polite + spies |
| `ch_hatsprop` | Slogan Hats | 🎩 | custom_hats + propaganda |
| `ch_catsgenes` | The Cat Genome | 🧬 | cats + genes |
| `ch_partyrobots` | Robot DJs | 🎧 | party + robots |
| `ch_cultgenes` | Holy Clones | 🕯️ | cult + genes |
| `ch_burrobots` | The Filing Machine | 🗂️ | bureaucracy + robots |
| `ch_volcanospice` | Lava Peppers | 🌋 | land_volcano + spice |
| `ch_lunareng` | Moving Day | 🌕 | lunar + engineers |
| `ch_craterbur` | The Broadcast Licence | 📡 | land_crater + bureaucracy |

Opt-out flags: `ch_purrbot_off`, `ch_duckpaper_off`, `ch_fungscholar_off`, `ch_loopproph_off`, `ch_cultgenes_off`.

## Diplomacy memory flags

Set in `doDiplomacy` (`engine.ts`); each also schedules a `ch_f_dip_*` follow-up for the rival involved. Follow-ups are skipped if that rival has died.

| Flag | Set when |
| --- | --- |
| `dip_snub` | An alliance offer was ignored |
| `dip_spycaught` | A spy was caught |
| `dip_insult` | A rival was insulted |
| `dip_sided` | You backed one side in a Neighbourly Feud (the other side gets `ch_f_dip_grudge`) |

Paying off raiders (gift during war) sets no flag; it schedules `ch_f_dip_raiders`.

## Ids

- `ch_f_*`: chain-only follow-ups for choices in the older content files (`followups.ts`, `followups_rivals.ts`).
- `ch_<chain>_<step>`: multi-storyline chains. Only `_1` cards draw normally; the later steps are chain-only.
- `ch_al_*`, `ch_wr_*`, `ch_fr_*`, `ch_fo_*`: relation cards for allies, wars, friendly and hostile rivals (`rivals.ts`).
- `ch_fa_*`, `ch_i_*`, `ch_x_*`, `ch_s_*`, `ch_p_*`, `ch_l_*`: Farming, Iron, Exploration, Interstellar, Post-Human and Last Age cards.
