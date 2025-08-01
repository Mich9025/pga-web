
import { getProjectBySlug } from "@/lib/wordpress";
import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import ProjectClient from "./ProjectClient";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;      
    
    const project = await getProjectBySlug(slug);
    
    if (!project) {
      return {
        title: "Proyecto no encontrado",
        description: "El proyecto solicitado no existe."
      };
    }

    return {
      title: `${project.title?.rendered} | PGA Proyectos`,
      description: project.content?.rendered?.replace(/<[^>]*>/g, '').substring(0, 160) || `Descubre ${project.title?.rendered}, un proyecto exclusivo de PGA.`,
      openGraph: {
        title: project.title?.rendered,
        description: project.content?.rendered?.replace(/<[^>]*>/g, '').substring(0, 160),
        images: project.featured_media_url ? [{
          url: project.featured_media_url,
          width: 1200,
          height: 630,
          alt: project.title?.rendered
        }] : [],
        url: `/proyectos/${slug}`,
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: project.title?.rendered,
        description: project.content?.rendered?.replace(/<[^>]*>/g, '').substring(0, 160),
        images: project.featured_media_url ? [project.featured_media_url] : []
      },
      keywords: [
        project.title?.rendered,
        'PGA',
        'proyectos inmobiliarios',
        'apartamentos',
        'vivienda',
        project.meta?.ubicacion_exacta
      ].filter(Boolean).join(', ')
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Error | PGA Proyectos",
      description: "Ha ocurrido un error al cargar el proyecto."
    };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const { slug } = await params;        
    
    const project = await getProjectBySlug(slug);
    
    if (!project) {
      notFound();
    }

    return <ProjectClient project={project} />;
  } catch (error) {
    console.error('Error loading project:', error);
    notFound();
  }
}
