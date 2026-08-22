const API_BASE_URL = 'http://localhost:5000/api';

export const fetchEmployeesFromApi = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/employees`);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const createEmployeeApi = async (empData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empData)
    });
    return await res.json();
  } catch (err) {
    return empData;
  }
};

export const updateEmployeeApi = async (id, empData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empData)
    });
    return await res.json();
  } catch (err) {
    return { success: true };
  }
};

export const fetchAttendanceFromApi = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/attendance`);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const checkInApi = async (checkInData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/attendance/check-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkInData)
    });
    return await res.json();
  } catch (err) {
    return checkInData;
  }
};

export const fetchTimeOffFromApi = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/timeoff`);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const applyTimeOffApi = async (leaveData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/timeoff`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leaveData)
    });
    return await res.json();
  } catch (err) {
    return leaveData;
  }
};

export const updateLeaveStatusApi = async (id, status, hrComments) => {
  try {
    const res = await fetch(`${API_BASE_URL}/timeoff/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, hrComments })
    });
    return await res.json();
  } catch (err) {
    return { success: true };
  }
};

export const loginFirebaseUser = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};
