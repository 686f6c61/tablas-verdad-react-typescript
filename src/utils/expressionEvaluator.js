const operators = {
  '∧': (a, b) => a && b,
  '∨': (a, b) => a || b,
  '¬': (a) => !a,
  '⊼': (a, b) => !(a && b),
  '⊽': (a, b) => !(a || b),
  '⊕': (a, b) => a !== b,
  '↔': (a, b) => a === b,
  '→': (a, b) => !a || b
};

export const evaluateExpression = (expression, values) => {
  if (!expression) return false;

  let result = expression;

  // Reemplazar variables con sus valores
  Object.entries(values).forEach(([variable, value]) => {
    result = result.replaceAll(variable, value ? '1' : '0');
  });

  // Evaluar NOT (¬)
  while (result.includes('¬')) {
    result = result.replace(/¬(1|0)/g, (match, value) => 
      operators['¬'](value === '1') ? '1' : '0'
    );
  }

  // Evaluar operadores binarios
  Object.entries(operators).forEach(([symbol, operation]) => {
    if (symbol === '¬') return; // NOT ya fue evaluado
    const regex = new RegExp(`(1|0)\\${symbol}(1|0)`, 'g');
    while (result.match(regex)) {
      result = result.replace(regex, (match, a, b) => 
        operation(a === '1', b === '1') ? '1' : '0'
      );
    }
  });

  return result === '1';
};