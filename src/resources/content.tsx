import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Pablo",
  lastName: "Lacán",
  name: `Pablo Lacán`,
  role: "Diseñador Gráfico y Web",
  avatar: "/photo.webp",
  email: "contact@pablolacan.com",
  location: "America/Guatemala", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Español", "English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Suscríbete al Newsletter de {person.firstName}</>,
  description: <>Mi newsletter semanal sobre creatividad y diseño</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/pablolacan",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/pablolacan/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/pablolacan/",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Creando experiencias digitales excepcionales</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      Soy Pablo, un diseñador gráfico y web especializado en crear <Text as="span" size="xl" weight="strong">identidades visuales memorables</Text>. <br /> Diseño de logotipos, desarrollo web con WordPress, Headless CMS y Next.js.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Acerca de",
  title: `Acerca de – ${person.name}`,
  description: `Conoce a ${person.name}, ${person.role} de ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introducción",
    description: (
      <>
        Pablo es un diseñador gráfico y web con sede en Guatemala, especializado en crear identidades visuales
        memorables y experiencias digitales excepcionales. Su trabajo abarca desde diseño de logotipos e identidad
        gráfica hasta desarrollo web con WordPress, Headless CMS y tecnologías modernas.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Experiencia Laboral",
    experiences: [
      {
        company: "Universidad Galileo",
        timeframe: "2017 - Presente",
        role: "Productor Audiovisual",
        achievements: [
          <>
            Producción y dirección de contenido audiovisual para la universidad,
            incluyendo videos institucionales, educativos y promocionales.
          </>,
          <>
            Gestión de proyectos multimedia y coordinación de equipos creativos
            para la creación de material visual de alta calidad.
          </>,
        ],
        images: [],
      },
      {
        company: "Freelance",
        timeframe: "2023 - Presente",
        role: "Diseñador Gráfico y Web",
        achievements: [
          <>
            Diseño de identidades gráficas completas, incluyendo logotipos, manuales de marca
            y aplicaciones visuales para diversos clientes.
          </>,
          <>
            Desarrollo de sitios web con WordPress, Headless CMS (Directus) y Next.js,
            enfocados en experiencia de usuario y diseño visual impactante.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Educación",
    institutions: [
      {
        name: "Universidad Galileo",
        description: <>Licenciatura en Comunicación y Diseño (2023 - Actualidad)</>,
      },
      {
        name: "Autodidacta",
        description: <>Aprendizaje continuo en diseño web, desarrollo frontend y nuevas tecnologías.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Habilidades Técnicas",
    skills: [
      {
        title: "Diseño Gráfico",
        description: (
          <>Creación de identidades visuales, logotipos y diseño gráfico profesional utilizando Adobe Creative Suite.</>
        ),
        tags: [
          {
            name: "Photoshop",
            icon: "photoshop",
          },
          {
            name: "Illustrator",
            icon: "illustrator",
          },
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        images: [],
      },
      {
        title: "Desarrollo Web",
        description: (
          <>Desarrollo de sitios web con WordPress, Headless CMS (Directus) y Next.js, enfocados en diseño y experiencia de usuario.</>
        ),
        tags: [
          {
            name: "WordPress",
            icon: "wordpress",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Directus",
            icon: "database",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Escribiendo sobre diseño y tecnología...",
  description: `Lee lo que ${person.name} ha estado haciendo recientemente`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Proyectos",
  title: `Proyectos – ${person.name}`,
  description: `Proyectos de diseño y desarrollo por ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
