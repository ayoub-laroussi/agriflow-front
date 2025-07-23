import { writable } from 'svelte/store';
import type { Land as FrontendLand } from '../../types/Land';
import { LandService, type Land as ApiLand } from '../utils/api';

// Fonction pour convertir un terrain de l'API en terrain frontend
function apiToFrontendLand(apiLand: ApiLand): FrontendLand {
  return {
    id: apiLand.id_land,
    name: apiLand.land_name,
    area: apiLand.land_area,
    location: apiLand.land_coordinate?.toString(),
    description: '',
    createdAt: new Date(apiLand.land_creation_date),
    updatedAt: new Date(apiLand.land_modification_date)
  };
}

// Fonction pour convertir un terrain frontend en DTO pour l'API
function frontendToApiLandDto(frontendLand: Omit<FrontendLand, 'id' | 'createdAt' | 'updatedAt'>) {
  return {
    land_name: frontendLand.name,
    land_area: frontendLand.area,
    land_coordinate: frontendLand.location ? parseFloat(frontendLand.location) : undefined,
    // Note: L'ID utilisateur devrait être récupéré depuis le contexte d'authentification
    id_user: '1' // Valeur temporaire, à remplacer par l'ID réel de l'utilisateur
  };
}

/**
 * Creates a custom store for managing lands
 */
function createLandStore() {
  const { subscribe, set, update } = writable<FrontendLand[]>([]);

  return {
    subscribe,
    // Initialise le store avec les données de l'API
    init: async (userId?: string) => {
      try {
        let lands: ApiLand[];
        if (userId) {
          lands = await LandService.getLandsByUser(userId);
        } else {
          lands = await LandService.getAllLands();
        }
        set(lands.map(apiToFrontendLand));
      } catch (error) {
        console.error('Erreur lors de l\'initialisation des terrains:', error);
        set([]);
      }
    },
    addLand: async (land: Omit<FrontendLand, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        const apiLandDto = frontendToApiLandDto(land);
        const newApiLand = await LandService.createLand(apiLandDto);
        const newLand = apiToFrontendLand(newApiLand);
        
        update(lands => [...lands, newLand]);
        return newLand;
      } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un terrain:', error);
        // Fallback à la méthode locale en cas d'erreur
        const now = new Date();
        const newLand: FrontendLand = {
          id: Date.now().toString(),
          ...land,
          createdAt: now,
          updatedAt: now
        };
        update(lands => [...lands, newLand]);
        return newLand;
      }
    },
    updateLand: async (id: string, updates: Partial<Omit<FrontendLand, 'id' | 'createdAt' | 'updatedAt'>>) => {
      try {
        const apiUpdates = {
          land_name: updates.name,
          land_area: updates.area,
          land_coordinate: updates.location ? parseFloat(updates.location) : undefined
        };
        
        const updatedApiLand = await LandService.updateLand(id, apiUpdates);
        const updatedLand = apiToFrontendLand(updatedApiLand);
        
        update(lands => 
          lands.map(land => land.id === id ? updatedLand : land)
        );
        return updatedLand;
      } catch (error) {
        console.error(`Erreur lors de la mise à jour du terrain ${id}:`, error);
        // Fallback à la méthode locale en cas d'erreur
        update(lands => 
          lands.map(land => 
            land.id === id 
              ? { ...land, ...updates, updatedAt: new Date() } 
              : land
          )
        );
        return null;
      }
    },
    removeLand: async (id: string) => {
      try {
        await LandService.deleteLand(id);
        update(lands => lands.filter(land => land.id !== id));
        return true;
      } catch (error) {
        console.error(`Erreur lors de la suppression du terrain ${id}:`, error);
        // Fallback à la méthode locale en cas d'erreur
        update(lands => lands.filter(land => land.id !== id));
        return false;
      }
    },
    getLandById: (id: string) => {
      let result: FrontendLand | undefined;
      subscribe(lands => {
        result = lands.find(land => land.id === id);
      })();
      return result;
    },
    reset: () => set([])
  };
}

export const landStore = createLandStore();