'use client';

import { useState } from 'react';
import { Column, Heading, Text, Input, Button } from '@once-ui-system/core';

interface PasswordProtectionProps {
    projectId: string;
    onSuccess: () => void;
}

export function PasswordProtection({ projectId, onSuccess }: PasswordProtectionProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/projects/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, password }),
            });

            const data = await response.json();

            if (data.success) {
                onSuccess();
            } else {
                setError('Contraseña incorrecta');
            }
        } catch (err) {
            setError('Error al verificar la contraseña');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Column
            maxWidth="xs"
            gap="24"
            padding="32"
            radius="m"
            border="neutral-alpha-weak"
            background="page"
            style={{ margin: 'auto', marginTop: '80px' }}
        >
            <Column gap="8">
                <Heading variant="heading-strong-l">Proyecto Protegido</Heading>
                <Text variant="body-default-m" onBackground="neutral-weak">
                    Este proyecto requiere una contraseña para acceder.
                </Text>
            </Column>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Column gap="16">
                    <Column gap="4">
                        <Input
                            id="password"
                            label="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && (
                            <Text variant="body-default-s" onBackground="danger-strong">
                                {error}
                            </Text>
                        )}
                    </Column>
                    <Button
                        type="submit"
                        variant="primary"
                        size="m"
                        fillWidth
                        disabled={loading}
                    >
                        {loading ? 'Verificando...' : 'Acceder'}
                    </Button>
                </Column>
            </form>
        </Column>
    );
}
