export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    items: ['Java', 'Python', 'C', 'SQL', 'JavaScript'],
  },
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    title: 'Backend',
    items: ['Spring Boot', 'Django REST Framework', 'Flask', 'FastAPI'],
  },
  {
    title: 'Data & AI',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'XGBoost', 'SHAP', 'Google Gemini API'],
  },
  {
    title: 'Tools & Platforms',
    items: ['MySQL', 'PostgreSQL', 'Google Sheets', 'Git', 'GitHub', 'Docker'],
  },
];

export const competitive = [
  { name: 'LeetCode', value: '170+ problems', url: 'https://leetcode.com/u/vamshi_bejjanki_/' },
  { name: 'CodeChef', value: '420+ problems', url: 'https://www.codechef.com/users/bejjankivamshi' },
  { name: 'HackerRank', value: '449 hackos', url: 'https://www.hackerrank.com/profile/vamshibejjanki' },
];
