// Greatest Common Divisor using Euclidean algorithm
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

// Least Common Multiple
export function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}