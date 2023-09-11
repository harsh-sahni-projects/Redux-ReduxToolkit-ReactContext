import { useEffect, useState } from "react";

const GAME_TIMER = 40; //sec

const Timer = (props) => {
  const { startNewGame, setStartNewGame, isTimerRunning, setIsTimerRunning } =
    props;
  const [remainigSec, setRemainingSec] = useState(GAME_TIMER);

  function updateTime() {
    if (isTimerRunning) {
      if (remainigSec > 0) setRemainingSec((sec) => sec - 1);
      else setIsTimerRunning(false);
    }
  }

  useEffect(() => {
    console.log("Timer : ", startNewGame);
    if (startNewGame) {
      setRemainingSec(GAME_TIMER);
      setIsTimerRunning(true);
      setStartNewGame(false);
    }
  }, [startNewGame]);

  useEffect(() => {
    if (!isTimerRunning) return;
    if (remainigSec === 0) {
      setIsTimerRunning(false);
      return;
    }

    let timer = setTimeout(() => {
      updateTime();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isTimerRunning, remainigSec]);

  return (
    <div className="timer-container">
      <h3>Remaining Time</h3>
      <div className="time">{remainigSec}</div>
    </div>
  );
};

export default Timer;
