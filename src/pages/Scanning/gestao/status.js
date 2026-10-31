export function displayStatus(status) {
  return (
    {
      NOT_STARTED: 'NÃO INICIADO',
      STARTED: 'INICIADO',
      FINISHED: 'FINALIZADO',
      CANCELED: 'CANCELADO',
    }[status] || status
  );
}
