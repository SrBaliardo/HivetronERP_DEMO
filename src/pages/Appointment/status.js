export function displayStatus(status, uppercase = false) {
  const labels = {
    NOT_STARTED: 'Não Iniciado',
    STARTED: 'Iniciado',
    FINISHED: 'Finalizado',
    CANCELED: 'Cancelado',
  };
  const label = labels[status];
  if (!label) return status || '';
  return uppercase ? label.toUpperCase() : label;
}
