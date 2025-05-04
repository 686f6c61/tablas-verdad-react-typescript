import React from 'react';
import { SiTypescript, SiReact } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center space-x-2">
        <span>With love 686f6c61 - v2 - Mayo 2025 - Powered by</span>
        <SiTypescript className="w-5 h-5 text-white" />
        <SiReact className="w-5 h-5 text-white" />
      </div>
    </footer>
  );
};

export default Footer;