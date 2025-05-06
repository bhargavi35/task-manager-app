'use client';

import { useState } from "react";

export default function TaskCard({ task, onDelete, onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }}>
      <h3 style={{ marginTop: 0 }}>{task.title}</h3>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority || 'N/A'}</p>
      <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Created By:</strong> {task.creatorId?.username}</p>
      <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      <div style={{ marginTop: '10px' }}>
        {onEdit && (
          <button onClick={() => onEdit(task)}>Edit</button>
        )}

        {onDelete && (
          confirmDelete ? (
            <>
              <button style={{ backgroundColor: 'red' }} onClick={() => onDelete(task._id)}>Confirm Delete</button>
              <button style={{ backgroundColor: '#6c757d' }} onClick={() => setConfirmDelete(false)}>Cancel</button>
            </>
          ) : (
            <button style={{ backgroundColor: '#dc3545' }} onClick={() => setConfirmDelete(true)}>Delete</button>
          )
        )}
      </div>
    </div>
  );
}
