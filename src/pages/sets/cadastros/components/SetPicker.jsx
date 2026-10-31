import { CodePicker } from '../../../../components/CodePicker';
import { useSets } from '../../../../contexts/sets';
import { useAsyncList } from '../../../../hooks/useAsyncList';
import { validateProp } from '../../../../utils/validateProp';
export function SetPicker({
  value,
  onChange,
  disabled = false,
  listboxHeight,
}) {
  const domain = useSets();
  const { items, loading, error, refresh } = useAsyncList(
    domain.listCodeOptions,
  );
  return (
    <CodePicker
      listboxHeight={listboxHeight}
      options={items}
      value={value}
      onChange={(option) => onChange(option?.value || '')}
      disabled={disabled}
      label="Conjunto"
      loading={loading}
      error={error}
      onRetry={refresh}
      large
      strict={false}
    />
  );
}
SetPicker.propTypes = {
  value: validateProp('string'),
  onChange: validateProp('function'),
  disabled: validateProp('boolean'),
  listboxHeight: validateProp('number'),
};
