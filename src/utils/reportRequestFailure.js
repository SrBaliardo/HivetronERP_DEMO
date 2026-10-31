export function reportRequestFailure(operation, error) {
  if (error?.code === 'ERR_CANCELED') return;
  const status = error?.response?.status;
  console.warn(operation, {
    code: typeof error?.code === 'string' ? error.code : 'UNKNOWN',
    status: Number.isInteger(status) ? status : undefined,
  });
}
