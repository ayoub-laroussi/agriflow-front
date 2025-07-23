import { writable } from 'svelte/store';
import type { CultivationSpace } from '../../types/CultivationSpace';

/**
 * Creates a custom store for managing cultivation spaces
 */
function createSpaceStore() {
  const { subscribe, set, update } = writable<CultivationSpace[]>([]);

  return {
    subscribe,
    addSpace: (space: Omit<CultivationSpace, 'id' | 'createdAt' | 'updatedAt'>) => update(spaces => {
      const now = new Date();
      const newSpace: CultivationSpace = {
        id: Date.now().toString(),
        ...space,
        createdAt: now,
        updatedAt: now
      };
      return [...spaces, newSpace];
    }),
    updateSpace: (id: string, updates: Partial<Omit<CultivationSpace, 'id' | 'createdAt' | 'updatedAt'>>) => update(spaces => 
      spaces.map(space => 
        space.id === id 
          ? { ...space, ...updates, updatedAt: new Date() } 
          : space
      )
    ),
    removeSpace: (id: string) => update(spaces => 
      spaces.filter(space => space.id !== id)
    ),
    getSpaceById: (id: string) => {
      let result: CultivationSpace | undefined;
      subscribe(spaces => {
        result = spaces.find(space => space.id === id);
      })();
      return result;
    },
    getSpacesByLand: (landId: string) => {
      let result: CultivationSpace[] = [];
      subscribe(spaces => {
        result = spaces.filter(space => space.landId === landId);
      })();
      return result;
    },
    reset: () => set([])
  };
}

export const spaceStore = createSpaceStore(); 