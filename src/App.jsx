import { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, Input } from "@mui/material";
import "./App.css";
import { Todo } from "./component/Todo";

import { db } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const fetchData = async () => {
    try {
      const todosRef = collection(db, "todos");
      const snapshot = await getDocs(todosRef);

      const todosArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
      }));
      console.log("Fetched Todos:", todosArray);
      setTodos(todosArray);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [input]);

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        text: input,
      });

      setTodos((prevTodos) => [...prevTodos, { id: docRef.id, text: input }]);
      setInput("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteTask = async (todoId) => {
    try {
      deleteDoc(doc(db, "todos", todoId));
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.log("the issue is" + error);
    }
  };

  return (
    <div className="app">
      <FormControl>
        <InputLabel htmlFor="my-input">write a todo</InputLabel>
        <Input
          type="text"
          placeholder="write something"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          id="my-input"
        />
      </FormControl>

      <Button
        disabled={!input}
        type="submit"
        onClick={addTodo}
        variant="contained"
      >
        add todo
      </Button>

      <ul>
        {todos.map((todo) => (
          <Todo handleDelete={deleteTask} key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
