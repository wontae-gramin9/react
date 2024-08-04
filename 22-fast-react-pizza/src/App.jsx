import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

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
        loader: menuLoader,
        // 해당 router에 접근해서 render할때 동시에(parallel) 필요한 data를 받으면서 들어가는 법
        // useEffect는 최초렌더 한번 하고 sideEffect로 받은 이후 다시 한번 렌더를 하는
        // 'data loading waterfalls'가 발생하지만, 여기서는 아니다.
        errorElement: <Error />,
        // Error도, 해당 route에서 handle이 안되면 위로 bubble up한다
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        // updateOrderAction을 가진 UpdateOrder가 <Order />의 child이지만
        // 상관없이 작동한다
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
