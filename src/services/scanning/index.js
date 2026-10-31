import { readDemonstrationResponse } from '../../utils/readDemonstrationResponse';

// Recebe contratos preparados pela fachada; não usa HTTP nem grava dados.
export function createDemonstrationService(responses) {
  return {
    listInvoices: (...args) =>
      readDemonstrationResponse(responses.listInvoices, args),
    listInspections: (...args) =>
      readDemonstrationResponse(responses.listInspections, args),
    getInspectionById: (...args) =>
      readDemonstrationResponse(responses.getInspectionById, args),
    addInspection: (...args) =>
      readDemonstrationResponse(responses.addInspection, args),
    editInspection: (...args) =>
      readDemonstrationResponse(responses.editInspection, args),
    deleteInspection: (...args) =>
      readDemonstrationResponse(responses.deleteInspection, args),
    addInspectionItems: (...args) =>
      readDemonstrationResponse(responses.addInspectionItems, args),
    editInspectionItems: (...args) =>
      readDemonstrationResponse(responses.editInspectionItems, args),
    getInspectionItemsById: (...args) =>
      readDemonstrationResponse(responses.getInspectionItemsById, args),
    listServiceOrders: (...args) =>
      readDemonstrationResponse(responses.listServiceOrders, args),
    getServiceOrderById: (...args) =>
      readDemonstrationResponse(responses.getServiceOrderById, args),
    addServiceOrders: (...args) =>
      readDemonstrationResponse(responses.addServiceOrders, args),
    addServiceOrdersBatch: (...args) =>
      readDemonstrationResponse(responses.addServiceOrdersBatch, args),
    addOrderSequences: (...args) =>
      readDemonstrationResponse(responses.addOrderSequences, args),
    scheduleOrder: (...args) =>
      readDemonstrationResponse(responses.scheduleOrder, args),
    editOrderSequence: (...args) =>
      readDemonstrationResponse(responses.editOrderSequence, args),
    listOrdersByCode: (...args) =>
      readDemonstrationResponse(responses.listOrdersByCode, args),
    getOrderById: (...args) =>
      readDemonstrationResponse(responses.getOrderById, args),
    getOrderSequenceById: (...args) =>
      readDemonstrationResponse(responses.getOrderSequenceById, args),
    updateServiceOrder: (...args) =>
      readDemonstrationResponse(responses.updateServiceOrder, args),
    checkOrderStatus: (...args) =>
      readDemonstrationResponse(responses.checkOrderStatus, args),
    listAllServiceOrders: (...args) =>
      readDemonstrationResponse(responses.listAllServiceOrders, args),
    listSequenceOrders: (...args) =>
      readDemonstrationResponse(responses.listSequenceOrders, args),
    listCutOrders: (...args) =>
      readDemonstrationResponse(responses.listCutOrders, args),
    getCutOrderById: (...args) =>
      readDemonstrationResponse(responses.getCutOrderById, args),
    addCutOrders: (...args) =>
      readDemonstrationResponse(responses.addCutOrders, args),
    addItemBlock: (...args) =>
      readDemonstrationResponse(responses.addItemBlock, args),
    addCutItems: (...args) =>
      readDemonstrationResponse(responses.addCutItems, args),
    editCutOrder: (...args) =>
      readDemonstrationResponse(responses.editCutOrder, args),
    editItemBlock: (...args) =>
      readDemonstrationResponse(responses.editItemBlock, args),
    editCutItems: (...args) =>
      readDemonstrationResponse(responses.editCutItems, args),
    deleteSequencesToSync: (...args) =>
      readDemonstrationResponse(responses.deleteSequencesToSync, args),
    editSequencesToSync: (...args) =>
      readDemonstrationResponse(responses.editSequencesToSync, args),
    listInvoicesPage: (...args) =>
      readDemonstrationResponse(responses.listInvoicesPage, args),
    listInspectionsPage: (...args) =>
      readDemonstrationResponse(responses.listInspectionsPage, args),
    listServiceOrdersPage: (...args) =>
      readDemonstrationResponse(responses.listServiceOrdersPage, args),
  };
}

let orderList = null;
export function readOrderList() {
  return orderList;
}
export function saveOrderList(serialized) {
  orderList = JSON.parse(serialized);
}
export function clearOrderList() {
  orderList = null;
}
