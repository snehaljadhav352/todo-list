"use client";

import { useEffect, useState } from "react";
import { ITask } from "@/types/tasks";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface DeletedTaskDetailProps {
  params: {
    id: string;
  };
}

const DeletedTaskDetail = ({ params }: DeletedTaskDetailProps) => {
  const { id } = params;
  const [task, setTask] = useState<ITask | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedTasks: ITask[] = JSON.parse(
      localStorage.getItem("deletedTasks") || "[]"
    );
    const foundTask = savedTasks.find((t) => t.id === id);
    setTask(foundTask || null);
  }, [id]);
  console.log(task?.createdAt);

  if (!task)
    return <p className="text-center text-gray-600">Task not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Deleted Task Detail</h1>

        <p className="text-lg mb-4">
          <strong>Task:</strong> {task.text}
        </p>
        <p className="text-lg mb-4">
          <strong>Created At:</strong>{" "}
          {dayjs(task.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </p>
        <p className="text-lg mb-6">
          <strong>Deleted At:</strong>{" "}
          {dayjs(task.deletedAt).format("YYYY-MM-DD HH:mm:ss")}
        </p>

        <button
          onClick={() => router.push("/deletedTask")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Deleted Tasks
        </button>
      </div>
    </div>
  );
};
export default DeletedTaskDetail;
