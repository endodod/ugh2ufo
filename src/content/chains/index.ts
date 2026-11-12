import type { CardDef } from '../../types';
import { followupCards } from './followups';
import { rivalFollowups } from './followups_rivals';
import { chainCards1 } from './chains';
import { chainCards2 } from './chains2';
import { chainCards3 } from './chains3';
import { rivalRelationCards } from './rivals';
import { ageCardsEarly } from './ages';
import { ageCardsFuture } from './ages_future';

export { chainHeadlines } from './headlines';

export const chainCards: CardDef[] = [
  ...followupCards,
  ...rivalFollowups,
  ...chainCards1,
  ...chainCards2,
  ...chainCards3,
  ...rivalRelationCards,
  ...ageCardsEarly,
  ...ageCardsFuture,
];
