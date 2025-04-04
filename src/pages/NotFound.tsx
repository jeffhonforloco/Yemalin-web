
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from '../components/layouts/MainLayout';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-display mb-6">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you are looking for could not be found.
          </p>
          <Link 
            to="/" 
            className="btn-primary inline-block"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
