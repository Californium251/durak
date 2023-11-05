import store from '@/slices/index';
import * as gameActions from '@/slices/gameSlice';
import { CardType } from '@/utils/Types';

const addCardCb = (data: { card: CardType, playerId: string }) => {
    const { playerId, card } = data;
    store.dispatch(gameActions.addCard({ card, playerId }))
}

export default addCardCb;
