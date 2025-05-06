// src/utils/cloudinaryHelpers.ts

import { cld } from './cloudinary';
import type { CloudinaryImage } from '@cloudinary/url-gen';

/**
 * Injects a Cloudinary transformation string into a raw Cloudinary URL.
 *
 * @param original – the full URL (e.g. https://res.cloudinary.com/…/upload/v1234/…jpg)
 * @param transformations – e.g. 'f_auto,q_auto,w_400'
 * @returns the URL with `/upload/${transformations}/` inserted
 */
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
  // Match the part after '/upload/' optionally skipping version 'v1234/'
  const match = cleanUrl.match(/\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match || !match[1]) {
    return undefined;
  }
  const publicId = match[1];
  return cld.image(publicId);
}