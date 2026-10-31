import { CodePicker } from '../../../../components/CodePicker';
import { useComponents } from '../../../../contexts/components';
import { useAsyncList } from '../../../../hooks/useAsyncList';
import { validateProp } from '../../../../utils/validateProp';
export function ComponentPicker({
  value,
  onChange,
  disabled = false,
  listboxHeight,
}) {
  const domain = useComponents();
  const { items, loading, error, refresh } = useAsyncList(
    domain.listCodeOptions,
  );
  return (
    <CodePicker
      listboxHeight={listboxHeight}
      options={items}
      value={value}
      onChange={(option) => onChange(option?.value || '', option?.itemId)}
      disabled={disabled}
      label="Código do Componente ou Subconjunto"
      loading={loading}
      error={error}
      onRetry={refresh}
      strict={true}
    />
  );
}
ComponentPicker.propTypes = {
  value: validateProp('string'),
  onChange: validateProp('function'),
  disabled: validateProp('boolean'),
  listboxHeight: validateProp('number'),
};
