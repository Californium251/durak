import { FC } from "react";
import { useDispatch } from "react-redux";
import { endTurn } from "@/slices/gameSlice";

const PassButton: FC<{ playerId: string }> = ({ playerId }) => {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(endTurn(playerId))
    }
    return (
        <button style={{
            width: '250px',
            height: '100px',
        }} onClick={onClick}>Бито</button>
    )
};

export default PassButton;
