import React, { useState } from "react";
import "./index.css";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];
const App = () => {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    // console.log(items);
  }
  function handleDeleteItem(id) {
    console.log("Hello");
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleUpdateItem(id) {
    setItems((items) => items.map((i) => i.id));
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItems={handleDeleteItem} />
      <Stats />
    </div>
  );
};

const Logo = () => <h1>🌴Far Away👜</h1>;
const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");
  const [select, setSelect] = useState(1);
  // const [items, setItems] = useState([]);
  // Move to App component
  // function handleAddItems(item) {
  //   setItems((items) => [...items, item]);
  //   // console.log(items);
  // }
  // Move to App
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);
    const newItems = { description, select, id: Date.now(), packed: "false" };
    // console.log(newItems);
    if (!description) return;
    // console.log(items);
    onAddItems(newItems);

    setDescription("");
    setSelect(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your😍 trip?</h3>
      <select value={select} onChange={(e) => setSelect(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        placeholder="Items..."
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
};
const PackingList = ({ items, onDeleteItems }) => {
  // console.log(items);
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItems={onDeleteItems} />
        ))}
      </ul>
    </div>
  );
};
const Item = ({ item, onDeleteItems }) => {
  // console.log(item);
  const { id, description, select, packed } = item;
  // console.log(item);
  console.log(id, description, select, packed);
  console.log(packed);
  return (
    <li>
      <input type="checkbox" value={packed} onChange={() => {}} />
      <span style={+packed ? { textDecoration: "line-through" } : {}}>
        {select} {description}
      </span>

      <button onClick={() => onDeleteItems(id)}>❌</button>
    </li>
  );
};
const Stats = () => {
  return (
    <footer className="stats">
      You have X items on your list,and you already packed X (X%)
    </footer>
  );
};

export default App;
