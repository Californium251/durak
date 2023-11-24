import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/index";
import useApi from "../../hooks/useApi";

const PassButton: FC<{ playerId: string }> = ({ playerId }) => {
    const { pass } = useApi();
    const gameId = useSelector((state: RootState) => state.gameSlice._id);
    const { table } = useSelector((state: RootState) => state.gameSlice.data);
    const defender = useSelector((state: RootState) => {
        const attackerIndex = state.gameSlice.data.players.findIndex((p) => p.user._id === state.gameSlice.data.attackerId);
        return state.gameSlice.data.players[(attackerIndex + 1) % state.gameSlice.data.players.length];
    });
    const areAllCardsBeaten = useSelector((state: RootState) => table.length === 0 ? false : table.reduce((acc, cardPair) => {
        if (cardPair[1]) {
            return true;
        }
        return acc;
    }, false));
    useEffect(() => {
        setDisabled(!areAllCardsBeaten);
    }, [table]);
    const onClick = () => {
        pass(gameId, playerId);
    }
    const [disabled, setDisabled] = useState(true);
    return (<>
        {defender.user._id === playerId ? null :
            <button
                style={{
                    width: '180px',
                    height: '60px',
                }}
                onClick={onClick}
                disabled={disabled}
            >Бито</button>
        }
    </>
    )
};

export default PassButton;
