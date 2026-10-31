import { useState } from 'react';

import { Header } from '../../components/Header';
import { SideMenu } from '../../components/SideMenu';
import { Tab } from '../../components/Tab';
import { NoticeboardHome } from '../avisos/visualizacao';
import * as S from './styles';

export function Home() {
  const [activeKey, setActiveKey] = useState('1');
  const tabItems = [
    {
      key: '1',
      label: 'Quadro de avisos',
      children: (
        <S.Panel>
          <NoticeboardHome />
        </S.Panel>
      ),
    },
  ];
  return (
    <S.Container>
      <Header />
      <S.ContainerItensContent>
        <SideMenu />
        <S.ContainerContent className="background-content">
          <h1>Home</h1>
          <Tab
            tabItems={tabItems}
            activeKey={activeKey}
            onTabChange={setActiveKey}
            page="home"
            injectOnChange={false}
          />
        </S.ContainerContent>
      </S.ContainerItensContent>
    </S.Container>
  );
}
