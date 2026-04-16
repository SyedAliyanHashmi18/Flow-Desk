import { auth } from "@/app/auth";
import { improveTasks } from "@/lib/ai/improveTask";
import { AITaskSchema } from "@/lib/ai/validateAIOutput";
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/project";
import TaskModel from "@/models/task";
import mongoose from "mongoose";

export async function createAITasks(projectId:string, userId:string, aiTasks: any[]) {

   

  const project = await ProjectModel.findOne({
    _id: new mongoose.Types.ObjectId(projectId),
    userId: new mongoose.Types.ObjectId(userId),
  });

  if (!project) {
    // console.log("ProjectId:", projectId);
    // console.log("UserId:", userId);
    throw new Error("Project not found");
  }

  const tasks = aiTasks.map((task, index) => ({
    projectId: new mongoose.Types.ObjectId(projectId),
      userId: new mongoose.Types.ObjectId(userId),
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: "pending",
    order: index,
    aiGenerated: true,
    dueDate: null
  }));

  
  await TaskModel.insertMany(tasks);
  
}

export async function deleteAITasks(projectId:string) {

   await dbConnect();

  const session = await auth(); 

  if (!session) {
    throw new Error("Unauthorized");
  }

  const project = await ProjectModel.findOne({
    _id: projectId,
    userId: session.user._id,
  });

  if (!project) {
    throw new Error("Project not found");
  }


    await TaskModel.deleteMany({
        projectId,
        aiGenerated: true
    });
    
}

export async function improvedAITasks(projectId:string) {
  await dbConnect();
  const session = await auth();
  if(!session) throw new Error("User not found ");

  const task = await TaskModel.find({
    projectId: new mongoose.Types.ObjectId(projectId),
    aiGenerated: true
  });

  if (!task || task.length === 0) {
  console.log("No AI Tasks found for project:", projectId);
  return []
}

  // const improvedTasks = await Promise.all(
  //   task.map(async (task) => {

  //     const improvedTaskString = await improveTasks(
  //       task.title,
  //       task.description
  //     )
  //     const improvedTask = JSON.parse(improvedTaskString);
  //     const validated = AITaskSchema.parse(improvedTask);
    
  //     task.title = validated.title,
  //     task.description = validated.description,
    
  //     await task.save();
    
  //     return task;
  //   }))

  const improvedTasks = await Promise.all(
  task.map(async (task) => {
    const improvedTaskString = await improveTasks(task.title, task.description);
    if (!improvedTaskString) {
        console.warn("AI returned null for task:", task._id);
        return task;
      }
    let improvedTaskObj;
    try {
      // Match first {...} block
      const jsonMatch = improvedTaskString.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in AI response");

      improvedTaskObj = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("Failed to parse AI response:", improvedTaskString, err);

      // Fallback to original task
      improvedTaskObj = {
        title: task.title || "Untitled Task",
        description: task.description || "No description",
        priority: task.priority ?? "medium",
      };
    }
    const validPriorities = ["low", "medium", "high"] as const;

      if (!validPriorities.includes(improvedTaskObj.priority)) {
        console.warn("Invalid priority from AI, defaulting to 'medium'");
        improvedTaskObj.priority = "medium";
      }

      // Validate with Zod or your schema
      const validated = AITaskSchema.parse(improvedTaskObj);

    task.title = validated.title;
    task.description = validated.description;
    await task.save();

    return task;
  })
);
    return improvedTasks;
  
}