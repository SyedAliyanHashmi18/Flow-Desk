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
  changeStatus: (taskId: string, status: string) => void;
}

export default function KanbanColumn({ title, tasks, status, changeStatus }: Props) {

  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Card ref={setNodeRef} className=" flex flex-col gap-3 w-full min-h-125 bg-[rgba(8,11,20,0.93)] p-0 pb-4" >
      
      <CardHeader>
        <CardTitle className="p-4">{title}</CardTitle>
      </CardHeader>
      <AnimatePresence>
      <CardContent className="space-y-3 w-full ">
        {tasks.map((task) => (
          <KanbanTask key={task._id} task={task} changeStatus={changeStatus} />
        ))}
      </CardContent>
      </AnimatePresence>

    </Card>
  );
}