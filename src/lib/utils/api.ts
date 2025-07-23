/**
 * Service API pour communiquer avec le backend
 * 
 * Ce service fournit des méthodes pour interagir avec l'API backend
 * en utilisant l'API Fetch.
 */

const API_URL = 'http://localhost:3000';

/**
 * Interface pour les réponses API standardisées
 */
export interface ApiResponse<T> {
  message: string;
  data?: T;
  statusCode: number;
}

/**
 * Interface pour les erreurs API
 */
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

/**
 * Classe pour gérer les requêtes API
 */
export class ApiService {
  /**
   * Effectue une requête GET
   * @param endpoint - Le point de terminaison de l'API
   * @returns Les données de la réponse
   */
  static async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la requête GET vers ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Effectue une requête POST
   * @param endpoint - Le point de terminaison de l'API
   * @param data - Les données à envoyer
   * @returns Les données de la réponse
   */
  static async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la requête POST vers ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Effectue une requête PATCH
   * @param endpoint - Le point de terminaison de l'API
   * @param data - Les données à envoyer
   * @returns Les données de la réponse
   */
  static async patch<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la requête PATCH vers ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Effectue une requête DELETE
   * @param endpoint - Le point de terminaison de l'API
   * @returns Les données de la réponse
   */
  static async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la requête DELETE vers ${endpoint}:`, error);
      throw error;
    }
  }
}

/**
 * Service pour les opérations liées aux terrains
 */
export const LandService = {
  /**
   * Récupère tous les terrains
   * @returns Liste des terrains
   */
  getAllLands: async () => {
    return ApiService.get<Land[]>('/lands');
  },

  /**
   * Récupère un terrain par son ID
   * @param id - ID du terrain
   * @returns Le terrain
   */
  getLandById: async (id: string) => {
    return ApiService.get<Land>(`/lands/${id}`);
  },

  /**
   * Récupère les terrains d'un utilisateur
   * @param userId - ID de l'utilisateur
   * @returns Liste des terrains de l'utilisateur
   */
  getLandsByUser: async (userId: string) => {
    return ApiService.get<Land[]>(`/lands/user/${userId}`);
  },

  /**
   * Crée un nouveau terrain
   * @param landData - Données du terrain
   * @returns Le terrain créé
   */
  createLand: async (landData: CreateLandDto) => {
    return ApiService.post<Land>('/lands', landData);
  },

  /**
   * Met à jour un terrain
   * @param id - ID du terrain
   * @param landData - Données du terrain
   * @returns Le terrain mis à jour
   */
  updateLand: async (id: string, landData: UpdateLandDto) => {
    return ApiService.patch<Land>(`/lands/${id}`, landData);
  },

  /**
   * Supprime un terrain
   * @param id - ID du terrain
   * @returns Void
   */
  deleteLand: async (id: string) => {
    return ApiService.delete<void>(`/lands/${id}`);
  }
};

/**
 * Interface pour les données de création d'un terrain
 */
export interface CreateLandDto {
  land_name: string;
  land_area: number;
  land_coordinate?: number | string;
  id_user: string;
}

/**
 * Interface pour les données de mise à jour d'un terrain
 */
export interface UpdateLandDto {
  land_name?: string;
  land_area?: number;
  land_coordinate?: number | string;
}

/**
 * Interface pour un terrain
 * Correspond exactement à la structure de l'entité Land dans l'API
 */
export interface Land {
  id_land: string;
  land_name: string;
  land_area: number;
  land_coordinate?: number | string;
  id_user: string;
  land_creation_date: Date;
  land_modification_date: Date;
}