import { memo, useState, useEffect } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    document.title = `Your ${number}-exercise workout`;
    // Js stale closure
    // Clousure: 함수가 선언되었던 lexical env의 변수, 메소드들을 기억하는 것
    // 그렇기 때문에 상위 함수의 변수도 참조할 수 있게 됨
    // Js closure가 useEffect에 어떻게 영향을 미치는가?

    console.log(duration, sets);
    // useEffect의 callback이 생성될때, 그때의 snapshot의 state(컴포넌트의 모든 state)를 접근할 수 있다
    // 만약 디펜던시어레이에 특정 state가 들어있지 않아있는데
    // console.log()등에서 필요로 한다면
    // 그 state값은 initialRender때의 값을 가집니다
    // (한번밖에 실행 안되는데, 그때의 lexical env의 변수를 기억한다)
    // 이를 stale closure라고 합니다.
  }, [number]);

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
