import { MongoClient } from 'mongodb';
import TodoItem from '@/components/TodoItem';
import Link from 'next/link';

function CompletedTasksPage({ completedTodos }) {
  return (
    <div>
      <h1>Completed Tasks</h1>
      <ul>
        {completedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <Link href="/todos" legacyBehavior>
        <a>Back to Todos</a>
      </Link>
    </div>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect('mongodb+srv://user123:testPass123@cluster0.ymw71.mongodb.net/meetups');
  const db = client.db();
  const todosCollection = db.collection('todos');

  const completedTodos = await todosCollection.find({ status: 'complete' }).toArray();

  client.close();

  return {
    props: {
      completedTodos: completedTodos.map((todo) => ({
        id: todo._id.toString(),
        text: todo.text,
        status: todo.status,
      })),
    },
  };
}

export default CompletedTasksPage;
