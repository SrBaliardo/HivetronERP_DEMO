import { CodePicker } from '../../../../components/CodePicker';
import { useProducts } from '../../../../contexts/products';
import { useAsyncList } from '../../../../hooks/useAsyncList';
import { validateProp } from '../../../../utils/validateProp';
export function RawMaterialPicker({
  value,
  onChange,
  disabled = false,
  listboxHeight,
}) {
  const domain = useProducts();
  const { items, loading, error, refresh } = useAsyncList(
    domain.listRawMaterialOptions,
  );
  return (
    <CodePicker
      listboxHeight={listboxHeight}
      options={items}
      value={value}
      onChange={(option) => onChange(option?.value || '')}
      disabled={disabled}
      label="Código MP"
      loading={loading}
      error={error}
      onRetry={refresh}
      strict={true}
    />
  );
}
RawMaterialPicker.propTypes = {
  value: validateProp('string'),
  onChange: validateProp('function'),
  disabled: validateProp('boolean'),
  listboxHeight: validateProp('number'),
};
