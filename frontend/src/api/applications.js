import { initialApplications } from '../data/mockJobs';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

/**
 * Health check verification against backend
 */
export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return false;
    const json = await res.json();
    return json.status === 'healthy';
  } catch (err) {
    return false;
  }
}

/**
 * Fetch all applications from the backend REST API
 */
export async function getApplications(stage = 'all', search = '') {
  const params = new URLSearchParams();
  if (stage !== 'all') params.append('stage', stage);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE_URL}/api/applications?${params.toString()}`);
  if (!res.ok) throw new Error('API request failed');
  const json = await res.json();
  return json.data || [];
}

/**
 * Fetch single application by ID
 */
export async function getApplicationById(id) {
  const res = await fetch(`${API_BASE_URL}/api/applications/${id}`);
  if (!res.ok) throw new Error('API request failed');
  const json = await res.json();
  return json.data;
}

/**
 * Create a new opportunity on the backend
 */
export async function createApplication(data) {
  const res = await fetch(`${API_BASE_URL}/api/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create application on backend API');
  const json = await res.json();
  return json.data;
}

/**
 * Advance or update an application stage
 */
export async function updateApplicationStage(id, nextStage) {
  const res = await fetch(`${API_BASE_URL}/api/applications/${id}/stage`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stage: nextStage }),
  });
  if (!res.ok) throw new Error('Failed to update stage on backend API');
  const json = await res.json();
  return json.data;
}

/**
 * Update arbitrary fields on an application (stage, notes, salary, location, etc.)
 */
export async function updateApplication(id, updates) {
  const res = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update application on backend API');
  const json = await res.json();
  return json.data;
}

/**
 * Delete an application
 */
export async function deleteApplication(id) {
  const res = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete application on backend API');
  const json = await res.json();
  return json.success;
}
