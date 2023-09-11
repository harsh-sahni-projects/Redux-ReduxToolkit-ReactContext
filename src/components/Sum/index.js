import { useContext, useRef, useState, useEffect } from "react";
import Timer from "../Timer/index";
import Context from "../../contextStore/context";
import "./sum.css";

const Sum = () => {
  const ctx = useContext(Context);
  const { score, resetScore, highScore, incrementScore, decrementScore } = ctx;
  const sumInput = useRef();
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [startNewGame, setStartNewGame] = useState(false);
  const [inputClass, setInputClass] = useState("");

  const [val1, setVal1] = useState("?");
  const [val2, setVal2] = useState("?");

  const setNewValues = () => {
    setVal1(getRandomValue());
    setVal2(getRandomValue());
  };

  const submit = (e) => {
    if (e.key !== "Enter") return;

    let val = Number(e.target.value);
    let sum = val1 + val2;

    if (val !== "NaN" && val === sum) {
      incrementScore();
      setInputClass(" scoreUpAnimate");
      setTimeout(() => {
        setInputClass("");
      }, 200);
    } else {
      decrementScore();
      setInputClass(" scoreDownAnimate");
      setTimeout(() => {
        setInputClass("");
      }, 200);
    }

    e.target.value = "";
    setNewValues();
  };

  useEffect(() => {
    // setNewValues();
  }, []);

  const startGame = () => {
    setStartNewGame(true);
    setNewValues();
    resetScore();
    setInputClass("animateInput");
    setTimeout(() => {
      sumInput.current.value = "";
      sumInput.current.focus();
    }, 0);
    setTimeout(() => {
      setInputClass("");
    }, 1000);
  };

  function getRandomValue() {
    let between1and3 = Math.floor(Math.random() * 10) % 2;
    let val = Math.random() * [1, 10][between1and3];
    val = Math.floor(val);
    if (val === 0) return getRandomValue();
    return val;
  }

  return (
    <div className="container">
      <h1>Sum</h1>
      <div className="pannel">
        <div className="pannel-left">
          <Timer
            startNewGame={startNewGame}
            setStartNewGame={setStartNewGame}
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
          />
        </div>
        <div className="pannel-right">
          <section className="gameSection">
            <div className="scoreContainer">
              <div className="currentScore">
                Your Score: &emsp; <b>{score}</b>
              </div>
              <div className="highScore">
                Highest Score: &emsp; <b>{highScore}</b>
              </div>
            </div>
            <div className="main">
              <span>{val1}</span>
              <span>+</span>
              <span>{val2}</span>
              <span>=</span>
              <input
                type="text"
                ref={sumInput}
                onKeyDown={submit}
                disabled={!isTimerRunning}
                placeholder="Enter sum"
                className={inputClass}
              />
            </div>
          </section>
          <section className="buttonSection">
            {!isTimerRunning && (
              <button className="startBtn" onClick={startGame}>
                New Game
              </button>
            )}
            {isTimerRunning && <button className="resetBtn">Stop</button>}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sum;
