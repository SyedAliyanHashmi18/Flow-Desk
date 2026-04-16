
'use client';

import { useState } from "react";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";

export default function Filters({ projectId, setTasks }: any) {

  const [filters, setFilters] = useState({
    status: "",
    priority: ""
  });

  const fetchTasks = async (newFilters: any) => {

  const cleanFilters: any = {};

  if (newFilters.status) cleanFilters.status = newFilters.status;
  if (newFilters.priority) cleanFilters.priority = newFilters.priority;

  const query = new URLSearchParams(cleanFilters).toString();

  const res = await axios.get(
    `/api/projects/${projectId}/tasks/filter?${query}`
  );

  if (res.data.success) {
    setTasks(res.data.tasks);
  }
};
  const handleFilterChange = (key: string, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    fetchTasks(updated);
  };
  const handleReset = async () => {
  const resetFilters = {
    status: "",
    priority: ""
  };

  setFilters(resetFilters);

  const res = await axios.get(
    `/api/projects/${projectId}/tasks/filter` 
  );

  if (res.data.success) {
    setTasks(res.data.tasks);
  }
};

  return (
    <div className="flex gap-4">

      {/* Status */}
      <Select  value={filters.status || undefined} onValueChange={(value) => handleFilterChange("status", value)}>
        <SelectTrigger className="w-37.5">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      {/* Priority */}
      <Select  value={filters.priority || undefined} onValueChange={(value) => handleFilterChange("priority", value)}>
        <SelectTrigger className="w-37.5">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
            <Button variant="secondary" onClick={handleReset}>
            Reset Filters
            </Button>
    </div>
  );
}