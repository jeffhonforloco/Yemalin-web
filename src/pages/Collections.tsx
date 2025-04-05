
import MainLayout from '@/components/layouts/MainLayout';
import { Link } from 'react-router-dom';

// Mock data for collections
const collections = [
  {
    id: 'summer-essentials',
    title: 'Summer Essentials',
    description: 'Effortless luxury for warm-weather days',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    link: '/collections/summer-essentials'
  },
  {
    id: 'parisian-chic',
    title: 'Parisian Chic',
    description: 'Timeless elegance inspired by the streets of Paris',
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
    link: '/collections/parisian-chic'
  },
  {
    id: 'sustainable-luxury',
    title: 'Sustainable Luxury',
    description: 'Ethical fashion that doesn\'t compromise on style',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    link: '/collections/sustainable-luxury'
  },
  {
    id: 'minimalist-essentials',
    title: 'Minimalist Essentials',
    description: 'Clean lines and understated sophistication',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    link: '/collections/minimalist-essentials'
  },
  {
    id: 'evening-elegance',
    title: 'Evening Elegance',
    description: 'Sophisticated attire for special occasions',
    image: 'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1449&q=80',
    link: '/collections/evening-elegance'
  },
  {
    id: 'statement-accessories',
    title: 'Statement Accessories',
    description: 'Bold pieces that elevate any outfit',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    link: '/collections/statement-accessories'
  }
];

const specialCollections = [
  {
    id: 'artisan-series',
    title: 'The Artisan Series',
    description: 'A celebration of traditional craftsmanship and handmade luxury, featuring pieces created by master artisans from around the world.',
    image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    link: '/collections/artisan-series'
  },
  {
    id: 'limited-editions',
    title: 'Limited Editions',
    description: 'Exclusive pieces available for a limited time only. Each item is numbered and comes with a certificate of authenticity.',
    image: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    link: '/collections/limited-editions'
  }
];

const Collections = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-yemalin-grey-100 py-16">
        <div className="luxury-container text-center">
          <h1 className="text-3xl md:text-4xl font-display mb-4">Our Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections, each telling its own unique story through design, 
            craftsmanship, and style. From seasonal essentials to timeless classics, 
            our collections offer something for every aesthetic.
          </p>
        </div>
      </div>
      
      {/* Special Collections */}
      <div className="luxury-container py-16">
        <h2 className="text-2xl font-display mb-10 text-center">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialCollections.map(collection => (
            <div key={collection.id} className="group relative h-[400px] overflow-hidden">
              <img 
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-white text-2xl font-display mb-2">{collection.title}</h3>
                  <p className="text-white mb-4 max-w-md mx-auto">{collection.description}</p>
                  <Link 
                    to={collection.link}
                    className="inline-block bg-white text-black px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                  >
                    Explore Collection
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* All Collections */}
      <div className="luxury-container py-16">
        <h2 className="text-2xl font-display mb-10 text-center">All Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map(collection => (
            <div key={collection.id} className="group relative h-[350px] overflow-hidden">
              <img 
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-white text-xl font-display mb-2">{collection.title}</h3>
                  <p className="text-white mb-4">{collection.description}</p>
                  <Link 
                    to={collection.link}
                    className="inline-block bg-white text-black px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Seasonal Banner */}
      <div className="w-full h-[500px] relative overflow-hidden mb-16">
        <img 
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Fall/Winter Collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center p-6 max-w-2xl">
            <h2 className="text-white text-3xl font-display mb-4">Fall/Winter 2025</h2>
            <p className="text-white text-lg mb-6">
              Our latest seasonal collection has arrived. Discover luxurious layers, rich textures, and sophisticated silhouettes.
            </p>
            <Link 
              to="/collections/fall-winter-2025"
              className="inline-block bg-white text-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Collections;
