<script lang="ts">
  import { taskStore } from '../../lib/stores/taskStore';
  // import { currentLang } from '../../lib/stores/i18nStore';
  import TodoItem from './TodoItem.svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  // import Translate from './Translate.svelte';
  
  let newTaskText = '';
  
  function handleAddTask(): void {
    if (newTaskText.trim()) {
      taskStore.addTask(newTaskText.trim());
      newTaskText = '';
    }
  }
  
  function handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  }
  
  function handleClearCompleted(): void {
    taskStore.clearCompleted();
  }
</script>

<div class="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
  <div class="p-4 bg-blue-500">
    <h2 class="text-2xl font-bold text-white text-center">
      <Translate key="todo.list.title" />
    </h2>
  </div>
  
  <div class="p-4 flex gap-2">
    <Input 
      id="new-task"
      label=""
      type="text" 
      placeholder={$currentLang === 'fr' ? 'Ajouter une tâche' : 'Add a task'}
      bind:value={newTaskText} 
    />
    <Button on:click={handleAddTask}>
      <Translate key="todo.list.add" />
    </Button>
  </div>
  
  <div class="divide-y divide-gray-200">
    {#if $taskStore.length === 0}
      <p class="p-4 text-center text-gray-500">
        <Translate key="todo.list.empty" />
      </p>
    {:else}
      {#each $taskStore as task (task.id)}
        <TodoItem {task} />
      {/each}
    {/if}
  </div>
  
  {#if $taskStore.some(task => task.completed)}
    <div class="p-4 bg-gray-50 flex justify-end">
      <Button 
        variant="secondary" 
        on:click={handleClearCompleted}
      >
        <Translate key="todo.list.clearCompleted" />
      </Button>
    </div>
  {/if}
</div>

<svelte:window on:keydown={handleKeyPress} /> 