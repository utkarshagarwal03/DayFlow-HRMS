import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, auth } from './firebase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let inMemoryEmployees = [
  {
    id: 'EMP-101',
    name: 'Prannoy Didymus J',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    status: 'present',
    email: 'prannoy.j@dayflow.io',
    phone: '+91 98765 12345',
    location: 'Bengaluru, KA',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    dateOfJoining: '2023-04-12',
    salaryConfig: { monthWage: 80000 }
  },
  {
    id: 'EMP-102',
    name: 'Sarah Jenkins',
    role: 'VP of Product & HR Admin',
    department: 'Human Resources',
    status: 'present',
    email: 'sarah.jenkins@dayflow.io',
    phone: '+91 98765 67890',
    location: 'Bengaluru, KA',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    dateOfJoining: '2021-01-10',
    salaryConfig: { monthWage: 120000 }
  }
];

let inMemoryAttendance = [
  {
    date: '2026-08-22',
    employeeId: 'EMP-101',
    employeeName: 'Prannoy Didymus J',
    checkIn: '09:00 AM',
    checkOut: 'In Progress',
    workHours: '4h 30m',
    extraHours: '0h 0m',
    status: 'Present'
  }
];

let inMemoryLeaves = [
  {
    id: 'LEAVE-1001',
    employeeId: 'EMP-103',
    employeeName: 'Rajesh Kumar',
    type: 'Paid Leave',
    startDate: '2026-08-22',
    endDate: '2026-08-24',
    totalDays: 3,
    status: 'Approved',
    submittedDate: '2026-08-18'
  }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Dayflow HRMS Express Backend', db: 'Firestore' });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    let uid = `user_${Date.now()}`;

    if (auth) {
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: name
      });
      uid = userRecord.uid;
    }

    const newUser = {
      id: `EMP-${Math.floor(106 + Math.random() * 899)}`,
      uid,
      name,
      role: role || 'Software Engineer',
      email,
      department: 'Engineering',
      status: 'present',
      salaryConfig: { monthWage: 65000 }
    };

    if (db) {
      await db.collection('employees').doc(newUser.id).set(newUser);
    }
    inMemoryEmployees.push(newUser);

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email } = req.body;
    const emp = inMemoryEmployees.find(e => e.email === email) || inMemoryEmployees[0];
    res.json({ success: true, token: `mock_jwt_token_${Date.now()}`, user: emp });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    if (db) {
      const snapshot = await db.collection('employees').get();
      if (!snapshot.empty) {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return res.json(list);
      }
    }
    res.json(inMemoryEmployees);
  } catch (error) {
    res.json(inMemoryEmployees);
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const newEmp = {
      id: `EMP-${Math.floor(106 + Math.random() * 899)}`,
      ...req.body
    };
    if (db) {
      await db.collection('employees').doc(newEmp.id).set(newEmp);
    }
    inMemoryEmployees.unshift(newEmp);
    res.status(201).json(newEmp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = req.body;
    if (db) {
      await db.collection('employees').doc(id).update(updated);
    }
    inMemoryEmployees = inMemoryEmployees.map(e => e.id === id ? { ...e, ...updated } : e);
    res.json({ success: true, employee: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/attendance', async (req, res) => {
  try {
    if (db) {
      const snapshot = await db.collection('attendance').get();
      if (!snapshot.empty) {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return res.json(list);
      }
    }
    res.json(inMemoryAttendance);
  } catch (error) {
    res.json(inMemoryAttendance);
  }
});

app.post('/api/attendance/check-in', async (req, res) => {
  try {
    const log = {
      id: `ATT-${Date.now()}`,
      ...req.body,
      date: new Date().toISOString().split('T')[0]
    };
    if (db) {
      await db.collection('attendance').doc(log.id).set(log);
    }
    inMemoryAttendance.unshift(log);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/timeoff', async (req, res) => {
  try {
    if (db) {
      const snapshot = await db.collection('timeoff').get();
      if (!snapshot.empty) {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return res.json(list);
      }
    }
    res.json(inMemoryLeaves);
  } catch (error) {
    res.json(inMemoryLeaves);
  }
});

app.post('/api/timeoff', async (req, res) => {
  try {
    const leaveReq = {
      id: `LEAVE-${Math.floor(1000 + Math.random() * 9000)}`,
      ...req.body,
      status: 'Pending',
      submittedDate: new Date().toISOString().split('T')[0]
    };
    if (db) {
      await db.collection('timeoff').doc(leaveReq.id).set(leaveReq);
    }
    inMemoryLeaves.unshift(leaveReq);
    res.status(201).json(leaveReq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/timeoff/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, hrComments } = req.body;
    if (db) {
      await db.collection('timeoff').doc(id).update({ status, hrComments });
    }
    inMemoryLeaves = inMemoryLeaves.map(l => l.id === id ? { ...l, status, hrComments } : l);
    res.json({ success: true, id, status, hrComments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Dayflow HRMS Express Backend listening on http://localhost:${PORT}`);
});
