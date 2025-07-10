import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

interface Device {
  id: string;
  name: string;
  status: string;
}

interface Alert {
  id: string;
  message: string;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check session on mount
    fetch(`${API_BASE}/api/users/me`, { credentials: 'include' })
      .then(res => {
        if (!res.ok) navigate('/login');
        else {
          // Fetch devices for logged-in user
          fetch(`${API_BASE}/api/devices/me`, { credentials: 'include' })
            .then(res => res.json())
            .then(setDevices)
            .catch(() => setDevices([]))
            .finally(() => setLoading(false));
        }
      });
  }, [navigate]);

  useEffect(() => {
    // SSE for real-time alerts (cookies sent if same-origin)
    const eventSource = new EventSource(`${API_BASE}/api/sse/alerts`);
    eventSource.onmessage = (event) => {
      const alert: Alert = JSON.parse(event.data);
      setAlerts(prev => [alert, ...prev]);
    };
    eventSource.onerror = () => {
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, []);

  const handleToggle = async (deviceId: string) => {
    await fetch(`${API_BASE}/api/devices/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, action: 'toggle' }),
      credentials: 'include',
    });
    // Refresh devices
    fetch(`${API_BASE}/api/devices/me`, { credentials: 'include' })
      .then(res => res.json())
      .then(setDevices);
  };

  const handleSignOut = async () => {
    await fetch(`${API_BASE}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    navigate('/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Smart Security Dashboard</h1>
        <button onClick={handleSignOut} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Sign Out</button>
      </header>
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Devices</h2>
          {devices.length === 0 ? (
            <p>No devices found.</p>
          ) : (
            <ul>
              {devices.map(device => (
                <li key={device.id} className="mb-3 flex items-center justify-between">
                  <span>
                    <span className="font-medium">{device.name}</span> -
                    <span className={device.status === 'active' ? 'text-green-600' : 'text-red-600'}> {device.status}</span>
                  </span>
                  <button
                    onClick={() => handleToggle(device.id)}
                    className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Toggle
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Real-Time Alerts</h2>
          {alerts.length === 0 ? (
            <p>No alerts yet.</p>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {alerts.map(alert => (
                <li key={alert.id} className="mb-2 border-b pb-2">
                  <span className="block text-gray-700">{alert.message}</span>
                  <span className="block text-xs text-gray-400">{new Date(alert.timestamp).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <footer className="bg-green-600 text-white text-center p-3">&copy; {new Date().getFullYear()} SmartHome Security</footer>
    </div>
  );
};

export default Dashboard; 