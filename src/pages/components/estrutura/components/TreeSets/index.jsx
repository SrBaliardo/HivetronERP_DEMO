import {
  PlusCircleOutlined,
  CaretDownOutlined,
  MinusCircleOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  FolderViewOutlined,
} from '@ant-design/icons';
import { Tree } from 'antd';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { TooltipCustom } from '../../../../../components/TooltipCustom';
import { validateProp } from '../../../../../utils/validateProp';
import { useStructure } from '../../hooks/useStructure';
import { ComponentPicker } from '../ComponentPicker';
import * as S from './styles';

export function TreeSets({ parentSet, isEditing }) {
  const {
    treeData,
    currentCode,
    amount,
    expandedKeys,
    onExpand,
    addChild,
    removeChild,
    moveChild,
    getDetailToEdit,
    setCurrentCode,
    setAmount,
    showDelButton,
    pending,
    loading,
    error,
    refresh,
  } = useStructure(parentSet, isEditing);
  if (!parentSet) return null;
  return (
    <S.Container>
      <S.Container2>
        <div className="div">
          <label>
            Código do Componente ou Subconjunto: <span>*</span>
          </label>
          <ComponentPicker
            type="text"
            value={currentCode}
            onChange={setCurrentCode}
            placeholder="Código"
            disabled={!isEditing || pending}
          />
        </div>
        <div className="div-quantity">
          <label>
            Quantidade: <span>*</span>
          </label>
          <input
            aria-label="Quantidade"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Quantidade"
            disabled={!isEditing || pending}
          />
        </div>
        <div className="div-add">
          {isEditing && (
            <ButtonFill
              type="button"
              disabled={pending || loading}
              onClick={addChild}
            >
              <PlusCircleOutlined /> Adicionar
            </ButtonFill>
          )}
        </div>
      </S.Container2>

      {error && (
        <ButtonBorder type="button" onClick={refresh}>
          Tentar novamente
        </ButtonBorder>
      )}
      <Tree
        switcherIcon={<CaretDownOutlined />}
        expandedKeys={expandedKeys}
        onExpand={onExpand}
        treeData={treeData}
        titleRender={(nodeData) => {
          const keyParts = nodeData.key.split('.').length;
          const isGrandChild = keyParts >= 3;
          const isParentNode = nodeData.key === '1';
          return (
            <S.TreeNode $isGrandChild={isGrandChild}>
              <span>{nodeData.title}</span>
              {!isEditing && !isParentNode && (
                <S.DetailButton
                  type="button"
                  disabled={pending}
                  aria-label="Exibir Detalhes"
                  onClick={() => getDetailToEdit(nodeData.itemCode)}
                >
                  <TooltipCustom
                    icon={FolderViewOutlined}
                    content={'Exibir Detalhes'}
                  />
                </S.DetailButton>
              )}
              {isEditing && showDelButton(nodeData.key) && (
                <>
                  <S.DownButton
                    type="button"
                    disabled={pending}
                    aria-label="Mover para Baixo"
                    onClick={() => moveChild(nodeData.key, 'down')}
                  >
                    <TooltipCustom
                      icon={DownCircleOutlined}
                      content={'Mover para Baixo'}
                    />
                  </S.DownButton>
                  <S.UpButton
                    type="button"
                    disabled={pending}
                    aria-label="Mover para Cima"
                    onClick={() => moveChild(nodeData.key, 'up')}
                  >
                    <TooltipCustom
                      icon={UpCircleOutlined}
                      content={'Mover para Cima'}
                    />
                  </S.UpButton>
                  <S.DelButton
                    type="button"
                    disabled={pending}
                    aria-label="Remover Subconjunto"
                    onClick={() => removeChild(nodeData.key)}
                  >
                    <TooltipCustom
                      icon={MinusCircleOutlined}
                      content={'Remover Subconjunto'}
                    />
                  </S.DelButton>
                </>
              )}
            </S.TreeNode>
          );
        }}
      />
    </S.Container>
  );
}

TreeSets.propTypes = {
  parentSet: validateProp('object'),
  isEditing: validateProp('boolean'),
};
