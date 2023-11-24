'use client'
import { FC, SetStateAction, Dispatch, useState, useEffect, use } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/index";
import PassButton from "./PassButton";
import PickUpButton from "./PickUpButton";
import { CardType, CardBufferType } from "../../utils/Types";
import useApi from "../../hooks/useApi";
import { PlayerType } from "../../utils/Types";

const getAngleInc = (n: number) => {
    let res = 0;
    for (let i = 1; i <= n; i += 1) {
        res += 1 / i;
    }
    return res;
};


const Player: FC<{
    playerId: string,
    setCardBuffer: Dispatch<SetStateAction<CardBufferType>>
}> = ({ playerId, setCardBuffer }) => {
    const { addCard } = useApi();
    const gameId = useSelector((state: RootState) => state.gameSlice._id);
    const { players, attackerId, playersPassed } = useSelector((state: RootState) => state.gameSlice.data);
    const player: PlayerType = players.find((p) => p.user._id === playerId) as PlayerType;
    const defender = players[(players.findIndex((p) => p.user._id === attackerId) + 1) % players.length];
    const onClick = (card: CardType) => () => {
        if (playerId === defender.user._id) {
            setCardBuffer({ playerId, card });
        } else {
            addCard(gameId, playerId, card)
        }
    };
    const playersName = players.find((p) => p.user._id === playerId)?.user.email;
    const [cardHover, setCardHover] = useState<CardType>(null);
    const passAllowed = useSelector((state: RootState) => {
        if (playerId === defender.user._id) {
            return false;
        }
        if (playerId === attackerId && playersPassed.includes(attackerId as string)) {
            return false;
        }
        if (playerId === attackerId) {
            return true;
        }
        if (playerId !== attackerId && playersPassed.includes(attackerId as string)) {
            return true;
        }
        return false;
    });
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexWrap: 'nowrap',
                border: `${playerId === attackerId
                    ? '1px solid black'
                    : playerId === defender.user._id
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
                        const alphaMax = getAngleInc(n) * 180 / Math.PI;
                        const r = 600;
                        const dr = 10;
                        const alphaI = (i: number) => alphaMax * (2 * i - n + 1) / (2 * n) / 3;
                        const top = r / 8 * (1 - Math.cos(alphaI(i) * Math.PI / 180));
                        const left = r * Math.sin(alphaI(i) / 2 * Math.PI / 180);
                        const dTop = dr * Math.cos(alphaI(i) * Math.PI / 180);
                        const dLeft = dr * Math.sin(alphaI(i) * Math.PI / 180);
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
                            onMouseEnter={() => setCardHover(c)}
                        />
                    })
                }</div>
            <div style={{
                display: 'row',
                flexDirection: 'column',
            }}>
                {passAllowed && <PassButton playerId={playerId} />}
                {playerId === defender.user._id && <PickUpButton playerId={playerId} />}
                <div style={{
                    paddingBottom: '10px',
                }}>
                    {playersName}
                </div>
            </div>
        </div>
    )
}

export default Player;
