import "../App.css";

function ListItem({ item, deleteItem, toggleItem }) {
  const { id, value, done } = item;
  return (
    <div className="list-item">
      <div>
        <input
          type="checkbox"
          name="done"
          checked={done}
          onChange={() => toggleItem(id)}
        />
        <span className={`${done && "strikethrough"} item-text`}>{value}</span>
      </div>
      <button onClick={() => deleteItem(id)}>X</button>
    </div>
  );
}

export default ListItem;
