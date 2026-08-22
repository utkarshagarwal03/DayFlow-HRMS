export function generateEmployeeId(companyName = 'Odoo India', fullName = 'John Doe', joiningYear = 2026, serialNum = 1) {
  const compPrefix = (companyName.replace(/[^a-zA-Z]/g, '').slice(0, 2) || 'OI').toUpperCase();
  const nameParts = fullName.trim().split(/\s+/);
  let nameCode = '';
  if (nameParts.length >= 2) {
    nameCode = (nameParts[0].slice(0, 2) + nameParts[nameParts.length - 1].slice(0, 2)).toUpperCase();
  } else {
    nameCode = (fullName.replace(/[^a-zA-Z]/g, '').slice(0, 4) || 'JODO').padEnd(4, 'X').toUpperCase();
  }
  const yearStr = String(joiningYear || 2026);
  const serialStr = String(serialNum).padStart(4, '0');
  return `${compPrefix}${nameCode}${yearStr}${serialStr}`;
}

export const INITIAL_EMPLOYEES = [
  {
    id: 'OIPRDI20230001',
    name: 'Prannoy Didymus J',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    companyName: 'Odoo India',
    status: 'present',
    email: 'prannoy.j@dayflow.io',
    phone: '+91 98765 12345',
    location: 'Bengaluru, KA',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    dateOfJoining: '2023-04-12',
    dateOfBirth: '1996-05-14',
    address: '42 Park View, HSR Layout, Bengaluru, 560102',
    nationality: 'Indian',
    gender: 'Male',
    personalEmail: 'prannoy.personal@gmail.com',
    maritalStatus: 'Single',
    bankDetails: {
      bankName: 'HDFC Bank',
      accountNumber: '50100456123489',
      ifscCode: 'HDFC0000240',
      panNo: 'ABCDE1234F',
      uanNo: '100900800700',
      empCode: 'OIPRDI20230001'
    },
    salaryConfig: {
      monthWage: 50000,
      workingDaysPerWeek: 5,
      breakTimeHrs: 1.0
    },
    skills: ['React', 'Node.js', 'Tailwind CSS', 'TypeScript', 'PostgreSQL'],
    certifications: ['AWS Certified Solutions Architect', 'Meta Frontend Developer'],
    leaveBalance: {
      paidLeaveDays: 24,
      paidLeaveUsed: 3,
      sickLeaveDays: 7,
      sickLeaveUsed: 1,
      unpaidLeaveDays: 0
    },
    textBlocks: {
      about: 'Passionate about building scalable web applications and high-performance user interfaces.',
      loveJob: 'Designing high-volume distributed systems and collaborating with cross-functional teams.',
      hobbies: 'Open-source contributions, photography, and distance running.'
    }
  },
  {
    id: 'OISAJE20210001',
    name: 'Sarah Jenkins',
    role: 'VP of Product & HR Admin',
    department: 'Human Resources',
    companyName: 'Odoo India',
    status: 'present',
    email: 'sarah.jenkins@dayflow.io',
    phone: '+91 98765 67890',
    location: 'Bengaluru, KA',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    dateOfJoining: '2021-01-10',
    dateOfBirth: '1990-11-20',
    address: '18 Indiranagar 100ft Road, Bengaluru, 560038',
    nationality: 'Indian',
    gender: 'Female',
    personalEmail: 'sarah.j.private@gmail.com',
    maritalStatus: 'Married',
    bankDetails: {
      bankName: 'ICICI Bank',
      accountNumber: '623401509876',
      ifscCode: 'ICIC0000102',
      panNo: 'FGHIJ5678K',
      uanNo: '100900800701',
      empCode: 'OISAJE20210001'
    },
    salaryConfig: {
      monthWage: 120000,
      workingDaysPerWeek: 5,
      breakTimeHrs: 1.0
    },
    skills: ['HR Strategy', 'People Ops', 'Product Management', 'Talent Acquisition'],
    certifications: ['SHRM Senior Certified Professional (SHRM-SCP)'],
    leaveBalance: {
      paidLeaveDays: 24,
      paidLeaveUsed: 5,
      sickLeaveDays: 7,
      sickLeaveUsed: 0,
      unpaidLeaveDays: 0
    },
    textBlocks: {
      about: 'HR leader dedicated to building inclusive workplace cultures and optimized talent systems.',
      loveJob: 'Empowering team members to perform at their best.',
      hobbies: 'Mentorship, chess, and baking.'
    }
  },
  {
    id: 'OIRAKU20220001',
    name: 'Rajesh Kumar',
    role: 'UI/UX Designer',
    department: 'Product Design',
    companyName: 'Odoo India',
    status: 'on_leave',
    email: 'rajesh.k@dayflow.io',
    phone: '+91 98765 43210',
    location: 'Remote (Mumbai)',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    dateOfJoining: '2022-08-01',
    dateOfBirth: '1994-03-08',
    address: 'Bandra West, Mumbai, 400050',
    nationality: 'Indian',
    gender: 'Male',
    personalEmail: 'rajesh.design@gmail.com',
    maritalStatus: 'Single',
    bankDetails: {
      bankName: 'Axis Bank',
      accountNumber: '91201004321567',
      ifscCode: 'UTIB0000451',
      panNo: 'KLMNO9012P',
      uanNo: '100900800702',
      empCode: 'OIRAKU20220001'
    },
    salaryConfig: {
      monthWage: 65000,
      workingDaysPerWeek: 5,
      breakTimeHrs: 1.0
    },
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
    certifications: ['Google UX Design Professional Certificate'],
    leaveBalance: {
      paidLeaveDays: 24,
      paidLeaveUsed: 4,
      sickLeaveDays: 7,
      sickLeaveUsed: 2,
      unpaidLeaveDays: 0
    },
    textBlocks: {
      about: 'Crafting pixel-perfect design systems and intuitive user journeys.',
      loveJob: 'Transforming complex administrative workflows into simple, elegant software.',
      hobbies: 'Digital painting, sketching, and coffee brewing.'
    }
  },
  {
    id: 'OIANSH20230002',
    name: 'Anita Sharma',
    role: 'QA & Test Automation Lead',
    department: 'Engineering',
    companyName: 'Odoo India',
    status: 'present',
    email: 'anita.s@dayflow.io',
    phone: '+91 98765 99887',
    location: 'Bengaluru, KA',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    dateOfJoining: '2023-01-15',
    dateOfBirth: '1993-07-22',
    address: 'Koramangala 4th Block, Bengaluru, 560034',
    nationality: 'Indian',
    gender: 'Female',
    personalEmail: 'anita.sharma93@gmail.com',
    maritalStatus: 'Married',
    bankDetails: {
      bankName: 'State Bank of India',
      accountNumber: '30987654321',
      ifscCode: 'SBIN0001234',
      panNo: 'PQRST3456U',
      uanNo: '100900800703',
      empCode: 'OIANSH20230002'
    },
    salaryConfig: {
      monthWage: 70000,
      workingDaysPerWeek: 5,
      breakTimeHrs: 1.0
    },
    skills: ['Cypress', 'Playwright', 'Jest', 'Selenium', 'CI/CD'],
    certifications: ['ISTQB Certified Tester Advanced Level'],
    leaveBalance: {
      paidLeaveDays: 24,
      paidLeaveUsed: 2,
      sickLeaveDays: 7,
      sickLeaveUsed: 0,
      unpaidLeaveDays: 0
    },
    textBlocks: {
      about: 'Ensuring absolute software quality, performance stability, and security standards.',
      loveJob: 'Finding edge cases before users do.',
      hobbies: 'Puzzle solving, trekking, and badminton.'
    }
  },
  {
    id: 'OIALRI20220003',
    name: 'Alex Rivera',
    role: 'DevOps & Infrastructure Engineer',
    department: 'Infrastructure',
    companyName: 'Odoo India',
    status: 'absent',
    email: 'alex.r@dayflow.io',
    phone: '+91 98765 11223',
    location: 'Remote (Goa)',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    dateOfJoining: '2022-03-20',
    dateOfBirth: '1991-09-03',
    address: 'Panaji, Goa, 403001',
    nationality: 'Indian',
    gender: 'Male',
    personalEmail: 'alex.devops@gmail.com',
    maritalStatus: 'Single',
    bankDetails: {
      bankName: 'HDFC Bank',
      accountNumber: '50100987654321',
      ifscCode: 'HDFC0000240',
      panNo: 'VWXYZ7890A',
      uanNo: '100900800704',
      empCode: 'OIALRI20220003'
    },
    salaryConfig: {
      monthWage: 75000,
      workingDaysPerWeek: 5,
      breakTimeHrs: 1.0
    },
    skills: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions'],
    certifications: ['Certified Kubernetes Administrator (CKA)'],
    leaveBalance: {
      paidLeaveDays: 24,
      paidLeaveUsed: 6,
      sickLeaveDays: 7,
      sickLeaveUsed: 1,
      unpaidLeaveDays: 1
    },
    textBlocks: {
      about: 'Automating deployment pipelines and maintaining 99.99% infrastructure uptime.',
      loveJob: 'Building robust cloud architecture.',
      hobbies: 'Surfing, music production, and gaming.'
    }
  }
];

