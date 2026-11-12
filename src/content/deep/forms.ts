// Civilization forms: whole-civ transformations unlocked by the deep paths.
import type { CivForm } from '../../types';

export const forms: CivForm[] = [
  {
    id: 'tide', name: 'The Tide-Folk', emoji: '🌊', noun: 'Tide-Folk',
    desc: 'The whole nation lives under the sea in glass domes. Land is for seagulls and tourists.',
    perTurn: { food: 2, mil: -1 },
    finale: {
      name: 'The Deep Welcome', pitch: 'Let them land. Then raise the tide.',
      win: 'The fleet lands on empty beaches. The tide comes in. It keeps coming in. The aliens learn they cannot swim, and you learn they cannot hold their breath.',
      lose: 'The aliens turn out to be aquatic. They were delighted to find a whole civilisation already in the fish tank.',
      stat: 'food',
    },
  },
  {
    id: 'turtle', name: 'The Shell-Riders', emoji: '🐢', noun: 'Shell-Riders',
    desc: 'The nation lives on the back of a walking turtle the size of a mountain range. Addresses change hourly.',
    perTurn: { mil: 1, weird: 1 },
    finale: {
      name: 'Pull In the Head', pitch: 'Margaret has survived nine ice ages. She can survive one invasion.',
      win: 'Margaret pulls in her head. Then her legs. Then the whole nation. The fleet spends a decade knocking on the shell before giving up.',
      lose: 'The aliens simply wait. Margaret is very patient, but she is not hungry-for-four-hundred-years patient.',
      stat: 'mil',
    },
  },
  {
    id: 'spore', name: 'The Bloom', emoji: '🍄', noun: 'Sporefolk',
    desc: 'The civilisation is now one damp, continent-sized organism. Everyone agrees, constantly.',
    perTurn: { sci: 2, joy: -1 },
    finale: {
      name: 'Gentle Colonisation', pitch: 'Let them breathe us in.',
      win: 'Every alien that steps off a ship inhales one spore. Within a week they are part of the network and very interested in compost.',
      lose: 'The aliens arrive in sealed suits and spray the continent with something lemon-scented. You will grow back. Eventually.',
      stat: 'weird',
    },
  },
  {
    id: 'upload', name: 'The Uploaded', emoji: '💾', noun: 'Uploads',
    desc: 'Everyone lives inside a very large computer. The bodies are in storage. The storage is a bit dusty.',
    perTurn: { sci: 2, pop: -1 },
    finale: {
      name: 'Nobody Home', pitch: 'There is nothing organic left to conquer. Only a server with a password.',
      win: 'The aliens search the planet and find no one, just a humming box with a password hint that says "lol". They leave, deeply confused.',
      lose: 'The aliens unplug it to charge their phone.',
      stat: 'sci',
    },
  },
  {
    id: 'lunar', name: 'The Moonfolk', emoji: '🌕', noun: 'Moonfolk',
    desc: 'The nation packed up and moved to the moon. Earth is now "the old place" and nobody calls.',
    perTurn: { sci: 1, faith: 1 },
    finale: {
      name: 'The High Ground', pitch: 'They are invading Earth. We are not on Earth.',
      win: 'The fleet conquers an empty Earth. From the moon, you drop a few rocks on them, then return to your low-gravity picnic.',
      lose: 'The aliens check the moon. It is the first place anyone checks. Everyone is very embarrassed.',
      stat: 'sci',
    },
  },
  {
    id: 'ghost', name: 'The Late', emoji: '👻', noun: 'Departed',
    desc: 'Technically, everyone is dead. Practically, nothing has changed except the paperwork and the lighting.',
    perTurn: { faith: 2, pop: -1 },
    finale: {
      name: 'The Haunting', pitch: 'You cannot kill what is already filed as deceased.',
      win: 'The aliens land and are immediately haunted. Doors slam. Lights flicker. Grandma rearranges their weapons. They leave without unpacking.',
      lose: 'The aliens have ghost-hunting equipment. They have had it for a very long time.',
      stat: 'faith',
    },
  },
  {
    id: 'tower', name: 'The Building', emoji: '🏢', noun: 'Tenants',
    desc: 'The whole nation lives inside one building. It has weather on floor 6,000 and a lift that takes a generation.',
    perTurn: { gold: 2, food: -1 },
    finale: {
      name: 'Lock the Front Door', pitch: 'There is one door. We have locked it.',
      win: 'The aliens surround the building. They cannot find the buzzer. Nobody inside answers the intercom. The siege is called off due to boredom.',
      lose: 'The aliens find the buzzer. Someone on floor 2 buzzes them in without asking. Someone always does.',
      stat: 'mil',
    },
  },
  {
    id: 'catmech', name: 'The Purrcussion', emoji: '🐆', noun: 'Cat-Knights',
    desc: 'Every citizen is fused with a cybernetic war-cat. They are unstoppable from dawn to dusk and asleep otherwise.',
    perTurn: { mil: 2, food: -1 },
    finale: {
      name: 'The Pounce', pitch: 'Wait until they are at the red dot. Then go.',
      win: 'A single laser pointer lures the fleet\'s landing party into a field. Ten million cat-knights pounce at once. It is over in seconds, then everyone naps.',
      lose: 'The aliens arrive at 2 p.m. Every cat-knight is asleep in a sunbeam.',
      stat: 'mil',
    },
  },
  {
    id: 'dream', name: 'The Dreamt', emoji: '💤', noun: 'Dreamers',
    desc: 'The civilisation lives inside the dream of a sleeping god. Reality is optional. Tuesdays are purple.',
    perTurn: { joy: 2, gold: -1 },
    finale: {
      name: 'Do Not Wake It', pitch: 'The aliens cannot invade a dream. They can only have one.',
      win: 'The aliens land and fall asleep within the hour. They dream of you. In the dream, they apologise and leave.',
      lose: 'The aliens bring an alarm clock. The god wakes up, yawns, and you all briefly stop existing.',
      stat: 'joy',
    },
  },
  {
    id: 'loop', name: 'The Recurrents', emoji: '🔁', noun: 'Recurrents',
    desc: 'The civilisation lives inside a perfect loop of its best century. Everyone knows how the jokes end.',
    perTurn: { sci: 1, joy: 1 },
    finale: {
      name: 'One More Time', pitch: 'We have lost this invasion 4,000 times. We know every move now.',
      win: 'On loop 4,001, you dodge every shot, take every ship, and greet the admiral by her first name. She is very unsettled.',
      lose: 'The aliens also loop. It has been going on for longer than you can count. Neither side remembers why.',
      stat: 'sci',
    },
  },
  {
    id: 'mural', name: 'The Painted', emoji: '🖼️', noun: 'Painted',
    desc: 'The nation stepped into a great mural. Food is still life. War is a landscape. The frame is lovely.',
    perTurn: { joy: 2, pop: -1 },
    finale: {
      name: 'Just a Nice Picture', pitch: 'There is no civilisation here. Just a very nice picture.',
      win: 'The aliens find an empty planet and a mural. They hang it in their flagship. Slowly, from inside the frame, you take over the flagship.',
      lose: 'The aliens are not art people. They paint over you with something beige.',
      stat: 'joy',
    },
  },
  {
    id: 'drift', name: 'The Sky-Drifters', emoji: '🎈', noun: 'Drifters',
    desc: 'The whole nation lives in balloon cities that drift on the wind. The ground is for emergencies and funerals.',
    perTurn: { joy: 1, sci: 1 },
    finale: {
      name: 'Catch the Jet Stream', pitch: 'They can only invade what holds still.',
      win: 'The fleet chases your cities through the clouds for nine years. They never catch up. They run out of fuel over an ocean.',
      lose: 'The aliens have a very large pin.',
      stat: 'sci',
    },
  },
  {
    id: 'inc', name: 'The Incorporated', emoji: '💼', noun: 'Shareholders',
    desc: 'The nation is now a single legal entity. Citizens are shareholders. The flag is a logo.',
    perTurn: { gold: 2, joy: -1 },
    finale: {
      name: 'Hostile Takeover', pitch: 'We do not fight the fleet. We buy it.',
      win: 'You buy a controlling stake in the alien empire through a shell company on a moon. The invasion is restructured into a branch office.',
      lose: 'The aliens were never a fleet. They were private equity. You have been acquired and stripped for parts.',
      stat: 'gold',
    },
  },
  {
    id: 'wee', name: 'The Wee Folk', emoji: '🔬', noun: 'Wee Folk',
    desc: 'The whole nation shrank to the size of a grain of rice. A single apple feeds a district for a year.',
    perTurn: { food: 2, mil: -1 },
    finale: {
      name: 'Too Small to Notice', pitch: 'They are scanning for a civilisation. We are crumbs.',
      win: 'The aliens scan the planet and find nothing bigger than a beetle. They leave. Something tiny is riding in every air vent of the flagship.',
      lose: 'One of the aliens sneezes. It was not personal. It was just very, very big.',
      stat: 'pop',
    },
  },
  {
    id: 'belly', name: 'The Swallowed', emoji: '🐸', noun: 'Insiders',
    desc: 'The nation lives inside a colossal creature. It is warm, dark, and the acoustics are incredible.',
    perTurn: { food: 1, faith: 1 },
    finale: {
      name: 'It Has a Big Mouth', pitch: 'Let them come close. Our host is still a bit hungry.',
      win: 'The fleet lands directly in front of a very large mouth. It is the last decision the fleet makes. Your host burps, and the sky lights up.',
      lose: 'The aliens bring treats. Your host rolls over. It was never really on your side.',
      stat: 'faith',
    },
  },
];
