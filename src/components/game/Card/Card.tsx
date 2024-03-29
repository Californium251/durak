import React, {FC, useEffect, useState, useRef} from "react";
import {Sprite, useTick} from "@pixi/react";
import {CardType} from "@/utils/Types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/slices";
import {getCardCoors, setCardPosition as setCardPos} from "@/slices/uiSlice"
import "@pixi/events";
import {onDragEnd, onDragMove, onDragStart} from "@/components/game/Card/dragAndDrop/events";


const Card: FC<{
    card: CardType;
    i?: number;
    playerId?: string;
    transport?: any;
}> = ({card, playerId, transport}) => {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.gameSlice.data);
    const gameId = useSelector((state: RootState) => state.gameSlice._id);
    const stageSettings = {
        width: window.innerWidth,
        height:
        window.innerHeight,
    };

    useEffect(() => {
        const handleResize = () => {
            dispatch(getCardCoors({
                game, card, playerId: playerId || '', stageSettings,
            }));
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerHeight, window.innerWidth]);
    useEffect(() => {
        dispatch(getCardCoors({game, card, playerId: playerId || '', stageSettings}))
    }, [card, dispatch, game, playerId, window.innerHeight, window.innerWidth]);

    if (!card) throw new Error('No card passed to Card component');
    const uiState = useSelector((state: RootState) => state.uiSlice.cards);
    const cardCoors = uiState[`${card.suit}-${card.rank}`];
    useEffect(() => {
        dispatch(getCardCoors({
            game, card, playerId: playerId || '', stageSettings,
        }))
    }, [card, dispatch, game, playerId, window.innerHeight, window.innerWidth]);
    const table = useSelector((state: RootState) => state.uiSlice.tableSettings);// Вот это конечно нужно переписать, чтобы данные о размере стола находились в состоянии
    const [cardPosition, setCardPosition] = useState({x: 0, y: 0, zIndex: 0})
    const [isInteractive, setIsInteractive] = useState<boolean>(true);
    const [icp, setIcp] = useState(cardPosition);
    const setCardCoorsInReduxAndLocal = (card: CardType) => (x: number, y: number, zIndex: number) => {
        dispatch(setCardPos({card, x, y, zIndex}));
        setCardPosition({x, y, zIndex})
    };

    const dndParams = {
        cardCoors, table, gameState: game, gameId,
        playerId, card, uiState, transport, setCardPosition: setCardCoorsInReduxAndLocal(card),
        initialCardPosition: icp,
    };

    const dnd = !playerId ? null : {
        onpointerdown: onDragStart(dndParams),
        onpointerleave: onDragEnd(dndParams),
        onpointerup: onDragEnd(dndParams),
        onpointermove: onDragMove(dndParams),
    }

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current && cardCoors) {
            setCardPosition({...cardCoors, x: cardCoors.x, y: cardCoors.y});
            setIcp({...cardCoors, x: cardCoors.x, y: cardCoors.y});
            firstRender.current = false;
        }
    }, [cardCoors]);
    useTick((delta) => {
        if (cardCoors.x !== cardPosition.x || cardCoors.y !== cardPosition.y) {
            setIsInteractive(false);
            const dx = cardCoors.x - cardPosition.x;
            const dy = cardCoors.y - cardPosition.y;
            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
                setCardPosition({...cardCoors, x: cardCoors.x, y: cardCoors.y});
                setIcp(cardPosition);
                setIsInteractive(true);
            } else {
                setCardPosition({
                    ...cardCoors,
                    x: cardPosition.x + delta * 0.05 * dx,
                    y: cardPosition.y + delta * 0.05 * dy,
                });
            }
        }
    })
    if (cardCoors) {
        const {x, y, shown, angle, zIndex, width, height} = cardCoors;
        return (
            <Sprite
                image={
                    shown
                        ? `/cards/${card?.suit}-${card?.rank}.svg`
                        : "/deck.svg"
                }
                width={width}
                height={height}
                x={cardPosition.x}
                y={cardPosition.y}
                zIndex={zIndex}
                angle={cardCoors?.angle || 0}
                anchor={{x: 0.5, y: 0.5}}
                interactive={isInteractive}
                {...dnd}
            />
        );
    }
};

export default Card;
