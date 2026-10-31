import { readDemonstrationResponse } from '../../utils/readDemonstrationResponse';

// Recebe contratos preparados pela fachada; não usa HTTP nem grava dados.
export function createDemonstrationService(responses) {
  return {
    readCatalog: (...args) =>
      readDemonstrationResponse(responses.readCatalog, args),
    readList: (...args) => readDemonstrationResponse(responses.readList, args),
    readAuxiliary: (...args) =>
      readDemonstrationResponse(responses.readAuxiliary, args),
    createRecord: (...args) =>
      readDemonstrationResponse(responses.createRecord, args),
    updateRecord: (...args) =>
      readDemonstrationResponse(responses.updateRecord, args),
    deleteRecord: (...args) =>
      readDemonstrationResponse(responses.deleteRecord, args),
  };
}
