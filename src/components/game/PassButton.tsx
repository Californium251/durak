import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../slices/index";
import useApi from "../../hooks/useApi";
import { getDefender } from "../../utils/utils";

const PassButton: FC<{ playerId: string; disabled: boolean }> = ({
  playerId,
  disabled,
}) => {
  const { pass } = useApi();
  const gameId = useSelector((state: RootState) => state.gameSlice._id);
  const { table } = useSelector((state: RootState) => state.gameSlice.data);
  const defender = useSelector((state: RootState) => {
    return getDefender(state.gameSlice.data);
  });
  const areAllCardsBeaten = useSelector(() =>
    table.length === 0
      ? false
      : table.reduce((acc, cardPair) => {
          if (!cardPair[1]) {
            return false; // Перести эту функцию в utils
          }
          return acc;
        }, true)
  );
  const onClick = () => {
    pass(gameId, playerId);
  };
  return (
    <>
      {defender.user._id === playerId ? null : (
        <button
          style={{
            width: "180px",
            height: "60px",
          }}
          onClick={onClick}
          disabled={disabled}
        >
          Бито
        </button>
      )}
    </>
  );
};

export default PassButton;
