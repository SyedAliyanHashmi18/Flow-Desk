"use client";

import { useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
   open?: boolean;
  setOpen?: (value: boolean) => void;
  projectId: string;
};
export function CreateAITasks({ projectId,open, setOpen }: Props) {

  const [internalOpen, setInternalOpen] = useState(false);
  
    const isControlled = open !== undefined;
  
    const dialogOpen = isControlled ? open : internalOpen;
  
    const setDialogOpen = isControlled ? setOpen! : setInternalOpen;
  const [isPending, startTransition] = useTransition();

  const router = useRouter()
  async function onSubmit(formData: FormData) {
    const projectGoal = formData.get("projectGoal")
      startTransition(async () => {
        const result = await axios.post(`/api/projects/${projectId}/generate-tasks`,{projectGoal});
  
        if (result?.data.success) {
          toast.success("Your tasks is created successfully.");
          setDialogOpen(false);
          router.refresh()
          
        } else {
          toast.error("Error", {
            description: result?.data.message || "Something went wrong",
          });
        }
      });
    }
  

  return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button>Generate AI Tasks  
            <Badge variant="secondary" className="flex items-center gap-1">
                          <Sparkles size={14} />
                          AI
                        </Badge>
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project Idea</DialogTitle>
        </DialogHeader>

        <form action={onSubmit} className="space-y-4">
          <Textarea
            name="projectGoal"
            disabled={isPending}
            placeholder="Write your project goal here.."
          />
          
          <Button type="submit" disabled={isPending}>
            {isPending ? "Generating..." : "Generate Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}