<script lang="ts">
  import { dashboardStore } from '../../lib/stores/dashboardStore';
  import MainDashboardSection from './MainDashboardSection.svelte';
  import TasksSection from './TasksSection.svelte';
  import SpacesSection from './SpacesSection.svelte';
  import CalendarSection from './CalendarSection.svelte';
  import CulturesSection from './CulturesSection.svelte';
  import TerrainsSection from './TerrainsSection.svelte';
  
  // Ajouter un log pour débugger
  console.log('Dashboard mounted, active section:', $dashboardStore.activeSection);
</script>

<div>
  <!-- Section principale du tableau de bord - forcer l'affichage si aucune section n'est active -->
  <MainDashboardSection isActive={$dashboardStore.activeSection === 'main' || !$dashboardStore.activeSection} />
  
  <!-- Section des tâches -->
  <TasksSection isActive={$dashboardStore.activeSection === 'tasks'} />
  
  <!-- Section des espaces -->
  <SpacesSection isActive={$dashboardStore.activeSection === 'spaces'} />
  
  <!-- Section du calendrier -->
  <CalendarSection isActive={$dashboardStore.activeSection === 'calendar'} />
  
  <!-- Section des cultures -->
  <CulturesSection isActive={$dashboardStore.activeSection === 'cultures'} />
  
  <!-- Section des terrains -->
  <TerrainsSection isActive={$dashboardStore.activeSection === 'terrains'} />
</div>
