import { useReducer } from "react";
import Context from "./context";

const reducer = (state, action) => {
  if (action.type === "INCREMENT") {
    const newScore = state.score + 1;
    const oldHighScore = state.highScore;
    return {
      score: newScore,
      highScore: newScore > oldHighScore ? newScore : oldHighScore,
    };
  } else if (action.type === "DECREMENT") {
    return {
      ...state,
      score: state.score == 0 ? state.score : state.score - 1,
    };
  } else if (action.type === "RESET_SCORE") {
    return {
      ...state,
      score: 0,
    };
  }

  return state;
};

const initialState = {
  score: 0,
  highScore: 0,
};

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const incrementScore = () => {
    dispatch({ type: "INCREMENT" });
  };

  const resetScore = () => {
    dispatch({ type: "RESET_SCORE" });
  };

  const decrementScore = () => {
    dispatch({ type: "DECREMENT" });
  };

  const context = {
    score: state.score,
    highScore: state.highScore,
    incrementScore: incrementScore,
    resetScore: resetScore,
    decrementScore: decrementScore,
  };
  console.log(context);

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default ContextProvider;
