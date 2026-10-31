import { Navigate, useLocation } from 'react-router-dom';

import { ButtonBorder } from '../components/ButtonBorder';
import { useAutenticacao } from '../contexts/autenticacao';
import { hasPermission } from '../utils/hasPermission';
import { validateProp } from '../utils/validateProp';
import * as S from './styles';

export function ProtectedRoute({ children, permission }) {
  const location = useLocation();
  const { userData, userRole, isUserLoading, profileError, retryProfile } =
    useAutenticacao();
  if (!userData?.token)
    return <Navigate to="/" replace state={{ from: location }} />;
  if (isUserLoading)
    return (
      <S.State role="status" className="loading-message">
        Carregando...
      </S.State>
    );
  if (profileError && !userRole)
    return (
      <S.State role="alert">
        <p>Não foi possível carregar suas permissões.</p>
        <ButtonBorder type="button" onClick={retryProfile}>
          Tentar novamente
        </ButtonBorder>
      </S.State>
    );
  if (permission && !hasPermission(userRole, permission, 'R'))
    return <Navigate to={permission === 'home' ? '/' : '/home'} replace />;
  return children;
}

ProtectedRoute.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
  permission: validateProp('string'),
};
