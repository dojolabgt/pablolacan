import { NextRequest, NextResponse } from 'next/server';
import { verifyProjectPassword } from '@/lib/projects';

export async function POST(request: NextRequest) {
    try {
        const { projectId, password } = await request.json();

        if (!projectId || !password) {
            return NextResponse.json(
                { success: false, message: 'Project ID and password are required' },
                { status: 400 }
            );
        }

        const isValid = await verifyProjectPassword(projectId, password);

        if (isValid) {
            // Crear cookie de sesión para este proyecto
            const response = NextResponse.json({ success: true });

            // Cookie válida por 24 horas
            response.cookies.set(`project_${projectId}`, 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 24 horas
                sameSite: 'strict',
                path: '/'
            });

            return response;
        }

        return NextResponse.json(
            { success: false, message: 'Invalid password' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Error verifying password:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
