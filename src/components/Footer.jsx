/**
 * @fileoverview Componente de pie de página de la aplicación
 */

import React from 'react';
import { SiTypescript, SiReact } from 'react-icons/si';

/**
 * Componente que muestra el pie de página con el año y las tecnologías utilizadas.
 * 
 * @component
 * @example
 * <Footer />
 */
const Footer = () => {
  return (
    <footer className="bg-white shadow-sm mt-8 py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center space-x-2 text-gray-900">
        {/* Año actual */}
        <span>2024</span>
        <span>-</span>

        {/* Tecnologías utilizadas */}
        <span className="flex items-center space-x-2">
          <span>Powered by</span>
          <SiTypescript 
            className="text-gray-900 w-5 h-5" 
            aria-label="TypeScript"
          />
          <SiReact 
            className="text-gray-900 w-5 h-5"
            aria-label="React"
          />
        </span>
      </div>
    </footer>
  );
};

export default Footer;