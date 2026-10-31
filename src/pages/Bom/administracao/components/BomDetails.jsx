import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { validateProp } from '../../../../utils/validateProp';
import {
  BomTab11,
  BomTab12,
  BomTab13,
} from '../../../manufacturingSequences/roteiros';
import { BomTab6 } from '../../../products/cadastros';
import { BomTab8, BomTab10 } from '../../../sets/cadastros';
import * as S from '../styles';
import { BomLayout } from './BomLayout';

export function BomDetails({ kind }) {
  const location = useLocation();
  const state = location.state || {};
  const productId = state.productId || state.product?.id;
  const setId = state.setId || state.set?.id;
  const code =
    state.productCode ||
    state.setCode ||
    state.product?.code ||
    state.set?.code ||
    '';
  const [activeKey, setActiveKey] = useState(
    () => state.tabKey || (kind === 'product' ? '10' : '8'),
  );
  const [sequence, setSequence] = useState(null);
  useEffect(() => {
    if (state.tabKey) setActiveKey(state.tabKey);
    setSequence(null);
  }, [location.key, state.tabKey]);
  const titles = {
    6: 'Detalhes do Produto',
    8: 'Detalhes do Conjunto',
    10: 'Conjuntos relacionados ao código: ' + (code || 'XXXXX'),
    11: 'Roteiros',
    12: 'Cadastrar Sequência',
    13: 'Detalhes da Sequência',
  };
  const items = [
    kind === 'product'
      ? {
          key: '6',
          label: 'Detalhes do Produto',
          children: (
            <S.Panel>
              <BomTab6 onChange={setActiveKey} />
            </S.Panel>
          ),
        }
      : {
          key: '8',
          label: 'Detalhes do Conjunto',
          children: (
            <S.Panel>
              <BomTab8 onChange={setActiveKey} />
            </S.Panel>
          ),
        },
    {
      key: '10',
      label: 'Conjuntos Relacionados',
      children: (
        <BomTab10
          active={activeKey === '10'}
          onChange={setActiveKey}
          selectedProductId={productId}
          selectedSetId={setId}
        />
      ),
    },
    {
      key: '11',
      label: 'Roteiros de Produção',
      children: (
        <BomTab11
          active={activeKey === '11'}
          onChange={setActiveKey}
          onSelect={setSequence}
          selectedProductId={productId}
          selectedSetId={setId}
        />
      ),
    },
    {
      key: '12',
      label: '',
      children: (
        <S.Panel>
          <BomTab12
            onChange={setActiveKey}
            selectedProductId={productId}
            selectedSetId={setId}
            active={activeKey === '12'}
          />
        </S.Panel>
      ),
    },
    {
      key: '13',
      label: '',
      children: (
        <S.Panel>
          {activeKey === '13' && sequence && (
            <BomTab13
              key={sequence.id}
              onChange={setActiveKey}
              sequence={sequence}
            />
          )}
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
      page={kind === 'product' ? 'bomProducts' : 'bomSets'}
    />
  );
}
BomDetails.propTypes = { kind: validateProp('string') };
