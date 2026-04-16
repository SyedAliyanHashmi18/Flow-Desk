'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";

export default function SearchBar({ projectId, setTasks, allTasks }: any) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim() === "") {
        setTasks(allTasks); 
        return;
      }

      handleSearch(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query, allTasks]);

  
const handleSearch = (value: string) => {
  const filtered = allTasks.filter((task: any) =>
    task.title.toLowerCase().includes(value.toLowerCase())
  );

  setTasks(filtered);
};
  return (
    <Field>
      <FieldLabel>Search</FieldLabel>

      <ButtonGroup>
        <Input
          type="text"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button
          variant="outline" disabled={loading}
          onClick={() => handleSearch(query)} 
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </ButtonGroup>
    </Field>
  );
}