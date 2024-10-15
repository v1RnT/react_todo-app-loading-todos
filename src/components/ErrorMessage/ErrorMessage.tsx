import { FC } from 'react';
import cn from 'classnames';
import { Errors } from '../../types/Errors';

type Props = {
  error: Errors;
};

export const ErrorMessage: FC<Props> = ({ error }) => {
  return (
    <div
      data-cy="ErrorNotification"
      // eslint-disable-next-line max-len
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !error,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className={cn('delete', { hidden: !error })}
      />
      {error}
    </div>
  );
};
