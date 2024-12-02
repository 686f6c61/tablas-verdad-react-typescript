/**
 * @fileoverview Página principal para la generación de tablas de verdad
 */

import React, { useState, useEffect } from 'react';
import ExpressionEditor from '../components/ExpressionEditor';
import TruthTable from '../components/TruthTable';
import { generateCombinations, extractVariables } from '../utils/logicOperations';

/**
 * Componente principal para la generación y visualización de tablas de verdad.
 * Permite a los usuarios crear expresiones lógicas y ver sus resultados.
 * 
 * @component
 * @returns {JSX.Element} Página de tablas de verdad
 */
function TruthTablesPage() {
  // Estados para manejar la expresión y sus resultados
  const [expression, setExpression] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [combinations, setCombinations] = useState([]);

  /**
   * Efecto para generar combinaciones cuando cambia la expresión
   */
  useEffect(() => {
    if (expression) {
      const variables = extractVariables(expression);
      setCombinations(generateCombinations(variables));
    }
  }, [expression]);

  /**
   * Manejador para mostrar la tabla de verdad
   */
  const handleGenerate = () => {
    if (expression.trim()) {
      setShowTable(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      {/* Editor de expresiones */}
      <ExpressionEditor onExpressionChange={setExpression} />
      
      {/* Botón para generar tabla */}
      <div className="text-center mb-8">
        <button
          onClick={handleGenerate}
          disabled={!expression.trim()}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
            expression.trim() 
              ? 'bg-gray-900 hover:bg-gray-800' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Generar tabla de verdad
        </button>
      </div>
      
      {/* Tabla de verdad */}
      {showTable && combinations.length > 0 && (
        <div className="mt-8">
          <TruthTable
            expression={expression}
            combinations={combinations}
          />
        </div>
      )}

      {/* Sección de instrucciones */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Instrucciones:</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Usa las variables disponibles: p, q, r, x, y, z</li>
          <li>Construye tu expresión usando el editor de expresiones</li>
          <li>Utiliza los operadores lógicos y paréntesis para crear expresiones complejas</li>
          <li>Presiona "Generar tabla de verdad" para ver los resultados</li>
          <li>La tabla mostrará solo las variables utilizadas en tu expresión</li>
          <li>Puedes exportar la tabla en formato PDF o TXT</li>
        </ul>
      </div>
    </div>
  );
}

export default TruthTablesPage;