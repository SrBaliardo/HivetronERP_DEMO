import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useProducts } from '../../../../contexts/products';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useDelayedCallback } from '../../../../hooks/useDelayedCallback';
import { useUnsavedForm } from '../../../../hooks/useUnsavedForm';
import { productSchema } from './schema';

export function useProductForm({
  product,
  isNew,
  productCode,
  productDescription,
  onCancel,
}) {
  const {
    productProfiles,
    isInvalidTube,
    requiresDimensionB,
    normalizeDimensionInput,
    buildProductForm,
    formatWeight,
    calculateMPWeight,
    permissions,
    deleteProduct,
    validateProductDimensions,
    saveProduct,
    prepareNavigation,
  } = useProducts();
  const navigate = useNavigate();
  const action = useAsyncAction();
  const { cancel } = action;
  const [isEditing, setIsEditing] = useState(isNew);
  const [navigateCheck, setNavigateCheck] = useState(true);
  const navigationBeforeEdit = useRef(true);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [businessErrors, setBusinessErrors] = useState({});
  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: buildProductForm(isNew ? null : product),
    resolver: yupResolver(productSchema, undefined, { raw: true }),
  });
  const { reset, watch, setValue } = form;
  const back = () => navigate('/bom', { state: { tabKey: '1' } });
  const delayed = useDelayedCallback(back, 1100);
  const cancelDelay = delayed.cancel;
  useEffect(() => {
    cancel();
    cancelDelay();
    reset(buildProductForm(isNew ? null : product));
    setIsEditing(isNew);
    setDeleted(false);
    setDeleting(false);
    setBusinessErrors({});
  }, [
    product,
    isNew,
    productCode,
    buildProductForm,
    reset,
    cancel,
    cancelDelay,
  ]);
  const description = isNew ? productDescription : product?.description || '';
  const rawMaterialCode = watch('rawMaterialCode') || '';
  const profile = watch('rawMaterialProfile');
  const hasDimensionB = requiresDimensionB(profile);
  const dimensionA = parseFloat(watch('rawMaterialDimensionA')) || 0;
  const dimensionB = parseFloat(watch('rawMaterialDimensionB')) || 0;
  const length = parseFloat(watch('rawMaterialDimensionLength')) || 0;
  const density = parseFloat(watch('rawMaterialSpecificWeight')) || 0;
  const tubeInvalid = isInvalidTube(profile, dimensionA, dimensionB);
  const previousWeight = useRef('0.00');
  const weight = formatWeight(
    calculateMPWeight(profile, dimensionA, dimensionB, length, density),
  );
  const calculatedWeight = tubeInvalid ? previousWeight.current : weight;
  useEffect(() => {
    if (!tubeInvalid) previousWeight.current = weight;
  }, [tubeInvalid, weight]);
  useEffect(() => {
    if (tubeInvalid)
      toast.error('Dimensão "B" não pode ser maior ou igual a Dimensão "A".');
  }, [tubeInvalid, dimensionA, dimensionB]);
  useEffect(() => {
    if (!hasDimensionB) setValue('rawMaterialDimensionB', '0');
  }, [hasDimensionB, setValue]);
  const handleDiscard = () => {
    if (action.pending || deleted) return;
    acceptChanges();
    reset(buildProductForm(isNew ? null : product));
    setBusinessErrors({});
    if (isEditing && !isNew) {
      setNavigateCheck(navigationBeforeEdit.current);
      setIsEditing(false);
    } else back();
    onCancel?.();
  };
  const handleEdit = () => {
    if (permissions.update) {
      if (!isEditing) navigationBeforeEdit.current = navigateCheck;
      setIsEditing(true);
    } else
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  };
  const handleDelete = () => {
    if (permissions.remove) setDeleting(true);
    else
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  };
  const confirmDelete = () =>
    action.run(
      (signal) => deleteProduct(product.id, signal),
      () => {
        setDeleting(false);
        acceptChanges();
        setDeleted(true);
        delayed.schedule();
      },
    );
  const onSubmit = (data) => {
    if (!isEditing || deleted) return;
    const error = validateProductDimensions(data, calculatedWeight);
    if (error) {
      setBusinessErrors({ [error.field]: error.message });
      if (error.notify !== false)
        toast.error('Erro ao salvar, verifique os campos do formulário.');
      return;
    }
    setBusinessErrors({});
    return action.run(
      (signal) =>
        saveProduct(
          data,
          {
            isNew,
            product: isNew ? null : product,
            productCode,
            productDescription: description,
            rawMaterialCode,
          },
          signal,
        ),
      (saved) => {
        acceptChanges();
        setIsEditing(false);
        reset(buildProductForm(saved));
        if (navigateCheck)
          navigate('/bom-products', { state: prepareNavigation(saved, '6') });
        else back();
      },
    );
  };
  const acceptChanges = useUnsavedForm(
    form,
    isEditing && !deleted,
    () => {
      setIsEditing(isNew);
      setNavigateCheck(navigationBeforeEdit.current);
      setBusinessErrors({});
    },
    navigateCheck !== navigationBeforeEdit.current,
  );
  return {
    ...form,
    errors: form.formState.errors,
    isEditing,
    isDeleteButtonVisible: !isNew && !isEditing,
    navigateCheck,
    setNavigateCheck,
    calculatedWeight,
    rawMaterialCode,
    description,
    currentSelectValue: profile,
    currentIsActiveValue: watch('isActive'),
    selectOptions: productProfiles,
    handleSelect: (value) => {
      setValue('rawMaterialProfile', value);
      setBusinessErrors((previous) => ({
        ...previous,
        rawMaterialProfile: '',
      }));
    },
    rawMaterialCodeChange: (value) => setValue('rawMaterialCode', value),
    changeToDot: (e) =>
      setValue(e.target.name, normalizeDimensionInput(e.target.value)),
    handleDiscard,
    handleEdit,
    handleDelete,
    confirmDelete,
    onSubmit,
    deleting,
    setDeleting,
    pending: action.pending || deleted,
    profileError: businessErrors.rawMaterialProfile,
    rawMaterialSpecificWeightError: businessErrors.rawMaterialSpecificWeight,
    rawMaterialDimensionAError: businessErrors.rawMaterialDimensionA,
    rawMaterialDimensionBError: tubeInvalid
      ? 'Verifique o valor informado'
      : businessErrors.rawMaterialDimensionB,
    rawMaterialDimensionLengthError: businessErrors.rawMaterialDimensionLength,
    finalDimensionAError: businessErrors.finalDimensionA,
    finalDimensionBError: businessErrors.finalDimensionB,
    finalLengthError: businessErrors.finalLength,
    finalWeightError: businessErrors.finalWeight,
  };
}
