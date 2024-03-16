import { useState } from "react";
import "../App.css";

function TextInput({ addItem }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    addItem(value);
    setValue("");
  };

  return (
    <div className="text-input">
      <form action="">
        <input
          type="text"
          // Required in order to prevent "Uncontrolled component"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button onClick={handleSubmit}>Add</button>
      </form>
    </div>
  );
}

export default TextInput;