export const INITIAL_ATTENDANCE_LOGS = [
  {
    date: '2026-08-22',
    employeeId: 'OIPRDI20230001',
    employeeName: 'Prannoy Didymus J',
    checkIn: '09:00 AM',
    checkOut: 'In Progress',
    workHours: '04:30',
    extraHours: '00:00',
    status: 'Present'
  },
  {
    date: '2026-08-22',
    employeeId: 'OISAJE20210001',
    employeeName: 'Sarah Jenkins',
    checkIn: '08:45 AM',
    checkOut: 'In Progress',
    workHours: '04:45',
    extraHours: '00:00',
    status: 'Present'
  },
  {
    date: '2026-08-22',
    employeeId: 'OIRAKU20220001',
    employeeName: 'Rajesh Kumar',
    checkIn: '--:--',
    checkOut: '--:--',
    workHours: '00:00',
    extraHours: '00:00',
    status: 'On Leave'
  },
  {
    date: '2026-08-22',
    employeeId: 'OIANSH20230002',
    employeeName: 'Anita Sharma',
    checkIn: '09:15 AM',
    checkOut: 'In Progress',
    workHours: '04:15',
    extraHours: '00:00',
    status: 'Present'
  },
  {
    date: '2026-08-22',
    employeeId: 'OIALRI20220003',
    employeeName: 'Alex Rivera',
    checkIn: '--:--',
    checkOut: '--:--',
    workHours: '00:00',
    extraHours: '00:00',
    status: 'Absent'
  },
  {
    date: '2026-08-21',
    employeeId: 'OIPRDI20230001',
    employeeName: 'Prannoy Didymus J',
    checkIn: '10:00',
    checkOut: '19:00',
    workHours: '09:00',
    extraHours: '01:00',
    status: 'Present'
  },
  {
    date: '2026-08-21',
    employeeId: 'OISAJE20210001',
    employeeName: 'Sarah Jenkins',
    checkIn: '09:45',
    checkOut: '19:15',
    workHours: '09:30',
    extraHours: '01:30',
    status: 'Present'
  }
];

