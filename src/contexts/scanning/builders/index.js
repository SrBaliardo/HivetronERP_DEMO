import { format, parse, isValid, parseISO, startOfDay } from 'date-fns';

import * as R from '../regras';
export function buildList(data) {
  if (data == null) return [];
  if (!Array.isArray(data))
    throw new Error('Lista inválida recebida do servidor.');
  return data;
}
export function buildParameter(value) {
  if (value == null || value === '')
    throw new Error('Identificador não informado.');
  return value;
}
export function buildPayload(value) {
  if (value == null) return value;
  return Array.isArray(value)
    ? value.map((item) => ({ ...item }))
    : { ...value };
}
export function buildStoredOrders(value) {
  return Array.isArray(value) ? value : [];
}
export function serializeOrders(values) {
  return JSON.stringify(values);
}
export function displayDate(value, now = new Date()) {
  const date = value ? new Date(value) : now;
  return format(isValid(date) ? date : now, 'dd/MM/yyyy');
}
export function parseInspectionDate(value, now = new Date()) {
  return (value ? parse(value, 'dd/MM/yyyy', now) : now).toISOString();
}
export function buildInspectionForm(inspection = {}, step, now = new Date()) {
  if (step === 1)
    return {
      invoice: inspection.invoice || '',
      client: inspection.client || '',
      invoiceItemCode:
        inspection.invoiceItemCode || inspection.invoiceItem || '',
    };
  if (step === 2)
    return {
      invoice: inspection.invoice || '',
      client: inspection.client || '',
      invoiceItemCode: inspection.invoiceItem || '',
      itemCode: inspection.itemCode || '',
      itemDescription: inspection.itemDescription || '',
      itemDrawingNumber: inspection.itemDrawingNumber || '',
      gaugeDescription: inspection.gaugeDescription || '',
      model: inspection.itemModel || inspection.model || '',
      manufacturer: inspection.manufacturer || '',
      folder: inspection.folder || '',
      series: inspection.series || '',
      inspector: inspection.inspector || inspection.Inspector || '',
      inspectionDate: displayDate(inspection.inspectionDate, now),
    };
  if (step === 3)
    return {
      budgetStatus: inspection.budgetStatus || '',
      budgetOrder: inspection.budgetOrder || '',
      releaseResponsible: inspection.releaseResponsible || '',
      releaseDate: displayDate(inspection.releaseDate, now),
      releaseObservation: inspection.releaseObservation || '',
    };
  if (step === 4)
    return {
      shippedBy: inspection.shippedBy || '',
      shipmentObservation: inspection.shipmentObservation || '',
      shipmentDate: displayDate(inspection.shipmentDate, now),
    };
  return {};
}
export function buildInspectionItems(items = [], step = 3) {
  if (step === 2) return items.map((item) => ({ ...item }));
  return items.map((item) => ({
    ...item,
    checked: item.isReleased || false,
    disabled: item.isReleased || false,
    isShipped: item.isShipped || false,
  }));
}
export function buildInspectionUpdate(
  data,
  inspection,
  step,
  approval,
  now = new Date(),
) {
  const fields = { ...data };
  delete fields.items;
  delete fields.approval;
  delete fields.shipping;
  const payload = {
    ...fields,
    id: inspection.id,
    inspectionStage: R.nextStage(step, approval),
  };
  if (step === 2)
    payload.inspectionDate = parseInspectionDate(data.inspectionDate, now);
  if (step === 3) {
    payload.budgetStatus = approval || undefined;
    payload.releaseDate = parseInspectionDate(data.releaseDate, now);
  }
  if (step === 4)
    payload.shipmentDate = parseInspectionDate(data.shipmentDate, now);
  return payload;
}
export function buildRegisteredInspection(saved, now) {
  return {
    ...saved,
    inspectionStage: 'INSPECTION',
    gaugeDescription: '',
    model: 'STAR',
    manufacturer: 'STAR',
    folder: '',
    series: '',
    Inspector: '',
    inspectionDate: now.toISOString(),
  };
}
export function buildItemsUpdate(items, inspectionId, step, shipping = {}) {
  return items.map((item) => {
    const value = { ...item, inspectionId };
    if (step === 3) value.isReleased = item.checked || false;
    if (step === 4) {
      value.shippedAmount =
        (parseInt(shipping[item.id], 10) || 0) + item.shippedAmount;
      value.isShipped = value.shippedAmount > 0;
    }
    return value;
  });
}
export function buildBackInspection(inspection, step, approval) {
  return {
    ...inspection,
    id: inspection.id,
    inspectionStage: R.previousStage(step, approval),
  };
}
export function buildHierarchy(parent, children) {
  const descend = (nodes, key) =>
    nodes.map((child, index) => {
      const position = key + '.' + (index + 1);
      return {
        title:
          position +
          ' ' +
          child.itemCode +
          ' - ' +
          child.amount +
          'un - ' +
          child.itemDescription,
        key: position,
        itemId: child.itemId,
        code: child.itemCode,
        description: child.itemDescription,
        drawingNumber: child.drawingNumber,
        children: descend(child.simpleComponents || [], position),
        selected: false,
      };
    });
  return [
    {
      title: '1. ' + parent.description,
      key: '1',
      itemId: parent.id,
      code: parent.code,
      description: parent.description,
      drawingNumber: parent.drawingNumber,
      children: descend(children, '1'),
      selected: false,
    },
  ];
}
export function buildSelectedItems(nodes) {
  const selected = [];
  const visit = (list) =>
    list.forEach((node) => {
      if (node.selected)
        selected.push({ position: node.key, itemId: node.itemId });
      visit(node.children || []);
    });
  visit(nodes);
  return selected;
}
export function buildOrderForm(order = {}) {
  return {
    observation: order.observation || '',
    sequences: (order.sequences || []).map((sequence) => ({ ...sequence })),
  };
}
export function sequenceOperationIdForSelection(data) {
  if (typeof data?.collectiveTime === 'boolean') return null;
  if (data?.operationId == null || data.operationId === '')
    throw new Error('A sequência não informa a modalidade nem a operação.');
  return data.operationId;
}
export function buildSequenceSelection(sequence, data, id, amount, operation) {
  const operationId = sequenceOperationIdForSelection(data);
  if (operationId != null && operation?.id !== operationId)
    throw new Error('Operação incompatível com a sequência selecionada.');
  const collectiveTime =
    operationId == null ? data.collectiveTime : operation.collectiveTime;
  const totalTime = R.operationTotalTime(
    data.estimatedTime,
    collectiveTime,
    amount,
  );
  return {
    ...sequence,
    selectedSequence: id,
    manufacturingSequenceId: id,
    isMain: data.isMain,
    estimatedTime: data.estimatedTime,
    totalTime,
    collectiveTime,
    operationDescription: data.operationDescription,
    operationType: data.operationTypeDescription,
    machineDescription: data.machineDescription,
    machineGroup: data.machineGroupDescription,
    toolDescription: data.toolDescription,
    inputCode: data.inputCode,
    cuttingSpeed: data.cuttingSpeed,
    toolFeed: data.toolFeed,
    ap: data.ap,
  };
}
export function buildOrderSequencePayload(sequences, canceled = false) {
  return sequences.map((sequence) => ({
    id: sequence.id,
    manufacturingSequenceId: canceled
      ? sequence.manufacturingSequenceId
      : sequence.selectedSequence || sequence.manufacturingSequenceId,
    status: canceled ? 'CANCELED' : sequence.status,
    plannedStartDate: sequence.plannedStartDate ?? null,
    startDate: sequence.startDate ?? null,
    plannedDeadline: sequence.plannedDeadline,
    completionDeadline: sequence.completionDeadline,
    observation: sequence.observation,
  }));
}
export function buildOrderUpdate(order, observation, canceled) {
  return canceled
    ? { id: order.id, status: 'CANCELED' }
    : { id: order.id, observation };
}
export function buildOrderFieldValue(field, value) {
  return [
    'plannedStartDate',
    'startDate',
    'plannedDeadline',
    'completionDeadline',
  ].includes(field)
    ? buildDeadline(value)
    : value;
}
export function buildDeadline(value) {
  if (!value) return null;
  const date = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(date) ? startOfDay(date).toISOString() : null;
}
export function displayDeadline(value) {
  if (!value) return '';
  const date = parseISO(value);
  return isValid(date) ? format(date, 'yyyy-MM-dd') : '';
}
export function displayExitDate(value) {
  if (!value) return '';
  const date = new Date(value);
  const local = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return isValid(local) ? format(local, 'dd/MM/yyyy') : '';
}

