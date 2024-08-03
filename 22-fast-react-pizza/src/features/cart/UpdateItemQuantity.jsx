import { useDispatch } from "react-redux";
import { increaseItemQuantitiy, decreaseItemQuantitiy } from "./cartSlice";

export default function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increaseItemQuantitiy(pizzaId))}>
        -
      </button>
      {currentQuantity}
      <button onClick={() => dispatch(decreaseItemQuantitiy(pizzaId))}>
        +
      </button>
    </div>
  );
}
