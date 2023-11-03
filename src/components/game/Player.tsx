'use client'
import { FC, SetStateAction, Dispatch, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/index";
import PassButton from "./PassButton";
import PickUpButton from "./PickUpButton";
import store from "../../slices/index";
import { CardType, CardBufferType } from "../../utils/Types";
import useApi from "../../hooks/useApi";

export type PlayerType = {
    playerId: string,
    cards: CardType[],
    activePlayer?: boolean,
}

const getAngleInc = (n: number) => {
    let res = 0;
    for (let i = 1; i <= n; i += 1) {
        res += 1/i;
    }
    return res;
};

const Player: FC<{ 
    playerId: string, 
    cardBuffer: CardBufferType, 
    setCardBuffer: Dispatch<SetStateAction<CardBufferType>> 
}> = ({ playerId, cardBuffer, setCardBuffer }) => {
    const { addCard } = useApi();
    const player: PlayerType = useSelector((state: RootState) => state.gameSlice.players.find((p) => p.playerId === playerId)) as PlayerType;
    const activePlayerId = useSelector((state: RootState) => state.gameSlice.activePlayerId);
    const defender = useSelector((state: RootState) => {
        const activeIndex = state.gameSlice.players.findIndex((p) => p.playerId === activePlayerId);
        if (activeIndex + 1 === state.gameSlice.players.length) {
            return state.gameSlice.players[0];
        }
        return state.gameSlice.players[activeIndex + 1];
    });
    const onClick = (card: CardType) => () => {
        
        if (playerId === defender.playerId) {
            setCardBuffer({ playerId, card });
        } else {
            addCard(playerId, card);
        }
    };
    const [cardHover, setCardHover] = useState<CardType>(null);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexWrap: 'nowrap',
                border: `${playerId === activePlayerId
                    ? '1px solid black'
                    : playerId === defender.playerId
                        ? '1px solid red'
                        : 'none'}`,
                height: '230px',
                width: '400px',
                marginTop: '30px',
            }}
        ><div
            style={{
                position: 'relative',
                width: '300px',
            }}
            onMouseLeave={() => setCardHover(null)}
        >{
            player.cards.map((c, i, arr) => {
                const n = arr.length;
                const alphaMax = getAngleInc(n)*180/Math.PI;
                const r = 600;
                const dr = 10;
                const alphaI = (i: number) => alphaMax*(2*i-n+1)/(2*n)/3;
                const top = r/8*(1-Math.cos(alphaI(i)*Math.PI/180));
                const left = r*Math.sin(alphaI(i)/2*Math.PI/180);
                const dTop = dr*Math.cos(alphaI(i)*Math.PI/180);
                const dLeft = dr*Math.sin(alphaI(i)*Math.PI/180);
                return <Card
                    key={i}
                    suit={c ? c.suit : ''}
                    rank={c ? c.rank : ''}
                    onClick={onClick(c)}
                    style={{
                        position: 'absolute',
                        top: c === cardHover ? `${top - dTop}px` : `${top}px`,
                        left: c === cardHover ? `${left + dLeft + 100}px` : `${left + 100}px`,
                        transform: `rotate(${alphaI(i)}deg`,
                    }}
                    OnMouseEnter={() => setCardHover(c)}
                />})
        }</div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <PassButton playerId={playerId} />
            <PickUpButton playerId={playerId} />
        </div>
        </div>
    )
}

export default Player;
