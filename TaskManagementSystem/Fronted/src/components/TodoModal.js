import React, { useState, useEffect } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  // Handle title change

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.completed);
    } else {
      setTitle('');
      setStatus('incompete');
    }
  }, []);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const token = useSelector((state) => state.token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (title === '') {
        toast.error('The title should not be empty');
      }
      if (type === 'add' && title === '') {
        toast.error('Please add a title');
        return;
      }

      // Perform action based on the type (add/update)
      if (type === 'add') {
        await axios.post(
          'http://localhost:4000/api/tasks',
          { title, completed: status },
          config
        );

        setTitle('');
        setModalOpen(false);
        toast.success('Added a new task successfully');
      }
      if (type === 'update') {
        if (todo.title !== title || todo.status !== status) {
          console.log(title);
          await axios.put(
            `http://localhost:4000/api/tasks/${todo._id}`,
            { title, completed: status },
            config
          );
          setModalOpen(false);
          toast.success('The task updated successfully');
        }
      }
    } catch (err) {
      toast.error('Title should not be empty');
    }
  };

  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            role="button"
            tabIndex={0}
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.formTitle}>
              {type === 'update' ? 'Update' : 'Add'} task
            </h1>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
            </label>

            <label htmlFor="status">
              Status
              <select
                name="status"
                id="status"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="primary">
                {type === 'update' ? 'Update' : 'Add'} Task
              </Button>
              <Button
                type="submit"
                variant="secondary"
                onClick={() => setModalOpen(false)}
                onKeyDown={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
          )
        </div>
      </div>
    )
  );
}

export default TodoModal;
