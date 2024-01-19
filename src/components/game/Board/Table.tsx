import { Container, Graphics, Sprite } from "@pixi/react";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTable,
  setCardPairsAnchorPoints,
  positionCardsOnTable,
} from "@/slices/uiSlice";
import { RootState } from "@/slices";
import Card from "./Card/Card";

const NewTable = () => {
  const cardsOnTable = useSelector(
    (state: RootState) => state.gameSlice.data.table
  );
  const tableAnchorPoints = useSelector(
    (state: RootState) => state.uiSlice.tableAnchorPoints
  );
  const dispatch = useDispatch();
  const initialTableSettings = {
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.8,
    x: window.innerWidth * 0.1,
    y: window.innerHeight * 0.1,
  };
  useEffect(() => {
    dispatch(setTable(initialTableSettings));
  }, [window.innerWidth, window.innerHeight]);
  const tableSettings = useSelector(
    (state: RootState) => state.uiSlice.tableSettings
  );
  useEffect(() => {
    dispatch(
      setCardPairsAnchorPoints({
        cardPairs: cardsOnTable,
        tableWidth: tableSettings.width,
        tableHeight: tableSettings.height,
      })
    );
    dispatch(positionCardsOnTable(cardsOnTable));
  }, [tableSettings]);
  const rect = useCallback(
    (g) => {
      if (!tableSettings) return;
      const { width, height, x, y } = tableSettings;
      g.clear();
      g.beginFill(0x009900);
      g.drawRect(x, y, width, height);
      g.endFill();
    },
    [window.innerWidth, window.innerHeight, tableSettings]
  );

  return (
    <>
      <Graphics draw={rect} />
      {tableAnchorPoints.map(({ width, height, x, y }, i) => {
        return (
          <Container key={i} position={[x, y]} width={width} height={height}>
            <Sprite
              image="/cards/clubs-ace.svg"
              width={100}
              height={150}
              x={10}
              y={10}
            />
            {/* {cardsOnTable[i].map((card, j) => {
              return <Card card={card} key={j} />;
            })} */}
          </Container>
        );
      })}
    </>
  );
};

export default NewTable;
