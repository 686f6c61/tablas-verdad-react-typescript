import jsPDF from 'jspdf';
import 'jspdf-autotable';

const formatMatrix = (matrix, variableStyle, numVariables) => {
  const getVarName = (index) => {
    if (variableStyle === 'letters') {
      return ['x', 'y', 'z', 'w'][index];
    }
    return `x${index + 1}`;
  };

  return matrix.map(row => 
    row.map((value, j) => 
      j < numVariables ? 
        `${value.toFixed(2)}${getVarName(j)}` : 
        value.toFixed(2)
    ).join(' + ')
  ).join('\n');
};

export const exportToPdf = (steps, variableStyle, numVariables) => {
  const doc = new jsPDF();
  let yPos = 20;

  doc.setFont('helvetica');
  doc.setFontSize(16);
  doc.text('Resolución por Eliminación Gaussiana', 14, yPos);
  
  yPos += 20;
  doc.setFontSize(12);

  steps.forEach((step, index) => {
    // Verificar si necesitamos una nueva página
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.text(`Paso ${index + 1}: ${step.description}`, 14, yPos);
    yPos += 10;

    doc.setFont('courier');
    const matrixText = formatMatrix(step.matrix, variableStyle, numVariables);
    doc.text(matrixText, 20, yPos);
    yPos += 10 * step.matrix.length + 5;

    if (step.explanation) {
      doc.setFont('helvetica', 'normal');
      const splitExplanation = doc.splitTextToSize(step.explanation, 180);
      doc.text(splitExplanation, 14, yPos);
      yPos += 10 * splitExplanation.length + 10;
    }
  });

  doc.save('resolucion_gaussiana.pdf');
};

export const exportToTxt = (steps, variableStyle, numVariables) => {
  let content = 'RESOLUCIÓN POR ELIMINACIÓN GAUSSIANA\n\n';

  steps.forEach((step, index) => {
    content += `Paso ${index + 1}: ${step.description}\n\n`;
    content += formatMatrix(step.matrix, variableStyle, numVariables);
    content += '\n\n';
    if (step.explanation) {
      content += step.explanation + '\n\n';
    }
    content += '-'.repeat(50) + '\n\n';
  });

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resolucion_gaussiana.txt';
  a.click();
  window.URL.revokeObjectURL(url);
};