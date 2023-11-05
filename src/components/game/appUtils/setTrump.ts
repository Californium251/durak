import { CardType } from '@/utils/Types';

const setTrump: (cards: Array<CardType>) => CardType = (cards) => cards.shift() as CardType;

export default setTrump;
