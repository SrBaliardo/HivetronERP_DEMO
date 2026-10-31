const pending = new Map();

// Compartilha somente transporte em andamento, sem cache persistente.
export function requestOnce(scope, key, request) {
  const requestKey = JSON.stringify([scope, key]);
  if (pending.has(requestKey)) return pending.get(requestKey);
  const promise = Promise.resolve().then(request);
  pending.set(requestKey, promise);
  const release = () => {
    if (pending.get(requestKey) === promise) pending.delete(requestKey);
  };
  promise.then(release, release);
  return promise;
}

export function invalidateRequests(scope) {
  for (const key of pending.keys()) {
    if (JSON.parse(key)[0] === scope) pending.delete(key);
  }
}
