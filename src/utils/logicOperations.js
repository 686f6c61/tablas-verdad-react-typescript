// Función para extraer variables únicas de una expresión
export const extractVariables = (expression) => {
  const variables = ['p', 'q', 'r', 'x', 'y', 'z'];
  return [...new Set(variables.filter(v => expression.includes(v)))].sort();
};

// Genera combinaciones de valores para las variables dadas
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