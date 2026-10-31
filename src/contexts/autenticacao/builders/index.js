import { decodeToken } from '../../../utils/token';

export function buildLoginPayload({ username, password }) {
  return { username, password };
}

export function getSessionUserId(session) {
  return decodeToken(session?.token)?.id;
}

export function buildUserProfile(user) {
  return { name: user.name, email: user.email, role: user.role };
}
