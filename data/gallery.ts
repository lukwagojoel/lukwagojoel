export type GallerySize = "sm" | "wide" | "tall" | "lg";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  size: GallerySize;
}

// Swap the picsum placeholders for real files in /public when you have them.
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", src: "/me24.jpg", title: "Dashboard Concept", category: "UI", size: "lg" },
  { id: "g2", src: "/me25.jpg", title: "Studio Setup", category: "Snapshots", size: "sm" },
  { id: "g3", src: "https://picsum.photos/seed/joel-gfx-1/1600/1600", title: "Type Study", category: "Graphics", size: "sm" },
  { id: "g4", src: "https://picsum.photos/seed/joel-exp-1/1600/3200", title: "Shader Test", category: "Experiments", size: "tall" },
  { id: "g5", src: "/me25.jpg", title: "Mobile Flow", category: "UI", size: "wide" },
  { id: "g6", src: "https://picsum.photos/seed/joel-gfx-2/1600/1600", title: "Poster Draft", category: "Graphics", size: "sm" },
  { id: "g7", src: "/me3.jpg", title: "Gym Log", category: "Snapshots", size: "sm" },
  { id: "g8", src: "/me2.jpg", title: "Particle Field", category: "Experiments", size: "tall" },
  { id: "g9", src: "https://picsum.photos/seed/joel-ui-3/2400/2400", title: "Component Library", category: "UI", size: "lg" },
];