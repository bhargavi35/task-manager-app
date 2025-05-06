// app/tasks/page.jsx
'use client';

import { useEffect, useState } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import TaskCard from '../../components/TaskCard';
import TaskForm from '../../components/TaskForm';

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/tasks?creatorId=${user.id}&page=${page}&limit=${limit}`);
      setTasks(res.data.tasks);
      const total = res.data.total || 0;
      setTotalPages(Math.ceil(total / limit));
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await API.post('/tasks', { ...formData, creatorId: user.id });
      fetchTasks();
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      await API.put(`/tasks/${id}`, formData);
      fetchTasks();
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  useEffect(() => {
    if (user?.id) fetchTasks();
  }, [user?.id, page]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Header />
        <div style={{ padding: '1rem' }}>
          <h2>Manage Your Tasks</h2>

          {!editingTask && (
            <>
              <h3>Create Task</h3>
              <TaskForm onSubmit={handleCreate} />
            </>
          )}

          {editingTask && (
            <>
              <h3>Edit Task</h3>
              <TaskForm
                onSubmit={(formData) => handleUpdate(editingTask._id, formData)}
                initialData={editingTask}
              />
            </>
          )}

          {loading ? (
            <p>Loading tasks...</p>
          ) : (
            <>
              {tasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
              <div style={{ marginTop: '1rem' }}>
                <button onClick={() => setPage(prev => Math.max(1, prev - 1))} disabled={page === 1}>
                  Previous
                </button>
                <span style={{ margin: '0 1rem' }}>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(prev => Math.min(totalPages, prev + 1))} disabled={page === totalPages}>
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
