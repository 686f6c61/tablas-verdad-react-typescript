import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

function MatrixInput({ 
  numVariables, 
  variableStyle, 
  matrix, 
  constants, 
  onMatrixChange, 
  onConstantsChange 
}) {
  const [operators, setOperators] = useState(
    Array(numVariables).fill().map(() => Array(numVariables - 1).fill('+'))
  );

  const getVariableName = (index) => {
    if (variableStyle === 'letters') {
      return ['x', 'y', 'z', 'w'][index];
    }
    return `x${index + 1}`;
  };

  const handleCoefficientChange = (row, col, value) => {
    const newMatrix = [...matrix];
    if (!newMatrix[row]) {
      newMatrix[row] = Array(numVariables).fill(0);
    }
    const numValue = value === '' ? 0 : parseFloat(value);
    newMatrix[row][col] = isNaN(numValue) ? 0 : numValue;
    onMatrixChange(newMatrix);
  };

  const handleConstantChange = (row, value) => {
    const newConstants = [...constants];
    const numValue = value === '' ? 0 : parseFloat(value);
    newConstants[row] = isNaN(numValue) ? 0 : numValue;
    onConstantsChange(newConstants);
  };

  const toggleOperator = (row, col) => {
    const newOperators = [...operators];
    if (!newOperators[row]) {
      newOperators[row] = Array(numVariables - 1).fill('+');
    }
    newOperators[row][col] = newOperators[row][col] === '+' ? '-' : '+';
    setOperators(newOperators);

    // Update the matrix value based on the operator
    const newMatrix = [...matrix];
    if (!newMatrix[row]) {
      newMatrix[row] = Array(numVariables).fill(0);
    }
    newMatrix[row][col + 1] = Math.abs(newMatrix[row][col + 1] || 0) * (newOperators[row][col] === '+' ? 1 : -1);
    onMatrixChange(newMatrix);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Ingrese los coeficientes:</h2>
      
      {Array(numVariables).fill(0).map((_, row) => (
        <div key={row} className="flex items-center space-x-4 mb-4">
          {Array(numVariables).fill(0).map((_, col) => (
            <div key={col} className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={matrix[row]?.[col] || ''}
                  onChange={(e) => handleCoefficientChange(row, col, e.target.value)}
                  className="w-20 p-2 border rounded-md"
                  placeholder="0"
                />
                <span className="font-medium">{getVariableName(col)}</span>
              </div>
              {col < numVariables - 1 && (
                <button
                  onClick={() => toggleOperator(row, col)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {operators[row]?.[col] === '+' ? (
                    <FaPlus className="text-gray-600" />
                  ) : (
                    <FaMinus className="text-gray-600" />
                  )}
                </button>
              )}
            </div>
          ))}
          <span className="text-gray-600 mx-2">=</span>
          <input
            type="number"
            value={constants[row] || ''}
            onChange={(e) => handleConstantChange(row, e.target.value)}
            className="w-20 p-2 border rounded-md"
            placeholder="0"
          />
        </div>
      ))}

      <div className="mt-6 text-sm text-gray-600">
        <p>Ingrese los coeficientes y use los botones + / - para cambiar los operadores entre términos</p>
      </div>
    </div>
  );
}

export default MatrixInput;