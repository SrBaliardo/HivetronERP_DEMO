import { jwtDecode } from 'jwt-decode';

export function decodeToken(token) {
  try {
    return token ? jwtDecode(token) : null;
  } catch {
    return null;
  }
}

export function isTokenExpired(token, now = Date.now()) {
  const decoded = decodeToken(token);
  return (
    !decoded || (typeof decoded.exp === 'number' && now > decoded.exp * 1000)
  );
}
