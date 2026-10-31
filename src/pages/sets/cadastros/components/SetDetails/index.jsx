import { useLocation } from 'react-router-dom';

import { validateProp } from '../../../../../utils/validateProp';
import { FormSets } from '../FormSets';
import * as S from './styles';
export function BomTab8({ onChange }) {
  const { state } = useLocation();
  return (
    <S.Container>
      <FormSets onChange={onChange} disabled set={state?.set} />
    </S.Container>
  );
}
BomTab8.propTypes = { onChange: validateProp('function') };
