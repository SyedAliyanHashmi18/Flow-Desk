"use client";

import { useState, useTransition } from "react";
import { handleCreateTask } from "@/app/(dashboard)/projects/actions";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpgradeBanner } from "./UpgradeBanner";
import { FeaturesButton } from "./FeaturesButton";

type Props = {
   open?: boolean;
  setOpen?: (value: boolean) => void;
  projectId: string;
  
};
export function CreateTaskModal({ projectId,open, setOpen }: Props) {

  const [internalOpen, setInternalOpen] = useState(false);
  
    const isControlled = open !== undefined;
  
    const dialogOpen = isControlled ? open : internalOpen;
  
    const setDialogOpen = isControlled ? setOpen! : setInternalOpen;
  const [isPending, startTransition] = useTransition();
  
  
  
  return (
    <>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button className="text-[#4fffb0] bg-[#050a10] hover:bg-[#050a10]/90 border ">Add Task</Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#4fffb0] ">Create Task</DialogTitle>
        </DialogHeader>

        <form
          action={(formData) =>
            startTransition(() =>
              handleCreateTask(projectId, formData)
            )
          }
          className="space-y-4"
        >
          <Input name="title" placeholder="Task Title" required />

          <Textarea
            name="description"
            placeholder="Task Description"
            required
          />

          <Input
            type="date"
            name="dueDate"
          />
          <Select name="status" defaultValue="pending">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In-Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>

                      </SelectContent>
                    </Select>

          <Select name="priority" defaultValue="medium">
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" disabled={isPending} className="bg-[#4fffb0] text-[#050a10] hover:bg-[#04fffb0]/90 border ">
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
    
    </>
  );
}