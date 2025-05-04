import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaCalculator } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-sm mb-8">
      <div className="max-w-6xl mx-auto py-4 px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <FaCalculator className="text-3xl text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">
            Asignatura Álgebra
          </h1>
        </Link>
        <a
          href="https://github.com/686f6c61/algebra-logica"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Ver código en GitHub"
        >
          <FaGithub className="w-8 h-8" />
        </a>
      </div>
    </header>
  );
};

export default Header;