
export type ProjectFromAPI = {
  id?: string;
  name: string;
  description: string;
  url?: string;
  link?: string;
  href?: string;
  image?: string;
  stack?: string[];
  projectType?: "personal" | "client";
  visibility?: "public" | "private";
  order?: number;
};