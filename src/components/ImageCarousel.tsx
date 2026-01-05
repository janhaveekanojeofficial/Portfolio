import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState } from "react";

interface ImageCarouselProps {
  images: string[];
}

/**
 * Modern Athlete Theme - Image Carousel Component
 * Redesigned to show multiple vertical rectangular images at once
 * Supports swipe gestures, arrow navigation, and click-to-expand modal
 */
export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Show 2 images at a time on mobile, maybe more on desktop
  const itemsToShow = 2;
  const maxIndex = Math.max(0, images.length - itemsToShow);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      goToNext();
    } else if (touchEnd - touchStart > 50) {
      goToPrevious();
    }
  };

  return (
    <div className="relative w-full bg-background">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full overflow-hidden rounded-lg"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Images Track */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / itemsToShow}%` }}
            >
              <div 
                className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg border border-border hover:border-accent transition-colors scale-[0.96] mx-auto"
                onClick={() => setExpandedIndex(index)}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* Click to expand hint on each image */}
                <div className="absolute bottom-2 right-2 bg-accent border border-accent rounded px-2 py-1 text-[10px] text-accent-foreground font-semibold shadow-lg opacity-0 hover:opacity-100 transition-opacity">
                  Expand
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-background/80 hover:bg-accent transition-all duration-300 backdrop-blur-sm border border-border hover:border-accent group"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} className="text-foreground group-hover:text-accent-foreground" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-background/80 hover:bg-accent transition-all duration-300 backdrop-blur-sm border border-border hover:border-accent group"
          aria-label="Next image"
        >
          <ChevronRight size={24} className="text-foreground group-hover:text-accent-foreground" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "bg-accent w-3 h-3"
                : "bg-muted hover:bg-muted-foreground w-2 h-2"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Expanded Image Modal */}
      {expandedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setExpandedIndex(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setExpandedIndex(null)}
              className="absolute -top-12 right-0 z-10 p-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Full Image */}
            <img
              src={images[expandedIndex]}
              alt={`Gallery image ${expandedIndex + 1} - Full size`}
              className="w-full h-full object-contain rounded-lg"
            />

            {/* Navigation Arrows in Modal */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedIndex(
                  expandedIndex === 0 ? images.length - 1 : expandedIndex - 1
                );
              }}
              className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-accent/20 hover:bg-accent/40 transition-all text-accent"
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedIndex(
                  expandedIndex === images.length - 1 ? 0 : expandedIndex + 1
                );
              }}
              className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-accent/20 hover:bg-accent/40 transition-all text-accent"
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Counter in Modal */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground rounded-full px-4 py-1 text-sm font-semibold">
              {expandedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
