
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "Yemalin has transformed my shopping experience. The curation of designers is impeccable, and the quality of every piece I've purchased exceeds expectations.",
    author: "Sophia K.",
    location: "New York, NY",
    rating: 5
  },
  {
    id: 2,
    text: "As someone who values quality and uniqueness, Yemalin has become my go-to marketplace for discovering new designers and adding statement pieces to my wardrobe.",
    author: "Marcus T.",
    location: "London, UK",
    rating: 5
  },
  {
    id: 3,
    text: "The attention to detail in every aspect of Yemalin's service is remarkable. From the packaging to the personalized recommendations, it's a truly luxury experience.",
    author: "Elena R.",
    location: "Milan, Italy",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-white">
      <div className="luxury-container">
        <h2 className="text-2xl md:text-3xl font-display mb-10 text-center">What Our Clients Say</h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <button 
            onClick={goToPrevious} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={goToNext} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Testimonial content */}
          <div className="overflow-hidden px-14">
            <div 
              className="transition-all duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)`, display: 'flex' }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 text-center px-4"
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        fill={i < testimonial.rating ? "currentColor" : "none"} 
                        className="text-yemalin-accent"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl font-display italic mb-6">
                    "{testimonial.text}"
                  </blockquote>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full ${activeIndex === i ? 'bg-yemalin-black' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
