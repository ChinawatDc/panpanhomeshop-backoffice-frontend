import { apiDoc } from '../api-axios.config';

// Unlock PDF
export async function unlockPDFService(file: File, password: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('password', password);
  const res = await apiDoc.post('v1/secure/unlock', formData, { responseType: 'blob' });
  return res.data;
}

// Protect PDF
export async function protectPDFService(file: File, password: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('password', password);
  const res = await apiDoc.post('v1/secure/protect', formData, { responseType: 'blob' });
  return res.data;
}

// Sign PDF
export async function signPDFService(file: File, signer: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('signer', signer);
  const res = await apiDoc.post('v1/secure/sign', formData, { responseType: 'blob' });
  return res.data;
}

// Redact PDF
export async function redactPDFService(file: File, text: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('text', text);
  const res = await apiDoc.post('v1/secure/redact', formData, { responseType: 'blob' });
  return res.data;
}

// Compare PDFs
export async function comparePDFsService(file1: File, file2: File) {
  const formData = new FormData();
  formData.append('file1', file1);
  formData.append('file2', file2);
  const res = await apiDoc.post('v1/secure/compare', formData);
  return res.data;
}
