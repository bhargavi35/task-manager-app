'use client';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import TaskCard from '../../components/TaskCard';
import Layout from '../../components/Layout';
import TaskForm from '../../components/TaskForm';

export default function DashboardPage() {
  const { user } = useAuth();
  // console.log(user, 'user in DashboardPage');

  const [tasks, setTasks] = useState([]);
  // console.log(tasks,'tasks');
  
  const [editingTask, setEditingTask] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const fetchUserTasks = async () => {
    setLoadingTasks(true);
    try {
      if (user?.id) {
        const res = await API.get(`/tasks?creatorId=${user.id}`); // Fetch tasks filtered by creatorId
        setTasks(res.data);
      } else {
        setTasks([]); // No user ID, so no tasks to fetch
      }
    } catch (err) {
      console.error('Error fetching user tasks:', err);
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        // Consider redirecting to login here
      }
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, [user?.id]); // Re-fetch tasks when the user ID changes (after login)

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, formData);
      } else {
        await API.post('/tasks', { ...formData, creatorId: user?.id });
      }
      setEditingTask(null);
      fetchUserTasks();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchUserTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  return (
    <Layout>
      <h2>Welcome, {user?.username}</h2>
      <h3>{editingTask ? 'Edit Task' : 'Create Task'}</h3>

      <TaskForm
        onSubmit={handleCreateOrUpdate}
        initialData={editingTask}
      />

      <h3>Your Tasks:</h3>
      {loadingTasks ? (
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
    </Layout>
  );
}