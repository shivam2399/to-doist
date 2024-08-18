function TodoItem({ todo }) {
  return (
    <li>
      <span>{todo.text}</span> - <strong>{todo.status}</strong>
    </li>
  );
}

export default TodoItem;
