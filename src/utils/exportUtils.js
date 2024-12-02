/**
 * @fileoverview Utilidades para exportar tablas de verdad en formatos TXT y PDF
 */

import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Formatea una expresión lógica reemplazando símbolos por texto legible.
 * 
 * @param {string} expression - Expresión lógica con símbolos
 * @returns {string} Expresión formateada con operadores en texto
 */
const formatExpression = (expression) => {
  return expression
    .replace(/∧/g, ' AND ')
    .replace(/∨/g, ' OR ')
    .replace(/¬/g, 'NOT ')
    .replace(/⊼/g, ' NAND ')
    .replace(/⊽/g, ' NOR ')
    .replace(/⊕/g, ' XOR ')
    .replace(/↔/g, ' XNOR ')
    .replace(/→/g, ' → ');
};

/**
 * Crea el encabezado del documento con fecha y proposición.
 * 
 * @param {string} text - Texto de la proposición
 * @returns {string} Encabezado formateado
 */
const createHeader = (text) => {
  const date = new Date().toLocaleDateString('es-ES');
  return `tabla de verdad - ${date}\n\nproposición: ${text}\n\n`;
};

/**
 * Exporta una tabla de verdad a un archivo de texto.
 * 
 * @param {string} expression - Expresión lógica original
 * @param {string[]} variables - Array de variables utilizadas
 * @param {boolean[][]} combinations - Matriz de combinaciones de valores
 * @param {boolean[]} results - Array de resultados
 */
export const exportToTxt = (expression, variables, combinations, results) => {
  const formattedExpression = formatExpression(expression);
  let content = createHeader(formattedExpression);
  
  // Crear encabezado de la tabla
  const header = [...variables, 'resultado'];
  content += header.join('\t') + '\n';
  content += '-'.repeat(header.length * 8) + '\n';

  // Agregar filas con valores V/F
  combinations.forEach((combination, index) => {
    const row = [
      ...combination.map(v => v ? 'V' : 'F'),
      results[index] ? 'V' : 'F'
    ];
    content += row.join('\t') + '\n';
  });

  // Crear y descargar archivo
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tabla_de_verdad.txt';
  a.click();
  window.URL.revokeObjectURL(url);
};

/**
 * Exporta una tabla de verdad a un archivo PDF.
 * 
 * @param {string} expression - Expresión lógica original
 * @param {string[]} variables - Array de variables utilizadas
 * @param {boolean[][]} combinations - Matriz de combinaciones de valores
 * @param {boolean[]} results - Array de resultados
 */
export const exportToPdf = (expression, variables, combinations, results) => {
  const doc = new jsPDF();
  const formattedExpression = formatExpression(expression);

  // Configuración inicial del documento
  doc.setFont('helvetica');
  doc.setFontSize(16);
  doc.text('tabla de verdad', 14, 20);
  
  // Agregar proposición con manejo de texto largo
  doc.setFontSize(12);
  const propositionText = `proposición: ${formattedExpression}`;
  const splitText = doc.splitTextToSize(propositionText, 180);
  doc.text(splitText, 14, 30);

  // Preparar datos de la tabla
  const header = [...variables, 'resultado'];
  const data = combinations.map((combination, index) => [
    ...combination.map(v => v ? 'V' : 'F'),
    results[index] ? 'V' : 'F'
  ]);

  // Configurar y generar tabla
  doc.autoTable({
    startY: 40 + (splitText.length * 10),
    head: [header],
    body: data,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 5,
      textColor: [0, 0, 0],
      fontStyle: 'normal',
      halign: 'center'
    },
    headStyles: {
      fillColor: [200, 200, 200],
      textColor: [0, 0, 0],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 20 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: 20 },
      6: { cellWidth: 30 }
    }
  });

  doc.save('tabla_de_verdad.pdf');
};