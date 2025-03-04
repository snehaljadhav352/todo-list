"use client";

import { useEffect, useState } from "react";
import { ITask } from "@/types/tasks";
import { useRouter } from "next/navigation";
import { deleteTodo } from "@/api";
const DeletedTasks = () => {
  const [deletedTasks, setDeletedTasks] = useState<ITask[]>([]);
  const router = useRouter();

  // Ensure deletedTasks is loaded correctly when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("deletedTasks") || "[]");
    setDeletedTasks(savedTasks);
  }, []);

  const handleDeletedTaskDetails = (id: string) => {
    router.push(`/deletedTask/${id}`);
  };

  const handleDeleteTask = async (task: ITask) => {
    await deleteTodo(task.id); // Delete task from backend
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Deleted Tasks</h1>

      {deletedTasks.length === 0 ? (
        <p className="text-center text-gray-600">No deleted tasks found.</p>
      ) : (
        <div className="space-y-4">
          {deletedTasks.map((task) => (
            <div
              key={task.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              <p className="text-lg font-semibold">{task.text}</p>
              <button
                onClick={() => handleDeletedTaskDetails(task.id)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Task Details
              </button>
              <button
                onClick={() => handleDeleteTask(task)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Delete Permanantly
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeletedTasks;
