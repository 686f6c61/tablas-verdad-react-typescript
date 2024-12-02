/**
 * @fileoverview Editor de expresiones lógicas con validación en tiempo real
 */

import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import OperatorGuide from './OperatorGuide';
import { OPERATORS, VARIABLES, PARENTHESES } from '../utils/constants';
import { validateExpression } from '../utils/expressionValidator';

/**
 * Componente editor de expresiones lógicas con botones para símbolos y validación.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onExpressionChange - Callback que se ejecuta cuando cambia la expresión
 * 
 * @example
 * <ExpressionEditor 
 *   onExpressionChange={(expression) => console.log('Nueva expresión:', expression)} 
 * />
 */
const ExpressionEditor = ({ onExpressionChange }) => {
  // Estados para la expresión y su validez
  const [expression, setExpression] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Validar expresión cuando cambia
  useEffect(() => {
    const valid = validateExpression(expression);
    setIsValid(valid);
    onExpressionChange(valid ? expression : '');
  }, [expression, onExpressionChange]);

  /**
   * Agrega un símbolo a la expresión
   * @param {string} symbol - Símbolo a agregar
   */
  const handleSymbolClick = (symbol) => {
    setExpression(prev => prev + symbol);
  };

  /**
   * Limpia la expresión completa
   */
  const handleClear = () => {
    setExpression('');
  };

  /**
   * Elimina el último carácter de la expresión
   */
  const handleBackspace = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  return (
    <div className="mb-6">
      {/* Encabezado */}
      <div className="flex items-center space-x-2 mb-3">
        <FaEdit className="text-xl text-gray-700" />
        <h2 className="text-xl font-semibold">Editor de expresiones lógicas</h2>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        {/* Campo de expresión */}
        <div 
          className={`font-mono text-xl min-h-[40px] mb-4 p-2 border rounded ${
            expression ? (isValid ? 'border-green-500' : 'border-red-500') : 'border-gray-300'
          }`}
          role="textbox"
          aria-label="Editor de expresión lógica"
        >
          {expression || <span className="text-gray-400">Escribe tu expresión aquí</span>}
        </div>
        
        <div className="space-y-4">
          {/* Sección de variables */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Variables:</h3>
            <div className="flex flex-wrap gap-2">
              {VARIABLES.map((variable) => (
                <button
                  key={variable}
                  onClick={() => handleSymbolClick(variable)}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {variable}
                </button>
              ))}
            </div>
          </div>
          
          {/* Sección de operadores */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Operadores:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(OPERATORS).map(([symbol]) => (
                <button
                  key={symbol}
                  onClick={() => handleSymbolClick(symbol)}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Sección de paréntesis */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Paréntesis:</h3>
            <div className="flex flex-wrap gap-2">
              {PARENTHESES.map(({ symbol }) => (
                <button
                  key={symbol}
                  onClick={() => handleSymbolClick(symbol)}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Botones de control */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-white border border-gray-900 text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            Limpiar
          </button>
          <button
            onClick={handleBackspace}
            className="px-4 py-2 bg-white border border-gray-900 text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            ← Borrar
          </button>
        </div>
      </div>
      
      <OperatorGuide 
        operators={[
          ...PARENTHESES, 
          ...Object.entries(OPERATORS).map(([symbol, data]) => ({
            symbol,
            ...data
          }))
        ]} 
      />
    </div>
  );
};

export default ExpressionEditor;