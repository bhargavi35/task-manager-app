'use client';

import { useState } from "react";

export default function TaskCard({ task, onDelete, onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '6px',
      padding: '1rem',
      marginBottom: '1rem'
    }}>
      <h3>{task.title}</h3>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority || 'N/A'}</p>
      <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Created By:</strong> {task.creatorId?.username}</p>
      <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      <button onClick={() => onEdit(task)}>Edit</button>{' '}
      {confirmDelete ? (
        <>
          <button onClick={() => onDelete(task._id)}>Confirm Delete</button>{' '}
          <button onClick={() => setConfirmDelete(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setConfirmDelete(true)}>Delete</button>
      )}
    </div>
  );
}
