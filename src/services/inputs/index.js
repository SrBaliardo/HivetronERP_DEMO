import { readDemonstrationResponse } from '../../utils/readDemonstrationResponse';

// Recebe contratos preparados pela fachada; não usa HTTP nem grava dados.
export function createDemonstrationService(responses) {
  return {
    readCatalog: (...args) =>
      readDemonstrationResponse(responses.readCatalog, args),
  };
}
