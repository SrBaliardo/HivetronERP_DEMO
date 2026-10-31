import { hasPermission } from '../../utils/hasPermission';

const orderNumberCollator = new Intl.Collator('pt-BR', {
  numeric: true,
  sensitivity: 'base',
});

export function compareServiceOrderRows(a, b, order) {
  // Os grupos de OS permanecem crescentes; a direção altera suas branches.
  const codeComparison = orderNumberCollator.compare(
    String(a.code ?? ''),
    String(b.code ?? ''),
  );
  if (codeComparison) return codeComparison;
  const branchComparison = orderNumberCollator.compare(
    String(a.branch ?? ''),
    String(b.branch ?? ''),
  );
  return order === 'descend' ? -branchComparison : branchComparison;
}

export function permissions(role, step) {
  return {
    create: hasPermission(role, 'scanningInspectionStep1', 'C'),
    edit: hasPermission(role, 'scanningInspectionStep' + step, 'U', step + 9),
    delete: hasPermission(
      role,
      'scanningInspectionStep' + (step === 5 ? 4 : step),
      'D',
    ),
    generate: hasPermission(role, 'scanning', 'C', 3),
    orders: hasPermission(role, 'scanningOrders', 'U', 15),
    orderEdit: hasPermission(role, 'scanningOrders', 'U', 16),
    orderDelete: hasPermission(role, 'scanningOrders', 'D'),
    cut: hasPermission(role, 'scanningOrders', 'C'),
  };
}
export function nextStage(step, approval) {
  return step === 1
    ? 'INSPECTION'
    : step === 2
      ? 'RELEASE'
      : step === 3
        ? approval === 'FAILED'
          ? 'COMPLETED'
          : 'EXPEDITION'
        : 'COMPLETED';
}
export function previousStage(step, approval) {
  return step === 3
    ? 'INSPECTION'
    : step === 4
      ? 'RELEASE'
      : approval === 'FAILED'
        ? 'RELEASE'
        : 'EXPEDITION';
}
export function remaining(item) {
  return item.releasedAmount - item.shippedAmount;
}
export function limitShipment(value, max) {
  let n = parseInt(value, 10);
  if (isNaN(n)) n = 0;
  return n > max ? max : n;
}
export function itemErrors(items) {
  const errors = {};
  items.forEach((item, index) => {
    if (!item.received || parseFloat(item.received) <= 0)
      errors[index] = { received: 'Recebido não pode ser zero' };
    if (
      !item.releasedAmount ||
      parseFloat(item.releasedAmount) > parseFloat(item.received)
    )
      errors[index] = {
        ...errors[index],
        releasedAmount: 'Liberado não pode ser maior do que Recebido',
      };
  });
  return errors;
}
export function validateOrderSequences(values) {
  if (!values || !Array.isArray(values) || !values.length)
    throw new Error(
      'Dados inválidos ou vazios para a sequência da ordem de serviço.',
    );
  values.forEach((value) => {
    if (!value.id || !value.manufacturingSequenceId || !value.status)
      throw new Error(
        'Faltando campos obrigatórios na sequência da ordem de serviço.',
      );
  });
}

function day(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
}
export function filterRecords(items, kind, criteria) {
  let term = criteria.searchInput.toLowerCase();
  if (kind === 'inspections' && term) {
    term = inspectionStageForSearch(term)?.toLowerCase() || term;
  }
  const keys =
    kind === 'invoices'
      ? ['invoice', 'itemCode', 'customer', 'itemDescription']
      : kind === 'inspections'
        ? ['invoice', 'invoiceItem', 'client', 'inspectionStage']
        : kind === 'serviceOrders'
          ? ['id', 'customer', 'itemCode', 'description']
          : ['code', 'client', 'item'];
  return items.filter((item) => {
    if (
      term &&
      !keys.some(
        (key) => item[key] && String(item[key]).toLowerCase().includes(term),
      )
    )
      return false;
    if (criteria.status && item.status !== criteria.status) return false;
    const start = criteria.startDate || null,
      end = criteria.endDate || null;
    if (kind === 'invoices' && (start || end)) {
      const date = day(item.issueDate);
      return start && end
        ? date >= start && date <= end
        : start
          ? date === start
          : date <= end;
    }
    if (kind === 'inspections' && (start || end)) {
      const created = day(item.createdAt),
        updated = day(item.updatedAt);
      return start && end
        ? created >= start && updated <= end
        : start
          ? created === start
          : updated === end;
    }
    if (criteria.dateExit)
      return (
        day(kind === 'serviceOrders' ? item.exitDate : item.deadline) ===
        criteria.dateExit
      );
    return true;
  });
}

export function inactiveSelections(items, records) {
  return items
    .map((item) => records.get(item.itemId))
    .filter((record) => record.value && !record.value.isActive);
}
export function updatesItemsForStage(step, approval) {
  return step !== 3 || approval !== 'FAILED';
}

export function validInvoiceDateRange(kind, criteria) {
  return !(
    kind === 'invoices' &&
    criteria.startDate &&
    criteria.endDate &&
    new Date(criteria.startDate) > new Date(criteria.endDate)
  );
}

