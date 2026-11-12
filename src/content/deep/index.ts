import type { CardDef } from '../../types';
import { pathCards } from './paths';
import { synergyCards } from './synergies';
import { decisionCards } from './decisions';
import { eventCards } from './events';

export { forms } from './forms';
export { headlines } from './headlines';

export const deepCards: CardDef[] = [...pathCards, ...synergyCards, ...decisionCards, ...eventCards];
