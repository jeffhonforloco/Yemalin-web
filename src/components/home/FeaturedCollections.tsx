
import { Link } from 'react-router-dom';

const FeaturedCollections = () => {
  return (
    <section className="py-16">
      <div className="luxury-container">
        <h2 className="text-2xl md:text-3xl font-display mb-10 text-center">Featured Collections</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Collection 1 */}
          <div className="group relative h-[500px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Summer Essentials"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-white text-2xl font-display mb-2">Summer Essentials</h3>
                <p className="text-white mb-4">Effortless luxury for warm-weather days</p>
                <Link 
                  to="/collections/summer-essentials"
                  className="inline-block bg-white text-black px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
          
          {/* Collection 2 */}
          <div className="group relative h-[500px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
              alt="Parisian Chic"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-white text-2xl font-display mb-2">Parisian Chic</h3>
                <p className="text-white mb-4">Timeless elegance inspired by the streets of Paris</p>
                <Link 
                  to="/collections/parisian-chic"
                  className="inline-block bg-white text-black px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
