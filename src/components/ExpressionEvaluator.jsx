import React, { useState } from 'react';
import { evaluateExpression } from '../utils/expressionEvaluator';
import { FaQuestion } from 'react-icons/fa';

const ExpressionEvaluator = ({ expression, variables }) => {
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);

  const handleToggleValue = (variable) => {
    setValues(prev => ({
      ...prev,
      [variable]: !prev[variable]
    }));
  };

  const handleEvaluate = () => {
    if (Object.keys(values).length === variables.length) {
      const evaluationResult = evaluateExpression(expression, values);
      setResult(evaluationResult);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <div className="flex items-center space-x-2 mb-3">
        <FaQuestion className="text-xl text-gray-700" />
        <h3 className="text-lg font-semibold">Evaluador de casos específicos</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Selecciona los valores para cada variable y evalúa el resultado
      </p>

      <div className="flex flex-wrap gap-3 mb-4">
        {variables.map(variable => (
          <button
            key={variable}
            onClick={() => handleToggleValue(variable)}
            className={`px-4 py-2 rounded-md border ${
              values[variable] !== undefined
                ? values[variable]
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : 'bg-red-100 border-red-500 text-red-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {variable} = {values[variable] === undefined ? '?' : values[variable] ? 'V' : 'F'}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleEvaluate}
          disabled={Object.keys(values).length !== variables.length}
          className={`px-4 py-2 rounded-md transition-colors ${
            Object.keys(values).length === variables.length
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Evaluar
        </button>

        {result !== null && (
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Resultado:</span>
            <span className={`font-mono ${result ? 'text-green-600' : 'text-red-600'}`}>
              {result ? 'Verdadero' : 'Falso'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpressionEvaluator;