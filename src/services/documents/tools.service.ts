import { apiDoc } from '../api-axios.config';

// Merge PDFs
export async function mergePDFService(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  const res = await apiDoc.post('v1/pdf/merge', formData, { responseType: 'blob' });
  return res.data;
}

// Split PDF
export async function splitPDFService(file: File, pages: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('pages', pages);
  const res = await apiDoc.post('v1/pdf/split', formData, { responseType: 'blob' });
  return res.data;
}

// Delete pages
export async function deletePagesService(file: File, pages: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('pages', pages);
  const res = await apiDoc.post('v1/pdf/delete-pages', formData, { responseType: 'blob' });
  return res.data;
}

// Reorder PDF
export async function reorderPDFService(file: File, order: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('order', order);
  const res = await apiDoc.post('v1/pdf/reorder', formData, { responseType: 'blob' });
  return res.data;
}

// Scan to PDF
export async function scanToPDFService(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  const res = await apiDoc.post('v1/pdf/scan', formData, { responseType: 'blob' });
  return res.data;
}

// Compress PDF
export async function compressPDFService(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await apiDoc.post('v1/pdf/compress', formData, { responseType: 'blob' });
  return res.data;
}

// Repair PDF
export async function repairPDFService(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await apiDoc.post('v1/pdf/repair', formData, { responseType: 'blob' });
  return res.data;
}

// OCR PDF
export async function ocrPDFService(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await apiDoc.post('v1/pdf/ocr', formData, { responseType: 'blob' });
  return res.data;
}
