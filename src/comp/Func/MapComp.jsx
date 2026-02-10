import React, { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyImage from "../../components/LazyImage";

const MapComp = ({ src, alt, children }) => {
  // لو src Array => هنعرض سلايدر
  const isArray = Array.isArray(src);

  // Helper function to get optimized image paths
  const getOptimizedPaths = (imagePath) => {
    const pathParts = imagePath.split('/');
    const filename = pathParts[pathParts.length - 1];
    const filenameWithoutExt = filename.split('.')[0];
    const folder = pathParts[pathParts.length - 2]; // e.g., 'map', 'trans', 'coaches'

    // Map images are in /assets/optimized/assets/map/
    // Other images (coaches, trans) are in /assets/optimized/coaches/ or /assets/optimized/trans/
    const optimizedPath = folder === 'map'
      ? `/assets/optimized/assets/map/${filenameWithoutExt}`
      : `/assets/optimized/${folder}/${filenameWithoutExt}`;

    return {
      webp: `${optimizedPath}.webp`,
      srcset: {
        640: `${optimizedPath}-640w.webp`,
        1024: `${optimizedPath}-1024w.webp`,
        1920: `${optimizedPath}-1920w.webp`,
      }
    };
  };

  // Memoize settings to prevent recreation on every render
  const settings = useMemo(() => ({
    customPaging: function (i) {
      const paths = getOptimizedPaths(src[i]);
      return (
        <LazyImage
          src={src[i]}
          webp={paths.webp}
          alt={`thumb-${i}`}
          className="w-16 h-12 rounded"
        />
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }), [src]);

  return (
    <div className="flex flex-col items-center gap-5 py-5">
      {isArray ? (
        <div className="w-full max-w-2xl">
          <Slider {...settings}>
            {src.map((s, index) => {
              const paths = getOptimizedPaths(s);
              return (
                <div key={index}>
                  <LazyImage
                    src={s}
                    webp={paths.webp}
                    srcset={paths.srcset}
                    alt={`${alt}-${index}`}
                    className="w-full h-auto rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        (() => {
          const paths = getOptimizedPaths(src);
          return (
            <LazyImage
              src={src}
              webp={paths.webp}
              srcset={paths.srcset}
              alt={alt}
              className="w-128 h-128"
              sizes="512px"
            />
          );
        })()
      )}

      <h3 className="text-2xl font-bold text-center text-blue-600 mt-12">Details:</h3>
      <div className="text-l text-start font-bold pl-4">{children}</div>
    </div>
  );
};

export default MapComp;
