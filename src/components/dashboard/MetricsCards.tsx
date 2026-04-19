 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface Props {
  totalProjects: number;
  completedTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
}

export default function MetricsCards({
  totalProjects,
  completedTasks,
  pendingTasks,
  inProgressTasks,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 w-full  gap-4 ">

      <Card className="hover:shadow-md hover:scale-102 bg-[rgba(8,11,20,0.85)] ">
        <CardHeader>
          <CardTitle>Total Projects</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {totalProjects}
        </CardContent>
      </Card>

      <Card className="hover:shadow-md hover:scale-102 bg-[rgba(8,11,20,0.85)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 ">
            <CheckCircle size={18} /> Completed Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {completedTasks}
        </CardContent>
      </Card>

      <Card className="hover:shadow-md hover:scale-102 bg-[rgba(8,11,20,0.85)]">

        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {pendingTasks}
        </CardContent>
      </Card>

      <Card className="hover:shadow-md hover:scale-102 bg-[rgba(8,11,20,0.85)]">
        <CardHeader>
          <CardTitle>In Progress</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {inProgressTasks}
        </CardContent>
      </Card>

    </div>
  );
}