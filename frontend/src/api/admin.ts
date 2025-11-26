// frontend/src/api/admin.ts

const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

function json(res: Response) {
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export async function getUsers(token?: string) {
  const res = await fetch(`${API}/admin/users`, { headers: { Authorization: token ? `Bearer ${token}` : '' }});
  return json(res);
}

export async function getEmployers(token?: string) {
  const res = await fetch(`${API}/admin/employers`, { headers: { Authorization: token ? `Bearer ${token}` : '' }});
  return json(res);
}

export async function verifyEmployer(employerId: string, token?: string) {
  const res = await fetch(`${API}/admin/employers/${employerId}/verify`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', Authorization: token ? `Bearer ${token}` : '' }
  });
  return json(res);
}

export async function getJobsAdmin(token?: string) {
  const res = await fetch(`${API}/admin/jobs`, { headers: { Authorization: token ? `Bearer ${token}` : '' }});
  return json(res);
}

export async function getApplications(token?: string) {
  const res = await fetch(`${API}/admin/applications`, { headers: { Authorization: token ? `Bearer ${token}` : '' }});
  return json(res);
}

export async function getAnalytics(token?: string) {
  const res = await fetch(`${API}/admin/stats`, { headers: { Authorization: token ? `Bearer ${token}` : '' }});
  return json(res);
}
export async function getSettings(token?: string) {
  const res = await fetch(`${API}/admin/settings`, { headers: { Authorization: token ? `Bearer ${token}` : '' }});
  return json(res);
}

export async function updateSettings(settings: any, token?: string) {
  const res = await fetch(`${API}/admin/settings`, {
    method: 'PUT',
    headers: { 'Content-Type':'application/json', Authorization: token ? `Bearer ${token}` : '' },
    body: JSON.stringify(settings)
  });
  return json(res);
}   
