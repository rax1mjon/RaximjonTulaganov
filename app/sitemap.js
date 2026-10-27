import { projects } from '@/data/content';
import { SITE_URL as BASE_URL } from '@/lib/site';

export default function sitemap() {
  const now = new Date();
  const pages = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/en`, changeFrequency: 'weekly', priority: 0.9 },
  ];
  projects.forEach((p) => {
    pages.push({ url: `${BASE_URL}/project/${p.id}`, changeFrequency: 'monthly', priority: 0.8 });
    pages.push({ url: `${BASE_URL}/en/project/${p.id}`, changeFrequency: 'monthly', priority: 0.7 });
  });
  return pages.map((x) => ({ ...x, lastModified: now }));
}
