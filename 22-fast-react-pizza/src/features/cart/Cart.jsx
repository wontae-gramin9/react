import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart";

function Cart() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart />;

  return (
    <div>
      <Link to="/menu">&larr; Back to menu</Link>

      <h2>Your cart, {username}</h2>
      <ul>
        {cart.map((pizza) => (
          <CartItem key={pizza.pizzaId} item={pizza}></CartItem>
        ))}
      </ul>

      <div>
        <Link to="/order/new">Order pizzas</Link>
        <button onClick={() => dispatch(clearCart())}>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
