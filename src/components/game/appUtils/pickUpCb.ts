import store from '@/slices/index';
import * as gameActions from '@/slices/gameSlice';

const pickUpCb = () => {
    store.dispatch(gameActions.pickUp());
}

export default pickUpCb;
