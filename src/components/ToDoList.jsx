import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

import TextInput from "./TextInput";
import ListItem from "./ListItem";

import "../App.css";

function ToDoList() {
  /*
  useState is a React hook that allows functional components to manage state in React applications.
  const [state, setState] = useState(initialState);
  You can call useState multiple times to manage multiple state variables in a component.
  */
  const IMG_PLACEHODLER = "./placeholder.png";
  const [items, setItems] = useState([]);
  const [catImgURL, setCatImgURL] = useState(IMG_PLACEHODLER);

  /*
  useEffect is a hook provided by React that allows you to perform side effects in function components.
  Usage:
  - Fetching data from an API.
  - Subscribing to external events.
  - Manually changing the DOM
  - Setting up and cleaning up timers.
  */
  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_CATS_API_URL);
        const data = await response.json();

        setCatImgURL(data[0].url);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCatImage();
    // Array of dependencies. If provided, the effect will only run if the dependencies have changed since the last render.
    // If not provided, the effect runs after every render.
  }, [items]);

  const addItem = (value) => {
    const newItem = { id: uuidv4(), value, done: false };
    // DO NOT MUTATE STATE
    setItems([...items, newItem]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) => {
        item.id === id && (item.done = !item.done);
        return item;
      })
    );
  };

  return (
    <div className="to-do-list">
      <div className="image-container">
        <img src={catImgURL} alt="" />
      </div>
      <TextInput addItem={addItem} />
      {items.map((item) => (
        // Arguments passed to component are called 'props'
        <ListItem
          item={item}
          key={item.id}
          deleteItem={deleteItem}
          toggleItem={toggleItem}
        />
      ))}
    </div>
  );
}

export default ToDoList;
