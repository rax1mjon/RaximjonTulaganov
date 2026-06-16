import { portfolioData } from '@/data/portfolioData';

const BASE_URL = 'https://raximjon-tulaganov.vercel.app';

export default function sitemap() {
  const projectUrls = portfolioData.projects.map((project) => ({
    url: `${BASE_URL}/project/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
