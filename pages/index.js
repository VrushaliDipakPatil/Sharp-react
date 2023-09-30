import { useRef, useState } from "react";
import { MongoClient } from 'mongodb';

export default function Home(props) {
    const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');

  const titleInputRef = useRef();

  async function updateTodoNameHandler(todoId) {
    const response = await fetch(`/api/updatename-todo/${todoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editedTodoText }),
    });

    if (response.ok) {
      // Refresh the todo list after updating completion status
      // You may want to fetch the updated todo list here or update the state to reflect the change
      console.log("Todo updated successfully");
      setEditingTodoId(null);
      setEditedTodoText('');
    } else {
      console.error("Failed to update todo");
    }
  }


  async function updateTodoHandler(todoId) {
    const response = await fetch(`/api/update-todo/${todoId}`, {
      method: "PUT", // Use PUT method to update the todo
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      // Refresh the todo list after updating completion status
      // You may want to fetch the updated todo list here or update the state to reflect the change
      console.log("Todo completion status updated successfully");
    } else {
      console.error("Failed to update todo completion status");
    }
  }
  

  async function addTodoHandler() {
    const enteredTodo = {
        title : titleInputRef.current.value,
        completed: false
    }
 
    const response = await fetch("/api/new-todo", {
      method: "POST",
      body: JSON.stringify(enteredTodo),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    console.log(data);

  }

  async function deleteTodoHandler(todoId) {
    const response = await fetch(`/api/delete-todo/${todoId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Refresh the todo list after deletion
      // You may want to fetch the updated todo list here or update the state to reflect the change
      console.log("Todo deleted successfully");
    } else {
      console.error("Failed to delete todo");
    }
  }

  return (
    <>
      <div>
        <h2>To-do List</h2>
        <input type="text" ref={titleInputRef} />
        <button onClick={addTodoHandler}> Add To-do</button>
      </div>
      {props.todoData.map((todo) => (
        <div key={todo.id}>
          {editingTodoId === todo.id ? (
            <>
              <input
                type="text"
                value={editedTodoText}
                onChange={(e) => setEditedTodoText(e.target.value)}
              />
              <button onClick={() => updateTodoHandler(todo.id)}>Update</button>
            </>
          ) : (
            <>
              <input type="checkbox" onClick={() => updateTodoHandler(todo.id)} />
              <span>{todo.title} </span>
              <button onClick={() => deleteTodoHandler(todo.id)}>Delete</button>
              <button onClick={() => { setEditingTodoId(todo.id); setEditedTodoText(todo.title); }}>Edit</button>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://vrushalip91097:vrushrani@cluster0.olkd5ds.mongodb.net/todos?retryWrites=true&w=majority"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find().toArray();

  client.close();

  return {
    props: {
        todoData: todos.map((todo) => ({
        title: todo.title,
        completed: todo.completed,
        id: todo._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
