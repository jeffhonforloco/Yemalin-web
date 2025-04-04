
import { Link } from 'react-router-dom';

const designers = [
  {
    id: 'designer1',
    name: 'Elise Laurent',
    logo: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    description: 'Known for impeccable tailoring and timeless elegance',
    link: '/designers/elise-laurent'
  },
  {
    id: 'designer2',
    name: 'Maison Noir',
    logo: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80',
    description: 'Contemporary luxury with architectural influences',
    link: '/designers/maison-noir'
  },
  {
    id: 'designer3',
    name: 'Hiroshi Tanaka',
    logo: 'https://images.unsplash.com/photo-1622442730733-9b0db1412258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    description: 'Minimalist Japanese aesthetic meets European craftsmanship',
    link: '/designers/hiroshi-tanaka'
  }
];

const FeaturedDesigners = () => {
  return (
    <section className="py-16 bg-yemalin-grey-100">
      <div className="luxury-container">
        <h2 className="text-2xl md:text-3xl font-display mb-3 text-center">Featured Designers</h2>
        <p className="text-gray-600 text-center mb-10">Discover the creative minds behind our exclusive collections</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {designers.map(designer => (
            <Link 
              key={designer.id}
              to={designer.link}
              className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-[300px] overflow-hidden">
                <img 
                  src={designer.image}
                  alt={designer.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </div>
              
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-yemalin-grey-100 flex items-center justify-center">
                  <img 
                    src={designer.logo}
                    alt={`${designer.name} logo`}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-xl font-display mb-2">{designer.name}</h3>
                <p className="text-gray-600 text-sm">{designer.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/designers"
            className="inline-block border border-yemalin-black px-8 py-3 text-sm font-medium hover:bg-yemalin-black hover:text-white transition-colors"
          >
            View All Designers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesigners;
