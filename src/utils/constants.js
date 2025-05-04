export const OPERATORS = {
  '∧': { name: 'AND', description: 'Verdadero solo si ambos operandos son verdaderos' },
  '∨': { name: 'OR', description: 'Verdadero si al menos un operando es verdadero' },
  '¬': { name: 'NOT', description: 'Invierte el valor de verdad' },
  '⊼': { name: 'NAND', description: 'Negación del AND' },
  '⊽': { name: 'NOR', description: 'Negación del OR' },
  '⊕': { name: 'XOR', description: 'Verdadero si los operandos son diferentes' },
  '↔': { name: 'XNOR', description: 'Verdadero si los operandos son iguales' },
  '→': { name: 'IMPLICATION', description: 'Falso solo si el antecedente es verdadero y el consecuente falso' }
};

export const VARIABLES = ['p', 'q', 'r', 'x', 'y', 'z'];

export const PARENTHESES = [
  { symbol: '(', description: 'Abre un grupo de operaciones' },
  { symbol: ')', description: 'Cierra un grupo de operaciones' }
];