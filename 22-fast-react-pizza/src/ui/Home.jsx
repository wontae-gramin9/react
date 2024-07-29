import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div>
      <h1>
        The best pizza.
        <br />
        Straight out of the oven, straight to you.
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Link to="/menu">
          <button>Continue ordering, {username}</button>
        </Link>
      )}
    </div>
  );
}

export default Home;