export function pcpPermissions(role) {
  return {
    serviceRead: hasPermission(role, 'pcpServiceOrders', 'R'),
    serviceEdit: hasPermission(role, 'pcpServiceOrders', 'U', 5),
    serviceCancel: hasPermission(role, 'pcp', 'D'),
    cutRead: hasPermission(role, 'pcpCutOrders', 'R'),
    cutEdit: hasPermission(role, 'pcpCutOrders', 'U', 6),
  };
}
export function validPcpDateRange(criteria) {
  return !(
    criteria.startDate &&
    criteria.endDate &&
    new Date(criteria.startDate) > new Date(criteria.endDate)
  );
}
export function filterPcpRecords(records, kind, criteria) {
  const report = kind === 'report';
  const keys = report
    ? [
        'serviceOrderCode',
        'client',
        'itemCode',
        'operation',
        'operationType',
        'machine',
        'machineGroup',
      ]
    : kind === 'cut'
      ? ['cutOrderCode', 'client', 'itemCode']
      : ['code', 'client', 'item'];
  const specific = [
    ['code', 'serviceOrderCode', 'Número da O.S.'],
    ['client', 'client', 'Cliente'],
    ['operation', 'operation', 'Processo'],
    ['type', 'operationType', 'Tipo de Processo'],
    ['machine', 'machine', 'Máquina'],
    ['group', 'machineGroup', 'Grupo de Máquina'],
    ['item', 'itemCode', 'Item/Conjunto'],
  ];
  const term = String(criteria.search || '').toLowerCase();
  let searchKey = '';
  const matches = (value, search) =>
    value != null &&
    String(value).toLowerCase().includes(String(search).toLowerCase());
  const items = records.filter((record) => {
    if (
      (term || report) &&
      !keys.some((key) => {
        const match = Boolean(record[key]) && matches(record[key], term);
        if (match) searchKey = key;
        return match;
      })
    )
      return false;
    if (
      report &&
      specific.some(
        ([field, key]) =>
          criteria[field] && !matches(record[key], criteria[field]),
      )
    )
      return false;
    if (
      criteria.status &&
      record[report ? 'sequenceStatus' : 'status'] !== criteria.status
    )
      return false;
    const start = criteria.startDate || null,
      end = criteria.endDate || null;
    if (!start && !end) return true;
    const dates = report
      ? [
          record.plannedDeadline ? day(record.plannedDeadline) : null,
          record.completionDeadline ? day(record.completionDeadline) : null,
        ]
      : [day(kind === 'cut' ? record.createdAt : record.deadline)];
    return dates.some((date) =>
      start && end
        ? date >= start && date <= end
        : start
          ? date === start
          : date <= end,
    );
  });
  const labels = [];
  if (term)
    labels.push(
      kind === 'cut'
        ? (searchKey || 'Indefinida') + ')'
        : 'Chave de Busca: ' + criteria.search,
    );
  if (report)
    specific.forEach(([field, , label]) => {
      if (criteria[field]) labels.push(label);
    });
  if (criteria.status)
    labels.push(
      'Status: ' +
        ({
          NOT_STARTED: 'NÃO INICIADO',
          STARTED: 'INICIADO',
          FINISHED: 'FINALIZADO',
          CANCELED: 'CANCELADO',
        }[criteria.status] || criteria.status),
    );
  if (criteria.startDate || criteria.endDate) labels.push('Data');
  return { items, description: labels.length ? labels.join(', ') : 'Todos' };
}
export function pcpExportRows(filtered, original) {
  return filtered.length ? filtered : original;
}

export function canGenerateOrder(record) {
  return record?.id != null && record.id !== '' && record.hasOrder === false;
}

export function ordersForGeneration(records) {
  const seen = new Set();
  return records.filter((record) => {
    if (!canGenerateOrder(record) || seen.has(record.id)) return false;
    seen.add(record.id);
    return true;
  });
}

export function inspectionStageForSearch(value) {
  const term = String(value || '').toLowerCase();
  if (!term) return null;
  const stages = {
    cadastro: 'REGISTER',
    inspeção: 'INSPECTION',
    liberação: 'RELEASE',
    expedição: 'EXPEDITION',
    finalizado: 'COMPLETED',
  };
  const label = Object.keys(stages).find((key) =>
    term.includes(key.slice(0, term.length)),
  );
  return label ? stages[label] : null;
}
export function relatedInvoiceInspection(items, record) {
  return items.find(
    (item) =>
      item.invoice === record.invoice && item.invoiceItem === record.itemCode,
  );
}

export function operationTotalTime(estimatedTime, collectiveTime, amount) {
  if (
    !Number.isFinite(estimatedTime) ||
    estimatedTime < 0 ||
    typeof collectiveTime !== 'boolean'
  )
    throw new Error('Tempo ou modalidade da operação inválidos.');
  if (!Number.isFinite(amount) || amount < 0)
    throw new Error('Quantidade da ordem de serviço inválida.');
  return collectiveTime ? estimatedTime : estimatedTime * amount;
}
