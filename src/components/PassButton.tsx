import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { pass } from "@/slices/gameSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/slices";
import { getDefender } from "@/Utils/utils";
import { areAllCardsBeaten } from "@/Utils/utils";

const PassButton: FC<{ playerId: string }> = ({ playerId }) => {
    const state = useSelector((state: RootState) => state.gameSlice);
    const defendingPlayer = getDefender(state);
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(pass(playerId))
    }
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        setDisabled(!areAllCardsBeaten(state));
    });
    return (<>
        {defendingPlayer.playerId === playerId ? null :
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
