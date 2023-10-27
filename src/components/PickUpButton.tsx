import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pickUp } from "@/slices/gameSlice";
import { getDefender } from "@/Utils/utils";
import { RootState } from "@/slices";

const PickUpButton: FC<{ playerId?: string }> = ({ playerId }) => {
    const state = useSelector((state: RootState) => state.gameSlice);
    const defendingPlayer = getDefender(state);
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(pickUp());
    };
    return (<>
        {playerId === defendingPlayer.playerId
        ? <button style={{
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
