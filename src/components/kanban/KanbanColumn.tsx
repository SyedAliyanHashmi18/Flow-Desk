"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import KanbanTask from "./KanbanTask";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { Task } from "@/types/task";
import { motion, AnimatePresence } from "framer-motion";
interface Props {
  title: string;
  status: "pending" | "in-progress" | "completed";
  tasks: Task[];
}

export default function KanbanColumn({ title, tasks, status }: Props) {

  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Card ref={setNodeRef} className="flex flex-col gap-3 min-h-100 lg:w-125 md:w-80 shrink-0 md:shrink-0">
      
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <AnimatePresence>
      <CardContent className="space-y-3 w-full">
        {tasks.map((task) => (
          <KanbanTask key={task._id} task={task} />
        ))}
      </CardContent>
      </AnimatePresence>

    </Card>
  );
}