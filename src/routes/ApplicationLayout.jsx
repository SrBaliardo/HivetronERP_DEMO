import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { ContentBoundary } from '../components/ContentBoundary';
import { RouteLoading } from '../components/RouteLoading';
import { AppointmentProvider } from '../contexts/appointment/index.js';
import { useAutenticacao } from '../contexts/autenticacao';
import { ComponentsProvider } from '../contexts/components';
import { MachinesProvider } from '../contexts/machines/index.js';
import { ManufacturingSequencesProvider } from '../contexts/manufacturingSequences/index.js';
import { NavigationGuardProvider } from '../contexts/NavigationGuardContext';
import { OperationsProvider } from '../contexts/operations/index.js';
import { ProductsProvider } from '../contexts/products';
import { ScanningProvider } from '../contexts/scanning/index.js';
import { SetsProvider } from '../contexts/sets';
import { ToolsProvider } from '../contexts/tools/index.js';

// Mantém os estados das áreas internas entre rotas sem carregar dados no login.
export function ApplicationLayout() {
  const { userData } = useAutenticacao();
  if (!userData?.token) return <Navigate to="/" replace />;
  return (
    <ProductsProvider key={userData.token}>
      <SetsProvider>
        <ComponentsProvider>
          <OperationsProvider>
            <MachinesProvider>
              <ToolsProvider>
                <ManufacturingSequencesProvider>
                  <ScanningProvider>
                    <AppointmentProvider>
                      <NavigationGuardProvider>
                        <ContentBoundary shell>
                          <Suspense fallback={<RouteLoading />}>
                            <Outlet />
                          </Suspense>
                        </ContentBoundary>
                      </NavigationGuardProvider>
                    </AppointmentProvider>
                  </ScanningProvider>
                </ManufacturingSequencesProvider>
              </ToolsProvider>
            </MachinesProvider>
          </OperationsProvider>
        </ComponentsProvider>
      </SetsProvider>
    </ProductsProvider>
  );
}
