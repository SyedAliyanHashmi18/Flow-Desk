import { auth } from "@/app/auth";
import MetricsCards from "@/components/dashboard/MetricsCards";
import TaskDistributionChart from "@/components/dashboard/TaskDistributionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardAnalytics } from "@/lib/data/dashboard";
import TaskModel from "@/models/task";
import { redirect } from "next/navigation";
import ProductivityChart from "@/components/dashboard/ProductivityChart";
import UpcomingTasks from "@/components/dashboard/UpcomingTask";
import { Button } from "@/components/ui/button";
import ProjectModel from "@/models/project";


export default async function DashboardPage() {

  const session = await auth();
  if(!session){
    redirect("/signin")
  }
  const analytics = await getDashboardAnalytics();

  


  return (
    <>
    <div className="space-y-6 ">

      {/* Metrics Cards */}
      <MetricsCards
        totalProjects={analytics.totalProjects}
        completedTasks={analytics.completedTasks}
        pendingTasks={analytics.pendingTasks}
        inProgressTasks={analytics.inprogressTasks}
      />
{/* productivity insight */}
        <Card className="hover:shadow-md hover:scale-101">
          <CardHeader>
            <CardTitle>Productivity Insight</CardTitle>
          </CardHeader>

          <CardContent className="text-lg font-medium ">
             You've completed {analytics.weeklyCompleted} tasks this week.
            Great progress!
          </CardContent>
        </Card>
      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* //productivity chart  */}
        <Card className="hover:shadow-md hover:scale-101">
        <CardHeader>
          <CardTitle>Productivity (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductivityChart data={analytics.productivityData} />
        </CardContent>
      </Card>

      {/* //task distribution chart */}
        <Card className="hover:shadow-md hover:scale-101">
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>

          <CardContent>
            <TaskDistributionChart data={analytics.taskDistribution} />
          </CardContent>
          
        </Card>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* priority breakdown */}
        <Card className="hover:shadow-md hover:scale-101">
          <CardHeader>
            <CardTitle>Priority Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskDistributionChart data={analytics.priorityBreakdown.map(item => ({
              ...item,
              fill: `hsl(${Math.random() * 360}, 70%, 50%)`
            }))} />
          </CardContent>
        </Card>

        {/* upcoming deadlines */}
        <Card className="hover:shadow-md hover:scale-101">
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <UpcomingTasks tasks={analytics.upcomingTasks} />
        </CardContent>
      </Card>
            
      </div>

    </div>
    </>
  );
}