'use client'
import App from '@/components/App';
import { ReduxProvider } from '@/slices/reduxProvider';
import { ApiProvider } from '@/context/ApiContext';
import * as gameActions from '@/slices/gameSlice';
import store from '@/slices/index';
import { CardType } from '@/utils/Types';
import Transport from '@/utils/Transport';
import { socket } from '@/utils/socket'

const passCb = (playerId: string) => {
  store.dispatch(gameActions.pass(playerId));
}
const addCardCb = (data: { card: CardType, playerId: string}) => {
  const { playerId, card } = data;
  store.dispatch(gameActions.addCard({ card, playerId }))
}
const pickUpCb = () => {
  store.dispatch(gameActions.pickUp());
}
const beatCb = ({ card1, card2 }: { card1: CardType, card2: CardType }) => {
  store.dispatch(gameActions.beat({ card1, card2 }));
}

socket.on('pass', passCb);
socket.on('addCard', addCardCb);
socket.on('pickUp', pickUpCb);
socket.on('beat', beatCb);
const transport = new Transport(socket)

function Home() {
  console.log(socket);
  return (
    <ReduxProvider>
      <ApiProvider transport={transport}>
        <App />
      </ApiProvider>
    </ReduxProvider>
  )
}

export default Home;
