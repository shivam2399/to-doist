import { useState } from 'react';
import { MongoClient } from 'mongodb';
import TodoItem from '@/components/TodoItem';
import NewTodo from '@/components/NewTodo';

function TodosPage({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  async function addTodoHandler(todoText) {
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text: todoText, status: 'incomplete' }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const newTodo = await response.json();
    setTodos((prevTodos) => [...prevTodos, newTodo]);  // Update state to reflect the new todo
  }

  return (
    <div>
      <h1>Todos</h1>
      <NewTodo onAddTodo={addTodoHandler} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
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
