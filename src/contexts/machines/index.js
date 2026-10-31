import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { useMountedRef } from '../../hooks/useMountedRef';
import { createDemonstrationService } from '../../services/machines';
import { reportRequestFailure } from '../../utils/reportRequestFailure';
import { validateProp } from '../../utils/validateProp';
import { useAutenticacao } from '../autenticacao';
import * as B from './builders';
import { buildDemonstrationResponses } from './builders/demonstracao';
import * as R from './regras';

const transport = createDemonstrationService(buildDemonstrationResponses());

const Context = createContext();
const emptyValues = {};
export function useMachines() {
  const value = useContext(Context);
  if (!value) throw new Error('useMachines requer MachinesProvider.');
  return value;
}
export function MachinesProvider({ children }) {
  const { userData } = useAutenticacao();
  const token = userData?.token;
  const mounted = useMountedRef();
  const currentSession = useRef(token);
  currentSession.current = token;
  const cache = useRef({ token, values: {} });
  if (cache.current.token !== token) cache.current = { token, values: {} };
  const generation = useRef({});
  const [state, setState] = useState({ token, values: {} });
  const actions = useMemo(() => {
    const read = async (key, operation, build, force = false) => {
      if (
        !force &&
        cache.current.token === token &&
        cache.current.values[key] !== undefined
      )
        return cache.current.values[key];
      const ticket = (generation.current[key] || 0) + 1;
      generation.current[key] = ticket;
      try {
        const result = build(await operation(token));
        if (
          mounted.current &&
          currentSession.current === token &&
          generation.current[key] === ticket
        ) {
          cache.current.values[key] = result;
          setState((previous) => ({
            token,
            values: {
              ...(previous.token === token ? previous.values : {}),
              [key]: result,
            },
          }));
        }
        return result;
      } catch (error) {
        reportRequestFailure('machines.' + key, error);
        throw error;
      }
    };
    const invalidate = () => {
      for (const key of ['all', 'page']) {
        delete cache.current.values[key];
        generation.current[key] = (generation.current[key] || 0) + 1;
      }
      if (mounted.current && currentSession.current === token)
        setState((previous) => ({
          token,
          values: {
            ...(previous.token === token ? previous.values : {}),
            all: null,
            page: [],
          },
        }));
    };
    const mutate = async (kind, payload, signal) => {
      try {
        const result = await toast.promise(
          transport[kind + 'Record'](payload, signal),
          {
            create: {
              pending: 'Preparando demonstração...',
              success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
              error:
                'Erro ao cadastrar a máquina. Verifique os campos do formulário e tente novamente.',
            },
            update: {
              pending: 'Preparando demonstração...',
              success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
              error:
                'Erro ao editar o cadastro da máquina. Verifique os campos do formulário e tente novamente.',
            },
            delete: {
              pending: 'Preparando demonstração...',
              success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
              error:
                'Erro ao excluir o cadastro. Verifique se está sendo utilizado em algum PRODUTO/CONJUNTO/SEQUÊNCIA.',
            },
          }[kind],
        );
        if (currentSession.current === token) invalidate();
        return result;
      } catch (error) {
        reportRequestFailure('machines.' + kind, error);
        throw error;
      }
    };
    const operations = {
      listMachines: () => read('page', transport.readList, B.buildPage, true),
      listAllMachines: () =>
        read('all', transport.readCatalog, B.buildList, true),
      loadList: () => read('all', transport.readCatalog, B.buildList),
      listAllMachineGroups: () =>
        read('auxiliary', transport.readAuxiliary, B.buildList, true),
      loadAuxiliaryOptions: async () =>
        B.buildAuxiliaryOptions(
          await read('auxiliary', transport.readAuxiliary, B.buildList),
        ),
      addMachine: (payload, signal) => mutate('create', payload, signal),
      editMachine: (payload, signal) => mutate('update', payload, signal),
      deleteMachine: (id, signal) =>
        mutate('delete', B.buildParameters(id), signal),
      buildForm: B.buildForm,
      saveRecord: (data, record, isNew, signal) => {
        if (!isNew && record?.id == null)
          throw new Error('Identificador não informado.');
        return mutate(
          isNew ? 'create' : 'update',
          B.buildPayload(data, isNew ? null : record),
          signal,
        );
      },
    };
    return operations;
  }, [token, mounted]);
  const permissions = useMemo(
    () => R.getPermissions(userData?.role),
    [userData?.role],
  );
  const values = state.token === token ? state.values : emptyValues;
  const value = useMemo(
    () => ({
      machines: values.page || [],
      allMachines: values.all ?? null,
      machineGroups: values.auxiliary || [],
      permissions,
      ...actions,
    }),
    [values, permissions, actions],
  );
  return createElement(Context.Provider, { value }, children);
}
MachinesProvider.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
};

export function useMachinesCatalog() {
  const { userData } = useAutenticacao();
  const token = userData?.token;
  const load = useCallback(async () => {
    try {
      return B.buildOptions(await transport.readCatalog(token));
    } catch (error) {
      reportRequestFailure('machines.catalog', error);
      throw error;
    }
  }, [token]);
  return { load, selectionError: R.selectionError };
}
