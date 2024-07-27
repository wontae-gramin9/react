// react router loader는 그 data가 필요한 컴포넌트에서 선언한다

import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

export async function loader() {
  const menu = await getMenu();
  return menu;
}

function Menu() {
  // react router가 알아서 data router에 준 loader와 매칭한다
  const menu = useLoaderData();
  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem key={pizza.name} pizza={pizza} />
      ))}
      Menu
    </ul>
  );
}

export default Menu;
