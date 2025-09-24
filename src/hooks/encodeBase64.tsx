export const encodeBase64 = (input: any) => {
  // เข้ารหัส 2 ครั้ง
  const firstEncode = btoa(input);
  return btoa(firstEncode); // การเข้ารหัสซ้ำ
};
export const decodeBase64 = (input: any) => {
  // ถอดรหัส 2 ครั้ง
  const firstDecode = atob(input);
  return atob(firstDecode); // การถอดรหัสซ้ำ
};
