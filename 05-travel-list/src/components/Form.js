import { useState } from "react";
const Form = ({ onAddItem }) => {
  // Controlled element
  // dom이 가지고 있는 데이터를 JSX의 state로 관리하는 방법
  // 1. state선언 → 2. element의 value로 설정 → 3. onChange로 update감지
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // select의 e.target.value = option의 value
  // element의 value(e.target.value)는 모두 stringify된다.
  const handleSubmit = (e) => {
    // button onClick에 넣으면, form의 기능을 도움받을 수 없다.
    e.preventDefault();
    if (!description) return;
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
};
export default Form;
