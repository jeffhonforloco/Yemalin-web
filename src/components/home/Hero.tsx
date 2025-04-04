
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px]">
      {/* Hero background image */}
      <div className="absolute inset-0 bg-black/10">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80"
          alt="Luxury Fashion"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Hero content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-md">
            Discover Curated Luxury
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 drop-shadow-md">
            Exclusive designer collections from the world's most prestigious fashion houses
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
