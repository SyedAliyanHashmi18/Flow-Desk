'use client';

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { handleDeleteProject } from "../../app/(dashboard)/projects/actions";
import { toast } from "sonner"
import { useTransition } from "react";
import EditProjectModal from "@/components/projects/EditProjectModal";
import { Button } from "../ui/button";


type ProjectCardProps = {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  status: "active" | "archived";
  aiGenerated: boolean;
  taskCount: number;
};

export default function ProjectCard({
  id,
  title,
  description,
  createdAt,
  status,
  aiGenerated,
  taskCount,
}: ProjectCardProps) {

const [isPending, startTransition] = useTransition();

function deleteProjectHandler() {
  startTransition(async () => {
    const result = await handleDeleteProject(id);

    if (result.success) {
      toast.success("Deleted",{description: "Project deleted successfully"});
    } else {
      toast.error("Error in deleting project",
        {
        description: result.message,
      });
    }
  });
}


  return (
      <Card className="group hover:scale-[1.02] transition-transform hover:shadow-lg cursor-pointer border-muted/40 hover:border-primary/30">
        
        <CardHeader className="space-y-2">
          
          {/* Title + AI badge */}
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {title}
            </CardTitle>
            <div className="flex items-center gap-2">
            <EditProjectModal
              id={id}
              title={title}
              description={description}
              status={status}
            />
                <AlertDialog>
              <AlertDialogTrigger asChild>
                <button>
                  <Trash size={16} />
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this project?
                  </AlertDialogTitle>
                </AlertDialogHeader>

                <div className="flex justify-end gap-2">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteProjectHandler}>
                    Delete
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
            {aiGenerated && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Sparkles size={14} />
                AI
              </Badge>
            )}
          </div>

          <CardDescription className="line-clamp-2">
            {description || "No description provided."}
          </CardDescription>

          {/* Status badge */}
          <div>
            <Badge
              variant={status === "active" ? "default" : "outline"}
            >
              {status}
            </Badge>
          </div>

        </CardHeader>

        <CardContent className="flex justify-between text-sm text-muted-foreground pt-2">
          
          <span>
            {taskCount} {taskCount === 1 ? "task" : "tasks"}
          </span>
        <Link href={`/projects/${id}`}>

          <Button className="bg-gray-500">Tasks</Button>
       </Link>

          

        </CardContent>

      </Card>
  );
}