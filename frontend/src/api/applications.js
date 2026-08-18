import { initialApplications } from '../data/mockJobs';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

/**
 * Fetch all applications from the backend REST API
 */
export async function getApplications(stage = 'all', search = '') {
  try {
    const params = new URLSearchParams();
    if (stage !== 'all') params.append('stage', stage);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/api/applications?${params.toString()}`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json.data || initialApplications;
  } catch (err) {
    // Graceful fallback to client seed state if backend is offline or starting up
    return initialApplications;
  }
}

/**
 * Fetch single application by ID
 */
export async function getApplicationById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/applications/${id}`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return initialApplications.find(a => a.id === id) || null;
  }
}

/**
 * Create a new opportunity on the backend
 */
export async function createApplication(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('API create failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return data;
  }
}

/**
 * Advance or update an application stage
 */
export async function updateApplicationStage(id, nextStage) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/applications/${id}/stage`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: nextStage }),
    });
    if (!res.ok) throw new Error('API update stage failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

/**
 * Update arbitrary fields on an application (stage, notes, salary, location, etc.)
 */
export async function updateApplication(id, updates) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('API update failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

/**
 * Delete an application
 */
export async function deleteApplication(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('API delete failed');
    const json = await res.json();
    return json.success;
  } catch (err) {
    return false;
  }
}
