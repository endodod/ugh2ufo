import type { CardDef } from '../../types';
import { storylineCards } from './storylines';
import { historyCards } from './history';
import { rivalCards } from './rivals';
import { alienCards } from './aliens';
import { decisionCards } from './decisions';
import { standaloneCards } from './standalone';
import { natureCards } from './nature';
import { societyCards } from './society';
import { economyCards } from './economy';
import { promiseCards } from './promises';

export const extraCards: CardDef[] = [
  ...storylineCards,
  ...historyCards,
  ...rivalCards,
  ...alienCards,
  ...decisionCards,
  ...standaloneCards,
  ...natureCards,
  ...societyCards,
  ...economyCards,
  ...promiseCards,
];
