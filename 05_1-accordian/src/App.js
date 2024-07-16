import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState();
  const [isOpenList, setIsOpenList] = useState(
    Array.from({ length: data.length }, (_) => false)
  );

  function handleToggle(idx) {
    if (curOpen === idx) {
      setIsOpenList(Array.from({ length: data.length }, (_) => false));
      setCurOpen();
    } else {
      setIsOpenList(isOpenList.map((_, i) => (i === idx ? true : false)));
      setCurOpen(idx);
    }
  }

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          isOpen={isOpenList[i]}
          onClick={() => handleToggle(i)}
          key={i}
          num={i}
          curOpen={curOpen}
          title={el.title}
        >
          {el.text}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ isOpen, onClick, num, title, children }) {
  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={onClick}>
      <p className="number">{num < 9 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : " +"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

export default App;
