import { validateProp } from '../../../../../utils/validateProp';
import { FormSequences } from '../FormSequences';
import * as S from './styles';
export function BomTab13({ onChange, sequence }) {
  return (
    <S.Container>
      <FormSequences onChange={onChange} sequence={sequence} />
    </S.Container>
  );
}
BomTab13.propTypes = {
  onChange: validateProp('function'),
  sequence: validateProp('object'),
};
