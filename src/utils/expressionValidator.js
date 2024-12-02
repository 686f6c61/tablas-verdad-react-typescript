/**
 * Valida la sintaxis de una expresión lógica.
 * 
 * Realiza las siguientes validaciones:
 * 1. Verifica que los paréntesis estén correctamente balanceados
 * 2. Comprueba que no haya operadores lógicos consecutivos
 * 3. Asegura que la expresión no comience con operadores binarios
 * 4. Verifica que la expresión no termine con ningún operador
 * 
 * @param {string} expression - Expresión lógica a validar
 * @returns {boolean} true si la expresión es válida, false en caso contrario
 * 
 * @example
 * validateExpression('p ∧ q')     // returns true
 * validateExpression('p ∧∧ q')    // returns false
 * validateExpression('(p ∧ q')    // returns false
 * validateExpression('∧ p')       // returns false
 */
export const validateExpression = (expression) => {
  if (!expression) return false;

  // Verificar paréntesis balanceados
  let parenthesesCount = 0;
  for (const char of expression) {
    if (char === '(') parenthesesCount++;
    if (char === ')') parenthesesCount--;
    if (parenthesesCount < 0) return false;  // Cierre sin apertura
  }
  if (parenthesesCount !== 0) return false;  // Apertura sin cierre

  // Verificar operadores consecutivos (∧, ∨, ⊼, ⊽, ⊕, ↔, →)
  if (/[∧∨⊼⊽⊕↔→]{2,}/.test(expression)) return false;

  // Verificar que no empiece con operador binario
  if (/^[∧∨⊼⊽⊕↔→]/.test(expression)) return false;

  // Verificar que no termine con operador (incluye negación ¬)
  if (/[∧∨⊼⊽⊕↔→¬]$/.test(expression)) return false;

  return true;
};