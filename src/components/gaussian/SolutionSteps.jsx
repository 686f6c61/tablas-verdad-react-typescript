import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

function SolutionSteps({ steps, variableStyle, numVariables }) {
  const getVariableName = (index) => {
    if (variableStyle === 'letters') {
      return ['x', 'y', 'z', 'w'][index];
    }
    return `x${index + 1}`;
  };

  const formatValue = (value) => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value.toString();
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Resolución paso a paso</h2>
      
      <div className="space-y-8">
        {steps.map((step, stepIndex) => (
          <div key={stepIndex} className="border-b pb-6 last:border-b-0">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                {stepIndex + 1}
              </span>
              <h3 className="text-lg font-medium">{step.description}</h3>
            </div>

            <div className="matrix-display mb-4">
              <span className="matrix-bracket">[</span>
              <div className="matrix-content">
                {step.matrix.map((row, i) => (
                  <div key={i} className="matrix-row">
                    {row.map((value, j) => (
                      <div key={j} className="matrix-cell">
                        {formatValue(value)}
                        {j < numVariables && !value.isZero && (
                          <span className="ml-1">{getVariableName(j)}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <span className="matrix-bracket">]</span>
            </div>

            {step.explanation && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{step.explanation}</p>
              </div>
            )}

            {stepIndex < steps.length - 1 && (
              <div className="flex justify-center my-4">
                <FaArrowRight className="text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolutionSteps;