import React, { useState, useEffect } from 'react';
import { evaluateExpression } from '../utils/expressionEvaluator';
import { extractVariables } from '../utils/logicOperations';
import { exportToTxt, exportToPdf } from '../utils/exportUtils';
import ExpressionEvaluator from './ExpressionEvaluator';

const TruthTable = ({ expression, combinations }) => {
  const usedVariables = extractVariables(expression);
  const [results, setResults] = useState([]);

  const evaluateRow = (combination) => {
    const values = {};
    usedVariables.forEach((name, index) => {
      values[name] = combination[index];
    });
    return evaluateExpression(expression, values);
  };

  useEffect(() => {
    if (combinations && combinations.length > 0) {
      const newResults = combinations.map(evaluateRow);
      setResults(newResults);
    }
  }, [combinations, expression]);

  const handleExport = (format) => {
    if (format === 'txt') {
      exportToTxt(expression, usedVariables, combinations, results);
    } else if (format === 'pdf') {
      exportToPdf(expression, usedVariables, combinations, results);
    }
  };

  if (!combinations || combinations.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Expresión a evaluar:</h3>
        <p className="font-mono text-xl mt-2 p-2 bg-gray-100 rounded">{expression}</p>
        
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => handleExport('pdf')}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Exportar PDF
          </button>
          <button
            onClick={() => handleExport('txt')}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Exportar TXT
          </button>
        </div>
      </div>
      
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {results.length > 0 && (
              <th className="border border-gray-300 px-4 py-2 w-16">
                #
              </th>
            )}
            {usedVariables.map((name) => (
              <th key={name} className="border border-gray-300 px-4 py-2">
                {name}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2">
              Resultado
            </th>
          </tr>
        </thead>
        <tbody>
          {combinations.map((combination, rowIndex) => {
            const result = results[rowIndex];
            return (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {results.length > 0 && (
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-600">
                    {rowIndex + 1}
                  </td>
                )}
                {combination.map((value, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 px-4 py-2 text-center">
                    {value ? 'V' : 'F'}
                  </td>
                ))}
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  {result ? 'V' : 'F'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ExpressionEvaluator 
        expression={expression}
        variables={usedVariables}
      />
    </div>
  );
};

export default TruthTable;