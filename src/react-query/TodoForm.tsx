import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from './hooks/useTodos';
import axios from 'axios';
import useAddTodo from './hooks/useAddTodo';

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const addTodo = useAddTodo(() => {
      ref.current!.value = '';
  })

  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
    {addTodo.error && <div className='alert alert-danger'>
        {addTodo.error.message}
      </div>}
    <form onSubmit={(event) => {
      event.preventDefault();
      addTodo.mutate({ 
        title: ref.current?.value ?? '', 
        id: 0, 
        completed: false, 
        userId: 1 });
    }} className="row mb-3">
      <div className="col">
        <input ref={ref} type="text" className="form-control" />
      </div>
      <div className="col">
        <button className="btn btn-primary" disabled={addTodo.isLoading}>
          Add
        </button>
      </div>
    </form>
    </>
  );
};

export default TodoForm;
