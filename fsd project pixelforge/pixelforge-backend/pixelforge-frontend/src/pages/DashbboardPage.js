import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api';
import { getToken } from '../utils/token';

function DashboardPage() {
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    const token = getToken();
    const res = await createProject(token, desc);
    if (res._id) {
      alert('Project created!');
      navigate(`/upload/${res._id}`);
    } else {
      alert('Error creating project');
    }
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <textarea placeholder="Project description..." onChange={(e) => setDesc(e.target.value)} />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}

export default DashboardPage;
