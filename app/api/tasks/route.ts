import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid'; // For generating unique IDs
import { promises as fs } from 'fs';
import path from 'path';

// Helper to resolve the file path
const filePath = path.join(process.cwd(), 'data', 'todos.json');

// Helper function to read todos from file
async function readTodos() {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data).tasks;
}

// Helper function to write todos to file
async function writeTodos(tasks: any) {
  await fs.writeFile(filePath, JSON.stringify({ tasks }, null, 2));
}

// GET handler
export async function GET() {
    const tasks = await readTodos();
    return NextResponse.json(tasks);
  }

  // POST method to add a new todo
export async function POST(request: Request) {
    const newTask = await request.json();
    const tasks = await readTodos();
  
    // Add a unique ID to the new task
    newTask.id = nanoid();
  
    tasks.push(newTask);
    await writeTodos(tasks);
  
    return NextResponse.json(newTask, { status: 201 });
  }