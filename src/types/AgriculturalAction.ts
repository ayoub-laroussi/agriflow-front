/**
 * Represents an agricultural action or task
 */
export interface AgriculturalAction {
  id: string;
  title: string;
  description?: string;
  type: 'planting' | 'watering' | 'fertilizing' | 'harvesting' | 'treatment' | 'pruning' | 'other';
  status: 'todo' | 'in_progress' | 'completed' | 'canceled';
  dueDate?: Date;
  completedDate?: Date;
  spaceId?: string;  // Reference to CultivationSpace if applicable
  landId?: string;   // Reference to Land if applicable
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
} 