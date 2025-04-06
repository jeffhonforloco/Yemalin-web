
import { Link } from 'react-router-dom';
import { useState } from 'react';
import YemalinLogo from '../YemalinLogo';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { contactSupport } from '@/utils/contactHelpers';
import { subscribeToNewsletter } from '@/utils/subscriptionUtils';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await subscribeToNewsletter({ 
        email, 
        source: 'Footer' 
      });
      
      if (success) {
        setEmail('');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-lg font-medium mb-4">About Yemalin</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">Our Story</Link></li>
              <li><Link to="/sustainability" className="text-sm text-gray-600 hover:text-black transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-black transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-sm text-gray-600 hover:text-black transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Column 2 - Help */}
          <div>
            <h3 className="text-lg font-medium mb-4">Help</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-black transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-600 hover:text-black transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Contact Us</Link></li>
              <li><a href="#" onClick={(e) => {
                e.preventDefault();
                contactSupport();
              }} className="text-sm text-gray-600 hover:text-black transition-colors">Email Support</a></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-black transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 3 - Designers */}
          <div>
            <h3 className="text-lg font-medium mb-4">Designers</h3>
            <ul className="space-y-3">
              <li><Link to="/designers" className="text-sm text-gray-600 hover:text-black transition-colors">View All Designers</Link></li>
              <li><Link to="/designers/apply" className="text-sm text-gray-600 hover:text-black transition-colors">Apply to Sell</Link></li>
              <li><Link to="/designers/login" className="text-sm text-gray-600 hover:text-black transition-colors">Designer Login</Link></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-4">Join Our Community</h3>
            <p className="text-sm text-gray-600 mb-4">Subscribe to receive updates on new arrivals, special offers, and fashion inspiration.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-grow px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-black"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-4 py-2 text-sm whitespace-nowrap disabled:opacity-70"
              >
                {isSubmitting ? 'Wait...' : 'Subscribe'}
              </button>
            </form>
            <div className="flex items-center space-x-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                contactSupport();
              }} className="text-gray-600 hover:text-black transition-colors">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" aria-label="Yemalin Home">
              <YemalinLogo className="h-8 w-auto" />
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Yemalin. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
