import TaskModel from "@/models/task";
import dbConnect from "../dbConnect";
import ProjectModel from "@/models/project";
import mongoose, { Types } from "mongoose";
import { auth } from "@/app/auth";
import { notFound, redirect } from "next/navigation";
import { taskSchema } from "../validators/task";
import { updateTaskSchema } from "../validators/updateTask";


// Create a new task
export async function createTask(projectId: string, input: unknown) {
  await dbConnect();

  const session = await auth(); 

  if (!session) {
    throw new Error("Unauthorized");
  }

  const result = taskSchema.safeParse(input);
  if (!result.success) {
  return {
    success: false,
    errors: result.error.flatten().fieldErrors,
  };
}
  const project = await ProjectModel.findOne({
    _id: projectId,
    userId: session.user.id,
  });

  if (!project) {
    throw new Error("Project not found");
  }
  const lastTask = await TaskModel.findOne({
    projectId: projectId,
    status: result.data.status || "pending"
  })
  .sort({order: -1})
  .lean()
  
  const nextOrder = lastTask ? lastTask.order + 1 :0;

  const newTask = TaskModel.create({
    userId: session.user.id,
    projectId: projectId,
    title: result.data.title,
    description: result.data.description,
    status: result.data.status,
    dueDate: result.data.dueDate,
    priority: result.data.priority,
    order: nextOrder,
    
  });

  await ProjectModel.updateOne(
    { _id: projectId },
    { $inc: { taskCount: 1 } }
  );
  return newTask;
}

// Read tasks by project ID
export async function getTasksByProjectId(projectId: string) {
  await dbConnect();

  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  if(!Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project ID");
  }

  const project = await ProjectModel.findOne({
    _id: projectId,
    userId: session.user.id,
  });

  if (!project) {
    notFound();
  }

  const tasks = await TaskModel.find({
    projectId: projectId,
  })
    .sort({ status: 1,order: 1 })
    .lean();

  return tasks.map((task) => ({
      ...task,
      _id: task._id.toString(),
      projectId: task.projectId.toString(),
      userId: task.userId.toString(),
    }));
}

// for updating the task

export async function updateTask(taskId: string, input: unknown) {

  await dbConnect();

  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  if(!Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  } 

  const result = updateTaskSchema.safeParse(input);
  if (!result.success) {
    throw new Error("Invalid input");
  }

  const updatedTask = await TaskModel.findOneAndUpdate(
    { _id: taskId, userId: session.user.id },
    { $set: result.data },
     { returnDocument: "after" }
  ).lean();
  
  if (!updatedTask) {
    throw new Error("Task not found");
  }
  return updatedTask;
}


// for deleting the task
export async function deleteTask(taskId: string) {
  await dbConnect();

  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  if(!Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }
  const task = await TaskModel.findOne({
    _id: taskId,
    userId: session.user.id,
  });
  if (!task) {
    throw new Error("Task not found");
  }
  await TaskModel.deleteOne({
  _id: taskId,
  userId: session.user.id
});

await ProjectModel.updateOne(
  { _id: task.projectId },
  { $inc: { taskCount: -1 } }
);

  // const mongooSession = await mongoose.startSession();
  // try {
  //   mongooSession.startTransaction();
  //   await TaskModel.deleteOne({ _id: taskId }, { session: mongooSession });

  //   await ProjectModel.updateOne(
  //     { _id: task.projectId },
  //     { $inc: { taskCount: -1 } },
  //     { session: mongooSession }
  //   );
  //   await mongooSession.commitTransaction();
  // } catch (error) {
  //   await mongooSession.abortTransaction();
  //   throw error;
  // } finally {
  //   mongooSession.endSession();
  // }
}


