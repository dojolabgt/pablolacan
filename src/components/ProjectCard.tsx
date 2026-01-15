"use client";

import {
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Media,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  description: string;
  link: string;
  tags?: string[];
  compact?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  description,
  link,
  tags = [],
  priority = false,
  compact = false,
}) => {
  const coverImage = images[0] || "/images/placeholder.jpg";

  return (
    <SmartLink
      href={href}
      style={{ textDecoration: "none", width: "100%" }}
    >
      <Column
        fillWidth
        gap={compact ? "12" : "16"}
        className="project-card"
        style={{
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            borderRadius: "12px",
          }}
        >
          <Media
            priority={priority}
            aspectRatio={compact ? "21 / 9" : "16 / 9"}
            radius="m"
            alt={title}
            src={coverImage}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            className="project-card-image"
          />
        </div>

        {/* Content */}
        <Flex
          fillWidth
          direction="column"
          gap={compact ? "8" : "12"}
          paddingX="4"
        >
          <Heading as="h3" variant={compact ? "heading-strong-m" : "heading-strong-l"}>
            {title}
          </Heading>

          {description && (
            <Text
              variant="body-default-s"
              onBackground="neutral-weak"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: compact ? 1 : 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </Text>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && !compact && (
            <Flex wrap gap="8" marginTop="4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="project-tag"
                  style={{
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    backgroundColor: "var(--accent-light)",
                    color: "var(--accent)",
                    border: "1px solid var(--accent-alpha-weak)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </Flex>
          )}

          {link && !compact && (
            <Flex marginTop="4">
              <Text
                variant="label-default-s"
                onBackground="brand-weak"
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                Ver proyecto →
              </Text>
            </Flex>
          )}
        </Flex>
      </Column>
    </SmartLink>
  );
};

