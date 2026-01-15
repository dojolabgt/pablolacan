import { Column, Flex, Heading, Text } from "@once-ui-system/core";

const services = [
    {
        title: "Identidad Gráfica",
        description: "Creación de identidades visuales únicas que reflejan la esencia de tu marca.",
        icon: "✦",
    },
    {
        title: "Diseño Web",
        description: "Desarrollo de sitios web modernos, funcionales y optimizados para todos los dispositivos.",
        icon: "⚡",
    },
    {
        title: "Diseño Gráfico",
        description: "Soluciones creativas para todo tipo de necesidades visuales y comunicación.",
        icon: "◆",
    },
];

export function Services() {
    return (
        <Column fillWidth gap="24" marginBottom="16" paddingX="l">
            <Heading
                as="h2"
                variant="heading-strong-l"
                align="center"
            >
                Servicios
            </Heading>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "20px",
                    width: "100%",
                }}
            >
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-card"
                        style={{
                            padding: "20px",
                            borderRadius: "12px",
                            border: "1px solid var(--neutral-alpha-weak)",
                            backgroundColor: "var(--page-background)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <Flex direction="column" gap="12">
                            <Text
                                variant="heading-strong-xl"
                                style={{ fontSize: "1.5rem", lineHeight: "1" }}
                            >
                                {service.icon}
                            </Text>
                            <Heading as="h3" variant="heading-strong-s">
                                {service.title}
                            </Heading>
                            <Text
                                variant="body-default-s"
                                onBackground="neutral-weak"
                                style={{ lineHeight: "1.5" }}
                            >
                                {service.description}
                            </Text>
                        </Flex>
                    </div>
                ))}
            </div>
        </Column>
    );
}
