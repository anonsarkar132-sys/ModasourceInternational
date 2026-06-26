export interface ICategory {
  name: string;
  slug: string;
  image?: string;
  parent?: string | null; // ObjectId of parent category, null if it's a main category
}