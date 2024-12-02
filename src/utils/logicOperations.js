/**
 * Extrae las variables lógicas únicas presentes en una expresión.
 * Solo considera las variables p, q, r, x, y, z como válidas.
 * 
 * @param {string} expression - Expresión lógica a analizar
 * @returns {string[]} Array ordenado de variables únicas encontradas
 * 
 * @example
 * extractVariables('p ∧ q') // returns ['p', 'q']
 * extractVariables('p ∨ p ∧ r') // returns ['p', 'r']
 */
export const extractVariables = (expression) => {
  const variables = ['p', 'q', 'r', 'x', 'y', 'z'];
  return [...new Set(variables.filter(v => expression.includes(v)))].sort();
};

/**
 * Genera todas las posibles combinaciones de valores de verdad para un conjunto de variables.
 * Utiliza operaciones bit a bit para generar eficientemente la tabla de verdad.
 * 
 * @param {string[]} variables - Array de variables lógicas
 * @returns {boolean[][]} Matriz con todas las combinaciones posibles de valores verdadero/falso
 * 
 * @example
 * generateCombinations(['p', 'q']) 
 * // returns [[false, false], [false, true], [true, false], [true, true]]
 */
export const generateCombinations = (variables) => {
  const numVariables = variables.length;
  const combinations = [];
  const totalRows = Math.pow(2, numVariables);
  
  for (let i = 0; i < totalRows; i++) {
    const combination = [];
    for (let j = numVariables - 1; j >= 0; j--) {
      combination.unshift(!!(i & (1 << j)));
    }
    combinations.push(combination);
  }
  
  return combinations;
};