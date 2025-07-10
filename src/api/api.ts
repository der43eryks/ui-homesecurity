const API_URL = import.meta.env.VITE_API_URL;

export async function login(email: string, password: string, device_id?: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password, device_id })
  });
  return response.json();
}

export async function logout() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return response.json();
}

export async function getProfile() {
  const response = await fetch(`${API_URL}/users/me`, {
    credentials: 'include',
  });
  return response.json();
}

export async function updateEmail(email: string) {
  const response = await fetch(`${API_URL}/users/email`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email })
  });
  return response.json();
}

export async function updatePassword(password: string) {
  const response = await fetch(`${API_URL}/users/password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ password })
  });
  return response.json();
}

export async function updatePhone(phone: string) {
  const response = await fetch(`${API_URL}/users/phone`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ phone })
  });
  return response.json();
}

export async function getDeviceInfo() {
  const response = await fetch(`${API_URL}/devices/me`, {
    credentials: 'include',
  });
  return response.json();
}

export async function getDeviceStatus() {
  const response = await fetch(`${API_URL}/devices/status`, {
    credentials: 'include',
  });
  return response.json();
}

export async function getAlerts() {
  const response = await fetch(`${API_URL}/alerts`, {
    credentials: 'include',
  });
  return response.json();
}

export function getAlertsSSE(onMessage: (alert: any) => void) {
  const eventSource = new EventSource(`${API_URL}/sse/alerts`);
  eventSource.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  };
  return eventSource;
}

export async function requestPasswordReset(email: string) {
  const response = await fetch(`${API_URL}/password-resets/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
}

export async function resetPassword(token: string, newPassword: string) {
  const response = await fetch(`${API_URL}/password-resets/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword })
  });
  return response.json();
} 