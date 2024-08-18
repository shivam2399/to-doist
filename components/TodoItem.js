import { useState } from 'react';

function TodoItem({ todo, onDelete, onEdit, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  function submitEditHandler() {
    onEdit(todo.id, newText);
    setIsEditing(false);
  }

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      {" - "}
      {" "}
      <button onClick={() => setIsEditing(true)}>Edit</button>
      {isEditing && <button onClick={submitEditHandler}>Save</button>}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
      {todo.status !== 'complete' && (
        <button onClick={() => onComplete(todo.id)}>Mark Complete</button>
      )}
    </li>
  );
}

export default TodoItem;
