import { FC } from "react";
import { useDispatch } from "react-redux";
import { pass } from "@/slices/gameSlice";

const PassButton: FC<{ playerId: string }> = ({ playerId }) => {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(pass(playerId))
    }
    return (
        <button style={{
            width: '250px',
            height: '100px',
        }} onClick={onClick}>Бито</button>
    )
};

export default PassButton;
