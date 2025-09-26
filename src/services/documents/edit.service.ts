import { apiDoc } from '../api-axios.config';

// Rotate PDF
export async function rotatePDFService(file: File, angle: number) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('angle', angle.toString());
  const res = await apiDoc.post('v1/edit/rotate', formData, { responseType: 'blob' });
  return res.data;
}

// Add page numbers
export async function addPageNumbersService(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await apiDoc.post('v1/edit/add-pages', formData, { responseType: 'blob' });
  return res.data;
}

// Add watermark
export async function addWatermarkService(file: File, text: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('text', text);
  const res = await apiDoc.post('v1/edit/watermark', formData, { responseType: 'blob' });
  return res.data;
}

// Crop PDF
export async function cropPDFService(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await apiDoc.post('v1/edit/crop', formData, { responseType: 'blob' });
  return res.data;
}

// Edit PDF (insert text)
export async function editPDFService(file: File, text: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('text', text);
  const res = await apiDoc.post('v1/edit/edit', formData, { responseType: 'blob' });
  return res.data;
}
