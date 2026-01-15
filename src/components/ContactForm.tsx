"use client";

import { useState } from "react";
import { Column, Heading, Text, Input, Button } from "@once-ui-system/core";

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        contactMethod: "email",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Form data:", formData);
            setStatus("success");
            setFormData({
                name: "",
                email: "",
                phone: "",
                contactMethod: "email",
                message: "",
            });
        } catch (error) {
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Column
            fillWidth
            maxWidth="m"
            gap="8"
            padding="16"
            radius="m"
            border="neutral-alpha-weak"
            background="page"
            style={{ margin: "0 auto" }}
        >
            <Column gap="4" align="center">
                <Heading as="h2" variant="heading-strong-m">
                    Contacto
                </Heading>
                <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                    ¿Tienes un proyecto en mente? Escríbeme y conversemos.
                </Text>
            </Column>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {/* Nombre */}
                    <div>
                        <label htmlFor="name" style={{ fontSize: "0.8rem", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                            Nombre
                        </label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email y Teléfono en grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        <div>
                            <label htmlFor="email" style={{ fontSize: "0.8rem", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                                Correo
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" style={{ fontSize: "0.8rem", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                                Teléfono
                            </label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Forma de contacto */}
                    <div>
                        <label htmlFor="contactMethod" style={{ fontSize: "0.8rem", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                            Forma de contacto preferida
                        </label>
                        <select
                            id="contactMethod"
                            name="contactMethod"
                            value={formData.contactMethod}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: "8px",
                                border: "1px solid var(--neutral-alpha-weak)",
                                backgroundColor: "var(--page-background)",
                                fontSize: "0.875rem",
                                fontFamily: "inherit",
                                cursor: "pointer",
                            }}
                        >
                            <option value="email">Email</option>
                            <option value="phone">Teléfono</option>
                            <option value="whatsapp">WhatsApp</option>
                        </select>
                    </div>

                    {/* Mensaje */}
                    <div>
                        <label htmlFor="message" style={{ fontSize: "0.8rem", fontWeight: "500", display: "block", marginBottom: "4px" }}>
                            Mensaje
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            required
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: "8px",
                                border: "1px solid var(--neutral-alpha-weak)",
                                backgroundColor: "var(--page-background)",
                                fontSize: "0.875rem",
                                fontFamily: "inherit",
                                resize: "vertical",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    {/* Botón de envío */}
                    <Button
                        type="submit"
                        variant="primary"
                        size="l"
                        fillWidth
                        disabled={status === "loading"}
                        style={{ marginTop: "4px" }}
                    >
                        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                    </Button>

                    {/* Mensajes de estado */}
                    {status === "success" && (
                        <Text variant="body-default-s" onBackground="success-strong" align="center">
                            ¡Mensaje enviado! Te contactaré pronto.
                        </Text>
                    )}
                    {status === "error" && (
                        <Text variant="body-default-s" onBackground="danger-strong" align="center">
                            Hubo un error. Por favor intenta de nuevo.
                        </Text>
                    )}
                </div>
            </form>
        </Column>
    );
};
