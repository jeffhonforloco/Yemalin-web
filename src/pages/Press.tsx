
import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Mail, Newspaper, ExternalLink } from 'lucide-react';

const Press = () => {
  // Press mentions
  const pressItems = [
    {
      id: 1,
      publication: "Vogue",
      title: "Sustainable Brands Reshaping the Future of Fashion",
      date: "March 28, 2025",
      logo: "https://images.unsplash.com/photo-1620287990891-afaf5f946eb9?auto=format&fit=crop&q=80&w=200",
      link: "https://example.com/vogue-article"
    },
    {
      id: 2,
      publication: "Fashion Today",
      title: "Yemalin's Innovative Approach to Ethical Fashion",
      date: "March 15, 2025",
      logo: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?auto=format&fit=crop&q=80&w=200",
      link: "https://example.com/fashiontoday-article"
    },
    {
      id: 3,
      publication: "Sustainable Business",
      title: "How Yemalin is Leading the Sustainable Fashion Revolution",
      date: "February 20, 2025",
      logo: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=200",
      link: "https://example.com/sustainable-business-article"
    },
    {
      id: 4,
      publication: "Fashion Weekly",
      title: "Emerging Brands to Watch: Spotlight on Yemalin",
      date: "February 5, 2025",
      logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=200",
      link: "https://example.com/fashion-weekly-article"
    },
    {
      id: 5,
      publication: "Style Magazine",
      title: "The Rise of Conscious Consumerism: Yemalin's Journey",
      date: "January 20, 2025",
      logo: "https://images.unsplash.com/photo-1606293459339-aa7b975e8b0e?auto=format&fit=crop&q=80&w=200",
      link: "https://example.com/style-magazine-article"
    },
    {
      id: 6,
      publication: "Eco Fashion",
      title: "Yemalin's Sustainable Supply Chain: A Case Study",
      date: "January 10, 2025",
      logo: "https://images.unsplash.com/photo-1584807579583-d9253621dd97?auto=format&fit=crop&q=80&w=200",
      link: "https://example.com/eco-fashion-article"
    }
  ];

  // Press contact info
  const pressContact = {
    name: "Media Relations Team",
    email: "press@yemalin.com",
    phone: "+1 (555) 123-4567"
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="luxury-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Press & Media</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            The latest news, articles, and resources featuring Yemalin's 
            commitment to sustainable and ethical fashion.
          </p>
          <Button 
            variant="outline" 
            className="font-medium"
            onClick={() => window.open('mailto:press@yemalin.com', '_blank')}
          >
            <Mail className="mr-2 h-4 w-4" />
            Contact Our PR Team
          </Button>
        </div>
      </section>

      {/* Press Coverage Section */}
      <section className="py-16 md:py-20">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Coverage</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              See what media outlets are saying about Yemalin's innovative approach to sustainable fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {pressItems.map((item) => (
              <a 
                href={item.link} 
                key={item.id}
                target="_blank" 
                rel="noopener noreferrer" 
                className="group"
              >
                <Card className="hover:shadow-md transition duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img 
                            src={item.logo} 
                            alt={item.publication} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://placehold.co/40x40/gray/white?text=' + item.publication.charAt(0);
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{item.publication}</p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                      </div>
                      <Newspaper className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <p className="font-medium group-hover:text-blue-700 transition-colors">{item.title}</p>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-700 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Press Kit</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Access official brand assets, press releases, and media resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Brand Assets</h3>
                <p className="text-gray-600 mb-6">Download our official logos, product images, and brand guidelines.</p>
                <Button className="w-full">
                  Download Brand Kit
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Press Releases</h3>
                <p className="text-gray-600 mb-6">Browse our archive of press releases and company announcements.</p>
                <Button className="w-full">
                  View Press Releases
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Media Contact</h3>
                <p className="text-gray-600 mb-6">Get in touch with our PR team for interviews, features, or inquiries.</p>
                <Button 
                  className="w-full"
                  onClick={() => window.open('mailto:press@yemalin.com', '_blank')}
                >
                  Contact Media Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto bg-white p-8 border border-gray-200 rounded-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Media Inquiries</h2>
              <p className="text-gray-700">
                For press inquiries, interview requests, or additional information about Yemalin, please contact our media relations team.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-8 text-center md:text-left">
              <div>
                <h3 className="font-semibold mb-2">Contact Person</h3>
                <p className="text-gray-700">{pressContact.name}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-700">
                  <a 
                    href={`mailto:${pressContact.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {pressContact.email}
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-700">{pressContact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Press;
