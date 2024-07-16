import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating /> */}
  </React.StrictMode>
);

// Dev모드에서 effect만 2번 call함
// 컴포넌트가 pure한지, 다시 말하면 side effect가 render logic에서 쓰이지 않았는지
// 확인하는 방법
