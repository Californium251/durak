import store from '@/slices/index';
import * as gameActions from '@/slices/gameSlice';
import { CardType } from '@/utils/Types';

const beatCb = ({ card1, card2 }: { card1: CardType, card2: CardType }) => {
    store.dispatch(gameActions.beat({ card1, card2 }));
}

export default beatCb;
