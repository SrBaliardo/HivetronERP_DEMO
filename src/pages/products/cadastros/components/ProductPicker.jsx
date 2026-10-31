import { CodePicker } from '../../../../components/CodePicker';
import { useProducts } from '../../../../contexts/products';
import { useAsyncList } from '../../../../hooks/useAsyncList';
import { validateProp } from '../../../../utils/validateProp';
export function ProductPicker({
  value,
  onChange,
  disabled = false,
  listboxHeight,
}) {
  const domain = useProducts();
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
      label="Produto"
      loading={loading}
      error={error}
      onRetry={refresh}
      large
      strict={false}
    />
  );
}
ProductPicker.propTypes = {
  value: validateProp('string'),
  onChange: validateProp('function'),
  disabled: validateProp('boolean'),
  listboxHeight: validateProp('number'),
};
