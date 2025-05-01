// e.g. src/components/OptimizedImage/OptimizedImage.tsx
import React from 'react';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { cld } from '../../utils/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';
import type { CloudinaryImage } from '@cloudinary/url-gen';

interface Props {
  publicId: string;   
  alt?: string;
}

export const OptimizedImage: React.FC<Props> = ({ publicId, alt = '' }) => {
  // 1) grab the image  
  const img: CloudinaryImage = cld.image(publicId)
    .resize(fill().width(800).height(600))   
    .format('auto')                         
    .quality('auto');                        
  
  return (
    <AdvancedImage
      cldImg={img}
      plugins={[
        lazyload(),       // lazy-load offscreen
        responsive(),     // auto srcset
        placeholder({ mode: 'blur' }),  // blur placeholder
      ]}
      alt={alt}
    />
  );
};