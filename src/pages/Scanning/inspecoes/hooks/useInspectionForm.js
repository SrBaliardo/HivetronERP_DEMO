import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAutenticacao as useValidation } from '../../../../contexts/autenticacao';
import { useComponents } from '../../../../contexts/components/index.js';
import { useProducts } from '../../../../contexts/products/index.js';
import { useScanning } from '../../../../contexts/scanning/index.js';
import { useSets } from '../../../../contexts/sets/index.js';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useDelayedCallback } from '../../../../hooks/useDelayedCallback';
import { useUnsavedForm } from '../../../../hooks/useUnsavedForm';
import { inspectionSchema } from './schema';
const warning = '🙅🏻‍♂️ Você não tem permissão para executar essa operação!';
const routes = {
  INSPECTION: ['/scanning-inspection-step2', '11'],
  RELEASE: ['/scanning-inspection-step3', '12'],
  EXPEDITION: ['/scanning-inspection-step4', '13'],
  COMPLETED: ['/scanning-inspection-step5', '14'],
};
export function useInspectionForm(inspection, step) {
  const domain = useScanning();
  const {
    buildInspectionForm,
    buildInspectionItems,
    getPermissions,
    role,
    sessionKey,
    getInspectionById,
    itemErrors,
    inactiveSelections,
    registerInspection,
    saveInspectionStage,
    limitShipment,
    deleteInspection,
    backInspection,
    rectifyInspectionItems,
    remaining,
    displayDate,
  } = domain;
  const components = useComponents();
  const products = useProducts();
  const sets = useSets();
  const { validateAdmin } = useValidation();
  const navigate = useNavigate();
  const action = useAsyncAction();
  const cancelaction = action.cancel;
  const navigation = useRef(null);
  const delayed = useDelayedCallback(() => navigation.current?.(), 200);
  const canceldelayed = delayed.cancel;
  const backDelayed = useDelayedCallback(() => navigation.current?.(), 1000);
  const cancelbackDelayed = backDelayed.cancel;
  const [leaving, setLeaving] = useState(false);
  const [registrationStarted, setRegistrationStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [revision, setRevision] = useState(0);
  const [parentSet, setParentSet] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [errorsByItem, setErrorsByItem] = useState({});
  const checkpoint = useRef({});
  const form = useForm({
    resolver: yupResolver(inspectionSchema(step)),
    defaultValues: {
      ...buildInspectionForm(inspection, step),
      items: buildInspectionItems(inspection?.inspectionItems, step),
      approval: inspection?.budgetStatus || '',
      shipping: {},
    },
  });
  const { reset, setValue, control } = form;
  const inspectionItems = useWatch({ control, name: 'items' }) || [];
  const approvalStatus = useWatch({ control, name: 'approval' }) || '';
  const model = useWatch({ control, name: 'model' });
  const inputValues = useWatch({ control, name: 'shipping' }) || {};
  const permissions = getPermissions(role, step);
  useEffect(() => {
    cancelaction();
    canceldelayed();
    cancelbackDelayed();
    checkpoint.current = {};
    setRegistrationStarted(false);
    setParentSet(null);
    setSelectedItems([]);
    setModal(null);
    setLeaving(false);
    setErrorsByItem({});
    reset({
      ...buildInspectionForm(inspection, step),
      items: buildInspectionItems(inspection?.inspectionItems, step),
      approval: inspection?.budgetStatus || '',
      shipping: {},
    });
  }, [
    inspection,
    step,
    buildInspectionForm,
    buildInspectionItems,
    sessionKey,
    reset,
    cancelaction,
    canceldelayed,
    cancelbackDelayed,
  ]);
  useEffect(() => {
    if (step < 3 || !inspection?.id) return undefined;
    let active = true;
    setLoading(true);
    setLoadError(false);
    getInspectionById(inspection.id)
      .then(
        (data) => {
          if (active)
            setValue('items', buildInspectionItems(data.inspectionItems, step));
        },
        () => {
          if (active) setLoadError(true);
        },
      )
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [
    step,
    inspection?.id,
    getInspectionById,
    buildInspectionItems,
    setValue,
    revision,
  ]);
  useEffect(() => {
    if (step === 2 && model === 'STAR') setValue('manufacturer', 'STAR');
  }, [model, step, setValue]);
  useEffect(() => {
    if (step === 2 && !inspectionItems.length)
      toast.warning(
        'Os itens selecionados não eram "PRODUTO", a lista está vazia.',
        { toastId: 'no-sequences-toast' },
      );
  }, [step, inspectionItems.length]);
  const move = (saved, back = false) => {
    const route = routes[saved.inspectionStage];
    if (route) {
      acceptChanges();
      setLeaving(true);
      navigation.current = () =>
        navigate(route[0], {
          state: {
            tabKey: route[1],
            inspection: saved,
            ...(back
              ? { id: saved.id, inspectionStage: saved.inspectionStage }
              : {}),
          },
        });
      (back ? backDelayed : delayed).schedule();
    }
  };
  const fail = () =>
    toast.error('Erro ao salvar, verifique os campos do formulário.');
  const handleAdd = () => {
    if (!permissions.create) {
      toast.warning(warning);
      return;
    }
    action.run(
      async () => {
        const code = inspection?.invoiceItemCode || inspection?.invoiceItem;
        const [product, set] = await Promise.all([
          components.validateOnProducts(code),
          components.validateOnSets(code),
        ]);
        if (!product && !set) {
          toast.warning(
            'Erro ao adicionar! Verifique se o código existe no banco.',
          );
          return null;
        }
        return product
          ? products.getProductById(product.id)
          : sets.getSetById(set.id);
      },
      (value) => {
        if (value) setParentSet(value);
      },
      fail,
    );
  };
  const onSubmit = (data) => {
    if (!(step === 1 ? permissions.create : permissions.edit)) {
      toast.warning(warning);
      return;
    }
    if (loading || loadError || leaving) return;
    if (step === 1 && !selectedItems.length) {
      toast.warning(
        'É necessário selecionar pelo menos um item antes de salvar.',
      );
      return;
    }
    if (step === 2) {
      const errors = itemErrors(inspectionItems);
      setErrorsByItem(errors);
      if (Object.keys(errors).length) {
        fail();
        return;
      }
    }
    action.run(
      async (signal) => {
        if (step === 1) {
          const records = new Map();
          for (const item of selectedItems) {
            if (!records.has(item.itemId)) {
              const product = await products
                .getProductById(item.itemId)
                .catch((error) => {
                  if (error.response?.status === 404) return null;
                  throw error;
                });
              const set = product ? null : await sets.getSetById(item.itemId);
              records.set(item.itemId, {
                value: product || set,
                type: product ? 'Produto' : 'Conjunto',
              });
            }
          }
          const inactive = inactiveSelections(selectedItems, records);
          if (inactive.length) {
            toast.warning(
              'Os seguintes itens estão inativos: ' +
                inactive
                  .map((record) => record.type + ' "' + record.value.code + '"')
                  .join(', ') +
                '. Retire a seleção para prosseguir',
            );
            return null;
          }
          try {
            return await registerInspection(
              data,
              selectedItems,
              checkpoint.current,
              signal,
            );
          } finally {
            if (!signal.aborted && checkpoint.current.inspection)
              setRegistrationStarted(true);
          }
        }
        return saveInspectionStage(
          data,
          inspection,
          step,
          inspectionItems,
          approvalStatus,
          inputValues,
          signal,
        );
      },
      (saved) => {
        if (saved) move(saved);
      },
      fail,
    );
  };
  const handleInputChange = (index, field, value) => {
    setValue('items.' + index + '.' + field, value, { shouldDirty: true });
    if (step === 2 && (field === 'received' || field === 'releasedAmount'))
      setErrorsByItem(itemErrors(form.getValues('items')));
  };
  const handleRadioChange = (status) => {
    setValue('approval', status);
    if (step === 3)
      setValue(
        'items',
        form.getValues('items').map((item) => ({
          ...item,
          checked: status === 'APPROVED',
          disabled: status !== 'PARTIAL',
        })),
      );
  };
  const handleCheckboxChange = (index) =>
    setValue(
      'items.' + index + '.checked',
      !form.getValues('items.' + index + '.checked'),
    );
  const handleMaxValueRemain = (event, id, max) =>
    setValue('shipping.' + id, limitShipment(event.target.value, max));
  const confirm = (kind, username, password) =>
    action.run(
      async (signal) => {
        if (!(await validateAdmin(username, password))) {
          toast.error(
            kind === 'delete'
              ? 'Credenciais inválidas. Exclusão não permitida.'
              : 'Credenciais inválidas. Retrocesso não permitido.',
          );
          return null;
        }
        if (kind === 'delete') {
          await deleteInspection(inspection.id, signal);
          return true;
        }
        return backInspection(inspection, step, approvalStatus, signal);
      },
      (saved) => {
        if (!saved) return;
        setModal(null);
        if (kind === 'delete') {
          if (step === 5)
            toast.success(
              'Demonstração: ação simulada; nenhum dado foi gravado.',
            );
          acceptChanges();
          navigate('/scanning', { state: { tabKey: '1' } });
        } else move(saved, true);
      },
      fail,
    );
  const modalRectification = (updated) =>
    action.run(
      async (signal) =>
        rectifyInspectionItems(inspectionItems, updated, signal),
      (items) => {
        setValue('items', items);
        setModal(null);
        toast.success('Demonstração: ação simulada; nenhum dado foi gravado.');
      },
      () => toast.error('Erro ao atualizar a quantidade expedida.'),
    );
  const acceptChanges = useUnsavedForm(
    form,
    step < 5 && !loading && !leaving,
    () => {
      setSelectedItems([]);
      setParentSet(null);
      setModal(null);
      setErrorsByItem({});
    },
    selectedItems.length > 0,
  );
  return {
    ...form,
    errors: form.formState.errors,
    inspectionItems,
    approvalStatus,
    inputValues,
    parentSet,
    selectedItems,
    setSelectedItems,
    errorsByItem,
    itemToEdit,
    isEditing: false,
    registrationStarted,
    loading,
    loadError,
    retry: () => setRevision((value) => value + 1),
    pending: action.pending || leaving,
    currentStage: inspection?.inspectionStage || 'REGISTER',
    currentSelectModelValue: model,
    isManufacturerDisabled: model === 'STAR',
    isSmallScreen: useMediaQuery({ query: '(max-width: 820px)' }),
    onSubmit,
    handleAdd,
    handleInputChange,
    handleRadioChange,
    handleCheckboxChange,
    handleMaxValueRemain,
    remain: remaining,
    formatDisplayDate: displayDate,
    handleDiscard: () => {
      acceptChanges();
      navigate('/scanning', { state: { tabKey: '1' } });
    },
    handleDelete: () => setModal('delete'),
    handleBack: () => {
      if (permissions.edit) setModal('back');
      else toast.warning(warning);
    },
    hideModalDelete: () => setModal(null),
    hideModalBack: () => setModal(null),
    hideModalRectification: () => setModal(null),
    showModalRectification: (item) => {
      setItemToEdit(item);
      setModal('rectify');
    },
    isModalDeleteVisible: modal === 'delete',
    isModalBackVisible: modal === 'back',
    isModalRectificationVisible: modal === 'rectify',
    isCheckingAdmin: action.pending,
    modalConfirmPassword: (u, p) => confirm('delete', u, p),
    modalConfirmDeletion: (u, p) => confirm('delete', u, p),
    modalConfirmBack: (u, p) => confirm('back', u, p),
    modalRectification,
  };
}
