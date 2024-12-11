import React, { useState } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function GaussianQA({ steps, matrix, constants, solution }) {
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const questions = [
    {
      id: 'first-step',
      text: '¿Cuál es el primer paso en el método de Gauss para resolver este sistema?',
      getAnswer: () => {
        if (!steps || steps.length === 0) return '';
        return `El primer paso es ${steps[0].description.toLowerCase()}. ${steps[0].explanation}`;
      }
    },
    {
      id: 'second-equation',
      text: 'Después de eliminar la variable en la segunda ecuación, ¿cuál es la nueva ecuación resultante?',
      getAnswer: () => {
        const relevantStep = steps.find(step => 
          step.description === 'Eliminación hacia adelante' && 
          step.explanation.includes('fila 2')
        );
        if (!relevantStep) return '';
        return `La nueva ecuación es: ${formatEquation(relevantStep.matrix[1])}`;
      }
    },
    {
      id: 'allowed-operations',
      text: '¿Qué operaciones están permitidas en las ecuaciones?',
      getAnswer: () => 
        'En el método de Gauss se permiten las siguientes operaciones elementales:\n' +
        '1. Intercambiar dos ecuaciones (filas)\n' +
        '2. Multiplicar una ecuación por un número no nulo\n' +
        '3. Sumar o restar a una ecuación un múltiplo de otra ecuación'
    },
    {
      id: 'final-form',
      text: '¿Qué forma debe tener la matriz una vez que se ha completado el método de Gauss?',
      getAnswer: () => 
        'La matriz debe tener forma triangular superior, donde:\n' +
        '1. Todos los elementos debajo de la diagonal principal son cero\n' +
        '2. Los elementos de la diagonal principal son no nulos\n' +
        '3. Esta forma permite resolver el sistema mediante sustitución hacia atrás'
    },
    {
      id: 'next-step',
      text: 'Después de obtener la forma escalonada, ¿cuál es el siguiente paso para resolver el sistema?',
      getAnswer: () => 
        'El siguiente paso es la sustitución hacia atrás, donde:\n' +
        '1. Se empieza por la última ecuación que tiene una sola incógnita\n' +
        '2. Se sustituye cada valor encontrado en las ecuaciones anteriores\n' +
        '3. Se resuelve cada ecuación sucesivamente hasta encontrar todas las incógnitas'
    },
    {
      id: 'last-variable',
      text: '¿Cuál es el valor de la última variable en el sistema escalonado?',
      getAnswer: () => {
        if (!solution) return '';
        return `El valor de la última variable es ${solution[solution.length - 1].toFixed(2)}`;
      }
    },
    {
      id: 'substitute-value',
      text: 'Después de sustituir el valor encontrado en la ecuación anterior, ¿cuál es el resultado?',
      getAnswer: () => {
        const backSubStep = steps.find(step => 
          step.description === 'Sustitución hacia atrás'
        );
        if (!backSubStep) return '';
        return backSubStep.explanation;
      }
    },
    {
      id: 'first-variable',
      text: 'Después de sustituir todos los valores, ¿cuál es el valor de la primera variable?',
      getAnswer: () => {
        if (!solution) return '';
        return `El valor de la primera variable es ${solution[0].toFixed(2)}`;
      }
    },
    {
      id: 'inconsistent-system',
      text: '¿Qué ocurre si en un sistema de ecuaciones, una de las filas de la matriz escalonada se convierte en 0 = 1?',
      getAnswer: () => 
        'Si se obtiene una ecuación de la forma 0 = 1, significa que el sistema es inconsistente, ' +
        'es decir, no tiene solución. Esto ocurre cuando las ecuaciones originales son contradictorias ' +
        'entre sí.'
    },
    {
      id: 'infinite-solutions',
      text: 'Si una fila se convierte en 0 = 0, ¿qué significa esto?',
      getAnswer: () => 
        'Cuando se obtiene una ecuación de la forma 0 = 0, significa que esa ecuación es una ' +
        'combinación lineal de las otras ecuaciones y no aporta nueva información. Esto suele ' +
        'indicar que el sistema tiene infinitas soluciones, ya que hay más incógnitas que ' +
        'ecuaciones independientes.'
    }
  ];

  const formatEquation = (row) => {
    return row.slice(0, -1).map((coef, i) => 
      `${coef.toFixed(2)}x${i + 1}`
    ).join(' + ') + ` = ${row[row.length - 1].toFixed(2)}`;
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <FaQuestionCircle className="text-2xl text-gray-700" />
        <h2 className="text-xl font-semibold">Preguntas sobre el proceso</h2>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleQuestion(question.id)}
              className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="flex-grow pr-4">{question.text}</span>
              {expandedQuestions.has(question.id) ? (
                <FaChevronUp className="flex-shrink-0 text-gray-500" />
              ) : (
                <FaChevronDown className="flex-shrink-0 text-gray-500" />
              )}
            </button>
            
            {expandedQuestions.has(question.id) && (
              <div className="p-4 bg-white border-t">
                <p className="whitespace-pre-line text-gray-700">
                  {question.getAnswer()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GaussianQA;