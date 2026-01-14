import { databases, DATABASE_ID, PROJECTS_COLLECTION_ID } from './appwrite';
import { Query } from 'appwrite';
import bcrypt from 'bcryptjs';

export interface Project {
    $id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    publishedAt: string;
    images: string[];
    coverImage: string;
    link?: string;
    status: 'draft' | 'published' | 'archived';
    isProtected: boolean;
    password?: string;
    tags?: string[];
}

/**
 * Obtener todos los proyectos publicados (públicos y protegidos)
 */
export async function getProjects(): Promise<Project[]> {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            PROJECTS_COLLECTION_ID,
            [
                Query.equal('status', 'published'),
                Query.orderDesc('publishedAt'),
                Query.limit(100)
            ]
        );
        return response.documents as unknown as Project[];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

/**
 * Obtener un proyecto por su slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            PROJECTS_COLLECTION_ID,
            [
                Query.equal('slug', slug),
                Query.equal('status', 'published'),
                Query.limit(1)
            ]
        );

        if (response.documents.length === 0) {
            return null;
        }

        return response.documents[0] as unknown as Project;
    } catch (error) {
        console.error('Error fetching project by slug:', error);
        return null;
    }
}

/**
 * Verificar contraseña de un proyecto protegido
 */
export async function verifyProjectPassword(
    projectId: string,
    password: string
): Promise<boolean> {
    try {
        const project = await databases.getDocument(
            DATABASE_ID,
            PROJECTS_COLLECTION_ID,
            projectId
        ) as unknown as Project;

        // Si no está protegido, permitir acceso
        if (!project.isProtected) {
            return true;
        }

        // Si no tiene contraseña configurada, denegar acceso
        if (!project.password) {
            return false;
        }

        // Comparar contraseña hasheada
        return await bcrypt.compare(password, project.password);
    } catch (error) {
        console.error('Error verifying project password:', error);
        return false;
    }
}

/**
 * Hashear una contraseña (útil para crear proyectos)
 */
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
}
