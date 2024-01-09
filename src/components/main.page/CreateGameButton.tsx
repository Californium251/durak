import React, { FC, useState, useMemo } from "react";
import Link from "next/link";
import "./create-game-button.css";

const CreateGameButton: FC = () => {
  const [hover, setHover] = useState<boolean>(false);
  const getTranslate = useMemo(() => {
    const dl = 50;
    const alpha = -8;
    const translateOnHover = hover
      ? `translateY(${-dl * Math.cos((alpha * Math.PI) / 180)}px) translateX(${
          dl * Math.sin((alpha * Math.PI) / 180)
        }px)`
      : "translateY(0) translateX(0)";
    return `rotate(${alpha}deg) ${translateOnHover}`;
  }, [hover]);
  return (
    <Link
      className="create-game-button"
      style={{ transform: getTranslate }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      href="/create-game"
    >
      <p className="button-text">Create game</p>
    </Link>
  );
};

const createGameButtonMemo = React.memo(CreateGameButton);

export default createGameButtonMemo;
