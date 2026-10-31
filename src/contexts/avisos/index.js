import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { createDemonstrationService } from '../../services/avisos';
import { reportRequestFailure } from '../../utils/reportRequestFailure';
import { useAutenticacao } from '../autenticacao';
import {
  buildNoticeForm,
  buildNoticeList,
  buildNoticePayload,
} from './builders';
import { buildDemonstrationResponses } from './builders/demonstracao';
import { hasNoticeCapacity, noticePermissions } from './regras';

const { createNotice, fetchNotices, removeNotice, updateNotice } =
  createDemonstrationService(buildDemonstrationResponses());

export function useAvisos() {
  const { userData, userRole } = useAutenticacao();
  const token = userData.token;
  const listNotices = useCallback(
    () =>
      fetchNotices(token)
        .then(buildNoticeList)
        .catch((error) => {
          reportRequestFailure('Erro ao buscar avisos.', error);
          throw error;
        }),
    [token],
  );
  const saveNotice = useCallback((values, notice, signal) => {
    const payload = buildNoticePayload(values, notice);
    return toast
      .promise(
        notice ? updateNotice(payload, signal) : createNotice(payload, signal),
        {
          pending: 'Preparando demonstração...',
          success: notice
            ? 'Demonstração: ação simulada; nenhum dado foi gravado.'
            : 'Demonstração: ação simulada; nenhum dado foi gravado.',
          error: notice
            ? 'Erro ao editar o aviso. Verifique suas credenciais/campos do formulário e tente novamente.'
            : 'Erro ao criar o aviso. Verifique suas credenciais/campos do formulário e tente novamente.',
        },
      )
      .catch((error) => {
        reportRequestFailure('Erro ao salvar avisos.', error);
        throw error;
      });
  }, []);
  const deleteNotice = useCallback(
    (id, signal) =>
      toast
        .promise(removeNotice(id, signal), {
          pending: 'Preparando demonstração...',
          success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
          error:
            'Erro ao excluir o aviso. Verifique suas credenciais e tente novamente.',
        })
        .catch((error) => {
          reportRequestFailure('Erro ao excluir avisos.', error);
          throw error;
        }),
    [],
  );
  return {
    listNotices,
    saveNotice,
    deleteNotice,
    prepareNoticeForm: buildNoticeForm,
    hasCapacity: hasNoticeCapacity,
    permissions: noticePermissions(userRole),
  };
}
