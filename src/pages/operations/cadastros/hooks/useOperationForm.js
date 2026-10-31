import { useOperations } from '../../../../contexts/operations/index.js';
import { useAsyncList } from '../../../../hooks/useAsyncList';
import { useRecordForm } from '../../../../hooks/useRecordForm';
import { schema } from './schema';
export function useOperationForm(props) {
  const domain = useOperations();
  const auxiliary = useAsyncList(domain.loadAuxiliaryOptions);
  const form = useRecordForm({
    ...props,
    schema,
    permissions: domain.permissions,
    buildForm: domain.buildForm,
    saveRecord: domain.saveRecord,
    removeRecord: domain.deleteOperation,
  });
  return { form, auxiliary };
}
