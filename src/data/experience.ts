export type ExperienceItem = {
  role: string;
  organisation: string;
  /** Years as published on the resume; no months are invented. */
  duration: string;
  responsibilities: string[];
  tags: string[];
  proof?: string;
};

export const experience: ExperienceItem[] = [
  {
    role: 'Data Analyst Intern',
    organisation: 'DeepThought',
    duration: '2024',
    responsibilities: [
      'Designed dashboards and automated data tracking workflows.',
      'Supported data-driven decision-making across multiple teams with KPI monitoring.',
    ],
    tags: ['Python', 'Pandas', 'Google Sheets', 'Dashboards', 'Automation'],
    proof: 'https://drive.google.com/file/d/1So_Lh5Y9z46rMYYKEPC2L14DaQUEbSwK/view',
  },
  {
    role: 'Data Analyst Intern',
    organisation: 'Cognifyz Technologies',
    duration: '2024',
    responsibilities: [
      'Analysed datasets to extract insights and performed data cleaning.',
      'Created visual reports with practical exposure to business-oriented analytics.',
    ],
    tags: ['Python', 'NumPy', 'Pandas', 'Data Visualisation'],
    proof: 'https://drive.google.com/file/d/1vckZmE2Jxghju-K2YtBZd0YzyHKmX04Z/view',
  },
  {
    role: 'Web Development Trainee',
    organisation: 'Microsoft Learn Student Ambassador',
    duration: '2023',
    responsibilities: [
      'Completed hands-on training in building responsive, interactive web pages with modern frontend technologies.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    proof: 'https://drive.google.com/file/d/1_iIuvdsKPGsWQp6n6gdaUBs14hi8z_Ob/view',
  },
];
