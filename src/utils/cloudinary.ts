// src/utils/cloudinary.ts
import { Cloudinary } from '@cloudinary/url-gen';

export const cld = new Cloudinary({
  cloud: {
    cloudName: 'dduchyyhf',
  },
  url: {
    secure: true,
  },
});