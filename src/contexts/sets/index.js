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
import { createDemonstrationService } from '../../services/sets';
import { reportRequestFailure } from '../../utils/reportRequestFailure';
import { validateProp } from '../../utils/validateProp';
import { useAutenticacao } from '../autenticacao';
import * as B from './builders';
import { buildDemonstrationResponses } from './builders/demonstracao';
import * as R from './regras';

const transport = createDemonstrationService(buildDemonstrationResponses());

const Context = createContext();
export function useSets() {
  const value = useContext(Context);
  if (!value) throw new Error('useSets requer SetsProvider.');
  return value;
}
export function SetsProvider({ children }) {
  const { userData } = useAutenticacao();
  const sessionKey = userData?.token;
  const mounted = useMountedRef();
  const currentSession = useRef(sessionKey);
  currentSession.current = sessionKey;
  const generation = useRef({});
  const [setsState, setSets] = useState(null);
  const sets =
    setsState && setsState.sessionKey === sessionKey ? setsState.data : null;
  const [set] = useState([]);
  const [setsArray, setSetsArray] = useState([]);
  const actions = useMemo(() => {
    const operations = {};
    operations.listSets = async (value) => {
      const ticket = (generation.current['listSets'] || 0) + 1;
      generation.current['listSets'] = ticket;
      try {
        const data = await transport.listSets(
          B.buildParameters(value),
          sessionKey,
        );
        const result = B.buildList(data);
        if (
          mounted.current &&
          currentSession.current === sessionKey &&
          generation.current['listSets'] === ticket
        )
          setSets({ sessionKey, data: result });
        return result;
      } catch (error) {
        reportRequestFailure('sets.listSets', error);
        throw error;
      }
    };
    operations.getSetById = async (value) => {
      if (value === null || value === undefined)
        throw new Error('Identificador não informado.');
      try {
        const data = await transport.getSetById(
          B.buildParameters(value),
          sessionKey,
        );
        return data;
      } catch (error) {
        reportRequestFailure('sets.getSetById', error);
        throw error;
      }
    };
    operations.listRelatedSets = async (value) => {
      if (value === null || value === undefined)
        throw new Error('Identificador não informado.');
      try {
        const data = await transport.listRelatedSets(
          B.buildParameters(value),
          sessionKey,
        );
        return data;
      } catch (error) {
        reportRequestFailure('sets.listRelatedSets', error);
        throw error;
      }
    };
    operations.setsArrayToSearch = async (value) => {
      const ticket = (generation.current['setsArrayToSearch'] || 0) + 1;
      generation.current['setsArrayToSearch'] = ticket;
      try {
        const data = await transport.setsArrayToSearch(
          B.buildParameters(value),
          sessionKey,
        );
        const result = B.buildSearchOptions(data);
        if (
          mounted.current &&
          currentSession.current === sessionKey &&
          generation.current['setsArrayToSearch'] === ticket
        )
          setSetsArray(result);
        return result;
      } catch (error) {
        reportRequestFailure('sets.setsArrayToSearch', error);
        throw error;
      }
    };
    operations.validateSet = async (value) => {
      try {
        const data = await transport.validateSet(
          B.buildParameters(value),
          sessionKey,
        );
        const validation = B.buildCatalogValidation(data, value);
        const result = R.validateCatalogSet(validation.items, validation.code);
        if (result.error) {
          toast.error(result.error);
          return false;
        }
        return result;
      } catch (error) {
        reportRequestFailure('sets.validateSet', error);
        throw error;
      }
    };
    operations.validateDoubleOnProducts = async (value) => {
      try {
        const data = await transport.validateDoubleOnProducts(
          B.buildParameters(value),
          sessionKey,
        );
        return B.hasRecord(data);
      } catch (error) {
        if (error.response?.status === 404) return false;
        reportRequestFailure('sets.validateDoubleOnProducts', error);
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
        reportRequestFailure('sets.validateDoubleOnSets', error);
        throw error;
      }
    };
    operations.addSet = async (value, signal) => {
      try {
        const result = await toast.promise(transport.addSet(value, signal), {
          pending: 'Preparando demonstração...',
          success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
          error:
            'Erro ao cadastrar o conjunto. Verifique os campos do formulário e tente novamente.',
        });
        await operations.listSets().catch(() => {});
        return result;
      } catch (error) {
        reportRequestFailure('sets.addSet', error);
        throw error;
      }
    };
    operations.editSet = async (value, signal) => {
      try {
        const result = await toast.promise(transport.editSet(value, signal), {
          pending: 'Preparando demonstração...',
          success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
          error:
            'Erro ao editar o cadastro do conjunto. Verifique os campos do formulário e tente novamente.',
        });
        await operations.listSets().catch(() => {});
        return result;
      } catch (error) {
        reportRequestFailure('sets.editSet', error);
        throw error;
      }
    };
    operations.deleteSet = async (value, signal) => {
      try {
        const result = await toast.promise(
          transport.deleteSet(B.buildParameters(value), signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao excluir o cadastro do conjunto. Verifique se existem roteiros de produção cadastrados neste código e tente novamente.',
          },
        );
        await operations.listSets().catch(() => {});
        return result;
      } catch (error) {
        reportRequestFailure('sets.deleteSet', error);
        throw error;
      }
    };
    operations.buildSetForm = B.buildSetForm;
    operations.saveSet = async (data, options, signal) => {
      if (!options.isNew && options.set?.id == null)
        throw new Error('Identificador não informado.');
      return operations[options.isNew ? 'addSet' : 'editSet'](
        B.buildSetPayload(data, options),
        signal,
      );
    };
    operations.prepareNavigation = B.buildNavigation;
    operations.listCodeOptions = async () => {
      try {
        return B.buildCodeOptions(
          await transport.setsArrayToSearch(B.buildParameters(), sessionKey),
        );
      } catch (error) {
        reportRequestFailure('sets.listCodeOptions', error);
        throw error;
      }
    };
    operations.validateAvailableCode = async (code) => {
      const result = await operations.validateSet(code);
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
    () => ({ sets, set, setsArray, permissions, ...actions }),
    [sets, set, setsArray, actions, permissions],
  );
  return createElement(Context.Provider, { value }, children);
}
SetsProvider.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
};
