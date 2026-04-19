"use client";

import KanbanColumn from "./KanbanColumn";
import { DndContext, DragOverlay, DragStartEvent, DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { handleUpdateTask } from "@/app/(dashboard)/projects/actions";
import { useEffect, useState } from "react";
import KanbanTask from "./KanbanTask";
import { useRef } from "react";
import MobileTaskList from "./MobileTasksList";



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

type Props = {
  tasks: Task[];
  projectId: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};


export default function KanbanBoard({ tasks,projectId,setTasks,setAllTasks}: Props) {
  
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [localTasks, setLocalTasks] = useState(tasks);

  
 
    const columns = {
    
            pending: tasks.filter(t => t.status === "pending"),
            "in-progress": tasks.filter(t => t.status === "in-progress"),
            completed: tasks.filter(t => t.status === "completed"),
        
        };
      
    async function updateTaskStatus(taskId: string, newStatus: string, order?: number) {
        const formData = new FormData();
        formData.append("status", newStatus);
        if (order !== undefined) formData.append("order", order.toString());

        await handleUpdateTask(taskId, projectId, formData);
        }
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    function onDragStart(event: DragStartEvent) {
          const taskId = event.active.id as string;
          const task = tasks.find((t) => t._id === taskId);

          if (task) setActiveTask(task);
        }

    function onDragEnd(event: DragEndEvent) {
      const { active, over } = event; 

      setActiveTask(null);
      if (!over) return;

      const taskId = active.id as string;
      const newStatus = over.id as string;

      setTasks(prev =>
        prev.map(task =>
          task._id === taskId
            ? { ...task, status: newStatus as any }
            : task
        )
      );

      setAllTasks(prev =>
        prev.map(task =>
          task._id === taskId
            ? { ...task, status: newStatus as any }
            : task
        )
      );

      updateTaskStatus(taskId, newStatus);
        }

    function handleDragMove(event: DragMoveEvent) {
            const container = scrollRef.current;
            if (!container) return;

            const { clientX } = event.activatorEvent as MouseEvent;

            const rect = container.getBoundingClientRect();

            const edgeThreshold = 100; // px from edge

            if (clientX > rect.right - edgeThreshold) {
              container.scrollBy({ left: 20, behavior: "smooth" });
            }

            if (clientX < rect.left + edgeThreshold) {
              container.scrollBy({ left: -20, behavior: "smooth" });
            }
        }

    function changeStatus(taskId: string, newStatus: string) {
        setTasks(prev =>
          prev.map(t =>
            t._id === taskId ? { ...t, status: newStatus as any } : t
          )
        );
      
        setAllTasks(prev =>
          prev.map(t =>
            t._id === taskId ? { ...t, status: newStatus as any } : t
          )
        );
      
        updateTaskStatus(taskId, newStatus);
      }

  return (
    <>
    <div className="lg:hidden block">
    <MobileTaskList tasks={tasks} changeStatus={changeStatus} />
  </div>
    <div className="hidden lg:block">

    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragMove={handleDragMove} >


    {/* <div  ref={scrollRef} className="
                    flex gap-6 overflow-x-auto pb-4 scroll-smooth touch-pan-x
                    md:grid md:grid-cols-2
                    sm:grid sm:grid-cols-1
                    lg:grid-cols-3
                    
                    "> */}
  <div
  ref={scrollRef}
  className="
    grid gap-4
    grid-cols-1 
    md:grid-cols-2 
    lg:grid-cols-3
    w-full
    
    
  "
>
      <KanbanColumn  
        title="Pending"
        status="pending"
        tasks={columns.pending}
        />

      <KanbanColumn
        title="In Progress"
        status="in-progress"
        tasks={columns["in-progress"]}
        />

      <KanbanColumn
        title="Completed"
        status="completed"
        tasks={columns.completed}
      />
       <DragOverlay>
      {activeTask ? (
        <div className="w-75">
          <KanbanTask task={activeTask} changeStatus={changeStatus} />
        </div>
      ) : null}
    </DragOverlay>

    </div>
        </DndContext>
    </div>
    
    </>
  );
}

