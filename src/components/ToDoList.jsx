import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useReducer } from "react";

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
  const [catImgURL, setCatImgURL] = useState(IMG_PLACEHODLER);

  const reducer = (items, action) => {
    switch (action.type) {
      case "add": {
        const newItem = { id: uuidv4(), value: action.value, done: false };
        return [...items, newItem];
      }
      case "delete": {
        return items.filter((item) => item.id !== action.id);
      }
      case "toggle_done": {
        const newItems = items.map((item) => {
          if (item.id === action.id) {
            return { ...item, done: !item.done };
          }
          return item;
        });
        return newItems;
      }
      default: {
        return items;
      }
    }
  };

  /*
  useReducer is a React hook used for managing complex state logic in functional components.
  It is an alternative to the useState hook
  and is particularly useful when the state logic involves multiple sub-values
  or when the next state depends on the previous one.
  */
  const [items, dispatch] = useReducer(reducer, []);

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

  return (
    <div className="to-do-list">
      <div className="image-container">
        <img src={catImgURL} alt="" />
      </div>
      <TextInput addItem={(value) => dispatch({ type: "add", value })} />
      {items.map((item) => (
        // Arguments passed to component are called 'props'
        <ListItem
          item={item}
          key={item.id}
          deleteItem={(id) => dispatch({ type: "delete", id })}
          toggleItem={(id) => dispatch({ type: "toggle_done", id })}
        />
      ))}
    </div>
  );
}

export default ToDoList;