export function buildRectifiedItems(items, updated) {
  return items.map((item) =>
    item.id === updated.id
      ? { ...item, shippedAmount: updated.shippedAmount }
      : item,
  );
}

export function buildOrderNavigation(order, code, orders) {
  return { order, orderCode: code, tabKey: '15', orderList: orders };
}
export function buildStoredOrderUpdate(orders, updated, canceled) {
  return orders.map((item) =>
    item.id === updated.id
      ? canceled
        ? updated
        : { ...item, status: updated.status }
      : item,
  );
}
export function buildCanceledOrder(order) {
  return { ...order, status: 'CANCELED' };
}

export function buildInitialInspection(record) {
  return {
    invoice: record.invoice,
    client: record.customer,
    invoiceItemCode: record.itemCode,
  };
}

export function buildCutOrderForm(order = {}) {
  return {
    status: order.status || '',
    blocks: (order.blocks || []).map((block) => ({
      ...block,
      inputDeadline: displayDeadline(block.inputDeadline),
      cutItems: (block.cutItems || []).map((item) => ({ ...item })),
    })),
  };
}
export function buildCutOrderUpdates(order, values) {
  return {
    order: { id: order.id, status: values.status },
    items: values.blocks.flatMap((block) =>
      block.cutItems.map((item) => ({
        id: item.id,
        isStock: item.isStock,
        observation: item.observation,
      })),
    ),
    blocks: values.blocks.map((block) => {
      const original = (order.blocks || []).find(
        (item) => item.id === block.id,
      );
      return {
        id: block.id,
        certificate: block.certificate,
        inputDeadline:
          block.inputDeadline === displayDeadline(original?.inputDeadline)
            ? (original?.inputDeadline ?? null)
            : buildDeadline(block.inputDeadline),
      };
    }),
  };
}
export function buildPcpNavigation(kind, order, orders) {
  return kind === 'service'
    ? { order, orderList: orders, tabKey: '5', fronTab: 'PcpTab1' }
    : { order, tabKey: '6', fronTab: 'PcpTab2' };
}

