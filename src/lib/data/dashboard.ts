import { auth } from "@/app/auth";
import dbConnect from "../dbConnect";
import { redirect } from "next/navigation";
import ProjectModel from "@/models/project";
import TaskModel from "@/models/task";
import mongoose from "mongoose";


export async function getDashboardAnalytics() {
    await dbConnect();

    const session = await auth();

    if(!session){
        redirect("/signin");
    }

    const userId = session.user._id;

    const projects = await ProjectModel.find({ userId}).lean();

    const tasksRaw = await TaskModel.find({ userId }).lean();

    const tasks = tasksRaw.map((task) => ({
      ...task,
      _id: task._id.toString(),
    }));

    const totalProjects = projects.length;

    const completedTasks = tasks.filter(
        (task)=> task.status === "completed"
    ).length
    const inprogressTasks = tasks.filter(
        (task)=> task.status === "in-progress"
    ).length
    const pendingTasks = tasks.filter(
        (task)=> task.status === "pending"
    ).length

    const taskDistribution = [
  {
    name: "Pending",
    value: pendingTasks,
    fill: "#f59e0b",
  },
  {
    name: "In Progress",
    value: inprogressTasks,
    fill: "#3b82f6",
  },
  {
    name: "Completed",
    value: completedTasks,
    fill: "#22c55e",
  },
];

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const productivityData = await TaskModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            status: "completed",
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);

      // console.log("PRODUCTIVITY DATA:", productivityData);

      // const allCompleted = await TaskModel.find({
      //   userId,
      //   status: "completed"
      // });

      // console.log(allCompleted);

    const priorityBreakdown = [
      {
        name: "Low",
        value: tasks.filter(t => t.priority === "low").length
      },
      {
        name: "Medium",
        value: tasks.filter(t => t.priority === "medium").length
      },
      {
        name: "High",
        value: tasks.filter(t => t.priority === "high").length
      }
    ];

    const weeklyCompleted = tasks.filter(task => {
        const created = new Date(task.updatedAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        return task.status === "completed" && created > weekAgo;
        }).length;

    const upcomingTasksRaw = await TaskModel.find({
      userId,
      dueDate: { $ne: null }
    })
    .sort({ dueDate: 1 })
    .limit(5)
    .lean();

    const upcomingTasks = upcomingTasksRaw.map(task => ({
      ...task,
      _id: task._id.toString(),
      userId: task.userId.toString(),
      projectId: task.projectId.toString(),
      dueDate: task.dueDate ? task.dueDate.toISOString() : null,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    }));

    return{
        totalProjects,
        completedTasks,
        inprogressTasks,
        pendingTasks,
        taskDistribution,
        productivityData,
        priorityBreakdown,
        upcomingTasks,
        weeklyCompleted
    }
}