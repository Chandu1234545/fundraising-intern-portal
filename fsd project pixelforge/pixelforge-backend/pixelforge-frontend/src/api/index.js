const API_BASE = 'http://localhost:5000/api';

export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const getMe = async (token) => {
  const res = await fetch(`${API_BASE}/users/me`, {
    headers: { 'x-auth-token': token }
  });
  return res.json();
};

export const createProject = async (token, description) => {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    },
    body: JSON.stringify({ description, status: 'active' })
  });
  return res.json();
};

export const uploadDocument = async (token, projectId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/documents/${projectId}`, {
    method: 'POST',
    headers: {
      'x-auth-token': token
    },
    body: formData
  });

  return res.json();
};
