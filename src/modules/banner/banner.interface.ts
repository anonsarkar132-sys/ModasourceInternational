export interface IBanner {
  title?: string;
  subtitle?: string;
  mediaUrl: string;           // ✅ imageUrl → mediaUrl
  mediaType: "image" | "video"; // ✅ নতুন field
  isActive?: boolean;
}