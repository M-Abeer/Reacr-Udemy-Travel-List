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
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleUpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
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
    const newItems = { description, select, id: Date.now(), packed: 0 };
    if (!description) return;
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
const PackingList = ({ items, onDeleteItems, onUpdateItem }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
};
const Item = ({ item, onDeleteItems, onUpdateItem }) => {
  const { id, description, select, packed } = item;
  console.log(id, description, select, packed);
  console.log(packed);
  return (
    <li>
      <input
        type="checkbox"
        value={packed}
        onChange={() => {
          onUpdateItem(id);
        }}
      />
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
