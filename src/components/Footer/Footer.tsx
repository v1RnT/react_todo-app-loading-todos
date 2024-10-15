import React, { FC, Dispatch } from 'react';
import { Filter } from '../../types/Filter';
import cn from 'classnames';

type Props = {
  filterOption: Filter;
  uncompletedTodosAmount: number;
  setFilterOption: Dispatch<React.SetStateAction<Filter>>;
};

export const Footer: FC<Props> = ({
  filterOption,
  uncompletedTodosAmount,
  setFilterOption,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodosAmount} items left
      </span>

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

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
