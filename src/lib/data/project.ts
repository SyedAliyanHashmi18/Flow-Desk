import ProjectModel from "@/models/project";
import dbConnect from "../dbConnect";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import mongoose, { Types } from "mongoose";
import { updateProjectSchema } from "../validators/updateProject";
import TaskModel from "@/models/task";
import UserModel from "@/models/user";
import { projectSchema } from "../validators/project";


// fucntion to create a project
export async function createProject( input: unknown) {

  await dbConnect();
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;
  const result = projectSchema.safeParse(input);

  if (!result.success) {
    throw new Error("Invalid input data");
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if(user.plan === "free" && user.projectCount >= 10) {
    throw new Error("Project limit reached for free plan");
  }

  const newProject = await ProjectModel.create({
    userId: userId,
    title: result.data.title,
    description: result.data.description,
    status: result.data.status ?? "active",
    taskCount: 0,
  });

  await UserModel.updateOne(
    { _id: userId },
    { $inc: { projectCount: 1 } }
  );

  return newProject;
}



// Function to get all projects for the authenticated user
export async function getProjectsByUserId() {
  await dbConnect();

  const session = await auth();
  if (!session) {
    redirect("/signin");}

  return ProjectModel.find({
    userId: session.user.id,
  }).sort({ createdAt: -1 }).lean();
}

// Function to update the project
export async function updateProject(projectId: string,input: unknown) {
  await dbConnect();

  const session = await auth();
  if (!session) {
    redirect("/signin");}

    if(!Types.ObjectId.isValid(projectId)) {
      throw new Error("Invalid project ID");
    }

    const result = updateProjectSchema.safeParse(input);

    if (!result.success) {
      throw new Error("Invalid input data");

    }

    const updateProject = await ProjectModel.findOneAndUpdate(
      { _id: projectId, userId: session.user.id },
      { $set: result.data },
      { returnDocument: "after" }
    ).lean();

    if (!updateProject) {
      throw new Error("Project not found or you do not have permission to update it");
    }
    return updateProject; 
}

// Function to delete the project and associated tasks
export async function deleteProject(projectId: string) {
  await dbConnect();

  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  if (!Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project ID");
  }

  const project = await ProjectModel.findOne({
    _id: projectId,
    userId: session.user.id,
  });

  if (!project) {
    throw new Error(
      "Project not found or you do not have permission to delete it"
    );
  }

  await TaskModel.deleteMany({ projectId });

  await ProjectModel.deleteOne({ _id: projectId });

  await UserModel.updateOne(
    { _id: session.user.id },
    { $inc: { projectCount: -1 } }
  );

  return {
    success: true,
    message: "Project and tasks deleted successfully",
  };
}
// export async function deleteProject(projectId: string) {
//   await dbConnect();

//   const session = await auth();
//   if (!session) {
//     redirect("/signin");}

//   if(!Types.ObjectId.isValid(projectId)) {
//     throw new Error("Invalid project ID");
//   }

//   const mongooSession = await mongoose.startSession();
//   try {

//     mongooSession.startTransaction();

//     const project = await ProjectModel.findOne({
//       _id: projectId,
//       userId: session.user.id,
//     }, null, { session: mongooSession });

//     if (!project) {
//       throw new Error("Project not found or you do not have permission to delete it");
//     }

//     await TaskModel.deleteMany({ projectId: projectId }, { session: mongooSession });

//     await ProjectModel.deleteOne({ _id: projectId }, { session: mongooSession });

//     await UserModel.updateOne(
//       { _id: session.user.id },
//       { $inc: { projectCount: -1 } },
//       { session: mongooSession }
//     );
//     await mongooSession.commitTransaction();
//     mongooSession.endSession();

//     return {success: true, message: "Project and associated tasks deleted successfully"};
    
//   } catch (error) {
//     await mongooSession.abortTransaction();
//     mongooSession.endSession();
//     throw error;

//   }
// }
