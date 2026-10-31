import { validateProp } from '../../../../../utils/validateProp';
import { FormSequences } from '../FormSequences';
import * as S from './styles';
export function BomTab12({
  onChange,
  selectedProductId,
  selectedSetId,
  active,
}) {
  return (
    <S.Container>
      {active && (
        <FormSequences
          onChange={onChange}
          isNew
          itemId={selectedProductId || selectedSetId}
        />
      )}
    </S.Container>
  );
}
BomTab12.propTypes = {
  onChange: validateProp('function'),
  selectedProductId: validateProp(['string', 'number']),
  selectedSetId: validateProp(['string', 'number']),
  active: validateProp('boolean'),
};
