
import React, { useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// FAQ categories and questions
const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How do I track my order?",
        answer: "You can track your order by logging into your account and navigating to the 'Orders' section. Each order will have a tracking number once it has been shipped. Alternatively, you can click the tracking link in your shipping confirmation email."
      },
      {
        question: "What are the shipping costs?",
        answer: "Shipping costs vary based on your location and the shipping method selected. We offer free standard shipping on orders over $150 within the United States. International shipping rates are calculated at checkout based on destination and package weight."
      },
      {
        question: "How long will it take to receive my order?",
        answer: "Standard domestic shipping typically takes 3-5 business days. Express shipping takes 1-2 business days. International shipping can take 7-14 business days depending on your location and customs processing times."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping options and costs will be displayed during checkout. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unworn items in their original packaging with tags attached. Returns initiated within 14 days of delivery qualify for a full refund to the original payment method. Returns between 15-30 days will be issued as store credit."
      },
      {
        question: "How do I start a return or exchange?",
        answer: "To initiate a return or exchange, please log into your account and navigate to the 'Orders' section. Select the order containing the item(s) you wish to return and follow the instructions. You can also contact our customer service team for assistance."
      },
      {
        question: "Are return shipping costs covered?",
        answer: "For domestic returns due to an error on our part (wrong item, defective product), return shipping is covered by Yemalin. For other returns, a flat-rate return shipping fee of $7.95 will be deducted from your refund. International return shipping costs are not covered."
      },
      {
        question: "How long does it take to process returns?",
        answer: "Once your return package is received at our warehouse, it takes 3-5 business days for our team to inspect and process the return. Refunds typically appear on your statement within 5-10 business days after processing, depending on your financial institution."
      }
    ]
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        question: "How do I find the right size?",
        answer: "Each product page features a detailed size guide specific to that designer. We recommend taking your measurements and comparing them to the size chart. If you're between sizes, we generally recommend sizing up. Our customer service team is also available to provide specific sizing guidance."
      },
      {
        question: "Are the fabrics sustainable?",
        answer: "Yes, all designers on our platform must meet our sustainability standards. Each product page lists the specific sustainable materials used and their environmental certifications. We prioritize organic, recycled, and responsibly sourced materials."
      },
      {
        question: "How should I care for my garments?",
        answer: "Care instructions are provided on each product page and on the garment's care label. Many of our sustainable pieces require gentle washing or dry cleaning to maintain their quality and longevity. We recommend following the specific care instructions for each item."
      },
      {
        question: "Do you offer custom sizing?",
        answer: "Some of our designers offer custom sizing options. Look for the 'Custom Size Available' note on the product page. Custom orders typically take 2-3 weeks longer to produce and are final sale (non-returnable)."
      }
    ]
  },
  {
    category: "Account & Orders",
    questions: [
      {
        question: "How do I create an account?",
        answer: "You can create an account by clicking on the 'Sign In' button at the top right of our website and selecting 'Create Account'. You'll need to provide your email address, create a password, and fill in your personal details."
      },
      {
        question: "How can I reset my password?",
        answer: "To reset your password, click on the 'Sign In' button and select 'Forgot Password'. Enter the email address associated with your account, and we'll send you instructions to reset your password."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "Orders can be modified or canceled within 1 hour of placement. To make changes, contact our customer service team immediately. After this window, orders enter our processing system and cannot be modified or canceled."
      },
      {
        question: "Is my personal information secure?",
        answer: "Yes, we take data security very seriously. We use industry-standard encryption to protect your personal and payment information. We never share your data with third parties without your consent. Please review our Privacy Policy for more details."
      }
    ]
  },
  {
    category: "Sustainability",
    questions: [
      {
        question: "How does Yemalin ensure ethical production?",
        answer: "All designers on our platform must adhere to our Code of Ethics, which includes fair labor practices, safe working conditions, and fair wages. We conduct regular audits and require documentation of ethical production practices from all of our partner designers."
      },
      {
        question: "What is your packaging like?",
        answer: "We use 100% recycled and recyclable packaging materials. Our shipping boxes are made from post-consumer recycled cardboard, our mailer bags are compostable, and we use paper tape instead of plastic. We're committed to minimizing waste in all aspects of our operations."
      },
      {
        question: "How do you calculate your carbon footprint?",
        answer: "We work with climate partners to calculate the carbon footprint of each order, including production, shipping, and packaging. We offset 110% of these emissions through verified carbon reduction projects focusing on renewable energy and forest conservation."
      },
      {
        question: "Do you have a garment take-back program?",
        answer: "Yes, we offer a Circular Fashion Program where customers can return Yemalin pieces that are beyond repair. These items are either upcycled into new designs or properly recycled. Customers who participate receive store credit for future purchases."
      }
    ]
  },
  {
    category: "Designers & Partnerships",
    questions: [
      {
        question: "How do you select your designers?",
        answer: "We have a rigorous selection process based on design quality, sustainability practices, ethical production, and brand values. Designers must demonstrate a commitment to responsible fashion and meet our environmental and ethical standards."
      },
      {
        question: "I'm a designer. How can I sell on Yemalin?",
        answer: "We're always looking for innovative sustainable designers! You can apply to become a Yemalin partner through the 'Designers Apply' link in our footer. The application process includes submitting your portfolio, production details, and sustainability credentials."
      },
      {
        question: "Do you offer wholesale opportunities?",
        answer: "Some of our designers offer wholesale through Yemalin, with minimum order quantities. If you're a retailer interested in carrying our brands, please contact our partnerships team at wholesale@yemalin.com for more information."
      },
      {
        question: "Can I collaborate with Yemalin on special projects?",
        answer: "We're open to collaborations that align with our values of sustainability and ethical fashion. For partnership inquiries, please contact our collaborations team at collaborations@yemalin.com with details about your proposal."
      }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);
  const [activeCategory, setActiveCategory] = useState('all');

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setFilteredFAQs(faqData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = faqData.map(category => ({
      ...category,
      questions: category.questions.filter(
        qa => qa.question.toLowerCase().includes(query) || 
              qa.answer.toLowerCase().includes(query)
      )
    })).filter(category => category.questions.length > 0);

    setFilteredFAQs(filtered);
  };

  // Filter by category
  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredFAQs(faqData);
    } else {
      const filtered = faqData.filter(item => item.category === category);
      setFilteredFAQs(filtered);
    }

    setSearchQuery('');
  };

  // Get all questions count
  const getTotalQuestionsCount = () => {
    return faqData.reduce((total, category) => total + category.questions.length, 0);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="luxury-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Find answers to common questions about Yemalin's products, services, and policies.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-12 py-3 w-full rounded-md"
              />
              <Button 
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="py-16">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <div className="flex flex-col space-y-1">
                  <Button
                    variant={activeCategory === 'all' ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => filterByCategory('all')}
                  >
                    All Categories ({getTotalQuestionsCount()})
                  </Button>
                  
                  {faqData.map((category) => (
                    <Button
                      key={category.category}
                      variant={activeCategory === category.category ? "default" : "ghost"}
                      className="justify-start"
                      onClick={() => filterByCategory(category.category)}
                    >
                      {category.category} ({category.questions.length})
                    </Button>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium mb-2">Can't find your answer?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our customer service team is here to help with any questions you may have.
                  </p>
                  <Button className="w-full">Contact Support</Button>
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any answers matching your search. Try a different query or browse all categories.
                  </p>
                  <Button onClick={() => filterByCategory('all')}>
                    View All FAQs
                  </Button>
                </div>
              ) : (
                filteredFAQs.map((category) => (
                  <div key={category.category} className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">{category.category}</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((qa, index) => (
                        <AccordionItem key={index} value={`${category.category}-${index}`} className="border border-gray-200 rounded-md overflow-hidden">
                          <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-gray-50 font-medium">
                            {qa.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-5 py-4 bg-white text-gray-700">
                            {qa.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="luxury-container text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            If you couldn't find the answer you were looking for, our dedicated customer service team is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="px-8">
              Contact Support
            </Button>
            <Button variant="outline" className="px-8">
              Send Email
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FAQ;
