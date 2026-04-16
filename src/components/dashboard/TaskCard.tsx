'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Sparkles, ArrowUpDown, Trash } from "lucide-react";
import EditTaskModal from "../projects/EditTaskModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { handleDeleteProject } from "@/app/(dashboard)/projects/actions";
import { startTransition } from "react";
import { toast } from "sonner";


type TaskCardProps = {
  id: string;
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
};

export default function TaskCard({
  id,
  projectId,
  title,
  description,
  status,
  priority,
  order,
  dueDate,
  aiGenerated,
  createdAt,
  updatedAt,
}: TaskCardProps) {

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
    <Card className="hover:shadow-lg transition-all border-muted/40">
      
      {/* 🔹 Header */}
      <CardHeader className="space-y-3">

        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
                                    <EditTaskModal
                                      id={id}
                                      projectId={projectId}
                                      title={title}
                                      description={description}
                                      status={status}
                                      priority={priority}
                                      // dueDate={new Date(dueDate).toISOString().split("T")[0]}
                                      dueDate={dueDate}

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

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

      </CardHeader>

      {/* 🔹 Main Info */}
      <CardContent className="space-y-4 text-sm">

        <div className="flex justify-between items-center">
          <Badge variant="outline">
            {status}
          </Badge>

          <Badge
            variant={
              priority === "high"
                ? "destructive"
                : priority === "medium"
                ? "default"
                : "secondary"
            }
          >
            {priority}
          </Badge>
        </div>

        <div className="flex justify-between text-muted-foreground text-xs">
          <div className="flex items-center gap-1">
            <ArrowUpDown size={14} />
            Order: {order}
          </div>

          {dueDate && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              Due: {new Date(dueDate).toLocaleDateString()}
            </div>
          )}
        </div>

      </CardContent>

      {/* 🔹 Footer */}
      <CardFooter className="flex justify-between text-xs text-muted-foreground border-t pt-3">
        <span>
          Created: {new Date(createdAt).toLocaleDateString()}
        </span>
        <span>
          Updated: {new Date(updatedAt).toLocaleDateString()}
        </span>
      </CardFooter>

    </Card>
  );
}