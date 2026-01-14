import { getProjects } from "@/lib/projects";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export async function Projects({ range, exclude }: ProjectsProps) {
  // Obtener proyectos desde Appwrite
  const allProjects = await getProjects();

  // Excluir proyectos por slug
  let filteredProjects = allProjects;
  if (exclude && exclude.length > 0) {
    filteredProjects = allProjects.filter((project) => !exclude.includes(project.slug));
  }

  // Aplicar rango si se especifica
  const displayedProjects = range
    ? filteredProjects.slice(range[0] - 1, range[1] ?? filteredProjects.length)
    : filteredProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((project, index) => (
        <ProjectCard
          priority={index < 2}
          key={project.$id}
          href={`/work/${project.slug}`}
          images={project.images || [project.coverImage]}
          title={project.title}
          description={project.summary}
          content={project.content}
          avatars={[]} // Team members se pueden agregar después
          link={project.link || ""}
        />
      ))}
    </Column>
  );
}
