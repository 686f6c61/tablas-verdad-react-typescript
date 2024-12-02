/**
 * @fileoverview Componente selector del número de variables para expresiones lógicas
 */

import React from 'react';

/**
 * Componente que permite seleccionar el número de variables para una expresión lógica.
 * Muestra botones para seleccionar entre 2 y 6 variables.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onVariableCountChange - Función callback que se ejecuta al seleccionar un número de variables
 * 
 * @example
 * <VariableSelector onVariableCountChange={(count) => console.log(`Selected ${count} variables`)} />
 */
const VariableSelector = ({ onVariableCountChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">
        Selecciona el número de variables:
      </h2>
      <div className="flex gap-2">
        {[2, 3, 4, 5, 6].map((count) => (
          <button
            key={count}
            onClick={() => onVariableCountChange(count)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            {count} variables
          </button>
        ))}
      </div>
    </div>
  );
}

export default VariableSelector;