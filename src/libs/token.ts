const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';

export const getPairTokens = () => {
  const accessToken = getCookie(accessTokenKey);
  const refreshToken = getCookie(refreshTokenKey);

  return { accessToken, refreshToken };
};

export const setPairTokens = (accessToken: string, refreshToken: string) => {
  setCookie(accessTokenKey, accessToken, 1);
  setCookie(refreshTokenKey, refreshToken, 1);
};

export const removePairTokens = () => {
  document.cookie = `${accessTokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  document.cookie = `${refreshTokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

export const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export const getCookie = (name: string): string => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : '';
};
