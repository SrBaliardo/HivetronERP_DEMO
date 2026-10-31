import { CaretLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ButtonBorder } from '../../../components/ButtonBorder';
import { Header } from '../../../components/Header';
import { SideMenu } from '../../../components/SideMenu';
import { Tab } from '../../../components/Tab';
import { validateProp } from '../../../utils/validateProp';
import { PcpCutOrderDetail } from '../cortes';
import { PcpOrderDetail } from '../ordens';
import { PcpList } from './components/List';
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
const titles = { 1: 'Ordens de Serviço', 2: 'Ordens de Corte', 3: 'Relatório' };
export function Pcp() {
  const location = useLocation();
  const [active, setActive] = useState(location.state?.tabKey || '1');
  useEffect(() => {
    setActive(location.state?.tabKey || '1');
  }, [location.key, location.state]);
  const items = [
    ['1', 'service', 'Ordens de Serviço'],
    ['2', 'cut', 'Ordens de Corte'],
    ['3', 'report', 'Relatório'],
  ].map(([key, kind, label]) => ({
    key,
    label,
    children: <PcpList kind={kind} active={active === key} />,
  }));
  return (
    <Layout title={titles[active]}>
      <Tab
        injectOnChange={false}
        tabItems={items}
        activeKey={active}
        onTabChange={setActive}
        page="pcp"
      />
    </Layout>
  );
}
function Detail({ cut }) {
  const location = useLocation();
  const order = location.state?.order;
  const navigate = useNavigate();
  const key = cut ? '6' : '5';
  return (
    <Layout title={cut ? 'Detalhes da OC' : 'Detalhes da OS'}>
      <Tab
        injectOnChange={false}
        activeKey={key}
        page={cut ? 'pcpCutOrders' : 'pcpServiceOrders'}
        tabItems={[
          {
            key,
            label: cut ? 'Detalhes da OC' : 'Detalhes da OS',
            children: order ? (
              cut ? (
                <PcpCutOrderDetail key={location.key} order={order} />
              ) : (
                <PcpOrderDetail key={location.key} order={order} />
              )
            ) : (
              <div role="alert">
                Nenhuma ordem selecionada.{' '}
                <ButtonBorder
                  onClick={() =>
                    navigate(
                      '/pcp',
                      cut ? { state: { tabKey: '2' } } : undefined,
                    )
                  }
                >
                  <CaretLeftOutlined aria-hidden="true" /> Voltar
                </ButtonBorder>
              </div>
            ),
          },
        ]}
      />
    </Layout>
  );
}
export function PcpServiceOrders() {
  return <Detail cut={false} />;
}
export function PcpCutOrders() {
  return <Detail cut />;
}
Layout.propTypes = {
  title: validateProp('string'),
  children: validateProp('object'),
};
Detail.propTypes = { cut: validateProp('boolean') };
