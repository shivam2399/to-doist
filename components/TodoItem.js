function TodoItem({ id, text, onDelete }) {
    return (
      <li>
        {text}
        <button onClick={() => onDelete(id)}>Delete</button>
      </li>
    );
  }
  
  export default TodoItem;
  