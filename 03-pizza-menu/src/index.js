import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

const App = () => {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

const Header = () => {
  return React.createElement(
    "header",
    null,
    React.createElement("h1", { style: { color: "red" } }, "Hello React")
  );
};

const Menu = () => {
  const numPizzas = pizzaData.length;

  return (
    /* class → className */
    <div className="menu">
      {/*  inline css, converted to camelCase */}
      <h2 style={{ color: "red", fontSize: "32px" }}>Our menu</h2>
      {numPizzas > 0 && ( // short circuting
        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <Pizza pizza={pizza} key={pizza.name} />
          ))}
        </ul>
      )}
      {/* 물론 삼항연산자로 placeholder를 만들기도 함 */}
    </div>
  );
};

const Pizza = ({ pizza: { name, ingredients, photoName, price, soldOut } }) => {
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <h1>{name}</h1>
      <p>{ingredients}</p>
      <p>{soldOut ? "Sold out" : price}</p>
    </li>
  );
};

const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12,
    closeHour = 22;

  const isOpen = hour >= openHour && hour <= closeHour;
  if (!isOpen)
    return (
      <p>
        We are happy to welcome you between {openHour} and {closeHour}
      </p>
    );
  // 이러면 전체 footer를 렌더링하지 않으니까,
  // if-else로 하려면 덩어리 자체를 바꿀 때 용이하다

  return (
    <footer className="footer">
      {true}
      {false} {/* true, false는 렌더하지 않는다.  */}
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
};

const Order = ({ openHour, closeHour }) => {
  return (
    <div className="order">
      <p>
        We are happy to welcome you between {openHour} and {closeHour}
      </p>
    </div>
  );
};

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // StrictMode: 2번 렌더, outdatedAPI 검사
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React before 18
// React.render(<App/>, document.getElementById("root"))
