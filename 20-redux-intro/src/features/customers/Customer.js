import { useSelector } from "react-redux";

function Customer() {
  // useSelector: subscription to the store
  // 객체의 property를 가져오고싶다면 객체를 가져와서 destructure하는게 아니라
  // prop 자체를 가져오는게 좋은데, 그 이유는
  const customerfullName = useSelector((state) => state.customer.fullName);
  return <h2>👋 Welcome, {customerfullName}</h2>;
}

export default Customer;
