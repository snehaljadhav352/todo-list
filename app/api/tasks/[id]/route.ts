import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// File path
const filePath = path.join(process.cwd(), 'data', 'todos.json');

// Read todos from file
async function readTodos() {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data).tasks;
}

// Write todos to file
async function writeTodos(tasks: any) {
  await fs.writeFile(filePath, JSON.stringify({ tasks }, null, 2));
}

// PUT method to update a todo
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const updatedTask = await request.json();
  const tasks = await readTodos();

  const index = tasks.findIndex((task: any) => task.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  tasks[index] = { ...tasks[index], ...updatedTask };
  await writeTodos(tasks);
  return NextResponse.json(tasks[index]);
}

// DELETE method to remove a todo
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const tasks = await readTodos();

  const filteredTasks = tasks.filter((task: any) => task.id !== id);
  if (tasks.length === filteredTasks.length) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  await writeTodos(filteredTasks);
  return NextResponse.json({ message: 'Task deleted successfully' }, { status: 204 });
}