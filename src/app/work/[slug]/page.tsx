import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/projects";
import {
  Meta,
  Schema,
  Column,
  Flex,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Line,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const project = await getProjectBySlug(slugPath);

  if (!project) return {};

  return Meta.generate({
    title: project.title,
    description: project.summary,
    baseURL: baseURL,
    image: project.coverImage || `/api/og/generate?title=${project.title}`,
    path: `${work.path}/${project.slug}`,
  });
}

import { ProjectContent } from "@/components/work/ProjectContent";

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const project = await getProjectBySlug(slugPath);

  if (!project) {
    notFound();
  }

  return (
    <ProjectContent project={project}>
      <Column as="section" maxWidth="m" horizontal="center" gap="l">
        <Schema
          as="blogPosting"
          baseURL={baseURL}
          path={`${work.path}/${project.slug}`}
          title={project.title}
          description={project.summary}
          datePublished={project.publishedAt}
          dateModified={project.publishedAt}
          image={project.coverImage || `/api/og/generate?title=${encodeURIComponent(project.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Column maxWidth="s" gap="16" horizontal="center" align="center">
          <SmartLink href="/work">
            <Text variant="label-strong-m">Proyectos</Text>
          </SmartLink>
          <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
            {project.publishedAt && formatDate(project.publishedAt)}
          </Text>
          <Heading variant="display-strong-m">{project.title}</Heading>
        </Column>
        <Row marginBottom="32" horizontal="center">
          {project.link && (
            <SmartLink href={project.link}>
              <Text variant="label-default-m" onBackground="brand-weak">
                Ver proyecto →
              </Text>
            </SmartLink>
          )}
        </Row>
        {project.coverImage && (
          <Media
            priority
            aspectRatio="16 / 9"
            radius="m"
            alt={project.title}
            src={project.coverImage}
            style={{
              height: '450px',
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
          />
        )}
        <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
          <CustomMDX source={project.content} />
        </Column>
        <Column fillWidth gap="40" horizontal="center" marginTop="40">
          <Line maxWidth="40" />
          <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
            Proyectos relacionados
          </Heading>
          <Projects exclude={[project.slug]} range={[1, 2]} />
        </Column>
        <ScrollToHash />
      </Column>
    </ProjectContent>
  );
}
