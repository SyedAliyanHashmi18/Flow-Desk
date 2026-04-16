"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { handleCreateProject } from "../../app/(dashboard)/projects/actions";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  open?: boolean;
  setOpen?: (value: boolean) => void;
};

export default function CreateProjectModal({ open, setOpen }: Props) {

  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined;

  const dialogOpen = isControlled ? open : internalOpen;

  const setDialogOpen = isControlled ? setOpen! : setInternalOpen;

  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await handleCreateProject(formData);

      if (result?.success) {
        toast.success("Your project is created successfully.");

        setDialogOpen(false);
      } else {
        toast.error("Error", {
          description: result?.message || "Something went wrong",
        });
      }
    });
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      
      {!isControlled && (
        <DialogTrigger asChild>
          <Button>New Project</Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <form action={onSubmit} className="space-y-4">
          <Input name="title" placeholder="Project Title" required />

          <Textarea
            name="description"
            placeholder="Project Description"
          />


          
          <Select defaultValue="active" name="status">
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}