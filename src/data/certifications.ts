export const primaryCertificate = {
  name: 'Google AI Professional Certificate',
  issuer: 'Google',
  platform: 'Coursera',
  date: 'November 13, 2026',
  credentialId: 'NWIO3J0REBP3',
  verifyUrl: 'https://coursera.org/verify/professional-cert/NWIO3J0REBP3',
  courses: [
    'AI Fundamentals',
    'AI for Brainstorming and Planning',
    'AI for Research and Insights',
    'AI for Writing and Communicating',
    'AI for Content Creation',
    'AI for Data Analysis',
    'AI for App Building',
    'AI for App Deployment',
  ],
};

export type Credential = {
  name: string;
  issuer: string;
  url: string;
};

export const credentials: Credential[] = [
  {
    name: 'DSA using Java',
    issuer: 'NPTEL',
    url: 'https://drive.google.com/file/d/111oAQRZt3txIgbJkwQOwVZ-wS3m4XyZt/view?usp=drive_link',
  },
  {
    name: 'Java Full Stack',
    issuer: 'Wipro TalentNext',
    url: 'https://drive.google.com/file/d/1b5zBgeNQBt3Gp9gn9O55k8xSRacVL078/view?usp=drive_link',
  },
  {
    name: 'Data Science using Python',
    issuer: 'NSIC',
    url: 'https://drive.google.com/file/d/1Ngh0WERl-axXFbJmnD-XMffJNxOHOtJN/view?usp=drive_link',
  },
  {
    name: 'Python Data Analysis with Pandas',
    issuer: 'Kaggle',
    url: 'https://drive.google.com/file/d/1L5mrZOELVXyWyOMHw6_3YVpIRkR6Q11Q/view?usp=drive_link',
  },
  {
    name: 'Azure Fundamentals',
    issuer: 'Simplilearn (Microsoft)',
    url: 'https://drive.google.com/file/d/1hPH6Ye7R7GmCNGf6NsrTLYE1yL7WRup-/view?usp=drive_link',
  },
  {
    name: 'Intro to Cloud Computing',
    issuer: 'Simplilearn',
    url: 'https://drive.google.com/file/d/1rY19t8WDoMzZwdZHI7VOUaPe1RNuV3-p/view?usp=drive_link',
  },
  {
    name: 'Decision Trees using Python',
    issuer: 'Infosys',
    url: 'https://drive.google.com/file/d/1-9cs7ac2VwYMTmhXZYndk3bIjFHbwE4z/view?usp=drive_link',
  },
  {
    name: 'AI Agents for Beginners',
    issuer: 'Simplilearn',
    url: 'https://drive.google.com/file/d/1guD489fHdyCjByihf3iWqaydy9q7BBdD/view?usp=drive_link',
  },
];