export const INITIAL_LEAVE_REQUESTS = [
  {
    id: 'LEAVE-1001',
    employeeId: 'OIRAKU20220001',
    employeeName: 'Rajesh Kumar',
    type: 'Paid Leave',
    startDate: '2026-08-22',
    endDate: '2026-08-24',
    totalDays: 3,
    status: 'Approved',
    submittedDate: '2026-08-18',
    remarks: 'Attending family function in Mumbai.',
    hrComments: 'Approved by HR Manager.',
    attachmentName: 'leave_application.pdf'
  },
  {
    id: 'LEAVE-1002',
    employeeId: 'OIALRI20220003',
    employeeName: 'Alex Rivera',
    type: 'Sick Leave',
    startDate: '2026-08-25',
    endDate: '2026-08-26',
    totalDays: 2,
    status: 'Pending',
    submittedDate: '2026-08-21',
    remarks: 'Dental surgery appointment.',
    hrComments: '',
    attachmentName: 'doctor_note.pdf'
  },
  {
    id: 'LEAVE-1003',
    employeeId: 'OIPRDI20230001',
    employeeName: 'Prannoy Didymus J',
    type: 'Paid Leave',
    startDate: '2026-09-10',
    endDate: '2026-09-12',
    totalDays: 3,
    status: 'Pending',
    submittedDate: '2026-08-20',
    remarks: 'Annual leave request for personal travel.',
    hrComments: '',
    attachmentName: ''
  }
];

