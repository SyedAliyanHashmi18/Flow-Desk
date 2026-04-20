import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { getProjectsByUserId } from "@/lib/data/project";
import { getTasksByProjectId } from "@/lib/data/tasks";
import { CreateTaskModal } from "@/components/projects/CreateTaskModal";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import TaskClientWrapper from "@/components/projects/TasksClientWrapper";
import { CreateAITasks } from "@/components/projects/CreateAITasks";
import ProjectClient from "@/components/projects/ProjectClient";
import { Button } from "@/components/ui/button";
import { FeaturesButton } from "@/components/projects/FeaturesButton";


export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params; 

  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const user = session.user;
  const projects = await getProjectsByUserId();

  if (!projects || projects.length === 0) {
    notFound();
  }

  const project = projects.find(
    (p: any) => p._id.toString() === projectId
  );

  if (!project) {
    notFound();
  }

  const tasks = await getTasksByProjectId(
    projectId
  );

  if (!tasks) {
    notFound();
  }

  if(tasks.length === 0 ){
    return (
        <TaskClientWrapper projectId={project._id.toString()}/>

    )
  }

    
    
  
  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-4">
       
      <div className="flex flex-col md:flex-row md:items-center md:justify-between  gap-4">
        <div>
          <h1 className="text-2xl font-bold ">
            {project.title}
          </h1>
          <p className="mt-2  text-[#c7cbd0]">
            {project.description || "No description provided."}
          </p>
        </div>
        <div>

        </div>
        <div  >
              {/* <ImproveAItasks projectId={projectId}/> */}
        </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* <FeaturesButton projectId={projectId.toString()} user={user} /> */}
              <CreateAITasks projectId={projectId}/>

              <CreateTaskModal projectId={projectId}  />

          </div>
            
       
      </div>

      
        <div className="grid gap-4 ">
          <ProjectClient
        initialTasks={tasks}
        projectId={projectId}
        
      />
          {/* <KanbanBoard tasks={tasks} projectId={projectId} /> */}
        </div>
    </div>
  );
}
