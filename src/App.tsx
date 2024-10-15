import React, { useEffect, useMemo, useState } from 'react';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Errors } from './types/Errors';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ErrorMessage } from './components/ErrorMessage';
import { UserWarning } from './UserWarning';

const getFileteredTodos = (todos: Todo[], filter: Filter): Todo[] => {
  return todos.filter(todo => {
    switch (filter) {
      case Filter.Completed:
        return todo.completed;
      case Filter.Active:
        return !todo.completed;
      default:
        return true;
    }
  });
};

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.Default);
  const [filterOption, setFilterOption] = useState<Filter>(Filter.All);

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .catch(() => setErrorMessage(Errors.Loading))
      .finally(() =>
        setTimeout(() => {
          setErrorMessage(Errors.Default);
        }, 3000),
      );
  }, []);

  const uncompletedTodosAmount = useMemo(() => {
    return todosFromServer.filter(todo => !todo.completed).length;
  }, [todosFromServer]);

  const filteredTodos = useMemo(() => {
    return getFileteredTodos(todosFromServer, filterOption);
  }, [todosFromServer, filterOption]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          uncompletedTodosAmount={uncompletedTodosAmount}
          todosLength={todosFromServer.length}
        />

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={filteredTodos} />
        </section>

        {!!todosFromServer.length && (
          <Footer
            filterOption={filterOption}
            uncompletedTodosAmount={uncompletedTodosAmount}
            setFilterOption={setFilterOption}
          />
        )}
      </div>

      <ErrorMessage error={errorMessage} />
    </div>
  );
};
