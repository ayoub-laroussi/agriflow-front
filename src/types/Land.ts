/**
 * Represents a land/field in the agriculture application
 */
export interface Land {
  id: string;
  name: string;
  area: number;  // in square meters
  location?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
} 