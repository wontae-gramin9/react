import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import { useSelector } from "react-redux";

export default function Header() {
  const username = useSelector((state) => state.user.username);
  return (
    <div>
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchOrder />
      <p>UserName: {username} </p>
    </div>
  );
}
