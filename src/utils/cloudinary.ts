// src/utils/cloudinary.ts
import { Cloudinary } from '@cloudinary/url-gen';

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'defaultCloudName',
  },
  url: {
  },
});