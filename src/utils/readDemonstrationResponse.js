// Generic immutable response lookup; no domain rules or network access.
export async function readDemonstrationResponse(response, args = []) {
  const signal = args.find(
    (arg) => arg && typeof arg === 'object' && 'aborted' in arg,
  );
  if (signal?.aborted) {
    const error = new Error('Solicitação cancelada.');
    error.code = 'ERR_CANCELED';
    throw error;
  }
  if (!response) throw new Error('Resposta demonstrativa não configurada.');
  const parameter = args[0];
  const key =
    parameter && typeof parameter === 'object'
      ? (parameter.code ?? parameter.id)
      : parameter;
  const result =
    response.byKey && Object.hasOwn(response.byKey, key)
      ? response.byKey[key]
      : response.value;
  return structuredClone(result);
}
