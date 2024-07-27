import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  // router의 page가 idle || loading || submitting중 어떤 상태인지를 받는다
  // 이 page뿐만 아니라 router 전체
  // 그래서 컴포넌트에서 useNavigation을 선언하지 않는다.

  return (
    <div className="layout">
      {isLoading && <Loader />}

      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
