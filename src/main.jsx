import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ErrorBoundary } from './components/ErrorBoundary';
import { RecoveryNotice } from './components/RecoveryNotice';
import { AutenticacaoProvider } from './contexts/autenticacao';
import { LoadingProvider } from './contexts/LoadingContext.jsx';
import { ScreenProvider } from './contexts/ScreenContext.jsx';
import {
  ThemeContextProvider,
  useThemeContext,
} from './contexts/ThemeContext.jsx';
import { router } from './routes';
import * as S from './styles/applicationStyles';
import GlobalStyles from './styles/globalStyles.js';
import ThemeStyles from './styles/themeStyles.js';

function App() {
  const { isDarkTheme } = useThemeContext();

  return (
    <>
      <Suspense
        fallback={
          <S.PageLoading role="status" className="loading-message">
            Carregando...
          </S.PageLoading>
        }
      >
        <S.DemonstrationNotice role="note">
          <strong>Hivetron ERP · Demonstração</strong>
          <span>
            Explore telas e modais. Dados fictícios; alterações não são
            gravadas. PDFs disponíveis.
          </span>
        </S.DemonstrationNotice>
        <RouterProvider router={router} />
      </Suspense>
      <ToastContainer theme={isDarkTheme ? 'dark' : 'light'} autoClose={5000} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <GlobalStyles />
      <ThemeStyles />
      <ErrorBoundary
        renderFallback={(error, retry) => (
          <RecoveryNotice
            error={error}
            onRetry={retry}
            onHome={() => window.location.assign('/')}
            onReload={() => window.location.reload()}
          />
        )}
      >
        <LoadingProvider>
          <AutenticacaoProvider>
            <ScreenProvider>
              <App />
            </ScreenProvider>
          </AutenticacaoProvider>
        </LoadingProvider>
      </ErrorBoundary>
    </ThemeContextProvider>
  </React.StrictMode>,
);
