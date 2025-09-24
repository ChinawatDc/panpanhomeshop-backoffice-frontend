export async function getPublicIp(): Promise<string | null> {
  try {
    const res = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.ip ?? null;
  } catch (e) {
    return null;
  }
}
