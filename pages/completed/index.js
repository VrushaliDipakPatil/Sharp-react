// Modify your frontend code accordingly to fetch and display completed todos
import { useEffect, useState } from 'react';

export default function CompletedTodos() {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    async function fetchCompletedTodos() {
      try {
        const response = await fetch('/api/completed-todos');
        if (response.ok) {
          const data = await response.json();
          setCompletedTodos(data);
        } else {
          console.error('Failed to fetch completed todos');
        }
      } catch (error) {
        console.error('Error fetching completed todos:', error);
      }
    }

    fetchCompletedTodos();
  }, []);

  return (
    <>
      <div>
        <h2>Completed To-do List</h2>
        {completedTodos.map((todo) => (
          <div key={todo._id}>
            <span>{todo.title}</span>
          </div>
        ))}
      </div>
    </>
  );
}
