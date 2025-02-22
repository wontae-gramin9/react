import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

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
    priority: data.priority === "true", // input에서 들어온 거니까, boolean이라도 string으로
  };

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "폰넘버잘못됨";
  // Obj가 비어있는지 아닌지 확인할 수 있는 방법
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  // 컴포넌트가 아니라 useNavigate Hook 사용불가
  return redirect(`/order/${newOrder.id}`);
}

function CreateOrder() {
  const naviagtion = useNavigation();
  const isSubmitting = naviagtion.state === "submitting";
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const cart = useSelector(getCart);
  const [withPriority, setWithPriority] = useState(false);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const formErrors = useActionData();
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

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
          <input type="text" name="customer" defaultValue={username} required />
        </div>
        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>
        <div>
          <label>Address</label>
          <div>
            <input
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            {addressStatus === "error" && <p>{errorAddress}</p>}
          </div>
          {!position.latitude && !position.longitute && (
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get position
            </button>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          {/* HIDDEN INPUT으로 cart정보 Form에 밀어넣기
          POST이므로 serializing */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
