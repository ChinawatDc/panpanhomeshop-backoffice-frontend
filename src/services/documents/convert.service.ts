import { apiDoc } from '../api-axios.config';

// To PDF
export async function convertJpgToPdf(
  files: File[],
  options?: {
    orientation?: 'portrait' | 'landscape';
    paperSize?: string;
    margin?: 'none' | 'small' | 'large';
    merge?: boolean;
  },
): Promise<Blob> {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));

  if (options) {
    if (options.orientation) formData.append('orientation', options.orientation);
    if (options.paperSize) formData.append('paper_size', options.paperSize);
    if (options.margin) formData.append('margin', options.margin);
    if (typeof options.merge !== 'undefined') {
      formData.append('merge', options.merge ? 'true' : 'false');
    }
  }

  const res = await apiDoc.post('v1/convert/jpg-to-pdf', formData, {
    responseType: 'blob',
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data as Blob;
}

export async function convertWordToPdf(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  const res = await apiDoc.post('v1/convert/word-to-pdf', formData, { responseType: 'blob' });
  return res.data;
}

export async function convertPptToPdf(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  const res = await apiDoc.post('v1/convert/ppt-to-pdf', formData, { responseType: 'blob' });
  return res.data;
}

export async function convertExcelToPdf(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  const res = await apiDoc.post('v1/convert/excel-to-pdf', formData, { responseType: 'blob' });
  return res.data;
}

export async function convertHtmlToPdf(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  const res = await apiDoc.post('v1/convert/html-to-pdf', formData, { responseType: 'blob' });
  return res.data;
}

// From PDF
export async function convertPdfToJpg(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  const res = await apiDoc.post('v1/convert/pdf-to-jpg', formData, { responseType: 'blob' });
  return res.data;
}

export async function convertPdfToWord(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  const res = await apiDoc.post('v1/convert/pdf-to-word', formData, { responseType: 'blob' });
  return res.data;
}

export async function convertPdfToPpt(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  const res = await apiDoc.post('v1/convert/pdf-to-ppt', formData, { responseType: 'blob' });
  return res.data;
}

export async function convertPdfToExcel(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  const res = await apiDoc.post('v1/convert/pdf-to-excel', formData, { responseType: 'blob' });
  return res.data;
}

export async function convertPdfToPdfA(files: File[]) {
  const formData = new FormData();
  files.forEach((f) => formData.append('files', f));
  const res = await apiDoc.post('v1/convert/pdf-to-pdfa', formData, { responseType: 'blob' });
  return res.data;
}
