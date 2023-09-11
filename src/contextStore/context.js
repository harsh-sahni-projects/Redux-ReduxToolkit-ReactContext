import { createContext } from "react";

const contextSkeleton = {
  score: 0,
  highScore: 0,
  incrementScore: () => {},
  setHighScore: () => {},
};

const Context = createContext(contextSkeleton);

export default Context;
