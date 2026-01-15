import { getProjects } from "@/lib/projects";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  compact?: boolean;
}

export async function Projects({ range, exclude, compact = false }: ProjectsProps) {
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

  // Layout compacto para home (1 columna)
  if (compact) {
    return (
      <Column fillWidth gap="24" marginBottom="40" paddingX="l">
        {displayedProjects.map((project, index) => (
          <ProjectCard
            priority={index < 2}
            key={project.$id}
            href={`/work/${project.slug}`}
            images={project.images || [project.coverImage]}
            title={project.title}
            description={project.summary}
            link={project.link || ""}
            tags={project.tags}
            compact={true}
          />
        ))}
      </Column>
    );
  }

  // Layout grid para página de proyectos (2 columnas)
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
        gap: "32px",
        width: "100%",
        marginBottom: "40px",
        paddingLeft: "var(--static-space-l)",
        paddingRight: "var(--static-space-l)",
      }}
    >
      {displayedProjects.map((project, index) => (
        <ProjectCard
          priority={index < 2}
          key={project.$id}
          href={`/work/${project.slug}`}
          images={project.images || [project.coverImage]}
          title={project.title}
          description={project.summary}
          link={project.link || ""}
          tags={project.tags}
        />
      ))}
    </div>
  );
}
