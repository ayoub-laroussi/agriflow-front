<script lang="ts">
  import { taskStore } from '../../lib/stores/taskStore';
  import type { Task } from '../../types/Task';
  import Button from './Button.svelte';
  // import Translate from './Translate.svelte';
  
  export let task: Task;
  
  function handleToggle(): void {
    taskStore.toggleTask(task.id);
  }
  
  function handleDelete(): void {
    taskStore.removeTask(task.id);
  }
</script>

<div class="flex items-center justify-between p-4 border-b border-gray-200 last:border-0">
  <div class="flex items-center gap-3">
    <input 
      type="checkbox" 
      checked={task.completed} 
      on:change={handleToggle}
      class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
    />
    <span class={task.completed ? 'line-through text-gray-400' : ''}>
      {task.text}
    </span>
  </div>
  
  <Button 
    variant="danger" 
    size="sm" 
    on:click={handleDelete}
  >
    <Translate key="todo.list.delete" />
  </Button>
</div> 