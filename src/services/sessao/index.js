const USER_DATA_KEY = 'hivetron-demo:userData';
const USERNAME_KEY = 'hivetron-demo:rememberedUsername';
const invalidationListeners = new Set();

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
    return true;
  } catch {
    console.warn('Não foi possível atualizar o armazenamento da sessão.');
    return false;
  }
}

export function readSession() {
  const savedSession = readStorage(USER_DATA_KEY);
  if (!savedSession) return {};
  try {
    const session = JSON.parse(savedSession);
    return session && typeof session === 'object' ? session : {};
  } catch {
    writeStorage(USER_DATA_KEY, null);
    return {};
  }
}

export function saveSession(session) {
  if (!writeStorage(USER_DATA_KEY, JSON.stringify(session))) {
    throw new Error('Não foi possível salvar a sessão.');
  }
}

export function removeSession() {
  writeStorage(USER_DATA_KEY, null);
}

// Notifica o React sem acoplar o transporte HTTP à navegação.
export function subscribeSessionInvalidation(listener) {
  invalidationListeners.add(listener);
  return () => invalidationListeners.delete(listener);
}

export function invalidateSession(token) {
  if (!token || readSession().token !== token) return false;
  removeSession();
  invalidationListeners.forEach((listener) => listener(token));
  return true;
}

export function isSessionStorageEvent(event) {
  return event.key === USER_DATA_KEY || event.key === null;
}

export function readRememberedUsername() {
  return readStorage(USERNAME_KEY) || '';
}

export function saveRememberedUsername(username, remember) {
  writeStorage(USERNAME_KEY, remember ? username : null);
}
