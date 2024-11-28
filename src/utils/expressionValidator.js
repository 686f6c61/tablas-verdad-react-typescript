export const validateExpression = (expression) => {
  if (!expression) return false;

  // Verificar paréntesis balanceados
  let parenthesesCount = 0;
  for (const char of expression) {
    if (char === '(') parenthesesCount++;
    if (char === ')') parenthesesCount--;
    if (parenthesesCount < 0) return false;
  }
  if (parenthesesCount !== 0) return false;

  // Verificar operadores consecutivos
  if (/[∧∨⊼⊽⊕↔→]{2,}/.test(expression)) return false;

  // Verificar que no empiece con operador binario
  if (/^[∧∨⊼⊽⊕↔→]/.test(expression)) return false;

  // Verificar que no termine con operador
  if (/[∧∨⊼⊽⊕↔→¬]$/.test(expression)) return false;

  return true;
};