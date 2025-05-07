import { cld } from './cloudinary';
import type { CloudinaryImage } from '@cloudinary/url-gen';

export function optimizeCloudinaryUrl(
  original: string,
  transformations = 'f_auto,q_auto,w_auto'
): string {
  return original.replace('/upload/', `/upload/${transformations}/`);
}

/**
 * Converts a full Cloudinary URL into a CloudinaryImage instance for SDK transforms.
 * Returns undefined if the URL isn't a valid Cloudinary upload URL.
 *
 * @param url – the full Cloudinary URL
 */
export function cldImageFromUrl(url: string): CloudinaryImage | undefined {
  if (!url) return undefined;
  // Remove query parameters
  const cleanUrl = url.split('?')[0];
  // Extract the part after '/upload/', skipping version folder if present
  const match = cleanUrl.match(/\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match || !match[1]) {
    return undefined;
  }
  // Remove file extension to get the public ID (e.g. ".jpg", ".png")
  const publicIdWithExt = match[1];
  const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');
  return cld.image(publicId);
}