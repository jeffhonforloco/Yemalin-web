
import React, { useState, useRef } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Briefcase, User, Users, Mail, MapPin, Building, GraduationCap, Newspaper } from 'lucide-react';
import JobApplicationForm from '../components/career/JobApplicationForm';
import { contactSupport } from '@/utils/contactHelpers';

const Career = () => {
  // State for job application form dialog
  const [applicationFormOpen, setApplicationFormOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  
  // Reference to the openings section
  const openingsSectionRef = useRef<HTMLElement>(null);

  // Sample job listings
  const jobListings = [
    {
      id: 1,
      title: "Senior Fashion Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      posted: "April 5, 2025"
    },
    {
      id: 2,
      title: "Fashion Marketing Specialist",
      department: "Marketing",
      location: "Paris, France",
      type: "Full-time",
      posted: "April 3, 2025"
    },
    {
      id: 3,
      title: "E-commerce Manager",
      department: "Digital",
      location: "Remote",
      type: "Full-time",
      posted: "March 29, 2025"
    },
    {
      id: 4,
      title: "Sustainability Coordinator",
      department: "Operations",
      location: "London, UK",
      type: "Contract",
      posted: "March 25, 2025"
    },
    {
      id: 5,
      title: "Visual Merchandiser",
      department: "Retail",
      location: "Milan, Italy",
      type: "Part-time",
      posted: "March 20, 2025"
    }
  ];

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
    }
  ];

  const handleApplyClick = (positionTitle?: string) => {
    setSelectedPosition(positionTitle || '');
    setApplicationFormOpen(true);
  };

  const scrollToOpenings = () => {
    openingsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="luxury-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Be part of shaping the future of sustainable and ethical fashion with Yemalin.
            Discover meaningful career opportunities with us.
          </p>
          <Button size="lg" className="font-medium" onClick={scrollToOpenings}>
            View Open Positions
          </Button>
        </div>
      </section>

      {/* Our Culture Section */}
      <section className="py-16 md:py-20">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Culture</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              At Yemalin, we foster an environment of creativity, inclusivity, and sustainability. 
              Our team is passionate about making a positive impact on the fashion industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-t-4 border-t-emerald-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  Inclusive Workplace
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We celebrate diversity and provide equal opportunities for all. Our team members come from various backgrounds, bringing unique perspectives.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Growth & Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We invest in our people. Continuous learning opportunities, mentorship programs, and career advancement paths are integral to our culture.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  Work-Life Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We believe in the importance of balance. Flexible work arrangements, wellness programs, and a supportive environment are key to our success.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg mb-8">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000" 
              alt="Team collaboration at Yemalin" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section ref={openingsSectionRef} className="py-16 md:py-20 bg-gray-50">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Current Openings</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Explore our current job opportunities and find a role where you can make a difference.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobListings.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>{job.posted}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleApplyClick(job.title)}
                        >
                          Apply Now
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefits & Perks</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We take care of our team with competitive benefits and unique perks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="inline-flex items-center justify-center bg-amber-100 p-3 rounded-full mb-4">
                <User className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Health & Wellness</h3>
              <p className="text-gray-600">Comprehensive healthcare, mental wellness resources, and fitness stipends.</p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="inline-flex items-center justify-center bg-emerald-100 p-3 rounded-full mb-4">
                <Briefcase className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexible Work</h3>
              <p className="text-gray-600">Remote work options, flexible hours, and unlimited PTO policy for many roles.</p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="inline-flex items-center justify-center bg-blue-100 p-3 rounded-full mb-4">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Learning Budget</h3>
              <p className="text-gray-600">Annual stipend for courses, conferences, and educational resources.</p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition">
              <div className="inline-flex items-center justify-center bg-purple-100 p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Employee Discounts</h3>
              <p className="text-gray-600">Generous discounts on Yemalin products and partner brand offerings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-16 md:py-20">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Yemalin in the Press</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              See what media outlets are saying about Yemalin's innovative approach to sustainable fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
                    <p className="font-medium group-hover:text-blue-700 transition-colors">{item.title}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className="font-medium"
              onClick={() => window.open('mailto:press@yemalin.com', '_blank')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Our PR Team
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-black text-white">
        <div className="luxury-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't See the Right Fit?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We're always on the lookout for exceptional talent. Send us your resume and let us know how you can contribute to Yemalin's mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white hover:text-black"
              onClick={() => handleApplyClick("General Application")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Us Your Resume
            </Button>
            <Button 
              className="bg-white text-black hover:bg-gray-200"
              onClick={scrollToOpenings}
            >
              View All Positions
            </Button>
          </div>
        </div>
      </section>

      {/* Job Application Form Dialog */}
      <JobApplicationForm 
        open={applicationFormOpen} 
        onOpenChange={setApplicationFormOpen} 
        positionTitle={selectedPosition}
      />
    </MainLayout>
  );
};

export default Career;
