/**
 * @fileoverview Componente guía de operadores lógicos
 */

import React from 'react';
import { FaBook } from 'react-icons/fa';

/**
 * Componente que muestra una guía visual de operadores lógicos y sus descripciones.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array<{symbol: string, name: string, description: string}>} props.operators - Array de operadores a mostrar
 * 
 * @example
 * const operators = [
 *   { symbol: '∧', name: 'AND', description: 'Verdadero solo si ambos operandos son verdaderos' },
 *   { symbol: '∨', name: 'OR', description: 'Verdadero si al menos un operando es verdadero' }
 * ];
 * 
 * <OperatorGuide operators={operators} />
 */
const OperatorGuide = ({ operators }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {/* Encabezado de la guía */}
      <div className="flex items-center space-x-2 mb-3">
        <FaBook className="text-xl text-gray-700" />
        <h3 className="text-lg font-semibold">Guía de operadores</h3>
      </div>

      {/* Grid de operadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {operators.map(({ symbol, name, description }) => (
          <div key={symbol} className="border border-gray-200 p-3 rounded">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-mono">{symbol}</span>
              <span className="font-semibold">{name}</span>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperatorGuide;