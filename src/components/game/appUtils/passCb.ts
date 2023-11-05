import store from '@/slices/index';
import * as gameActions from '@/slices/gameSlice';

const passCb = (playerId: string) => {
    store.dispatch(gameActions.pass(playerId));
}

export default passCb;
