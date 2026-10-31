import { readDemonstrationResponse } from '../../utils/readDemonstrationResponse';

// Recebe contratos preparados pela fachada; não usa HTTP nem grava dados.
export function createDemonstrationService(responses) {
  return {
    authenticate: (...args) =>
      readDemonstrationResponse(responses.authenticate, args),
    recoverPassword: (...args) =>
      readDemonstrationResponse(responses.recoverPassword, args),
    fetchUserProfile: (...args) =>
      readDemonstrationResponse(responses.fetchUserProfile, args),
  };
}
