import { useState, useEffect, useRef } from 'react';

/**
 * LazyImage component with WebP support and responsive srcsets
 *
 * @param {string} src - Path to the original image (used as fallback)
 * @param {string} webp - Path to the WebP version
 * @param {object} srcset - Object with sizes: { 640: "path-640w.webp", 1024: "...", 1920: "..." }
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS classes
 * @param {string} sizes - Sizes attribute for responsive images (default: "100vw")
 */
const LazyImage = ({
  src,
  webp,
  srcset = {},
  alt = '',
  className = '',
  sizes = '100vw',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Generate srcset string from object
  const generateSrcSet = (srcsetObj, format = 'webp') => {
    if (!srcsetObj || Object.keys(srcsetObj).length === 0) return '';

    return Object.entries(srcsetObj)
      .map(([size, path]) => `${path} ${size}w`)
      .join(', ');
  };

  // Get the base directory and filename from src
  const getOptimizedPath = (originalSrc, format = 'webp') => {
    if (webp && format === 'webp') return webp;

    // If no explicit webp prop, try to construct path to optimized version
    const pathParts = originalSrc.split('/');
    const filename = pathParts[pathParts.length - 1];
    const filenameWithoutExt = filename.split('.')[0];
    const directory = pathParts.slice(0, -2).join('/'); // Remove last two parts (folder/filename)

    return `${directory}/assets/optimized/${pathParts[pathParts.length - 2]}/${filenameWithoutExt}.${format}`;
  };

  const webpSrc = webp || getOptimizedPath(src, 'webp');
  const fallbackSrc = src;

  // Generate srcset for WebP
  const webpSrcSet = Object.keys(srcset).length > 0
    ? generateSrcSet(srcset)
    : '';

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse"
          style={{ aspectRatio: '4/3' }}
        />
      )}

      {/* Actual image - only render when in viewport */}
      {isInView && (
        <picture>
          {/* WebP source with srcset */}
          {webpSrc && (
            <source
              type="image/webp"
              srcSet={webpSrcSet || webpSrc}
              sizes={sizes}
            />
          )}

          {/* Fallback JPG/PNG */}
          <img
            src={fallbackSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;