export const PUBLIC_HOLIDAYS_2026 = [
  { date: 'Jan 14, 2026', name: 'Kite Festival', type: 'Festival' },
  { date: 'Jan 26, 2026', name: 'Republic Day', type: 'National' },
  { date: 'Mar 4, 2026', name: 'Dhuleti', type: 'Festival' },
  { date: 'Aug 15, 2026', name: 'Independence Day', type: 'National' },
  { date: 'Aug 28, 2026', name: 'Rakhi', type: 'Festival' },
  { date: 'Oct 2, 2026', name: 'Gandhi Jayanti', type: 'National' },
  { date: 'Nov 8, 2026', name: 'Diwali', type: 'Festival' },
  { date: 'Nov 10, 2026', name: 'New Year', type: 'Regional' },
  { date: 'Nov 11, 2026', name: 'Bhai Duj', type: 'Regional' }
];

export function calculateSalaryBreakdown(monthWage) {
  const wage = Number(monthWage) || 50000;

  // Components as specified in Wireframe 3 & 4
  const basicSalary = Math.round(wage * 0.50); // 50.00% of wage
  const hra = Math.round(basicSalary * 0.50);   // 50.00% of basic salary
  const standardAllowance = Math.round(basicSalary * 0.1667); // 16.67% of basic
  const performanceBonus = Math.round(basicSalary * 0.0833);   // 8.33% of basic
  const lta = Math.round(basicSalary * 0.0833);                // 8.33% of basic

  const allocated = basicSalary + hra + standardAllowance + performanceBonus + lta;
  const fixedAllowance = Math.max(0, wage - allocated);

  // PF & Tax Deductions
  const pfEmployee = Math.min(3000, Math.round(basicSalary * 0.12)); // 12% of basic
  const pfEmployer = pfEmployee;
  const professionalTax = 200; // Fixed 200/month as defined in wireframe
  const totalDeductions = pfEmployee + professionalTax;
  const netPayable = Math.max(0, wage - totalDeductions);

  return {
    monthWage: wage,
    basicSalary,
    hra,
    standardAllowance,
    performanceBonus,
    lta,
    fixedAllowance,
    pfEmployee,
    pfEmployer,
    professionalTax,
    totalDeductions,
    netPayable
  };
}

export const HOURLY_PROJECT_ROADMAP = [
  {
    hour: 'Hour 1',
    title: 'Architecture & Corporate Theme System Setup',
    status: 'Completed',
    deliverables: ['Configured React 19 + Tailwind CSS build pipeline.', 'Implemented high-density White & Sky-Blue palette.']
  },
  {
    hour: 'Hour 2',
    title: 'Employee Directory & Custom Status Indicators',
    status: 'Completed',
    deliverables: ['Created card grid & list view toggle.', 'Added Green dot (Present), Airplane (On Leave), Yellow dot (Absent).']
  },
  {
    hour: 'Hour 3',
    title: 'Role Access Control & View Mode Segmentation',
    status: 'Completed',
    deliverables: ['Implemented View-Only mode for employee cards.', 'Added Form View mode for logged-in user My Profile.']
  },
  {
    hour: 'Hour 4',
    title: 'Attendance Telemetry & Check-In Widget',
    status: 'Completed',
    deliverables: ['Added real-time header timer for checked-in status.', 'Calculated daily work hours and overtime.']
  },
  {
    hour: 'Hour 5',
    title: 'Time-Off Leave Management & HR Approvals',
    status: 'Completed',
    deliverables: ['Built leave request modal and allowance breakdown.', 'Added HR approval/rejection commentary controls.']
  },
  {
    hour: 'Hour 6',
    title: 'Salary Info & Compensation Breakdown',
    status: 'Completed',
    deliverables: ['Implemented Admin-only Salary Info tab.', 'Structured Basic, HRA, Standard Allowance, PF, and Tax components.']
  },
  {
    hour: 'Hour 7',
    title: 'Performance Management & OKR System',
    status: 'Completed',
    deliverables: ['Created performance review radar & progress trackers.', 'Added goal tracking and rating rubrics.']
  },
  {
    hour: 'Hour 8',
    title: 'Final QA, Analytics Telemetry & Payslip Generation',
    status: 'Completed',
    deliverables: ['Built dynamic payslip view modal.', 'Finalized corporate UI audit across all modules.']
  }
];


