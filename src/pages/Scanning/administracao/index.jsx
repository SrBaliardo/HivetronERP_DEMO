import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Header } from '../../../components/Header';
import { SideMenu } from '../../../components/SideMenu';
import { Tab } from '../../../components/Tab';
import { validateProp } from '../../../utils/validateProp';
import { InspectionPage } from '../inspecoes';
import { ScanningOrdersContent } from '../ordens';
import { ScanningList1 } from './components/List1';
import { ScanningList2 } from './components/List2';
import { ScanningList3 } from './components/List3';
import * as S from './styles';
function Layout({ title, children }) {
  return (
    <S.Container>
      <Header />
      <S.ContainerItensContent>
        <SideMenu />
        <S.ContainerContent className="background-content">
          <h1>{title}</h1>
          {children}
        </S.ContainerContent>
      </S.ContainerItensContent>
    </S.Container>
  );
}
const titles = {
  1: 'Notas de Remessa',
  2: 'Romaneios de Inspeção',
  3: 'Digitalizar Ordem de Serviço',
};
export function Scanning() {
  const location = useLocation();
  const [active, setActive] = useState(location.state?.tabKey || '1');
  useEffect(() => {
    setActive(location.state?.tabKey || '1');
  }, [location.key, location.state]);
  const items = [
    {
      key: '1',
      label: 'Notas de Remessa',
      children: <ScanningList1 active={active === '1'} />,
    },
    {
      key: '2',
      label: 'Romaneios de Inspeção',
      children: <ScanningList2 active={active === '2'} />,
    },
    {
      key: '3',
      label: 'Digitalizar O.S.',
      children: <ScanningList3 active={active === '3'} />,
    },
  ];
  return (
    <Layout title={titles[active]}>
      <Tab
        injectOnChange={false}
        tabItems={items}
        activeKey={active}
        onTabChange={setActive}
        page="scanning"
      />
    </Layout>
  );
}
function InspectionRoute({ step }) {
  return (
    <Layout title="Cadastrar Inspeção">
      <Tab
        injectOnChange={false}
        tabItems={[
          {
            key: String(step + 9),
            label: 'Inspeção',
            children: <InspectionPage step={step} />,
          },
        ]}
        activeKey={String(step + 9)}
        page={'scanningInspectionStep' + step}
      />
    </Layout>
  );
}
export function ScanningInspectionStep1() {
  return <InspectionRoute step={1} />;
}
export function ScanningInspectionStep2() {
  return <InspectionRoute step={2} />;
}
export function ScanningInspectionStep3() {
  return <InspectionRoute step={3} />;
}
export function ScanningInspectionStep4() {
  return <InspectionRoute step={4} />;
}
export function ScanningInspectionStep5() {
  return <InspectionRoute step={5} />;
}
export function ScanningOrders() {
  const location = useLocation();
  const [active, setActive] = useState(location.state?.tabKey || '15');
  useEffect(() => {
    setActive(location.state?.tabKey || '15');
  }, [location.key, location.state]);
  return (
    <Layout
      title={
        active === '16'
          ? 'Detalhes da OS'
          : 'Ordens relacionadas ao código: ' +
            (location.state?.orderCode || 'code')
      }
    >
      <ScanningOrdersContent active={active} onChange={setActive} />
    </Layout>
  );
}

Layout.propTypes = {
  title: validateProp('string'),
  children: validateProp(['object', 'string']),
};

InspectionRoute.propTypes = { step: validateProp('number') };
