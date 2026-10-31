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
import { createDemonstrationService } from '../../services/appointment';
import { reportRequestFailure } from '../../utils/reportRequestFailure';
import { validateProp } from '../../utils/validateProp';
import { useAutenticacao } from '../autenticacao';
import * as B from './builders';
import { buildDemonstrationResponses } from './builders/demonstracao';
import * as R from './regras';
const T = createDemonstrationService(buildDemonstrationResponses());
const Context = createContext();
export function useAppointment() {
  const value = useContext(Context);
  if (!value) throw new Error('useAppointment requer AppointmentProvider.');
  return value;
}
export function AppointmentProvider({ children, transport = T }) {
  const { userData } = useAutenticacao();
  const token = userData?.token;
  const mounted = useMountedRef();
  const session = useRef(token);
  session.current = token;
  const cache = useRef({ token, items: null, generation: 0 });
  if (cache.current.token !== token)
    cache.current = { token, items: null, generation: 0 };
  const [state, setState] = useState({ token, items: null });
  const actions = useMemo(() => {
    const read = async (force) => {
      if (!force && cache.current.items !== null) return cache.current.items;
      const ticket = ++cache.current.generation;
      try {
        const items = B.buildList(await transport.listPointedOrders(token));
        if (
          mounted.current &&
          session.current === token &&
          cache.current.generation === ticket
        ) {
          cache.current.items = items;
          setState({ token, items });
        }
        return items;
      } catch (error) {
        reportRequestFailure('appointment.list', error);
        throw error;
      }
    };
    return {
      listPointedOrders: () => read(true),
      loadPointedOrders: () => read(false),
      getPointedOrderById: async (value) => {
        try {
          return await transport.getPointedOrderById(
            B.buildIdentifier(value),
            token,
          );
        } catch (error) {
          reportRequestFailure('appointment.detail', error);
          throw error;
        }
      },
      addAppointment: async (value, signal) => {
        try {
          const result = await toast.promise(
            transport.addAppointment(B.buildIdentifier(value), signal),
            {
              pending: 'Preparando demonstração...',
              success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
              error:
                'Erro ao realizar apontamento. Verifique o código de barras e tente novamente.',
            },
          );
          if (session.current === token) {
            cache.current.items = null;
            cache.current.generation++;
            if (mounted.current) setState({ token, items: null });
          }
          return result;
        } catch (error) {
          reportRequestFailure('appointment.register', error);
          throw error;
        }
      },
      canRegister: R.canRegister,
      validDateRange: R.validDateRange,
      filterOrders: R.filterOrders,
      exportOrders: R.exportOrders,
    };
  }, [token, mounted, transport]);
  const value = useMemo(
    () => ({
      ...actions,
      isDemonstration: transport.demonstration === true,
      pointedOrder: state.token === token ? state.items : null,
      sessionKey: token,
      role: userData?.role,
    }),
    [actions, state, token, userData?.role, transport],
  );
  return createElement(Context.Provider, { value }, children);
}
AppointmentProvider.propTypes = {
  transport: validateProp('object'),
  children: validateProp(['object', 'string', 'number', 'boolean']),
};
