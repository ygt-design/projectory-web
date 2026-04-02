/**
 * Adds Cloudinary transformations to a raw Cloudinary URL.
 * For images: use 'f_auto,q_auto' (auto format + auto quality)
 * For videos: use 'q_auto' (auto quality)
 *
 * Example:
 *   optimizeCloudinaryUrl('https://res.cloudinary.com/dazzkestf/image/upload/v123/photo.webp')
 *   → 'https://res.cloudinary.com/dazzkestf/image/upload/f_auto,q_auto/v123/photo.webp'
 */
export function optimizeCloudinaryUrl(
  original: string,
  transformations = 'f_auto,q_auto'
): string {
  if (!original || !original.includes('res.cloudinary.com')) return original;

  // Split requested transformations and filter out ones already in the URL
  const newParams = transformations.split(',').filter(t => !original.includes(t));
  if (newParams.length === 0) return original;

  const afterUpload = original.indexOf('/upload/') + '/upload/'.length;
  const hasExistingTransforms = !/^v\d/.test(original.slice(afterUpload));

  if (hasExistingTransforms) {
    // Append new params to existing transform chain
    const nextSlash = original.indexOf('/', afterUpload);
    return original.slice(0, nextSlash) + ',' + newParams.join(',') + original.slice(nextSlash);
  }

  return original.replace('/upload/', `/upload/${newParams.join(',')}/`);
}
