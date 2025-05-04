import React from 'react';
import { Link } from 'react-router-dom';
import { FaTable, FaBook, FaBrain, FaCheckCircle, FaExchangeAlt, FaTree, FaCircleNotch } from 'react-icons/fa';

function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <FaBrain className="h-16 w-16 text-gray-800" />
          <h1 className="text-4xl font-bold">Lógica proposicional</h1>
        </div>
        <p className="text-xl text-gray-600">
          Resolución de problemas de Álgebra
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <Link
          to="/theory"
          className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <FaBook className="text-4xl text-gray-700" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Teoría</h2>
              <p className="text-gray-600">
                Aprende los fundamentos de la lógica proposicional
              </p>
            </div>
          </div>
        </Link>

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
        
        <Link
          to="/properties-analysis"
          className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <FaCheckCircle className="text-4xl text-gray-700" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Análisis de propiedades</h2>
              <p className="text-gray-600">
                Detecta tautologías, contradicciones y verifica equivalencias lógicas
              </p>
            </div>
          </div>
        </Link>
        
        <Link
          to="/normal-forms"
          className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <FaExchangeAlt className="text-4xl text-gray-700" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Formas Normales</h2>
              <p className="text-gray-600">
                Convierte expresiones a Forma Normal Conjuntiva (FNC) y Disyuntiva (FND)
              </p>
            </div>
          </div>
        </Link>
        
        <Link
          to="/syntax-trees"
          className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <FaTree className="text-4xl text-gray-700" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Árboles de Análisis</h2>
              <p className="text-gray-600">
                Visualiza la estructura jerárquica de operadores y subexpresiones
              </p>
            </div>
          </div>
        </Link>
        
        <Link
          to="/logic-circuits"
          className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <FaCircleNotch className="text-4xl text-gray-700" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Circuitos Lógicos</h2>
              <p className="text-gray-600">
                Convierte expresiones en circuitos digitales y simula su comportamiento
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;