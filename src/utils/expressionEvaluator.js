/**
 * @fileoverview Evaluador de expresiones lógicas con soporte para múltiples operadores
 */

/**
 * Diccionario de operadores lógicos y sus implementaciones.
 * @const {Object.<string, function>}
 */
const operators = {
  '∧': (a, b) => a && b,      // AND
  '∨': (a, b) => a || b,      // OR
  '¬': (a) => !a,             // NOT
  '⊼': (a, b) => !(a && b),   // NAND
  '⊽': (a, b) => !(a || b),   // NOR
  '⊕': (a, b) => a !== b,     // XOR
  '↔': (a, b) => a === b,     // XNOR/Equivalencia
  '→': (a, b) => !a || b      // Implicación
};

/**
 * Evalúa una subexpresión que solo contiene valores binarios y operadores.
 * Aplica los operadores en orden de precedencia correcto.
 * 
 * @param {string} expr - Subexpresión a evaluar
 * @returns {boolean} Resultado de la evaluación
 */
const evaluateSubExpression = (expr) => {
  let result = expr;

  // Evaluar NOT (¬) primero
  while (result.includes('¬')) {
    result = result.replace(/¬([01])/g, (_, value) => {
      return operators['¬'](value === '1') ? '1' : '0';
    });
  }

  // Evaluar operadores binarios en orden de precedencia
  const operatorOrder = ['∧', '∨', '⊼', '⊽', '⊕', '↔', '→'];
  
  for (const operator of operatorOrder) {
    const regex = new RegExp(`([01])\\${operator}([01])`, 'g');
    while (result.match(regex)) {
      result = result.replace(regex, (_, a, b) => {
        const valA = a === '1';
        const valB = b === '1';
        return operators[operator](valA, valB) ? '1' : '0';
      });
    }
  }

  return result === '1';
};

/**
 * Evalúa una expresión lógica completa con variables y paréntesis.
 * 
 * @param {string} expression - Expresión lógica a evaluar
 * @param {Object.<string, boolean>} values - Objeto con los valores de las variables
 * @returns {boolean} Resultado de la evaluación
 * 
 * @example
 * evaluateExpression('p ∧ (q ∨ r)', { p: true, q: false, r: true }) // returns true
 * evaluateExpression('p → q', { p: true, q: false }) // returns false
 */
export const evaluateExpression = (expression, values) => {
  if (!expression) return false;

  let result = expression;

  // Reemplazar variables con sus valores
  Object.entries(values).forEach(([variable, value]) => {
    const regex = new RegExp(`\\b${variable}\\b`, 'g');
    result = result.replace(regex, value ? '1' : '0');
  });

  // Evaluar paréntesis primero
  while (result.includes('(')) {
    result = result.replace(/\(([^()]+)\)/g, (_, subExpr) => {
      return evaluateSubExpression(subExpr) ? '1' : '0';
    });
  }

  return evaluateSubExpression(result);
};