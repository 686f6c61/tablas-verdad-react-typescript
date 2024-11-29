import React, { useState } from 'react';
import VariableSelector from '../components/gaussian/VariableSelector';
import MatrixInput from '../components/gaussian/MatrixInput';
import SolutionSteps from '../components/gaussian/SolutionSteps';
import GaussianQA from '../components/gaussian/GaussianQA';
import { FaCalculator } from 'react-icons/fa';
import { solveGaussianElimination } from '../utils/gaussianElimination';

function GaussianEliminationPage() {
  const [numVariables, setNumVariables] = useState(0);
  const [variableStyle, setVariableStyle] = useState('x');
  const [matrix, setMatrix] = useState([]);
  const [constants, setConstants] = useState([]);
  const [steps, setSteps] = useState([]);
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState('');

  const handleSolve = () => {
    setError('');
    
    // Validar que la matriz esté completa
    const isMatrixComplete = matrix.length === numVariables &&
      matrix.every(row => row.length === numVariables);
    const areConstantsComplete = constants.length === numVariables;

    if (!isMatrixComplete || !areConstantsComplete) {
      setError('Por favor, complete todos los coeficientes del sistema.');
      return;
    }

    try {
      const { steps: solutionSteps, solution: solutionValues } = solveGaussianElimination(matrix, constants);
      setSolution(solutionValues);
      setSteps([
        {
          description: 'Sistema inicial',
          matrix: matrix.map((row, i) => [...row, constants[i]]),
          explanation: 'Este es el sistema de ecuaciones inicial en forma matricial.'
        },
        ...solutionSteps,
        {
          description: 'Solución final',
          matrix: matrix.map((row, i) => [...row, constants[i]]),
          explanation: `La solución del sistema es: ${
            solutionValues.map((value, i) => 
              `${variableStyle === 'letters' ? 
                ['x', 'y', 'z', 'w'][i] : 
                `x${i + 1}`} = ${value.toFixed(2)}`
            ).join(', ')
          }`
        }
      ]);
    } catch (err) {
      setError('El sistema no tiene solución única o es inconsistente.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <FaCalculator className="text-3xl text-gray-700" />
          <h1 className="text-3xl font-bold">Resolución de Sistemas de Ecuaciones</h1>
        </div>
        <p className="text-gray-600">
          Método de eliminación Gaussiana con explicación paso a paso
        </p>
      </div>

      {!numVariables ? (
        <VariableSelector 
          onSelectVariables={setNumVariables}
          onSelectStyle={setVariableStyle}
        />
      ) : (
        <>
          <MatrixInput
            numVariables={numVariables}
            variableStyle={variableStyle}
            matrix={matrix}
            constants={constants}
            onMatrixChange={setMatrix}
            onConstantsChange={setConstants}
          />
          
          {error && (
            <div className="max-w-4xl mx-auto mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="text-center mt-6">
            <button
              onClick={handleSolve}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Resolver sistema
            </button>
          </div>

          {steps.length > 0 && (
            <>
              <SolutionSteps 
                steps={steps}
                variableStyle={variableStyle}
                numVariables={numVariables}
              />
              <GaussianQA
                steps={steps}
                matrix={matrix}
                constants={constants}
                solution={solution}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default GaussianEliminationPage;