import React from 'react';
import { SiTypescript, SiReact } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-white shadow-sm mt-8 py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center space-x-2 text-gray-900">
        <span>2024</span>
        <span>-</span>
        <span className="flex items-center space-x-2">
          <span>Powered by</span>
          <SiTypescript className="text-gray-900 w-5 h-5" />
          <SiReact className="text-gray-900 w-5 h-5" />
        </span>
      </div>
    </footer>
  );
};

export default Footer;