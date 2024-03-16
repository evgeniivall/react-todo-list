import ToDoList from "./components/ToDoList";

import "./App.css";

// Entry point, base component called App
function App() {
  return (
    <div className="App">
      {/* Render ToDoList Component */}
      <ToDoList />
    </div>
  );
}

export default App;
