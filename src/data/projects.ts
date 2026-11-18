export type Project = {
  id: string;
  name: string;
  summary: string;
  /** Only set when the project has a real contribution statement. */
  contribution?: string;
  tags: string[];
  github: string;
  /** Only set when a live deployment exists. */
  live?: string;
  /** Local screenshot paths (under /public). Only real app screenshots. */
  screenshots?: string[];
  /** Used for the two featured case-study layouts. */
  featured?: boolean;
  caseStudy?: {
    problem: string;
    solution: string;
    result: string;
    features: string[];
  };
};

export const projects: Project[] = [
  {
    id: 'mithrogo',
    name: 'MithrGO — Ride-Hailing Platform',
    summary:
      'A single-city ride-hailing platform for bike and auto rides, with a Flutter customer app, a Django REST backend and a Next.js admin console. Captains choose between a daily plan and a ride-share plan instead of a per-ride commission.',
    contribution:
      'Built the customer app screens and navigation, integrated OTP and JWT authentication with the API, implemented map-based pickup and destination with nearby search, and debugged authentication and backend setup issues.',
    tags: ['Flutter', 'Dart', 'Django REST Framework', 'PostgreSQL', 'Next.js', 'OpenStreetMap'],
    github: 'https://github.com/Vamshi-Bejjanki/mithrogo_rideplatform',
    featured: true,
    caseStudy: {
      problem:
        'Short bike and auto trips are hard to book reliably, and percentage commissions reduce what captains keep from each fare.',
      solution:
        'A platform with OTP sign-in, GPS-based booking on OpenStreetMap, a nearby search boundary of 30 km with a 25% margin and up to 40 results, and two captain plans: a 12-hour daily session (Bike ₹30, Auto ₹50) or a ride-share plan where one ride per day from the first five rides goes to the platform.',
      result:
        'A working MVP across the backend, customer app and admin console. The captain app, a live payment gateway, live tracking and production map SDK are not built yet.',
      features: [
        'OTP sign-in with JWT-authenticated API calls',
        'GPS pickup and destination selection with Flutter Map and Geolocator',
        'Ride lifecycle from REQUESTED to COMPLETED, with captain matching',
        'Admin console for customers, captains, rides, plans and payments',
      ],
    },
  },
  {
    id: 'purplle',
    name: 'Purplle Store Intelligence',
    summary:
      'AI retail analytics from CCTV footage. YOLOv8 detects people, ByteTrack keeps visitor IDs across frames, and a FastAPI service stores events and serves metrics, funnels, heatmaps and anomaly endpoints.',
    contribution:
      'Built the detection and tracking pipeline, the event generation and ingestion scripts, the FastAPI service with SQLite storage, and the Docker setup.',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'ByteTrack', 'FastAPI', 'SQLite', 'Docker'],
    github: 'https://github.com/Vamshi-Bejjanki/store-intelligence',
    featured: true,
    caseStudy: {
      problem:
        'Offline stores have no structured visitor analytics. Footfall, zone visits and conversion can only be answered by reviewing video by hand.',
      solution:
        'A pipeline that detects and tracks people, converts tracks into zone and billing events, ingests them through POST /events/ingest, and exposes analytics endpoints for metrics, funnel, heatmap and anomalies.',
      result:
        'Detection, tracking, event generation, ingestion, the API and Docker are verified. Re-identification, staff detection, queue abandonment and several analytics calculations are still unverified.',
      features: [
        'YOLOv8 Nano person detection on CCTV clips',
        'ByteTrack visitor tracking with persistent IDs',
        'Structured entry, zone and billing events',
        'FastAPI endpoints for metrics, funnel, heatmap and anomalies',
      ],
    },
  },
  {
    id: 'eems',
    name: 'Employee Expense Management System',
    summary:
      'A full-stack expense claim system with role-based access for employees, managers, accounts and admins. Claims move through a multi-level approval workflow from draft to paid, with a recorded status history.',
    contribution:
      'Worked across the voucher and approval workflow on the Spring Boot side, the database design behind it, and the React screens that call the REST APIs.',
    tags: ['Java 17', 'Spring Boot', 'React 18', 'MySQL', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/Vamshi-Bejjanki/Employee_Expense_Management_System',
    featured: true,
    caseStudy: {
      problem:
        'Expense claims moved through emails and spreadsheets, so employees could not track status, managers lost track of approvals, and finance had no reliable list of what was approved or paid.',
      solution:
        'A parent-child voucher model with several expense lines, a workflow through DRAFT, PENDING, APPROVED or REJECTED, and PAID, separate approval records and a status history table, and role-specific controllers and screens.',
      result:
        'Voucher, approval, resubmission and payment workflows are implemented across four roles. Excel export is in progress and JWT authentication is planned.',
      features: [
        'Multi-line vouchers with draft save and submit',
        'Manager approval and rejection with comments',
        'Resubmission flow and approval history',
        'Accounts view for approved vouchers and payment status',
      ],
    },
  },
  {
    id: 'resume',
    name: 'Resume Analyser',
    summary:
      'An AI resume reviewer. Google Gemini scores a resume against an ATS-style rubric for the roles entered, returns strengths, gaps and suggestions, and lists matching jobs through the Adzuna API.',
    contribution:
      'Developed the full-stack application: the Spring Boot backend, the Gemini analysis service and its scoring prompt, sign-in and email flows, the React frontend and the deployment setup.',
    tags: ['Spring Boot', 'React 19', 'Google Gemini', 'MySQL', 'JWT', 'Docker'],
    github: 'https://github.com/Vamshi-Bejjanki/Resume_Analyser',
    live: 'https://resume-analyser-kp0f.onrender.com/',
    screenshots: [
      '/assets/projects/resume-analyser/1.png',
      '/assets/projects/resume-analyser/2.png',
      '/assets/projects/resume-analyser/3.png',
      '/assets/projects/resume-analyser/4.png',
      '/assets/projects/resume-analyser/5.png',
      '/assets/projects/resume-analyser/6.png',
    ],
    featured: true,
    caseStudy: {
      problem:
        'Candidates cannot easily tell how well a resume fits a target role, or what to change before applying.',
      solution:
        'The backend sends the resume text and target roles to Gemini with a rubric covering contact details, summary, skills, education, keywords, formatting and role match. The response is structured JSON that the app displays with the Adzuna job listings.',
      result:
        'Live on Render, with Google sign-in, email verification and password reset through Brevo, and saved analysis history per user. No usage figures are claimed.',
      features: [
        'Overall score and ATS-optimisation score',
        'Strengths, weaknesses and suggestions per role',
        'Job listings for the entered role',
        'Google sign-in, verified email accounts and password reset',
      ],
    },
  },
  {
    id: 'feature-importance',
    name: 'Feature Importance & Correlation Analysis',
    summary:
      'An interactive web app for uploading a dataset and getting correlation analysis, Random Forest and permutation importance, SHAP explanations and optional model training.',
    contribution:
      'Built the Flask backend and analysis routes, connected them to the page templates, and worked on the correlation, feature-importance, permutation and SHAP outputs the interface displays.',
    tags: ['Python', 'Flask', 'scikit-learn', 'XGBoost', 'SHAP', 'Pandas'],
    github:
      'https://github.com/Vamshi-Bejjanki/Interactive-Web-App-for-Feature-Importance-Correlation-Analysis',
  },
  {
    id: 'todolist',
    name: 'To-Do List Web Application',
    summary:
      'A Java task manager with user authentication, CRUD operations and persistent MySQL storage, built on Servlets, JSP and Maven.',
    tags: ['Java', 'JSP', 'Servlets', 'MySQL', 'Maven'],
    github: 'https://github.com/Vamshi-Bejjanki/TodoList',
  },
  {
    id: 'student-dashboard',
    name: 'Interactive Student Dashboard',
    summary:
      'An analytics dashboard for visualising student performance and personality traits with interactive charts, a leaderboard and JSON-based data.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Plotly.js', 'JSON'],
    github: 'https://github.com/Vamshi-Bejjanki/Student-Dashboard',
  },
];
