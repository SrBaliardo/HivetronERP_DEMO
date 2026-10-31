import { useCallback } from 'react';

import { createDemonstrationService } from '../../services/inputs';
import { reportRequestFailure } from '../../utils/reportRequestFailure';
import { useAutenticacao } from '../autenticacao';
import { buildOptions } from './builders';
import { buildDemonstrationResponses } from './builders/demonstracao';

const { readCatalog } = createDemonstrationService(
  buildDemonstrationResponses(),
);

export function useInputsCatalog() {
  const { userData } = useAutenticacao();
  const token = userData?.token;
  const load = useCallback(async () => {
    try {
      return buildOptions(await readCatalog(token));
    } catch (error) {
      reportRequestFailure('inputs.catalog', error);
      throw error;
    }
  }, [token]);
  return { load };
}
