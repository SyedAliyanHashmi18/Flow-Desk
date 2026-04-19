'use client';
import KanbanTask from "./KanbanTask";

interface Task {
  _id: string;
  projectId: string,
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  order: number;
  dueDate: Date;
  aiGenerated?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type Props = {
  tasks: Task[],
    changeStatus: (taskId: string, status: string) => void;
};

export default function MobileTaskList({ tasks, changeStatus }: Props) {
  const grouped = {
    pending: tasks.filter(t => t.status === "pending"),
    "in-progress": tasks.filter(t => t.status === "in-progress"),
    completed: tasks.filter(t => t.status === "completed"),
  };

  return (
    <div className="space-y-6">
      
      {Object.entries(grouped).map(([status, tasks]) => (
        <div key={status}>
          <h2 className="text-lg font-bold capitalize mb-2">
            {status.replace("-", " ")}
          </h2>

          <div className="space-y-3">
            {tasks.map(task => (
                <>
                
                <KanbanTask key={task._id} task={task} changeStatus={changeStatus} />
                </>
              
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}