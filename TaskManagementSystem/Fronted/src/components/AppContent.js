import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import TodoItem from './TodoItem';

function AppContent() {
  const [taskList, setTaskList] = useState([]);
  const token = useSelector((state) => state.token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const getTasks = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:4000/api/tasks/mytasks',
        config
      );
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, [taskList]);

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${taskId}`, config);
      toast.success('Task deleted successfully');
      setTaskList(taskList.filter((task) => task._id !== taskId));
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (taskId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/task/${taskId}`,
        config
      );
      toast.success('Task updated successfully');
      setTaskList(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {taskList && taskList.length > 0 ? (
        taskList.map((todo) => (
          <TodoItem
            key={todo._id}
            deleteTask={deleteTask}
            todo={todo}
            updateTask={updateTask}
          />
        ))
      ) : (
        <p>no todo found</p>
      )}
    </div>
  );
}

export default AppContent;
