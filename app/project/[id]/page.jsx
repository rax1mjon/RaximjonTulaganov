import { notFound } from 'next/navigation';
import ProjectPage, { projectMetadata } from '@/components/site/ProjectPage';
import { projects } from '@/data/content';

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return projectMetadata(id, 'uz');
}

export default async function Page({ params }) {
  const { id } = await params;
  if (!projects.some((p) => p.id === id)) notFound();
  return <ProjectPage id={id} lang="uz" />;
}
