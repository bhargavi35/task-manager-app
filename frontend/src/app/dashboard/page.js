// app/dashboard/page.jsx
'use client';

import { useEffect, useState } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';
import TaskForm from '../../components/TaskForm';
import TaskCard from '../../components/TaskCard';

const API_BASE_URL = process.env.BACKEND_URL

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [statusSummary, setStatusSummary] = useState({ open: 0, completed: 0 });


  const fetchDashboardData = async () => {
    setLoadingTasks(true);
    try {
      if (user?.id) {
        const res = await API.get(`${API_BASE_URL}/tasks?creatorId=${user.id}&limit=5&sortBy=dueDate`);
        const fetchedTasks = res.data.tasks || [];

        setTasks(fetchedTasks);

        const open = fetchedTasks.filter(t => t.status !== 'completed').length;
        const completed = fetchedTasks.filter(t => t.status === 'completed').length;
        setStatusSummary({ open, completed });
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await API.post(`${API_BASE_URL}/tasks`, { ...formData, creatorId: user.id });
      fetchDashboardData(); // Refresh list after creating
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchDashboardData();
  }, [user?.id]);

  return (
    <Layout>
      <h2>Welcome back, {user?.username} 👋</h2>

      <section>
        <h3>Create a Quick Task</h3>
        <TaskForm onSubmit={handleCreate} />
      </section>

      <section>
        <h3>Status Summary</h3>
        <p>🟡 Open: {statusSummary.open} | ✅ Completed: {statusSummary.completed}</p>
      </section>

      <section>
        <h3>Latest Tasks</h3>
        {loadingTasks ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p>No recent tasks found.</p>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              showActions={false} // Hide edit/delete in dashboard
            />
          ))
        )}
      </section>
    </Layout>
  );
}
