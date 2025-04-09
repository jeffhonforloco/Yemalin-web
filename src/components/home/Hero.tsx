
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80",
    title: "The Art of Self-Expression",
    subtitle: "Discover pieces that tell your story through meticulous craftsmanship and timeless design",
    cta: "Explore Our Philosophy"
  },
  {
    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    title: "Heritage Meets Innovation",
    subtitle: "Where traditional artisan techniques blend with contemporary vision to create tomorrow's classics",
    cta: "Meet Our Artisans"
  },
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    title: "Curated For Your Journey",
    subtitle: "Thoughtfully selected pieces that evolve with you, becoming cherished chapters in your personal narrative",
    cta: "Style Stories"
  },
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    title: "Conscious Elegance",
    subtitle: "Embrace a lifestyle that values intention, quality, and the quiet luxury of mindful choices",
    cta: "Our Values"
  },
  {
    url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    title: "Beyond Fashion",
    subtitle: "A vision of living artfully—where your wardrobe becomes an extension of your authentic self",
    cta: "Lifestyle Journal"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const animationDuration = 400;

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), animationDuration);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setAutoplayPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    } else if (touchEnd - touchStart > 75) {
      prevSlide();
    }
    
    setTimeout(() => setAutoplayPaused(false), 5000);
  };

  const handleMouseEnter = () => {
    setAutoplayPaused(true);
  };

  const handleMouseLeave = () => {
    setAutoplayPaused(false);
  };

  useEffect(() => {
    if (autoplayPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, autoplayPaused]);

  return (
    <section 
      className="relative h-[90vh] min-h-[700px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide images */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-black/10 transition-opacity duration-${animationDuration} ease-in-out ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image.url}
              alt={`Yemalin Lifestyle ${index + 1}`}
              className={`w-full h-full object-cover object-center transition-transform duration-${animationDuration} ${
                currentSlide === index ? 'scale-100' : 'scale-110'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-2 max-w-full px-4">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Hero content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center px-4 max-w-2xl animate-fade-in">
          <p className="text-white text-sm uppercase tracking-widest mb-3 opacity-80">The Yemalin Experience</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-md">
            {heroImages[currentSlide].title}
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 drop-shadow-md">
            {heroImages[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/shop" 
              className="bg-white text-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors"
            >
              Discover Collections
            </Link>
            <Link 
              to="/blog" 
              className="bg-transparent border border-white text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-black transition-colors"
            >
              {heroImages[currentSlide].cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