const scanOrderFields = [
  'id',
  'itemCode',
  'customer',
  'customerCode',
  'discount',
  'ipi',
  'ncL',
  'quantity',
  'price',
  'totalBonus',
  'exitDate',
  'lo1Seq',
  'type',
  'generated',
  'generatedDescription',
  'description',
  'tax',
  'hasOrder',
];
export function buildOrderBatchPayload(records) {
  return records.map((record) =>
    Object.fromEntries(
      scanOrderFields
        .filter((field) => Object.hasOwn(record, field))
        .map((field) => [field, record[field]]),
    ),
  );
}

export function buildGeneratedServiceOrders(records, generated) {
  const ids = new Set(generated.map((record) => record.id));
  return records.map((record) =>
    ids.has(record.id) ? { ...record, hasOrder: true } : record,
  );
}

const pageFields = {
  invoices: [
    'invoice',
    'itemCode',
    'itemDescription',
    'unit',
    'cnpj',
    'customer',
    'issueDate',
    'issueDateFrom',
    'issueDateTo',
    'itemAmount',
    'itemAmountMin',
    'itemAmountMax',
    'hasInspection',
  ],
  inspections: [
    'inspectionStage',
    'invoice',
    'client',
    'invoiceItem',
    'createdAt',
    'updatedAt',
    'createdAtFrom',
    'createdAtTo',
    'updatedAtFrom',
    'updatedAtTo',
  ],
  serviceOrders: [
    'id',
    'customer',
    'customerCode',
    'itemCode',
    'description',
    'exitDate',
    'exitDateFrom',
    'exitDateTo',
    'quantity',
    'quantityMin',
    'quantityMax',
    'hasOrder',
  ],
};
export function buildScanningPageQuery(kind, request) {
  const fields = pageFields[kind];
  if (!fields) throw new Error('Lista de digitalização desconhecida.');
  const page = request.page ?? 0,
    size = request.size ?? 8;
  if (
    !Number.isInteger(page) ||
    page < 0 ||
    !Number.isInteger(size) ||
    size < 1 ||
    size > 100
  )
    throw new Error('Paginação inválida.');
  const params = { page, size };
  const filters = request.filters || {};
  const sort = request.sort || {};
  if (sort.field && sort.order) {
    if (
      !fields.includes(sort.field) ||
      /(From|To|Min|Max)$/.test(sort.field) ||
      !['ascend', 'descend'].includes(sort.order)
    )
      throw new Error('Ordenação inválida.');
    params.sort = sort.field + ',' + (sort.order === 'ascend' ? 'asc' : 'desc');
  }
  if (filters.searchInput) {
    const stage =
      kind === 'inspections'
        ? R.inspectionStageForSearch(filters.searchInput)
        : null;
    if (stage) params.inspectionStage = stage;
    else params.search = filters.searchInput;
  }
  if (kind === 'invoices') {
    if (filters.startDate) params.issueDateFrom = filters.startDate;
    if (filters.endDate || filters.startDate)
      params.issueDateTo = filters.endDate || filters.startDate;
  } else if (kind === 'inspections') {
    if (filters.startDate) {
      params.createdAtFrom = filters.startDate;
      if (!filters.endDate) params.createdAtTo = filters.startDate;
    }
    if (filters.endDate) {
      params.updatedAtTo = filters.endDate;
      if (!filters.startDate) params.updatedAtFrom = filters.endDate;
    }
  } else if (filters.dateExit) {
    params.exitDateFrom = filters.dateExit;
    params.exitDateTo = filters.dateExit;
  }
  for (const field of fields) {
    if (
      Object.hasOwn(filters, field) &&
      filters[field] !== '' &&
      filters[field] != null
    )
      params[field] = filters[field];
  }
  return params;
}
export function buildScanningPage(data, kind) {
  const page = data?.page ?? data;
  if (
    !data ||
    !Array.isArray(data.content) ||
    !['number', 'size', 'totalElements', 'totalPages'].every(
      (key) => Number.isInteger(page[key]) && page[key] >= 0,
    ) ||
    page.size < 1 ||
    page.size > 100 ||
    data.content.length > page.size
  )
    throw new Error('Página inválida recebida do servidor.');
  const items = data.content.map((record) => ({
    ...record,
    key:
      record.id ??
      (kind === 'invoices'
        ? JSON.stringify([record.invoice, record.cnpj || '', record.itemCode])
        : record.key),
  }));
  // Notas podem repetir NF/CNPJ/item sem fornecer um ID exclusivo por linha.
  // A ocorrência distingue as linhas sem descartá-las nem gerar chaves aleatórias.
  if (kind === 'invoices') {
    const occurrences = new Map();
    for (const item of items) {
      if (item.id != null) continue;
      const occurrence = occurrences.get(item.key) || 0;
      occurrences.set(item.key, occurrence + 1);
      item.key = JSON.stringify([item.key, occurrence]);
    }
  }
  if (items.some((item) => item.key == null))
    throw new Error('Registro sem identificador recebido do servidor.');
  return {
    items,
    number: page.number,
    size: page.size,
    totalElements: page.totalElements,
    totalPages: page.totalPages,
  };
}
export function buildInvoiceInspectionQuery(record, page) {
  return {
    page,
    size: 100,
    sort: { field: 'createdAt', order: 'descend' },
    filters: { invoice: record.invoice, invoiceItem: record.itemCode },
  };
}

export function hasCompleteScanOrder(record) {
  return scanOrderFields.every(
    (field) => Object.hasOwn(record, field) && record[field] !== undefined,
  );
}
export function buildScanOrderDetails(record, details) {
  if (!details || details.id !== record.id || !hasCompleteScanOrder(details))
    throw new Error('Dados incompletos para gerar a ordem de serviço.');
  return { ...details, key: record.key ?? record.id };
}
