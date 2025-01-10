import { ImageLoader } from 'next/image';

interface ImageOptimizationParams {
  src: string;
  width: number;
  quality?: number;
}

// Custom image loader voor optimale afbeeldingen
export const customImageLoader: ImageLoader = ({ src, width, quality = 75 }: ImageOptimizationParams) => {
  // Gebruik een CDN voor productie
  if (process.env.NODE_ENV === 'production') {
    return `https://cdn.example.com/image/${src}?w=${width}&q=${quality}`;
  }
  
  // Lokale ontwikkeling
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

// Bepaal optimale afbeeldingsgrootte
export const getOptimalImageSize = (containerWidth: number): number => {
  const breakpoints = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
  return breakpoints.find(bp => bp >= containerWidth) || breakpoints[breakpoints.length - 1];
};

// Laad afbeeldingen progressief
export const getProgressiveImageProps = (src: string, containerWidth: number) => {
  const width = getOptimalImageSize(containerWidth);
  
  return {
    src,
    width,
    height: Math.round(width * (9/16)), // 16:9 aspect ratio
    quality: 75,
    loading: 'lazy' as const,
    placeholder: 'blur',
    blurDataURL: `data:image/svg+xml;base64,...`, // Placeholder image
  };
};

// Genereer srcset voor responsive afbeeldingen
export const generateSrcSet = (src: string): string => {
  const sizes = [640, 750, 828, 1080, 1200, 1920];
  return sizes
    .map(size => `${customImageLoader({ src, width: size })} ${size}w`)
    .join(', ');
};
