import { readDemonstrationResponse } from '../../utils/readDemonstrationResponse';

// Recebe contratos preparados pela fachada; não usa HTTP nem grava dados.
export function createDemonstrationService(responses) {
  return {
    listSets: (...args) => readDemonstrationResponse(responses.listSets, args),
    getSetById: (...args) =>
      readDemonstrationResponse(responses.getSetById, args),
    listRelatedSets: (...args) =>
      readDemonstrationResponse(responses.listRelatedSets, args),
    setsArrayToSearch: (...args) =>
      readDemonstrationResponse(responses.setsArrayToSearch, args),
    validateSet: (...args) =>
      readDemonstrationResponse(responses.validateSet, args),
    validateDoubleOnProducts: (...args) =>
      readDemonstrationResponse(responses.validateDoubleOnProducts, args),
    validateDoubleOnSets: (...args) =>
      readDemonstrationResponse(responses.validateDoubleOnSets, args),
    addSet: (...args) => readDemonstrationResponse(responses.addSet, args),
    editSet: (...args) => readDemonstrationResponse(responses.editSet, args),
    deleteSet: (...args) =>
      readDemonstrationResponse(responses.deleteSet, args),
  };
}
