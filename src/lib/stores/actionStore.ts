import { writable } from 'svelte/store';
import type { AgriculturalAction } from '../../types/AgriculturalAction';

/**
 * Creates a custom store for managing agricultural actions
 */
function createActionStore() {
  const { subscribe, set, update } = writable<AgriculturalAction[]>([]);

  return {
    subscribe,
    addAction: (action: Omit<AgriculturalAction, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => update(actions => {
      const now = new Date();
      const newAction: AgriculturalAction = {
        id: Date.now().toString(),
        status: 'todo',
        ...action,
        createdAt: now,
        updatedAt: now
      };
      return [...actions, newAction];
    }),
    updateAction: (id: string, updates: Partial<Omit<AgriculturalAction, 'id' | 'createdAt' | 'updatedAt'>>) => update(actions => 
      actions.map(action => 
        action.id === id 
          ? { ...action, ...updates, updatedAt: new Date() } 
          : action
      )
    ),
    setStatus: (id: string, status: AgriculturalAction['status']) => update(actions => 
      actions.map(action => 
        action.id === id 
          ? { 
              ...action, 
              status, 
              completedDate: status === 'completed' ? new Date() : action.completedDate,
              updatedAt: new Date() 
            } 
          : action
      )
    ),
    removeAction: (id: string) => update(actions => 
      actions.filter(action => action.id !== id)
    ),
    getActionsByLand: (landId: string) => {
      let result: AgriculturalAction[] = [];
      subscribe(actions => {
        result = actions.filter(action => action.landId === landId);
      })();
      return result;
    },
    getActionsBySpace: (spaceId: string) => {
      let result: AgriculturalAction[] = [];
      subscribe(actions => {
        result = actions.filter(action => action.spaceId === spaceId);
      })();
      return result;
    },
    getActionsByStatus: (status: AgriculturalAction['status']) => {
      let result: AgriculturalAction[] = [];
      subscribe(actions => {
        result = actions.filter(action => action.status === status);
      })();
      return result;
    },
    reset: () => set([])
  };
}

export const actionStore = createActionStore(); 