'use client';

import { useState, useEffect } from 'react';
import { PasswordProtection } from './PasswordProtection';
import { Project } from '@/lib/projects';

interface ProjectContentProps {
    project: Project;
    children: React.ReactNode;
}

export function ProjectContent({ project, children }: ProjectContentProps) {
    // Initialize as unlocked if not protected
    const [isUnlocked, setIsUnlocked] = useState(!project.isProtected);

    useEffect(() => {
        // If not protected, unlock immediately
        if (!project.isProtected) {
            setIsUnlocked(true);
            return;
        }

        // Check if project is already unlocked in session
        const unlockedProjects = sessionStorage.getItem('unlockedProjects');
        if (unlockedProjects) {
            const projects = JSON.parse(unlockedProjects);
            if (projects.includes(project.$id)) {
                setIsUnlocked(true);
            }
        }
    }, [project.$id, project.isProtected]);

    const handleSuccess = () => {
        // Store in session
        const unlockedProjects = sessionStorage.getItem('unlockedProjects');
        const projects = unlockedProjects ? JSON.parse(unlockedProjects) : [];
        projects.push(project.$id);
        sessionStorage.setItem('unlockedProjects', JSON.stringify(projects));
        setIsUnlocked(true);
    };

    // Only show password protection if project is protected AND not unlocked
    if (project.isProtected && !isUnlocked) {
        return <PasswordProtection projectId={project.$id} onSuccess={handleSuccess} />;
    }

    return <>{children}</>;
}
