import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { BomTab1, BomTab5 } from '../../products/cadastros';
import { BomTab2, BomTab7 } from '../../sets/cadastros';
import { BomLayout } from './components/BomLayout';
import * as S from './styles';
const titles = {
  1: 'Produtos',
  2: 'Conjuntos',
  5: 'Cadastrar Produto',
  7: 'Cadastrar Conjunto',
};
export function Bom() {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(
    () => location.state?.tabKey || '1',
  );
  useEffect(() => {
    if (location.state?.tabKey) setActiveKey(location.state.tabKey);
  }, [location.key, location.state]);
  const items = [
    {
      key: '1',
      label: 'Lista de Produtos',
      children: <BomTab1 active={activeKey === '1'} onChange={setActiveKey} />,
    },
    {
      key: '2',
      label: 'Lista de Conjuntos',
      children: <BomTab2 active={activeKey === '2'} onChange={setActiveKey} />,
    },
    {
      key: '5',
      label: '',
      children: (
        <S.Panel>
          <BomTab5 onChange={setActiveKey} isActiveTab={activeKey === '5'} />
        </S.Panel>
      ),
    },
    {
      key: '7',
      label: '',
      children: (
        <S.Panel>
          <BomTab7 onChange={setActiveKey} isActiveTab={activeKey === '7'} />
        </S.Panel>
      ),
    },
  ];
  return (
    <BomLayout
      title={titles[activeKey]}
      items={items}
      activeKey={activeKey}
      onChange={setActiveKey}
      page="bom"
    />
  );
}
