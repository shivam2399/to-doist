import { useState } from 'react';
import { MongoClient } from 'mongodb';
import TodoItem from '@/components/TodoItem';
import NewTodo from '@/components/NewTodo';
import Link from 'next/link';

function TodosPage({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  async function addTodoHandler(todoText) {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text: todoText, status: 'incomplete' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newTodo = await response.json();
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }

  async function deleteTodoHandler(todoId) {
    const response = await fetch('/api/todos', {
      method: 'DELETE',
      body: JSON.stringify({ id: todoId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    }
  }

  async function editTodoHandler(todoId, newText) {
    const response = await fetch('/api/todos', {
      method: 'PATCH',
      body: JSON.stringify({ id: todoId, newText }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === todoId ? { ...todo, text: newText } : todo))
      );
    }
  }

  async function markCompleteHandler(todoId) {
    const response = await fetch('/api/todos', {
      method: 'PATCH',
      body: JSON.stringify({ id: todoId, status: 'complete' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, status: 'complete' } : todo
        )
      );
    }
  }

  return (
    <div>
      <h1>Todos</h1>
      <NewTodo onAddTodo={addTodoHandler} />
      <ul>
        {todos
          .filter((todo) => todo.status === 'incomplete') // Only display incomplete todos
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodoHandler}
              onEdit={editTodoHandler}
              onComplete={markCompleteHandler}
            />
          ))}
      </ul>
      <Link href="/completedtasks" legacyBehavior>
        <a>View Completed Tasks</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect('mongodb+srv://user123:testPass123@cluster0.ymw71.mongodb.net/meetups');
  const db = client.db();
  const todosCollection = db.collection('todos');

  const todos = await todosCollection.find().toArray();

  client.close();

  return {
    props: {
      initialTodos: todos.map((todo) => ({
        id: todo._id.toString(),
        text: todo.text,
        status: todo.status,
      })),
    },
  };
}

export default TodosPage;
