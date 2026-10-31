import { Controller } from 'react-hook-form';

import { InputSelect } from '../../../../../components/InputSelect';
import { RecordForm } from '../../../../../components/RecordForm';
import { validateProp } from '../../../../../utils/validateProp';
import { useMachineForm } from '../../hooks/useMachineForm';
export function MachineForm(props) {
  const { form, auxiliary } = useMachineForm(props);
  return (
    <RecordForm
      form={form}
      isNew={props.isNew}
      navigationLabel="a Máquina"
      auxiliary={
        <div className="div div-c1">
          <label>
            Tipo: <span>*</span>
          </label>
          <Controller
            name="machineGroupId"
            control={form.control}
            render={({ field }) => (
              <InputSelect
                selectOptions={auxiliary.items}
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                placeholder="Selecione o Grupo"
                ariaLabel="Grupo da máquina"
                loading={auxiliary.loading}
                error={auxiliary.error}
                onRetry={auxiliary.refresh}
                disabled={!form.isEditing || form.pending}
              />
            )}
          />
        </div>
      }
    />
  );
}
MachineForm.propTypes = {
  isNew: validateProp('boolean'),
  record: validateProp('object'),
  onSaved: validateProp('function', true),
  onBack: validateProp('function', true),
};
