import { useTools } from '../../../../contexts/tools/index.js';
import { useRecordForm } from '../../../../hooks/useRecordForm';
import { schema } from './schema';
export function useToolForm(props) {
  const domain = useTools();

  const form = useRecordForm({
    ...props,
    schema,
    permissions: domain.permissions,
    buildForm: domain.buildForm,
    saveRecord: domain.saveRecord,
    removeRecord: domain.deleteTool,
  });
  return { form };
}
