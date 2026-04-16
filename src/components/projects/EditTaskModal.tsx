"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner"
import {  handleUpdateTask } from "../../app/(dashboard)/projects/actions";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";

type EditTaskModalProps = {
  id: string;
  projectId: string,
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  priority:  "low" | "medium" | "high";
  dueDate: Date
};
type UpdateTaskResult = {
  success: boolean
  messages?: string
}

export default function EditTaskModal({
  id,
  projectId,
  title,
  description,
  status,
  priority,
  dueDate,
}: EditTaskModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result: UpdateTaskResult | undefined =
  await handleUpdateTask(id, projectId, formData);

      if (result?.success) {
        toast.success("Task Updated",{
          description: "Your Task has been updated successfully.",
        });
        setOpen(false);
      } else {
        toast.error( "Failed to update task",{
          description: result?.messages
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 hover:bg-muted rounded-md">
          <Pencil size={16} />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form action={onSubmit} className="space-y-4">

          <Input
            name="title"
            defaultValue={title}
            placeholder="Project Title"
            required
          />

          <Textarea
            name="description"
            defaultValue={description}
            placeholder="Project Description"
          />

          <select
            name="status"
            defaultValue={status}
            className="w-full border rounded-md p-2"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>

          </select>

          <select
            name="priority"
            defaultValue={priority}
            className="w-full border rounded-md p-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>

          </select>
          <Input
            defaultValue={
              dueDate ? new Date(dueDate).toISOString().split("T")[0] : ""
            }
            type="date"
            name="dueDate"
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Updating..." : "Update Project"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}


