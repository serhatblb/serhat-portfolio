// src/app/models/project.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[]; // ['Angular', 'Java', 'SQL'] gibi
  category: 'industrial' | 'web' | '3d'; // Filtreleme için
  imageUrl: string;
  githubUrl?: string; // Opsiyonel
}