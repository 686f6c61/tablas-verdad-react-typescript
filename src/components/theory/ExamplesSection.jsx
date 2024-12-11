import React from 'react';
import TheoryCard from './TheoryCard';

function ExamplesSection() {
  const examples = [
    {
      title: 'Ejemplo 1: Implicación',
      premise: 'Si llueve, entonces llevo paraguas',
      variables: {
        p: 'Llueve',
        q: 'Llevo paraguas'
      },
      expression: 'p → q',
      explanation: 'La implicación es falsa solo cuando llueve y no llevo paraguas'
    },
    {
      title: 'Ejemplo 2: Conjunción y Disyunción',
      premise: 'Estudio y trabajo, o descanso',
      variables: {
        p: 'Estudio',
        q: 'Trabajo',
        r: 'Descanso'
      },
      expression: '(p ∧ q) ∨ r',
      explanation: 'La expresión es verdadera si estudio y trabajo, o si descanso'
    },
    {
      title: 'Ejemplo 3: Negación y Conjunción',
      premise: 'No es cierto que sea lunes y haga frío',
      variables: {
        p: 'Es lunes',
        q: 'Hace frío'
      },
      expression: '¬(p ∧ q)',
      explanation: 'Usando De Morgan, equivale a: No es lunes o no hace frío (¬p ∨ ¬q)'
    }
  ];

  return (
    <TheoryCard
      title="Ejemplos Prácticos"
      icon="examples"
    >
      <div className="space-y-6">
        {examples.map((example, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
            <p className="text-gray-700 mb-3">Premisa: "{example.premise}"</p>
            
            <div className="mb-3">
              <h4 className="font-medium mb-2">Variables:</h4>
              <ul className="list-disc list-inside pl-4">
                {Object.entries(example.variables).map(([key, value]) => (
                  <li key={key} className="text-gray-600">
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>

            <div className="font-mono mb-3">
              Expresión formal: {example.expression}
            </div>

            <p className="text-gray-700">
              <span className="font-medium">Explicación:</span> {example.explanation}
            </p>
          </div>
        ))}
      </div>
    </TheoryCard>
  );
}

export default ExamplesSection;