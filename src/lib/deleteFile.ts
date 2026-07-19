import fs from "fs";
import path from "path";

/**
 * Deletes a file from the public/uploads directory.
 * Extracts the relative path from a URL like /uploads/products/filename.jpg
 * Returns true if deleted, false if file didn't exist.
 */
export const deleteUploadedFile = (fileUrl: string): boolean => {
  if (!fileUrl) return false;

  // Only delete local uploads (not external URLs)
  if (!fileUrl.startsWith("/uploads/")) return false;

  const filePath = path.join(process.cwd(), "public", fileUrl);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch (error) {
    console.error(`Failed to delete file: ${filePath}`, error);
  }
  return false;
};

/**
 * Deletes multiple uploaded files.
 */
export const deleteMultipleFiles = (fileUrls: string[]): void => {
  fileUrls.forEach((url) => deleteUploadedFile(url));
};
