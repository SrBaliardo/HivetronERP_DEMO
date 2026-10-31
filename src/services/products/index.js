import { readDemonstrationResponse } from '../../utils/readDemonstrationResponse';

// Recebe contratos preparados pela fachada; não usa HTTP nem grava dados.
export function createDemonstrationService(responses) {
  return {
    listProducts: (...args) =>
      readDemonstrationResponse(responses.listProducts, args),
    getProductById: (...args) =>
      readDemonstrationResponse(responses.getProductById, args),
    listRelatedProducts: (...args) =>
      readDemonstrationResponse(responses.listRelatedProducts, args),
    validateRawMaterialCode: (...args) =>
      readDemonstrationResponse(responses.validateRawMaterialCode, args),
    productsArrayToSearch: (...args) =>
      readDemonstrationResponse(responses.productsArrayToSearch, args),
    validateProduct: (...args) =>
      readDemonstrationResponse(responses.validateProduct, args),
    validateDoubleOnProducts: (...args) =>
      readDemonstrationResponse(responses.validateDoubleOnProducts, args),
    validateDoubleOnSets: (...args) =>
      readDemonstrationResponse(responses.validateDoubleOnSets, args),
    addProduct: (...args) =>
      readDemonstrationResponse(responses.addProduct, args),
    editProduct: (...args) =>
      readDemonstrationResponse(responses.editProduct, args),
    deleteProduct: (...args) =>
      readDemonstrationResponse(responses.deleteProduct, args),
  };
}
