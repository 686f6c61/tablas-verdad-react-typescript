import React from 'react';
import { FaFont, FaSubscript } from 'react-icons/fa';

function VariableSelector({ onSelectVariables, onSelectStyle }) {
  const getLetterVariables = (num) => {
    const letters = ['x', 'y', 'z', 'w'];
    return letters.slice(0, num).join(', ');
  };

  const getNumberedVariables = (num) => {
    return Array.from({length: num}, (_, i) => `x${i + 1}`).join(', ');
  };

  const handleVariableSelection = (num, style) => {
    onSelectStyle(style);
    onSelectVariables(num);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Configuración del sistema</h2>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Variables como letras */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-center">
              Variables como letras
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[2, 3, 4].map(num => (
                <button
                  key={`letters-${num}`}
                  onClick={() => handleVariableSelection(num, 'letters')}
                  className="flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <FaFont className="text-lg text-gray-600" />
                    <span className="font-medium">{num} variables</span>
                  </div>
                  <div className="text-gray-600">
                    {getLetterVariables(num)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Variables numeradas */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-center">
              Variables numeradas
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[2, 3, 4].map(num => (
                <button
                  key={`numbered-${num}`}
                  onClick={() => handleVariableSelection(num, 'x')}
                  className="flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <FaSubscript className="text-lg text-gray-600" />
                    <span className="font-medium">{num} variables</span>
                  </div>
                  <div className="text-gray-600">
                    {getNumberedVariables(num)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600">
          <p>Seleccione el número de variables y el estilo de notación para continuar</p>
        </div>
      </div>
    </div>
  );
}

export default VariableSelector;