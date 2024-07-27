import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";

// react router 6.4: load data, submit data using form
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // layout route
    // (nested route에도 children prop을 사용할 수 있다.)
    // 여기서는 AppLayout은 자신만의 route를 가지지 않지만
    // 모든 페이지 컴포넌트들의 Layout의 역할을 하기 때문에 children으로 넣어준다.
    // nested route를 표시할 곳은 <Outlet/>을 사용한다
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
