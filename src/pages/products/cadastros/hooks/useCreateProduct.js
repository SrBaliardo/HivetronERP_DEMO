import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useProducts } from '../../../../contexts/products';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';

export function useCreateProduct(isActiveTab) {
  const domain = useProducts();
  const action = useAsyncAction();
  const { cancel } = action;
  const { watch, setValue } = useForm({ defaultValues: { code: '' } });
  const searchInput = watch('code');
  const setSearchInput = (value) => setValue('code', value);
  const [formDescription, setFormDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleCancel = () => {
    setSearchInput('');
    setFormDescription('');
    setIsFormVisible(false);
  };
  useEffect(() => {
    if (!isActiveTab) {
      cancel();
      setValue('code', '');
      setFormDescription('');
      setIsFormVisible(false);
    }
  }, [isActiveTab, cancel, setValue]);
  const searchToAdd = () =>
    action.run(
      () => domain.validateAvailableCode(searchInput),
      (result) => {
        if (result) {
          toast.success('O código válido e disponível para ser utilizado!');
          setFormDescription(result.description);
          setIsFormVisible(true);
        } else handleCancel();
      },
    );

  return {
    searchInput,
    setSearchInput,
    formDescription,
    isFormVisible,
    searchToAdd,
    handleCancel,
    pending: action.pending,
  };
}
