import { CaretDownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { InputCheckboxForm } from '../../../../../components/InputCheckboxForm';
import { useComponents } from '../../../../../contexts/components/index.js';
import { useScanning } from '../../../../../contexts/scanning/index.js';
import { useAsyncList } from '../../../../../hooks/useAsyncList';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';
function keys(nodes) {
  return nodes.flatMap((node) => [node.key, ...keys(node.children || [])]);
}
function toggle(nodes, key, selected, descendant = false) {
  return nodes.map((node) => {
    const selectedHere = descendant || node.key === key;
    return {
      ...node,
      ...(selectedHere ? { selected } : {}),
      children: toggle(node.children || [], key, selected, selectedHere),
    };
  });
}
export function TreeInspection({
  parentSet,
  setSelectedItems,
  disabled = false,
}) {
  const { validateHierarchy } = useComponents();
  const { buildHierarchy, buildSelectedItems } = useScanning();
  const load = useCallback(
    async () =>
      buildHierarchy(parentSet, await validateHierarchy(parentSet.id)),
    [parentSet, validateHierarchy, buildHierarchy],
  );
  const resource = useAsyncList(load);
  const [nodes, setNodes] = useState([]);
  const [expanded, setExpanded] = useState([]);
  useEffect(() => {
    setNodes(resource.items);
    setExpanded(keys(resource.items));
    setSelectedItems([]);
  }, [resource.items, setSelectedItems]);
  const change = (key, checked) => {
    if (disabled) return;
    const next = toggle(nodes, key, checked);
    setNodes(next);
    setSelectedItems(buildSelectedItems(next));
  };
  return (
    <S.Container>
      {resource.loading && (
        <p role="status" className="loading-message">
          Carregando hierarquia...
        </p>
      )}
      {resource.error && (
        <p role="alert">
          Não foi possível carregar a hierarquia.{' '}
          <ButtonBorder type="button" onClick={resource.refresh}>
            Tentar novamente
          </ButtonBorder>
        </p>
      )}
      <Tree
        switcherIcon={<CaretDownOutlined />}
        expandedKeys={expanded}
        onExpand={setExpanded}
        treeData={nodes}
        titleRender={(node) => (
          <S.TreeNode
            className="treenode"
            data-level={node.key.split('.').length >= 3 ? 'child' : 'root'}
          >
            <span>{node.title}</span>
            <InputCheckboxForm
              disabled={disabled}
              ariaLabel={'Selecionar ' + node.title}
              checked={node.selected}
              onChange={(event) => change(node.key, event.target.checked)}
            />
          </S.TreeNode>
        )}
      />
    </S.Container>
  );
}

TreeInspection.propTypes = {
  parentSet: validateProp('object'),
  disabled: validateProp('boolean'),
  setSelectedItems: validateProp('function'),
};
