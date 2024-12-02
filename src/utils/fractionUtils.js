/**
 * @fileoverview Clase para el manejo de fracciones matemáticas
 * @status DEPRECATED - Este módulo no está actualmente en uso y requiere revisión
 */

import { gcd } from './mathUtils';

/**
 * Clase que representa una fracción matemática y sus operaciones.
 * Mantiene las fracciones en su forma más simplificada.
 * 
 * @deprecated Esta clase no está actualmente en uso y necesita revisión
 */
export class Fraction {
  /**
   * Crea una nueva fracción.
   * @param {number} numerator - Numerador de la fracción
   * @param {number} [denominator=1] - Denominador de la fracción
   * @throws {Error} Si el denominador es cero
   */
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

  /**
   * Crea una fracción a partir de un número decimal.
   * @param {number} decimal - Número decimal a convertir
   * @returns {Fraction} Nueva fracción que representa el decimal
   */
  static fromDecimal(decimal) {
    const precision = 1000000; // 6 decimal places
    const numerator = Math.round(decimal * precision);
    const fraction = new Fraction(numerator, precision);
    return fraction.simplify();
  }

  /**
   * Suma esta fracción con otra.
   * @param {Fraction} other - Fracción a sumar
   * @returns {Fraction} Nueva fracción que representa la suma
   */
  add(other) {
    return new Fraction(
      this.numerator * other.denominator + other.numerator * this.denominator,
      this.denominator * other.denominator
    ).simplify();
  }

  /**
   * Resta otra fracción de esta.
   * @param {Fraction} other - Fracción a restar
   * @returns {Fraction} Nueva fracción que representa la diferencia
   */
  subtract(other) {
    return new Fraction(
      this.numerator * other.denominator - other.numerator * this.denominator,
      this.denominator * other.denominator
    ).simplify();
  }

  /**
   * Multiplica esta fracción por otra.
   * @param {Fraction} other - Fracción a multiplicar
   * @returns {Fraction} Nueva fracción que representa el producto
   */
  multiply(other) {
    return new Fraction(
      this.numerator * other.numerator,
      this.denominator * other.denominator
    ).simplify();
  }

  /**
   * Divide esta fracción por otra.
   * @param {Fraction} other - Fracción divisora
   * @returns {Fraction} Nueva fracción que representa el cociente
   * @throws {Error} Si la fracción divisora es cero
   */
  divide(other) {
    if (other.numerator === 0) {
      throw new Error('Division by zero');
    }
    return new Fraction(
      this.numerator * other.denominator,
      this.denominator * other.numerator
    ).simplify();
  }

  /**
   * Devuelve el negativo de esta fracción.
   * @returns {Fraction} Nueva fracción con el signo opuesto
   */
  negate() {
    return new Fraction(-this.numerator, this.denominator);
  }

  /**
   * Devuelve el valor absoluto de esta fracción.
   * @returns {Fraction} Nueva fracción con valor absoluto
   */
  abs() {
    return new Fraction(Math.abs(this.numerator), this.denominator);
  }

  /**
   * Simplifica esta fracción a su forma más reducida.
   * @returns {Fraction} Nueva fracción simplificada
   */
  simplify() {
    const divisor = gcd(Math.abs(this.numerator), this.denominator);
    return new Fraction(this.numerator / divisor, this.denominator / divisor);
  }

  /**
   * Convierte la fracción a string en formato "numerador/denominador".
   * @returns {string} Representación en string de la fracción
   */
  toString() {
    if (this.denominator === 1) {
      return this.numerator.toString();
    }
    if (this.numerator === 0) {
      return '0';
    }
    return `${this.numerator}/${this.denominator}`;
  }

  /**
   * Convierte la fracción a formato LaTeX.
   * @returns {string} Representación LaTeX de la fracción
   */
  toLatex() {
    if (this.denominator === 1) {
      return this.numerator.toString();
    }
    if (this.numerator === 0) {
      return '0';
    }
    return `\\frac{${this.numerator}}{${this.denominator}}`;
  }

  /**
   * Convierte la fracción a su valor decimal.
   * @returns {number} Valor decimal de la fracción
   */
  toDecimal() {
    return this.numerator / this.denominator;
  }

  /**
   * Compara esta fracción con otra para determinar si son iguales.
   * @param {Fraction} other - Fracción a comparar
   * @returns {boolean} true si las fracciones son iguales
   */
  equals(other) {
    return this.numerator * other.denominator === other.numerator * this.denominator;
  }

  /**
   * Verifica si esta fracción es igual a cero.
   * @returns {boolean} true si la fracción es cero
   */
  isZero() {
    return this.numerator === 0;
  }
}