import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions/';
import { StoreState } from '../reducers';
import { DeleteTodoAction, FetchTodosAction } from '../actions';

interface AppProps {
  todos: Todo[];
  fetchTodos: typeof fetchTodos;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

export const App = () => {
  const [fetching, setFetching] = useState(false);
  const todos = useSelector((state: StoreState) => state.todos);
  const dispatch = useDispatch();

  const onBtnClick = (): any => {
    setFetching(true);
    dispatch(fetchTodos());
  };

  const deleteOnClick = (id: number): DeleteTodoAction =>
    dispatch(deleteTodo(id));

  const renderList = (data: Todo[]): JSX.Element => {
    const list = todos.map((todo) => {
      return (
        <li key={todo.id}>
          {todo.title}
          <button onClick={() => deleteOnClick(todo.id)}>Delete</button>
        </li>
      );
    });
    return <ul>{list}</ul>;
  };

  useEffect(() => {
    return () => {
      setFetching(false);
    };
  }, [todos]);

  return (
    <div>
      <button onClick={onBtnClick}>Fetch</button>
      {fetching ? 'loading' : null}
      {renderList(todos)}
    </div>
  );
};
