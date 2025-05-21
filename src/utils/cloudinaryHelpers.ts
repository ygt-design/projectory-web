// import { cld } from './cloudinary';
// import type { CloudinaryImage } from '@cloudinary/url-gen';

// export function optimizeCloudinaryUrl(
//   original: string,
//   transformations = 'f_auto,q_auto,w_auto'
// ): string {
//   return original.replace('/upload/', `/upload/${transformations}/`);
// }

// export function cldImageFromUrl(url: string): CloudinaryImage | undefined {
//   if (!url) return undefined;

//   const cleanUrl = url.split('?')[0];
//   const match = cleanUrl.match(/\/upload\/(?:v\d+\/)?(.+)$/);
//   if (!match || !match[1]) {
//     return undefined;
//   }
//   const publicIdWithExt = match[1];
//   const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');
//   return cld.image(publicId);
// }