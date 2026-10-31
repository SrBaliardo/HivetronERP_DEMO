import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { createDemonstrationService } from '../../services/usuarios';
import { reportRequestFailure } from '../../utils/reportRequestFailure';
import { useAutenticacao } from '../autenticacao';
import { buildUserForm, buildUserList, buildUserPayload } from './builders';
import { buildDemonstrationResponses } from './builders/demonstracao';
import { userPermissions, userRoles } from './regras';

const { createUser, fetchUsers, removeUser, updateUser } =
  createDemonstrationService(buildDemonstrationResponses());

export function useUsuarios() {
  const { userData, userRole } = useAutenticacao();
  const token = userData.token;
  const listUsers = useCallback(
    () =>
      fetchUsers(token)
        .then(buildUserList)
        .catch((error) => {
          reportRequestFailure('Erro ao buscar usuários.', error);
          throw error;
        }),
    [token],
  );
  const saveUser = useCallback(async (values, user, signal) => {
    const payload = buildUserPayload(values, user);
    return toast
      .promise(
        user ? updateUser(payload, signal) : createUser(payload, signal),
        {
          pending: 'Preparando demonstração...',
          success: user
            ? 'Demonstração: ação simulada; nenhum dado foi gravado.'
            : 'Demonstração: ação simulada; nenhum dado foi gravado.',
          error: user
            ? 'Erro ao editar usuário. Verifique sua conexão e tente novamente.'
            : 'Erro ao criar usuário. Verifique sua conexão e tente novamente.',
        },
      )
      .catch((error) => {
        reportRequestFailure('Erro ao salvar usuários.', error);
        throw error;
      });
  }, []);
  const deleteUser = useCallback(
    (id, signal) =>
      toast
        .promise(removeUser(id, signal), {
          pending: 'Preparando demonstração...',
          success: 'Demonstração: ação simulada; nenhum dado foi gravado.',
          error:
            'Erro ao deletar usuário. Verifique sua conexão e tente novamente.',
        })
        .catch((error) => {
          reportRequestFailure('Erro ao excluir usuários.', error);
          throw error;
        }),
    [],
  );
  return {
    listUsers,
    saveUser,
    deleteUser,
    prepareUserForm: buildUserForm,
    roles: userRoles,
    permissions: userPermissions(userRole),
  };
}
