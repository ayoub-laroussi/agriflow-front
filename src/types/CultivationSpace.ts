/**
 * Represents a cultivation space within a land
 */
export interface CultivationSpace {
  id: string;
  landId: string;  // Reference to the parent land
  name: string;
  type: 'field' | 'garden' | 'orchard' | 'rice_field';
  area: number;  // in square meters
  position?: {
    x: number;
    y: number;
  };
  description?: string;
  createdAt: Date;
  updatedAt: Date;
} 