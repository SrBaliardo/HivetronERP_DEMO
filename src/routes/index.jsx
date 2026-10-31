import { createBrowserRouter } from 'react-router-dom';

import {
  Login,
  Home,
  Bom,
  BomProducts,
  BomSets,
  Scripting,
  Scanning,
  ScanningInspectionStep1,
  ScanningInspectionStep2,
  ScanningInspectionStep3,
  ScanningInspectionStep4,
  ScanningInspectionStep5,
  ScanningOrders,
  Pcp,
  PcpServiceOrders,
  PcpCutOrders,
  Appointment,
  Settings,
} from '../pages';
import { ApplicationLayout } from './ApplicationLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { RouteErrorPage } from './RouteErrorPage';

export const router = createBrowserRouter([
  {
    errorElement: <RouteErrorPage />,
    path: '/',
    element: <Login />,
  },

  {
    element: <ApplicationLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: '/home',
        element: (
          <ProtectedRoute permission="home">
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: '/bom',
        element: (
          <ProtectedRoute permission="bom">
            <Bom />
          </ProtectedRoute>
        ),
      },

      {
        path: '/bom-products',
        element: (
          <ProtectedRoute permission="bomProducts">
            <BomProducts />
          </ProtectedRoute>
        ),
      },

      {
        path: '/bom-sets',
        element: (
          <ProtectedRoute permission="bomSets">
            <BomSets />
          </ProtectedRoute>
        ),
      },

      {
        path: '/scripting',
        element: (
          <ProtectedRoute permission="scripting">
            <Scripting />
          </ProtectedRoute>
        ),
      },

      {
        path: '/scanning',
        element: (
          <ProtectedRoute permission="scanning">
            <Scanning />
          </ProtectedRoute>
        ),
      },

      {
        path: '/scanning-inspection-step1',
        element: (
          <ProtectedRoute permission="scanningInspectionStep1">
            <ScanningInspectionStep1 />
          </ProtectedRoute>
        ),
      },

      {
        path: '/scanning-inspection-step2',
        element: (
          <ProtectedRoute permission="scanningInspectionStep2">
            <ScanningInspectionStep2 />
          </ProtectedRoute>
        ),
      },

      {
        path: '/scanning-inspection-step3',
        element: (
          <ProtectedRoute permission="scanningInspectionStep3">
            <ScanningInspectionStep3 />
          </ProtectedRoute>
        ),
      },

      {
        path: '/scanning-inspection-step4',
        element: (
          <ProtectedRoute permission="scanningInspectionStep4">
            <ScanningInspectionStep4 />
          </ProtectedRoute>
        ),
      },

      {
        path: '/scanning-inspection-step5',
        element: (
          <ProtectedRoute permission="scanningInspectionStep5">
            <ScanningInspectionStep5 />
          </ProtectedRoute>
        ),
      },

      {
        path: '/scanning-orders',
        element: (
          <ProtectedRoute permission="scanningOrders">
            <ScanningOrders />
          </ProtectedRoute>
        ),
      },

      {
        path: '/pcp',
        element: (
          <ProtectedRoute permission="pcp">
            <Pcp />
          </ProtectedRoute>
        ),
      },

      {
        path: '/pcp-service-orders',
        element: (
          <ProtectedRoute permission="pcpServiceOrders">
            <PcpServiceOrders />
          </ProtectedRoute>
        ),
      },

      {
        path: '/pcp-cut-orders',
        element: (
          <ProtectedRoute permission="pcpCutOrders">
            <PcpCutOrders />
          </ProtectedRoute>
        ),
      },

      {
        path: '/appointment',
        element: (
          <ProtectedRoute permission="appointment">
            <Appointment />
          </ProtectedRoute>
        ),
      },

      {
        path: '/settings',
        element: (
          <ProtectedRoute permission="settings">
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
