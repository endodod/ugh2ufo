import type { CardDef, CivForm, Headline, OriginDef } from '../types';
import { decisionCards } from './base/decisions';
import { pathCards } from './base/paths';
import { eventCards } from './base/events';
import { baseHeadlines } from './base/headlines';
import { extraCards } from './extra';
import { originCards, origins as originList } from './origins';
import { checkCards } from './checks';
import { chainCards, chainHeadlines } from './chains';
import { megaCards } from './megaprojects';
import { deepCards, forms as deepForms, headlines as deepHeadlines } from './deep';

export const cards: CardDef[] = [...decisionCards, ...pathCards, ...eventCards, ...extraCards, ...originCards, ...deepCards, ...checkCards, ...chainCards, ...megaCards];

export const origins: OriginDef[] = originList;

export const forms: CivForm[] = deepForms;

export const headlines: Headline[] = [...baseHeadlines, ...deepHeadlines, ...chainHeadlines];
