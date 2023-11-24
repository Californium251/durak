import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/index";
import useApi from "../../hooks/useApi";

const PickUpButton: FC<{ playerId?: string }> = ({ playerId }) => {
    const { pickUp } = useApi();
    const gameId = useSelector((state: RootState) => state.gameSlice._id);
    const isTableEmpty = useSelector((state: RootState) => state.gameSlice.data.table.length === 0);
    const { table } = useSelector((state: RootState) => state.gameSlice.data);
    const [disabled, setDisabled] = useState(true);
    const areAllCardsBeaten = table.map((cardPair) => cardPair[1]).every((card) => !!card);
    useEffect(() => {
        setDisabled(areAllCardsBeaten || isTableEmpty);
    });
    const onClick = () => {
        pickUp(gameId as string, playerId as string);
    };
    return (<button disabled={disabled} style={{
        width: '180px',
        height: '60px',
    }}
        onClick={onClick}
    >
        Взять
    </button>)
};

export default PickUpButton;
