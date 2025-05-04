import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

const formatExpression = (expression) => {
  // Asegurarse de que los operadores lógicos se muestren correctamente
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

const createHeader = (text) => {
  const date = new Date().toLocaleDateString('es-ES');
  return `tabla de verdad - ${date}\n\nproposición: ${text}\n\n`;
};

export const exportToTxt = (expression, variables, combinations, results) => {
  const formattedExpression = formatExpression(expression);
  let content = createHeader(formattedExpression);
  
  // Crear encabezado de la tabla
  const header = [...variables, 'resultado'];
  content += header.join('\t') + '\n';
  content += '-'.repeat(header.length * 8) + '\n';

  // Agregar filas
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

export const exportToPdf = (expression, variables, combinations, results) => {
  const doc = new jsPDF();
  const formattedExpression = formatExpression(expression);

  // Configurar fuente para soportar caracteres especiales
  doc.setFont('helvetica');
  
  // Título
  doc.setFontSize(16);
  doc.text('tabla de verdad', 14, 20);
  
  // Proposición
  doc.setFontSize(12);
  const propositionText = `proposición: ${formattedExpression}`;
  
  // Dividir el texto largo en múltiples líneas si es necesario
  const splitText = doc.splitTextToSize(propositionText, 180);
  doc.text(splitText, 14, 30);

  // Crear tabla
  const header = [...variables, 'resultado'];
  const data = combinations.map((combination, index) => [
    ...combination.map(v => v ? 'V' : 'F'),
    results[index] ? 'V' : 'F'
  ]);

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

export const exportToCSV = (expression, variables, combinations, results) => {
  const formattedExpression = formatExpression(expression);
  let content = `"Proposición:","${formattedExpression}"
"Fecha:","${new Date().toLocaleDateString('es-ES')}"

`;
  
  // Crear encabezado de la tabla
  const header = [...variables, 'resultado'];
  content += header.join(',') + '\n';

  // Agregar filas
  combinations.forEach((combination, index) => {
    const row = [
      ...combination.map(v => v ? 'V' : 'F'),
      results[index] ? 'V' : 'F'
    ];
    content += row.join(',') + '\n';
  });

  // Crear y descargar archivo
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tabla_de_verdad.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};

export const exportToPNG = async (tableRef) => {
  if (!tableRef || !tableRef.current) {
    console.error('No se pudo encontrar la referencia a la tabla');
    return;
  }

  try {
    // Configuración de html2canvas
    const options = {
      backgroundColor: '#ffffff',
      scale: 2, // Mejor calidad
      useCORS: true,
      logging: false
    };

    // Crear canvas desde la tabla
    const canvas = await html2canvas(tableRef.current, options);
    
    // Convertir canvas a imagen
    const imgData = canvas.toDataURL('image/png');
    
    // Crear y descargar la imagen
    const a = document.createElement('a');
    a.href = imgData;
    a.download = 'tabla_de_verdad.png';
    a.click();
  } catch (error) {
    console.error('Error al exportar a PNG:', error);
  }
};