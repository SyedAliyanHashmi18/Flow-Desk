"use client";

import { useState } from "react";
import EmptyState from "@/components/ui/ProjectEmptyState";
import { FolderPlus } from "lucide-react";
import CreateProjectModal from "@/components/projects/CreateProjectModal";

export default function ProjectsClientWrapper() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EmptyState
        icon={<FolderPlus />}
        title="No projects yet"
        description="Get started by creating your first project."
        buttonLabel="Create Project"
        onClick={() => setOpen(true)}
      />

      <CreateProjectModal open={open} setOpen={setOpen} />
    </>
  );
}