import { Fraction } from './fractionUtils';

export const solveGaussianElimination = (matrix, constants) => {
  const n = matrix.length;
  const augmentedMatrix = matrix.map((row, i) => [
    ...row.map(val => Fraction.fromDecimal(val)),
    Fraction.fromDecimal(constants[i])
  ]);
  const steps = [];

  // Forward elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxEl = augmentedMatrix[i][i].abs();
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (augmentedMatrix[k][i].abs().toDecimal() > maxEl.toDecimal()) {
        maxEl = augmentedMatrix[k][i].abs();
        maxRow = k;
      }
    }

    // Check if the system has no unique solution
    if (maxEl.isZero()) {
      // Check if the row is all zeros except the constant term
      const isRowZero = augmentedMatrix[i].slice(0, -1).every(val => val.isZero());
      const constantTerm = augmentedMatrix[i][n];
      
      if (isRowZero && !constantTerm.isZero()) {
        throw new Error('El sistema es inconsistente (0 = k, donde k ≠ 0)');
      } else if (isRowZero && constantTerm.isZero()) {
        throw new Error('El sistema tiene infinitas soluciones');
      }
      throw new Error('El sistema no tiene solución única');
    }

    // Swap maximum row with current row
    if (maxRow !== i) {
      [augmentedMatrix[i], augmentedMatrix[maxRow]] = 
      [augmentedMatrix[maxRow], augmentedMatrix[i]];
      
      steps.push({
        description: 'Intercambio de filas',
        matrix: augmentedMatrix.map(row => [...row]),
        explanation: `Intercambiamos la fila ${i + 1} con la fila ${maxRow + 1} para tener el pivote ${maxEl.toString()} en la diagonal principal.`
      });
    }

    // Make all rows below this one 0 in current column
    for (let k = i + 1; k < n; k++) {
      const pivotValue = augmentedMatrix[i][i];
      const targetValue = augmentedMatrix[k][i];
      
      if (targetValue.isZero()) continue;

      // Calculate factor as a fraction
      const factor = targetValue.divide(pivotValue);
      
      // Perform elimination
      for (let j = i; j <= n; j++) {
        if (i === j) {
          augmentedMatrix[k][j] = new Fraction(0);
        } else {
          augmentedMatrix[k][j] = augmentedMatrix[k][j]
            .subtract(factor.multiply(augmentedMatrix[i][j]));
        }
      }
      
      steps.push({
        description: 'Eliminación hacia adelante',
        matrix: augmentedMatrix.map(row => [...row]),
        explanation: `Multiplicamos la fila ${i + 1} por ${factor.toString()} y la restamos de la fila ${k + 1} para eliminar el término en la posición (${k + 1}, ${i + 1}).`
      });
    }
  }

  // Back substitution
  const solution = new Array(n).fill(new Fraction(0));
  for (let i = n - 1; i >= 0; i--) {
    let sum = augmentedMatrix[i][n];
    for (let j = i + 1; j < n; j++) {
      sum = sum.subtract(augmentedMatrix[i][j].multiply(solution[j]));
    }
    
    if (augmentedMatrix[i][i].isZero()) {
      if (!sum.isZero()) {
        throw new Error('El sistema es inconsistente');
      }
      continue; // Skip this equation if it's 0 = 0
    }
    
    solution[i] = sum.divide(augmentedMatrix[i][i]);
    
    steps.push({
      description: 'Sustitución hacia atrás',
      matrix: augmentedMatrix.map(row => [...row]),
      explanation: `Calculamos el valor de la variable ${i + 1}:\n` +
        `${augmentedMatrix[i][i].toString()}x${i + 1} = ${sum.toString()}\n` +
        `x${i + 1} = ${solution[i].toString()}`
    });
  }

  return { steps, solution: solution.map(s => s) };
};