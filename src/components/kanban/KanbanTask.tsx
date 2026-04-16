"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDraggable,  } from "@dnd-kit/core";
import { CSS ,} from "@dnd-kit/utilities";
import { Badge } from "../ui/badge";
import { ArrowUpDown, Clock, Sparkles, Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import EditTaskModal from "../projects/EditTaskModal";
import { startTransition } from "react";
import {  handleDeleteTask } from "@/app/(dashboard)/projects/actions";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

interface Props{
    task: Task
}

export default function KanbanTask({ task } : Props) {

  function deleteTaskHandler() {
      startTransition(async () => {
        const result = await handleDeleteTask(task._id, task.projectId);
    
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


    const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    });
    
    // const style = {
    //   transform: CSS.Transform.toString(transform),
    //   width: "100%",
    // };
  return (
    <motion.div
      layout 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
    <Card 
      ref={setNodeRef}
        {...attributes}
        // style={style}
      className="p-4 cursor-grab max-w-full active:cursor-grabbing w-full">

        <div {...listeners}>
        <CardHeader className="space-y-3">

        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold">
            {task.title}
          </CardTitle>
          
          

          {task.aiGenerated && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles size={14} />
              AI
            </Badge>
          )}
        </div>

        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

      </CardHeader>

      {/* 🔹 Main Info */}
      <CardContent className="space-y-4 text-sm mt-1.5">

        <div className="flex justify-between items-center">
          

          <Badge
            variant={
              task.priority === "high"
                ? "destructive"
                : task.priority === "medium"
                ? "default"
                : "secondary"
            }
          >
            {task.priority}
          </Badge>
        </div>

        <div className="flex justify-between text-muted-foreground text-xs">
          <div className="flex items-center gap-1">
            <ArrowUpDown size={14} />
            Order: {task.order}
          </div>

          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>

      </CardContent>

      </div>

      {/* 🔹 Footer */}
      <CardFooter className="flex justify-between text-xs text-muted-foreground border-t pt-3">
        <span>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <span>
          Updated: {new Date(task.updatedAt).toLocaleDateString()}
        </span>
        <div className=" gap-2">
                      <EditTaskModal
                        id={task._id}
                        projectId={task.projectId}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        priority={task.priority}
                        dueDate={task.dueDate}
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
                            <AlertDialogAction onClick={deleteTaskHandler}>
                              Delete
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
      </CardFooter>

    </Card>
    </motion.div>
  );
}