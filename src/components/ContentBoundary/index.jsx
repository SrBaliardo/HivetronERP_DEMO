import { useLocation, useNavigate } from 'react-router-dom';

import { useNavigationConfirmation } from '../../hooks/useUnsavedChanges';
import { validateProp } from '../../utils/validateProp';
import { ErrorBoundary } from '../ErrorBoundary';
import { RecoveryNotice } from '../RecoveryNotice';
import { RouteLoading } from '../RouteLoading';

export function ContentBoundary({ children, shell = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const confirmNavigation = useNavigationConfirmation();
  return (
    <ErrorBoundary
      resetKey={location.key}
      renderFallback={(error, retry) => {
        const notice = (
          <RecoveryNotice
            error={error}
            onRetry={retry}
            onHome={() => confirmNavigation(() => navigate('/home'))}
            onReload={() => confirmNavigation(() => window.location.reload())}
          />
        );
        return shell ? <RouteLoading>{notice}</RouteLoading> : notice;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

ContentBoundary.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
  shell: validateProp('boolean'),
};
