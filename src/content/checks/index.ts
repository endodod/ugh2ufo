import type { CardDef } from '../../types';
import { capabilityCards } from './capabilities';
import { expeditionCards } from './expeditions';
import { capabilityEvents } from './events';
import { confrontationCards } from './rivals';
import { gambleCards } from './gambles';

export const checkCards: CardDef[] = [...capabilityCards, ...expeditionCards, ...capabilityEvents, ...confrontationCards, ...gambleCards];
