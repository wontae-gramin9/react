import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import store from "./store";
store.dispatch({ type: "account/deposit", payload: 500 });
console.log(store.getState());
store.dispatch({ type: "account/withdraw", payload: 200 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: {
    amount: 1000,
    purpose: "Buy a car",
  },
});

console.log(store.getState());
store.dispatch({
  type: "account/payLoan",
});

// store.dispatch(createCustomer("Wontae Choi", "24242424"));
// store.dispatch(updateCustomer("Wontae Park"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
