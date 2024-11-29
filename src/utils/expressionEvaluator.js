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