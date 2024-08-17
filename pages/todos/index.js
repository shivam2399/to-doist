import { useState, useEffect } from 'react';
import NewTodo from '@/components/NewTodo';
import TodoItem from '@/components/TodoItem';

function TodosPage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/api/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data.todos));
  }, []);

  async function addTodoHandler(todoText) {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text: todoText }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setTodos((prevTodos) => [...prevTodos, data.todo]);
  }

  async function deleteTodoHandler(id) {
    await fetch('/api/todos', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  }

  return (
    <div>
      <h1>Todo List</h1>
      <NewTodo onAddTodo={addTodoHandler} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo._id} id={todo._id} text={todo.text} onDelete={deleteTodoHandler} />
        ))}
      </ul>
    </div>
  );
}

export default TodosPage;
