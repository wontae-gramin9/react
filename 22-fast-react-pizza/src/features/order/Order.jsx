// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
import { useFetcher, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";

export async function loader({ params }) {
  // id를 url param에서 가져와야하는데, 이때까지 썼던 건 useParams 'hook'이다
  // 즉 컴포넌트에서만 쓸 수 있고, 일반 함수에서는 쓰지 못한다는 것
  // loader function은 args로 params를 받는다
  const { orderId } = params; // dynamic router와 일치해야함 /order/:orderId
  const order = await getOrder(orderId);
  return order;
}

function Order() {
  // 메뉴 data를 다시 가져오고싶다고 해보자.
  // menu 라우터에 loader랑 다 연결해 놓았다.
  // 여기는 order라우터인데, 라우터가 다르다고해서 그걸 다시 만드는건 말이 안된다.
  // 다른 라우터에서 쓸 수 있는 방법은 뭐가 있을까?
  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    // 'idle', 'loading' state를 가진다
  }, [fetcher]);

  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul>
        {cart.map((pizza) => (
          <OrderItem
            item={pizza}
            key={pizza.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((menu) => menu.id === pizza.pizzaId)
                .ingredients ?? []
            }
          ></OrderItem>
        ))}
      </ul>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
        {!priority && <UpdateOrder order={order} />}
      </div>
    </div>
  );
}

export default Order;
