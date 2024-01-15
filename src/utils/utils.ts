import { CardType, GameDataType, PlayerType } from "../../src/utils/Types";
import Card from "../components/game/Card";

export const getDefender = (gameState: GameDataType) => {
  const { players, attackerId, cards } = gameState;
  const attackerIndex = players.findIndex(
    (player) => player.user._id === attackerId
  );
  let i = 1;
  while (
    players[(attackerIndex + i) % players.length].cards.length === 0 &&
    cards.length === 0
  ) {
    i++;
  }
  return players[(attackerIndex + i) % players.length];
};

const getAngleInc = (n: number) => {
  let res = 0;
  for (let i = 1; i <= n; i += 1) {
    res += 1 / i;
  }
  return res;
};

export const createFanOfCards = (i: number, arr: CardType[]) => {
  const n = arr.length;
  const alphaMax = (getAngleInc(n) * 180) / Math.PI;
  const r = 600;
  const dr = 10;
  const alphaI = (i: number | undefined) => {
    if (i === undefined) return 0;
    return (alphaMax * (2 * i - n + 1)) / (2 * n) / 3;
  }
  const top = (r / 8) * (1 - Math.cos((alphaI(i) * Math.PI) / 180));
  const left = r * Math.sin(((alphaI(i) / 2) * Math.PI) / 180);
  const dTop = dr * Math.cos((alphaI(i) * Math.PI) / 180);
  const dLeft = dr * Math.sin((alphaI(i) * Math.PI) / 180);
  return {
    top,
    left,
    alphaI,
    dTop,
    dLeft,
  };
};

export function isInside(object1: any, object2: any) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();
  
    return (
      bounds1.x > bounds2.x &&
      bounds1.y > bounds2.y &&
      bounds1.x + bounds1.width < bounds2.x + bounds2.width &&
      bounds1.y + bounds1.height < bounds2.y + bounds2.height
    );
  }
