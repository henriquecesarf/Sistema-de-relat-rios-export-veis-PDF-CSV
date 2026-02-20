import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportToPDF(
  elementId: string,
  filename = 'relatorio',
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Elemento #${elementId} não encontrado.`);
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let yOffset = 0;
  let remainingHeight = imgHeight;

  while (remainingHeight > 0) {
    if (yOffset > 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, -yOffset, imgWidth, imgHeight);
    yOffset += pageHeight;
    remainingHeight -= pageHeight;
  }

  pdf.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
}
