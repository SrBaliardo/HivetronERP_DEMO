import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useComponents } from '../../../../contexts/components';
import { useProducts } from '../../../../contexts/products';
import { useSets } from '../../../../contexts/sets';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useAsyncList } from '../../../../hooks/useAsyncList';
import { useUnsavedForm } from '../../../../hooks/useUnsavedForm';

export function useStructure(parentSet, isEditing) {
  const {
    loadStructure,
    componentAdditionError,
    addChild: addComponentByCode,
    findComponentId,
    deleteComponent,
    adjacentComponent,
    canChangeComponent,
    editComponent,
    validateOnProducts,
    validateOnSets,
  } = useComponents();
  const products = useProducts();
  const sets = useSets();
  const navigate = useNavigate();
  const action = useAsyncAction();
  const form = useForm({ defaultValues: { code: '', amount: '' } });
  const reset = form.reset;
  useEffect(() => {
    if (!isEditing) reset({ code: '', amount: '' });
  }, [isEditing, parentSet, reset]);
  const currentCode = form.watch('code');
  const amount = form.watch('amount');
  const load = useCallback(
    () => loadStructure(parentSet),
    [loadStructure, parentSet],
  );
  const {
    items: treeData,
    refresh,
    loading,
    error,
  } = useAsyncList(load, Boolean(parentSet));
  const [expandedOverride, setExpandedOverride] = useState(null);
  const getKeys = (nodes) =>
    nodes.flatMap((node) => [node.key, ...getKeys(node.children || [])]);
  const expandedKeys = expandedOverride || getKeys(treeData);
  const onExpand = (keys) => setExpandedOverride(keys);
  const addChild = () => {
    if (!isEditing) return;
    const message = componentAdditionError(
      amount,
      currentCode,
      parentSet.code,
      treeData,
    );
    if (message) return toast.warning(message);
    return action.run(
      (signal) => addComponentByCode(currentCode, parentSet.id, amount, signal),
      (saved) => {
        if (saved) {
          form.reset();
          setExpandedOverride(null);
          refresh();
        }
      },
    );
  };
  const removeChild = (key) => {
    if (!isEditing) return;
    const itemId = findComponentId(treeData, key);
    if (!itemId) return toast.error('Erro ao remover filho.');
    return action.run(
      (signal) => deleteComponent(itemId, parentSet.id, signal),
      refresh,
      () => toast.error('Erro ao remover filho.'),
    );
  };
  const moveChild = (key, direction) => {
    if (!isEditing) return;
    const position = adjacentComponent(treeData, key, direction);
    if (!position) return;
    return action.run(
      (signal) =>
        editComponent(
          parentSet.id,
          position.currentItemCode,
          position.otherItemCode,
          signal,
        ),
      () => {
        toast.success('Demonstração: ação simulada; nenhum dado foi gravado.');
        setExpandedOverride(null);
        refresh();
      },
      () => toast.error('Erro ao atualizar posição.'),
    );
  };
  const getDetailToEdit = (code) =>
    action.run(
      async () => {
        const product = await validateOnProducts(code);
        if (product)
          return {
            route: '/bom-products',
            key: '6',
            kind: 'product',
            item: await products.getProductById(product.id),
          };
        const set = await validateOnSets(code);
        return set
          ? {
              route: '/bom-sets',
              key: '8',
              kind: 'set',
              item: await sets.getSetById(set.id),
            }
          : null;
      },
      (target) => {
        if (target) {
          const { kind, item } = target;
          navigate(target.route, {
            state: (kind === 'product' ? products : sets).prepareNavigation(
              item,
              target.key,
            ),
          });
        }
      },
      () => toast.error('Erro ao navegar para detalhes.'),
    );
  useUnsavedForm(form, isEditing);
  return {
    treeData,
    currentCode,
    amount,
    expandedKeys,
    onExpand,
    addChild,
    removeChild,
    moveChild,
    getDetailToEdit,
    setCurrentCode: (value) => form.setValue('code', value),
    setAmount: (value) => form.setValue('amount', value),
    showDelButton: canChangeComponent,
    pending: action.pending,
    loading,
    error,
    refresh,
  };
}
