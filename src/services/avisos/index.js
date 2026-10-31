import { readDemonstrationResponse } from '../../utils/readDemonstrationResponse';

// Recebe contratos preparados pela fachada; não usa HTTP nem grava dados.
export function createDemonstrationService(responses) {
  return {
    fetchNotices: (...args) =>
      readDemonstrationResponse(responses.fetchNotices, args),
    createNotice: (...args) =>
      readDemonstrationResponse(responses.createNotice, args),
    updateNotice: (...args) =>
      readDemonstrationResponse(responses.updateNotice, args),
    removeNotice: (...args) =>
      readDemonstrationResponse(responses.removeNotice, args),
  };
}
