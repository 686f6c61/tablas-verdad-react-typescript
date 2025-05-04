import { gcd } from './mathUtils';

export class Fraction {
  constructor(numerator, denominator = 1) {
    if (denominator === 0) {
      throw new Error('Denominator cannot be zero');
    }
    
    // Ensure denominator is positive
    if (denominator < 0) {
      numerator = -numerator;
      denominator = -denominator;
    }
    
    // Simplify the fraction
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    this.numerator = numerator / divisor;
    this.denominator = denominator / divisor;
  }

  static fromDecimal(decimal) {
    const precision = 1000000; // 6 decimal places
    const numerator = Math.round(decimal * precision);
    const fraction = new Fraction(numerator, precision);
    return fraction.simplify();
  }

  add(other) {
    return new Fraction(
      this.numerator * other.denominator + other.numerator * this.denominator,
      this.denominator * other.denominator
    ).simplify();
  }

  subtract(other) {
    return new Fraction(
      this.numerator * other.denominator - other.numerator * this.denominator,
      this.denominator * other.denominator
    ).simplify();
  }

  multiply(other) {
    return new Fraction(
      this.numerator * other.numerator,
      this.denominator * other.denominator
    ).simplify();
  }

  divide(other) {
    if (other.numerator === 0) {
      throw new Error('Division by zero');
    }
    return new Fraction(
      this.numerator * other.denominator,
      this.denominator * other.numerator
    ).simplify();
  }

  negate() {
    return new Fraction(-this.numerator, this.denominator);
  }

  abs() {
    return new Fraction(Math.abs(this.numerator), this.denominator);
  }

  simplify() {
    const divisor = gcd(Math.abs(this.numerator), this.denominator);
    return new Fraction(this.numerator / divisor, this.denominator / divisor);
  }

  toString() {
    if (this.denominator === 1) {
      return this.numerator.toString();
    }
    if (this.numerator === 0) {
      return '0';
    }
    return `${this.numerator}/${this.denominator}`;
  }

  toLatex() {
    if (this.denominator === 1) {
      return this.numerator.toString();
    }
    if (this.numerator === 0) {
      return '0';
    }
    return `\\frac{${this.numerator}}{${this.denominator}}`;
  }

  toDecimal() {
    return this.numerator / this.denominator;
  }

  equals(other) {
    return this.numerator * other.denominator === other.numerator * this.denominator;
  }

  isZero() {
    return this.numerator === 0;
  }
}