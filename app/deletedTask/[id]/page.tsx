"use client";

import { useEffect, useState } from "react";
import { ITask } from "@/types/tasks";

interface DeletedTaskDetailProps {
    params: {
      id: string;
    };
  }
  

const DeletedTaskDetail = ({params}:DeletedTaskDetailProps) => {
    const {id} = params;
  const [task, setTask] = useState<ITask | null>(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("deletedTasks") || "[]");
    const foundTask = savedTasks.find((t: ITask) => t.id === id);
    setTask(foundTask || null);
  }, [id]);

  if (!task) return <p>Task not found.</p>;

  return (
    <div>
      <h1>Deleted Task Detail</h1>
      <p>{task.text}</p>
    </div>
  );
};

export default DeletedTaskDetail;
