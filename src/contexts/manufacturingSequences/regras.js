import { hasPermission } from '../../utils/hasPermission';
export function nextSequence(value) {
  return (parseInt(value, 10) || 0) + 10;
}
export function validateSequence(data) {
  if (data.estimatedTime === 0 || !data.estimatedTime)
    return {
      field: 'estimatedTime',
      message: 'O Tempo Estimado não pode ser zero',
    };
  return Object.values(data).some((value) => value === undefined)
    ? { message: 'Erro ao salvar, verifique os campos do formulário.' }
    : null;
}

export function getPermissions(role) {
  return {
    create: hasPermission(role, 'bom', 'C', 11),
    update: hasPermission(role, 'bom', 'U'),
    remove: hasPermission(role, 'bom', 'D'),
  };
}

export function canSelectAsMain(sequence, isNew) {
  return isNew || !sequence?.isMain;
}

export function exportSelectionError(sequenceIds, destinations) {
  return sequenceIds.length === 0 || destinations.length === 0
    ? 'Selecione ao menos uma sequência e um item de destino.'
    : null;
}
export function destinationSelectionError(destinations, selection) {
  return destinations.some((item) => item.id === selection.value)
    ? 'Item já está na lista de destino.'
    : null;
}
