import { readDemonstrationResponse } from '../../utils/readDemonstrationResponse';

// Recebe contratos preparados pela fachada; não usa HTTP nem grava dados.
export function createDemonstrationService(responses) {
  return {
    fetchUsers: (...args) =>
      readDemonstrationResponse(responses.fetchUsers, args),
    createUser: (...args) =>
      readDemonstrationResponse(responses.createUser, args),
    updateUser: (...args) =>
      readDemonstrationResponse(responses.updateUser, args),
    removeUser: (...args) =>
      readDemonstrationResponse(responses.removeUser, args),
  };
}
