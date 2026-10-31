import { useState } from 'react';

import { Header } from '../../../components/Header';
import { SideMenu } from '../../../components/SideMenu';
import { Tab } from '../../../components/Tab';
import { AppointmentHistory } from '../historico';
import { AppointmentRegistration } from '../registro';
import * as S from './styles';

export function Appointment() {
  const [activeKey, setActiveKey] = useState('1');
  return (
    <S.Container>
      <Header />
      <S.ContainerItensContent>
        <SideMenu />
        <S.ContainerContent className="background-content">
          <h1>
            {activeKey === '1' ? 'Apontamento' : 'Histórico de Apontamentos'}
          </h1>
          <Tab
            activeKey={activeKey}
            onTabChange={setActiveKey}
            page="appointment"
            injectOnChange={false}
            tabItems={[
              {
                key: '1',
                label: 'Apontamento',
                children: <AppointmentRegistration />,
              },
              {
                key: '2',
                label: 'Histórico',
                children: <AppointmentHistory />,
              },
            ]}
          />
        </S.ContainerContent>
      </S.ContainerItensContent>
    </S.Container>
  );
}
