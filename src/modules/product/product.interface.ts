export interface IProduct {
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  isFeatured?: boolean;
}