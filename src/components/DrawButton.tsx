import { FC } from "react";
import { useDispatch } from "react-redux";
import { pickUp } from "@/slices/gameSlice";

const DrawButton: FC<{ playerId?: string }> = ({ playerId }) => {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(pickUp());
    }
    return (
        <button style={{
            width: '250px',
            height: '100px',
        }}
            onClick={onClick}
        >
            Взять
        </button>
    )
};

export default DrawButton;
