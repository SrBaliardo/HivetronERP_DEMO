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
import { createDemonstrationService } from '../../services/manufacturingSequences';
import { reportRequestFailure } from '../../utils/reportRequestFailure';
import { validateProp } from '../../utils/validateProp';
import { useAutenticacao } from '../autenticacao';
import * as B from './builders';
import { buildDemonstrationResponses } from './builders/demonstracao';
import * as R from './regras';

const transport = createDemonstrationService(buildDemonstrationResponses());

const Context = createContext();
export function useManufacturingSequences() {
  const value = useContext(Context);
  if (!value)
    throw new Error(
      'useManufacturingSequences requer ManufacturingSequencesProvider.',
    );
  return value;
}
export function ManufacturingSequencesProvider({ children }) {
  const { userData } = useAutenticacao();
  const sessionKey = userData?.token;
  const mounted = useMountedRef();
  const currentSession = useRef(sessionKey);
  currentSession.current = sessionKey;
  const generation = useRef({});
  const selectedItem = useRef(null);
  const settled = useRef(null);
  const [manufacturingSequences, setManufacturingSequences] = useState([]);
  const [itemsArray, setItemsArray] = useState([]);
  const actions = useMemo(() => {
    const operations = {};
    operations.listSequences = async (value) => {
      if (value === null || value === undefined)
        throw new Error('Identificador não informado.');
      if (
        settled.current?.id === value &&
        settled.current.sessionKey === sessionKey
      )
        return settled.current.data;
      selectedItem.current = value;
      const ticket = (generation.current['listSequences'] || 0) + 1;
      generation.current['listSequences'] = ticket;
      try {
        const data = await transport.listSequences(
          B.buildParameters(value),
          sessionKey,
        );
        const result = B.buildList(data);
        if (
          mounted.current &&
          currentSession.current === sessionKey &&
          generation.current['listSequences'] === ticket
        ) {
          setManufacturingSequences(result);
          settled.current = { id: value, data: result, sessionKey };
        }
        return result;
      } catch (error) {
        reportRequestFailure('manufacturingSequences.listSequences', error);
        throw error;
      }
    };
    operations.getSequence = async (value) => {
      if (value === null || value === undefined)
        throw new Error('Identificador não informado.');
      try {
        const data = await transport.getSequence(
          B.buildParameters(value),
          sessionKey,
        );
        return B.buildSequenceContent(
          data?.content ? data : { content: [data] },
        );
      } catch (error) {
        reportRequestFailure('manufacturingSequences.getSequence', error);
        throw error;
      }
    };
    operations.listAlternatives = async (id, number) => {
      try {
        return B.buildList(
          await transport.listAlternatives(
            B.buildAlternativeParameters(id, number),
            sessionKey,
          ),
        );
      } catch (error) {
        reportRequestFailure('manufacturingSequences.listAlternatives', error);
        throw error;
      }
    };
    operations.getSequenceData = async (value) => {
      if (value === null || value === undefined)
        throw new Error('Identificador não informado.');
      try {
        const data = await transport.getSequenceData(
          B.buildParameters(value),
          sessionKey,
        );
        return data;
      } catch (error) {
        reportRequestFailure('manufacturingSequences.getSequenceData', error);
        throw error;
      }
    };
    operations.getLastSequence = async (value) => {
      if (value === null || value === undefined)
        throw new Error('Identificador não informado.');
      try {
        const data = await transport.getLastSequence(
          B.buildParameters(value),
          sessionKey,
        );
        return data;
      } catch (error) {
        reportRequestFailure('manufacturingSequences.getLastSequence', error);
        throw error;
      }
    };
    operations.searchItemsByFilter = async (value) => {
      if (!value) return [];
      const ticket = (generation.current['searchItemsByFilter'] || 0) + 1;
      generation.current['searchItemsByFilter'] = ticket;
      try {
        const data = await transport.searchItemsByFilter(
          B.buildParameters(value),
          sessionKey,
        );
        const result = B.buildSearchOptions(data);
        if (
          mounted.current &&
          currentSession.current === sessionKey &&
          generation.current['searchItemsByFilter'] === ticket
        )
          setItemsArray(result);
        return data;
      } catch (error) {
        reportRequestFailure(
          'manufacturingSequences.searchItemsByFilter',
          error,
        );
        throw error;
      }
    };
    operations.getItemDetails = async (value) => {
      if (value === null || value === undefined)
        throw new Error('Identificador não informado.');
      try {
        const data = await transport.getItemDetails(
          B.buildParameters(value),
          sessionKey,
        );
        return data;
      } catch (error) {
        reportRequestFailure('manufacturingSequences.getItemDetails', error);
        throw error;
      }
    };
    operations.exportSequences = async (value, signal) => {
      try {
        const result = await toast.promise(
          transport.exportSequences(value, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error: 'Erro ao exportar as sequências.',
          },
        );
        settled.current = null;
        generation.current.listSequences =
          (generation.current.listSequences || 0) + 1;
        return result;
      } catch (error) {
        reportRequestFailure('manufacturingSequences.exportSequences', error);
        throw error;
      }
    };
    operations.addSequence = async (value, signal) => {
      try {
        const result = await toast.promise(
          transport.addSequence(value, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao adicionar a sequência ao roteiro. Verifique os campos do formulário e tente novamente.',
          },
        );
        settled.current = null;
        if (selectedItem.current != null)
          await operations.listSequences(selectedItem.current).catch(() => {});
        return result;
      } catch (error) {
        reportRequestFailure('manufacturingSequences.addSequence', error);
        throw error;
      }
    };
    operations.editSequence = async (value, signal) => {
      try {
        const result = await toast.promise(
          transport.editSequence(value, signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error:
              'Erro ao editar a sequência ao roteiro. Verifique os campos do formulário e tente novamente.',
          },
        );
        settled.current = null;
        if (selectedItem.current != null)
          await operations.listSequences(selectedItem.current).catch(() => {});
        return result;
      } catch (error) {
        reportRequestFailure('manufacturingSequences.editSequence', error);
        throw error;
      }
    };
    operations.deleteSequence = async (value, signal) => {
      try {
        const result = await toast.promise(
          transport.deleteSequence(B.buildParameters(value), signal),
          {
            pending: 'Preparando demonstração...',
            success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
            error: 'Erro ao excluir a sequência ao roteiro. Tente novamente.',
          },
        );
        settled.current = null;
        if (selectedItem.current != null)
          await operations.listSequences(selectedItem.current).catch(() => {});
        return result;
      } catch (error) {
        reportRequestFailure('manufacturingSequences.deleteSequence', error);
        throw error;
      }
    };
    operations.loadExportSequences = async (id) => {
      try {
        return B.buildList(
          await transport.listSequences(B.buildParameters(id), sessionKey),
        );
      } catch (error) {
        reportRequestFailure('manufacturingSequences.exportList', error);
        throw error;
      }
    };
    operations.searchExportItems = async (filter) => {
      try {
        return B.buildExportItemOptions(
          await transport.searchItemsByFilter(
            B.buildParameters(filter),
            sessionKey,
          ),
        );
      } catch (error) {
        reportRequestFailure('manufacturingSequences.exportItems', error);
        throw error;
      }
    };
    operations.exportSelectedSequences = (ids, destinations, signal) =>
      operations.exportSequences(
        B.buildExportPayload(ids, destinations),
        signal,
      );
    operations.exportSelectionError = R.exportSelectionError;
    operations.destinationSelectionError = R.destinationSelectionError;
    operations.buildEmptyTool = B.buildEmptyTool;
    operations.buildSequenceForm = B.buildSequenceForm;
    operations.nextSequence = R.nextSequence;
    operations.canSelectAsMain = R.canSelectAsMain;
    operations.validateSequence = R.validateSequence;
    operations.saveSequence = async (data, options, signal) => {
      if (!options.isNew && options.sequence?.id == null)
        throw new Error('Identificador não informado.');
      return operations[options.isNew ? 'addSequence' : 'editSequence'](
        B.buildSequencePayload(data, options.itemId, options.sequence),
        signal,
      );
    };
    operations.prepareExport = B.buildExportNavigation;
    return operations;
  }, [sessionKey, mounted]);
  const permissions = useMemo(
    () => R.getPermissions(userData?.role),
    [userData?.role],
  );
  const value = useMemo(
    () => ({
      manufacturingSequences,
      itemsArray,
      setManufacturingSequences,
      permissions,
      ...actions,
    }),
    [manufacturingSequences, itemsArray, actions, permissions],
  );
  return createElement(Context.Provider, { value }, children);
}
ManufacturingSequencesProvider.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
};
