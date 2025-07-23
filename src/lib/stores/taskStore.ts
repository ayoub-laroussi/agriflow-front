import { writable } from 'svelte/store';
import type { Task } from '../../types/Task';

/**
 * Creates a custom store for managing tasks
 */
function createTaskStore() {
  const { subscribe, set, update } = writable<Task[]>([]);

  return {
    subscribe,
    addTask: (text: string) => update(tasks => {
      const newTask: Task = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date()
      };
      return [...tasks, newTask];
    }),
    removeTask: (id: string) => update(tasks => 
      tasks.filter(task => task.id !== id)
    ),
    toggleTask: (id: string) => update(tasks => 
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    ),
    clearCompleted: () => update(tasks => 
      tasks.filter(task => !task.completed)
    ),
    reset: () => set([])
  };
}

export const taskStore = createTaskStore(); 