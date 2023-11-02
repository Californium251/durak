import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDefender } from "../utils/TestName";
import { RootState } from "../slices/index";
import useApi from "../hooks/useApi";
import { areAllCardsBeaten } from "../utils/TestName";

const PickUpButton: FC<{ playerId?: string }> = ({ playerId }) => {
    const { pickUp } = useApi();
    const state = useSelector((state: RootState) => state.gameSlice);
    const defender = getDefender(state);
    const isTableEmpty = useSelector((state: RootState) => state.gameSlice.table.length === 0);
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        setDisabled(areAllCardsBeaten(state) || isTableEmpty);
    })
    const onClick = () => {
        pickUp();
    };
    return (<>
        {playerId === defender.playerId
        ? <button disabled={disabled} style={{
            width: '180px',
            height: '60px',
        }}
            onClick={onClick}
        >
            Взять
        </button> : null}</>
    )
};

export default PickUpButton;
