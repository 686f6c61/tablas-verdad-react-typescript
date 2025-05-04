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

const evaluateSubExpression = (expr, steps = null) => {
  let result = expr;

  // Evaluar NOT (¬) primero
  while (result.includes('¬')) {
    const prevResult = result;
    result = result.replace(/¬([01])/g, (match, value) => {
      const val = value === '1';
      const res = operators['¬'](val);
      
      if (steps) {
        steps.push({
          operation: match,
          description: `¬${val ? 'V' : 'F'} = ${res ? 'V' : 'F'}`,
          result: res ? '1' : '0'
        });
      }
      
      return res ? '1' : '0';
    });
    
    if (prevResult === result) break; // Evitar bucle infinito
  }

  // Evaluar operadores binarios en orden de precedencia
  const operatorOrder = ['∧', '∨', '⊼', '⊽', '⊕', '↔', '→'];
  const operatorNames = {
    '∧': 'AND',
    '∨': 'OR',
    '⊼': 'NAND',
    '⊽': 'NOR',
    '⊕': 'XOR',
    '↔': 'BICONDICIONAL',
    '→': 'IMPLICACIÓN'
  };
  
  for (const operator of operatorOrder) {
    const regex = new RegExp(`([01])\\${operator}([01])`, 'g');
    while (result.match(regex)) {
      const prevResult = result;
      result = result.replace(regex, (match, a, b) => {
        const valA = a === '1';
        const valB = b === '1';
        const res = operators[operator](valA, valB);
        
        if (steps) {
          steps.push({
            operation: match,
            description: `${valA ? 'V' : 'F'} ${operator} ${valB ? 'V' : 'F'} = ${res ? 'V' : 'F'} (${operatorNames[operator]})`,
            result: res ? '1' : '0'
          });
        }
        
        return res ? '1' : '0';
      });
      
      if (prevResult === result) break; // Evitar bucle infinito
    }
  }

  return result === '1';
};

export const evaluateExpression = (expression, values, includeSteps = false) => {
  if (!expression) return { result: false, steps: [] };

  let result = expression;
  const steps = includeSteps ? [] : null;
  const substitutionSteps = includeSteps ? [] : null;
  
  // Paso 1: Registrar el valor inicial con las variables
  if (includeSteps) {
    substitutionSteps.push({ 
      operation: 'Expresión original', 
      description: expression,
      result: expression
    });
  }

  // Paso 2: Reemplazar variables con sus valores
  Object.entries(values).forEach(([variable, value]) => {
    const regex = new RegExp(`\\b${variable}\\b`, 'g');
    const oldResult = result;
    result = result.replace(regex, value ? '1' : '0');
    
    if (includeSteps && oldResult !== result) {
      substitutionSteps.push({
        operation: `Sustitución: ${variable}`,
        description: `${variable} = ${value ? 'V' : 'F'}`,
        result: result
      });
    }
  });
  
  // Paso 3: Registrar la expresión con valores sustituidos
  if (includeSteps) {
    steps.push({
      operation: 'Sustitución de variables',
      description: `Expresión con valores: ${result}`,
      result: result
    });
  }

  // Paso 4: Evaluar paréntesis primero
  while (result.includes('(')) {
    const oldResult = result;
    result = result.replace(/\(([^()]+)\)/g, (match, subExpr) => {
      // Crear un array de pasos anidados para la subexpresión
      const subSteps = includeSteps ? [] : null;
      const subResult = evaluateSubExpression(subExpr, subSteps);
      
      if (includeSteps) {
        steps.push({
          operation: `Evaluación: ${match}`,
          description: `Paréntesis: ${subResult ? 'V' : 'F'}`,
          result: subResult ? '1' : '0',
          subSteps: subSteps
        });
      }
      
      return subResult ? '1' : '0';
    });
    
    // Salir si no hubo cambios
    if (oldResult === result) break;
  }

  // Paso 5: Evaluar la expresión sin paréntesis
  const finalResult = evaluateSubExpression(result, steps);
  
  if (includeSteps) {
    return { 
      result: finalResult, 
      steps: steps,
      substitutionSteps: substitutionSteps,
      expression: expression
    };
  }
  
  return { result: finalResult, steps: [] };
};