import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/slices";
import { getDefender } from "@/utils/utils";
import { areAllCardsBeaten } from "@/utils/utils";
import useApi from "@/hooks/useApi";

const PassButton: FC<{ playerId: string }> = ({ playerId }) => {
    const { pass } = useApi();
    const state = useSelector((state: RootState) => state.gameSlice);
    const defender = getDefender(state);
    const onClick = () => {
        console.log('pass')
        pass(playerId);
    }
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        setDisabled(!areAllCardsBeaten(state));
    });
    return (<>
        {defender.playerId === playerId ? null :
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
