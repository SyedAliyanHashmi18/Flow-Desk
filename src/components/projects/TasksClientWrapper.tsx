"use client";

import { useState } from "react";
import EmptyState from "@/components/ui/EmptyState";
import { FolderPlus, PlusCircle } from "lucide-react";
import { CreateTaskModal } from "./CreateTaskModal";

export default function TaskClientWrapper({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EmptyState
        icon={<PlusCircle />}
        title="No tasks yet"
        description="Start by adding your first task to this project."
        buttonLabel="Create Task"
        onClick={() => setOpen(true)}
        projectId= {projectId}
      />

      <CreateTaskModal projectId={projectId} open={open} setOpen={setOpen} />

      
    </>
  );
}