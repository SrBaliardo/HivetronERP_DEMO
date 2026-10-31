import { InputSelect } from '../../../../../components/InputSelect';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';

const dates = [
  { field: 'plannedStartDate', label: 'Início Planejado' },
  { field: 'startDate', label: 'Início Real' },
  { field: 'plannedDeadline', label: 'Conclusão Planejada' },
  { field: 'completionDeadline', label: 'Conclusão Real' },
];
const statuses = [
  { value: 'NOT_STARTED', label: 'Não Iniciado' },
  { value: 'STARTED', label: 'Iniciado' },
  { value: 'FINISHED', label: 'Finalizado' },
  { value: 'CANCELED', label: 'Cancelado' },
];

export function OperationFields({ sequence, disabled, onChange, formatDate }) {
  return (
    <S.Fields>
      {dates.map(({ field, label }) => (
        <label key={field} data-field={field}>
          {label}:
          <input
            aria-label={label}
            type="date"
            value={formatDate(sequence[field]) || ''}
            onChange={(event) => onChange(field, event.target.value)}
            disabled={disabled}
          />
        </label>
      ))}
      <div data-field="status">
        <label>Status:</label>
        <InputSelect
          selectOptions={statuses}
          ariaLabel="Status da operação"
          onChange={(event) => onChange('status', event.target.value)}
          value={sequence.status || ''}
          placeholder="Selecione"
          disabled={disabled}
        />
      </div>
      <label data-field="observation">
        Observações:
        <input
          aria-label="Observações da operação"
          type="text"
          value={sequence.observation || ''}
          onChange={(event) => onChange('observation', event.target.value)}
          disabled={disabled}
        />
      </label>
    </S.Fields>
  );
}
OperationFields.propTypes = {
  sequence: validateProp('object', true),
  disabled: validateProp('boolean'),
  onChange: validateProp('function', true),
  formatDate: validateProp('function', true),
};
