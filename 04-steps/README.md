# Event Lister

addEventListener()로 직접 달면, manual하게 dom을 조작하는 것이므로 imperative UI가 된다.

# State

Data that components hold within itself and hold over time(Memmory of component)
Updating state triggers re-rendering of component view
State is how React keep UI in sync with events, data etc.

```js
const [step, setStep] = useState(1);
```

### One way data binding

event handler로 state가 update되면 리액트는 rerender(calls component function again with new data)를 통해 view를 update한다. state는 rerender동안 즉, component가 완전히 unmount되기 전에는 보존된다.

setStep()을 사용하지 않고 step을 update하면 React가 rerender되지 않는다.

서로 다른 state는 독립적이다. 다시 말해 한 state의 변화가 다른 state의 변화를 유발하지 않고 다른 state는 기존 상태를 보존한다. 만약 isOpen이 false가 되어 component가 보이지 않더라도, unmount된게 아니라 display속성만 변화한 것이므로 내부 state(step)은 변하지 않고 보존하고 있다.

현재 state를 기준으로 state를 update하는 방법

```js
{
  setStep(step + 1);
  setStep(step + 1);
}
```

로 update하면 step의 값이 2가 커지지 않는다. state가 바뀌어서 rerender가 되면 하나의 batch로 되기 때문인데

```js
{
  setStep((step) => step - 1);
  setStep((step) => step - 1);
}
```

기존 state를 명시하면, 첫번째 setStep에서 update된 state가 setStep으 arg로 들어가기 때문에 2가 더해진다.

# Hook

Hooks are not allowed to invoke inside a conditional statement, function or loop.

# UI

Component A,B,C,D{= f(state)} → UI
UI is a reflection of data changing over time
