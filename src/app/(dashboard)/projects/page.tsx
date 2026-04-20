import { auth } from "@/auth";
import { getProjectsByUserId } from "@/lib/data/project";
import { redirect } from "next/navigation";
import ProjectCard from "@/components/dashboard/ProjectCard";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import ProjectsClientWrapper from "@/components/projects/ProjectsClientWrapper";


export default async function ProjectsPage() {
    const session = await auth();

    if (!session) {
        redirect("/signin");
    }
    

    const projects = await getProjectsByUserId();
    if (projects.length === 0) {
        return (
        
        <ProjectsClientWrapper/>
        );
    }
    return (<>
        <div className="flex items-start justify-between w-full h-16  ">
            <div>
                <h1 className="text-2xl font-bold">
                ALL PROJECTS.

                </h1>
                </div>
            <CreateProjectModal/>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
            <ProjectCard
            key={project._id.toString()}
            id={project._id.toString()}
            title={project.title}
            description={project.description}
            createdAt={project.createdAt}
            status={project.status}
            aiGenerated={project.aiGenerated}
            taskCount={project.taskCount}

            />
        ))}
        </div>
        </>
    );
}