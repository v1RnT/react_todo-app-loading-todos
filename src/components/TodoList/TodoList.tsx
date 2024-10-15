import { Todo } from '../../types/Todo';
import { TodoBody } from '../TodoBody';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoBody key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
