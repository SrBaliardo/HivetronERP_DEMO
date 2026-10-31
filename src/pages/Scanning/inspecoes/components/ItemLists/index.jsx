import { InputCheckbox } from '../../../../../components/InputCheckbox';
import { TooltipCustom2 } from '../../../../../components/TooltipCustom2';
import { validateProp } from '../../../../../utils/validateProp';
import { ButtonRectification } from '../RectifyButton';
import * as S from './styles';
import {
  completedShipmentTableColumns,
  shipmentTableColumns,
  tabTableColumns,
} from './tabTableColumns';

function itemText(item, column) {
  const value = item[column.key] || 'N/A';
  return <p title={String(value)}>{value}</p>;
}

export function ReleaseItemsList({ items, onCheckboxChange }) {
  return (
    <S.ItemsList
      columns={tabTableColumns}
      rows={items}
      label="Itens da liberação"
      showHeader={false}
      renderCell={(item, column, index) =>
        column.key === 'checked' ? (
          <S.Control>
            <InputCheckbox
              ariaLabel={
                'Liberação do item ' + (item.itemCode || item.position)
              }
              checked={item.checked ?? false}
              disabled={true}
              onChange={() => onCheckboxChange(index)}
            />
          </S.Control>
        ) : (
          itemText(item, column)
        )
      }
    />
  );
}

export function ShipmentItemsList({
  items,
  completed = false,
  quantities,
  remaining,
  onQuantityChange,
  onRectify,
}) {
  return (
    <S.ItemsList
      columns={completed ? completedShipmentTableColumns : shipmentTableColumns}
      rows={items}
      label="Itens da expedição"
      renderCell={(item, column) => {
        if (column.key === 'shippedAmount')
          return (
            <p>
              {item.shippedAmount} / {item.releasedAmount}
            </p>
          );
        if (column.key === 'quantity') {
          const max = remaining(item);
          return (
            <S.QuantityInput
              aria-label="Quantidade a expedir"
              type="number"
              min={0}
              max={max}
              value={quantities[item.id] ?? '0'}
              onChange={(event) => onQuantityChange(event, item.id, max)}
            />
          );
        }
        if (column.key === 'rectify')
          return (
            <S.Control>
              <TooltipCustom2
                icon={<ButtonRectification onClick={() => onRectify(item)} />}
                content="Retificar"
              />
            </S.Control>
          );
        return itemText(item, column);
      }}
    />
  );
}

ReleaseItemsList.propTypes = {
  items: validateProp('object', true),
  onCheckboxChange: validateProp('function', true),
};

ShipmentItemsList.propTypes = {
  items: validateProp('object', true),
  completed: validateProp('boolean'),
  quantities: validateProp('object'),
  remaining: validateProp('function'),
  onQuantityChange: validateProp('function'),
  onRectify: validateProp('function'),
};
