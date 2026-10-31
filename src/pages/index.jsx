import { lazy } from 'react';

export const Login = lazy(() =>
  import('./autenticacao/login').then((module) => ({ default: module.Login })),
);
export const Home = lazy(() =>
  import('./Home').then((module) => ({ default: module.Home })),
);
export const Bom = lazy(() =>
  import('./Bom/administracao').then((module) => ({ default: module.Bom })),
);
export const BomProducts = lazy(() =>
  import('./Bom/administracao').then((module) => ({
    default: module.BomProducts,
  })),
);
export const BomSets = lazy(() =>
  import('./Bom/administracao').then((module) => ({ default: module.BomSets })),
);
export const Scripting = lazy(() =>
  import('./Scripting/administracao').then((module) => ({
    default: module.Scripting,
  })),
);
export const Settings = lazy(() =>
  import('./configuracoes/administracao').then((module) => ({
    default: module.Settings,
  })),
);
export const Scanning = lazy(() =>
  import('./Scanning/administracao').then((module) => ({
    default: module.Scanning,
  })),
);
export const ScanningOrders = lazy(() =>
  import('./Scanning/administracao').then((module) => ({
    default: module.ScanningOrders,
  })),
);
export const ScanningInspectionStep1 = lazy(() =>
  import('./Scanning/administracao').then((module) => ({
    default: module.ScanningInspectionStep1,
  })),
);
export const ScanningInspectionStep2 = lazy(() =>
  import('./Scanning/administracao').then((module) => ({
    default: module.ScanningInspectionStep2,
  })),
);
export const ScanningInspectionStep3 = lazy(() =>
  import('./Scanning/administracao').then((module) => ({
    default: module.ScanningInspectionStep3,
  })),
);
export const ScanningInspectionStep4 = lazy(() =>
  import('./Scanning/administracao').then((module) => ({
    default: module.ScanningInspectionStep4,
  })),
);
export const ScanningInspectionStep5 = lazy(() =>
  import('./Scanning/administracao').then((module) => ({
    default: module.ScanningInspectionStep5,
  })),
);
export const Pcp = lazy(() =>
  import('./Scanning/gestao').then((module) => ({ default: module.Pcp })),
);
export const PcpServiceOrders = lazy(() =>
  import('./Scanning/gestao').then((module) => ({
    default: module.PcpServiceOrders,
  })),
);
export const PcpCutOrders = lazy(() =>
  import('./Scanning/gestao').then((module) => ({
    default: module.PcpCutOrders,
  })),
);
export const Appointment = lazy(() =>
  import('./Appointment/administracao').then((module) => ({
    default: module.Appointment,
  })),
);
