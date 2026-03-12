import { useState, useRef, useCallback, useEffect } from "react";
import { Play } from "lucide-react";
import { productImageMap, productGalleryMap, type MediaItem } from "@/lib/productImages";

interface ProductGalleryProps {
  imageKey: string;
  productName: string;
}

const ProductGallery = ({ imageKey, productName }: ProductGalleryProps) => {
  const gallery = productGalleryMap[imageKey];
  const hasGallery = gallery && gallery.length > 1;

  const fallbackItems: MediaItem[] = [
    { type: "image", src: productImageMap[imageKey], key: imageKey },
  ];

  const items = hasGallery ? gallery : fallbackItems;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeItem = items[activeIndex];

  const handleSelect = useCallback((index: number) => {
    if (index === activeIndex) return;
    setIsTransitioning(true);
    setVideoPlaying(false);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  }, [activeIndex]);

  // Autoplay/pause video when slide changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeItem.type === "video") {
      video.play().then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  }, [activeIndex, activeItem]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < items.length - 1) {
        handleSelect(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        handleSelect(activeIndex - 1);
      }
    }
    setTouchStart(null);
  };

  const handleVideoTap = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
      setVideoPlaying(true);
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-3 lg:gap-4">
      {/* Main display */}
      <div
        className="relative flex-1 rounded-lg overflow-hidden"
        style={{ background: "hsl(35 20% 96%)" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="aspect-square flex items-center justify-center">
          {activeItem.type === "image" ? (
            <img
              key={activeItem.key}
              src={activeItem.src}
              alt={`${productName} - vue ${activeIndex + 1}`}
              className={`w-full h-full object-contain p-6 lg:p-10 transition-all duration-300 ease-out hover:scale-[1.03] ${
                isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
              }`}
              loading={activeIndex === 0 ? "eager" : "lazy"}
              fetchPriority={activeIndex === 0 ? "high" : undefined}
            />
          ) : (
            <div
              className={`relative w-full h-full cursor-pointer transition-all duration-300 ease-out ${
                isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
              }`}
              onClick={handleVideoTap}
            >
              <video
                ref={videoRef}
                src={activeItem.src}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-contain p-6 lg:p-10"
              />
              {/* Custom play overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  videoPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <Play className="w-5 h-5 text-foreground ml-0.5" fill="currentColor" strokeWidth={0} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile swipe dots */}
        {hasGallery && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-foreground w-4" : "bg-foreground/25"
                }`}
                aria-label={`Vue ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {hasGallery && (
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:w-[88px] pb-1 lg:pb-0 scrollbar-none">
          {items.map((item, i) => (
            <button
              key={item.key}
              onClick={() => handleSelect(i)}
              className={`relative flex-shrink-0 w-16 h-16 lg:w-[88px] lg:h-[88px] rounded-md overflow-hidden transition-all duration-300 ${
                i === activeIndex
                  ? "ring-2 ring-foreground/80 ring-offset-2 ring-offset-background"
                  : "hover:ring-1 hover:ring-foreground/20 hover:ring-offset-1 hover:ring-offset-background"
              }`}
              style={{ background: "hsl(35 20% 96%)" }}
              aria-label={item.type === "video" ? "Voir la vidéo" : `Vue ${i + 1}`}
            >
              {item.type === "video" ? (
                <div className="w-full h-full relative">
                  <img src={items[0]?.src || ""} alt="Vidéo" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-foreground/30" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <div className="w-7 h-7 rounded-full bg-background/90 flex items-center justify-center shadow-sm">
                      <Play className="w-3 h-3 text-foreground ml-0.5" fill="currentColor" strokeWidth={0} />
                    </div>
                    <span className="text-[8px] uppercase tracking-[0.15em] text-background font-medium">Vidéo</span>
                  </div>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={`${productName} - miniature ${i + 1}`}
                  className="w-full h-full object-contain p-1 transition-opacity duration-200"
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
