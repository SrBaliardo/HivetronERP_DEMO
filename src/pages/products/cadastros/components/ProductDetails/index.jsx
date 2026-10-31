import { useLocation } from 'react-router-dom';

import { validateProp } from '../../../../../utils/validateProp';
import { FormProducts } from '../FormProducts';
import * as S from './styles';
export function BomTab6({ onChange }) {
  const { state } = useLocation();
  return (
    <S.Container>
      <FormProducts onChange={onChange} disabled product={state?.product} />
    </S.Container>
  );
}
BomTab6.propTypes = { onChange: validateProp('function') };
