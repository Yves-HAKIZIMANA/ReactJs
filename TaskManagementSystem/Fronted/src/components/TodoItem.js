import React, { useState, useEffect } from 'react';
import { format } from 'date-fns/esm';
import { MdDelete, MdEdit } from 'react-icons/md';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';

function TodoItem({ todo, deleteTask }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todo.completed === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.completed]);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };
  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} setChecked={checked} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                todo.completed === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.createdAt), 'yyyy-MM-dd HH:mm:ss')}
            </p>
            <div className={styles.todoActions}>
              <div
                className={styles.icon}
                onClick={() => deleteTask(todo._id)}
                role="button"
                onKeyDown={() => deleteTask(todo._id)}
                tabIndex={0}
              >
                <MdDelete />
              </div>
              <div
                className={styles.icon}
                onClick={handleUpdate}
                onKeyDown={handleUpdate}
                role="button"
                tabIndex={0}
              >
                <MdEdit />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TodoModal
        type="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
}

export default TodoItem;
