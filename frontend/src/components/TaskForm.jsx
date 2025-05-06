'use client';
import { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'open',
    recurrence: 'none'
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        dueDate: initialData.dueDate?.split('T')[0] || '',
        status: initialData.status || 'open',
        recurrence: initialData.recurrence || 'none',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return alert('Title is required');
    onSubmit(form);
    setForm({ title: '', description: '', dueDate: '', status: 'pending' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>
      <select name="recurrence" value={form.recurrence || 'none'} onChange={handleChange}>
        <option value="none">No Repeat</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button type="submit">
        {initialData ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
