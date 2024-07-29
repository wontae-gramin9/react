import { useState } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

// Form이 submit되면 이 action function이 intercept한다
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // DATA ROUTER:
  // JS(controlled element와, LoadingSpinner 등)를 사용할 필요 없이 Form관리 가능
  // JS이전의 HTML시절의 Form과 비슷하다.

  // 서버에서 FormData를 받아왔으므로 deserializing
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const newOrder = await createOrder(order);
  // 컴포넌트가 아니라 useNavigate Hook 사용불가
  return redirect(`/order/${newOrder.id}`);
}

function CreateOrder() {
  const naviagtion = useNavigation();
  const isSubmitting = naviagtion.state === "submitting";
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>
      {/* <Form method="POST" action="/order/new"> */}
      {/* Specifying the action
      해당 form이 submit하는 path를 적는 것, 그러나 기본적으로 react router가 매치하기때문에
      필요하지 않다. */}
      <Form method="POST">
        {/* POST, PATCH, DELETE 가능, GET 불가*/}
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>
        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
        </div>
        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          {/* HIDDEN INPUT으로 cart정보 Form에 밀어넣기
          POST이므로 serializing
          */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
