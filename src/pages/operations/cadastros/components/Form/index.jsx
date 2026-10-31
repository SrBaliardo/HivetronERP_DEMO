import { Controller } from 'react-hook-form';

import { InputSelect } from '../../../../../components/InputSelect';
import { RecordForm } from '../../../../../components/RecordForm';
import { validateProp } from '../../../../../utils/validateProp';
import { useOperationForm } from '../../hooks/useOperationForm';
import * as S from './styles';
const modalityOptions = [
  { value: 'true', label: 'Coletivo' },
  { value: 'false', label: 'Individual' },
];

export function OperationForm(props) {
  const { form, auxiliary } = useOperationForm(props);
  return (
    <RecordForm
      form={form}
      isNew={props.isNew}
      navigationLabel="a Operação"
      auxiliary={
        <S.OptionsRow>
          <div className="div div-c1">
            <label>
              Tipo: <span>*</span>
            </label>
            <Controller
              name="operationTypeId"
              control={form.control}
              render={({ field }) => (
                <InputSelect
                  selectOptions={auxiliary.items}
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  placeholder="Selecione o Tipo"
                  ariaLabel="Tipo da operação"
                  loading={auxiliary.loading}
                  error={auxiliary.error}
                  onRetry={auxiliary.refresh}
                  disabled={!form.isEditing || form.pending}
                />
              )}
            />
          </div>
          <div className="div div-c1">
            <label>Modalidade:</label>
            <Controller
              name="collectiveTime"
              control={form.control}
              render={({ field }) => (
                <InputSelect
                  ref={field.ref}
                  name={field.name}
                  selectOptions={modalityOptions}
                  listboxHeight={120}
                  value={field.value === true ? 'true' : 'false'}
                  onChange={(event) =>
                    field.onChange(event.target.value === 'true')
                  }
                  ariaLabel="Modalidade"
                  disabled={!form.isEditing || form.pending}
                />
              )}
            />
          </div>
        </S.OptionsRow>
      }
    />
  );
}
OperationForm.propTypes = {
  isNew: validateProp('boolean'),
  record: validateProp('object'),
  onSaved: validateProp('function', true),
  onBack: validateProp('function', true),
};
