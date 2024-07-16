import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import { Stats } from "./components/Stats";
import { PackingList } from "./components/PackingList";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  // State uplifting
  // sibling이 같은 state를 공유해야할 때, 그 state와 setter를 부모로 올리는 방법
  // state와 setter를 담당하는 child가 다를 수 있다.
  const [items, setItems] = useState(initialItems);
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              packed: !item.packed,
            }
          : item
      )
    );
  };

  const handleClearList = (id) => {
    setItems([]);
  };
  return (
    <div className="app">
      <Logo />
      {/* child-to-parent communication(inverse data flow)  */}
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
