import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Todo App</h1>
      <p>
        Go to your <Link href="/todos">Todos</Link>
      </p>
    </div>
  );
}
