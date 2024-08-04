import React from "react";
import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";

export default function UpdateOrder() {
  // 이 버튼을 누르면, <CreateOrder/>에 연결한 createOrderAction에서 받아서 POST로 보내는
  // formData의 priority를 true값으로 수정하고 싶다는 것
  // 다른 라우터이고, 심지어 POST를 이미 넘어간 data를 어떻게 수정할 수 있을까?
  const fetcher = useFetcher();
  // CreateOrder에서 data router의 Form을 사용했지?
  // 그건 Form과 라우터 action을 연결하고, action이 완료되는동안 useNavigation()의 state로 UI를 만들 수 있다.
  // 여기서 쓰인 redirect()로 redirect를 정해주는 것 보다는 useNavigation()이 차이점
  // 원래 Form에는 action='/route'가 있고, action 내부에 로직을 작성하고 내부 로직의 id가 필요하다보니
  // action='/route'을 생략하고 redirect()으로 쓴 것

  // fetcher.Form은 navigation을 일으키지 않아서 useNavigation()를 고려하지 않는다.
  return (
    <fetcher.Form>
      <button>Make priority</button>;
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  // Form에 input이 없고 submit 버튼만 있으니 FormData()를 읽어올 게 없다.
  const data = { priority: true };
  await updateOrder(params.orderId, data); // Patch라 변경될것만 보내면 됨
  return null;
}
