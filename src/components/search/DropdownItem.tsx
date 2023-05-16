import { useRef } from 'react';

import Spinner from '../../assets/svg/Spinner';
import useLoading from '../../hooks/useLoading';
import { SetStateType, TodoDataType } from '../../types/types';
import { handleCreateTodos } from '../../utils/todos';

type DropdownItemProps = {
  keyword: string;
  handleChange: (value: string) => void;
  setTodos: SetStateType<TodoDataType[]>;
};

const DropdownItem = ({
  keyword,
  handleChange,
  setTodos,
}: DropdownItemProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const [isLoading, createTodos] = useLoading<void>(handleCreateTodos);
  const handleClick = async () => {
    createTodos(ref.current?.textContent, setTodos);
    handleChange('');
  };

  return (
    <div className="dropdown-item_container">
      <li
        ref={ref}
        dangerouslySetInnerHTML={{ __html: keyword }}
        onClick={handleClick}
        className="dropdown-item ellipsis"
      />
      {isLoading && <Spinner className="spinner-item" />}
    </div>
  );
};

export default DropdownItem;