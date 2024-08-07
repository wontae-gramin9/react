import Counter from "./Counter";
import "./styles.css";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>
      {/* PROP EXPLOSION: 너무 많은 prop으로 state를 일일히 조정하려고 할 때 생기는 것  */}
      {/* <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
        positionCount="top"
      /> */}
      {/* 부모와 자식이 같이 쓰여야만 의미있음(부모=provider, 자식=consumer) */}
      <Counter>
        <Counter.Label>My super flexible counter</Counter.Label>
        <Counter.Decrease icon="-" />
        <Counter.Increase icon="+" />
        <Counter.Count />
      </Counter>

      <div>
        <Counter>
          <Counter.Decrease icon="◀️" />
          <div>
            <Counter.Count />
          </div>
          <Counter.Increase icon="▶️" />
        </Counter>
      </div>
    </div>
  );
}
