import { useMachines } from '../../../../contexts/machines/index.js';
import { useAsyncList } from '../../../../hooks/useAsyncList';
import { useRecordForm } from '../../../../hooks/useRecordForm';
import { schema } from './schema';
export function useMachineForm(props) {
  const domain = useMachines();
  const auxiliary = useAsyncList(domain.loadAuxiliaryOptions);
  const form = useRecordForm({
    ...props,
    schema,
    permissions: domain.permissions,
    buildForm: domain.buildForm,
    saveRecord: domain.saveRecord,
    removeRecord: domain.deleteMachine,
  });
  return { form, auxiliary };
}
