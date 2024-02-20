const Item = ({ item, onDeleteItems, onUpdateItem }) => {
  const { id, description, select, packed } = item;
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

export default Item;
