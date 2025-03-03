"use client";

import { useEffect, useState } from "react";
import { ITask } from "@/types/tasks";

const DeletedTasks = () => {
  const [deletedTasks, setDeletedTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("deletedTasks");
    if (savedTasks) setDeletedTasks(JSON.parse(savedTasks));
  }, []);

  return (
    <div>
      <h1>Deleted Tasks</h1>
      {deletedTasks.map((task) => (
        <div>
          <ul className="list-disc">
          <li key={task.id}>{task.text}</li>
        </ul>
          </div>
      ))}
    </div>
  );
};

export default DeletedTasks;
