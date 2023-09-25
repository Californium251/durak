import { FC } from "react";
import Card from "./Card";

const Board: FC = () => {
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#129912',
        }}>
            <Card suit="hearts" rank="seven" />
            <Card suit="clubs" rank="ten" />
            <Card suit="spades" rank="jack" />
            <Card suit="diamonds" rank="ace" />
        </div>
    )
}

export default Board;
