import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSets } from '../../../../contexts/sets';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';

export function useCreateSet(onChange, isActiveTab) {
  const domain = useSets();
  const navigate = useNavigate();
  const action = useAsyncAction();
  const { cancel } = action;
  const { watch, setValue } = useForm({ defaultValues: { code: '' } });
  const searchInput = watch('code');
  const setSearchInput = (value) => setValue('code', value);
  const [formDescription, setFormDescription] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [navigateCheck, setNavigateCheck] = useState(true);
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
  const onSave = (saved) => {
    handleCancel();
    if (navigateCheck)
      navigate('/bom-sets', { state: domain.prepareNavigation(saved, '8') });
    else onChange('2');
  };
  return {
    searchInput,
    setSearchInput,
    formDescription,
    isFormVisible,
    isCheckboxVisible: isFormVisible,
    navigateCheck,
    setNavigateCheck,
    searchToAdd,
    handleCancel,
    onSave,
    pending: action.pending,
  };
}
