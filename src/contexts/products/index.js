import {
  createContext,
  createElement,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { useMountedRef } from '../../hooks/useMountedRef';
import { createDemonstrationService } from '../../services/products';
import { reportRequestFailure } from '../../utils/reportRequestFailure';
import { validateProp } from '../../utils/validateProp';
import { useAutenticacao } from '../autenticacao';
import * as B from './builders';
import { buildDemonstrationResponses } from './builders/demonstracao';
import * as R from './regras';

const transport = createDemonstrationService(buildDemonstrationResponses());

const Context = createContext();
export function useProducts() {
  const value = useContext(Context);
  if (!value) throw new Error('useProducts requer ProductsProvider.');
  return value;
}
export function ProductsProvider({ children }) {
  const { userData } = useAutenticacao();
  const sessionKey = userData?.token;
  const mounted = useMountedRef();
  const currentSession = useRef(sessionKey);
  currentSession.current = sessionKey;
  const generation = useRef({});
  const [productsState, setProducts] = useState(null);
  const products =
    productsState && productsState.sessionKey === sessionKey
      ? productsState.data
      : null;
  const [product] = useState([]);
  const [rawMaterialCode, setRawMaterialCode] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const actions = useMemo(() => {
    const operations = {};
    operations.listProducts = async (value) => {
      const ticket = (generation.current['listProducts'] || 0) + 1;
      generation.current['listProducts'] = ticket;
      try {
        const data = await transport.listProducts(
          B.buildParameters(value),
          sessionKey,
        );
        const result = B.buildList(data);
        if (
          mounted.current &&
          currentSession.current === sessionKey &&
          generation.current['listProducts'] === ticket
        )
          setProducts({ sessionKey, data: result });
        return result;
      } catch (error) {
        reportRequestFailure('products.listProducts', error);
        throw error;
      }
    };
    operations.getProductById = async (value) => {
      if (value === null || value === undefined)
        throw new Error('Identificador não informado.');
      try {
        const data = await transport.getProductById(
          B.buildParameters(value),
          sessionKey,
        );
        return data;
      } catch (error) {
        reportRequestFailure('products.getProductById', error);
        throw error;
      }
    };
    operations.listRelatedProducts = async (value) => {
      if (value === null || value === undefined)
        throw new Error('Identificador não informado.');
      try {
        const data = await transport.listRelatedProducts(
          B.buildParameters(value),
          sessionKey,
        );
        return data;
      } catch (error) {
        reportRequestFailure('products.listRelatedProducts', error);
        throw error;
      }
    };
    operations.validateRawMaterialCode = async (value) => {
      const ticket = (generation.current['validateRawMaterialCode'] || 0) + 1;
      generation.current['validateRawMaterialCode'] = ticket;
      try {
        const data = await transport.validateRawMaterialCode(
          B.buildParameters(value),
          sessionKey,
        );
        const result = B.buildList(data);
        if (
          mounted.current &&
          currentSession.current === sessionKey &&
          generation.current['validateRawMaterialCode'] === ticket
        )
          setRawMaterialCode(result);
        return result;
      } catch (error) {
        reportRequestFailure('products.validateRawMaterialCode', error);
        throw error;
      }
    };
    operations.productsArrayToSearch = async (value) => {
      const ticket = (generation.current['productsArrayToSearch'] || 0) + 1;
      generation.current['productsArrayToSearch'] = ticket;
      try {
        const data = await transport.productsArrayToSearch(
          B.buildParameters(value),
          sessionKey,
        );
        const result = B.buildSearchOptions(data);
        if (
          mounted.current &&
          currentSession.current === sessionKey &&
          generation.current['productsArrayToSearch'] === ticket
        )
          setProductsArray(result);
        return result;
      } catch (error) {
        reportRequestFailure('products.productsArrayToSearch', error);
        throw error;
      }
    };
    operations.validateProduct = async (value) => {
      try {
        const data = await transport.validateProduct(
          B.buildParameters(value),
          sessionKey,
        );
        const validation = B.buildCatalogValidation(data, value);
        const result = R.validateCatalogProduct(
          validation.items,
          validation.code,
        );
        if (result.error) {
          toast.error(result.error);
          return false;
        }
        return result;
      } catch (error) {
        reportRequestFailure('products.validateProduct', error);
        throw error;
      }
    };
    operations.validateDoubleOnProducts = async (value) => {
      try {
        const data = await transport.validateDoubleOnProducts(
          B.buildParameters(value, true),
          sessionKey,
        );
        return B.hasRecord(data);
      } catch (error) {
        if (error.response?.status === 404) return false;
        reportRequestFailure('products.validateDoubleOnProducts', error);
        throw error;
      }
    };
    operations.validateDoubleOnSets = async (value) => {
      try {
        const data = await transport.validateDoubleOnSets(
          B.buildParameters(value),
          sessionKey,
        );
        return B.hasRecord(data);
      } catch (error) {
        if (error.response?.status === 404) return false;
        reportRequestFailure('products.validateDoubleOnSets', error);
        throw error;
      }
    };
    operations.addProduct = async (value, signal) => {
      try {
        const result = await toast.promise(
          transport.addProduct(value, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao cadastrar produto. Verifique os campos do formulário e tente novamente.',
          },
        );
        await operations.listProducts().catch(() => {});
        return result;
      } catch (error) {
        reportRequestFailure('products.addProduct', error);
        throw error;
      }
    };
    operations.editProduct = async (value, signal) => {
      try {
        const result = await toast.promise(
          transport.editProduct(value, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao editar o cadastro do produto. Verifique os campos do formulário e tente novamente.',
          },
        );
        await operations.listProducts().catch(() => {});
        return result;
      } catch (error) {
        reportRequestFailure('products.editProduct', error);
        throw error;
      }
    };
    operations.deleteProduct = async (value, signal) => {
      try {
        const result = await toast.promise(
          transport.deleteProduct(B.buildParameters(value), signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao excluir o cadastro do produto. Verifique se existem roteiros de produção cadastrados neste código e tente novamente.',
          },
        );
        await operations.listProducts().catch(() => {});
        return result;
      } catch (error) {
        reportRequestFailure('products.deleteProduct', error);
        throw error;
      }
    };
    operations.buildProductForm = B.buildProductForm;
    operations.calculateMPWeight = R.calculateMPWeight;
    operations.formatWeight = R.formatWeight;
    operations.validateProductDimensions = R.validateProductDimensions;
    operations.saveProduct = async (data, options, signal) => {
      if (!options.isNew && options.product?.id == null)
        throw new Error('Identificador não informado.');
      return operations[options.isNew ? 'addProduct' : 'editProduct'](
        B.buildProductPayload(data, options),
        signal,
      );
    };
    operations.prepareNavigation = B.buildNavigation;
    operations.listCodeOptions = async () => {
      try {
        return B.buildCodeOptions(
          await transport.productsArrayToSearch(
            B.buildParameters(),
            sessionKey,
          ),
        );
      } catch (error) {
        reportRequestFailure('products.listCodeOptions', error);
        throw error;
      }
    };
    operations.listRawMaterialOptions = async () => {
      try {
        return B.buildRawMaterialOptions(
          await transport.validateRawMaterialCode(
            B.buildParameters(),
            sessionKey,
          ),
        );
      } catch (error) {
        reportRequestFailure('products.listRawMaterialOptions', error);
        throw error;
      }
    };
    operations.productProfiles = R.productProfiles;
    operations.isInvalidTube = R.isInvalidTube;
    operations.requiresDimensionB = R.requiresDimensionB;
    operations.normalizeDimensionInput = B.normalizeDimensionInput;
    operations.validateAvailableCode = async (code) => {
      const result = await operations.validateProduct(code);
      if (!result) return null;
      const product = await operations.validateDoubleOnProducts(code);
      const set = product ? false : await operations.validateDoubleOnSets(code);
      const error = R.duplicateCodeError(product, set);
      if (error) {
        toast.error(error);
        return null;
      }
      return result;
    };
    return operations;
  }, [sessionKey, mounted]);
  const permissions = useMemo(
    () => R.getPermissions(userData?.role),
    [userData?.role],
  );
  const value = useMemo(
    () => ({
      products,
      product,
      rawMaterialCode,
      productsArray,
      permissions,
      ...actions,
    }),
    [products, product, rawMaterialCode, productsArray, actions, permissions],
  );
  return createElement(Context.Provider, { value }, children);
}
ProductsProvider.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
};
