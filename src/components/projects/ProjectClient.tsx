'use client';

import { useState } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import MobileTaskList from "@/components/kanban/MobileTasksList";

export default function ProjectClient({ initialTasks, projectId }: any) {

  const [allTasks, setAllTasks] = useState(initialTasks); // 🔥 original
  const [tasks, setTasks] = useState(initialTasks);       // 🔥 filtered
  
  
  return (
    <div className="space-y-6">

      <SearchBar 
        projectId={projectId} 
        allTasks={allTasks}
        setTasks={setTasks} 
      />

      <Filters 
        projectId={projectId} 
        allTasks={allTasks}
        setTasks={setTasks} 
      />
  

      <KanbanBoard 
        tasks={tasks} 
        setTasks={setTasks}          
        setAllTasks={setAllTasks}
        projectId={projectId}
      />
  

  

    </div>
  );
}