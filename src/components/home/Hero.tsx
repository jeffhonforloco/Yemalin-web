
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80",
    title: "Discover Curated Luxury",
    subtitle: "Exclusive designer collections from the world's most prestigious fashion houses"
  },
  {
    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    title: "Artisan Craftsmanship",
    subtitle: "Meticulous attention to detail and exceptional quality in every piece"
  },
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    title: "Elevate Your Style",
    subtitle: "Timeless elegance meets contemporary design for the discerning client"
  },
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    title: "Modern Sophistication",
    subtitle: "Embrace the future of fashion with cutting-edge designs and innovative materials"
  },
  {
    url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    title: "Runway to Reality",
    subtitle: "From catwalk to closet, experience the latest trends in high fashion"
  },
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    title: "Digital Elegance",
    subtitle: "Where technology meets fashion in our exclusive online collections"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 700); // Match transition duration
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 700); // Match transition duration
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Slide images */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-black/10 transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image.url}
              alt={`Luxury Fashion ${index + 1}`}
              className={`w-full h-full object-cover object-center transition-transform duration-700 ${
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
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setCurrentSlide(index);
              setTimeout(() => setIsAnimating(false), 700);
            }}
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
              Shop Now
            </Link>
            <Link 
              to="/designers" 
              className="bg-transparent border border-white text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-black transition-colors"
            >
              Discover Designers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
