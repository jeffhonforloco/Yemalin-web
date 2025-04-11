
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Info, Leaf, Shield, Award, Star, Image, FileImage } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample material data - in a real app, this would come from an API
const featuredMaterials = [
  {
    id: "silk",
    name: "Mulberry Silk",
    origin: "China & Japan",
    image: "https://images.unsplash.com/photo-1589394915835-964da87c1303?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Prized for its natural sheen, softness, and temperature-regulating properties, Mulberry silk has been treasured for millennia.",
    sustainability: "Renewable resource cultivated using traditional methods that preserve biodiversity.",
    productImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    sustainabilityScore: 85,
    properties: ["Breathable", "Lightweight", "Hypoallergenic", "Thermoregulating"],
    // Adding gallery images
    gallery: [
      "https://images.unsplash.com/photo-1528697203043-733dafdaa316?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583766395091-2eb9994ed094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1459501462159-97d5bded1416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    ]
  },
  {
    id: "linen",
    name: "Belgian Linen",
    origin: "Belgium",
    image: "https://images.unsplash.com/photo-1594761051656-73fefd47ad16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Known for its exceptional durability and breathability, Belgian linen becomes more beautiful with age.",
    sustainability: "Flax requires minimal water and pesticides, making linen one of the most eco-friendly textile fibers.",
    productImage: "https://images.unsplash.com/photo-1605618826115-fb9e775cf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    sustainabilityScore: 95,
    properties: ["Durable", "Absorbent", "Antibacterial", "Cooling"],
    // Adding gallery images
    gallery: [
      "https://images.unsplash.com/photo-1584450151850-3a0480eecab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499955085172-a104c9463ece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531002043926-6235bf9e2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "wool",
    name: "Merino Wool",
    origin: "Australia & New Zealand",
    image: "https://images.unsplash.com/photo-1599974202733-c2b17594b1e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Ultra-fine fibers create a luxuriously soft hand feel while providing natural temperature regulation.",
    sustainability: "Our merino is sourced from certified ethical farms prioritizing animal welfare and environmental stewardship.",
    productImage: "https://images.unsplash.com/photo-1583342093276-efa17116469d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    sustainabilityScore: 80,
    properties: ["Odor-resistant", "Moisture-wicking", "Insulating", "Biodegradable"],
    // Adding gallery images
    gallery: [
      "https://images.unsplash.com/photo-1562025425-7d7ff2c3f110?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539190299742-a1e6cca89af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558157870-000af36acd10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.3 }
  }
};

// New image gallery animation variants
const galleryVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const MaterialStories = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(featuredMaterials[0]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  return (
    <section className="py-20 bg-yemalin-cream overflow-hidden" id="material-stories">
      <div className="luxury-container">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <Badge className="bg-yemalin-accent text-white mb-3">
            <Star size={14} className="mr-1" /> Premium Materials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display mb-3 tracking-tight">Material Stories</h2>
          <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
            Explore the exceptional materials that form the foundation of our collections and their journey from source to garment
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="relative"
          >
            {/* Main Image Display */}
            <motion.div 
              className="aspect-video relative overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={selectedImage || selectedMaterial.image} 
                alt={selectedMaterial.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 p-6 right-0 text-white">
                <div className="flex items-center justify-between">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-display">{selectedMaterial.name}</h3>
                    <p className="opacity-90 text-sm flex items-center">
                      <Award size={14} className="inline mr-1.5" /> Origin: {selectedMaterial.origin}
                    </p>
                  </motion.div>
                  <Badge className="bg-yemalin-accent hover:bg-yemalin-accent border-none text-white" aria-label="Sustainability score">
                    <Leaf size={14} className="mr-1" /> 
                    {selectedMaterial.sustainabilityScore}/100
                  </Badge>
                </div>
              </div>
            </motion.div>
            
            {/* Material Thumbnails */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {featuredMaterials.map((material) => (
                <motion.button 
                  key={material.id}
                  className={`aspect-square relative overflow-hidden rounded-md cursor-pointer transition-all ${
                    selectedMaterial.id === material.id ? 'ring-2 ring-yemalin-accent shadow-lg' : 'hover:ring-2 hover:ring-yemalin-accent/50 hover:shadow-md'
                  }`}
                  onClick={() => {
                    setSelectedMaterial(material);
                    setSelectedImage(null);
                  }}
                  aria-label={`Select ${material.name}`}
                  aria-pressed={selectedMaterial.id === material.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img 
                    src={material.image} 
                    alt={material.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {selectedMaterial.id === material.id && (
                    <div className="absolute inset-0 bg-yemalin-accent/20 border-2 border-yemalin-accent rounded-md"></div>
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Image Gallery */}
            <motion.div 
              className="mt-8"
              variants={galleryVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center mb-4">
                <FileImage size={18} className="mr-2 text-yemalin-accent" />
                <h4 className="font-medium">Material Gallery</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {selectedMaterial.gallery.map((image, index) => (
                  <motion.button
                    key={index}
                    className={`
                      aspect-square overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all
                      ${selectedImage === image ? 'ring-2 ring-yemalin-accent shadow-md' : 'hover:ring-1 hover:ring-yemalin-accent/50'}
                    `}
                    onClick={() => setSelectedImage(image)}
                    variants={imageVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <img 
                      src={image} 
                      alt={`${selectedMaterial.name} detail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMaterial.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              className="lg:sticky lg:top-32"
            >
              <Card className="overflow-hidden border-gray-100 shadow-lg">
                <CardHeader className="pb-3">
                  <Badge className="bg-yemalin-accent mb-3 w-fit text-white border-none" aria-label="Featured material">
                    Featured Material
                  </Badge>
                  <CardTitle className="text-2xl md:text-3xl font-display">{selectedMaterial.name}</CardTitle>
                  <CardDescription className="text-gray-700 mt-2">
                    {selectedMaterial.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedMaterial.properties.map(property => (
                      <Badge key={property} variant="outline" className="bg-white border-yemalin-gray-300 text-yemalin-grey-700">
                        {property}
                      </Badge>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <Shield size={18} className="mr-2 text-yemalin-accent" />
                      <h4 className="font-medium">Sustainability</h4>
                    </div>
                    <p className="text-gray-600 text-sm pl-6">
                      {selectedMaterial.sustainability}
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Info size={18} className="mr-2 text-yemalin-accent" />
                      <h4 className="font-medium">Crafted into Excellence</h4>
                    </div>
                    <motion.div 
                      className="flex gap-4 items-center bg-gray-50 p-4 rounded-md border border-gray-100 hover:shadow-md transition-shadow"
                      whileHover={{ y: -2 }}
                    >
                      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden shadow-sm">
                        <img 
                          src={selectedMaterial.productImage}
                          alt="Product made with this material"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">
                          From raw material to finished piece, our skilled artisans transform {selectedMaterial.name.toLowerCase()} into timeless garments that honor its natural properties.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex flex-wrap gap-4 w-full">
                    <Button asChild className="bg-yemalin-accent hover:bg-yemalin-accent/90 text-white grow sm:grow-0">
                      <Link to={`/materials/${selectedMaterial.id}`}>
                        Explore Material Story
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-yemalin-accent text-yemalin-accent hover:bg-yemalin-accent/10 grow sm:grow-0">
                      <Link to={`/shop?material=${selectedMaterial.id}`}>
                        Shop {selectedMaterial.name}
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="mt-12 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-block"
          >
            <Link to="/materials" className="text-yemalin-accent hover:text-yemalin-accent/80 hover:underline inline-flex items-center group font-medium">
              Discover All Material Stories
              <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MaterialStories;
