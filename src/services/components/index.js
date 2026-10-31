import { readDemonstrationResponse } from '../../utils/readDemonstrationResponse';

// Recebe contratos preparados pela fachada; não usa HTTP nem grava dados.
export function createDemonstrationService(responses) {
  return {
    listAllCodes: (...args) =>
      readDemonstrationResponse(responses.listAllCodes, args),
    validateOnProducts: (...args) =>
      readDemonstrationResponse(responses.validateOnProducts, args),
    validateOnSets: (...args) =>
      readDemonstrationResponse(responses.validateOnSets, args),
    validateHierarchy: (...args) =>
      readDemonstrationResponse(responses.validateHierarchy, args),
    addComponent: (...args) =>
      readDemonstrationResponse(responses.addComponent, args),
    editComponent: (...args) =>
      readDemonstrationResponse(responses.editComponent, args),
    deleteComponent: (...args) =>
      readDemonstrationResponse(responses.deleteComponent, args),
  };
}
