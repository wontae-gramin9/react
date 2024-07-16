# Seperation of Concerns

SPA 전에는 한 페이지에 하나의 HTML, JS, CSS가 있었다.
JS의 역할이 커지면서 HTML은 JS가 없이는 작동하지 않을 정도로 tightly coupled된다.
그래서 어짜피 하나의 tightly coupled된 것, 모두 JS파일에 때려박은 것 (RC + JSX)

One html+css+js per page(one tech per file) → One component per file

# Component

Component is a piece of UI that has its own data, js logic & appearance(html, css, js inside {}). It utilizes JSX, declartive syntax to describe a component and an extension of js, allowing embedding js, css, Components into HTML, which means there's a way(Babel) to convert JSX to js, which is why JSX can understand html & css
Babel is included by CRA converts JSX to js that generates html that browser can read

```js
React.createElement(
  "header",
  null,
  React.createElement("h1", { style: { color: "red" } }, "Hello React")
);
```

// Never nest function declaration

# JSX rule

{} 내부에는 js expression(삼항연산자, 변수, first class function)을 쓸 수 있지만, statement(if, else, for, switch)는 쓸 수 없다.
JS expression을 만들기 때문에 JSX는 변수에 담길 수 있다.

# declarative UI vs imperative UI

vanilaJS로 UI를 만들면, imperative로 작성하게 된다
manually select DOM, traverse DOM, attach 이벤트핸들러 등...
이 모든 것들이 어떤 이벤트가 발생하면, JS가 step-by-step으로 따라서 UI를 업데이트하는 것

declarative UI는, UI가 모든 순간에 어떻게 보여져야 하는지를 변화하는 data(state와 props)에 따라 볼 수 있게 작성하는 것.
imperative approach처럼 DOM manipulation을 직접하지 않고 virtual dom으로 달성한다.

# Data

internal data to be updated by the component's logic,
props && state

# props

how to pass data from parent → child
props can be primitive, array, ojbects, functions, other components
props: child cannot modify it as it is external, only parent can(READ-ONLY)
만약 refrence type인 props를 바꾼다면 부모의 state도 변경할 수 있기에 strict하게 금지되어 있다.
함수(컴포넌트도) 바깥의 object를 update하는 것을 side effect라고 부른다.

그렇기에 one-way data flow(from parent → child)를 쓴다.

# conditional rendering

### &&, || Short Circuting

앞에서 이미 결정이 되어 뒤 연산을 하지 않고 바로 값을 리턴하는 것
true, false만 렌더하지 않고 truthy, falsy는 렌더한다.
예를 들어 비어있는 array는 truthy한 값이기 때문에
{ isArrayEmpty $$ <Component/>}여도 <Component/>가 렌더된다.
혹 array.length가 0인지 아닌지 비교하기 위해
{number(0) $$ <Component/>}를 사용하면 0은 falsy하지 false가 아니기에 0이 렌더링된다.
{number > 0 $$ <Component/>} 으로 해야 false가 되어 렌더되지 않는다.

### early return

```js
if (soldOut) return null;
```

완전 다른 덩어리를 리턴할때 쓸 수 있다.

# React Fragment

<div>는 block element라서 기존 UI를 바꿔버릴 수 있다.
React fragment(<></>)는 어떠한 html태그도 만들지 않는다
map같은 List rendering을 사용할 때 key prop이 필요하면
```js
<React.Fragment key={key}></React.Fragment>
```
를 사용하면 된다.
