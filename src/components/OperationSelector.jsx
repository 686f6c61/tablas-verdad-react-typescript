/**
 * @fileoverview Componente selector de operaciones lógicas
 */

import React from 'react';

/**
 * Lista de operaciones lógicas disponibles
 * @constant {Array<{id: string, symbol: string, name: string}>}
 */
const operations = [
  { id: 'AND', symbol: '∧', name: 'AND' },
  { id: 'OR', symbol: '∨', name: 'OR' },
  { id: 'NOT', symbol: '¬', name: 'NOT' },
  { id: 'NAND', symbol: '⊼', name: 'NAND' },
  { id: 'NOR', symbol: '⊽', name: 'NOR' },
  { id: 'XOR', symbol: '⊕', name: 'XOR' },
  { id: 'XNOR', symbol: '↔', name: 'XNOR' },
  { id: 'IMPLICATION', symbol: '→', name: 'Implicación' }
];

/**
 * Componente que permite seleccionar operaciones lógicas para usar en expresiones.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string[]} props.selectedOperations - Array de IDs de operaciones seleccionadas
 * @param {Function} props.onOperationToggle - Función callback que se ejecuta al seleccionar/deseleccionar una operación
 * 
 * @example
 * const [selected, setSelected] = useState(['AND', 'OR']);
 * 
 * <OperationSelector
 *   selectedOperations={selected}
 *   onOperationToggle={(id) => {
 *     setSelected(prev => 
 *       prev.includes(id) 
 *         ? prev.filter(op => op !== id)
 *         : [...prev, id]
 *     );
 *   }}
 * />
 */
const OperationSelector = ({ selectedOperations, onOperationToggle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">
        Selecciona las operaciones:
      </h2>
      <div className="flex flex-wrap gap-2">
        {operations.map(({ id, symbol, name }) => (
          <button
            key={id}
            onClick={() => onOperationToggle(id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedOperations.includes(id)
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {symbol} {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default OperationSelector;