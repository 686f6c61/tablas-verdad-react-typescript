/**
 * Calcula el Máximo Común Divisor (MCD) de dos números utilizando el algoritmo de Euclides.
 * 
 * @param {number} a - Primer número entero
 * @param {number} b - Segundo número entero
 * @returns {number} El MCD de los dos números
 * 
 * @example
 * gcd(48, 18) // returns 6
 * gcd(-48, 18) // returns 6
 */
export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Calcula el Mínimo Común Múltiplo (MCM) de dos números.
 * Utiliza la relación MCM(a,b) = |a * b| / MCD(a,b)
 * 
 * @param {number} a - Primer número entero
 * @param {number} b - Segundo número entero
 * @returns {number} El MCM de los dos números
 * 
 * @example
 * lcm(4, 6) // returns 12
 * lcm(-4, 6) // returns 12
 */
export function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}