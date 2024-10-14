/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import cn from 'classnames';

const getFileteredTodos = (todos: Todo[], filter: Filter): Todo[] => {
  return todos.filter(todo => {
    if (filter === Filter.Completed) {
      return todo.completed;
    }

    if (filter === Filter.Active) {
      return !todo.completed;
    }

    return true;
  });
};

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterOption, setFilterOption] = useState<Filter>(Filter.All);

  useEffect(() => {
    getTodos()
      .then(setTodosFromServer)
      .catch(() => setError('Unable to load todos'))
      .finally(() =>
        setTimeout(() => {
          setError('');
        }, 3000),
      );
  }, []);

  const uncompletedTodos = todosFromServer.filter(
    todo => !todo.completed,
  ).length;

  const filteredTodos = getFileteredTodos(todosFromServer, filterOption);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {/* This is a completed todo */}
          <TodoList todos={filteredTodos} />
        </section>

        {/* Hide the footer if there are no todos */}
        {!!todosFromServer.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {uncompletedTodos} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: filterOption === Filter.All,
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilterOption(Filter.All)}
              >
                All
              </a>

              <a
                href="#/active"
                className={cn('filter__link', {
                  selected: filterOption === Filter.Active,
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilterOption(Filter.Active)}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: filterOption === Filter.Completed,
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilterOption(Filter.Completed)}
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        // eslint-disable-next-line max-len
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !error },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className={cn('delete', { hidden: !error })}
        />
        {error}
      </div>
    </div>
  );
};
