/** Ask Cloudinary for a smaller, compressed copy of an uploaded image (other URLs are returned as they are). */
export function smallCloudinary(url: string, width = 720): string {
  return url.includes("res.cloudinary.com") && url.includes("/upload/") && !url.includes("/upload/w_")
    ? url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`)
    : url;
}
