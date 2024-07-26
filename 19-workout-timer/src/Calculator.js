import { memo, useState, useEffect, useCallback } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);

  // const playSound = useCallback(
  //   function () {
  //     if (!allowSound) return;
  //     const sound = new Audio(clickSound);
  //     sound.play();
  //   },
  //   [allowSound]
  // );
  // 근데 이렇게하면, allowSound가 바뀔 때마다 useEffect가 실행되고
  // 아무리 inc/dec버튼으로 duration을 바꿔도 form에서의 state는 바뀌지 않았으니
  // 초기화되는 문제가 생김
  // ↓
  // 또 하나의 useEffect로  playSound를 duration과 sync하면 됨
  // 이러면 duration이 바뀔때마다 playSound가 실행되니 다른 eventHandler에서 playSound()를
  // 삭제할수 있고, one useEffect per sideEffect라는 말의 의미를 이해할 수 있게 됨
  // 예기치 못한 버그도 해결가능함
  useEffect(() => {
    const playSound = function () {
      if (!allowSound) return;
      const sound = new Audio(clickSound);
      sound.play();
    };
    playSound();
  }, [duration, allowSound]);

  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
  }, [number, sets, speed, durationBreak]);

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  function handleInc() {
    setDuration(Math.floor(duration) + 1);
  }
  function handleDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
