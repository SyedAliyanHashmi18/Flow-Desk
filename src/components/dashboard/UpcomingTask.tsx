'use client'

export default function UpcomingTasks({ tasks }: any) {
  return (
    <div className="space-y-2">
      {tasks.map((task: any) => (
        <div key={task._id} className="flex justify-between text-sm">
          <span>{task.title}</span>
          <span className="text-muted-foreground">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
}