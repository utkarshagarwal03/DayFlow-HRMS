import { INITIAL_EMPLOYEES, INITIAL_ATTENDANCE_LOGS, INITIAL_LEAVE_REQUESTS } from '../data/mockData';

const KEYS = {
  EMPLOYEES: 'dayflow_employees_v1',
  ATTENDANCE: 'dayflow_attendance_v1',
  LEAVES: 'dayflow_leaves_v1',
  PERFORMANCE: 'dayflow_performance_v1'
};

export const INITIAL_PERFORMANCE_DATA = [
  {
    employeeId: 'OIPRDI20230001',
    quarter: 'Q2 2026',
    rating: 4.8,
    status: 'Exceeds Expectations',
    reviewer: 'Sarah Jenkins (VP of Product & HR Admin)',
    okrs: [
      { title: 'Deliver Core HRMS Dashboard Redesign', progress: 100, targetDate: '2026-08-15' },
      { title: 'Optimize Frontend Bundle Size under 300KB', progress: 95, targetDate: '2026-08-30' },
      { title: 'Implement Statutory Payroll Engine', progress: 100, targetDate: '2026-08-20' }
    ],
    peerFeedback: [
      { author: 'Anita Sharma', role: 'QA Lead', comment: 'Prannoy consistently delivers zero-defect UI components and collaborates effectively on bug triage.' },
      { author: 'Rajesh Kumar', role: 'UI/UX Designer', comment: 'Great eye for detail when translating Figma wireframes into high-performance React components.' }
    ]
  },
  {
    employeeId: 'OISAJE20210001',
    quarter: 'Q2 2026',
    rating: 4.9,
    status: 'Outstanding',
    reviewer: 'Executive Board',
    okrs: [
      { title: 'Reduce Employee Onboarding SLA to < 24 hrs', progress: 90, targetDate: '2026-08-31' },
      { title: 'Automate Statutory Compliance Audits', progress: 100, targetDate: '2026-07-31' }
    ],
    peerFeedback: [
      { author: 'Prannoy Didymus J', role: 'Senior Engineer', comment: 'Sarah is an outstanding leader who ensures all engineering dependencies are unblocked quickly.' }
    ]
  }
];

export const loadEmployees = () => {
  try {
    const data = localStorage.getItem(KEYS.EMPLOYEES);
    return data ? JSON.parse(data) : INITIAL_EMPLOYEES;
  } catch (err) {
    return INITIAL_EMPLOYEES;
  }
};

export const saveEmployees = (employees) => {
  try {
    localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(employees));
  } catch (err) {}
};

export const loadAttendanceLogs = () => {
  try {
    const data = localStorage.getItem(KEYS.ATTENDANCE);
    return data ? JSON.parse(data) : INITIAL_ATTENDANCE_LOGS;
  } catch (err) {
    return INITIAL_ATTENDANCE_LOGS;
  }
};

export const saveAttendanceLogs = (logs) => {
  try {
    localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(logs));
  } catch (err) {}
};

export const loadLeaveRequests = () => {
  try {
    const data = localStorage.getItem(KEYS.LEAVES);
    return data ? JSON.parse(data) : INITIAL_LEAVE_REQUESTS;
  } catch (err) {
    return INITIAL_LEAVE_REQUESTS;
  }
};

export const saveLeaveRequests = (requests) => {
  try {
    localStorage.setItem(KEYS.LEAVES, JSON.stringify(requests));
  } catch (err) {}
};

export const loadPerformanceData = () => {
  try {
    const data = localStorage.getItem(KEYS.PERFORMANCE);
    return data ? JSON.parse(data) : INITIAL_PERFORMANCE_DATA;
  } catch (err) {
    return INITIAL_PERFORMANCE_DATA;
  }
};

export const savePerformanceData = (data) => {
  try {
    localStorage.setItem(KEYS.PERFORMANCE, JSON.stringify(data));
  } catch (err) {}
};
