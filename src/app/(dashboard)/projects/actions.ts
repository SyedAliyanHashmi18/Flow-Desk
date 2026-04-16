'use server';
 import { createProject } from "@/lib/data/project";
import { revalidatePath } from "next/cache";
import { updateProject } from "@/lib/data/project";
import { deleteProject } from "@/lib/data/project";
import { createTask, deleteTask,updateTask  } from "@/lib/data/tasks";
import UserModel from "@/models/user";

//create a new project
export async function handleCreateProject(formData: FormData) {
    try{
    const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
    };

    await createProject(data);
    revalidatePath("/dashboard/projects");

    return{success:true};
    }
    catch(error:any){
        return {
        success: false,
        message: error.message || "Something went wrong",
        };
    }
}

// Update the project
export async function handleUpdateProject(projectId: string, formData: FormData) {
    try{
    const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
    };

    await updateProject(projectId, data);
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}


// Delete the project and associated tasks
export async function handleDeleteProject(projectId: string) {
  try {
    await deleteProject(projectId);
    revalidatePath("/dashboard/projects");

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete project",
    };
  }
}

//create a new task
export async function handleCreateTask(projectId: string, formData: FormData){
    const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        priority: formData.get("priority"),
        status: formData.get("status"),
        dueDate: formData.get("dueDate"),
        
  };

  await createTask(projectId, data);
     revalidatePath(`/dashboard/projects/${projectId}`);


}
// for updating task
export async function handleUpdateTask(taskId: string, projectId: string, formData: FormData){
  try{
    const data = {
    title: formData.get("title") || undefined,
    description: formData.get("description") || undefined,
    priority: formData.get("priority") || undefined,
    status: formData.get("status") || undefined,
    dueDate: formData.get("dueDate") || undefined,
  };

  await updateTask(taskId, data);
  
  revalidatePath(`/dashboard/projects/${projectId}`);
  return { success: true };
}catch(error:any){
  return {
    success: false,
    messages: "Failed to update task"
  }

}
}

export async function handleDeleteTask( taskId:string, projectId: string){
  try{
await deleteTask(taskId);
     revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };

     }catch(error: any){
      return {
      success: false,
      message: error.message || "Failed to delete project",
    };
     }
}

