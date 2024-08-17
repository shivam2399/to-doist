import { useRef } from 'react';

function NewTodo({ onAddTodo }) {
  const todoInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredText = todoInputRef.current.value;
    onAddTodo(enteredText);
    todoInputRef.current.value = '';
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="Enter a todo" ref={todoInputRef} />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default NewTodo;
