import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-md mt-auto">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-700 text-sm">
              &copy; {new Date().getFullYear()} Nicotine Liquids. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Términos y Condiciones
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;