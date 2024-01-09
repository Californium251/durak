import { CardType } from "@/utils/Types";
import {
  DOMElement,
  FC,
  PropsWithChildren,
  ReactElement,
  createContext,
} from "react";

const AnimationContext = createContext({
  getStartPosition: (playerId: string) => {},
});

export default AnimationContext;

export const AnimationProvider: FC<PropsWithChildren> = ({ children }) => {
  const getStartPosition = (playerId: string) => {
    return document.querySelector(`#${playerId}`)?.getBoundingClientRect();
  };
  return (
    <AnimationContext.Provider value={{ getStartPosition }}>
      {children}
    </AnimationContext.Provider>
  );
};
