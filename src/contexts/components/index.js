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
import { createDemonstrationService } from '../../services/components';
import { reportRequestFailure } from '../../utils/reportRequestFailure';
import { validateProp } from '../../utils/validateProp';
import { useAutenticacao } from '../autenticacao';
import * as B from './builders';
import { buildDemonstrationResponses } from './builders/demonstracao';
import * as R from './regras';

const transport = createDemonstrationService(buildDemonstrationResponses());

const Context = createContext();
export function useComponents() {
  const value = useContext(Context);
  if (!value) throw new Error('useComponents requer ComponentsProvider.');
  return value;
}
export function ComponentsProvider({ children }) {
  const { userData } = useAutenticacao();
  const sessionKey = userData?.token;
  const mounted = useMountedRef();
  const currentSession = useRef(sessionKey);
  currentSession.current = sessionKey;
  const generation = useRef({});
  const [components] = useState([]);
  const [allCodes, setAllCodes] = useState(null);
  const actions = useMemo(() => {
    const operations = {};
    operations.listAllCodes = async (value) => {
      const ticket = (generation.current['listAllCodes'] || 0) + 1;
      generation.current['listAllCodes'] = ticket;
      try {
        const data = await transport.listAllCodes(
          B.buildParameters(value),
          sessionKey,
        );
        const result = B.buildList(data);
        if (
          mounted.current &&
          currentSession.current === sessionKey &&
          generation.current['listAllCodes'] === ticket
        )
          setAllCodes(result);
        return result;
      } catch (error) {
        reportRequestFailure('components.listAllCodes', error);
        throw error;
      }
    };
    operations.validateOnProducts = async (value) => {
      try {
        const data = await transport.validateOnProducts(
          B.buildParameters(value),
          sessionKey,
        );
        return B.buildComponentReference(data);
      } catch (error) {
        if (error.response?.status === 404) return null;
        reportRequestFailure('components.validateOnProducts', error);
        throw error;
      }
    };
    operations.validateOnSets = async (value) => {
      try {
        const data = await transport.validateOnSets(
          B.buildParameters(value),
          sessionKey,
        );
        return B.buildComponentReference(data);
      } catch (error) {
        if (error.response?.status === 404) return null;
        reportRequestFailure('components.validateOnSets', error);
        throw error;
      }
    };
    operations.validateHierarchy = async (value) => {
      if (value === null || value === undefined)
        throw new Error('Identificador não informado.');
      try {
        const data = await transport.validateHierarchy(
          B.buildParameters(value),
          sessionKey,
        );
        return B.buildList(data?.components);
      } catch (error) {
        if (error.response?.status === 404) return [];
        reportRequestFailure('components.validateHierarchy', error);
        throw error;
      }
    };
    operations.addComponent = async (value, signal) => {
      try {
        const result = await toast.promise(
          transport.addComponent(value, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao adicionar o componente. Verifique o código/quantidade e tente novamente.',
          },
        );
        return result;
      } catch (error) {
        reportRequestFailure('components.addComponent', error);
        throw error;
      }
    };
    operations.editComponent = async (
      value,
      currentItemCode,
      otherItemCode,
      signal,
    ) => {
      try {
        const result = await toast.promise(
          transport.editComponent(
            B.buildMoveParameters(value, currentItemCode, otherItemCode),
            signal,
          ),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao alterar a posição dos componentes. Verifique sua conexão e tente novamente.',
          },
        );
        return result;
      } catch (error) {
        reportRequestFailure('components.editComponent', error);
        throw error;
      }
    };
    operations.deleteComponent = async (value, setId, signal) => {
      try {
        const result = await toast.promise(
          transport.deleteComponent(
            B.buildDeleteParameters(value, setId),
            signal,
          ),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao excluir o componente. Verifique sua conexão e tente novamente.',
          },
        );
        return result;
      } catch (error) {
        reportRequestFailure('components.deleteComponent', error);
        throw error;
      }
    };
    operations.loadStructure = async (parent) =>
      B.buildRoot(parent, await operations.validateHierarchy(parent.id));
    operations.componentAdditionError = R.componentAdditionError;
    operations.adjacentComponent = R.adjacentComponent;
    operations.findComponentId = R.findComponentId;
    operations.canChangeComponent = R.canChangeComponent;
    operations.listCodeOptions = async () => {
      try {
        return B.buildCodeOptions(
          await transport.listAllCodes(B.buildParameters(), sessionKey),
        );
      } catch (error) {
        reportRequestFailure('components.listCodeOptions', error);
        throw error;
      }
    };
    operations.addChild = async (code, setId, amount, signal) => {
      const item =
        (await operations.validateOnProducts(code)) ||
        (await operations.validateOnSets(code));
      if (!item) {
        toast.error('Código não encontrado.');
        return false;
      }
      await operations.addComponent(
        B.buildComponentPayload(item.id, setId, amount),
        signal,
      );
      return true;
    };
    return operations;
  }, [sessionKey, mounted]);
  const value = useMemo(
    () => ({ components, allCodes, ...actions }),
    [components, allCodes, actions],
  );
  return createElement(Context.Provider, { value }, children);
}
ComponentsProvider.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
};
