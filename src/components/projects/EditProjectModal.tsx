"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner"
import { handleUpdateProject } from "../../app/(dashboard)/projects/actions";

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

type EditProjectModalProps = {
  id: string;
  title: string;
  description?: string;
  status: "active" | "archived";
};

export default function EditProjectModal({
  id,
  title,
  description,
  status,
}: EditProjectModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await handleUpdateProject(id, formData);

      if (result?.success) {
        toast.success("Project Updated",{
          description: "Your project has been updated successfully.",
        });
        setOpen(false);
      } else {
        toast.error( "Failed to update project",{
          description: result?.message 
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 hover:bg-muted rounded-md text-[#4fffb0]">
          <Pencil size={16} />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#4fffb0]">Edit Project</DialogTitle>
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
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>

          <Button type="submit" disabled={isPending} className="w-full bg-[#4fffb0] text-[#050a10] hover:bg-[#4fffb0]/90">
            {isPending ? "Updating..." : "Update Project"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}


