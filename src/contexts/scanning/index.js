import {
  createContext,
  createElement,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { useMountedRef } from '../../hooks/useMountedRef';
import {
  createDemonstrationService,
  readOrderList,
  saveOrderList,
  clearOrderList,
} from '../../services/scanning';
import { reportRequestFailure } from '../../utils/reportRequestFailure';
import { validateProp } from '../../utils/validateProp';
import { useAutenticacao } from '../autenticacao';
import * as B from './builders';
import { buildDemonstrationResponses } from './builders/demonstracao';
import * as R from './regras';

const T = createDemonstrationService(buildDemonstrationResponses());

export const compareServiceOrderRows = R.compareServiceOrderRows;

const Context = createContext();
const empty = {};
export function useScanning() {
  const value = useContext(Context);
  if (!value) throw new Error('useScanning requer ScanningProvider.');
  return value;
}
export function ScanningProvider({ children }) {
  const { userData } = useAutenticacao();
  const token = userData?.token;
  const mounted = useMountedRef();
  const session = useRef(token);
  session.current = token;
  const cache = useRef({ token, values: {} });
  if (cache.current.token !== token) cache.current = { token, values: {} };
  const generation = useRef({});
  const [state, setState] = useState({ token, values: {} });
  const [pageVersions, setPageVersions] = useState({ token, values: {} });
  const actions = useMemo(() => {
    const advancePages = (keys) => {
      if (session.current !== token) return;
      if (mounted.current)
        setPageVersions((previous) => ({
          token,
          values: {
            ...(previous.token === token ? previous.values : {}),
            ...Object.fromEntries(
              keys.map((key) => [
                key,
                (previous.token === token ? previous.values[key] || 0 : 0) + 1,
              ]),
            ),
          },
        }));
    };
    const invalidate = (keys) => {
      if (session.current !== token) return;
      for (const key of keys) {
        delete cache.current.values[key];
        generation.current[key] = (generation.current[key] || 0) + 1;
      }
      advancePages(keys);
      if (mounted.current)
        setState((prev) => ({
          token,
          values: {
            ...(prev.token === token ? prev.values : {}),
            ...Object.fromEntries(keys.map((key) => [key, null])),
          },
        }));
    };
    const read = async (key, operation, force) => {
      if (!force && cache.current.values[key] !== undefined)
        return cache.current.values[key];
      const ticket = (generation.current[key] || 0) + 1;
      generation.current[key] = ticket;
      try {
        const result = B.buildList(await operation());
        if (
          mounted.current &&
          session.current === token &&
          generation.current[key] === ticket
        ) {
          cache.current.values[key] = result;
          setState((prev) => ({
            token,
            values: {
              ...(prev.token === token ? prev.values : {}),
              [key]: result,
            },
          }));
        }
        return result;
      } catch (error) {
        reportRequestFailure('scanning.' + key, error);
        throw error;
      }
    };
    const op = {};

    op.getScanningPage = async (kind, request) => {
      const parameters = B.buildScanningPageQuery(kind, request);
      const transports = {
        invoices: T.listInvoicesPage,
        inspections: T.listInspectionsPage,
        serviceOrders: T.listServiceOrdersPage,
      };
      try {
        return B.buildScanningPage(
          await transports[kind](parameters, token),
          kind,
        );
      } catch (error) {
        reportRequestFailure('scanning.page.' + kind, error);
        throw error;
      }
    };
    op.getInvoiceInspection = async (record, signal) => {
      let page = 0,
        totalPages = 1;
      while (page < totalPages) {
        if (signal?.aborted)
          throw new DOMException('Operação cancelada.', 'AbortError');
        const result = await op.getScanningPage(
          'inspections',
          B.buildInvoiceInspectionQuery(record, page),
        );
        if (signal?.aborted)
          throw new DOMException('Operação cancelada.', 'AbortError');
        const found = R.relatedInvoiceInspection(result.items, record);
        if (found) return op.getInspectionById(found.id);
        totalPages = result.totalPages;
        page++;
      }
      throw new Error('Inspeção associada não encontrada!');
    };
    op.markGeneratedServiceOrders = B.buildGeneratedServiceOrders;

    op.listInvoices = () => read('invoices', () => T.listInvoices(token), true);
    op.loadInvoices = () =>
      read('invoices', () => T.listInvoices(token), false);
    op.listInspections = () =>
      read('inspections', () => T.listInspections(token), true);
    op.loadInspections = () =>
      read('inspections', () => T.listInspections(token), false);
    op.getInspectionById = async (value) => {
      try {
        return await T.getInspectionById(B.buildParameter(value), token);
      } catch (error) {
        reportRequestFailure('scanning.getInspectionById', error);
        throw error;
      }
    };
    op.addInspection = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await toast.promise(T.addInspection(payload, signal), {
          pending: 'Preparando demonstração...',
          success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
          error:
            'Erro ao cadastrar a inspeção. Verifique os campos do formulário e tente novamente.',
        });
        invalidate(['invoices', 'inspections']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.addInspection', error);
        throw error;
      }
    };
    op.editInspection = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await toast.promise(T.editInspection(payload, signal), {
          pending: 'Preparando demonstração...',
          success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
          error:
            'Erro ao editar o cadastro da inspeção. Verifique os campos do formulário e tente novamente.',
        });
        invalidate(['invoices', 'inspections']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.editInspection', error);
        throw error;
      }
    };
    op.deleteInspection = async (value, signal) => {
      try {
        const payload = B.buildParameter(value);
        const result = await toast.promise(
          T.deleteInspection(payload, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error: 'Erro ao excluir o cadastro da inspeção. Tente novamente.',
          },
        );
        invalidate(['invoices', 'inspections']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.deleteInspection', error);
        throw error;
      }
    };
    op.addInspectionItems = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await toast.promise(
          T.addInspectionItems(payload, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao cadastrar Itens de inspeção . Verifique os campos do formulário e tente novamente.',
          },
        );
        invalidate(['invoices', 'inspections']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.addInspectionItems', error);
        throw error;
      }
    };
    op.editInspectionItems = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await toast.promise(
          T.editInspectionItems(payload, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao editar o cadastro dos itens de inspeção. Verifique os campos do formulário e tente novamente.',
          },
        );
        invalidate(['invoices', 'inspections']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.editInspectionItems', error);
        throw error;
      }
    };
    op.getInspectionItemsById = async (value) => {
      try {
        return await T.getInspectionItemsById(B.buildParameter(value), token);
      } catch (error) {
        reportRequestFailure('scanning.getInspectionItemsById', error);
        throw error;
      }
    };
    op.listServiceOrders = () =>
      read('serviceOrders', () => T.listServiceOrders(token), true);
    op.loadServiceOrders = () =>
      read('serviceOrders', () => T.listServiceOrders(token), false);
    op.getServiceOrderById = async (value) => {
      try {
        return await T.getServiceOrderById(B.buildParameter(value), token);
      } catch (error) {
        reportRequestFailure('scanning.getServiceOrderById', error);
        throw error;
      }
    };
    op.addServiceOrders = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await toast.promise(
          T.addServiceOrders(payload, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao cadastrar a ordem de serviço. Verifique se o produto está cadastrado e tente novamente.',
          },
        );
        invalidate(['serviceOrders', 'allServiceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.addServiceOrders', error);
        throw error;
      }
    };
    op.addOrderSequences = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await toast.promise(
          T.addOrderSequences(payload, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao cadastrar as sequências da ordem de serviço. Verifique e tente novamente.',
          },
        );
        invalidate(['serviceOrders', 'allServiceOrders', 'sequenceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.addOrderSequences', error);
        throw error;
      }
    };
    op.editOrderSequence = async (value, signal) => {
      try {
        R.validateOrderSequences(value);
        const payload = B.buildPayload(value);
        const result = await toast.promise(
          T.editOrderSequence(payload, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao editar o cadastro da sequência da ordem de serviço. Verifique e tente novamente.',
          },
        );
        if (result?.error) throw new Error(result.error);
        invalidate(['serviceOrders', 'allServiceOrders', 'sequenceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.editOrderSequence', error);
        throw error;
      }
    };
    op.listOrdersByCode = async (value) => {
      try {
        return B.buildList(
          await T.listOrdersByCode(B.buildParameter(value), token),
        );
      } catch (error) {
        reportRequestFailure('scanning.listOrdersByCode', error);
        throw error;
      }
    };
    op.getOrderById = async (value) => {
      try {
        return await T.getOrderById(B.buildParameter(value), token);
      } catch (error) {
        reportRequestFailure('scanning.getOrderById', error);
        throw error;
      }
    };
    op.scheduleOrder = async (value, checkpoint, mode, signal) => {
      const allowed =
        mode === 'pcp'
          ? R.pcpPermissions(userData?.role).serviceEdit
          : R.permissions(userData?.role, 1).orderEdit;
      if (!allowed) throw new Error('Operação não permitida.');
      const id = B.buildParameter(value);
      try {
        if (!checkpoint.scheduled) {
          await T.scheduleOrder(id, signal);
          checkpoint.scheduled = true;
          invalidate(['serviceOrders', 'allServiceOrders', 'sequenceOrders']);
        }
        if (signal?.aborted) return;
        const updated = await op.getOrderById(id);
        if (!updated || updated.id !== id)
          throw new Error('Não foi possível atualizar os detalhes da O.S.');
        if (mode !== 'pcp' && !signal?.aborted && session.current === token) {
          const orders = op.readOrderList();
          if (orders.length)
            op.saveOrderList(B.buildStoredOrderUpdate(orders, updated, false));
        }
        return updated;
      } catch (error) {
        reportRequestFailure('scanning.scheduleOrder', error);
        throw error;
      }
    };
    op.getOrderSequenceById = async (value) => {
      try {
        return await T.getOrderSequenceById(B.buildParameter(value), token);
      } catch (error) {
        reportRequestFailure('scanning.getOrderSequenceById', error);
        throw error;
      }
    };
    op.updateServiceOrder = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await T.updateServiceOrder(payload, signal);
        invalidate(['serviceOrders', 'allServiceOrders', 'sequenceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.updateServiceOrder', error);
        throw error;
      }
    };
    op.checkOrderStatus = async (value, signal) => {
      try {
        const payload = B.buildParameter(value);
        const result = await T.checkOrderStatus(payload, signal);
        invalidate(['serviceOrders', 'allServiceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.checkOrderStatus', error);
        throw error;
      }
    };
    op.listAllServiceOrders = () =>
      read('allServiceOrders', () => T.listAllServiceOrders(token), true);
    op.loadAllServiceOrders = () =>
      read('allServiceOrders', () => T.listAllServiceOrders(token), false);
    op.listSequenceOrders = () =>
      read('sequenceOrders', () => T.listSequenceOrders(token), true);
    op.loadSequenceOrders = () =>
      read('sequenceOrders', () => T.listSequenceOrders(token), false);
    op.listCutOrders = () =>
      read('cutOrders', () => T.listCutOrders(token), true);
    op.loadCutOrders = () =>
      read('cutOrders', () => T.listCutOrders(token), false);
    op.getCutOrderById = async (value) => {
      try {
        return await T.getCutOrderById(B.buildParameter(value), token);
      } catch (error) {
        reportRequestFailure('scanning.getCutOrderById', error);
        throw error;
      }
    };
    op.addCutOrders = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await toast.promise(T.addCutOrders(payload, signal), {
          pending: 'Preparando demonstração...',
          success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
          error:
            'Erro ao cadastrar as ordens de corte. Verifique e tente novamente.',
        });
        invalidate(['cutOrders', 'serviceOrders', 'allServiceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.addCutOrders', error);
        throw error;
      }
    };
    op.addItemBlock = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await T.addItemBlock(payload, signal);
        invalidate(['cutOrders', 'serviceOrders', 'allServiceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.addItemBlock', error);
        throw error;
      }
    };
    op.addCutItems = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await T.addCutItems(payload, signal);
        invalidate(['cutOrders', 'serviceOrders', 'allServiceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.addCutItems', error);
        throw error;
      }
    };
    op.editCutOrder = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await T.editCutOrder(payload, signal);
        invalidate(['cutOrders', 'serviceOrders', 'allServiceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.editCutOrder', error);
        throw error;
      }
    };
    op.editItemBlock = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await T.editItemBlock(payload, signal);
        invalidate(['cutOrders', 'serviceOrders', 'allServiceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.editItemBlock', error);
        throw error;
      }
    };
    op.editCutItems = async (value, signal) => {
      try {
        const payload = B.buildPayload(value);
        const result = await T.editCutItems(payload, signal);
        invalidate(['cutOrders', 'serviceOrders', 'allServiceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.editCutItems', error);
        throw error;
      }
    };
    op.deleteSequencesToSync = async (value, signal) => {
      try {
        const payload = B.buildParameter(value);
        const result = await toast.promise(
          T.deleteSequencesToSync(payload, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Alterações identificadas',
            error: 'Erro ao localizar alterações.',
          },
        );
        invalidate(['serviceOrders', 'allServiceOrders', 'sequenceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.deleteSequencesToSync', error);
        throw error;
      }
    };
    op.editSequencesToSync = async (value, signal) => {
      try {
        const payload = B.buildParameter(value);
        const result = await toast.promise(
          T.editSequencesToSync(payload, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao sincronizar. Verifique o status das sequências e tente novamente.',
          },
        );
        invalidate(['serviceOrders', 'allServiceOrders', 'sequenceOrders']);
        return result;
      } catch (error) {
        reportRequestFailure('scanning.editSequencesToSync', error);
        throw error;
      }
    };

    const settleUpdates = async (operations) => {
      const results = await Promise.allSettled(operations);
      const failure = results.find((result) => result.status === 'rejected');
      if (failure) throw failure.reason;
      return results.map((result) => result.value);
    };
    op.getPcpPermissions = R.pcpPermissions;
    op.validPcpDateRange = R.validPcpDateRange;
    op.filterPcpRecords = R.filterPcpRecords;
    op.pcpExportRows = R.pcpExportRows;
    op.buildPcpNavigation = B.buildPcpNavigation;
    op.buildCutOrderForm = B.buildCutOrderForm;
    op.savePcpOrder = async (order, values, canceled, signal) => {
      const payload = B.buildOrderUpdate(order, values.observation, canceled);
      const sequences = B.buildOrderSequencePayload(values.sequences, canceled);
      if (canceled) {
        await settleUpdates([
          op.editOrderSequence(sequences, signal),
          op.updateServiceOrder(payload, signal),
        ]);
      } else {
        await op.updateServiceOrder(payload, signal);
        await op.editOrderSequence(sequences, signal);
        await op.checkOrderStatus(order.id, signal);
      }
    };
    op.saveCutOrder = async (order, values, signal) => {
      const payload = B.buildCutOrderUpdates(order, values);
      await toast.promise(
        settleUpdates([
          op.editCutOrder(payload.order, signal),
          op.editCutItems(payload.items, signal),
          op.editItemBlock(payload.blocks, signal),
        ]),
        {
          pending: 'Preparando demonstração...',
          success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
          error:
            'Erro ao editar o cadastro da ordem de corte. Verifique os campos do formulário e tente novamente.',
        },
      );
    };
    op.readOrderList = () => B.buildStoredOrders(readOrderList());
    op.saveOrderList = (values) => saveOrderList(B.serializeOrders(values));
    op.clearOrderList = clearOrderList;
    op.buildInspectionForm = B.buildInspectionForm;
    op.buildInspectionItems = B.buildInspectionItems;
    op.displayDate = B.displayDate;
    op.itemErrors = R.itemErrors;
    op.inactiveSelections = R.inactiveSelections;
    op.remaining = R.remaining;
    op.limitShipment = R.limitShipment;
    op.getPermissions = R.permissions;
    op.filterRecords = R.filterRecords;
    op.validInvoiceDateRange = R.validInvoiceDateRange;
    op.buildInitialInspection = B.buildInitialInspection;
    op.buildHierarchy = B.buildHierarchy;
    op.buildSelectedItems = B.buildSelectedItems;
    op.saveInspectionStage = async (
      data,
      inspection,
      step,
      items,
      approval,
      shipping,
      signal,
    ) => {
      const saved = await op.editInspection(
        B.buildInspectionUpdate(data, inspection, step, approval),
        signal,
      );
      if (R.updatesItemsForStage(step, approval))
        await op.editInspectionItems(
          B.buildItemsUpdate(items, saved.id, step, shipping),
          signal,
        );
      return saved;
    };
    op.registerInspection = async (data, items, checkpoint, signal) => {
      if (!checkpoint.inspection)
        checkpoint.inspection = await op.addInspection(
          B.buildInspectionForm(data, 1),
          signal,
        );
      if (!checkpoint.itemsSaved) {
        await op.addInspectionItems(
          B.buildItemsUpdate(items, checkpoint.inspection.id, 1),
          signal,
        );
        checkpoint.itemsSaved = true;
      }
      return op.editInspection(
        B.buildRegisteredInspection(checkpoint.inspection, new Date()),
        signal,
      );
    };
    op.backInspection = (inspection, step, approval, signal) =>
      op.editInspection(
        B.buildBackInspection(inspection, step, approval),
        signal,
      );
    op.rectifyInspectionItems = async (items, updated, signal) => {
      const payload = B.buildRectifiedItems(items, updated);
      await op.editInspectionItems(payload, signal);
      return payload;
    };
    op.canGenerateOrder = R.canGenerateOrder;
    op.ordersForGeneration = R.ordersForGeneration;
    const prepareScanOrder = async (record, signal) => {
      if (signal?.aborted)
        throw new DOMException('Operação cancelada.', 'AbortError');
      if (B.hasCompleteScanOrder(record)) return record;
      const result = B.buildScanOrderDetails(
        record,
        await op.getServiceOrderById(record.id),
      );
      if (signal?.aborted)
        throw new DOMException('Operação cancelada.', 'AbortError');
      return result;
    };
    op.generateOrdersBatch = async (records, signal) => {
      if (!R.permissions(userData?.role, 1).generate)
        throw new Error(
          '🙅🏻‍♂️ Você não tem permissão para executar essa operação!',
        );
      const selected = R.ordersForGeneration(records);
      if (!selected.length || signal?.aborted) return;
      try {
        const prepared = [];
        for (let index = 0; index < selected.length; index += 4) {
          prepared.push(
            ...(await Promise.all(
              selected
                .slice(index, index + 4)
                .map((record) => prepareScanOrder(record, signal)),
            )),
          );
        }
        if (R.ordersForGeneration(prepared).length !== prepared.length)
          throw new Error('Há itens que já possuem O.S. Atualize a lista.');
        const payload = B.buildOrderBatchPayload(prepared);
        const result = await T.addServiceOrdersBatch(payload, signal);
        if (!mounted.current || session.current !== token) return result;
        // O lote foi confirmado: manter os itens bloqueados mesmo se o GET falhar.
        const updated = B.buildGeneratedServiceOrders(
          cache.current.values.serviceOrders || [],
          payload,
        );
        generation.current.serviceOrders =
          (generation.current.serviceOrders || 0) + 1;
        cache.current.values.serviceOrders = updated;
        setState((previous) => ({
          token,
          values: {
            ...(previous.token === token ? previous.values : {}),
            serviceOrders: updated,
          },
        }));
        advancePages(['serviceOrders']);
        invalidate(['allServiceOrders', 'sequenceOrders']);
        if (!signal?.aborted) {
          toast.success(
            'Demonstração: ação simulada; nenhum dado foi gravado.',
          );
        }
        return result;
      } catch (error) {
        reportRequestFailure('scanning.generateOrdersBatch', error);
        throw error;
      }
    };
    op.generateOrder = async (order, checkpoint, signal) => {
      const code = order.key;
      let group = await op.listOrdersByCode(code);
      if (!group.length || (checkpoint.order && !checkpoint.sequences)) {
        op.clearOrderList();
        if (!checkpoint.order) {
          const source = await prepareScanOrder(order, signal);
          if (!R.canGenerateOrder(source))
            throw new Error('Este item já possui O.S. Atualize a lista.');
          checkpoint.order = await op.addServiceOrders(
            B.buildPayload(source),
            signal,
          );
        }
        if (!checkpoint.sequences) {
          await op.addOrderSequences(checkpoint.order, signal);
          checkpoint.sequences = true;
        }
        group = await op.listOrdersByCode(code);
        if (!group.length)
          throw new Error('Erro ao buscar grupo atualizado após adicionar.');
      }
      op.saveOrderList(group);
      return B.buildOrderNavigation(checkpoint.order || order, code, group);
    };
    op.syncOrder = async (id, checkpoint, signal) => {
      if (!checkpoint.deleted) {
        await op.deleteSequencesToSync(id, signal);
        checkpoint.deleted = true;
      }
      return op.editSequencesToSync(id, signal);
    };
    op.generateCutOrders = async (orders, checkpoint, signal) => {
      if (!checkpoint.orders) {
        await op.addCutOrders(orders, signal);
        checkpoint.orders = true;
      }
      if (!checkpoint.blocks) {
        await op.addItemBlock(orders, signal);
        checkpoint.blocks = true;
      }
      await op.addCutItems(orders, signal);
    };
    op.buildOrderForm = B.buildOrderForm;
    op.buildOrderFieldValue = B.buildOrderFieldValue;
    op.buildDeadline = B.buildDeadline;
    op.displayDeadline = B.displayDeadline;
    op.displayExitDate = B.displayExitDate;
    op.buildSequenceSelection = B.buildSequenceSelection;
    op.sequenceOperationIdForSelection = B.sequenceOperationIdForSelection;
    op.saveOrder = async (order, values, orders, canceled, signal) => {
      const sequences = B.buildOrderSequencePayload(values.sequences, canceled);
      const payload = B.buildOrderUpdate(order, values.observation, canceled);
      let updated;
      if (canceled) {
        await Promise.all([
          op.editOrderSequence(sequences, signal),
          op.updateServiceOrder(payload, signal),
        ]);
        updated = B.buildCanceledOrder(order);
      } else {
        await op.updateServiceOrder(payload, signal);
        await op.editOrderSequence(sequences, signal);
        updated = await op.checkOrderStatus(order.id, signal);
      }
      const result = B.buildStoredOrderUpdate(orders, updated, canceled);
      op.saveOrderList(result);
      return result;
    };
    return op;
  }, [token, mounted, userData?.role]);
  const values = state.token === token ? state.values : empty;
  const value = useMemo(
    () => ({
      ...Object.fromEntries(
        [
          'invoices',
          'inspections',
          'serviceOrders',
          'allServiceOrders',
          'sequenceOrders',
          'cutOrders',
        ].map((key) => [key, values[key] ?? null]),
      ),
      pageVersions: pageVersions.token === token ? pageVersions.values : empty,
      ordersSameCode: [],
      cutItemBlock: [],
      cutItems: [],
      ...actions,
      role: userData?.role,
      sessionKey: token,
    }),
    [values, actions, userData?.role, token, pageVersions],
  );
  return createElement(Context.Provider, { value }, children);
}
ScanningProvider.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
};
