import type { CardDef } from '../../types';
import { landCards } from './cards_land';
import { beliefCards } from './cards_belief';
import { customCards } from './cards_custom';
import { founderCards } from './cards_founder';
import { comboCards } from './cards_combo';

export { origins } from './origins';

export const originCards: CardDef[] = [...landCards, ...beliefCards, ...customCards, ...founderCards, ...comboCards];
