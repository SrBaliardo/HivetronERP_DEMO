import { useEffect } from 'react';
import { useLocation, useNavigate, useRouteError } from 'react-router-dom';

import { RecoveryNotice } from '../components/RecoveryNotice';
import { reportUiFailure } from '../utils/uiFailure';

export function RouteErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => reportUiFailure(error), [error]);
  return (
    <RecoveryNotice
      error={error}
      onRetry={() =>
        navigate(location.pathname + location.search + location.hash, {
          replace: true,
          state: location.state,
        })
      }
      onHome={() => navigate('/')}
      onReload={() => window.location.reload()}
    />
  );
}
