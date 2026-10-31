export function buildParameters(value) {
  return { id: value, filter: value };
}
export function buildSearchOptions(data) {
  return data.map(({ code, description }) => ({ code, description }));
}
export function buildSequencePayload(data, itemId, sequence) {
  const {
    sequence: number,
    observation,
    isMain,
    operationId,
    estimatedTime,
    machineId,
  } = data;
  const payload = {
    sequence: number,
    observation,
    isMain,
    operationId,
    estimatedTime,
    machineId,
    itemId: sequence ? sequence.itemId : itemId,
    sequenceTools: data.sequenceTools.map((tool, index) => ({
      ...tool,
      toolOrder: index,
    })),
  };
  return sequence ? { ...payload, id: sequence.id } : payload;
}
export function buildSequenceForm(sequence) {
  return {
    sequence: sequence?.sequence || '',
    observation: sequence?.observation || '',
    isMain: sequence?.isMain || false,
    operationId: sequence?.operationId || '',
    estimatedTime: sequence?.estimatedTime || '',
    machineId: sequence?.machineId || '',
    sequenceTools: sequence
      ? (sequence.sequenceTools || []).map(
          ({ toolId, ap, toolFeed, cuttingSpeed, inputCode }) => ({
            toolId,
            ap,
            toolFeed,
            cuttingSpeed,
            inputCode,
          }),
        )
      : [buildEmptyTool()],
  };
}

export function buildExportNavigation(id, code) {
  return { toExportSequencesId: id, toExportSequencesCode: code, tabKey: '4' };
}

export function buildEmptyTool() {
  return { toolId: '', inputCode: '', ap: 0, toolFeed: 0, cuttingSpeed: 0 };
}

export function buildList(data) {
  if (data == null) return [];
  if (!Array.isArray(data)) throw new Error('Resposta de listagem inválida.');
  return data;
}

export function buildSequenceContent(data) {
  return data.content;
}

export function buildExportItemOptions(data) {
  return buildList(data).map((item) => ({
    value: item.id,
    code: item.code,
    label: item.code + ' - ' + item.description,
    raw: item,
  }));
}
export function buildExportPayload(sequenceIds, destinations) {
  return {
    sequencesIds: sequenceIds.map(String),
    destinyItemsIds: destinations.map((item) => String(item.id)),
  };
}

export function buildAlternativeParameters(id, number) {
  return { id, number };
}
