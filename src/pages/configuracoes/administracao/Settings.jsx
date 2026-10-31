import { useState } from 'react';

import { Header } from '../../../components/Header';
import { SideMenu } from '../../../components/SideMenu';
import { Tab } from '../../../components/Tab';
import { NoticeboardAdmin } from '../../avisos/mural';
import { UserForm, UserList } from '../../usuarios/cadastros';
import * as S from './styles';

const titles = {
  1: 'Usuários',
  2: 'Avisos',
  5: 'Cadastro de Usuário',
  6: 'Detalhes do Usuário',
};

// Shell visual: os domínios usuários e avisos conservam fachadas independentes.
export function Settings() {
  const [activeKey, setActiveKey] = useState('1');
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersRevision, setUsersRevision] = useState(0);
  const select = (user) => {
    setSelectedUser(user);
    setActiveKey('6');
  };
  const saved = (user, navigate) => {
    setSelectedUser(user);
    setUsersRevision((value) => value + 1);
    setActiveKey(navigate ? '6' : '1');
  };
  const back = () => setActiveKey('1');
  const deleted = () => {
    setUsersRevision((value) => value + 1);
  };
  const items = [
    {
      key: '1',
      label: 'Lista de Usuários',
      children: (
        <UserList
          active={activeKey === '1'}
          refreshKey={usersRevision}
          onSelect={select}
          onNew={() => {
            setSelectedUser(null);
            setActiveKey('5');
          }}
        />
      ),
    },
    {
      key: '2',
      label: 'Quadro de Avisos',
      children: (
        <S.Panel>
          <NoticeboardAdmin active={activeKey === '2'} />
        </S.Panel>
      ),
    },
    {
      key: '5',
      label: <S.HiddenTabLabel>Cadastro de Usuário</S.HiddenTabLabel>,
      children: (
        <S.Panel>
          <UserForm isNew user={selectedUser} onSaved={saved} onBack={back} />
        </S.Panel>
      ),
    },
    {
      key: '6',
      label: <S.HiddenTabLabel>Detalhes do Usuário</S.HiddenTabLabel>,
      children: (
        <S.Panel>
          {selectedUser && (
            <UserForm
              user={selectedUser}
              onSaved={saved}
              onBack={back}
              onDeleted={deleted}
            />
          )}
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
          <h1>{titles[activeKey]}</h1>
          <Tab
            tabItems={items}
            activeKey={activeKey}
            onTabChange={setActiveKey}
            page="settings"
            injectOnChange={false}
          />
        </S.ContainerContent>
      </S.ContainerItensContent>
    </S.Container>
  );
}
