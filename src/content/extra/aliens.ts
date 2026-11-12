// Alien foreshadowing across the eras.
import type { CardDef } from '../../types';

export const alienCards: CardDef[] = [
  {
    id: 'x_a_marsh', kind: 'alien', title: 'Lights Over the Marsh', emoji: '✨', era: [0, 3], once: true,
    text: 'Hunters saw lights over the marsh. The lights stopped, seemed to notice them, then left very quickly.',
    choices: [
      { label: 'Wave', effect: { stats: { weird: 2 }, alienRel: 3 } },
      { label: 'Throw spears', effect: { stats: { mil: 2 }, alienRel: -3, threat: 1, chain: { id: 'ch_f_marshspear', delay: 2 } } },
      { label: 'Never go to the marsh again', effect: { stats: { faith: 3, food: -2 } } },
    ],
  },
  {
    id: 'x_a_sheep', kind: 'alien', title: 'Humming Sheep', emoji: '🐑', era: [1, 4], once: true,
    text: 'A flying disc hovered over a shepherd, played three notes, and left. The sheep now hum the notes in unison.',
    choices: [
      { label: 'Record the melody', effect: { stats: { sci: 3 }, alienRel: 2, threat: -1 } },
      { label: 'Sell the singing sheep', effect: { stats: { gold: 5, weird: 2 } } },
      { label: 'Teach the sheep a fourth note', effect: { stats: { weird: 3 }, alienRel: 4, chain: { id: 'ch_f_sheep', delay: 3 } } },
    ],
  },
  {
    id: 'x_a_cow', kind: 'alien', title: 'The Returned Cow', emoji: '🐄', era: [1, 5], once: true,
    text: 'A cow was lifted into the sky by a beam of light. It returned an hour later with a new hairstyle and a calm, knowing look.',
    choices: [
      { label: 'Study the cow', effect: { stats: { sci: 4 }, threat: -1 } },
      { label: 'Worship the cow', effect: { stats: { faith: 4, weird: 2 }, alienRel: 2 } },
      { label: 'Eat the evidence', effect: { stats: { food: 3 }, alienRel: -3, chain: { id: 'ch_f_cow', delay: 1 } } },
    ],
  },
  {
    id: 'x_a_circles', kind: 'alien', title: 'Crop Circles', emoji: '🌀', era: [2, 6], once: true,
    text: "Farmers found enormous circles stamped into the wheat. Translated, they seem to say 'nice wheat'.",
    choices: [
      { label: 'Study the patterns', effect: { stats: { sci: 4 }, alienRel: 2 } },
      { label: 'Stamp a reply', effect: { stats: { food: -2, weird: 2 }, alienRel: 5, text: "We wrote 'thanks'. It took two villages.", chain: { id: 'ch_f_circles', delay: 2 } } },
      { label: 'Burn the field', effect: { stats: { food: -3 }, alienRel: -4, threat: 1, chain: { id: 'ch_f_burnt', delay: 2 } } },
    ],
  },
  {
    id: 'x_a_temples', kind: 'alien', title: 'Ancient Astronaut Theory', emoji: '🏺', era: [2, 5], once: true,
    text: 'A scholar insists aliens built our temples. The builders guild is livid and has started building the scholar a smaller house.',
    choices: [
      { label: 'Side with the scholar', effect: { stats: { weird: 4, joy: -2 }, alienRel: 2 } },
      { label: 'Side with the builders', effect: { stats: { joy: 3, faith: 2 } } },
    ],
  },
  {
    id: 'x_a_meteor', kind: 'alien', title: 'Not a Meteor', emoji: '☄️', era: [3, 7], once: true,
    text: 'A meteor landed in the hills. It has a door. The door has a doorbell.',
    choices: [
      {
        label: 'Ring the doorbell',
        check: {
          base: 0.3, flags: { alien_contact: 0.1, diplomats: 0.08, custom_polite: 0.2, god_lights: 0.1 },
          success: { text: 'Nobody answers, but a pamphlet slides out. It is about tidal patterns and invasion logistics.', effect: { stats: { sci: 5 }, threat: -2 } },
          fail: { text: 'A small grey figure answers, sees us, and slams the door. The meteor leaves.', effect: { stats: { weird: 4 }, threat: 2, alienRel: -2 } },
        },
      },
      { label: 'Melt it down for metal', effect: { stats: { gold: 6, mil: 2 }, alienRel: -4, chain: { id: 'ch_f_meteor', delay: 3 } } },
    ],
  },
  {
    id: 'x_a_advisor', kind: 'alien', title: 'The New Chancellor', emoji: '🦾', era: [4, 8], once: true,
    text: 'Your new chancellor has three elbows and says this is normal where he is from. He asks many questions about our defenses.',
    choices: [
      { label: 'Feed him false information', effect: { stats: { weird: 2 }, threat: -3, chain: { id: 'ch_f_falseinfo', delay: 3 } } },
      {
        label: 'Expose him at court',
        check: {
          base: 0.35, flags: { spies: 0.12, alien_contact: 0.06, cats: 0.05 },
          success: { text: 'He flees through the ceiling. His notes are left behind.', effect: { stats: { sci: 6 }, threat: -2, alienRel: -3 } },
          fail: { text: 'He turns out to be a regular man with an unusual childhood. Awkward.', effect: { stats: { joy: -4 } } },
        },
      },
      { label: 'Make him Minister of Snacks', effect: { stats: { joy: 3 }, alienRel: 5, threat: 1, chain: { id: 'ch_f_snacks', delay: 2 } } },
    ],
  },
  {
    id: 'x_a_cube', kind: 'alien', title: 'The Cube', emoji: '🧊', era: [3, 7], once: true,
    text: 'A perfect cube appeared in the town square. It is slightly warmer than it should be. Pigeons avoid it.',
    choices: [
      { label: 'Build a temple around it', effect: { stats: { faith: 5, gold: -3 }, alienRel: 2 } },
      { label: 'Poke it with science', effect: { stats: { sci: 6 }, threat: 1, chain: { id: 'ch_f_cube', delay: 2 } } },
      { label: 'Use it as a bench', effect: { stats: { joy: 3, weird: 3 }, alienRel: 3, chain: { id: 'ch_f_bench', delay: 2 } } },
    ],
  },
  {
    id: 'x_a_tourists', kind: 'alien', title: 'Alien Tourists', emoji: '📸', era: [5, 8], once: true,
    text: 'Visitors with cameras where their faces should be are photographing our monuments and laughing.',
    choices: [
      { label: 'Sell them souvenirs', effect: { stats: { gold: 7 }, alienRel: 3, chain: { id: 'ch_f_souvenir', delay: 3 } } },
      { label: 'Charge them a tourist tax', effect: { stats: { gold: 4 }, flags: { bureaucracy: 1 }, alienRel: -2 } },
      { label: 'Laugh at them back', effect: { stats: { joy: 4 }, alienRel: -4, threat: 1, chain: { id: 'ch_f_laughed', delay: 2 } } },
    ],
  },
  {
    id: 'x_a_census', kind: 'alien', title: 'Census Anomaly', emoji: '📋', era: [5, 8], once: true,
    text: "The census counted four hundred more citizens than exist. All of them list their occupation as 'human'.",
    choices: [
      { label: 'Round them up', effect: { stats: { mil: 3, joy: -3 }, threat: -3, alienRel: -4, chain: { id: 'ch_f_roundup', delay: 1 } } },
      { label: 'Tax them like everyone else', effect: { stats: { gold: 5 }, alienRel: 3, text: 'They pay promptly. Too promptly.' } },
      { label: 'Invite them to dinner', effect: { stats: { food: -3 }, alienRel: 6, threat: 1, chain: { id: 'ch_f_dinner', delay: 1 } } },
    ],
  },
  {
    id: 'x_a_probe', kind: 'alien', title: 'Customer Feedback', emoji: '🛸', era: [5, 8], once: true,
    text: 'Twelve citizens were abducted and returned with clipboards. They were asked to rate the experience out of ten.',
    choices: [
      { label: 'Rate it ten', effect: { stats: { joy: 2 }, alienRel: 5 } },
      { label: 'Rate it one, with comments', effect: { stats: { joy: 4 }, alienRel: -3, threat: 1, chain: { id: 'ch_f_onestar', delay: 2 } } },
      { label: 'Steal the clipboards', effect: { stats: { sci: 6 }, alienRel: -4, chain: { id: 'ch_f_clipboard', delay: 2 } } },
    ],
  },
  {
    id: 'x_a_signal', kind: 'alien', title: 'The Signal', emoji: '📶', era: [6, 8], once: true,
    text: 'Radio telescopes picked up a repeating signal. It is a countdown. It is in our counting system.',
    choices: [
      { label: 'Reply', effect: { stats: { sci: 3 }, flags: { alien_contact: 1 }, alienRel: 5, threat: 2, chain: { id: 'ch_f_countdown', delay: 2 } } },
      { label: 'Decode it fully', effect: { stats: { gold: -4 } }, check: {
        base: 0.25, stats: { sci: 0.002 }, flags: { scholars: 0.1, alien_contact: 0.08, god_math: 0.15 },
        success: { text: 'The countdown is decoded. It is counting to their lunch break. We now know when to strike.', effect: { stats: { sci: 6 }, threat: -3 } },
        fail: { text: 'The decoding team only got as far as "Dear Occupants".', effect: { stats: { sci: 3 } } },
      } },
      { label: 'Turn off the telescopes', effect: { stats: { joy: 3 }, threat: 2, text: 'The countdown continues, unbothered.' } },
    ],
  },
  {
    id: 'x_a_request', kind: 'alien', title: 'Song Request', emoji: '📻', era: [6, 7], once: true,
    text: "A radio station received a song request from forty light-years away. It is for a song nobody has written yet.",
    choices: [
      { label: 'Write the song', effect: { stats: { joy: 5, gold: -2 }, flags: { party: 1 }, alienRel: 6, chain: { id: 'ch_f_song', delay: 3 } } },
      { label: 'Play something else', effect: { alienRel: -3, threat: 1, chain: { id: 'ch_f_played', delay: 2 } } },
    ],
  },
  {
    id: 'x_a_moon', kind: 'alien', title: 'Something on the Moon', emoji: '🌘', era: [6, 8], once: true,
    text: 'Telescopes spotted a structure on the far side of the moon. It looks like a parking lot.',
    choices: [
      { label: 'Send a probe', effect: { stats: { sci: 6, gold: -5 }, threat: -2, chain: { id: 'ch_f_moonprobe', delay: 2 } } },
      { label: 'Fill the parking lot with rocks', effect: { stats: { mil: 4, gold: -3 }, threat: -1, alienRel: -4 } },
      { label: 'Put up a no-parking sign', effect: { stats: { weird: 3 }, flags: { bureaucracy: 1 }, alienRel: 2, chain: { id: 'ch_f_noparking', delay: 2 } } },
    ],
  },
  {
    id: 'x_a_gift', kind: 'alien', title: 'A Gift Basket', emoji: '🧺', era: [6, 8], once: true,
    text: "A crate landed in the capital. Inside are strange fruits and a card: 'Sorry in advance.'",
    choices: [
      { label: 'Eat the fruit', outcomes: [
        { weight: 2, text: 'Delicious. Everyone feels oddly forgiving.', effect: { stats: { food: 5, joy: 4 }, alienRel: 4 } },
        { weight: 1, text: 'Delicious. Everyone briefly turns blue.', effect: { stats: { food: 3, weird: 5 }, flags: { genes: 1 } } },
      ] },
      { label: 'Analyze the card', effect: { stats: { sci: 5 }, threat: -2 } },
    ],
  },
  {
    id: 'x_a_survey', kind: 'alien', title: 'Satisfaction Survey', emoji: '📝', era: [7, 8], once: true,
    text: "A survey arrives from space: 'On a scale of one to ten, how likely are you to resist?'",
    choices: [
      { label: 'Eleven', effect: { stats: { mil: 4, joy: 3 }, threat: 2, chain: { id: 'ch_f_survey11', delay: 2 } } },
      { label: 'Two, honestly', effect: { stats: { joy: -3 }, threat: -2, alienRel: 3, text: 'They seem to relax. Good.', chain: { id: 'ch_f_survey2', delay: 1 } } },
      { label: 'Fill it out in triplicate', effect: { flags: { bureaucracy: 1 }, threat: -1 } },
    ],
  },
  {
    id: 'x_a_warning', kind: 'alien', title: 'A Second Opinion', emoji: '⚠️', era: [7, 8], once: true,
    text: 'A different alien species sends a warning about the first. It comes with a discount coupon for their own protection services.',
    choices: [
      { label: 'Use the coupon', effect: { stats: { gold: -8, mil: 6 }, flags: { alien_contact: 1 }, threat: -3 } },
      { label: 'Ask for a better coupon', effect: { stats: { gold: -3 }, flags: { alien_contact: 1 }, alienRel: 3, chain: { id: 'ch_f_coupon', delay: 1 } } },
      { label: 'Ignore the spam', effect: { stats: { joy: 2 }, threat: 1 } },
    ],
  },
  {
    id: 'x_a_leak', kind: 'alien', title: 'Leaked Invasion Plans', emoji: '🗂️', era: [7, 8], once: true,
    text: "Someone on the alien fleet accidentally sent their invasion plans to our mail server. A follow-up asks us to delete it.",
    choices: [
      { label: 'Read it carefully', effect: { alienRel: -3 }, check: {
        base: 0.3, stats: { sci: 0.002 }, flags: { spies: 0.12, scholars: 0.08, bureaucracy: 0.04 },
        success: { text: 'Page 84 reveals the fleet\'s shields are switched off on Tuesdays.', effect: { stats: { sci: 4, mil: 5 }, threat: -5 } },
        fail: { text: 'It is mostly a catering order. We learn the aliens like toast.', effect: { stats: { sci: 2 }, threat: -1 } },
      } },
      { label: 'Delete it, as asked', effect: { stats: { faith: 2 }, alienRel: 8, chain: { id: 'ch_f_deleted', delay: 2 } } },
      { label: 'Reply all', effect: { stats: { weird: 5 }, threat: 3, text: 'Four thousand alien officers are now in the thread.', chain: { id: 'ch_f_replyall', delay: 1 } } },
    ],
  },
];
