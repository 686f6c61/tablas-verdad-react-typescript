/**
 * @fileoverview Página de inicio de la aplicación Mr. Wolff
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaTable } from 'react-icons/fa';
import { UserCircleIcon } from '@heroicons/react/24/solid';

/**
 * Componente de la página de inicio.
 * Muestra el título de la aplicación y enlaces a las diferentes herramientas disponibles.
 * 
 * @component
 * @returns {JSX.Element} Página de inicio
 */
function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Encabezado con título y descripción */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <UserCircleIcon className="h-16 w-16 text-gray-800" />
          <h1 className="text-4xl font-bold">Mr. Wolff</h1>
        </div>
        <p className="text-xl text-gray-600">
          Resolución de problemas de Álgebra
        </p>
      </div>

      {/* Grid de herramientas disponibles */}
      <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
        {/* Enlace a la herramienta de tablas de verdad */}
        <Link
          to="/truth-tables"
          className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <FaTable className="text-4xl text-gray-700" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Tablas de verdad</h2>
              <p className="text-gray-600">
                Genera y analiza tablas de verdad para expresiones lógicas
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;