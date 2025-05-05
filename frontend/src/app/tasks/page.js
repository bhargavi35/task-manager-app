'use client';

import { useEffect, useState } from 'react';
import API from '../../services/api';
import TaskCard from '../../components/TaskCard';
import TaskForm from '../../components/TaskForm';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useAuth } from '../../context/AuthContext'; // Import the AuthContext

export default function TasksPage() {
  const { user } = useAuth(); // Get the logged-in user
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  const fetchUserTasks = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        const res = await API.get(`/tasks?creatorId=${user.id}`); // Fetch tasks filtered by creatorId
        setTasks(res.data);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error('Failed to fetch user tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (taskData) => {
    try {
      if (user?.id) {
        const res = await API.post('/tasks', { ...taskData, creatorId: user.id });
        setTasks(prev => [...prev, res.data]);
      } else {
        alert('User not logged in. Cannot create task.');
      }
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleUpdate = async (id, taskData) => {
    try {
      const res = await API.put(`/tasks/${id}`, taskData);
      setTasks(prev => prev.map(task => (task._id === id ? res.data : task)));
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  useEffect(() => {
    fetchUserTasks();
  }, [user?.id]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Header />
        <div style={{ padding: '1rem' }}>
          <h2>Your Tasks</h2>
          <TaskForm onSubmit={handleCreate} initialData={null} /> {/* Create form */}
          {editingTask && (
            <>
              <h3>Edit Task</h3>
              <TaskForm onSubmit={(formData) => handleUpdate(editingTask._id, formData)} initialData={editingTask} />
            </>
          )}
          {loading ? (
            <p>Loading your tasks...</p>
          ) : (
            tasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}