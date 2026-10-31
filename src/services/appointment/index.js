import { readDemonstrationResponse } from '../../utils/readDemonstrationResponse';

export function createDemonstrationService(responses) {
  return {
    demonstration: true,
    listPointedOrders: (...args) =>
      readDemonstrationResponse(responses.listPointedOrders, args),
    getPointedOrderById: (...args) =>
      readDemonstrationResponse(responses.getPointedOrderById, args),
    addAppointment: (...args) =>
      readDemonstrationResponse(responses.addAppointment, args),
  };
}
