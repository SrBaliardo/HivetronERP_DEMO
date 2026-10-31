import { readDemonstrationResponse } from '../../utils/readDemonstrationResponse';

// Recebe contratos preparados pela fachada; não usa HTTP nem grava dados.
export function createDemonstrationService(responses) {
  return {
    listSequences: (...args) =>
      readDemonstrationResponse(responses.listSequences, args),
    getSequence: (...args) =>
      readDemonstrationResponse(responses.getSequence, args),
    getSequenceData: (...args) =>
      readDemonstrationResponse(responses.getSequenceData, args),
    getLastSequence: (...args) =>
      readDemonstrationResponse(responses.getLastSequence, args),
    searchItemsByFilter: (...args) =>
      readDemonstrationResponse(responses.searchItemsByFilter, args),
    getItemDetails: (...args) =>
      readDemonstrationResponse(responses.getItemDetails, args),
    exportSequences: (...args) =>
      readDemonstrationResponse(responses.exportSequences, args),
    addSequence: (...args) =>
      readDemonstrationResponse(responses.addSequence, args),
    editSequence: (...args) =>
      readDemonstrationResponse(responses.editSequence, args),
    deleteSequence: (...args) =>
      readDemonstrationResponse(responses.deleteSequence, args),
    listAlternatives: (...args) =>
      readDemonstrationResponse(responses.listAlternatives, args),
  };
}
